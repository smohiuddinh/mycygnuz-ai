"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, PhoneCall, Zap, Clock } from "lucide-react"
import RotatingText from "@/components/rotating-text"

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animateElements = () => {
      if (badgeRef.current) {
        badgeRef.current.style.opacity = "1"
        badgeRef.current.style.transform = "translateY(0)"
      }
      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.style.opacity = "1"
          titleRef.current.style.transform = "translateY(0)"
        }
      }, 200)
      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = "1"
          subtitleRef.current.style.transform = "translateY(0)"
        }
      }, 400)
      setTimeout(() => {
        if (buttonsRef.current) {
          buttonsRef.current.style.opacity = "1"
          buttonsRef.current.style.transform = "translateY(0)"
        }
      }, 600)
    }
    const timer = setTimeout(animateElements, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(148,163,184,0.06)_1px,_transparent_1px)] [background-size:40px_40px]" />

      {/* Faint glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-800/30 rounded-full blur-3xl pointer-events-none" />

      {/* Rotating text ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]">
        <RotatingText
          text="• FUTURE • INNOVATION • AUTOMATION • AI • "
          radius={140}
          className="text-slate-600/60 text-xs"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-24">

        {/* Badge */}
        <div
          ref={badgeRef}
          className="opacity-0 translate-y-6 transition-all duration-700 ease-out inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/60 text-slate-400 text-xs font-medium tracking-widest uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          AI & Custom Software Solutions
        </div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-6"
        >
          <span className="text-slate-100">Build Smarter.</span>
          <br />
          <span className="text-slate-100">Automate Faster.</span>
          <br />
          <span className="text-slate-400 text-2xl md:text-3xl font-normal mt-2 block">
            Powered by Cygnuz AI
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subtitleRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          We build custom AI software, intelligent automation, and our flagship product —
          <span className="text-slate-200 font-medium"> AI Call Agents that work 24/7</span>,
          so your business never misses a lead, a call, or an opportunity.
        </p>

        {/* Pills + CTAs */}
        <div
          ref={buttonsRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out flex flex-col items-center gap-6"
        >
          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-2">
            {[
              { icon: Clock,     label: "AI Call Agents",   value: "24/7 Active"   },
              { icon: PhoneCall, label: "Custom Software",  value: "Built for You" },
              { icon: Zap,       label: "Automation",       value: "End-to-End"    },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-slate-400" />
                <div className="text-left">
                  <div className="text-xs text-slate-600 uppercase tracking-wider">{label}</div>
                  <div className="text-sm font-semibold text-slate-200">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#services"
              className="group flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-semibold text-sm transition-all duration-300"
            >
              Explore Our Services
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#ai-calling"
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 font-semibold text-sm transition-all duration-300"
            >
              <PhoneCall className="h-4 w-4" />
              See AI Call Agent
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  )
}
