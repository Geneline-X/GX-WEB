export const formatHours = (h: number) => `${h.toLocaleString(undefined, { maximumFractionDigits: 1 })} h`
export const formatPct = (p: number) => `${p.toLocaleString(undefined, { maximumFractionDigits: 1 })}%`
export const formatWer = (w: number) => `${(w * 100).toFixed(1)}%`
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
