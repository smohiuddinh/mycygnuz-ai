"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu, X } from "lucide-react"
import { navItems } from "@/lib/site"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Glass background once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-spy for the home page sections
  useEffect(() => {
    setActiveSection(null)
    if (pathname !== "/") return
    const ids = navItems.map((i) => i.section).filter(Boolean) as string[]
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [pathname])

  // Close the mobile menu on route change, Escape, or when resized to desktop
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const mq = window.matchMedia("(min-width: 768px)")
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener("keydown", onKey)
    mq.addEventListener("change", onMq)
    return () => {
      window.removeEventListener("keydown", onKey)
      mq.removeEventListener("change", onMq)
    }
  }, [open])

  const isActive = (item: (typeof navItems)[number]) =>
    item.section ? pathname === "/" && activeSection === item.section : pathname === item.href

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-white/[0.06] bg-slate-950/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      <nav aria-label="Main" className="container-page flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link href="/" aria-label="Cygnuz AI — home" className="-ml-1 shrink-0 rounded-md p-1">
          <Image
            src="/images/cygnuz-logo.webp"
            alt="Cygnuz AI"
            width={331}
            height={203}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item)
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  aria-current={active ? (item.section ? "location" : "page") : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    active ? "bg-white/[0.08] text-white" : "text-slate-400 hover:text-white",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/#contact" className="btn-primary hidden h-10 min-h-0 px-5 md:inline-flex">
            Book a free call
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-200 transition-colors hover:bg-white/[0.08] md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <ul className="container-page flex flex-col gap-1 pb-6 pt-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item) ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors",
                    isActive(item) ? "bg-white/[0.06] text-white" : "text-slate-300 hover:bg-white/[0.04] hover:text-white",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link href="/#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                Book a free call
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
