import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-[var(--nav-h)]">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="container-page flex flex-col items-center text-center">
        <p className="font-mono text-sm text-cyan-300">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">This page doesn&apos;t exist</h1>
        <p className="mt-4 max-w-md text-slate-400">
          The link may be broken or the page may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
          <Link href="/#contact" className="btn-secondary">Contact us</Link>
        </div>
      </div>
    </section>
  )
}
