import Image from "next/image"

const clients = [
  { name: "Engro", image: "/clients/engro.webp", w: 360, h: 153 },
  { name: "PalmCare Foundation", image: "/clients/palmcare.webp", w: 216, h: 160 },
  { name: "Mintsy Plus", image: "/clients/minty.webp", w: 360, h: 110 },
  { name: "Legerium", image: "/clients/logo_bg.webp", w: 360, h: 71 },
  { name: "EcoSaathi", image: "/clients/ecosaathi.webp", w: 164, h: 160 },
  { name: "Infinitely Digital", image: "/clients/infinitely.webp", w: 360, h: 87 },
  { name: "Terminix Pakistan", image: "/clients/terminix.webp", w: 121, h: 126 },
  { name: "UrEwaste", image: "/clients/urewaste.webp", w: 360, h: 130 },
  { name: "Suhaib", image: "/clients/suhaib.webp", w: 156, h: 160 },
]

function LogoList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden || undefined}>
      {clients.map((c) => (
        <li
          key={c.name}
          className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl bg-white px-6 py-4 ring-1 ring-white/10"
        >
          <Image
            src={c.image}
            alt={hidden ? "" : `${c.name} logo`}
            width={c.w}
            height={c.h}
            sizes="140px"
            className="max-h-12 w-auto object-contain"
          />
        </li>
      ))}
    </ul>
  )
}

export function Portfolio() {
  return (
    <section id="clients" aria-labelledby="clients-title" className="relative border-y border-white/[0.06] bg-slate-950/60 py-14 sm:py-16">
      <div className="container-page mb-8 flex flex-col items-center gap-2 text-center" data-reveal>
        <h2 id="clients-title" className="text-sm font-medium text-slate-300">
          Trusted by businesses across industries
        </h2>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Karachi · Pakistan · Worldwide</p>
      </div>

      <div className="marquee flex overflow-hidden" data-reveal>
        <div className="marquee-track flex w-max" style={{ "--marquee-duration": "45s" } as React.CSSProperties}>
          <LogoList />
          <LogoList hidden />
        </div>
      </div>
    </section>
  )
}
