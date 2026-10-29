import Link from "next/link";
import { TrendingUp, Home, PiggyBank, Shield, ArrowRight } from "lucide-react";

const services = [
  {
    id: "mutual-funds",
    icon: TrendingUp,
    title: "Mutual Funds & SIP",
    description:
      "Explore systematic investment plans (SIP) and lump-sum mutual fund options. Learn about goal-based investing, risk profiles, and investment horizons.",
    features: ["SIP Investments", "Lump-Sum Options", "Goal-Based Planning", "Long-Term Wealth Creation"],
    href: "/#services",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    cta: "Enquire Now",
  },
  {
    id: "loans",
    icon: Home,
    title: "Loan Assistance",
    description:
      "Explore loan options across home, personal, gold, and vehicle categories. We help you understand loan terms, interest rates, and eligibility considerations.",
    features: ["Home Loan", "Personal Loan", "Gold Loan", "Vehicle Loan"],
    href: "/#loans",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    cta: "Request Assistance",
  },
  {
    id: "fixed-deposits",
    icon: PiggyBank,
    title: "Fixed Deposits (FD)",
    description:
      "Understand fixed deposit products — how they work, interest options, tenure, premature withdrawal conditions, and relevant tax considerations.",
    features: ["Competitive Interest Rates", "Flexible Tenures", "Interest Payout Options", "Premature Withdrawal Info"],
    href: "/#fixed-deposits",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    cta: "Learn More",
  },
  {
    id: "insurance",
    icon: Shield,
    title: "Insurance",
    description:
      "Learn about life, health, and general insurance products. Understand how insurance can help manage financial risks and protect your family and assets.",
    features: ["Life Insurance", "Health Insurance", "General Insurance", "Risk Management"],
    href: "/#insurance",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    cta: "Request Assistance",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="section-padding bg-gray-50"
      aria-labelledby="services-heading"
    >
      <div className="container-max">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-tag">What We Offer</span>
          <h2 id="services-heading" className="section-title mb-4">
            Our Financial Services
          </h2>
          <p className="section-subtitle">
            Modi Services provides information and assistance across four core
            areas of personal finance. Explore the options suited to your goals.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`card flex flex-col border ${service.border} hover:-translate-y-1 transition-transform duration-200`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.bg} ${service.color} mb-5`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-1.5 mb-5" role="list">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${service.bg} ${service.color} bg-current`} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${service.color} hover:gap-2.5 transition-all duration-150`}
                >
                  {service.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Loan cards subsection */}
        <div id="loans" className="mt-16">
          <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">Loan Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Home Loan",
                desc: "Explore home loan options for purchasing, constructing, or renovating your home. Understand interest types, tenures, and eligibility factors.",
                note: "Eligibility and terms depend on lender assessment.",
              },
              {
                title: "Personal Loan",
                desc: "Unsecured loans that can be used for a variety of personal needs. Compare rates, understand processing fees and repayment obligations.",
                note: "Interest rates vary by lender and borrower profile.",
              },
              {
                title: "Gold Loan",
                desc: "Loans secured against gold assets. Understand loan-to-value ratios, interest rates, and repayment options before pledging your gold.",
                note: "Gold valuations and terms depend on lender policy.",
              },
              {
                title: "Vehicle Loan",
                desc: "Financing options for two-wheelers, cars, and commercial vehicles. Learn about down payment requirements, tenures, and EMI calculations.",
                note: "Approval subject to lender eligibility criteria.",
              },
            ].map((loan) => (
              <div key={loan.title} className="card border border-amber-100">
                <h4 className="font-bold text-navy-900 mb-2">{loan.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{loan.desc}</p>
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mb-4">{loan.note}</p>
                <Link
                  href="/about#contact"
                  className="btn-secondary text-xs py-2"
                >
                  Request Assistance
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Deposits section */}
        <div id="fixed-deposits" className="mt-16 rounded-2xl bg-teal-50 border border-teal-100 p-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-4">Fixed Deposits (FD / FDR)</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Fixed deposits offer a predetermined interest rate for a specified tenure. Understanding the terms, tax implications, and conditions before investing is important.
              </p>
              <ul className="space-y-3" role="list">
                {[
                  "How fixed deposits work — principal locked for a tenure, earning interest",
                  "Interest payout options — monthly, quarterly, cumulative at maturity",
                  "Premature withdrawal — conditions and applicable penalties vary by institution",
                  "Tax consideration — interest earned is taxable as per applicable income-tax slab",
                  "Not all fixed deposits are government-guaranteed — distinguish between bank FDs and other deposit products",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-white border border-teal-200 p-6">
              <h4 className="font-bold text-navy-900 mb-4">Questions to Ask Before Investing</h4>
              <ul className="space-y-2" role="list">
                {[
                  "What is the applicable interest rate and tenure?",
                  "Are there penalty charges for premature withdrawal?",
                  "Is the deposit covered under deposit insurance?",
                  "What is the tax treatment of interest earned?",
                  "Is the institution regulated by RBI or another authority?",
                  "What is the interest payout frequency?",
                ].map((q, i) => (
                  <li key={q} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-teal-600 font-bold shrink-0">{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ul>
              <Link href="/about#contact" className="btn-teal mt-5 text-sm py-2.5">
                Enquire About FD Options
              </Link>
            </div>
          </div>
        </div>

        {/* Insurance section */}
        <div id="insurance" className="mt-16 rounded-2xl bg-purple-50 border border-purple-100 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Insurance Products</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Insurance helps manage financial risk by transferring the impact of specified events to an insurer. Understanding what is and is not covered is essential before purchasing any policy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {["Life Insurance", "Health Insurance", "General Insurance"].map((type) => (
                  <div key={type} className="rounded-lg bg-white border border-purple-200 p-3 text-center">
                    <span className="text-sm font-semibold text-purple-700">{type}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 bg-white rounded-lg border border-purple-100 p-3 mb-5">
                ⚠️ Insurance suitability depends on individual circumstances. Claim settlement is subject to policy terms and conditions.
              </p>
              <Link href="/about#contact" className="btn-primary">
                Request Insurance Assistance
              </Link>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-navy-900">Why Consider Insurance?</h4>
              {[
                { title: "Income Replacement", desc: "Life insurance can help protect your family's financial stability in the event of an untimely death." },
                { title: "Medical Expenses", desc: "Health insurance can help manage hospitalisation costs and reduce out-of-pocket medical expenses." },
                { title: "Asset Protection", desc: "General insurance can help protect your home, vehicle, and other assets against specified risks." },
              ].map((item) => (
                <div key={item.title} className="rounded-lg bg-white border border-purple-100 p-4">
                  <h5 className="font-semibold text-navy-800 text-sm mb-1">{item.title}</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
