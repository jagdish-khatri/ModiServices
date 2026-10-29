import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function CTASection() {
  return (
    <section
      className="section-padding bg-gradient-to-br from-teal-600 to-teal-800"
      aria-labelledby="cta-heading"
    >
      <div className="container-max text-center">
        <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Have Questions About Your Financial Goals?
        </h2>
        <p className="text-teal-100 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Connect with Modi Services to discuss your requirements and explore
          the available options. We aim to make financial information clearer
          and easier to understand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/about#contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-teal-700 shadow-lg hover:bg-teal-50 transition-colors"
          >
            Contact Us
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <a
            href={siteConfig.social.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/50 bg-transparent px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-colors"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
