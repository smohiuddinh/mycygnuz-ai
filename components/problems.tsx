import { Inbox, MoonStar, Puzzle } from "lucide-react"
import SectionHeading from "@/components/section-heading"

const problems = [
  {
    icon: Inbox,
    title: "Drowning in manual work",
    body: "Your team answers the same questions, re-types the same data and chases the same follow-ups every day. While you put out fires, competitors are automating theirs — and pulling ahead.",
  },
  {
    icon: MoonStar,
    title: "Missing leads while you sleep",
    body: "Every missed call, unanswered DM or slow follow-up sends a buyer to a competitor. Larger brands already run AI agents that reply in seconds, 24/7 — smaller teams lose those leads overnight.",
  },
  {
    icon: Puzzle,
    title: "Tools that don't talk to each other",
    body: "The AI landscape changes weekly. Most businesses burn months and budget on disconnected tools and half-built automations instead of one system designed around their real workflow.",
  },
]

export default function Problems() {
  return (
    <section aria-labelledby="problems-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="problems-title"
          eyebrow="Sound familiar?"
          title={
            <>
              Your team is doing work <span className="text-slate-500">a machine should be doing</span>
            </>
          }
          description="If any of these hit close to home, you're exactly who we built Cygnuz AI for."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {problems.map(({ icon: Icon, title, body }, i) => (
            <div key={title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
              <article className="card card-hover h-full p-7 sm:p-8">
                <div className="mb-8 flex items-center justify-between">
                  <span className="icon-tile">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
                <p className="text-[15px] leading-relaxed text-slate-400">{body}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
