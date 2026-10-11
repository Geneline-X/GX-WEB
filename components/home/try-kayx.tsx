"use client"

import { useId, useRef, useState, type ReactNode } from "react"
import { useTranslations } from "next-intl"
import { ArrowUp, Mic, Square, Upload, X, Code2, ArrowUpRight } from "lucide-react"
import { Link } from "@/i18n/routing"
import { StatusDot } from "@/components/ds/primitives"
import { useRecorder, clock } from "@/hooks/use-recorder"
import { KAYX_API } from "@/lib/console/data"
import { EXTERNAL } from "@/lib/site"
import styles from "./try-kayx.module.scss"

type Mode = "speak" | "upload"
type Output = "transcript" | "english" | "both"
type Tab = "transcript" | "english" | "json"

const MODES = [
  { value: "speak", icon: Mic },
  { value: "upload", icon: Upload },
] as const

/** Radio group styled as a segmented control (arrow keys work natively). */
function Choice<V extends string>({
  name,
  value,
  onChange,
  options,
  variant = "segment",
}: {
  name: string
  value: V
  onChange: (v: V) => void
  options: { value: V; label: ReactNode; hint?: string }[]
  variant?: "segment" | "chips"
}) {
  return (
    <div className={styles[variant]}>
      {options.map((o) => (
        <label key={o.value} className={styles.opt}>
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
          <span>
            {o.label}
            {o.hint && <small>{o.hint}</small>}
          </span>
        </label>
      ))}
    </div>
  )
}

/** Exa-style try-it box for Kay-X. Audio capture is real; results need the Kay-X API. */
export function TryKayX() {
  const t = useTranslations("Home.try")
  const tp = useTranslations("Console.playground")
  const rec = useRecorder()
  const file = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<Mode>("speak")
  const [output, setOutput] = useState<Output>("both")
  const [tab, setTab] = useState<Tab>("transcript")
  const [attempted, setAttempted] = useState(false)
  const [text, setText] = useState("")
  const fieldId = useId()
  const connected = KAYX_API.url !== ""
  const typed = text.trim() !== ""

  // One button: stop a recording, send a clip or typed text, or start capturing audio.
  const main = () => {
    if (rec.state === "recording") return rec.stop()
    if (rec.state === "ready" || typed) return setAttempted(true)
    if (mode === "upload") return file.current?.click()
    rec.start()
  }

  const sending = rec.state === "ready" || (rec.state === "idle" && typed)
  const mainLabel =
    rec.state === "recording" ? t("stop") : sending ? t("send") : mode === "upload" ? t("upload") : t("record")
  const MainIcon = rec.state === "recording" ? Square : sending ? ArrowUp : mode === "upload" ? Upload : Mic

  return (
    <section className={styles.box} aria-label={t("label")}>
      <div className={styles.input} data-state={rec.state}>
        <div className={styles.line}>
          <canvas ref={rec.canvas} aria-hidden="true" />
          {rec.state === "idle" && (
            <>
              <label htmlFor={fieldId} className="sr-only">
                {t("fieldLabel")}
              </label>
              <textarea
                id={fieldId}
                className={styles.field}
                rows={1}
                lang="kri"
                value={text}
                placeholder={t("placeholder")}
                autoComplete="off"
                onChange={(e) => {
                  setText(e.target.value)
                  setAttempted(false)
                }}
                onKeyDown={(e) => {
                  // Enter sends, Shift+Enter adds a line.
                  if (e.key === "Enter" && !e.shiftKey && typed) {
                    e.preventDefault()
                    setAttempted(true)
                  }
                }}
              />
            </>
          )}
          <p className={styles.prompt} role="status" aria-live="polite">
            {rec.state === "recording" && (
              <>
                <StatusDot tone="live" pulse /> {t("recording")} <span className="t-num">{clock(rec.elapsed)}</span>
              </>
            )}
            {rec.state === "ready" && (
              <>
                {t("ready")} <span className="t-num">{clock(rec.elapsed)}</span>
              </>
            )}
          </p>
        </div>

        <div className={styles.bar}>
          <fieldset className={styles.fieldset}>
            <legend className="sr-only">{t("mode")}</legend>
            <Choice
              name="try-mode"
              value={mode}
              onChange={setMode}
              options={MODES.map(({ value, icon: Icon }) => ({
                value,
                label: (
                  <>
                    <Icon aria-hidden className={styles.modeIcon} />
                    {t(value)}
                  </>
                ),
              }))}
            />
          </fieldset>
          <div className={styles.actions}>
            {rec.state !== "idle" && (
              <button
                type="button"
                className={styles.clear}
                onClick={() => {
                  rec.clear()
                  setAttempted(false)
                }}
              >
                <X aria-hidden />
                <span className="sr-only">{t("clear")}</span>
              </button>
            )}
            <button type="button" className={styles.go} onClick={main} data-recording={rec.state === "recording" || undefined}>
              <MainIcon aria-hidden />
              <span className="sr-only">{mainLabel}</span>
            </button>
            <input
              ref={file}
              type="file"
              accept="audio/*"
              className="sr-only"
              tabIndex={-1}
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) rec.load(f)
                e.target.value = ""
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.panels}>
        <div className={styles.options}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.label}>{t("language")}</legend>
            <Choice name="try-lang" value="kri" onChange={() => {}} options={[{ value: "kri", label: "Krio", hint: "kri" }]} />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <legend className={styles.label}>{t("output")}</legend>
            <Choice
              name="try-output"
              variant="chips"
              value={output}
              onChange={setOutput}
              options={(["transcript", "english", "both"] as const).map((o) => ({ value: o, label: t(`outputs.${o}`) }))}
            />
          </fieldset>
          <div className={styles.links}>
            <Link href="/console" className={styles.chip}>
              {t("console")} <ArrowUpRight aria-hidden />
            </Link>
            <Link href="/developers" className={styles.chip}>
              <Code2 aria-hidden />
              <span className="sr-only">{t("api")}</span>
            </Link>
          </div>
        </div>

        <div className={styles.output}>
          <p className={styles.label} aria-hidden="true">
            {t("tabs.label")}
          </p>
          <div className={styles.outputHead}>
            <fieldset className={styles.fieldset}>
              <legend className="sr-only">{t("tabs.label")}</legend>
              <Choice
                name="try-tab"
                value={tab}
                onChange={setTab}
                options={(["transcript", "english", "json"] as const).map((o) => ({ value: o, label: t(`tabs.${o}`) }))}
              />
            </fieldset>
            <span className={styles.badge} translate="no">
              Kay-X
            </span>
          </div>

          <div className={styles.results}>
            {/* Empty result slots until Kay-X returns real segments. */}
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={styles.slot} aria-hidden="true">
                <span />
                <span />
              </div>
            ))}
            <div className={styles.message}>
              {rec.problem ? (
                <p role="alert" className={styles.problem}>
                  {tp(rec.problem)}
                </p>
              ) : attempted && !connected ? (
                <p>
                  {t("notConnected")}{" "}
                  <a href={EXTERNAL.kayx} target="_blank" rel="noreferrer">
                    Kay-X
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              ) : (
                <p>{t("outputEmpty")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
