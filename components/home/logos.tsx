import { useTranslations } from "next-intl"
import { Frame } from "@/components/ds/primitives"
import styles from "./logos.module.scss"

// `label` is shown beside logos that are only an icon.
const LOGOS = [
  { name: "Amazon Web Services", src: "/Amazon_Web_Services_Logo.svg" },
  { name: "Google Cloud", src: "/Google Cloud.svg", label: "Google Cloud" },
  { name: "Microsoft Azure", src: "/Microsoft_Azure-OXJddnt9u_brandlogos.net.svg", label: "Azure" },
  { name: "OpenAI", src: "/openai-logo.svg" },
  { name: "Claude", src: "/claude-color.svg", label: "Claude" },
  { name: "LangChain", src: "/langchain-1.svg" },
  { name: "Pinecone", src: "/Pinecone-Icon--Streamline-Svg-Logos.svg", label: "Pinecone" },
  { name: "Vercel", src: "/vercel.svg", label: "Vercel" },
]

export function Logos() {
  const t = useTranslations("Home.logos")
  return (
    <div className={styles.wrap}>
      <Frame className={styles.frame}>
        <p className={`t-mono ${styles.label}`}>{t("label")}</p>
        <ul className={styles.list}>
          {LOGOS.map((l) => (
            <li key={l.name} className={styles.item}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={encodeURI(l.src)} alt={l.label ? "" : l.name} width={96} height={24} loading="lazy" />
              {l.label && <span>{l.label}</span>}
            </li>
          ))}
        </ul>
      </Frame>
    </div>
  )
}
