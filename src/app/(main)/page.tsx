import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import SIPCalculator from "@/components/home/SIPCalculator";
import InvestmentChartsSection from "@/components/home/InvestmentChartsSection";
import GoalsSection from "@/components/home/GoalsSection";
import ServiceCarousel from "@/components/home/ServiceCarousel";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: siteConfig.meta.home.title,
  description: siteConfig.meta.home.description,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <BenefitsSection />
      <SIPCalculator />
      <InvestmentChartsSection />
      <GoalsSection />
      <ServiceCarousel />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
