"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, Loader2, Mail, MapPin, MessageCircle, TriangleAlert } from "lucide-react"
import { site, whatsappUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

const EMAILJS = {
  serviceId: "service_6m6ph5k",
  templateId: "template_3z6gfkp",
  publicKey: "0mdz-5eMwYOFC8ryQ",
}

const interests = ["AI Call Agent", "Workflow automation", "AI chatbot", "Custom AI software", "Not sure yet"]

const nextSteps = [
  "We review your message and the processes you want to automate.",
  "We book a free strategy call to map your workflow and goals.",
  "You get a clear automation blueprint — before any build begins.",
]

const emptyForm = { name: "", email: "", company: "", message: "" }

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 text-[15px] text-slate-100 placeholder:text-slate-500 transition-[border-color,box-shadow] duration-200 hover:border-white/20 focus:border-cyan-300/60 focus:outline-none focus:ring-4 focus:ring-cyan-400/10"

export default function ContactSection() {
  const [form, setForm] = useState(emptyForm)
  const [interest, setInterest] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Honeypot: real visitors never see or fill this field
    if ((e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value) return

    setStatus("sending")
    try {
      const { default: emailjs } = await import("@emailjs/browser")
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name: form.name,
          email: form.email,
          company: form.company,
          message: interest ? `Interested in: ${interest}\n\n${form.message}` : form.message,
          submission_date: new Date().toLocaleString(),
        },
        { publicKey: EMAILJS.publicKey },
      )
      setForm(emptyForm)
      setInterest(null)
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section overflow-hidden">
      <div className="hairline" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.10),transparent)]" />

      <div className="container-page relative">
        <div data-reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-5 text-center md:mb-16">
          <span className="eyebrow">Get in touch</span>
          <h2 id="contact-title" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s automate your <span className="text-gradient">busiest work</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Tell us what&apos;s slowing your team down. We&apos;ll show you exactly what AI can take off your plate — on a
            free, no-obligation strategy call.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Form */}
          <div data-reveal>
            <div className="card h-full p-6 sm:p-8">
              {status === "sent" ? (
                <div role="status" className="flex h-full min-h-[24rem] flex-col items-center justify-center gap-4 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                    <CheckCircle2 className="h-7 w-7 text-emerald-400" aria-hidden />
                  </span>
                  <h3 className="text-xl font-semibold text-white">Message sent — thank you!</h3>
                  <p className="max-w-sm text-slate-400">
                    We&apos;ll be in touch shortly to schedule your strategy call. Need us sooner? Message us on WhatsApp.
                  </p>
                  <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-2">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-slate-200">What would you like to automate?</legend>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((label) => {
                        const selected = interest === label
                        return (
                          <button
                            key={label}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setInterest(selected ? null : label)}
                            className={cn(
                              "min-h-10 rounded-full border px-4 text-sm transition-colors duration-200",
                              selected
                                ? "border-cyan-300/50 bg-cyan-400/10 text-cyan-100"
                                : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200",
                            )}
                          >
                            {label}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-slate-200">
                        Name
                      </label>
                      <input id="cf-name" name="name" required autoComplete="name" value={form.name} onChange={handleChange}
                        placeholder="Jane Doe" className={cn(fieldClass, "h-12")} />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-slate-200">
                        Work email
                      </label>
                      <input id="cf-email" name="email" type="email" required autoComplete="email" inputMode="email"
                        value={form.email} onChange={handleChange} placeholder="jane@company.com" className={cn(fieldClass, "h-12")} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cf-company" className="mb-2 block text-sm font-medium text-slate-200">
                      Company <span className="font-normal text-slate-500">(optional)</span>
                    </label>
                    <input id="cf-company" name="company" autoComplete="organization" value={form.company} onChange={handleChange}
                      placeholder="Company name" className={cn(fieldClass, "h-12")} />
                  </div>

                  <div>
                    <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-slate-200">
                      What&apos;s slowing your team down?
                    </label>
                    <textarea id="cf-message" name="message" required rows={4} value={form.message} onChange={handleChange}
                      placeholder="e.g. We miss calls after hours and spend hours a day copying leads into our CRM."
                      className={cn(fieldClass, "resize-y py-3 leading-relaxed")} />
                  </div>

                  {/* Honeypot */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="cf-website">Website</label>
                    <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200">
                      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>
                        Something went wrong sending your message. Please try again, or reach us at{" "}
                        <a href={`mailto:${site.email}`} className="underline underline-offset-2">{site.email}</a>.
                      </span>
                    </p>
                  )}

                  <button type="submit" disabled={status === "sending"} className="btn-primary group h-12 w-full">
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        Book my free strategy call
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-500">No spam, no obligation. We only use your details to reply.</p>
                </form>
              )}
            </div>
          </div>

          {/* Direct contact + next steps */}
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="flex flex-col gap-6">
            <div className="card p-6 sm:p-7">
              <h3 className="mb-5 text-sm font-medium uppercase tracking-[0.15em] text-slate-400">Prefer to talk now?</h3>
              <div className="space-y-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-emerald-400/30 hover:bg-emerald-400/[0.04]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    <MessageCircle className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-white">Chat on WhatsApp</span>
                    <span className="block text-xs text-slate-400">Fastest way to reach us</span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-white" aria-hidden />
                </a>
                <a href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/[0.04]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-200">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-white">Email us</span>
                    <span className="block truncate text-xs text-slate-400">{site.email}</span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-white" aria-hidden />
                </a>
                <div className="flex items-center gap-4 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-slate-300">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white">{site.location.label}</span>
                    <span className="block text-xs text-slate-400">Working with clients worldwide</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="card flex-1 p-6 sm:p-7">
              <h3 className="mb-5 text-sm font-medium uppercase tracking-[0.15em] text-slate-400">What happens next</h3>
              <ol className="space-y-4">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 font-mono text-xs text-cyan-200">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-sm leading-relaxed text-slate-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
