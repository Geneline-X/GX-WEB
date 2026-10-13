import type { ComponentProps, ReactNode } from "react"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { Link } from "@/i18n/routing"
import styles from "./button.module.scss"

type Variant = "solid" | "outline" | "accent" | "ghost" | "soft"
type Size = "sm" | "md" | "lg"

type Common = {
  variant?: Variant
  size?: Size
  /** Trailing arrow. External links get the diagonal arrow automatically. */
  arrow?: boolean
  className?: string
  children: ReactNode
}

type AsLink = Common & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">

export function Button(props: AsLink | AsButton) {
  const { variant = "solid", size = "md", arrow = false, className, children, ...rest } = props
  const cls = `${styles.button} ${className ?? ""}`
  const data = { "data-variant": variant, "data-size": size }

  if ("href" in rest && rest.href) {
    const { href, ...anchor } = rest as AsLink
    const external = /^https?:\/\//.test(href)
    const inner = (
      <>
        <span className={styles.label}>{children}</span>
        {external ? (
          <ArrowUpRight className={styles.icon} aria-hidden />
        ) : (
          arrow && <ArrowRight className={styles.icon} aria-hidden />
        )}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </>
    )
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noreferrer" {...data} {...anchor}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} {...data} {...anchor}>
        {inner}
      </Link>
    )
  }

  const { type = "button", ...button } = rest as AsButton
  return (
    <button type={type} className={cls} {...data} {...button}>
      <span className={styles.label}>{children}</span>
      {arrow && <ArrowRight className={styles.icon} aria-hidden />}
    </button>
  )
}
