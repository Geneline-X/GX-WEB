import type { Metadata } from "next"
import { LegalPage } from "@/components/pages/legal-page"
import { PRIVACY_SECTIONS, PrivacyBody } from "@/lib/legal/privacy"

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How GenelineX collects, uses and protects your personal data.",
}

export default function PrivacyPage() {
  return (
    <LegalPage kind="privacy" date="January 19, 2026" sections={PRIVACY_SECTIONS}>
      <PrivacyBody />
    </LegalPage>
  )
}
