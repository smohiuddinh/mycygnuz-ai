import { Code2, Layers, Users } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { cn } from "@/lib/utils"

const items = [
  {
    icon: Layers,
    title: "System-first, not tool-first",
    body: "Most agencies sell you a chatbot or a Zapier flow and call it done. We start by mapping your actual business — leads, operations, follow-ups, reporting — then build the AI system that fits around it, so every automation compounds into real time and revenue saved.",
  },
  {
    icon: Code2,
    title: "Built from scratch, not just templates",
    body: "Anyone can plug in a template. We've built custom AI voice agents, backend workflows and full-stack AI products from zero for businesses across industries — so we solve your specific bottlenecks, not a generic use case.",
  },
  {
    icon: Users,
    title: "One team, every AI discipline",
    body: "Voice and chat agents, workflow automation, marketing automation and custom AI apps under one roof — no juggling five vendors who don't talk to each other. Fast turnaround and direct access to the people building your system.",
  },
]

const C = {
  bg: "#060b18",
  line: "rgba(148,163,184,0.10)",
  node: "#0d1526",
  stroke: "rgba(148,163,184,0.22)",
  muted: "#64748b",
  accent: "#22d3ee",
}

function Illustration({ index }: { index: number }) {
  if (index === 0) {
    const nodes = [[80, 60], [240, 60], [200, 165], [120, 165]] as const
    return (
      <svg viewBox="0 0 320 220" className="h-full w-full" fill="none">
        <rect width="320" height="220" fill={C.bg} />
        {[40, 80, 120, 160, 200, 240, 280].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke={C.line} />)}
        {[44, 88, 132, 176].map((y) => <line key={y} x1="0" y1={y} x2="320" y2={y} stroke={C.line} />)}
        {nodes.map(([x, y], i) => (
          <line key={i} x1="160" y1="110" x2={x} y2={y} stroke={C.accent} strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4" />
        ))}
        {nodes.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="17" fill={C.node} stroke={C.stroke} strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="5" fill={C.muted} />
          </g>
        ))}
        <circle cx="160" cy="110" r="34" fill={C.accent} fillOpacity="0.06" />
        <circle cx="160" cy="110" r="20" fill={C.node} stroke={C.accent} strokeOpacity="0.6" strokeWidth="1.5" />
        <circle cx="160" cy="110" r="7" fill={C.accent} />
      </svg>
    )
  }
  if (index === 1) {
    const lines = [
      { y: 78, w: 110, a: true }, { y: 98, w: 170 }, { y: 118, w: 135 }, { y: 138, w: 190 },
      { y: 158, w: 90, a: true }, { y: 178, w: 150 },
    ]
    return (
      <svg viewBox="0 0 320 220" className="h-full w-full" fill="none">
        <rect width="320" height="220" fill={C.bg} />
        <rect x="24" y="24" width="272" height="172" rx="12" fill={C.node} stroke={C.stroke} />
        <line x1="24" y1="54" x2="296" y2="54" stroke={C.stroke} />
        {[44, 60, 76].map((cx) => <circle key={cx} cx={cx} cy="39" r="4.5" fill={C.muted} fillOpacity="0.5" />)}
        {lines.map(({ y, w, a }, i) => (
          <g key={i}>
            <text x="40" y={y + 6} fill={C.muted} fillOpacity="0.6" fontSize="8" fontFamily="monospace">{i + 1}</text>
            <rect x="58" y={y} width={w} height="7" rx="3.5" fill={a ? C.accent : C.muted} fillOpacity={a ? 0.55 : 0.3} />
          </g>
        ))}
        <rect x="252" y="176" width="2" height="10" fill={C.accent} />
      </svg>
    )
  }
  const sats = [
    { cx: 76, cy: 56, label: "Voice" }, { cx: 244, cy: 56, label: "Chat" },
    { cx: 58, cy: 160, label: "Workflow" }, { cx: 262, cy: 160, label: "Apps" },
    { cx: 160, cy: 192, label: "Marketing" },
  ]
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" fill="none">
      <rect width="320" height="220" fill={C.bg} />
      {sats.map(({ cx, cy }, i) => (
        <line key={i} x1="160" y1="104" x2={cx} y2={cy} stroke={C.accent} strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" />
      ))}
      <circle cx="160" cy="104" r="48" fill={C.accent} fillOpacity="0.05" />
      <circle cx="160" cy="104" r="34" fill={C.node} stroke={C.accent} strokeOpacity="0.55" strokeWidth="1.5" />
      <text x="160" y="108" textAnchor="middle" fill="#cffafe" fontSize="11" fontFamily="sans-serif" fontWeight="600">Cygnuz AI</text>
      {sats.map(({ cx, cy, label }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r="24" fill={C.node} stroke={C.stroke} />
          <text x={cx} y={cy + 3.5} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">{label}</text>
        </g>
      ))}
    </svg>
  )
}

export default function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-us-title" className="section">
      <div className="hairline" />
      <div className="container-page">
        <SectionHeading
          id="why-us-title"
          eyebrow="Why Cygnuz AI"
          title="Not another tool vendor — your AI systems partner"
          description="Businesses choose us because we build around how they work, not around what's easiest to sell."
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {items.map(({ icon: Icon, title, body }, i) => {
            const imageFirst = i % 2 === 0
            return (
              <article key={title} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <div data-reveal className={cn(!imageFirst && "md:order-2")}>
                  <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] shadow-2xl shadow-black/30">
                    <div className="aspect-[320/220]">
                      <Illustration index={i} />
                    </div>
                  </div>
                </div>
                <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="icon-tile">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold tracking-tight text-white md:text-[1.75rem]">{title}</h3>
                  <p className="text-base leading-relaxed text-slate-400">{body}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
