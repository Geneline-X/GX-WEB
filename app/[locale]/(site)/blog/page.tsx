import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { rich } from "@/components/ds/rich"
import { PageHero } from "@/components/pages/page-hero"
import { Research } from "@/components/home/research"

export const metadata: Metadata = { title: "Research" }

export default function BlogPage() {
  const t = useTranslations("Pages.blog")
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t.rich("title", rich)} lead={t("lead")} />
      <Research bare />
    </>
  )
}
