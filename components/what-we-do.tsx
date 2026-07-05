"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Phone, Workflow, Cpu, type LucideIcon, ArrowUpRight } from "lucide-react"

interface Service {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

const services: Service[] = [
  {
    icon: Cpu,
    title: "AI & Custom Software",
    description: "Tailored AI-powered applications and software built from the ground up around your business needs.",
    features: ["Web & mobile apps", "AI model integration", "Scalable architecture"],
  },
  {
    icon: Workflow,
    title: "Automation",
    description: "End-to-end workflow automation that eliminates repetitive tasks and accelerates operations.",
    features: ["Process automation", "Smart decision flows", "Third-party integrations"],
  },
  {
    icon: Phone,
    title: "AI Call Agent",
    description: "Our flagship product — a 24/7 voice AI that handles calls, books appointments, and qualifies leads automatically.",
    features: ["24/7 availability", "Appointment scheduling", "Lead qualification"],
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational agents that engage customers and resolve queries across every platform.",
    features: ["Natural language processing", "Multi-platform support", "Continuous learning"],
  },
]

function ServiceCard({ service, index, visible }: { service: Service; index: number; visible: boolean }) {
  const Icon = service.icon

  return (
    <div
      className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-7 transition-colors duration-300 hover:border-slate-600 hover:bg-slate-900/70"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 90}ms, transform 0.6s ease ${index * 90}ms, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-200 transition-colors duration-300 group-hover:bg-slate-700">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-slate-100">{service.title}</h3>
      <p className="mb-5 text-sm leading-relaxed text-slate-400">{service.description}</p>

      <ul className="flex flex-col gap-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-500">
            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-600" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function WhatWeDo() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [headerVisible, setHeaderVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setHeaderVisible(true)
      setVisibleCards(new Set(services.map((_, i) => i)))
      return
    }

    const timeouts: ReturnType<typeof setTimeout>[] = []

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true
            setHeaderVisible(true)
            services.forEach((_, i) => {
              timeouts.push(
                setTimeout(() => {
                  setVisibleCards((prev) => new Set(prev).add(i))
                }, 150 + i * 100)
              )
            })
            observer.unobserve(node)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return (
    <section id="services" ref={sectionRef} className="bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div>
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-slate-500">
              What We Build
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">Our Services</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            From custom AI software to full automation — and our flagship AI Call Agent, backed by Cygnuz AI.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} visible={visibleCards.has(index)} />
          ))}
        </div>

        <div
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-800 pt-8"
          style={{ opacity: headerVisible ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}
        >
          {["AI-powered", "Enterprise ready", "24/7 active"].map((tag) => (
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