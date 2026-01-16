import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Geneline-X and its products and services.",
}

export default function TermsPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing or using any Geneline-X products or services, including Xplain AI, Genestudio, Kay-X, and our
              developer APIs, you agree to be bound by these Terms of Service. If you do not agree to these terms,
              please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Description of Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Geneline-X provides AI-powered services including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">Xplain AI:</strong> Document and media intelligence platform
              </li>
              <li>
                <strong className="text-foreground">Genestudio:</strong> Business chatbot creation platform
              </li>
              <li>
                <strong className="text-foreground">Kay-X:</strong> Krio-to-English speech-to-text technology
              </li>
              <li>
                <strong className="text-foreground">AI Infrastructure:</strong> RAG pipelines, vector databases, and AI
                agents
              </li>
              <li>
                <strong className="text-foreground">Developer APIs:</strong> Programmatic access to our AI capabilities
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To access certain features, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete registration information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You agree not to use our services to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malware or other harmful code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Generate harmful, abusive, or misleading content</li>
              <li>Interfere with the operation of our services</li>
              <li>Resell or redistribute our services without authorization</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All content, features, and functionality of our services are owned by Geneline-X and are protected by
              international copyright, trademark, and other intellectual property laws. You retain ownership of any
              content you upload to our platforms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For paid services, you agree to pay all applicable fees. Fees are non-refundable except as required by
              law. We reserve the right to modify pricing with reasonable notice. Failure to pay may result in
              suspension or termination of your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To the maximum extent permitted by law, Geneline-X shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly
              or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our services are provided "as is" and "as available" without warranties of any kind, either express or
              implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may terminate or suspend your access to our services immediately, without prior notice, for any reason,
              including breach of these Terms. Upon termination, your right to use our services will cease immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Sierra Leone, without regard
              to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email:{" "}
              <a href="mailto:legal@geneline-x.com" className="text-primary hover:underline">
                legal@geneline-x.com
              </a>
            </p>
            <p className="text-muted-foreground mt-2">Geneline-X, Freetown, Sierra Leone</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
              posting an announcement on our website or sending you an email. Your continued use of our services after
              such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
