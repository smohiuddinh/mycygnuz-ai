"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Phone, Workflow, Cpu } from "lucide-react"

const services = [
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational agents that provide 24/7 customer support and engagement.",
    features: ["Natural Language Processing", "Multi-platform Integration", "Learning Capabilities"],
    gradient: "from-cyan-500 to-blue-600",
    accent: "#00d4ff",
  },
  {
    icon: Phone,
    title: "Automated Calling Agents",
    description: "Voice AI systems that handle calls, appointments, and customer interactions seamlessly.",
    features: ["Voice Recognition", "Appointment Scheduling", "Call Analytics"],
    gradient: "from-blue-500 to-purple-600",
    accent: "#4f46e5",
  },
  {
    icon: Workflow,
    title: "Workflow Optimization",
    description: "Streamline business processes with intelligent automation and decision-making systems.",
    features: ["Process Automation", "Data Analysis", "Performance Metrics"],
    gradient: "from-purple-500 to-pink-600",
    accent: "#8b5cf6",
  },
  {
    icon: Cpu,
    title: "Custom AI Solutions",
    description: "Tailored artificial intelligence solutions designed specifically for your business needs.",
    features: ["Custom Development", "Integration Support", "Ongoing Maintenance"],
    gradient: "from-pink-500 to-cyan-600",
    accent: "#ec4899",
  },
]

export default function WhatWeDo() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* ReactBits background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(128, 0, 255, 0.1) 0%, transparent 50%)
          `,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg" />
            <h2 className="relative text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                What We Do
              </span>
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We specialize in creating cutting-edge AI solutions that transform how businesses operate, communicate, and
            grow in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            const isVisible = visibleCards.includes(index)

            return (
              <Card
                key={index}
                className={`relative bg-gray-900/50 backdrop-blur-sm border-gray-700 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 group overflow-hidden ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* ReactBits glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-cyan-400/30" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-cyan-400/30" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-cyan-400/30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-cyan-400/30" />

                <CardContent className="p-6 relative z-10">
                  <div className="mb-4">
                    <div className="relative mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div
                        className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"
                        style={{ backgroundColor: service.accent }}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm">{service.description}</p>
                  </div>

                  <ul className="space-y-1.5">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-cyan-400 flex items-center">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
