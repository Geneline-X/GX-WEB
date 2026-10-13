const W = 560
const H = 220

/** Illustrations in the site's thread style. Decorative, not data. */
export function ResearchVisual({ kind, className }: { kind: "events" | "waveform"; className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {kind === "waveform" ? <Waveform /> : <Events />}
    </svg>
  )
}

// Speech waveform built from stacked threads; the middle stretch is
// "synthesised" (marked data-on).
function Waveform() {
  const cols = 56
  const pitch = W / cols
  const bars = []
  for (let c = 0; c < cols; c++) {
    const env = Math.abs(Math.sin(c * 0.31) * 0.65 + Math.sin(c * 0.11 + 1.2) * 0.4 + Math.sin(c * 0.83) * 0.15)
    const rows = Math.max(1, Math.round(env * 18))
    const generated = c >= 20 && c < 38
    for (let r = 0; r < rows; r++) {
      const y = H / 2 - (rows * 7) / 2 + r * 7
      bars.push(
        <rect key={`${c}-${r}`} x={(c * pitch + 1).toFixed(1)} y={y.toFixed(1)} width={(pitch - 3).toFixed(1)} height={2.4} rx={1} data-on={generated || undefined} />,
      )
    }
  }
  return <g>{bars}</g>
}

// Model lanes over time. An agent watches (saffron marks) and only some
// moments trigger a low-rank update (blue blocks).
function Events() {
  const lanes = 6
  const cols = 46
  const pitch = W / cols
  const triggers = new Set([9, 23, 37])
  const out = []
  for (let l = 0; l < lanes; l++) {
    const y = 40 + l * 26
    for (let c = 0; c < cols; c++) {
      const updated = [...triggers].some((t) => c >= t && c < t + 3) && (l + c) % 2 === 0
      out.push(
        <rect key={`${l}-${c}`} x={(c * pitch + 1).toFixed(1)} y={y} width={(pitch - 3).toFixed(1)} height={2.4} rx={1} data-on={updated || undefined} />,
      )
    }
  }
  for (const t of triggers) {
    const x = t * pitch + pitch / 2
    out.push(<line key={`t${t}`} x1={x} x2={x} y1={20} y2={H - 20} />)
    out.push(<circle key={`c${t}`} cx={x} cy={20} r={3.5} />)
  }
  return <g>{out}</g>
}
