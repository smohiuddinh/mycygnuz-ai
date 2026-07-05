"use client"

import type React from "react"
import * as THREE from "three"
import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Linkedin, Instagram } from "lucide-react"
import Image from "next/image"
import emailjs from "@emailjs/browser"

function ReactBitsContactParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 1200

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40
    positions[i * 3 + 1] = (Math.random() - 0.5) * 25
    positions[i * 3 + 2] = (Math.random() - 0.5) * 25

    const color = new THREE.Color()
    color.setHSL(0.55 + Math.random() * 0.1, 0.8, 0.3 + Math.random() * 0.4)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  )
}

export default function ContactFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const result = await emailjs.send(
        "service_6m6ph5k",     // from EmailJS
        "template_3z6gfkp",    // your HTML template
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          submission_date: new Date().toLocaleString(),
        },
        "0mdz-5eMwYOFC8ryQ"      // EmailJS public key
      )
  
      console.log("SUCCESS!", result.text)
  
      // reset form (nice UX)
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      })
  
      alert("Message sent successfully 🚀")
  
    } catch (error) {
      console.error("FAILED...", error)
      alert("Something went wrong ❌")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const socials = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/cygnuzai",
    },
  
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/cygnuz.ai",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:cygnuzai@gmail.com",
    },
  ]

  return (
    <section className="relative py-16 px-6 bg-slate-900 overflow-hidden">
      <Canvas className="absolute inset-0 opacity-30">
        <ReactBitsContactParticles />
      </Canvas>

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-slate-800" />

      <div id="contact" className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-slate-500">
            Get In Touch
          </span>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">
              Ready to transform your business?
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Let's build the AI solution that fits your exact needs — from first call to full deployment.
            </p>
          </div>
        </div>

        {/* Form + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="text-base font-semibold text-slate-100 mb-5">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange}
                  className="bg-slate-800/60 border-slate-700 text-slate-200 placeholder:text-slate-600 text-sm h-10 focus:border-slate-500 focus:ring-0" required />
                <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange}
                  className="bg-slate-800/60 border-slate-700 text-slate-200 placeholder:text-slate-600 text-sm h-10 focus:border-slate-500 focus:ring-0" required />
              </div>
              <Input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange}
                className="bg-slate-800/60 border-slate-700 text-slate-200 placeholder:text-slate-600 text-sm h-10 focus:border-slate-500 focus:ring-0" />
              <Textarea name="message" placeholder="Tell us about your project..." value={formData.message} onChange={handleChange}
                rows={4} className="bg-slate-800/60 border-slate-700 text-slate-200 placeholder:text-slate-600 text-sm focus:border-slate-500 focus:ring-0" required />
              <Button type="submit"
                className="w-full bg-slate-100 hover:bg-white text-slate-900 font-semibold text-sm py-2.5 rounded-xl border-0 transition-all duration-200">
                <span className="flex items-center justify-center gap-2">
                  Let's Take It to the Next Level
                  <Send className="h-4 w-4" />
                </span>
              </Button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="space-y-5">
            {/* Contact Info */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-sm font-semibold text-slate-100 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                    <Mail className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <span className="text-slate-400 text-sm">cygnuzai@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                    <MapPin className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <span className="text-slate-400 text-sm">Karachi, Pakistan</span>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-sm font-semibold text-slate-100 mb-4">Why Cygnuz AI?</h3>
              <ul className="space-y-2.5">
                {[
                  "Custom AI built around your business",
                  "Flagship 24/7 AI Call Agent",
                  "End-to-end workflow automation",
                  "Proven track record of results",
                ].map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo */}
            <div>
              <Image src="/images/cygnuz-logo.png" alt="Cygnuz AI" width={130} height={65} className="mb-3 opacity-90" />
              <p className="text-slate-500 text-sm leading-relaxed">
                AI & custom software agency building intelligent systems that automate, scale, and grow businesses.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {["AI & Custom Software", "AI Call Agents", "Workflow Automation", "AI Chatbots"].map(s => (
                  <li key={s} className="hover:text-slate-200 transition-colors cursor-pointer">{s}</li>
                ))}
              </ul>
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">Connect</h4>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 text-center">
            <p className="text-slate-600 text-xs">
              © {new Date().getFullYear()} Cygnuz AI. All rights reserved. — Reimagining Business Through AI Automation
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
