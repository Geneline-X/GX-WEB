// Console data contracts.
//
// Every list below is intentionally empty: the console renders an empty
// state for anything without real data. Fill these from the real source
// (KACCP exports, the training tracker, the Kay-X API) — the types describe
// exactly which fields each view needs.

/** One row per language in the corpus. Source: KACCP. */
export type DatasetRow = {
  language: string // display name, e.g. "Krio"
  code: string // ISO 639-3, e.g. "kri"
  clips: number // utterance clips in the corpus
  hours: number // total audio hours
  reviewedPct: number // 0–100, clips that passed second-speaker review
  speakers: number // distinct contributing speakers
  updatedAt: string // ISO date of the latest export
}

export type RunStatus = "queued" | "running" | "succeeded" | "failed"

/** One row per training / fine-tuning run. Source: training tracker. */
export type ModelRun = {
  id: string // e.g. "run-0142"
  model: string // e.g. "kayx-stt-lora"
  baseModel: string // e.g. "whisper-large-v3"
  language: string
  status: RunStatus
  wer: number | null // word error rate on the held-out set, 0–1
  startedAt: string // ISO datetime
  durationMin: number | null
  /** Validation loss per step, for the run detail chart. */
  loss?: { step: number; value: number }[]
}

/** Headline numbers for the overview. */
export type WorkspaceTotals = {
  hours: number
  clips: number
  reviewedPct: number
  speakers: number
  bestWer: number | null
}

export const DATASETS: DatasetRow[] = []
export const RUNS: ModelRun[] = []
export const TOTALS: WorkspaceTotals | null = null

/** Kay-X transcription endpoint. Unset until the API details are provided. */
export const KAYX_API = {
  url: process.env.NEXT_PUBLIC_KAYX_API_URL ?? "",
}
