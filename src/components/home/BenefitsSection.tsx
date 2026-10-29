import { Target, TrendingUp, Calendar, Clock, PieChart, Shield } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Goal-Based Investing",
    description:
      "Plan for education, a home, retirement, or other life goals by aligning your investments with a clear target and timeline.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    title: "The Power of Compounding",
    description:
      "Investment growth can build upon previous growth over time. Starting earlier allows more time for this effect to work in your favour.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Calendar,
    title: "Disciplined Investing",
    description:
      "Regular SIP contributions can help develop a consistent investment habit, potentially averaging out market fluctuations over time.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Clock,
    title: "Long-Term Perspective",
    description:
      "Investment duration matters. Market-linked investments experience fluctuations, and a longer horizon may help manage short-term volatility.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: PieChart,
    title: "Diversification",
    description:
      "Spreading investments across suitable asset classes or funds can help manage concentration risk. Diversification does not guarantee returns.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Shield,
    title: "Emergency Preparedness",
    description:
      "Accessible savings and appropriate insurance protection are important components of a financial plan for handling unexpected events.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

export default function BenefitsSection() {
  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="benefits-heading"
    >
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-tag">Financial Awareness</span>
          <h2 id="benefits-heading" className="section-title mb-4">
            Why Start Financial Planning Today?
          </h2>
          <p className="section-subtitle">
            Understanding the principles of financial planning can help you make
            more informed decisions about your money and your future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="card hover:-translate-y-1 transition-transform duration-200">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${benefit.bg} ${benefit.color} mb-4`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-6 py-4">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Important:</strong> Mutual fund investments are market-linked.
            Returns are not guaranteed and investment values can fall as well as
            rise. Past performance is not indicative of future results. This
            information is provided for educational purposes only and does not
            constitute personalised investment advice.
          </p>
        </div>
      </div>
    </section>
  );
}
