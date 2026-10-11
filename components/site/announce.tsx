import { useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { EXTERNAL } from "@/lib/site"
import styles from "./announce.module.scss"

export function Announce() {
  const t = useTranslations("Site.announce")
  return (
    <div className={styles.bar} data-theme="adire">
      <p className={styles.text}>
        {t("text")}{" "}
        <a href={EXTERNAL.kaccp} target="_blank" rel="noreferrer" className={styles.link}>
          {t("cta")}
          <ArrowUpRight aria-hidden className={styles.icon} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  )
}
