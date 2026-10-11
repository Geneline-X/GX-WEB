// Legal text ported verbatim from the previous site.
export const PRIVACY_SECTIONS = [
  { label: "Introduction", id: "intro" },
  { label: "Information Collection", id: "collection" },
  { label: "Data Usage", id: "usage" },
  { label: "Sharing & Disclosure", id: "sharing" },
  { label: "Security & Retention", id: "security" },
  { label: "Your Privacy Rights", id: "rights" },
  { label: "Contact Information", id: "contact" },
]

export function PrivacyBody() {
  return (
    <>
      <section id="intro">
        <h2>1. Introduction</h2>
        <p>
          Geneline-X ("we," "our," or "us") provides a suite of AI-powered intelligence platforms and infrastructure
          services. This Privacy Policy applies to our website (geneline-x.com), our products including Xplain AI,
          Genestudio, Kay-X, and our developer interfaces and APIs.
        </p>
        <p>
          By accessing or using our Services, you acknowledge that you have read and understood this Privacy Policy. If
          you do not agree with our practices, please do not use the Services.
        </p>
      </section>

      <section id="collection">
        <h2>2. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, information we collect automatically when you use our
          Services, and information from third-party sources.
        </p>

        <h3>2.1 Information You Provide</h3>
        <ul>
          <li>
            <strong>Account Information:</strong> Name, email address, password, organization name, and role.
          </li>
          <li>
            <strong>Billing Information:</strong> Payment card details and billing address (processed through secure
            third-party payment processors).
          </li>
          <li>
            <strong>Content & Data:</strong> Documents, text, audio files, or other data you upload or provide for
            processing by our AI models.
          </li>
          <li>
            <strong>Communications:</strong> Records of your interactions with our support, sales, or technical teams.
          </li>
        </ul>

        <h3>2.2 Automatically Collected Information</h3>
        <p>When you access our Services, we automatically collect certain telemetry and usage data:</p>
        <ul>
          <li>
            <strong>Log Data:</strong> IP address, browser type, operating system, referring URLs, and pages viewed.
          </li>
          <li>
            <strong>Usage Metrics:</strong> Interaction patterns, frequency of use, feature adoption, and performance
            logs.
          </li>
          <li>
            <strong>Device Data:</strong> Information about the device you use to access the Services, including
            hardware model and unique device identifiers.
          </li>
        </ul>
      </section>

      <section id="usage">
        <h2>3. How We Use Your Information</h2>
        <p>We use the collected information for various business purposes, including:</p>
        <ul>
          <li>
            <strong>Service Delivery:</strong> To operate, maintain, and provide the features and functionality of our
            Services.
          </li>
          <li>
            <strong>Improvement & Development:</strong> To analyze usage patterns and improve our AI models and user
            interfaces.
          </li>
          <li>
            <strong>Analytics:</strong> To monitor and analyze trends, usage, and activities in connection with our
            Services.
          </li>
          <li>
            <strong>Support:</strong> To respond to your comments, questions, and requests and provide customer service.
          </li>
          <li>
            <strong>Security:</strong> To detect, investigate, and prevent fraudulent transactions and other illegal
            activities and protect our rights and property.
          </li>
        </ul>
        <p>
          <em>Note on AI Training:</em> We do not use your private documents or proprietary data uploaded to our
          enterprise platforms to train our foundation models without your explicit, opt-in consent.
        </p>
      </section>

      <section id="sharing">
        <h2>4. Sharing & Disclosure</h2>
        <p>We do not sell your personal information. We may share information in the following circumstances:</p>
        <ul>
          <li>
            <strong>Service Providers:</strong> We share information with third-party vendors who perform services on
            our behalf (e.g., cloud hosting, payment processing, analytics).
          </li>
          <li>
            <strong>Professional Advisors:</strong> We may disclose information to lawyers, auditors, and insurers as
            part of our business operations.
          </li>
          <li>
            <strong>Legal Compliance:</strong> We may disclose information if required to do so by law or in the good
            faith belief that such action is necessary to comply with legal obligations.
          </li>
          <li>
            <strong>Business Transfers:</strong> Information may be transferred as part of a merger, acquisition, or
            sale of assets.
          </li>
        </ul>
      </section>

      <section id="security">
        <h2>5. Security & Retention</h2>
        <h3>5.1 Security Measures</h3>
        <p>
          We implement robust security measures designed to protect your information from unauthorized access, loss, or
          disclosure. This includes SOC2-aligned practices, end-to-end encryption for data in transit, and advanced
          encryption for data at rest.
        </p>
        <h3>5.2 Data Retention</h3>
        <p>
          We retain personal information for as long as necessary to fulfill the purposes for which it was collected,
          including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </p>
      </section>

      <section id="rights">
        <h2>6. Your Privacy Rights</h2>
        <p>
          Depending on your location (such as the EU/EEA), you may have certain statutory rights regarding your personal
          information:
        </p>
        <ul>
          <li>
            <strong>Access & Portability:</strong> The right to request copies of your personal data.
          </li>
          <li>
            <strong>Rectification:</strong> The right to request that we correct inaccurate information.
          </li>
          <li>
            <strong>Erasure:</strong> The right to request that we delete your personal data.
          </li>
          <li>
            <strong>Restriction:</strong> The right to object to or restrict our processing of your data.
          </li>
        </ul>
        <p>To exercise these rights, please contact us at the address provided below.</p>
      </section>

      <section id="contact">
        <h2>7. Contact Information</h2>
        <p>
          If you have any questions about this Privacy Policy or our treatment of your data, please contact our Data
          Protection Officer:
        </p>
        <div>
          <p>Geneline-X Legal Department</p>
          <p>Freetown, Sierra Leone</p>
          <p>
            <strong>Email:</strong> <a href="mailto:info@geneline-x.com">info@geneline-x.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
