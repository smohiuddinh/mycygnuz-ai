import { Compass, PenTool, Rocket, Wrench } from "lucide-react"
import SectionHeading from "@/components/section-heading"

const steps = [
  {
    icon: Compass,
    title: "Discovery call",
    body: "A free strategy session where we map your leads, operations and bottlenecks, and pinpoint where AI saves the most time and money.",
  },
  {
    icon: PenTool,
    title: "Automation blueprint",
    body: "We design the system around your workflow — which agents, which integrations, what gets automated — with clear scope and expected impact.",
  },
  {
    icon: Wrench,
    title: "Build & integrate",
    body: "Our team builds your AI agents and automations and connects them to the CRM, calendar and tools your business already runs on.",
  },
  {
    icon: Rocket,
    title: "Launch & optimise",
    body: "We go live, monitor real conversations and workflows, and keep refining so the system compounds into more hours and revenue saved.",
  },
]

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section">
      <div className="hairline" />
      <div className="container-page">
        <SectionHeading
          id="process-title"
          eyebrow="How it works"
          title="From first call to fully automated"
          description="A clear, four-step process — you always know what's being built, why, and what it's worth to your business."
        />

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} data-reveal style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}>
              <div className="card card-hover h-full p-7">
                <div className="mb-7 flex items-center justify-between">
                  <span className="icon-tile">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-slate-500">Step {i + 1}</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
                <p className="text-[15px] leading-relaxed text-slate-400">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
