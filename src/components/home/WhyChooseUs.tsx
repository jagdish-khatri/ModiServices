import { CheckCircle, MessageCircle, BookOpen, Users, Layers } from "lucide-react";

const reasons = [
  {
    icon: BookOpen,
    title: "Clear Explanations",
    desc: "We explain financial products in plain language so you can ask better questions and make more informed decisions.",
  },
  {
    icon: Users,
    title: "Client-Focused Assistance",
    desc: "Our assistance is tailored to your needs and circumstances rather than a one-size-fits-all approach.",
  },
  {
    icon: MessageCircle,
    title: "Convenient Enquiry Process",
    desc: "Reach us by phone, WhatsApp, or our contact form — whichever works best for you.",
  },
  {
    icon: Layers,
    title: "Multiple Financial Services",
    desc: "Access information about mutual funds, loans, fixed deposits, and insurance under one roof.",
  },
  {
    icon: CheckCircle,
    title: "Transparency",
    desc: "We focus on transparency and informed decisions. We do not make unrealistic promises or guarantee returns.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="section-padding bg-navy-900"
      aria-labelledby="why-choose-heading"
    >
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block rounded-full bg-teal-500/20 border border-teal-400/30 px-4 py-1.5 text-sm font-semibold text-teal-300 mb-4">
              Why Modi Services?
            </span>
            <h2 id="why-choose-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Service Principles
            </h2>
            <p className="text-navy-200 leading-relaxed">
              Modi Services is built on clear communication, client-focused
              assistance, and responsible financial guidance. Here is what you
              can expect when you work with us.
            </p>
          </div>
          <div className="space-y-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="flex items-start gap-4 rounded-xl bg-navy-800/60 border border-navy-700 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/20">
                    <Icon className="h-5 w-5 text-teal-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{reason.title}</h3>
                    <p className="text-sm text-navy-300 leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
