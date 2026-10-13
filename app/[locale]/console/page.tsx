import { useTranslations } from "next-intl"
import { Button } from "@/components/ds/button"
import { PageHeader, Panel, StatTile, DataTable, StatusBadge } from "@/components/console/ui"
import { Chart } from "@/components/console/charts"
import { DATASETS, RUNS, TOTALS } from "@/lib/console/data"
import { formatHours, formatPct, formatWer, formatDate } from "@/lib/console/format"
import styles from "./console.module.scss"

export default function OverviewPage() {
  const t = useTranslations("Console")
  const finished = RUNS.filter((r) => r.wer !== null)

  return (
    <>
      <PageHeader title={t("overview.title")} desc={t("overview.desc")} />

      <ul className={styles.tiles}>
        <li><StatTile label={t("overview.tiles.hours")} value={TOTALS && formatHours(TOTALS.hours)} /></li>
        <li><StatTile label={t("overview.tiles.clips")} value={TOTALS?.clips.toLocaleString()} /></li>
        <li><StatTile label={t("overview.tiles.reviewed")} value={TOTALS && formatPct(TOTALS.reviewedPct)} /></li>
        <li><StatTile label={t("overview.tiles.speakers")} value={TOTALS?.speakers.toLocaleString()} /></li>
        <li><StatTile label={t("overview.tiles.bestWer")} value={TOTALS?.bestWer != null ? formatWer(TOTALS.bestWer) : null} /></li>
      </ul>
      {!TOTALS && <p className={styles.note}>{t("empty.needs", { what: t("overview.tileNeeds") })}</p>}

      <div className={styles.charts}>
        <Panel title={t("overview.hoursChart")} id="hours-chart">
          <Chart
            kind="bar"
            unit="hours"
            data={DATASETS.map((d) => ({ label: d.language, value: d.hours }))}
            labelHeader={t("datasets.cols.language")}
            valueLabel={t("datasets.cols.hours")}
            needs={t("overview.hoursNeeds")}
          />
        </Panel>
        <Panel title={t("overview.werChart")} id="wer-chart">
          <Chart
            kind="line"
            unit="percent"
            data={finished.map((r) => ({ label: r.id, value: r.wer! }))}
            labelHeader={t("runs.cols.run")}
            valueLabel={t("runs.cols.wer")}
            needs={t("overview.werNeeds")}
          />
        </Panel>
      </div>

      <Panel
        title={t("overview.recent")}
        id="recent-runs"
        action={
          <Button href="/console/runs" variant="ghost" size="sm" arrow>
            {t("overview.viewAll")}
          </Button>
        }
      >
        <DataTable
          caption={t("overview.recent")}
          rows={RUNS.slice(0, 5)}
          rowKey={(r) => r.id}
          needs={t("runs.needs")}
          columns={[
            { key: "run", label: t("runs.cols.run"), render: (r) => <span className="t-num">{r.id}</span> },
            { key: "model", label: t("runs.cols.model"), render: (r) => r.model },
            { key: "language", label: t("runs.cols.language"), render: (r) => r.language },
            { key: "status", label: t("runs.cols.status"), render: (r) => <StatusBadge status={r.status} /> },
            { key: "wer", label: t("runs.cols.wer"), numeric: true, render: (r) => (r.wer === null ? "—" : formatWer(r.wer)) },
            { key: "started", label: t("runs.cols.started"), render: (r) => formatDate(r.startedAt) },
          ]}
        />
      </Panel>
    </>
  )
}
