import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import Navbar from "@/components/navbar"
import SiteFooter from "@/components/site-footer"
import Preloader from "@/components/preloader"
import RevealObserver from "@/components/reveal-observer"
import WhatsAppFloat from "@/components/whatsapp-float"
import { site } from "@/lib/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Cygnuz AI — AI Automation Agency for AI Agents & Workflows",
    template: "%s | Cygnuz AI",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    title: "Cygnuz AI — AI Automation Agency",
    description:
      "AI agents, 24/7 AI call agents and workflow automation that cut costs and save your team 100+ hours a month.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cygnuz AI — AI Automation Agency",
    description:
      "AI agents, 24/7 AI call agents and workflow automation that cut costs and save your team 100+ hours a month.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Add Search Console / Bing tokens here once verified:
  // verification: { google: "", other: { "msvalidate.01": "" } },
}

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/icon-512.png`,
        width: 512,
        height: 512,
      },
      description: site.description,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.country,
      },
      areaServed: "Worldwide",
      knowsAbout: [
        "AI automation",
        "Business process automation",
        "AI agents",
        "AI voice agents",
        "Workflow automation",
        "Conversational AI",
        "Custom AI software development",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: `+${site.whatsapp}`,
        availableLanguage: ["English", "Urdu"],
      },
      sameAs: [site.socials.linkedin, site.socials.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
}

// Runs before first paint: flags JS for the reveal system and skips the
// preloader for visitors who have already seen it this session.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('cz-preloaded'))d.setAttribute('data-preloaded','')}catch(e){}})();`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        >
          Skip to content
        </a>
        <Preloader />
        <Navbar />
        <main id="main">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <RevealObserver />
      </body>
    </html>
  )
}
