// Central configuration for Modi Services website
// Update these values with real business details before going live

export const siteConfig = {
  name: "Modi Services",
  tagline: "Your Partner in Financial Planning",
  description:
    "Modi Services helps individuals and families explore mutual funds, SIP investments, loans, fixed deposits, and insurance solutions.",

  contact: {
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91-XXXXXXXXXX",
    whatsapp: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "+91XXXXXXXXXX",
    email:
      process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@modiservices.in",
    address:
      process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ||
      "Modi Services, [City], [State], India",
    hours:
      process.env.NEXT_PUBLIC_BUSINESS_HOURS || "Mon–Sat: 9:00 AM – 6:00 PM",
  },

  founder: {
    name: "Madhu Modi",
    designation: "Founder, Modi Services",
    bio: "Madhu Modi is the founder of Modi Services, a financial services business focused on helping clients explore investment, lending, fixed deposit, and insurance options. Through Modi Services, Madhu aims to make financial products easier to understand and help clients navigate their financial requirements with clarity and care. The business is built around clear communication, client-focused assistance, and informed financial decisions.",
    // Replace with actual photo path when available
    photo: "/images/founder-placeholder.jpg",
  },

  social: {
    whatsappLink: `https://wa.me/${(
      process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "+91XXXXXXXXXX"
    ).replace(/\D/g, "")}`,
  },

  meta: {
    home: {
      title: "Modi Services | Mutual Funds, Loans, FD & Insurance",
      description:
        "Explore mutual funds, SIP investments, loans, fixed deposits, and insurance solutions with guidance from Modi Services. Serving clients across India.",
    },
    about: {
      title: "About Modi Services | Madhu Modi",
      description:
        "Learn about Modi Services and founder Madhu Modi. We help individuals and families understand and explore financial products for their goals.",
    },
    admin: {
      title: "Admin | Modi Services Lead Management",
    },
  },

  disclaimer:
    "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Historical performance does not guarantee future results. Illustrative calculators and charts are provided for educational purposes only and are not guarantees of returns or personalised investment advice. Loan approval, interest rates, deposit terms, insurance coverage, and eligibility depend on the relevant provider's terms and assessment.",

  // CSV data configuration
  csvConfig: {
    dataDir: process.env.CSV_DATA_DIR || "data",
    primaryFile: process.env.CSV_PRIMARY_FILE || "mutual_funds.csv",
  },
};

export type SiteConfig = typeof siteConfig;
