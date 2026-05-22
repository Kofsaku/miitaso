import { I18nProvider } from "./_components/i18n-context";
import { LpHeader } from "./_components/header";
import { HeroSection } from "./_components/hero-section";
import { SamplePropertiesSection } from "./_components/sample-properties";
import {
  PainPointsSection,
  SolutionSection,
  PackagesSection,
  ProcessSection,
  WhyUsSection,
  AboutSection,
  FaqSection,
  CtaSection,
  LpFooter,
} from "./_components/sections";

export const metadata = {
  title: "Tsubata's Japan — Authentic Japanese Properties, Curated by an Insider",
  description:
    "Find your authentic Japanese home with Kosaku Tsubata. Personally inspected properties, AI-powered curation, licensed broker network. Free 15-min discovery call.",
};

export default function JapanPropertyLp() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-white font-sans antialiased">
        <LpHeader />
        <main>
          <HeroSection />
          <PainPointsSection />
          <SolutionSection />
          <PackagesSection />
          <SamplePropertiesSection />
          <ProcessSection />
          <WhyUsSection />
          <AboutSection />
          <FaqSection />
          <CtaSection />
        </main>
        <LpFooter />
      </div>
    </I18nProvider>
  );
}
