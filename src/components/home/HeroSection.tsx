import Link from "next/link";
import { ArrowRight, MessageCircle, Shield, TrendingUp, Target } from "lucide-react";
import { siteConfig } from "@/config/site";

const stats = [
  { icon: TrendingUp, label: "Mutual Funds & SIP", desc: "Goal-based investing" },
  { icon: Shield, label: "Insurance", desc: "Family protection" },
  { icon: Target, label: "Loan Assistance", desc: "Home, Personal & more" },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-800 to-navy-700 text-white"
      aria-label="Hero - Modi Services Financial Planning"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(20,184,166,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.3) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <span className="inline-block rounded-full bg-teal-500/20 border border-teal-400/30 px-4 py-1.5 text-sm font-semibold text-teal-300 mb-6">
              Financial Services · India
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Plan Today.{" "}
              <span className="text-teal-400">Build a More</span>{" "}
              Secure Tomorrow.
            </h1>
            <p className="text-lg text-navy-200 leading-relaxed mb-8 max-w-xl">
              Explore mutual funds, SIP investments, loans, fixed deposits, and
              insurance solutions with guidance from Modi Services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/#services" className="btn-teal px-8 py-3.5 text-base">
                Explore Our Services
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/about#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Trust note */}
            <p className="text-xs text-navy-300 max-w-lg">
              ⚠️ Mutual fund investments are subject to market risks. Read all
              scheme-related documents carefully before investing.
            </p>
          </div>

          {/* Right: Illustration card */}
          <div className="relative">
            <div className="relative rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8">
              <div className="grid grid-cols-1 gap-4">
                {stats.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-xl bg-white/10 p-4 border border-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 border border-teal-400/30">
                      <Icon className="h-6 w-6 text-teal-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{label}</p>
                      <p className="text-sm text-navy-200">{desc}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-2 rounded-xl bg-teal-500/20 border border-teal-400/30 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-teal-300">Illustrative SIP Growth</span>
                    <span className="text-xs text-navy-300">For illustration only</span>
                  </div>
                  {/* Simple bar visualization */}
                  <div className="flex items-end gap-1.5 h-16">
                    {[30, 40, 52, 61, 75, 88, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all"
                        style={{
                          height: `${h}%`,
                          background: i === 6
                            ? "rgb(20,184,166)"
                            : `rgba(20,184,166,${0.3 + i * 0.1})`,
                        }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-navy-300 mt-2">
                    Illustrative only · Not a forecast or guarantee
                  </p>
                </div>
              </div>

              {/* WhatsApp quick contact */}
              <a
                href={siteConfig.social.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-3 rounded-xl bg-green-600/90 hover:bg-green-500 p-4 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-white" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-white">Get in Touch</p>
                  <p className="text-xs text-green-100">Chat on WhatsApp for quick assistance</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
