import { AFRICA, HUBS } from "./africa"
import { FRAG, MAX_HUBS, VERT } from "./shaders"

/** Values the page animates (GSAP tweens these directly). */
export type LoomState = {
  morph: number // 0 map · 1 wave · 2 matrix · 3 map, lit
  intro: number // 0..1 weave-in
  lit: number // 0..1 share of threads lit in the deploy shape
  pointerOn: number // 0..1
}

/** Where the shape sits inside the canvas, as fractions of its box. */
export type LoomFit = { x: number; y: number; w: number; h: number }

/** "africa" morphs through the pipeline; "mosaic" frames the hero with woven tiles. */
export type LoomShape = "africa" | "mosaic"

type Geometry = {
  count: number
  rows: number
  worldW: number
  hubs: [number, number, number][] // x, y, live
  buffers: Record<string, { data: Float32Array; size: number }>
}

const WORLD_H = 2

function toWorld(col: number, row: number): [number, number] {
  const half = AFRICA.rows / 2
  return [(col - AFRICA.cols / 2) / half, -(row - half) / half]
}

export function lonLatToWorld(lon: number, lat: number): [number, number] {
  const [lon0, lat0, , lat1] = AFRICA.bounds
  const cell = (lat0 - lat1) / AFRICA.rows
  return toWorld((lon - lon0) / cell, (lat0 - lat) / cell)
}

