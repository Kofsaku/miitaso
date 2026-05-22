import { content } from "./content";

const SITE_URL = "https://www.miitaso.com";
const LP_URL = `${SITE_URL}/lp/japan-property`;

export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tsubata's Japan",
    alternateName: "miitaso Inc.",
    url: LP_URL,
    logo: `${SITE_URL}/icon.png`,
    founder: {
      "@type": "Person",
      name: "Kosaku Tsubata",
      jobTitle: "Founder & Property Advisor",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "1-12-4 Ginza, N&E BLD 6F",
      addressLocality: "Chuo-ku",
      addressRegion: "Tokyo",
      postalCode: "104-0061",
      addressCountry: "JP",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+81-90-6266-0207",
      email: "info@miitaso.com",
      contactType: "customer service",
      availableLanguage: ["English", "Japanese"],
    },
    description:
      "Advisory service curating Japanese properties (akiya, traditional houses, coastal villas) for international buyers. Personally inspected, AI-powered curation, licensed broker network.",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.en,
      },
    })),
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Tsubata's Japan",
    image: `${SITE_URL}/icon.png`,
    url: LP_URL,
    telephone: "+81-90-6266-0207",
    priceRange: "$150 – $30,000+",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1-12-4 Ginza, N&E BLD 6F",
      addressLocality: "Chuo-ku",
      addressRegion: "Tokyo",
      postalCode: "104-0061",
      addressCountry: "JP",
    },
    areaServed: {
      "@type": "Country",
      name: "Japan",
    },
    serviceType: "Real estate advisory for international buyers",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}
