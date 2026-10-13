"use client"

import { useId, useState } from "react"
import { useTranslations } from "next-intl"
import { formatHours, formatWer } from "@/lib/console/format"
import { Empty } from "./ui"
import styles from "./charts.module.scss"

export type Datum = { label: string; value: number }

// Percent values are fractions (0–1), as WER is stored.
const FORMATS = { hours: formatHours, percent: formatWer }

type Props = {
  data: Datum[]
  /** How values read on axis, tooltip and table. */
  unit: keyof typeof FORMATS
  /** Header for the category column in the table view. */
  labelHeader: string
  /** What data this chart needs, shown while empty. */
  needs: string
  valueLabel: string
  kind: "bar" | "line"
}

const W = 640
const H = 240
const PAD = { t: 16, r: 12, b: 28, l: 44 }

function niceMax(v: number) {
  if (v <= 0) return 1
  const p = Math.pow(10, Math.floor(Math.log10(v)))
  return Math.ceil(v / p) * p
}

/** Single-series chart: one hue, recessive grid, hover tooltip, table view. */
export function Chart({ data, unit, labelHeader, needs, valueLabel, kind }: Props) {
  const format = FORMATS[unit]
  const t = useTranslations("Console.chart")
  const [view, setView] = useState<"chart" | "table">("chart")
  const [hover, setHover] = useState<number | null>(null)
  const id = useId()

  if (data.length === 0) return <Empty needs={needs} compact />

  const max = niceMax(Math.max(...data.map((d) => d.value)))
  const iw = W - PAD.l - PAD.r
  const ih = H - PAD.t - PAD.b
  const band = iw / data.length
  const x = (i: number) => PAD.l + band * i + band / 2
  const y = (v: number) => PAD.t + ih - (v / max) * ih
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max)
  const barW = Math.min(36, band * 0.62)
  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i)} ${y(d.value)}`).join("")

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.toggle} onClick={() => setView(view === "chart" ? "table" : "chart")}>
        {view === "chart" ? t("table") : t("chart")}
      </button>

      {view === "table" ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">{labelHeader}</th>
              <th scope="col">{valueLabel}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label}>
                <th scope="row">{d.label}</th>
                <td>{format(d.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.plot}>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-d`} onPointerLeave={() => setHover(null)}>
            <desc id={`${id}-d`}>{data.map((d) => `${d.label}: ${format(d.value)}`).join("; ")}</desc>
            {ticks.map((v) => (
              <g key={v}>
                <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} className={styles.grid} />
                <text x={PAD.l - 8} y={y(v)} className={styles.axis} textAnchor="end" dominantBaseline="middle">
                  {format(v)}
                </text>
              </g>
            ))}
            {data.map((d, i) => (
              <text key={d.label} x={x(i)} y={H - 8} className={styles.axis} textAnchor="middle">
                {d.label}
              </text>
            ))}

            {kind === "bar" &&
              data.map((d, i) => {
                const h = Math.max(0, PAD.t + ih - y(d.value))
                const r = Math.min(4, h)
                const x0 = x(i) - barW / 2
                const y0 = y(d.value)
                // Rounded data end, square at the baseline.
                const path = `M${x0} ${PAD.t + ih}V${y0 + r}Q${x0} ${y0} ${x0 + r} ${y0}H${x0 + barW - r}Q${x0 + barW} ${y0} ${x0 + barW} ${y0 + r}V${PAD.t + ih}Z`
                return <path key={d.label} d={path} className={styles.bar} data-dim={hover !== null && hover !== i || undefined} />
              })}

            {kind === "line" && (
              <>
                <path d={line} className={styles.line} />
                {data.map((d, i) => (
                  <circle key={d.label} cx={x(i)} cy={y(d.value)} r={hover === i ? 5 : 3.5} className={styles.dot} />
                ))}
              </>
            )}

            {hover !== null && kind === "line" && (
              <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={PAD.t + ih} className={styles.crosshair} />
            )}

            {/* Hit targets wider than the marks. */}
            {data.map((d, i) => (
              <rect
                key={d.label}
                x={PAD.l + band * i}
                y={PAD.t}
                width={band}
                height={ih}
                fill="transparent"
                onPointerEnter={() => setHover(i)}
              />
            ))}
          </svg>
          {hover !== null && (
            <div
              className={styles.tip}
              style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(data[hover].value) / H) * 100}%` }}
              aria-hidden="true"
            >
              <span className="t-mono">{data[hover].label}</span>
              <strong className="t-num">{format(data[hover].value)}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
