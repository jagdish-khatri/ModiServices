import Link from "next/link";
import { Home, GraduationCap, Sunset, TrendingUp, Shield, Car } from "lucide-react";

const goals = [
  {
    icon: Home,
    title: "Buying a Home",
    desc: "A home is one of the largest purchases most people make. Planning helps you understand down payment requirements, home loan options, and EMI affordability.",
    products: ["Home Loan", "SIP for Down Payment", "Fixed Deposit"],
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: GraduationCap,
    title: "Children's Education",
    desc: "Education costs rise over time. Starting early with goal-based investments can help build a fund for your child's higher education.",
    products: ["SIP Investments", "Mutual Funds", "Fixed Deposits"],
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Sunset,
    title: "Retirement Planning",
    desc: "Building a retirement corpus takes time. Understanding investment options and starting with a disciplined approach can support long-term planning.",
    products: ["Long-Term SIP", "Mutual Funds", "Insurance"],
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: TrendingUp,
    title: "Building Long-Term Savings",
    desc: "Systematic investment over time can help build savings. Understanding risk, return, and investment horizon is key to informed decision-making.",
    products: ["SIP", "Lump-Sum MF", "Fixed Deposits"],
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    icon: Shield,
    title: "Protecting Your Family",
    desc: "Insurance products can help protect your family's financial stability against health events, accidents, or untimely death.",
    products: ["Life Insurance", "Health Insurance", "General Insurance"],
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    icon: Car,
    title: "Financing a Vehicle",
    desc: "Vehicle loans can make it easier to purchase a two-wheeler or car. Understanding EMIs, interest rates, and total cost is important before committing.",
    products: ["Vehicle Loan", "Personal Loan"],
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
];

export default function GoalsSection() {
  return (
    <section
      className="section-padding bg-gray-50"
      aria-labelledby="goals-heading"
    >
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-tag">Financial Goals</span>
          <h2 id="goals-heading" className="section-title mb-4">
            Understand Your Financial Goals
          </h2>
          <p className="section-subtitle">
            Different life goals call for different financial strategies. Explore
            which products might be relevant to your situation and request
            personalised guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <div
                key={goal.title}
                className={`card border ${goal.border} flex flex-col`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${goal.bg} ${goal.color} mb-4`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{goal.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">{goal.desc}</p>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Possibly relevant products</p>
                  <div className="flex flex-wrap gap-1.5">
                    {goal.products.map((p) => (
                      <span
                        key={p}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${goal.bg} ${goal.color} border ${goal.border}`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  Suitability depends on your individual circumstances, risk tolerance, and financial position.
                </p>
                <Link
                  href="/about#contact"
                  className={`text-sm font-semibold ${goal.color} hover:underline`}
                >
                  Request Guidance →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
