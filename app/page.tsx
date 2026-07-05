"use client"

import { useState, useEffect } from "react"
import Preloader from "@/components/preloader"
import HeroSection from "@/components/hero-section"
import AICallingSection from "@/components/ai-calling"
import WhatWeDo from "@/components/what-we-do"
import ContactFooter from "@/components/contact-footer"
import SplashCursor from "@/components/splash-cursor"
import Navbar from '@/components/Navbar';
import { Portfolio } from "@/components/portfolio"

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleEnterExperience = () => {
    setShowPreloader(false)
  }

  if (showPreloader) {
    return <Preloader onEnter={handleEnterExperience} isLoaded={isLoaded} />
  }

  return (
    <>
      <SplashCursor />
      <main className="bg-black text-white overflow-x-hidden">
            <Navbar  />

        <HeroSection />

        <AICallingSection />
        <WhatWeDo />
        <Portfolio />
        <ContactFooter />
      </main>
    </>
  )
}
