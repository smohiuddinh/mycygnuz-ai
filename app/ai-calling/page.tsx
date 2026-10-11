import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import AICallingSection from "@/components/ai-calling"
import ContactSection from "@/components/contact-section"
import { site } from "@/lib/site"

const title = "AI Call Agent — 24/7 AI Voice Agents for Business"
const description =
  "Deploy a 24/7 AI voice agent that answers every call, books appointments, qualifies leads and follows up — with CRM & calendar sync. Built by Cygnuz AI."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai-calling" },
  openGraph: { type: "website", url: "/ai-calling", siteName: site.name, title, description },
  twitter: { card: "summary_large_image", title, description },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${site.url}/ai-calling#service`,
      name: "AI Call Agent",
      serviceType: "AI voice agent",
      description,
      url: `${site.url}/ai-calling`,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: "Worldwide",
      availableChannel: { "@type": "ServiceChannel", serviceUrl: site.aiCallerAppUrl },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "AI Call Agent", item: `${site.url}/ai-calling` },
      ],
    },
  ],
}

export default function AICallingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section
        aria-labelledby="ai-calling-title"
        className="relative isolate overflow-hidden pb-16 pt-[calc(var(--nav-h)+3rem)] sm:pb-20 lg:pt-[calc(var(--nav-h)+4.5rem)]"
      >
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="absolute left-1/2 top-[-12rem] -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.16),transparent)]" />

        <div className="container-page flex flex-col items-center text-center">
          <nav aria-label="Breadcrumb" className="animate-fade-up mb-8">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500">
              <li>
                <Link href="/" className="transition-colors hover:text-slate-200">Home</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li aria-current="page" className="text-slate-300">AI Call Agent</li>
            </ol>
          </nav>

          <span className="chip animate-fade-up mb-7">
            <span className="live-dot" />
            Flagship product · Active 24/7
          </span>

          <h1
            id="ai-calling-title"
            className="max-w-4xl text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4rem]"
          >
            An AI call agent that <span className="text-gradient">never misses a call</span>
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            A natural-sounding voice agent that answers every call, books appointments, qualifies leads and supports
            customers — with zero wait time, around the clock.
          </p>
          <div
            className="animate-fade-up mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
            style={{ "--delay": "220ms" } as React.CSSProperties}
          >
            <a href={site.aiCallerAppUrl} target="_blank" rel="noopener noreferrer" className="btn-primary group w-full sm:w-auto">
              Try the AI Call Agent
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <Link href="#contact" className="btn-secondary w-full sm:w-auto">
              Book a free demo call
            </Link>
          </div>
        </div>
      </section>

      <AICallingSection appUrl={site.aiCallerAppUrl} />
      <ContactSection />
    </>
  )
}
