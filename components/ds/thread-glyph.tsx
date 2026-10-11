/** A shape drawn in woven threads: rows of dashes whose span follows `shape`. */
type Shape = "wave" | "diamond" | "disc"

const SPAN: Record<Shape, (y: number) => number> = {
  wave: (y) => 0.25 + 0.7 * Math.abs(Math.sin(y * 9.5) * Math.cos(y * 2.2)),
  diamond: (y) => 1 - Math.abs(y - 0.5) * 2,
  disc: (y) => Math.sqrt(Math.max(0, 1 - Math.pow((y - 0.5) * 2, 2))),
}

export function ThreadGlyph({ shape, rows = 22, className }: { shape: Shape; rows?: number; className?: string }) {
  const W = 200
  const rowH = 160 / rows
  const lines = []
  for (let r = 0; r < rows; r++) {
    const span = SPAN[shape]((r + 0.5) / rows) * W
    const x0 = (W - span) / 2
    // Break each row into dashes, the gaps shifting row to row like a weave.
    for (let x = x0 + ((r * 7) % 11); x < x0 + span - 4; x += 15) {
      const len = Math.min(11, x0 + span - x)
      lines.push(<rect key={`${r}-${x}`} x={x.toFixed(1)} y={(r * rowH).toFixed(1)} width={len.toFixed(1)} height={2.2} />)
    }
  }
  return (
    <svg viewBox="0 -4 200 168" className={className} aria-hidden="true" fill="currentColor">
      {lines}
    </svg>
  )
}
