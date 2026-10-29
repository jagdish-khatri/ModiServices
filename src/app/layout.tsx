import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.meta.home.title,
    template: `%s | Modi Services`,
  },
  description: siteConfig.meta.home.description,
  keywords: [
    "mutual funds",
    "SIP",
    "investment",
    "loans",
    "fixed deposit",
    "insurance",
    "financial planning",
    "India",
    "Modi Services",
    "Madhu Modi",
  ],
  authors: [{ name: "Modi Services" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://modiservices.in",
    siteName: "Modi Services",
    title: siteConfig.meta.home.title,
    description: siteConfig.meta.home.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
