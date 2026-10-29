import { Eye, Heart, BookOpen, Scale } from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "Transparency",
    desc: "We present financial product information clearly and honestly, without unrealistic promises or misleading claims.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Heart,
    title: "Client-Focused Assistance",
    desc: "We listen to your needs and help you explore options that may be relevant to your specific circumstances and goals.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: BookOpen,
    title: "Financial Awareness",
    desc: "We help clients understand financial products so they can ask informed questions and make better-informed decisions.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Scale,
    title: "Responsible Decision-Making",
    desc: "We encourage clients to consider risk, suitability, and their financial capacity before committing to any product.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function ApproachSection() {
  return (
    <section
      className="section-padding bg-gray-50"
      aria-labelledby="approach-heading"
    >
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-tag">How We Work</span>
          <h2 id="approach-heading" className="section-title mb-4">
            Our Approach
          </h2>
          <p className="section-subtitle">
            These four principles guide how we interact with our clients and
            present financial information.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="card text-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${p.bg} ${p.color} mx-auto mb-4`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
