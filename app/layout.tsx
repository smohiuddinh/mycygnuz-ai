import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import WhatsAppFloat from '@/components/whatsapp-float'
import './globals.css'

const siteUrl = 'https://www.cygnuz.ai'

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cygnuz AI — AI Calling & Automation Agency | 24/7 Voice Agents',
    template: '%s | Cygnuz AI',
  },
  description:
    'Cygnuz AI builds 24/7 AI calling agents, chatbots, and workflow automation that handle calls, book appointments, qualify leads, and support customers — round the clock. Based in Karachi, Pakistan.',
  keywords: [
    'AI calling service',
    'AI voice agent',
    '24/7 AI calls',
    'AI call center',
    'automated calling',
    'AI chatbot',
    'workflow automation',
    'AI automation agency',
    'AI for business',
    'appointment booking AI',
    'lead qualification AI',
    'conversational AI',
    'Cygnuz AI',
    'AI agency Pakistan',
    'AI agency Karachi',
    'business automation',
    'voice AI',
    'inbound call AI',
    'outbound call AI',
    'custom AI solutions',
  ],
  authors: [{ name: 'Cygnuz AI', url: siteUrl }],
  creator: 'Cygnuz AI',
  publisher: 'Cygnuz AI',
  category: 'Technology',

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: '/',
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Cygnuz AI',
    title: 'Cygnuz AI — AI Calling & Automation Agency | 24/7 Voice Agents',
    description:
      'Deploy AI voice agents that handle calls, book appointments, and qualify leads 24/7. Cygnuz AI builds intelligent automation for businesses of every size.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cygnuz AI — 24/7 AI Calling & Automation Agency',
      },
    ],
    locale: 'en_US',
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    site: '@cygnuzai',
    creator: '@cygnuzai',
    title: 'Cygnuz AI — 24/7 AI Calling Agents & Business Automation',
    description:
      'AI voice agents that never sleep. Inbound support, outbound sales, appointment booking & lead qualification — all automated.',
    images: ['/og-image.png'],
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  // ── Verification (add your tokens from Google/Bing Search Console) ────────
  verification: {
    // google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
    // other: { 'msvalidate.01': 'YOUR_BING_TOKEN' },
  },
}

// ── JSON-LD Structured Data ────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Cygnuz AI',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/cygnuz-logo.png`,
        width: 300,
        height: 150,
      },
      description:
        'AI automation agency specialising in 24/7 AI calling agents, chatbots, workflow automation, and custom AI solutions for businesses.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Karachi',
        addressCountry: 'PK',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'cygnuzai@gmail.com',
        availableLanguage: ['English', 'Urdu'],
      },
      sameAs: [
        'https://www.linkedin.com/company/cygnuzai',
        'https://instagram.com/cygnuz.ai',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Cygnuz AI',
      publisher: { '@id': `${siteUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/?s={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: 'Cygnuz AI — AI Calling & Automation Agency | 24/7 Voice Agents',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      description:
        'Cygnuz AI deploys 24/7 AI voice calling agents, chatbots, and workflow automation that handle calls, book appointments, and support customers around the clock.',
    },
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#ai-calling`,
      name: 'AI Calling Service — 24/7 Voice Agents',
      provider: { '@id': `${siteUrl}/#organization` },
      serviceType: 'AI Voice Agent',
      description:
        'Intelligent AI voice agents that handle inbound and outbound calls 24 hours a day, 7 days a week. Features include natural conversation, appointment booking, lead qualification, CRM integration, and real-time call analytics.',
      areaServed: 'Worldwide',
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: siteUrl,
      },
    },
    {
      '@type': 'ItemList',
      name: 'Cygnuz AI Services',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'AI Calling Service',
          description: '24/7 AI voice agents for inbound support, outbound sales, and appointment booking.',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AI Chatbots',
          description: 'Conversational AI agents for customer support and engagement across platforms.',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Workflow Automation',
          description: 'End-to-end business process automation with smart AI decision-making.',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Custom AI Solutions',
          description: 'Bespoke artificial intelligence engineered around your specific business needs.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is an AI calling service?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An AI calling service uses voice AI technology to automatically handle phone calls on behalf of a business — answering queries, booking appointments, qualifying leads, and providing support 24/7 without human agents.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Cygnuz AI work 24/7?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Cygnuz AI voice agents are always active — they handle calls, respond to chats, and automate workflows 24 hours a day, 7 days a week, with no downtime.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can the AI booking agent integrate with my calendar and CRM?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. Cygnuz AI integrates with popular CRM platforms, Google Calendar, and other scheduling tools so every appointment and lead is automatically synced.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Cygnuz AI based?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cygnuz AI is headquartered in Karachi, Pakistan, and serves clients worldwide.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        {/* Geo tags */}
        <meta name="geo.region" content="PK-SD" />
        <meta name="geo.placename" content="Karachi, Pakistan" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  )
}
