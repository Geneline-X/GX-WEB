"use client"

import { useId, useRef } from "react"
import { useTranslations } from "next-intl"
import { Mic, Square, Upload, X } from "lucide-react"
import { Button } from "@/components/ds/button"
import { StatusDot } from "@/components/ds/primitives"
import { KAYX_API } from "@/lib/console/data"
import { useRecorder, clock } from "@/hooks/use-recorder"
import { Panel, Empty } from "./ui"
import styles from "./playground.module.scss"

export function Playground() {
  const t = useTranslations("Console.playground")
  const rec = useRecorder()
  const fileInput = useRef<HTMLInputElement>(null)
  const langId = useId()
  const connected = KAYX_API.url !== ""

  return (
    <div className={styles.grid}>
      <Panel title={t("input")} id="pg-input">
        <div className={styles.body}>
          <div className={styles.controls}>
            <label htmlFor={langId} className={styles.field}>
              <span className="t-mono">{t("language")}</span>
              <select id={langId} className={styles.select} defaultValue="kri">
                <option value="kri" lang="kri">
                  Krio
                </option>
              </select>
            </label>

            <div className={styles.actions}>
              {rec.state === "recording" ? (
                <Button variant="accent" onClick={rec.stop}>
                  <Square aria-hidden className={styles.btnIcon} /> {t("stop")}
                </Button>
              ) : (
                <Button onClick={rec.start}>
                  <Mic aria-hidden className={styles.btnIcon} /> {t("record")}
                </Button>
              )}
              <Button variant="outline" onClick={() => fileInput.current?.click()} disabled={rec.state === "recording"}>
                <Upload aria-hidden className={styles.btnIcon} /> {t("upload")}
              </Button>
              <input
                ref={fileInput}
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

          <div className={styles.stage} data-state={rec.state}>
            <canvas ref={rec.canvas} className={styles.canvas} aria-hidden="true" />
            {rec.state === "idle" && <p className={styles.hint}>{t("idle")}</p>}
            <div className={styles.meta}>
              <span className="t-mono" role="status" aria-live="polite">
                {rec.state === "recording" && (
                  <>
                    <StatusDot tone="live" pulse /> {t("recording")}
                  </>
                )}
                {rec.state === "ready" && t("ready")}
              </span>
              {rec.state !== "idle" && (
                <span className="t-num">
                  <span className="sr-only">{t("duration")} </span>
                  {clock(rec.elapsed)}
                </span>
              )}
            </div>
          </div>

          {rec.problem && (
            <p className={styles.problem} role="alert">
              {t(rec.problem)}
            </p>
          )}

          {rec.audio && (
            <div className={styles.playback}>
              <audio src={rec.audio.url} controls className={styles.audio} />
              <button type="button" className={styles.clear} onClick={rec.clear}>
                <X aria-hidden />
                {t("clear")}
              </button>
            </div>
          )}
        </div>
      </Panel>

      <Panel title={t("output")} id="pg-output">
        <div className={styles.body}>
          <Button variant="accent" disabled={!connected || rec.state !== "ready"}>
            {t("transcribe")}
          </Button>
          {!connected && <Empty needs={t("apiNeeds")} />}
          {connected && <p className={styles.hint}>{t("transcriptEmpty")}</p>}
        </div>
      </Panel>
    </div>
  )
}
