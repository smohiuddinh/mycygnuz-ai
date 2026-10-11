import Link from "next/link"
import {
  ArrowRight, BarChart3, Calendar, CheckCircle2, Clock, Globe, PhoneCall,
  PhoneIncoming, PhoneOutgoing, Users, Zap,
} from "lucide-react"
import SectionHeading from "@/components/section-heading"

const useCases = [
  { icon: PhoneIncoming, title: "Inbound support", description: "Answer every call instantly — no hold music, no missed customers, no after-hours voicemail." },
  { icon: PhoneOutgoing, title: "Outbound sales", description: "Follow up new leads in minutes, re-engage cold contacts and keep your pipeline moving." },
  { icon: Calendar, title: "Appointment booking", description: "Book, reschedule and remind by voice, synced straight to your calendar." },
  { icon: Users, title: "Lead qualification", description: "Ask the right questions and route hot leads directly to your sales team." },
]

const stats = [
  { value: "24/7", label: "Always available", icon: Clock },
  { value: "< 1s", label: "Response time", icon: Zap },
  { value: "10+", label: "Languages", icon: Globe },
  { value: "95%", label: "Resolution rate", icon: BarChart3 },
]

const features = [
  "Natural, human-like conversation",
  "Custom voice & personality",
  "CRM & calendar integration",
  "Real-time call transcripts",
  "Instant escalation to human agents",
  "Full call analytics dashboard",
]

const transcript = [
  { from: "caller", text: "Hi, I'd like to book an appointment for next Tuesday." },
  { from: "ai", text: "Of course! I have 10 AM and 2 PM available. Which works best?" },
  { from: "caller", text: "2 PM would be perfect." },
  { from: "ai", text: "Done — you're booked for Tuesday at 2 PM. I'll text you a reminder." },
]

function CallCard() {
  return (
    <div className="card overflow-hidden rounded-3xl border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/30 sm:p-6" aria-label="Example AI call transcript" role="figure">
      <div className="hairline" />
      <div className="mb-5 flex items-center gap-3">
        <span className="icon-tile relative">
          <PhoneCall className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <div>
          <p className="text-sm font-medium text-slate-100">AI Voice Agent</p>
          <p className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="live-dot" /> Live call
          </p>
        </div>
        <span className="ml-auto font-mono text-xs text-slate-500">02:47</span>
      </div>

      <div className="mb-5 flex h-14 items-end justify-center gap-[3px] rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3" aria-hidden="true">
        {[4, 7, 10, 6, 12, 8, 13, 7, 11, 5, 9, 12, 6, 10, 4].map((h, i) => (
          <span key={i} className="wave-bar w-[3px] rounded-full bg-gradient-to-t from-cyan-500/60 to-cyan-200"
            style={{ height: `${h * 2.4}px`, animationDelay: `${(i % 5) * 0.14}s` }} />
        ))}
      </div>

      <ul className="mb-5 space-y-2.5">
        {transcript.map((line, i) => (
          <li key={i} className={line.from === "ai" ? "flex justify-end" : "flex"}>
            <span className="sr-only">{line.from === "ai" ? "AI agent:" : "Caller:"}</span>
            <p
              className={
                line.from === "ai"
                  ? "max-w-[85%] rounded-2xl rounded-br-md border border-cyan-300/15 bg-cyan-400/[0.07] px-3.5 py-2.5 text-sm leading-relaxed text-cyan-50"
                  : "max-w-[85%] rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5 text-sm leading-relaxed text-slate-300"
              }
            >
              {line.text}
            </p>
          </li>
        ))}
      </ul>

      <p className="flex items-center gap-2.5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-2.5 text-xs text-emerald-200">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
        Appointment booked & synced to calendar
      </p>
    </div>
  )
}

export default function AICallingSection({ appUrl }: { appUrl: string }) {
  return (
    <>
      {/* Stats */}
      <section aria-label="AI Call Agent at a glance" className="relative pb-4">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map(({ value, label, icon: Icon }, i) => (
              // A dl allows exactly one wrapping div per group, so the reveal and card share it
              // (no hover transitions here for the reveal styles to override).
              <div
                key={label}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="card flex h-full flex-col items-start gap-3 p-5 sm:p-6"
              >
                <Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} aria-hidden />
                <dt className="order-last text-sm text-slate-400">{label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Demo + features */}
      <section aria-labelledby="ai-features-title" className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <CallCard />
          </div>
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <span className="eyebrow mb-4">How it sounds</span>
            <h2 id="ai-features-title" className="mb-5 mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Everything your phone line needs — powered by AI
            </h2>
            <p className="mb-8 text-base leading-relaxed text-slate-400">
              From the first ring to the post-call follow-up, your AI call agent manages the full conversation so your
              team can focus on the work only humans can do.
            </p>
            <ul className="mb-9 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={appUrl} target="_blank" rel="noopener noreferrer" className="btn-primary group">
                Try the AI Call Agent
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
              <Link href="#contact" className="btn-secondary">
                Book a demo call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section aria-labelledby="use-cases-title" className="section pt-0 sm:pt-0 lg:pt-0">
        <div className="container-page">
          <SectionHeading
            id="use-cases-title"
            eyebrow="Use cases"
            title="One agent, every kind of call"
            description="Deploy it on a single workflow or across your whole phone operation."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map(({ icon: Icon, title, description }, i) => (
              <div key={title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
                <article className="card card-hover h-full p-7">
                  <span className="icon-tile mb-6">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mb-2.5 text-lg font-semibold text-white">{title}</h3>
                  <p className="text-[15px] leading-relaxed text-slate-400">{description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
