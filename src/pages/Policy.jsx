import React from "react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";

export default function Policy() {
  return (
    <div data-testid="policy-page">
      <PageHeader
        eyebrow="Privacy Policy"
        title="How we handle your information"
        subtitle="This is a general privacy policy for our website. For legal accuracy, please replace this template with your organization’s final text."
        testid="policy-header"
      />

      <section className="container-page py-16 md:py-24">
        <div className="prose prose-slate max-w-3xl">
          <p>
            This Privacy Policy describes how <strong>Jain Associates</strong>{" "}
            ("we", "us") collects, uses, and shares information when you visit
            our website and submit forms.
          </p>

          <h2>1. Information we collect</h2>
          <ul>
            <li>Contact details you provide (e.g., name, email, phone)</li>
            <li>Information you submit through enquiry forms</li>
            <li>
              Technical data (e.g., IP address, browser type, pages viewed,
              timestamps)
            </li>
          </ul>

          <h2>2. How we use your information</h2>
          <ul>
            <li>
              To respond to your enquiries and provide requested information
            </li>
            <li>
              To understand website performance and improve the user experience
            </li>
            <li>To comply with legal and regulatory obligations</li>
          </ul>

          <h2>3. Cookies and similar technologies</h2>
          <p>
            We may use cookies or similar technologies to operate the site and
            collect analytics data. You can manage cookies through your browser
            settings.
          </p>

          <h2>4. Sharing of information</h2>
          <p>
            We may share information with service providers who help us run the
            website, subject to confidentiality obligations. We do not sell your
            personal information.
          </p>

          <h2>5. Data retention</h2>
          <p>
            We retain information for as long as needed to fulfil the purposes
            described in this policy, unless a longer retention period is
            required or permitted by law.
          </p>

          <h2>6. Your rights</h2>
          <p>
            Depending on applicable law, you may have rights to access, correct,
            delete, or restrict the processing of your information. To exercise
            your rights, contact us using the details on the website.
          </p>

          <h2>7. Security</h2>
          <p>
            We implement reasonable administrative, technical, and
            organizational measures to protect personal information. No method
            of transmission over the Internet or electronic storage is 100%
            secure.
          </p>

          <h2>8. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated
            version will be posted on this page.
          </p>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
