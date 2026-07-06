"use client"

import { useEffect, useRef, useState } from "react"
import { Inbox, MoonStar, Puzzle } from "lucide-react"

const problems = [
  {
    icon: Inbox,
    number: "01",
    title: "Drowning in Manual Work",
    body: "Most business owners are stuck answering the same customer questions, entering the same data, and repeating the same tasks every single day. While you're busy putting out fires, your competitors are automating theirs — and pulling ahead.",
  },
  {
    icon: MoonStar,
    number: "02",
    title: "Missing Leads While You Sleep",
    body: "Every missed call, unanswered DM, or delayed follow-up is a customer walking straight to your competitor. Big brands already run AI voice agents and chatbots that respond in seconds, 24/7 — while smaller businesses are still losing leads overnight.",
  },
  {
    icon: Puzzle,
    number: "03",
    title: "Guessing Which Tools Actually Work",
    body: "The AI tool landscape changes every week. Most business owners waste months (and thousands of dollars) testing random tools and half-built automations that don't talk to each other, instead of one connected system built around their actual workflow.",
  },
]

export default function Problems() {
  const [visible, setVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true
          setVisible(true)
          problems.forEach((_, i) => {
            timeouts.push(
              setTimeout(() => {
                setCardsVisible(prev => new Set(prev).add(i))
              }, 150 + i * 110)
            )
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => { observer.disconnect(); timeouts.forEach(clearTimeout) }
  }, [])

  return (
    <section ref={sectionRef} className="bg-slate-900 px-6 py-24">
      <div className="absolute left-0 right-0 h-px bg-slate-800" />
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div
          className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div>
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-slate-500">
              Sound Familiar?
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">
              The Problems You're Facing
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            If any of these hit close to home, you're exactly who we built Cygnuz AI for.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.icon
            const cv = cardsVisible.has(i)
            return (
              <div
                key={p.number}
                className="group relative rounded-2xl border border-slate-800 bg-slate-950/60 p-7 transition-colors duration-300 hover:border-slate-700 hover:bg-slate-900/80"
                style={{
                  opacity: cv ? 1 : 0,
                  transform: cv ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${i * 90}ms, transform 0.6s ease ${i * 90}ms, border-color 0.3s, background-color 0.3s`,
                }}
              >
                {/* number watermark */}
                <span className="absolute top-5 right-6 text-5xl font-bold text-slate-800/60 select-none leading-none">
                  {p.number}
                </span>

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-300 transition-colors duration-300 group-hover:bg-slate-700">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>

                <h3 className="mb-3 text-lg font-semibold text-slate-100 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {p.body}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom tags */}
        <div
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-800 pt-8"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}
        >
          {["Real problems", "Real costs", "Solvable with AI"].map(tag => (
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
