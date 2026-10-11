import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react"
import { site, whatsappUrl } from "@/lib/site"

const columns = [
  {
    title: "Services",
    links: [
      { name: "AI Call Agents", href: "/ai-calling" },
      { name: "Workflow Automation", href: "/#services" },
      { name: "AI Agents & Chatbots", href: "/#services" },
      { name: "Custom AI Software", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "How it works", href: "/#process" },
      { name: "Why Cygnuz AI", href: "/#why-us" },
      { name: "FAQ", href: "/#faq" },
      { name: "Contact", href: "/#contact" },
    ],
  },
]

const socials = [
  { icon: Linkedin, label: "Cygnuz AI on LinkedIn", href: site.socials.linkedin },
  { icon: Instagram, label: "Cygnuz AI on Instagram", href: site.socials.instagram },
  { icon: MessageCircle, label: "Chat with Cygnuz AI on WhatsApp", href: whatsappUrl },
  { icon: Mail, label: "Email Cygnuz AI", href: `mailto:${site.email}` },
]

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-slate-950">
      <div className="container-page py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="col-span-2 max-w-sm md:col-span-1">
            <Link href="/" aria-label="Cygnuz AI — home" className="inline-block rounded-md">
              <Image src="/images/cygnuz-logo.webp" alt="Cygnuz AI" width={331} height={203} className="h-14 w-auto" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              AI automation agency building AI agents, 24/7 voice agents and workflow automation that help businesses
              save time, cut operational costs and scale.
            </p>
            <ul className="mt-6 flex gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-slate-400 transition-colors duration-200 hover:border-white/20 hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{col.title}</h2>
              <ul className="space-y-1">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="inline-flex min-h-9 items-center text-sm text-slate-300 transition-colors hover:text-white">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cygnuz AI. All rights reserved.</p>
          <p>{site.location.label} · Serving clients worldwide</p>
        </div>
      </div>
    </footer>
  )
}
