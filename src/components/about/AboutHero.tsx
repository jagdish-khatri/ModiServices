export default function AboutHero() {
  return (
    <section
      className="relative bg-gradient-to-br from-navy-950 via-navy-800 to-navy-700 text-white py-20 lg:py-28"
      aria-label="About Modi Services"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 60%, rgba(20,184,166,0.4) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block rounded-full bg-teal-500/20 border border-teal-400/30 px-4 py-1.5 text-sm font-semibold text-teal-300 mb-6">
          About Us
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          About <span className="text-teal-400">Modi Services</span>
        </h1>
        <p className="text-lg text-navy-200 leading-relaxed max-w-3xl mx-auto">
          Modi Services helps individuals and families explore financial products
          that support their savings, borrowing, protection, and long-term
          planning needs. Our services include mutual fund investment assistance,
          SIP and lump-sum investment options, loans, fixed deposits, and
          insurance.
        </p>
        <p className="mt-4 text-navy-200 leading-relaxed max-w-3xl mx-auto">
          We aim to make financial information easier to understand so that
          clients can ask informed questions and explore solutions suited to
          their individual circumstances.
        </p>
      </div>
    </section>
  );
}
