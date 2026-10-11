"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "cz-preloaded"
const MIN_VISIBLE_MS = 650
const MAX_VISIBLE_MS = 1800
const EXIT_MS = 500

/**
 * Lightweight brand intro. It is server-rendered on top of the fully rendered
 * page (so it never blocks content or crawlers), leaves as soon as the window
 * has loaded, and only plays once per session. globals.css also fades it out
 * on its own if JavaScript never runs.
 */
export default function Preloader() {
  const [state, setState] = useState<"visible" | "leaving" | "gone">("visible")

  useEffect(() => {
    const root = document.documentElement
    if (root.hasAttribute("data-preloaded")) {
      setState("gone")
      return
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const minDelay = reduced ? 0 : Math.max(0, MIN_VISIBLE_MS - performance.now())
    const timers: ReturnType<typeof setTimeout>[] = []
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      try {
        sessionStorage.setItem(STORAGE_KEY, "1")
      } catch {}
      timers.push(
        setTimeout(() => {
          setState("leaving")
          timers.push(setTimeout(() => setState("gone"), EXIT_MS))
        }, minDelay),
      )
    }

    if (document.readyState === "complete") finish()
    else window.addEventListener("load", finish, { once: true })
    timers.push(setTimeout(finish, MAX_VISIBLE_MS))

    return () => {
      window.removeEventListener("load", finish)
      timers.forEach(clearTimeout)
    }
  }, [])

  if (state === "gone") return null

  return (
    <div
      aria-hidden="true"
      data-done={state === "leaving" ? "" : undefined}
      className="preloader fixed inset-0 z-[150] flex items-center justify-center bg-slate-950"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="preloader-mark relative flex flex-col items-center gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/cygnuz-logo.webp" alt="" width={220} height={135} className="h-auto w-[180px] sm:w-[220px]" />
        <div className="h-px w-40 overflow-hidden rounded-full bg-white/10">
          <div className="preloader-bar h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400" />
        </div>
      </div>
    </div>
  )
}
