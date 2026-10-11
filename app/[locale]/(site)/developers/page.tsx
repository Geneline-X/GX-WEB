import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { rich } from "@/components/ds/rich"
import { PageHero } from "@/components/pages/page-hero"
import { WaitlistButton } from "@/components/pages/waitlist"

export const metadata: Metadata = { title: "Developers" }

export default function DevelopersPage() {
  const t = useTranslations("Pages.developers")
  return (
    <PageHero eyebrow={t("eyebrow")} title={t.rich("title", rich)} lead={t("lead")}>
      <div data-r>
        <WaitlistButton size="lg">{t("waitlist.cta")}</WaitlistButton>
      </div>
    </PageHero>
  )
}
