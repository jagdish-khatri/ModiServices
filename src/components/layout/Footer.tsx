import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, TrendingUp, Clock, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Contact Us", href: "/about#contact" },
];

const serviceLinks = [
  { label: "Mutual Funds & SIP", href: "/#services" },
  { label: "Loans", href: "/#loans" },
  { label: "Fixed Deposits", href: "/#fixed-deposits" },
  { label: "Insurance", href: "/#insurance" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white" role="contentinfo">
      {/* Disclaimer banner */}
      <div className="bg-amber-900/40 border-b border-amber-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-amber-200 leading-relaxed">
            <strong className="font-semibold">Financial Risk Disclaimer:</strong>{" "}
            {siteConfig.disclaimer}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 text-white">
                <TrendingUp className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-white">Modi Services</span>
            </Link>
            <p className="text-sm text-navy-200 leading-relaxed mb-5">
              Helping individuals and families explore financial products that
              support their savings, borrowing, protection, and long-term
              planning needs.
            </p>
            <a
              href={siteConfig.social.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy-300 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-200 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy-300 mb-4 mt-8">
              Our Services
            </h3>
            <ul className="space-y-3" role="list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-200 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy-300 mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4" role="list">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-navy-400 mb-0.5">Phone</p>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-sm text-navy-200 hover:text-white transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-navy-400 mb-0.5">WhatsApp</p>
                  <a
                    href={siteConfig.social.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-navy-200 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {siteConfig.contact.whatsapp}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-navy-400 mb-0.5">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm text-navy-200 hover:text-white transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-navy-400 mb-0.5">Address</p>
                  <p className="text-sm text-navy-200">{siteConfig.contact.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-navy-400 mb-0.5">Business Hours</p>
                  <p className="text-sm text-navy-200">{siteConfig.contact.hours}</p>
                </div>
              </li>
            </ul>

            {/* Mutual Fund Provider Names */}
            <div className="mt-8">
              <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3">
                Mutual Fund Information Available For
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "HDFC MF",
                  "Nippon India MF",
                  "Aditya Birla SL MF",
                  "SBI MF",
                  "ICICI Prudential MF",
                  "Kotak MF",
                  "UTI MF",
                ].map((fund) => (
                  <span
                    key={fund}
                    className="rounded-md bg-navy-800 px-2.5 py-1 text-xs text-navy-300"
                  >
                    {fund}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-400 text-center sm:text-left">
            © {currentYear} Modi Services. All rights reserved. | Designed to inform, not to advise.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-navy-400 hover:text-navy-200 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
