import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Modi Services",
  description: "Privacy Policy for Modi Services. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 lg:pt-20">
        <div className="bg-navy-950 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-navy-300">Last updated: October 2026</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 prose prose-gray max-w-none">
          <div className="space-y-8 text-gray-700 leading-relaxed">

            <section aria-labelledby="intro-heading">
              <h2 id="intro-heading" className="text-2xl font-bold text-navy-900 mb-3">1. Introduction</h2>
              <p>
                Modi Services ("we", "us", "our") is committed to protecting the privacy of individuals who
                visit our website and submit enquiries. This Privacy Policy describes how we collect, use,
                and protect the personal information you provide to us.
              </p>
              <p>
                By submitting an enquiry through our website, you acknowledge that you have read and
                understood this policy.
              </p>
            </section>

            <section aria-labelledby="collect-heading">
              <h2 id="collect-heading" className="text-2xl font-bold text-navy-900 mb-3">2. Information We Collect</h2>
              <p>When you submit an enquiry, we collect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Full name</li>
                <li>Mobile number</li>
                <li>Email address (optional)</li>
                <li>Service you are enquiring about</li>
                <li>Preferred contact method</li>
                <li>Any message or information you choose to include</li>
                <li>Date and time of your enquiry</li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> collect sensitive financial information, identity documents,
                bank account details, or payment information through this contact form.
              </p>
            </section>

            <section aria-labelledby="use-heading">
              <h2 id="use-heading" className="text-2xl font-bold text-navy-900 mb-3">3. How We Use Your Information</h2>
              <p>We use the information you provide to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Respond to your enquiry through your preferred contact method</li>
                <li>Provide information about the financial services you have asked about</li>
                <li>Maintain a record of your contact with Modi Services</li>
              </ul>
              <p className="mt-3">
                We will not use your contact details for unsolicited marketing without your consent.
              </p>
            </section>

            <section aria-labelledby="share-heading">
              <h2 id="share-heading" className="text-2xl font-bold text-navy-900 mb-3">4. Sharing of Information</h2>
              <p>
                We do not sell, rent, or share your personal information with third parties for their
                marketing purposes. We may share your information only where necessary to respond to
                your enquiry (for example, connecting you with a relevant financial product provider
                at your request) or where required by law.
              </p>
            </section>

            <section aria-labelledby="security-heading">
              <h2 id="security-heading" className="text-2xl font-bold text-navy-900 mb-3">5. Data Security</h2>
              <p>
                We take reasonable steps to protect your personal information from unauthorised access,
                use, or disclosure. Enquiry data is stored in a secure database accessible only to
                authorised Modi Services staff. Our website uses HTTPS in production.
              </p>
            </section>

            <section aria-labelledby="retention-heading">
              <h2 id="retention-heading" className="text-2xl font-bold text-navy-900 mb-3">6. Data Retention</h2>
              <p>
                We retain your enquiry information for as long as it is needed to fulfil the purpose
                for which it was collected or as required by applicable law. You may request deletion
                of your information by contacting us.
              </p>
            </section>

            <section aria-labelledby="rights-heading">
              <h2 id="rights-heading" className="text-2xl font-bold text-navy-900 mb-3">7. Your Rights</h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal
                information held by Modi Services. To exercise these rights, please contact us using
                the details below.
              </p>
            </section>

            <section aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="text-2xl font-bold text-navy-900 mb-3">8. Contact</h2>
              <p>
                For privacy-related enquiries or requests, please contact Modi Services through our{" "}
                <Link href="/about#contact" className="text-navy-700 underline hover:text-navy-900">
                  Contact Us
                </Link>{" "}
                page.
              </p>
            </section>

            <div className="rounded-xl bg-amber-50 border border-amber-200 px-6 py-4">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> This Privacy Policy is a placeholder document. Before launching
                your website, please consult a legal professional to ensure this policy complies with
                the applicable Indian data protection and privacy laws, including the Digital Personal
                Data Protection Act, 2023, and any other regulations relevant to your business.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
