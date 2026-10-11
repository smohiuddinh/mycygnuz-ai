import Link from "next/link"
import { ArrowRight, CalendarCheck2, Check, Database, PhoneCall, Sparkles, UserCheck } from "lucide-react"

const flow = [
  { icon: PhoneCall, title: "Call answered by AI agent", meta: "in 1 ring · 2:14 am" },
  { icon: UserCheck, title: "Lead qualified", meta: "budget · timeline · need" },
  { icon: CalendarCheck2, title: "Meeting booked", meta: "Tue · 2:00 PM · synced" },
  { icon: Database, title: "CRM updated, team notified", meta: "zero manual entry" },
]

const assurances = ["Custom-built around your workflow", "Integrates with your CRM & tools", "Direct access to the builders"]

function WorkflowVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-sky-500/5 to-indigo-500/20 blur-2xl" />

      <div className="card relative overflow-hidden rounded-3xl border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
        <div className="hairline" />

        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="live-dot" />
            <span className="text-sm font-medium text-slate-200">Live automation</span>
          </div>
          <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-slate-400">
            inbound_lead.flow
          </span>
        </div>

        {/* Voice waveform */}
        <div className="mb-5 flex h-14 items-end justify-center gap-[3px] rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 pb-3 pt-3">
          {[3, 6, 9, 5, 11, 7, 13, 8, 12, 6, 10, 4, 9, 6, 11, 5, 8, 3].map((h, i) => (
            <span
              key={i}
              className="wave-bar w-[3px] rounded-full bg-gradient-to-t from-cyan-500/60 to-cyan-200"
              style={{ height: `${h * 2.6}px`, animationDelay: `${(i % 6) * 0.12}s` }}
            />
          ))}
        </div>

        {/* Steps */}
        <ol className="relative space-y-2.5">
          <span className="absolute bottom-6 left-[1.6rem] top-6 w-px overflow-hidden bg-white/[0.06]">
            <span className="flow-beam block h-1/4 w-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent" />
          </span>
          {flow.map(({ icon: Icon, title, meta }, i) => (
            <li
              key={title}
              className="flow-step relative flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-cyan-200">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-slate-100">{title}</span>
                <span className="block truncate text-xs text-slate-500">{meta}</span>
              </span>
              <Check className="h-4 w-4 shrink-0 text-emerald-400" strokeWidth={2.5} />
            </li>
          ))}
        </ol>
      </div>

      <div className="absolute -bottom-5 -left-3 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur sm:flex">
        <Sparkles className="h-4 w-4 text-cyan-300" />
        <span className="text-xs font-medium text-slate-200">Runs 24/7 — no breaks, no backlog</span>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-[calc(var(--nav-h)+3.5rem)] sm:pb-28 lg:pb-32 lg:pt-[calc(var(--nav-h)+5.5rem)]"
    >
      {/* Background */}
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="absolute left-1/2 top-[-12rem] -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.16),transparent)]" />
      <div className="absolute right-[-10rem] top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.14),transparent)]" />

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="text-center lg:text-left">
          <div className="animate-fade-up mb-7 flex justify-center lg:justify-start">
            <Link href="/ai-calling" className="chip group transition-colors hover:border-cyan-300/30 hover:text-white">
              <span className="live-dot" />
              AI Call Agents now live — 24/7
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>

          <h1
            id="hero-title"
            className="text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]"
          >
            The AI automation agency that gives you{" "}
            <span className="text-gradient">100+ hours back</span> every month
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            We design and build AI agents, 24/7 voice agents and end-to-end workflow automation around how your
            business actually runs — so every lead gets answered, operations run themselves, and costs come down.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            style={{ "--delay": "220ms" } as React.CSSProperties}
          >
            <Link href="/#contact" className="btn-primary group w-full sm:w-auto">
              Book a free strategy call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link href="/#services" className="btn-secondary w-full sm:w-auto">
              Explore services
            </Link>
          </div>

          <ul
            className="animate-fade-up mt-9 flex flex-col items-center gap-x-6 gap-y-2.5 text-sm text-slate-400 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            style={{ "--delay": "320ms" } as React.CSSProperties}
          >
            {assurances.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-cyan-300" strokeWidth={2.5} aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up" style={{ "--delay": "200ms" } as React.CSSProperties}>
          <WorkflowVisual />
        </div>
      </div>
    </section>
  )
}