// Deterministic PRNG so server and every client agree on the weave.
function mulberry(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildAfrica(): Geometry {
  const cells: [number, number][] = []
  AFRICA.runs.split(";").forEach((row, r) => {
    if (!row) return
    const v = row.split(",").map(Number)
    for (let i = 0; i < v.length; i += 2) {
      for (let c = v[i]; c < v[i] + v[i + 1]; c++) cells.push([c, r])
    }
  })
  const n = cells.length
  const rand = mulberry(7)

  const map = new Float32Array(n * 2)
  const row = new Float32Array(n)
  const seed = new Float32Array(n)
  cells.forEach(([c, r], i) => {
    const [x, y] = toWorld(c + 0.5, r + 0.5)
    map[i * 2] = x
    map[i * 2 + 1] = y
    row[i] = r / AFRICA.rows
    seed[i] = rand()
  })

  // Waveform: one column per map column, column height follows a
  // speech-like envelope (syllables separated by short pauses).
  const cols = AFRICA.cols
  const env = Array.from({ length: cols }, (_, c) => {
    const syllable = Math.abs(Math.sin(c * 0.23) * 0.7 + Math.sin(c * 0.071 + 1) * 0.45 + Math.sin(c * 0.61) * 0.18)
    const pause = Math.sin(c * 0.118 + 0.6) > 0.82 ? 0.08 : 1
    return 0.06 + Math.pow(syllable, 1.3) * pause
  })
  const total = env.reduce((a, b) => a + b, 0)
  const counts = env.map((e) => Math.max(1, Math.round((e / total) * n)))
  const wave = new Float32Array(n * 2)
  // Fill columns left→right with map threads sorted by column, so threads
  // travel mostly vertically between shapes.
  const byX = cells.map((cell, i) => i).sort((a, b) => cells[a][0] - cells[b][0] || cells[a][1] - cells[b][1])
  let k = 0
  for (let c = 0; c < cols && k < n; c++) {
    const h = Math.min(counts[c], AFRICA.rows - 4)
    for (let j = 0; j < h && k < n; j++, k++) {
      const [x] = toWorld(c + 0.5, 0)
      const [, y] = toWorld(0, AFRICA.rows / 2 - h / 2 + j + 0.5)
      wave[byX[k] * 2] = x
      wave[byX[k] * 2 + 1] = y
    }
  }
  // Any rounding leftovers rest on the centre line.
  for (; k < n; k++) {
    wave[byX[k] * 2] = (rand() - 0.5) * (AFRICA.cols / (AFRICA.rows / 2))
    wave[byX[k] * 2 + 1] = 0
  }

  // Matrix: a square grid, filled in reading order.
  const side = Math.ceil(Math.sqrt(n))
  const grid = new Float32Array(n * 2)
  const cell = new Float32Array(n * 2)
  for (let i = 0; i < n; i++) {
    const gx = (i % side) / (side - 1)
    const gy = Math.floor(i / side) / (side - 1)
    grid[i * 2] = (gx - 0.5) * 1.7
    grid[i * 2 + 1] = -(gy - 0.5) * 1.7
    cell[i * 2] = gx
    cell[i * 2 + 1] = gy
  }

  return {
    count: n,
    rows: AFRICA.rows,
    worldW: AFRICA.cols / (AFRICA.rows / 2),
    hubs: HUBS.map((h) => [...lonLatToWorld(h.lon, h.lat), h.live ? 1 : 0]),
    buffers: {
      aMap: { data: map, size: 2 },
      aWave: { data: wave, size: 2 },
      aGrid: { data: grid, size: 2 },
      aCell: { data: cell, size: 2 },
      aSeed: { data: seed, size: 1 },
      aRow: { data: row, size: 1 },
      aFade: { data: new Float32Array(n).fill(1), size: 1 },
      aGlow: { data: new Float32Array(n), size: 1 },
    },
  }
}

type Tile = { x: number; y: number; kind: "ink" | "signal" | "wave" | "live" }

const TILE_PX = 72
const GAP_PX = 8
const THREAD_PX = 8 // row pitch: 9 threads per tile
const CLEAR_PX = 1040 // centre column kept free for the copy

/**
 * Square tiles stacked in staggered columns down both sides of the hero,
 * each one woven from threads. Sized in CSS pixels so the tiles keep their
 * size on any screen; the centre column stays clear for the copy.
 */
function buildMosaic(w: number, h: number): Geometry {
  const rand = mulberry(23)
  const px = WORLD_H / h // world units per CSS pixel
  const half = w / h
  const T = TILE_PX * px
  const G = GAP_PX * px
  const sideSpace = w / 2 - Math.min(CLEAR_PX, w * 0.72) / 2
  const columns = Math.max(0, Math.min(3, Math.floor(sideSpace / (TILE_PX + GAP_PX))))

  const tiles: Tile[] = []
  for (const side of [-1, 1]) {
    for (let col = 0; col < columns; col++) {
      const x = side * (half - 12 * px - T / 2 - col * (T + G))
      const stagger = ((col + (side > 0 ? 1 : 0)) % 2) * (T + G) * 0.5
      for (let y = 0.5 - stagger; y > -1 + T; y -= T + G) {
        // Fewer tiles further in, so the mosaic thins toward the copy.
        if (rand() < 0.2 + col * 0.2) continue
        const r = rand()
        tiles.push({ x, y, kind: r < 0.28 ? "signal" : r < 0.48 ? "wave" : "ink" })
      }
    }
  }
  const live = tiles.findIndex((t) => t.kind === "ink" && t.x < 0)
  if (live >= 0) tiles[live].kind = "live"

  const steps = Math.round(TILE_PX / THREAD_PX)
  const pos: number[] = []
  const seed: number[] = []
  const row: number[] = []
  const fade: number[] = []
  const glow: number[] = []
  for (const tile of tiles) {
    for (let r = 0; r < steps; r++) {
      for (let c = 0; c < steps; c++) {
        const u = (c + 0.5) / steps
        const v = (r + 0.5) / steps
        // "wave" tiles only weave a little waveform through their middle.
        if (tile.kind === "wave") {
          const amp = 0.08 + 0.36 * Math.abs(Math.sin(u * 13 + tile.x * 7) * Math.cos(u * 4.1))
          if (Math.abs(v - 0.5) > amp) continue
        }
        pos.push(tile.x - T / 2 + u * T, tile.y + T / 2 - v * T)
        seed.push(rand())
        row.push((1 - tile.y) / 2)
        fade.push(tile.kind === "ink" ? 0.55 : 1)
        glow.push(tile.kind === "signal" ? 0.75 : tile.kind === "live" ? 2 : 0)
      }
    }
  }
  const n = seed.length
  const map = new Float32Array(pos)
  const liveTile = tiles.find((t) => t.kind === "live")
  return {
    count: n,
    rows: h / THREAD_PX,
    worldW: half * 2,
    // Ripples start inside the mosaic so they wash across the tiles.
    hubs: [
      [liveTile?.x ?? -half + 0.2, liveTile?.y ?? 0, 1],
      [half - 0.2, 0.2, 0],
      [-half + 0.3, -0.6, 0],
      [half - 0.35, -0.7, 0],
    ],
    buffers: {
      aMap: { data: map, size: 2 },
      aWave: { data: map, size: 2 },
      aGrid: { data: map, size: 2 },
      aCell: { data: new Float32Array(n * 2), size: 2 },
      aSeed: { data: new Float32Array(seed), size: 1 },
      aRow: { data: new Float32Array(row), size: 1 },
      aFade: { data: new Float32Array(fade), size: 1 },
      aGlow: { data: new Float32Array(glow), size: 1 },
    },
  }
}

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) ?? "shader compile failed")
  }
  return s
}

