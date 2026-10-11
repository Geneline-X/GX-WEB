import type { ComponentProps, ElementType, ReactNode } from "react"
import { Check } from "lucide-react"
import styles from "./primitives.module.scss"

type Theme = "light" | "dark" | "adire"

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={`${styles.container} ${className ?? ""}`} {...props} />
}

/** Page section. `theme` flips every token inside it. */
export function Section({
  theme,
  className,
  flush = false,
  ...props
}: ComponentProps<"section"> & { theme?: Theme; flush?: boolean }) {
  return (
    <section
      data-theme={theme}
      className={`${styles.section} ${flush ? styles.flush : ""} ${className ?? ""}`}
      {...props}
    />
  )
}

/** Small square marker + label that introduces a section. */
export function Eyebrow({ children, className, as: Tag = "p" }: { children: ReactNode; className?: string; as?: ElementType }) {
  return (
    <Tag className={`${styles.eyebrow} ${className ?? ""}`}>
      <span className={styles.marker} aria-hidden />
      {children}
    </Tag>
  )
}

/** Mono pill, optionally marked done. */
export function Tag({ children, done, tone }: { children: ReactNode; done?: boolean; tone?: "accent" | "live" | "danger" }) {
  return (
    <span className={styles.tag} data-tone={tone}>
      {done && <Check className={styles.check} aria-hidden />}
      {children}
    </span>
  )
}

/** Box with crosshair "+" marks on its corners. */
export function Frame({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={`${styles.frame} ${className ?? ""}`} {...props}>
      {children}
      <span className={styles.cross} data-c="tl" aria-hidden />
      <span className={styles.cross} data-c="tr" aria-hidden />
      <span className={styles.cross} data-c="bl" aria-hidden />
      <span className={styles.cross} data-c="br" aria-hidden />
    </div>
  )
}

export function StatusDot({ tone = "accent", pulse }: { tone?: "accent" | "live" | "success" | "danger" | "idle"; pulse?: boolean }) {
  return <span className={styles.status} data-tone={tone} data-pulse={pulse || undefined} aria-hidden />
}
