import type { ReactNode } from "react"
import { useTranslations } from "next-intl"
import { CircleDashed, Clock, LoaderCircle, CheckCircle2, XCircle } from "lucide-react"
import type { RunStatus } from "@/lib/console/data"
import styles from "./ui.module.scss"

export function PageHeader({ title, desc, actions }: { title: string; desc?: string; actions?: ReactNode }) {
  return (
    <header className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        {desc && <p className={styles.pageDesc}>{desc}</p>}
      </div>
      {actions}
    </header>
  )
}

export function Panel({
  title,
  action,
  children,
  className,
  id,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section className={`${styles.panel} ${className ?? ""}`} aria-labelledby={title ? id : undefined}>
      {(title || action) && (
        <div className={styles.panelHead}>
          {title && (
            <h2 id={id} className={styles.panelTitle}>
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

/** Labelled empty box: says what belongs here instead of inventing it. */
export function Empty({ needs, compact }: { needs: string; compact?: boolean }) {
  const t = useTranslations("Console.empty")
  return (
    <div className={styles.empty} data-compact={compact || undefined}>
      <CircleDashed aria-hidden className={styles.emptyIcon} />
      <p className={styles.emptyTitle}>{t("title")}</p>
      <p className={styles.emptyNeeds}>{t("needs", { what: needs })}</p>
    </div>
  )
}

export function StatTile({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className={styles.tile}>
      <p className={`t-mono ${styles.tileLabel}`}>{label}</p>
      {value ? (
        <p className={`t-num ${styles.tileValue}`}>{value}</p>
      ) : (
        <p className={styles.tileEmpty}>
          <span aria-hidden="true">—</span>
          <span className="sr-only">No data yet</span>
        </p>
      )}
    </div>
  )
}

const STATUS_ICON = { queued: Clock, running: LoaderCircle, succeeded: CheckCircle2, failed: XCircle }

/** Status always ships with an icon and a label, never colour alone. */
export function StatusBadge({ status }: { status: RunStatus }) {
  const t = useTranslations("Console.runs.status")
  const Icon = STATUS_ICON[status]
  return (
    <span className={styles.status} data-status={status}>
      <Icon aria-hidden />
      {t(status)}
    </span>
  )
}

export type Column<T> = { key: string; label: string; numeric?: boolean; render: (row: T) => ReactNode }

export function DataTable<T>({
  caption,
  columns,
  rows,
  rowKey,
  needs,
}: {
  caption: string
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  needs: string
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" data-numeric={c.numeric || undefined}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((c) => (
                <td key={c.key} data-numeric={c.numeric || undefined}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <Empty needs={needs} />}
    </div>
  )
}
