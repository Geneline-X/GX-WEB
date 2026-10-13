import { useTranslations } from "next-intl"
import { PageHeader, Panel, DataTable } from "@/components/console/ui"
import { DATASETS } from "@/lib/console/data"
import { formatHours, formatPct, formatDate } from "@/lib/console/format"

export default function DatasetsPage() {
  const t = useTranslations("Console.datasets")
  return (
    <>
      <PageHeader title={t("title")} desc={t("desc")} />
      <Panel>
        <DataTable
          caption={t("title")}
          rows={DATASETS}
          rowKey={(d) => d.code}
          needs={t("needs")}
          columns={[
            { key: "language", label: t("cols.language"), render: (d) => <span lang={d.code}>{d.language}</span> },
            { key: "clips", label: t("cols.clips"), numeric: true, render: (d) => d.clips.toLocaleString() },
            { key: "hours", label: t("cols.hours"), numeric: true, render: (d) => formatHours(d.hours) },
            { key: "reviewed", label: t("cols.reviewed"), numeric: true, render: (d) => formatPct(d.reviewedPct) },
            { key: "speakers", label: t("cols.speakers"), numeric: true, render: (d) => d.speakers.toLocaleString() },
            { key: "updated", label: t("cols.updated"), render: (d) => formatDate(d.updatedAt) },
          ]}
        />
      </Panel>
    </>
  )
}
