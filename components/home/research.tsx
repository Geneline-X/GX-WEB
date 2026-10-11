import { useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { Container, Eyebrow } from "@/components/ds/primitives"
import { Button } from "@/components/ds/button"
import { ThreadGlyph } from "@/components/ds/thread-glyph"
import { rich } from "@/components/ds/rich"
import { Reveal } from "@/components/motion/reveal"
import { POSTS } from "@/lib/research"
import styles from "./research.module.scss"

const GLYPHS = ["disc", "wave"] as const

/** `bare` drops the section header, for the research page which has its own. */
export function Research({ bare = false }: { bare?: boolean }) {
  const t = useTranslations("Home.research")
  return (
    <section className={styles.section} aria-labelledby={bare ? undefined : "research-title"}>
      <Container>
        {!bare && (
          <Reveal className={styles.head}>
            <div>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h2 id="research-title" className={`t-h2 ${styles.title}`} data-r-lines>
                {t.rich("title", rich)}
              </h2>
            </div>
            <Button href="/blog" variant="ghost" arrow>
              {t("all")}
            </Button>
          </Reveal>
        )}

        <Reveal as="ul" className={styles.list} data-bare={bare || undefined}>
          {POSTS.map((post, i) => (
            <li key={post.id} data-r>
              <article className={styles.card}>
                <ThreadGlyph shape={GLYPHS[i % GLYPHS.length]} className={styles.glyph} />
                <div className={styles.meta}>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="t-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className={styles.postTitle}>
                  <a href={post.externalUrl} target="_blank" rel="noreferrer" className={styles.link}>
                    {post.title}
                    <span className="sr-only"> ({t("read")}, opens in a new tab)</span>
                  </a>
                </h3>
                <p className={styles.summary}>{post.summary}</p>
                <div className={styles.foot}>
                  <span className="t-small">
                    {post.author} <span className="dim">· {post.date}</span>
                  </span>
                  <span className={styles.read} aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