function parseColor(value: string): [number, number, number] {
  const v = value.trim()
  if (v.startsWith("#")) {
    const h = v.length === 4 ? v.replace(/#(.)(.)(.)/, "#$1$1$2$2$3$3") : v
    return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number]
  }
  const m = v.match(/[\d.]+/g)
  return m ? (m.slice(0, 3).map((x) => Number(x) / 255) as [number, number, number]) : [0, 0, 0]
}

export class Loom {
  readonly state: LoomState = { morph: 0, intro: 0, lit: 0, pointerOn: 0 }
  fit: LoomFit = { x: 0, y: 0, w: 1, h: 1 }
  /** Freeze time (prefers-reduced-motion). */
  still = false

  private gl: WebGL2RenderingContext
  private program!: WebGLProgram
  private vao!: WebGLVertexArrayObject
  private buffers: WebGLBuffer[] = []
  private rows = AFRICA.rows
  private worldW = 2
  private size = { w: 0, h: 0 }
  private uniforms: Record<string, WebGLUniformLocation | null> = {}
  private count = 0
  private raf = 0
  private time = 4.2
  private last = 0
  private running = false
  private pointer = { x: 9, y: 9, tx: 9, ty: 9 }
  private layout = { k: 1, cx: 0, cy: 0, w: 1, h: 1, dpr: 1 }

  static supported() {
    if (typeof document === "undefined") return false
    return !!document.createElement("canvas").getContext("webgl2")
  }

  constructor(
    private canvas: HTMLCanvasElement,
    private shape: LoomShape = "africa",
  ) {
    const gl = canvas.getContext("webgl2", { antialias: false, premultipliedAlpha: true, alpha: true })
    if (!gl) throw new Error("WebGL2 unavailable")
    this.gl = gl
    this.init()
  }

