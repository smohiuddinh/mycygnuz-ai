"use client"

import { useEffect, useRef, useState } from "react"
import { Layers, Code2, Users } from "lucide-react"

const items = [
  {
    icon: Layers,
    label: "01",
    title: "System-First, Not Tool-First",
    body: "Most agencies sell you a chatbot or a Zapier flow and call it done. We start by mapping your actual business — leads, ops, follow-ups, reporting — then build the AI system that fits around it, so every automation compounds into real time and revenue saved.",
    // placeholder: left image, right text
    imageLeft: true,
  },
  {
    icon: Code2,
    label: "02",
    title: "Built From Scratch, Not Just Templates",
    body: "Anyone can plug in a template. We've built custom AI voice agents, backend workflows, and full-stack AI products from zero for businesses across industries — which means we solve for your specific bottlenecks, not a generic use case.",
    imageLeft: false,
  },
  {
    icon: Users,
    label: "03",
    title: "One Team, Every AI Discipline",
    body: "Our team covers AI voice/chat agents, workflow automation, marketing automation, and full custom AI app development under one roof — so you're not managing five vendors who don't talk to each other. Fast turnaround, direct access to the people building your system.",
    imageLeft: true,
  },
]

// Abstract SVG illustration placeholder per item
function Illustration({ index }: { index: number }) {
  const patterns = [
    // 01 — interconnected nodes (system map)
    (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="320" height="220" rx="16" fill="#0f172a" />
        {/* grid */}
        {[40,80,120,160,200,240,280].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="#1e293b" strokeWidth="1" />
        ))}
        {[44,88,132,176].map(y => (
          <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#1e293b" strokeWidth="1" />
        ))}
        {/* nodes */}
        {[[80,60],[160,110],[240,60],[200,160],[120,160]].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="18" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="6" fill="#64748b" />
          </g>
        ))}
        {/* edges */}
        {[[80,60,160,110],[160,110,240,60],[160,110,200,160],[160,110,120,160]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3" />
        ))}
        {/* accent node */}
        <circle cx="160" cy="110" r="18" fill="#1e293b" stroke="#6b7280" strokeWidth="1.5" />
        <circle cx="160" cy="110" r="6" fill="#94a3b8" />
        <text x="160" y="195" textAnchor="middle" fill="#334155" fontSize="11" fontFamily="monospace">system map</text>
      </svg>
    ),
    // 02 — code window
    (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="320" height="220" rx="16" fill="#0f172a" />
        {/* window chrome */}
        <rect x="20" y="20" width="280" height="180" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <rect x="20" y="20" width="280" height="32" rx="10" fill="#1e293b" />
        <rect x="20" y="40" width="280" height="12" fill="#1e293b" />
        <circle cx="44" cy="36" r="5" fill="#ef4444" opacity="0.5" />
        <circle cx="60" cy="36" r="5" fill="#f59e0b" opacity="0.5" />
        <circle cx="76" cy="36" r="5" fill="#22c55e" opacity="0.5" />
        {/* code lines */}
        {[
          {y:72,  w:120, c:"#6366f1"},
          {y:90,  w:180, c:"#475569"},
          {y:108, w:140, c:"#475569"},
          {y:126, w:200, c:"#475569"},
          {y:144, w:100, c:"#6366f1"},
          {y:162, w:160, c:"#475569"},
          {y:180, w:80,  c:"#475569"},
        ].map(({y,w,c},i) => (
          <rect key={i} x="44" y={y} width={w} height="8" rx="4" fill={c} opacity="0.4" />
        ))}
        <text x="160" y="210" textAnchor="middle" fill="#334155" fontSize="11" fontFamily="monospace">built from scratch</text>
      </svg>
    ),
    // 03 — team circles
    (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="320" height="220" rx="16" fill="#0f172a" />
        {/* central circle */}
        <circle cx="160" cy="100" r="36" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <text x="160" y="105" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Cygnuz AI</text>
        {/* satellite circles */}
        {[
          {cx:80,  cy:55,  label:"Voice"},
          {cx:240, cy:55,  label:"Chat"},
          {cx:60,  cy:150, label:"Workflow"},
          {cx:260, cy:150, label:"Dev"},
          {cx:160, cy:185, label:"Marketing"},
        ].map(({cx,cy,label},i) => (
          <g key={i}>
            <line x1="160" y1="100" x2={cx} y2={cy} stroke="#1e293b" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx={cx} cy={cy} r="24" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <text x={cx} y={cy+4} textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">{label}</text>
          </g>
        ))}
        <text x="160" y="210" textAnchor="middle" fill="#334155" fontSize="11" fontFamily="monospace">one roof</text>
      </svg>
    ),
  ]
  return patterns[index]
}

function Item({
  item,
  index,
}: {
  item: typeof items[0]
  index: number
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const Icon = item.icon

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const imageCol = (
    <div
      className="w-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${item.imageLeft ? "-24px" : "24px"})`,
        transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
      }}
    >
      <div className="rounded-2xl border border-slate-800 overflow-hidden aspect-[320/220]">
        <Illustration index={index} />
      </div>
    </div>
  )

  const textCol = (
    <div
      className="w-full flex flex-col justify-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${item.imageLeft ? "24px" : "-24px"})`,
        transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <span className="text-xs font-medium uppercase tracking-widest text-slate-600">{item.label}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-slate-100 mb-4 leading-snug">
        {item.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {item.body}
      </p>
    </div>
  )

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
    >
      {item.imageLeft ? <>{imageCol}{textCol}</> : <>{textCol}{imageCol}</>}
    </div>
  )
}

export default function WhyUs() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="why-us" className="bg-slate-950 px-6 py-24">
      <div className="absolute left-0 right-0 h-px bg-slate-800" />
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div
          ref={headerRef}
          className="mb-20"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-slate-500">
            Why Us
          </span>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">
              Why teams choose Cygnuz AI
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Not another tool vendor — a dedicated AI systems partner.
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-20 md:gap-28">
          {items.map((item, i) => (
            <Item key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Bottom tags */}
        <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-800 pt-8">
          {["Systems thinking", "Custom-built", "One team"].map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs uppercase tracking-wider text-slate-500">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
