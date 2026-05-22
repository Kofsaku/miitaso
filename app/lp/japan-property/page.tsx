import { I18nProvider } from "./_components/i18n-context";
import { LpHeader } from "./_components/header";
import { HeroSection } from "./_components/hero-section";
import { SamplePropertiesSection } from "./_components/sample-properties";
import { StructuredData } from "./_components/structured-data";
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

export default function JapanPropertyLp() {
  return (
    <I18nProvider>
      <StructuredData />
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
