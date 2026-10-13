import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { Container, Eyebrow } from "@/components/ds/primitives"
import { Button } from "@/components/ds/button"
import { rich } from "@/components/ds/rich"
import { Reveal } from "@/components/motion/reveal"
import { POSTS } from "@/lib/research"
import { ResearchVisual } from "./research-visual"
import styles from "./research.module.scss"

// Tile colours, in order. Both keep ink text above 7:1 contrast.
const TONES = ["saffron", "glow"] as const

/** Main title only: the subtitle after the colon reads better in the summary. */
const mainTitle = (title: string) => title.split(": ")[0]

/** `bare` drops the section header, for the research page which has its own. */
export function Research({ bare = false }: { bare?: boolean }) {
  const t = useTranslations("Home.research")
  return (
    <section className={styles.section} aria-labelledby={bare ? undefined : "research-title"}>
      <Container>
        {!bare && (
          <Reveal className={styles.head}>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 id="research-title" className={`t-h1 ${styles.title}`} data-r-lines>
              {t.rich("title", rich)}
            </h2>
          </Reveal>
        )}

        <Reveal as="ul" className={styles.list} data-bare={bare || undefined}>
          {POSTS.map((post, i) => (
            <li key={post.id} data-r>
              <article className={styles.tile} data-tone={TONES[i % TONES.length]}>
                <ResearchVisual kind={post.visual} className={styles.mark} />
                <p className={`t-mono ${styles.meta}`}>
                  {t("paper", { n: String(i + 1).padStart(2, "0") })} · {post.date}
                </p>
                <h3 className={styles.postTitle}>
                  <a href={post.externalUrl} target="_blank" rel="noreferrer" className={styles.link}>
                    {mainTitle(post.title)}
                    <span className="sr-only"> ({t("read")}, opens in a new tab)</span>
                  </a>
                </h3>
                <div className={styles.foot}>
                  <p className={styles.summary}>{post.summary}</p>
                  <span className={`t-mono ${styles.more}`} aria-hidden="true">
                    {t("read")} <ArrowRight />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </Reveal>

        {!bare && (
          <div className={styles.all}>
            <Button href="/blog" arrow>
              {t("all")}
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}
