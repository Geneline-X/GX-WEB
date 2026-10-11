"use client"

import { useEffect, useRef } from "react"
import { Mic, FileAudio, User, FileText, Check, X, type LucideIcon } from "lucide-react"
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap"
import { useMotionPaused } from "@/lib/motion/pause"
import styles from "./journey.module.scss"

const COLS = 27
const ROWS = 8
const GAP = 40
const W = (COLS - 1) * GAP
const H = (ROWS - 1) * GAP

type Node = { c: number; r: number; icon?: LucideIcon; fail?: boolean }
const at = (n: Node) => ({ x: n.c * GAP, y: n.r * GAP })

// Clips wander between tools; some never make it.
const MESS_NODES: Node[] = [
  { c: 1, r: 4, icon: Mic }, { c: 3, r: 5 }, { c: 5, r: 3, fail: true }, { c: 8, r: 0, icon: FileAudio },
  { c: 8, r: 1 }, { c: 5, r: 7 }, { c: 8, r: 6 }, { c: 10, r: 7 }, { c: 12, r: 6 }, { c: 12, r: 1, fail: true },
  { c: 17, r: 1, icon: FileText }, { c: 18, r: 7, fail: true }, { c: 21, r: 2 }, { c: 24, r: 5, fail: true },
  { c: 26, r: 0, icon: Mic }, { c: 25, r: 4 }, { c: 25, r: 6 }, { c: 22, r: 7 },
]
const MESS_LINKS: [number, number][] = [
  [0, 1], [1, 2], [3, 4], [4, 6], [5, 8], [8, 9], [6, 7], [7, 8], [4, 12], [12, 13],
  [10, 11], [14, 15], [15, 16], [16, 17], [17, 12], [5, 4],
]

// Every speaker's clip follows the same reviewed path to a transcript.
const LANES = [1, 4, 7].map((r, lane) => {
  const icons = [User, Mic, FileAudio, FileText]
  const cols = [0, 7, 13, 19, 26]
  const hop = lane === 2 ? -1 : 1
  return cols.map((c, i): Node => ({
    c,
    r: i === 2 ? r + hop : r,
    icon: i === cols.length - 1 ? Check : icons[i],
  }))
})

function Grid({ skip }: { skip: Set<string> }) {
  const dots = []
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) if (!skip.has(`${c},${r}`)) dots.push(<circle key={`${c},${r}`} cx={c * GAP} cy={r * GAP} r={3} />)
  return <g className={styles.grid}>{dots}</g>
}

function NodeMark({ n }: { n: Node }) {
  const { x, y } = at(n)
  if (n.fail) {
    return (
      <g data-node className={styles.fail}>
        <X x={x - 11} y={y - 11} width={22} height={22} strokeWidth={2.5} />
      </g>
    )
  }
  if (n.icon) {
    const Icon = n.icon
    return (
      <g data-node className={n.icon === Check ? styles.done : styles.icon}>
        <rect x={x - 14} y={y - 14} width={28} height={28} rx={7} />
        <Icon x={x - 9} y={y - 9} width={18} height={18} strokeWidth={2} />
      </g>
    )
  }
  return <circle data-node className={styles.node} cx={x} cy={y} r={5} />
}

export function Journey({ variant }: { variant: "mess" | "clean" }) {
  const ref = useRef<SVGSVGElement>(null)
  const packets = useRef<gsap.core.Tween | null>(null)
  const paused = useMotionPaused()

  const nodes = variant === "mess" ? MESS_NODES : LANES.flat()
  const paths =
    variant === "mess"
      ? MESS_LINKS.map(([a, b]) => {
          const p = at(MESS_NODES[a])
          const q = at(MESS_NODES[b])
          return `M${p.x} ${p.y}L${q.x} ${q.y}`
        })
      : LANES.map((lane) => lane.map((n, i) => `${i ? "L" : "M"}${at(n).x} ${at(n).y}`).join(""))
  const skip = new Set(nodes.map((n) => `${n.c},${n.r}`))

  useGSAP(
    () => {
      const svg = ref.current
      if (!svg || prefersReducedMotion()) return
      const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 80%", once: true } })
      tl.from(svg.querySelectorAll("[data-line]"), { strokeDashoffset: 1, duration: 1.4, stagger: 0.06, ease: "power2.inOut" })
        .from(svg.querySelectorAll("[data-node]"), { opacity: 0, scale: 0.4, transformOrigin: "center", transformBox: "fill-box", stagger: 0.03, duration: 0.6, ease: "back.out(2)" }, 0.2)
      if (variant === "clean") {
        packets.current = gsap.to(svg.querySelectorAll("[data-packet]"), {
          strokeDashoffset: -1,
          duration: 2.6,
          ease: "none",
          repeat: -1,
          stagger: { each: 0.7, repeat: -1 },
          delay: 1.4,
        })
      }
    },
    { scope: ref },
  )

  useEffect(() => {
    packets.current?.paused(paused)
  }, [paused])

  return (
    <svg ref={ref} viewBox={`-20 -20 ${W + 40} ${H + 40}`} className={styles.svg} data-variant={variant} aria-hidden="true">
      <Grid skip={skip} />
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength={1} data-line className={styles.line} />
      ))}
      {variant === "clean" &&
        paths.map((d, i) => <path key={`p${i}`} d={d} pathLength={1} data-packet className={styles.packet} />)}
      {nodes.map((n, i) => (
        <NodeMark key={i} n={n} />
      ))}
    </svg>
  )
}
