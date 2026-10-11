import { useTranslations } from "next-intl"
import { PageHeader, Panel, DataTable, StatusBadge } from "@/components/console/ui"
import { RUNS } from "@/lib/console/data"
import { formatWer, formatDate } from "@/lib/console/format"

export default function RunsPage() {
  const t = useTranslations("Console.runs")
  return (
    <>
      <PageHeader title={t("title")} desc={t("desc")} />
      <Panel>
        <DataTable
          caption={t("title")}
          rows={RUNS}
          rowKey={(r) => r.id}
          needs={t("needs")}
          columns={[
            { key: "run", label: t("cols.run"), render: (r) => <span className="t-num">{r.id}</span> },
            { key: "model", label: t("cols.model"), render: (r) => `${r.model} · ${r.baseModel}` },
            { key: "language", label: t("cols.language"), render: (r) => r.language },
            { key: "status", label: t("cols.status"), render: (r) => <StatusBadge status={r.status} /> },
            { key: "wer", label: t("cols.wer"), numeric: true, render: (r) => (r.wer === null ? "—" : formatWer(r.wer)) },
            { key: "started", label: t("cols.started"), render: (r) => formatDate(r.startedAt) },
            { key: "duration", label: t("cols.duration"), numeric: true, render: (r) => (r.durationMin === null ? "—" : `${r.durationMin} min`) },
          ]}
        />
      </Panel>
    </>
  )
}
