"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import { ArrowRight, Play } from "lucide-react"
import * as THREE from "three"
import StarBorderButton from "@/components/star-border-button"
import RotatingText from "@/components/rotating-text"

function ReactBitsOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Main orb */}
        <Sphere ref={meshRef} args={[1.2, 64, 64]} scale={1.5}>
          <MeshDistortMaterial
            color="#00d4ff"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.8}
          />
        </Sphere>

        {/* Outer ring */}
        <mesh ref={ringRef}>
          <ringGeometry args={[2.2, 2.4, 32]} />
          <meshBasicMaterial color="#8000ff" transparent opacity={0.6} />
        </mesh>

        {/* Inner particles */}
        {[...Array(8)].map((_, i) => (
          <Float key={i} speed={2 + i * 0.1} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[Math.cos((i / 8) * Math.PI * 2) * 2, Math.sin((i / 8) * Math.PI * 2) * 2, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color="#00ffff" />
            </mesh>
          </Float>
        ))}
      </group>
    </Float>
  )
}

function ReactBitsBackground() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 2000

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const radius = 8 + Math.random() * 15
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    const color = new THREE.Color()
    color.setHSL(0.55 + Math.random() * 0.1, 1, 0.5 + Math.random() * 0.5)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animateElements = () => {
      if (titleRef.current) {
        titleRef.current.style.opacity = "1"
        titleRef.current.style.transform = "translateY(0)"
      }

      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = "1"
          subtitleRef.current.style.transform = "translateY(0)"
        }
      }, 300)

      setTimeout(() => {
        if (buttonsRef.current) {
          buttonsRef.current.style.opacity = "1"
          buttonsRef.current.style.transform = "translateY(0)"
        }
      }, 600)
    }

    const timer = setTimeout(animateElements, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* ReactBits background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <Canvas className="absolute inset-0" camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8000ff" />
        <ReactBitsOrb />
        <ReactBitsBackground />
      </Canvas>

      {/* Rotating text around the orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
        <RotatingText
          text="• FUTURE • INNOVATION • AUTOMATION • AI • "
          radius={120}
          className="text-cyan-400/40 text-xs"
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* ReactBits-style title container */}
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl" />
          <h1
            ref={titleRef}
            className="relative text-4xl md:text-6xl font-bold mb-4 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Reimagining Business
            </span>
            <br />
            <span className="text-white text-3xl md:text-5xl">Through AI Automation</span>
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 mb-6 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out max-w-3xl mx-auto"
        >
          Advanced AI automation agency building intelligent systems that optimize workflows and revolutionize how
          businesses operate.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
        >
          <StarBorderButton
            variant="default"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-full font-medium border border-cyan-400/50"
          >
            <span className="flex items-center">
              See How It Works
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </StarBorderButton>

          <StarBorderButton
            variant="outline"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-full font-medium bg-transparent backdrop-blur-sm"
          >
            <span className="flex items-center">
              <Play className="mr-2 h-4 w-4" />
              Request Demo
            </span>
          </StarBorderButton>
        </div>
      </div>

      {/* ReactBits scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className="w-6 h-10 border border-cyan-400 rounded-full flex justify-center opacity-60">
            <div className="w-0.5 h-2 bg-cyan-400 rounded-full mt-1.5 animate-pulse"></div>
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-sm" />
        </div>
      </div>

      {/* ReactBits corner elements */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-cyan-400/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-cyan-400/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-cyan-400/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-cyan-400/30" />
    </section>
  )
}
