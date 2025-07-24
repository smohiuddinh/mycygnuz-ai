"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment, Stars } from "@react-three/drei"
import * as THREE from "three"
import Image from "next/image"
import RotatingText from "@/components/rotating-text"
import StickerPeel from "@/components/sticker-peel"

interface PreloaderProps {
  onEnter: () => void
  isLoaded: boolean
}

function DroneCamera() {
  const { camera } = useThree()
  const [phase, setPhase] = useState(0)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (phase === 0 && time < 4) {
      const progress = time / 4
      const radius = 15 - progress * 12
      const height = 8 - progress * 6

      camera.position.x = Math.cos(time * 0.3) * radius
      camera.position.z = Math.sin(time * 0.3) * radius
      camera.position.y = height
      camera.lookAt(0, 0, 0)
    } else if (phase === 0) {
      setPhase(1)
    } else if (phase === 1 && time < 8) {
      const circleTime = (time - 4) * 0.8
      camera.position.x = Math.cos(circleTime) * 4
      camera.position.z = Math.sin(circleTime) * 4
      camera.position.y = 2 + Math.sin(circleTime * 2) * 0.5
      camera.lookAt(0, 0, 0)
    } else if (phase === 1) {
      setPhase(2)
    } else if (phase === 2) {
      const targetX = 0
      const targetY = 0
      const targetZ = 3

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02)
      camera.lookAt(0, 0, 0)
    }
  })

  return null
}

function ReactBitsParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 3000

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  for (let i = 0; i < particleCount; i++) {
    const radius = 5 + Math.random() * 20
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    const color = new THREE.Color()
    const hue = 0.55 + Math.random() * 0.15
    color.setHSL(hue, 1, 0.5 + Math.random() * 0.5)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    sizes[i] = Math.random() * 0.05 + 0.01
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function LogoDisplay() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={[0, 0, 0]}>
        {/* Holographic frame */}
        <mesh>
          <ringGeometry args={[2.2, 2.4, 32]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
        </mesh>

        {/* Logo container with sticker peel effect */}
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[3.5, 2.3]} />
          <meshBasicMaterial color="#001122" transparent opacity={0.9} />
        </mesh>

        {/* Glowing border */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[3.7, 2.5]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

function GridEnvironment() {
  return (
    <group>
      {/* Floor grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshBasicMaterial color="#003366" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Vertical grid walls */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, -25]}>
        <planeGeometry args={[100, 50, 50, 25]} />
        <meshBasicMaterial color="#001133" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

export default function Preloader({ onEnter, isLoaded }: PreloaderProps) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowButton(true)
      }, 4000) // Reduced from 8000ms to 4000ms
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  // Add fallback timer
  useEffect(() => {
    // Fallback to show button after 6 seconds regardless
    const fallbackTimer = setTimeout(() => {
      setShowButton(true)
    }, 6000)

    return () => clearTimeout(fallbackTimer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      <Canvas camera={{ position: [15, 8, 15], fov: 60 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8000ff" />
        <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade speed={1} />

        <DroneCamera />
        <ReactBitsParticles />
        <LogoDisplay />
        <GridEnvironment />
      </Canvas>

      {/* Logo with sticker peel effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <StickerPeel className="w-64 h-40">
          <Image src="/images/cygnuz-logo.png" alt="Cygnuz AI" width={256} height={160} className="object-contain" />
        </StickerPeel>
      </div>

      {/* Rotating text around logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
        <RotatingText
          text="• AI AUTOMATION • INTELLIGENT SYSTEMS • FUTURE TECH • "
          radius={150}
          className="text-cyan-400 text-sm font-light opacity-60"
        />
      </div>

      {/* Loading indicator */}
      {!showButton && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="relative">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-8 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-sm" />
          </div>
          <p className="text-cyan-400 text-sm font-light tracking-wider">INITIALIZING AI SYSTEMS</p>
          <div className="mt-2 w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
        </div>
      )}

      {/* Skip button - appears after 2 seconds */}
      {!showButton && isLoaded && (
        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={() => setShowButton(true)}
            className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors border border-cyan-400/30 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            Skip Animation
          </button>
        </div>
      )}

      {/* Enter button - make it more visible */}
      {showButton && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="text-center pointer-events-auto relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl animate-pulse" />
            <div className="relative bg-black/80 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl p-8">
              <h1 className="text-3xl font-bold text-cyan-400 mb-3 tracking-wider animate-pulse">SYSTEM READY</h1>
              <p className="text-gray-300 mb-6 text-base">Enter the AI Universe</p>
              <button
                onClick={onEnter}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 transition-all duration-300 border-2 border-cyan-400/70 animate-bounce"
              >
                ENTER EXPERIENCE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ReactBits corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
    </div>
  )
}
