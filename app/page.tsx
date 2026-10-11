import HeroSection from "@/components/hero-section"
import { Portfolio } from "@/components/portfolio"
import Problems from "@/components/problems"
import WhatWeDo from "@/components/what-we-do"
import Process from "@/components/process"
import WhyUs from "@/components/why-us"
import Faq from "@/components/faq"
import ContactSection from "@/components/contact-section"
import { faqs } from "@/lib/faqs"
import { site } from "@/lib/site"

const services = [
  {
    name: "AI Call Agents",
    description: "24/7 AI voice agents for inbound support, outbound sales, appointment booking and lead qualification.",
    url: `${site.url}/ai-calling`,
  },
  {
    name: "Workflow & Business Process Automation",
    description: "End-to-end automation of repetitive business processes with AI-driven decision making and integrations.",
  },
  {
    name: "AI Agents & Chatbots",
    description: "Conversational AI agents that resolve customer queries and take action across platforms.",
  },
  {
    name: "Custom AI Software",
    description: "Bespoke AI-powered web and mobile applications built around specific business needs.",
  },
]

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: "Cygnuz AI — AI Automation Agency for AI Agents & Workflows",
      description: site.description,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "OfferCatalog",
      "@id": `${site.url}/#services`,
      name: "AI automation services",
      itemListElement: services.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          ...(s.url ? { url: s.url } : {}),
          provider: { "@id": `${site.url}/#organization` },
          areaServed: "Worldwide",
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <HeroSection />
      <Portfolio />
      <Problems />
      <WhatWeDo />
      <Process />
      <WhyUs />
      <Faq />
      <ContactSection />
    </>
  )
}
