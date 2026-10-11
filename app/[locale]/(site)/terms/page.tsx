import type { Metadata } from "next"
import { LegalPage } from "@/components/pages/legal-page"
import { TERMS_SECTIONS, TermsBody } from "@/lib/legal/terms"

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms and conditions for using GenelineX products and services.",
}

export default function TermsPage() {
  return (
    <LegalPage kind="terms" date="January 19, 2026" sections={TERMS_SECTIONS}>
      <TermsBody />
    </LegalPage>
  )
}
