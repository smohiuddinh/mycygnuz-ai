"use client"

import type React from "react"
import * as THREE from "three"
import { useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="relative py-16 px-6 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <Canvas className="absolute inset-0">
        <ReactBitsContactParticles />
      </Canvas>

      {/* ReactBits background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg" />
            <h2 className="relative text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Ready to Transform Your Business?
              </span>
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Let's discuss how our AI automation solutions can revolutionize your operations and drive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-sm" />
            <Card className="relative bg-gray-800/80 backdrop-blur-sm border-gray-700">
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400/50" />
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400/50" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400/50" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400/50" />

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Get In Touch</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 text-sm h-10 backdrop-blur-sm"
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 text-sm h-10 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <Input
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 text-sm h-10 backdrop-blur-sm"
                  />
                  <Textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 text-sm backdrop-blur-sm"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-2.5 rounded-lg font-medium border border-cyan-400/50"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-lg blur-sm" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur-sm" />
              <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-5">
                {/* Corner accents */}
                <div className="absolute top-1 left-1 w-4 h-4 border-l border-t border-cyan-400/30" />
                <div className="absolute top-1 right-1 w-4 h-4 border-r border-t border-cyan-400/30" />
                <div className="absolute bottom-1 left-1 w-4 h-4 border-l border-b border-cyan-400/30" />
                <div className="absolute bottom-1 right-1 w-4 h-4 border-r border-b border-cyan-400/30" />

                <h3 className="text-lg font-bold text-white mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-cyan-400 mr-3" />
                    <span className="text-gray-300 text-sm">hello@cygnuzai.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-cyan-400 mr-3" />
                    <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-cyan-400 mr-3" />
                    <span className="text-gray-300 text-sm">San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur-sm" />
              <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-5">
                {/* Corner accents */}
                <div className="absolute top-1 left-1 w-4 h-4 border-l border-t border-cyan-400/30" />
                <div className="absolute top-1 right-1 w-4 h-4 border-r border-t border-cyan-400/30" />
                <div className="absolute bottom-1 left-1 w-4 h-4 border-l border-b border-cyan-400/30" />
                <div className="absolute bottom-1 right-1 w-4 h-4 border-r border-b border-cyan-400/30" />

                <h3 className="text-lg font-bold text-white mb-3">Why Choose Cygnuz AI?</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                    Cutting-edge AI technology
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                    Custom solutions for your business
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                    24/7 support and maintenance
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                    Proven track record of success
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-gray-700 pt-8 relative">
          {/* ReactBits footer glow */}
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-lg blur-sm" />
              <div className="relative">
                <Image src="/images/cygnuz-logo.png" alt="Cygnuz AI" width={150} height={75} className="mb-3" />
                <p className="text-gray-400 text-sm">
                  Advanced AI automation agency building intelligent systems that optimize workflows and revolutionize
                  business operations.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Services</h4>
              <ul className="space-y-1.5 text-gray-400 text-sm">
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">AI Chatbots</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Automated Calling Agents</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Workflow Optimization</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Custom AI Solutions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Connect</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Mail, label: "Email" },
                ].map((social, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    className="relative border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent h-8 w-8 p-0 backdrop-blur-sm"
                  >
                    <social.icon className="h-3 w-3" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded blur-sm opacity-0 hover:opacity-100 transition-opacity" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 text-center relative">
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <p className="text-gray-400 text-sm">
              © 2024 Cygnuz AI. All rights reserved. | Reimagining Business Through AI Automation
            </p>
          </div>
        </footer>
      </div>

      {/* ReactBits corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-400/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-400/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/20" />
    </section>
  )
}