  private init() {
    const gl = this.gl
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "link failed")
    }
    this.program = program

    const names = [
      "uTime", "uMorph", "uIntro", "uLit", "uCursor", "uScale", "uOffset", "uPointer", "uPointerOn",
      "uCell", "uDpr", "uHubs", "uHubCount", "uIntroSides", "uHalfW", "uInk", "uAccent", "uLiveColor", "uThread",
    ]
    for (const n of names) this.uniforms[n] = gl.getUniformLocation(program, n)

    this.vao = gl.createVertexArray()!
    this.size = this.sizeOf()
    this.upload(this.shape === "mosaic" ? buildMosaic(this.size.w, this.size.h) : buildAfrica())

    gl.useProgram(program)
    gl.uniform1f(this.uniforms.uThread, 0.34)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    this.readColors()
  }

  private sizeOf() {
    const r = this.canvas.getBoundingClientRect()
    return { w: Math.max(1, r.width), h: Math.max(1, r.height) }
  }

  /** (Re)build vertex buffers and hub uniforms for a geometry. */
  private upload(geo: Geometry) {
    const gl = this.gl
    this.buffers.forEach((b) => gl.deleteBuffer(b))
    this.buffers = []
    gl.bindVertexArray(this.vao)
    for (const [name, { data, size }] of Object.entries(geo.buffers)) {
      const loc = gl.getAttribLocation(this.program, name)
      if (loc < 0) continue
      const buf = gl.createBuffer()!
      this.buffers.push(buf)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0)
    }
    this.count = geo.count
    this.rows = geo.rows
    this.worldW = geo.worldW

    gl.useProgram(this.program)
    const hubs = new Float32Array(MAX_HUBS * 4)
    geo.hubs.slice(0, MAX_HUBS).forEach(([x, y, live], i) => hubs.set([x, y, (i * 0.381) % 1, live], i * 4))
    gl.uniform4fv(this.uniforms.uHubs, hubs)
    gl.uniform1i(this.uniforms.uHubCount, Math.min(geo.hubs.length, MAX_HUBS))
  }

  /** Pull colours from CSS custom properties on the canvas. */
  readColors() {
    const gl = this.gl
    const cs = getComputedStyle(this.canvas)
    gl.useProgram(this.program)
    gl.uniform3fv(this.uniforms.uInk, parseColor(cs.getPropertyValue("--gl-ink") || "#0e1116"))
    gl.uniform3fv(this.uniforms.uAccent, parseColor(cs.getPropertyValue("--c-signal") || "#2348e0"))
    gl.uniform3fv(this.uniforms.uLiveColor, parseColor(cs.getPropertyValue("--c-saffron") || "#f2b33d"))
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, rect.width)
    const h = Math.max(1, rect.height)
    this.canvas.width = Math.round(w * dpr)
    this.canvas.height = Math.round(h * dpr)
    // The mosaic is laid out in pixels, so rebuild it when the canvas size changes.
    if (this.shape === "mosaic" && (Math.abs(w - this.size.w) > 2 || Math.abs(h - this.size.h) > 2)) {
      this.size = { w, h }
      this.upload(buildMosaic(w, h))
    }
    const rw = this.fit.w * w
    const rh = this.fit.h * h
    const k = Math.min(rw / this.worldW, rh / WORLD_H)
    this.layout = { k, cx: (this.fit.x + this.fit.w / 2) * w, cy: (this.fit.y + this.fit.h / 2) * h, w, h, dpr }
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    if (!this.running) this.draw()
  }

  setPointer(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect()
    const { k, cx, cy } = this.layout
    this.pointer.tx = (clientX - rect.left - cx) / k
    this.pointer.ty = -(clientY - rect.top - cy) / k
  }

  start() {
    if (this.running) return
    this.running = true
    this.last = performance.now()
    const tick = (now: number) => {
      if (!this.running) return
      const dt = Math.min(0.05, (now - this.last) / 1000)
      this.last = now
      if (!this.still) this.time += dt
      this.draw(dt)
      this.raf = requestAnimationFrame(tick)
    }
    this.raf = requestAnimationFrame(tick)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  draw(dt = 0) {
    const gl = this.gl
    const u = this.uniforms
    const { k, cx, cy, w, h, dpr } = this.layout
    const p = this.pointer
    const ease = dt ? 1 - Math.pow(0.0005, dt) : 1
    p.x += (p.tx - p.x) * ease
    p.y += (p.ty - p.y) * ease

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(this.program)
    gl.uniform1f(u.uTime, this.time)
    gl.uniform1f(u.uMorph, this.state.morph)
    gl.uniform1f(u.uIntro, this.state.intro)
    gl.uniform1f(u.uIntroSides, this.shape === "mosaic" ? 1 : 0)
    gl.uniform1f(u.uHalfW, this.worldW / 2)
    gl.uniform1f(u.uLit, this.state.lit)
    gl.uniform1f(u.uCursor, -this.worldW / 2 - 0.1 + ((this.time * 0.09) % 1.25) * (this.worldW + 0.2))
    gl.uniform2f(u.uScale, (2 * k) / w, (2 * k) / h)
    gl.uniform2f(u.uOffset, (cx / w) * 2 - 1, 1 - (cy / h) * 2)
    gl.uniform2f(u.uPointer, p.x, p.y)
    gl.uniform1f(u.uPointerOn, this.state.pointerOn)
    gl.uniform1f(u.uCell, (k * WORLD_H) / this.rows)
    gl.uniform1f(u.uDpr, dpr)
    gl.bindVertexArray(this.vao)
    gl.drawArrays(gl.POINTS, 0, this.count)
  }

  /** Free GPU resources. The context itself stays usable: React may mount a new Loom on the same canvas. */
  destroy() {
    this.stop()
    const gl = this.gl
    this.buffers.forEach((b) => gl.deleteBuffer(b))
    gl.deleteVertexArray(this.vao)
    gl.deleteProgram(this.program)
  }
}
