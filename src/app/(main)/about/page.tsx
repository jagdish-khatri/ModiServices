import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import AboutHero from "@/components/about/AboutHero";
import FounderSection from "@/components/about/FounderSection";
import ApproachSection from "@/components/about/ApproachSection";
import ContactInfoSection from "@/components/about/ContactInfoSection";
import ContactForm from "@/components/about/ContactForm";

export const metadata: Metadata = {
  title: siteConfig.meta.about.title,
  description: siteConfig.meta.about.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FounderSection />
      <ApproachSection />
      <ContactInfoSection />
      <ContactForm />
    </>
  );
}
