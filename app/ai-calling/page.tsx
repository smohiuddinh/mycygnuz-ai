import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import AICallingSection from "@/components/ai-calling"
import ContactFooter from "@/components/contact-footer"

export const metadata: Metadata = {
  title: "AI Call Agent — 24/7 Voice Agents",
  description:
    "Deploy a 24/7 AI voice agent that handles inbound support, outbound sales, appointment booking, and lead qualification — backed by Cygnuz AI.",
}

export default function AICallingPage() {
  return (
    <main className="bg-slate-950 text-white overflow-x-hidden">
      <Navbar />

      {/* Page hero */}
      <section className="relative bg-slate-950 pt-36 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(148,163,184,0.05)_1px,_transparent_1px)] [background-size:40px_40px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/60 text-slate-400 text-xs font-medium tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Backed by Cygnuz AI
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-100 mb-5 leading-tight">
            AI Call Agent
            <br />
            <span className="text-slate-400 text-2xl md:text-3xl font-normal">
              Active 24 hours, 7 days a week
            </span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8">
            An intelligent voice agent that handles your calls, books appointments, qualifies leads,
            and supports customers — with zero wait time and no human required.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-semibold text-sm transition-all duration-200"
          >
            Get AI Calling for Your Business
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-800" />
      </section>

      {/* Full AI Calling feature section */}
      <AICallingSection />

      {/* Contact */}
      <ContactFooter />
    </main>
  )
}
