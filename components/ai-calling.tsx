"use client"

import { useEffect, useRef, useState } from "react"
import {
  PhoneCall, PhoneIncoming, PhoneOutgoing,
  Calendar, Users, BarChart3, CheckCircle2, Clock, Globe, Zap,
} from "lucide-react"

const useCases = [
  {
    icon: PhoneIncoming,
    title: "Inbound Support",
    description: "Answer every call instantly — no hold music, no missed customers.",
  },
  {
    icon: PhoneOutgoing,
    title: "Outbound Sales",
    description: "Automatically follow up leads, re-engage cold contacts, and close more deals.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Book, reschedule, and remind — all via voice without any human effort.",
  },
  {
    icon: Users,
    title: "Lead Qualification",
    description: "Ask the right questions and route hot leads directly to your sales team.",
  },
]

const stats = [
  { value: "24/7", label: "Always available", icon: Clock },
  { value: "< 1s", label: "Response time",   icon: Zap      },
  { value: "10+",  label: "Languages",        icon: Globe    },
  { value: "95%",  label: "Resolution rate",  icon: BarChart3 },
]

const features = [
  "Natural, human-like conversation",
  "Custom voice & personality",
  "CRM & calendar integration",
  "Real-time call transcripts",
  "Instant escalation to human agents",
  "Full call analytics dashboard",
]

function WaveAnimation() {
  return (
    <div className="flex items-end justify-center gap-1 h-10">
      {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full bg-slate-500"
          style={{
            height: `${h * 8}px`,
            animation: `wave-bar 1.2s ease-in-out infinite`,
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
      <style>{`
        @keyframes wave-bar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
          50%       { transform: scaleY(1);   opacity: 1;   }
        }
      `}</style>
    </div>
  )
}

export default function AICallingSection() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="ai-calling"
      ref={sectionRef}
      className="relative bg-slate-900 py-16 px-4 sm:py-24 sm:px-6 overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-slate-800" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div
          className="mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-slate-500">
            Flagship Product
          </span>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">
              AI Call Agent
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Intelligent voice agents that handle your calls 24 hours a day, 7 days a week — at any scale.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map(({ value, label, icon: Icon }, i) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 80 + 100}ms, transform 0.6s ease ${i * 80 + 100}ms`,
              }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <div className="text-2xl font-semibold text-slate-100">{value}</div>
              <div className="text-xs text-slate-500 text-center">{label}</div>
            </div>
          ))}
        </div>

        {/* Phone card + features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">

          {/* Left: call card */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 overflow-hidden">

              {/* Call header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                  <PhoneCall className="h-4 w-4" strokeWidth={1.75} />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </div>
                <div>
                  <div className="text-slate-200 font-medium text-sm">AI Voice Agent</div>
                  <div className="text-emerald-500 text-xs flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Live — Active Call
                  </div>
                </div>
                <div className="ml-auto text-slate-600 text-xs font-mono">02:47</div>
              </div>

              {/* Waveform */}
              <div className="rounded-xl bg-slate-800/60 border border-slate-800 p-4 mb-5">
                <WaveAnimation />
                <div className="mt-3 text-center text-slate-600 text-xs">Processing natural speech…</div>
              </div>

              {/* Transcript */}
              <div className="space-y-3 mb-5">
                {[
                  { from: "customer", text: "I'd like to book an appointment for next Tuesday." },
                  { from: "ai",       text: "Of course! I have slots at 10 AM and 2 PM. Which works best?" },
                  { from: "customer", text: "2 PM would be perfect." },
                  { from: "ai",       text: "Confirmed! You're booked for Tuesday at 2 PM. A reminder will be sent." },
                ].map((line, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${line.from === "ai" ? "flex-row-reverse" : ""}`}
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.4s ease ${0.4 + i * 0.15}s`,
                    }}
                  >
                    <div className={`text-xs px-3 py-2 rounded-xl max-w-[80%] leading-relaxed border ${
                      line.from === "ai"
                        ? "bg-slate-800 text-slate-200 border-slate-700"
                        : "bg-slate-800/40 text-slate-400 border-slate-800"
                    }`}>
                      {line.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Confirmed badge */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-400 text-xs">Appointment booked & synced to calendar</span>
              </div>
            </div>
          </div>

          {/* Right: features */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <h3 className="text-xl font-semibold text-slate-100 mb-3">
              Everything your phone line needs — powered by AI
            </h3>
            <p className="text-slate-500 text-sm mb-7 leading-relaxed">
              From the first ring to post-call follow-up, our AI calling agents manage the full conversation lifecycle so your team can focus on what only humans can do.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-center gap-3"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(12px)",
                    transition: `opacity 0.5s ease ${0.4 + i * 0.07}s, transform 0.5s ease ${0.4 + i * 0.07}s`,
                  }}
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <span className="text-slate-400 text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-semibold text-sm transition-all duration-300"
            >
              <PhoneCall className="h-4 w-4" />
              Get AI Calling for Your Business
            </a>
          </div>
        </div>

        {/* Use case cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {useCases.map((uc, i) => {
            const Icon = uc.icon
            return (
              <div
                key={uc.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-colors duration-300 hover:border-slate-700 hover:bg-slate-900/70"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${0.5 + i * 0.1}s, transform 0.6s ease ${0.5 + i * 0.1}s`,
                }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h4 className="text-slate-100 font-semibold text-sm mb-2">{uc.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{uc.description}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom tags */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-800 pt-8">
          {["24/7 active", "Human-like voice", "Multi-language", "CRM ready"].map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs uppercase tracking-wider text-slate-500">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-800" />
    </section>
  )
}
