import Link from "next/link"
import { Plus } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import { faqs } from "@/lib/faqs"

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="hairline" />
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Questions, answered"
            className="mb-6 md:mb-6"
          />
          <p data-reveal className="max-w-sm text-base leading-relaxed text-slate-400">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/#contact" className="font-medium text-cyan-300 underline-offset-4 hover:underline">
              Ask us directly
            </Link>{" "}
            or message us on WhatsApp.
          </p>
        </div>

        <div data-reveal className="divide-y divide-white/[0.07] rounded-3xl border border-white/[0.07] bg-white/[0.015]">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group px-6 sm:px-8 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex min-h-[4.5rem] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-slate-100 transition-colors hover:text-white">
                <h3 className="text-base font-medium">{q}</h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-transform duration-300 group-open:rotate-45 group-open:text-cyan-300">
                  <Plus className="h-4 w-4" aria-hidden />
                </span>
              </summary>
              <p className="pb-6 pr-10 text-[15px] leading-relaxed text-slate-400">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
