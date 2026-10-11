// Legal text ported verbatim from the previous site.
export const TERMS_SECTIONS = [
  { label: "1. Acceptance", id: "acceptance" },
  { label: "2. Registration", id: "registration" },
  { label: "3. License & Use", id: "license" },
  { label: "4. Prohibited Conduct", id: "prohibited" },
  { label: "5. Proprietary Rights", id: "proprietary" },
  { label: "6. Disclaimer", id: "disclaimer" },
  { label: "7. Liability", id: "liability" },
  { label: "8. Governing Law", id: "law" },
]

export function TermsBody() {
  return (
    <>
      <section id="acceptance">
        <h2>1. Acceptance of Terms</h2>
        <p>
          These Terms of Service ("Terms") constitute a legally binding agreement between you and Geneline-X ("we,"
          "our," or "us") regarding your use of our website, software, and AI services (collectively, the "Services").
        </p>
        <p>
          By clicking "I agree," registering for an account, or otherwise accessing the Services, you agree to be bound
          by these Terms and our Privacy Policy. If you are using the Services on behalf of an organization, you
          represent that you have the authority to bind that organization to these Terms.
        </p>
      </section>

      <section id="registration">
        <h2>2. Account Registration & Security</h2>
        <p>To use certain features, you must register for an account. You agree to:</p>
        <ul>
          <li>Provide accurate, current, and complete information.</li>
          <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
          <li>Promptly notify us if you discover or suspect any security breaches related to the Services.</li>
        </ul>
        <p>
          We reserve the right to reclaim usernames or suspend accounts that violate these Terms or infringe on
          third-party rights.
        </p>
      </section>

      <section id="license">
        <h2>3. License & Acceptable Use</h2>
        <p>
          Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and
          revocable license to access and use the Services for your internal business or personal purposes.
        </p>
        <h3>3.1 Service Specifics</h3>
        <ul>
          <li>
            <strong>Xplain AI:</strong> Usage is subject to document volume limits defined in your plan.
          </li>
          <li>
            <strong>Genestudio:</strong> Chatbots created must comply with our content safety guidelines.
          </li>
          <li>
            <strong>Kay-X:</strong> Speech-to-text processing is governed by our data privacy standards for low-resource
            languages.
          </li>
        </ul>
      </section>

      <section id="prohibited">
        <h2>4. Prohibited Conduct</h2>
        <p>You shall not, and shall not permit others to:</p>
        <ul>
          <li>Use the Services to develop models that compete with Geneline-X.</li>
          <li>
            Reverse engineer, decompile, or attempt to extract the source code or underlying algorithms of our AI
            models.
          </li>
          <li>Engage in automated scraping or data extraction without explicit authorization.</li>
          <li>Use the Services to generate or distribute harmful, deceptive, or illegal content.</li>
          <li>Circumvent any usage limits or security features of the Services.</li>
        </ul>
      </section>

      <section id="proprietary">
        <h2>5. Proprietary Rights</h2>
        <p>
          <strong>Our Property:</strong> Geneline-X retains all rights, title, and interest in and to the Services,
          including all AI models, software, branding, and intellectual property.
        </p>
        <p>
          <strong>Your Content:</strong> You retain ownership of the data you upload ("Input") and the results generated
          for you ("Output"). You grant us a limited license to host and process your Input and Output solely to provide
          the Services to you.
        </p>
        <p>
          <strong>Feedback:</strong> Any feedback or suggestions you provide may be used by us without any obligation to
          you.
        </p>
      </section>

      <section id="disclaimer">
        <h2>6. Disclaimer of Warranties</h2>
        <div>
          THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, GENELINE-X
          DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THE SERVICES WILL BE ERROR-FREE OR
          UNINTERRUPTED.
        </div>
      </section>

      <section id="liability">
        <h2>7. Limitation of Liability</h2>
        <div>
          IN NO EVENT SHALL GENELINE-X BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, OR INCIDENTAL DAMAGES ARISING OUT OF
          YOUR USE OF THE SERVICES. OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO US IN
          THE TWELVE MONTHS PRECEDING THE CLAIM.
        </div>
      </section>

      <section id="law">
        <h2>8. Governing Law & Dispute Resolution</h2>
        <p>
          These Terms are governed by the laws of Sierra Leone. Any disputes arising from these Terms shall be resolved
          exclusively through binding arbitration or the courts of Freetown, Sierra Leone.
        </p>
      </section>

      <section id="contact">
        <h2>9. Contact</h2>
        <p>Questions about these Terms? Reach out to our legal team:</p>
        <div>
          <p>Geneline-X Legal</p>
          <p>
            <strong>Email:</strong> <a href="mailto:info@geneline-x.com">legal@geneline-x.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
