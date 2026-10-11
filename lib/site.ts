// Single source of truth for brand, URLs and contact details.
// The production site is served from www.cygnuzai.com (cygnuzai.com 307s there).

export const site = {
  name: "Cygnuz AI",
  url: "https://www.cygnuzai.com",
  tagline: "AI Automation Agency",
  description:
    "Cygnuz AI is an AI automation agency that builds AI agents, 24/7 AI call agents, chatbots and workflow automation that cut operational costs and save teams 100+ hours a month.",
  email: "cygnuzai@gmail.com",
  whatsapp: "923332357372",
  location: { city: "Karachi", region: "Sindh", country: "PK", label: "Karachi, Pakistan" },
  aiCallerAppUrl: "https://aicaller.cygnuzai.com/",
  socials: {
    linkedin: "https://www.linkedin.com/company/cygnuzai",
    instagram: "https://instagram.com/cygnuz.ai",
  },
} as const

export const whatsappUrl = `https://wa.me/${site.whatsapp}`

export const navItems = [
  { name: "Services", href: "/#services", section: "services" },
  { name: "Process", href: "/#process", section: "process" },
  { name: "Why Us", href: "/#why-us", section: "why-us" },
  { name: "AI Call Agent", href: "/ai-calling", section: null },
  { name: "FAQ", href: "/#faq", section: "faq" },
] as const
