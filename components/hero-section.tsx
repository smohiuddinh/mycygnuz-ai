"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Play } from "lucide-react"
import StarBorderButton from "@/components/star-border-button"
import RotatingText from "@/components/rotating-text"

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animateElements = () => {
      if (titleRef.current) {
        titleRef.current.style.opacity = "1"
        titleRef.current.style.transform = "translateY(0)"
      }

      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = "1"
          subtitleRef.current.style.transform = "translateY(0)"
        }
      }, 300)

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
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Futuristic grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#00d4ff33_1px,_transparent_1px)] [background-size:40px_40px] opacity-10" />

      {/* Rotating text (optional) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
        <RotatingText
          text="• FUTURE • INNOVATION • AUTOMATION • AI • "
          radius={120}
          className="text-cyan-400/40 text-xs"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl" />
          <h1
            ref={titleRef}
            className="relative text-4xl md:text-5xl font-bold mb-4 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
AI-Driven Websites & Mobile Apps       </span>
            <br />
            <span className="text-white text-3xl md:text-4xl">with Intelligent Automation for Businesses</span>
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 mb-6 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out max-w-3xl mx-auto"
        >
          Advanced AI automation agency building intelligent systems that optimize workflows and revolutionize how
          businesses operate.
        </p>

        {/* <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
        >
          <StarBorderButton
            href="#projects"
            variant="default"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-full font-medium border border-cyan-400/50"
          >
            <span className="flex items-center">
              See How It Works
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </StarBorderButton>

          <StarBorderButton
            href="#contact"
            variant="outline"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-full font-medium bg-transparent backdrop-blur-sm"
          >
            <span className="flex items-center">
              <Play className="mr-2 h-4 w-4" />
              Request Demo
            </span>
          </StarBorderButton>
        </div> */}
      </div>
    </section>
  )
}
