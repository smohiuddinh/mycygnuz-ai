"use client"

import { useState } from "react"
import Image from "next/image"

const logos = [
  { name: "Engro",    image: "/cygnuz/engro.png"    },
  { name: "KrineX",    image: "/cygnuz/krinex.png"    },
  { name: "PalmCare", image: "/cygnuz/palmcare.webp" },
  { name: "Suhaib",   image: "/cygnuz/suhaib.png"   },
  { name: "Legerium", image: "/cygnuz/logo_bg.png"  },
]

const secondRowLogos = [
  { name: "Mintsy Plus",        image: "/cygnuz/minty.png"  },
  { name: "Ecosaathi",        image: "/cygnuz/ecosaathi.png"  },
  { name: "UrEwaste",         image: "/cygnuz/urewaste.png"   },
  { name: "Terminix",         image: "/cygnuz/terminix.png"   },
  { name: "Infinitely Digital",image: "/cygnuz/infinitely.png"},
]

function LogoCard({
  logo,
  onEnter,
  onLeave,
}: {
  logo: { name: string; image: string }
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <div className="flex-shrink-0 mx-2" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center transition-colors hover:border-slate-700 hover:bg-slate-900">
        <div className="relative w-16 h-8 sm:w-20 sm:h-10">
          <Image
            src={logo.image}
            alt={logo.name}
            fill
            className="object-contain opacity-70 hover:opacity-90 transition-opacity"
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
    <section id="projects" className="bg-slate-950 py-16 sm:py-24 overflow-hidden">
      <div className="absolute left-0 right-0 h-px bg-slate-800" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-slate-500">
            Our Clients
          </span>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">
              Trusted by great teams
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Businesses across industries rely on Cygnuz AI to automate, scale, and grow.
            </p>
          </div>
        </div>

        {/* Marquee rows */}
        <MarqueeRow items={logos}            direction="right" duration="18s" />
        <MarqueeRow items={secondRowLogos}   direction="left"  duration="22s" />

        {/* Bottom tags */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-800 pt-8">
          {["AI-powered", "Enterprise ready", "Karachi & global"].map((tag) => (
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
