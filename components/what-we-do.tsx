import Link from "next/link"
import { ArrowUpRight, Bot, Check, Cpu, PhoneCall, Workflow, type LucideIcon } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { cn } from "@/lib/utils"

interface Service {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

const flagship: Service = {
  icon: PhoneCall,
  title: "AI Call Agents",
  description:
    "Our flagship product: a natural-sounding voice agent that answers every inbound call, runs outbound follow-ups, books appointments and qualifies leads — 24 hours a day, at any volume.",
  features: [
    "Inbound support & outbound sales",
    "Appointment booking & reminders",
    "Lead qualification & routing",
    "CRM & calendar sync",
    "Live transcripts & call analytics",
    "Instant hand-off to your team",
  ],
}

const services: Service[] = [
  {
    icon: Workflow,
    title: "Workflow & Process Automation",
    description:
      "End-to-end business process automation that removes repetitive work — data entry, follow-ups, reporting and hand-offs — with AI making the routine decisions.",
    features: ["Lead-to-cash workflows", "Smart decision flows", "Connects the tools you already use"],
  },
  {
    icon: Bot,
    title: "AI Agents & Chatbots",
    description:
      "Conversational AI agents that understand intent, answer questions and take action — resolving customer queries instantly across every platform your customers use.",
    features: ["Trained on your business", "Multi-platform support", "Escalates to humans when needed"],
  },
  {
    icon: Cpu,
    title: "Custom AI Software",
    description:
      "Bespoke AI-powered web and mobile applications, engineered from the ground up around your exact bottlenecks — not a generic template.",
    features: ["Web & mobile apps", "LLM & AI model integration", "Scalable, production-grade architecture"],
  },
]

function FeatureList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("grid gap-2.5", className)}>
      {items.map((f) => (
        <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" strokeWidth={2.5} aria-hidden />
          {f}
        </li>
      ))}
    </ul>
  )
}

export default function WhatWeDo() {
  const FlagshipIcon = flagship.icon
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="What we build"
          title="AI automation services that pay for themselves"
          description="From a single AI agent to a fully automated operation — designed, built and maintained by one team."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Flagship */}
          <div data-reveal className="md:col-span-2 lg:col-span-3">
            <article className="card group relative h-full overflow-hidden border-cyan-300/15 p-7 sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 opacity-70 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="icon-tile">
                      <FlagshipIcon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="chip border-cyan-300/20 text-cyan-200">
                      <span className="live-dot" />
                      Flagship · 24/7
                    </span>
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{flagship.title}</h3>
                  <p className="mb-8 max-w-lg text-base leading-relaxed text-slate-400">{flagship.description}</p>
                  <Link href="/ai-calling" className="btn-primary group/btn">
                    Explore the AI Call Agent
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
                <FeatureList
                  items={flagship.features}
                  className="rounded-2xl border border-white/[0.06] bg-slate-950/40 p-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4"
                />
              </div>
            </article>
          </div>

          {services.map(({ icon: Icon, title, description, features }, i) => (
            <div
              key={title}
              data-reveal
              style={{ "--reveal-delay": `${(i + 1) * 90}ms` } as React.CSSProperties}
              className={cn(i === services.length - 1 && "md:col-span-2 lg:col-span-1")}
            >
              <article className="card card-hover flex h-full flex-col p-7 sm:p-8">
                <span className="icon-tile mb-6">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
                <p className="mb-6 text-[15px] leading-relaxed text-slate-400">{description}</p>
                <FeatureList items={features} className="mt-auto border-t border-white/[0.06] pt-6" />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
