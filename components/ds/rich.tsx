import type { ReactNode } from "react"

/** Tags available inside translated headlines, e.g. "<serif>The AI</serif> pipeline". */
export const rich = {
  serif: (c: ReactNode) => <span className="serif">{c}</span>,
  serifi: (c: ReactNode) => <span className="serif-i">{c}</span>,
  dim: (c: ReactNode) => <span className="dim">{c}</span>,
  em: (c: ReactNode) => <em>{c}</em>,
  b: (c: ReactNode) => <strong>{c}</strong>,
}
