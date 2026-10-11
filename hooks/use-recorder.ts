"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type RecorderState = "idle" | "recording" | "ready"
export type RecorderProblem = "denied" | "unsupported" | "badFile" | null

const BARS = 96

/** Peak amplitude per bar, 0..1. */
function peaks(buffer: AudioBuffer, n = BARS) {
  const data = buffer.getChannelData(0)
  const size = Math.floor(data.length / n) || 1
  return Array.from({ length: n }, (_, i) => {
    let max = 0
    for (let j = i * size; j < Math.min(data.length, (i + 1) * size); j++) max = Math.max(max, Math.abs(data[j]))
    return max
  })
}

/** Bars drawn as stacks of short threads, matching the Loom. */
export function drawWave(canvas: HTMLCanvasElement, values: number[]) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const { width, height } = canvas.getBoundingClientRect()
  canvas.width = width * dpr
  canvas.height = height * dpr
  const ctx = canvas.getContext("2d")!
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("--accent").trim() || "#2348e0"
  const bw = width / values.length
  const row = 4
  values.forEach((v, i) => {
    const h = Math.max(row, Math.min(1, v * 1.4) * height)
    const rows = Math.round(h / row)
    const top = (height - rows * row) / 2
    for (let r = 0; r < rows; r++) ctx.fillRect(i * bw + 1, top + r * row, Math.max(1, bw - 2), 2)
  })
}

/**
 * Microphone recording and file upload, drawn live onto `canvas`.
 * Produces a playable clip (`audio`) and its duration.
 */
export function useRecorder() {
  const [state, setState] = useState<RecorderState>("idle")
  const [problem, setProblem] = useState<RecorderProblem>(null)
  const [elapsed, setElapsed] = useState(0)
  const [audio, setAudio] = useState<{ url: string; blob: Blob } | null>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const stopRef = useRef<() => void>(() => {})

  useEffect(() => () => stopRef.current(), [])
  useEffect(() => () => {
    if (audio) URL.revokeObjectURL(audio.url)
  }, [audio])

  const load = useCallback(async (blob: Blob) => {
    setProblem(null)
    const ctx = new AudioContext()
    try {
      const buffer = await ctx.decodeAudioData(await blob.arrayBuffer())
      setAudio({ url: URL.createObjectURL(blob), blob })
      setElapsed(buffer.duration)
      setState("ready")
      requestAnimationFrame(() => canvas.current && drawWave(canvas.current, peaks(buffer)))
    } catch {
      setProblem("badFile")
      setState("idle")
    } finally {
      ctx.close()
    }
  }, [])

  const start = useCallback(async () => {
    setProblem(null)
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setProblem("unsupported")
      return
    }
    let stream: MediaStream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setProblem("denied")
      return
    }
    const ctx = new AudioContext()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 2048
    ctx.createMediaStreamSource(stream).connect(analyser)
    const recorder = new MediaRecorder(stream)
    const chunks: Blob[] = []
    recorder.ondataavailable = (e) => chunks.push(e.data)
    recorder.onstop = () => load(new Blob(chunks, { type: recorder.mimeType }))

    // Live view: a rolling history of input levels.
    const history: number[] = Array(BARS).fill(0)
    const buf = new Float32Array(analyser.fftSize)
    const started = performance.now()
    let raf = 0
    const tick = () => {
      analyser.getFloatTimeDomainData(buf)
      let peak = 0
      for (const v of buf) peak = Math.max(peak, Math.abs(v))
      history.push(peak)
      history.shift()
      if (canvas.current) drawWave(canvas.current, history)
      setElapsed((performance.now() - started) / 1000)
      raf = requestAnimationFrame(tick)
    }

    stopRef.current = () => {
      cancelAnimationFrame(raf)
      if (recorder.state !== "inactive") recorder.stop()
      stream.getTracks().forEach((tr) => tr.stop())
      ctx.close()
      stopRef.current = () => {}
    }
    recorder.start()
    setAudio(null)
    setState("recording")
    tick()
  }, [load])

  const stop = useCallback(() => stopRef.current(), [])

  const clear = useCallback(() => {
    stopRef.current()
    setAudio(null)
    setElapsed(0)
    setProblem(null)
    setState("idle")
    const c = canvas.current
    c?.getContext("2d")?.clearRect(0, 0, c.width, c.height)
  }, [])

  return { state, problem, elapsed, audio, canvas, start, stop, clear, load }
}

export function clock(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${(s % 60).toFixed(1).padStart(4, "0")}`
}
