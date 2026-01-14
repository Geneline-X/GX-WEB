import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Geneline-X and its products and services.",
}

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Geneline-X ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our products and services,
              including Xplain AI, Genestudio, Kay-X, and our developer APIs.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            <h3 className="text-lg font-medium text-foreground mb-2 mt-6">Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Account registration information (name, email, organization)</li>
              <li>Payment and billing information</li>
              <li>Documents and data you upload to our platforms</li>
              <li>Communications with our support team</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mb-2 mt-6">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage patterns and interaction data</li>
              <li>Log data and analytics</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To provide and maintain our services</li>
              <li>To process your transactions and send related information</li>
              <li>To improve and personalize your experience</li>
              <li>To communicate with you about updates and promotions</li>
              <li>To ensure security and prevent fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement industry-standard security measures to protect your data, including encryption in transit and
              at rest, secure data centers, and regular security audits. However, no method of transmission over the
              Internet is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
              policy, unless a longer retention period is required by law. You may request deletion of your data at any
              time.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Right to access your personal data</li>
              <li>Right to rectify inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than your country of residence.
              These countries may have different data protection laws. We ensure appropriate safeguards are in place for
              such transfers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email:{" "}
              <a href="mailto:privacy@geneline-x.com" className="text-primary hover:underline">
                privacy@geneline-x.com
              </a>
            </p>
            <p className="text-muted-foreground mt-2">Geneline-X, Freetown, Sierra Leone</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              policy on this page and updating the "Last updated" date. Your continued use of our services after any
              changes indicates your acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
