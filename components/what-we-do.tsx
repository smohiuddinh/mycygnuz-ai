"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Phone, Workflow, Cpu } from "lucide-react"

const services = [
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational agents that provide 24/7 customer support and engagement.",
    features: ["Natural Language Processing", "Multi-platform Integration", "Learning Capabilities"],
    color: "#00d4ff",
    dimColor: "rgba(0,212,255,0.08)",
    borderColor: "rgba(0,212,255,0.25)",
    label: "01",
  },
  {
    icon: Phone,
    title: "Automated Calling",
    description: "Voice AI systems that handle calls, appointments, and customer interactions seamlessly.",
    features: ["Voice Recognition", "Appointment Scheduling", "Call Analytics"],
    color: "#a78bfa",
    dimColor: "rgba(167,139,250,0.08)",
    borderColor: "rgba(167,139,250,0.25)",
    label: "02",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Streamline business processes with intelligent automation and smart decision-making.",
    features: ["Process Automation", "Data Analysis", "Performance Metrics"],
    color: "#34d399",
    dimColor: "rgba(52,211,153,0.08)",
    borderColor: "rgba(52,211,153,0.25)",
    label: "03",
  },
  {
    icon: Cpu,
    title: "Custom AI Solutions",
    description: "Tailored artificial intelligence engineered specifically around your business needs.",
    features: ["Custom Development", "Integration Support", "Ongoing Maintenance"],
    color: "#f472b6",
    dimColor: "rgba(244,114,182,0.08)",
    borderColor: "rgba(244,114,182,0.25)",
    label: "04",
  },
]

function ServiceCard({
  service,
  index,
  visible,
}: {
  service: (typeof services)[0]
  index: number
  visible: boolean
}) {
  const Icon = service.icon
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative group cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(40px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 120}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 120}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card body */}
      <div
        className="relative overflow-hidden h-full"
        style={{
          background: hovered ? service.dimColor : "rgba(8,10,20,0.85)",
          border: `1px solid ${hovered ? service.borderColor : "rgba(255,255,255,0.06)"}`,
          borderRadius: 2,
          transition: "background 0.4s ease, border-color 0.4s ease",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
            opacity: hovered ? 1 : 0.3,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Number watermark */}
        <div
          className="absolute top-4 right-4 font-mono text-5xl font-black select-none pointer-events-none"
          style={{
            color: service.color,
            opacity: hovered ? 0.12 : 0.05,
            transition: "opacity 0.4s ease",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          {service.label}
        </div>

        <div className="p-7 flex flex-col gap-5">
          {/* Icon + label row */}
          <div className="flex items-start justify-between">
            <div
              className="flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                border: `1px solid ${service.borderColor}`,
                borderRadius: 2,
                background: service.dimColor,
                transition: "all 0.3s ease",
                boxShadow: hovered ? `0 0 20px ${service.color}33` : "none",
              }}
            >
              <Icon
                style={{
                  width: 22,
                  height: 22,
                  color: service.color,
                  transition: "transform 0.3s ease",
                  transform: hovered ? "scale(1.15)" : "scale(1)",
                }}
              />
            </div>
            <span
              className="font-mono text-xs tracking-widest"
              style={{ color: service.color, opacity: 0.7 }}
            >
              {service.label}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3
              className="font-bold text-xl tracking-tight mb-2"
              style={{
                color: hovered ? "#ffffff" : "#e2e8f0",
                fontFamily: "'Syne', sans-serif",
                transition: "color 0.3s ease",
              }}
            >
              {service.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}
            >
              {service.description}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, ${service.color}40, transparent)`,
              opacity: hovered ? 1 : 0.4,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* Features */}
          <ul className="flex flex-col gap-2">
            {service.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: service.color,
                    flexShrink: 0,
                    boxShadow: `0 0 6px ${service.color}`,
                  }}
                />
                <span
                  className="text-xs tracking-wide"
                  style={{
                    color: hovered ? "#94a3b8" : "#475569",
                    fontFamily: "'DM Mono', monospace",
                    transition: "color 0.3s ease",
                  }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom-right corner accent */}
        <div
          className="absolute bottom-0 right-0"
          style={{
            width: 40,
            height: 40,
            borderTop: `1px solid ${service.borderColor}`,
            borderLeft: `1px solid ${service.borderColor}`,
            opacity: hovered ? 0.8 : 0.2,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>
    </div>
  )
}

export default function WhatWeDo() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [headerVisible, setHeaderVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true)
            services.forEach((_, i) => {
              setTimeout(() => setVisibleCards((prev) => [...prev, i]), 200 + i * 130)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&family=DM+Mono:wght@400;500&display=swap');

        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.03; }
          50%       { opacity: 0.06; }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px) scale(1);   opacity: 0.6; }
          50%       { transform: translateY(-8px) scale(1.3); opacity: 1;   }
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="relative py-24 px-6 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #000008 0%, #05080f 50%, #000008 100%)" }}
      >
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,212,255,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            animation: "gridPulse 6s ease-in-out infinite",
          }}
        />

        {/* Scanline sweep */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)",
            animation: "scanline 8s linear infinite",
            top: 0,
          }}
        />

        {/* Ambient glows */}
        <div className="absolute pointer-events-none" style={{ top: "10%", left: "5%",  width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto z-10">

          {/* ── Header ── */}
          <div
            className="mb-16"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 32, height: 1, background: "#00d4ff" }} />
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: "#00d4ff", fontFamily: "'DM Mono', monospace" }}
              >
                Services
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2
                className="text-4xl md:text-6xl font-black leading-none tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif", color: "#f8fafc" }}
              >
                What{" "}
                <span
                  style={{
                    WebkitTextStroke: "1px rgba(0,212,255,0.6)",
                    color: "transparent",
                  }}
                >
                  We
                </span>{" "}
                Do
              </h2>

              <p
                className="text-sm leading-relaxed max-w-sm"
                style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}
              >
                Cutting-edge AI solutions that transform how businesses operate, communicate, and grow in the digital age.
              </p>
            </div>

            {/* Full-width rule */}
            <div
              className="mt-8"
              style={{
                height: 1,
                background: "linear-gradient(90deg, rgba(0,212,255,0.4), rgba(167,139,250,0.3), transparent)",
              }}
            />
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(255,255,255,0.04)", borderRadius: 2 }}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                visible={visibleCards.includes(index)}
              />
            ))}
          </div>

          {/* ── Bottom status row ── */}
          <div
            className="mt-10 flex items-center justify-between"
            style={{
              opacity: headerVisible ? 1 : 0,
              transition: "opacity 1s ease 0.6s",
            }}
          >
            <div className="flex items-center gap-6">
              {["AI-Powered", "Enterprise Ready", "24/7 Active"].map((tag, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: ["#00d4ff", "#a78bfa", "#34d399"][i],
                      boxShadow: `0 0 8px ${["#00d4ff", "#a78bfa", "#34d399"][i]}`,
                      animation: `floatDot 2.5s ease-in-out ${i * 0.4}s infinite`,
                    }}
                  />
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#334155", fontFamily: "'DM Mono', monospace" }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            <span
              className="text-xs tracking-widest"
              style={{ color: "#1e293b", fontFamily: "'DM Mono', monospace" }}
            >
              CYGNUZ.AI / 2025
            </span>
          </div>
        </div>
      </section>
    </>
  )
}