"use client"

import { useState, useEffect } from "react"
import Preloader from "@/components/preloader"
import HeroSection from "@/components/hero-section"
import { Portfolio } from "@/components/portfolio"
import Problems from "@/components/problems"
import WhyUs from "@/components/why-us"
import WhatWeDo from "@/components/what-we-do"
import ContactFooter from "@/components/contact-footer"
import SplashCursor from "@/components/splash-cursor"
import Navbar from "@/components/Navbar"

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (showPreloader) {
    return <Preloader onEnter={() => setShowPreloader(false)} isLoaded={isLoaded} />
  }

  return (
    <>
      <SplashCursor />
      <main className="bg-slate-950 text-white overflow-x-hidden">
        <Navbar />

        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Our Clients */}
        <Portfolio />

        {/* 3. Problems */}
        <Problems />

        {/* 4. Why Us */}
        <WhyUs />

        {/* 5. Services */}
        <WhatWeDo />

        {/* 6. Get In Touch */}
        <ContactFooter />
      </main>
    </>
  )
}
