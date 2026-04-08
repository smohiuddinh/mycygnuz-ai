"use client"

import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import Image from "next/image"

const logos = [
  { name: "Engro", image: "/cygnuz/engro.png" },
  { name: "Ehive", image: "/cygnuz/ehive.png" },
  { name: "PalmCare", image: "/cygnuz/palmcare.webp" },
  { name: "Suhaib", image: "/cygnuz/suhaib.png" },
  { name: "Legerium", image: "/cygnuz/logo_bg.png" },
]

const secondRowLogos = [
  { name: "Ecosaathi", image: "/cygnuz/ecosaathi.png" },
  { name: "UrEwaste", image: "/cygnuz/urewaste.png" },
  { name: "Terminix", image: "/cygnuz/terminix.png" },
  { name: "Infinitely Digital", image: "/cygnuz/infinitely.png" },
]

function LogoCard({ logo, onEnter, onLeave }: { logo: { name: string; image: string }; onEnter: () => void; onLeave: () => void }) {
  return (
    <div
      className="flex-shrink-0 mx-2"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center transition-colors hover:border-white/20">
        <div className="relative w-16 h-8 sm:w-20 sm:h-10">
          <Image
            src={logo.image}
            alt={logo.name}
            fill
            className="object-contain opacity-85"
            sizes="80px"
          />
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: { name: string; image: string }[]
  direction: "left" | "right"
  duration: string
}) {
  const [paused, setPaused] = useState(false)
  const tripled = [...items, ...items, ...items]

  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mb-4">
      <div
        className={`flex whitespace-nowrap ${
          direction === "right" ? "animate-marquee-right" : "animate-marquee-left"
        }`}
        style={{
          animationDuration: duration,
          animationPlayState: paused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {tripled.map((logo, i) => (
          <LogoCard
            key={i}
            logo={logo}
            onEnter={() => setPaused(true)}
            onLeave={() => setPaused(false)}
          />
        ))}
      </div>
    </div>
  )
}

export function Portfolio() {
  return (
    <section className="text-white py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center justify-between mb-12 sm:flex-row sm:items-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl text-center sm:text-left leading-tight">
            Meet our <span className="text-lime-300">top-tier</span>
            <br />
            customers
          </h2>
    
        </div>

        {/* Marquee Rows */}
        <MarqueeRow items={logos} direction="right" duration="18s" />
        <MarqueeRow items={secondRowLogos} direction="left" duration="22s" />
      </div>
    </section>
  )
}