import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Modi Services",
  description: "Terms and Conditions for using the Modi Services website.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 lg:pt-20">
        <div className="bg-navy-950 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl font-bold mb-3">Terms &amp; Conditions</h1>
            <p className="text-navy-300">Last updated: October 2026</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="space-y-8 text-gray-700 leading-relaxed">

            <section aria-labelledby="acceptance-heading">
              <h2 id="acceptance-heading" className="text-2xl font-bold text-navy-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Modi Services website, you accept and agree to be bound by
                these Terms and Conditions. If you do not agree with any part of these terms, please
                do not use this website.
              </p>
            </section>

            <section aria-labelledby="nature-heading">
              <h2 id="nature-heading" className="text-2xl font-bold text-navy-900 mb-3">2. Nature of Information Provided</h2>
              <p>
                The information on this website is provided for general educational and awareness purposes
                only. It does not constitute personalised financial advice, investment recommendation,
                or solicitation to buy or sell any financial product.
              </p>
              <p className="mt-3">
                Modi Services is not a bank, lender, insurer, or asset management company. Any financial
                product information is provided for reference only. Actual product terms, eligibility,
                and availability depend on the relevant financial institution's assessment and policies.
              </p>
            </section>

            <section aria-labelledby="investment-heading">
              <h2 id="investment-heading" className="text-2xl font-bold text-navy-900 mb-3">3. Investment Risk Disclaimer</h2>
              <p>
                Mutual fund investments are subject to market risks. Past performance is not indicative
                of future results. Investment values can fall as well as rise. You may receive back
                less than you originally invest. Before investing, read all scheme-related documents
                carefully.
              </p>
              <p className="mt-3">
                Illustrative calculators and charts on this website are for educational purposes only
                and are not guarantees of returns. Actual returns will depend on market conditions and
                individual fund performance.
              </p>
            </section>

            <section aria-labelledby="accuracy-heading">
              <h2 id="accuracy-heading" className="text-2xl font-bold text-navy-900 mb-3">4. Accuracy of Information</h2>
              <p>
                While we endeavour to keep the information on this website accurate and up to date,
                we make no representations or warranties about its completeness, accuracy, or
                suitability for any particular purpose. Financial product terms and interest rates
                change over time and may differ from what is shown here.
              </p>
            </section>

            <section aria-labelledby="links-heading">
              <h2 id="links-heading" className="text-2xl font-bold text-navy-900 mb-3">5. Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites. These links are provided for
                your convenience only. Modi Services is not responsible for the content or practices
                of any third-party website and does not endorse them.
              </p>
            </section>

            <section aria-labelledby="liability-heading">
              <h2 id="liability-heading" className="text-2xl font-bold text-navy-900 mb-3">6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Modi Services shall not be liable for any loss
                or damage arising from your use of or reliance on information provided on this website.
                All financial decisions should be made after consulting with a qualified and registered
                financial adviser.
              </p>
            </section>

            <section aria-labelledby="changes-heading">
              <h2 id="changes-heading" className="text-2xl font-bold text-navy-900 mb-3">7. Changes to These Terms</h2>
              <p>
                Modi Services reserves the right to update these Terms and Conditions at any time.
                Continued use of the website after changes are posted constitutes your acceptance of
                the revised terms.
              </p>
            </section>

            <section aria-labelledby="governing-heading">
              <h2 id="governing-heading" className="text-2xl font-bold text-navy-900 mb-3">8. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by the laws of India. Any disputes shall be
                subject to the exclusive jurisdiction of the competent courts in India.
              </p>
            </section>

            <div className="rounded-xl bg-amber-50 border border-amber-200 px-6 py-4">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> This is a placeholder Terms and Conditions document. Please
                consult a legal professional before publishing this website to ensure these terms
                are appropriate for your specific business, services, and applicable Indian laws.
              </p>
            </div>

            <p className="text-sm text-gray-500">
              For questions about these terms, please use our{" "}
              <Link href="/about#contact" className="text-navy-700 underline hover:text-navy-900">
                Contact Us
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
