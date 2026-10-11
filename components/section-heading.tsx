import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  id?: string
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  className?: string
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <div
      data-reveal
      className={cn(
        "mb-12 flex flex-col gap-5 md:mb-16",
        centered ? "mx-auto max-w-2xl items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-4", centered ? "items-center" : "max-w-2xl")}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={id} className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title}
        </h2>
      </div>
      {description && (
        <p className={cn("text-base leading-relaxed text-slate-400", centered ? "max-w-xl" : "max-w-sm")}>
          {description}
        </p>
      )}
    </div>
  )
}
