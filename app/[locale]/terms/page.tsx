import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Geneline-X",
  description: "Terms and conditions for using Geneline-X products and services.",
}

export default function TermsPage() {
  const lastUpdated = "January 19, 2026"

  return (
    <div className="relative min-h-screen pt-32 pb-24 bg-background transition-colors duration-300">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            Legal Documentation
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Please read these terms carefully before using our services. By using Geneline-X, you agree to these legally binding terms.
          </p>
          <div className="mt-8 flex items-center gap-4 text-sm font-medium text-muted-foreground border-t border-border pt-6">
            <span>Version 2.0</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Effective Date: {lastUpdated}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation - Quick Links */}
          <aside className="hidden lg:block space-y-4 sticky top-32 h-fit">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-6">Sections</h4>
            <nav className="flex flex-col gap-3">
              {[
                ["1. Acceptance", "#acceptance"],
                ["2. Registration", "#registration"],
                ["3. License & Use", "#license"],
                ["4. Prohibited Conduct", "#prohibited"],
                ["5. Proprietary Rights", "#proprietary"],
                ["6. Disclaimer", "#disclaimer"],
                ["7. Liability", "#liability"],
                ["8. Governing Law", "#law"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1"
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Body */}
          <div className="lg:col-span-3 prose prose-slate dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">

            <section id="acceptance" className="scroll-mt-32">
              <h2>1. Acceptance of Terms</h2>
              <p>
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Geneline-X ("we," "our," or "us") regarding your use of our website, software, and AI services (collectively, the "Services").
              </p>
              <p>
                By clicking "I agree," registering for an account, or otherwise accessing the Services, you agree to be bound by these Terms and our Privacy Policy. If you are using the Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
              </p>
            </section>

            <section id="registration" className="scroll-mt-32">
              <h2>2. Account Registration & Security</h2>
              <p>To use certain features, you must register for an account. You agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information.</li>
                <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                <li>Promptly notify us if you discover or suspect any security breaches related to the Services.</li>
              </ul>
              <p>We reserve the right to reclaim usernames or suspend accounts that violate these Terms or infringe on third-party rights.</p>
            </section>

            <section id="license" className="scroll-mt-32">
              <h2>3. License & Acceptable Use</h2>
              <p>
                Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Services for your internal business or personal purposes.
              </p>
              <h3>3.1 Service Specifics</h3>
              <ul>
                <li><strong>Xplain AI:</strong> Usage is subject to document volume limits defined in your plan.</li>
                <li><strong>Genestudio:</strong> Chatbots created must comply with our content safety guidelines.</li>
                <li><strong>Kay-X:</strong> Speech-to-text processing is governed by our data privacy standards for low-resource languages.</li>
              </ul>
            </section>

            <section id="prohibited" className="scroll-mt-32">
              <h2>4. Prohibited Conduct</h2>
              <p>You shall not, and shall not permit others to:</p>
              <ul>
                <li>Use the Services to develop models that compete with Geneline-X.</li>
                <li>Reverse engineer, decompile, or attempt to extract the source code or underlying algorithms of our AI models.</li>
                <li>Engage in automated scraping or data extraction without explicit authorization.</li>
                <li>Use the Services to generate or distribute harmful, deceptive, or illegal content.</li>
                <li>Circumvent any usage limits or security features of the Services.</li>
              </ul>
            </section>

            <section id="proprietary" className="scroll-mt-32">
              <h2>5. Proprietary Rights</h2>
              <p>
                <strong>Our Property:</strong> Geneline-X retains all rights, title, and interest in and to the Services, including all AI models, software, branding, and intellectual property.
              </p>
              <p>
                <strong>Your Content:</strong> You retain ownership of the data you upload ("Input") and the results generated for you ("Output"). You grant us a limited license to host and process your Input and Output solely to provide the Services to you.
              </p>
              <p>
                <strong>Feedback:</strong> Any feedback or suggestions you provide may be used by us without any obligation to you.
              </p>
            </section>

            <section id="disclaimer" className="scroll-mt-32">
              <h2>6. Disclaimer of Warranties</h2>
              <div className="bg-muted/50 p-6 border-l-4 border-primary/30 uppercase text-xs font-mono leading-relaxed">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, GENELINE-X DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THE SERVICES WILL BE ERROR-FREE OR UNINTERRUPTED.
              </div>
            </section>

            <section id="liability" className="scroll-mt-32">
              <h2>7. Limitation of Liability</h2>
              <div className="bg-muted/50 p-6 border-l-4 border-primary/30 uppercase text-xs font-mono leading-relaxed">
                IN NO EVENT SHALL GENELINE-X BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, OR INCIDENTAL DAMAGES ARISING OUT OF YOUR USE OF THE SERVICES. OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO US IN THE TWELVE MONTHS PRECEDING THE CLAIM.
              </div>
            </section>

            <section id="law" className="scroll-mt-32">
              <h2>8. Governing Law & Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of Sierra Leone. Any disputes arising from these Terms shall be resolved exclusively through binding arbitration or the courts of Freetown, Sierra Leone.
              </p>
            </section>

            <section id="contact" className="scroll-mt-32 border-t border-border pt-12 mt-16">
              <h2>9. Contact</h2>
              <p>Questions about these Terms? Reach out to our legal team:</p>
              <div className="bg-muted/30 p-6 rounded-none border border-border mt-6">
                <p className="font-bold text-foreground mb-1">Geneline-X Legal</p>
                <p className="text-sm">
                  <strong>Email:</strong> <a href="mailto:info@geneline-x.com" className="text-primary no-underline hover:underline">legal@geneline-x.com</a>
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}

