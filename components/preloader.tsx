"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Stars } from "@react-three/drei"
import * as THREE from "three"
import Image from "next/image"

interface PreloaderProps {
  onEnter: () => void
  isLoaded: boolean
}

// ─── Cinematic Camera ────────────────────────────────────────────────────────
// Phase 0 (0–3s):   Wide drone sweep, high altitude
// Phase 1 (3–6s):   Descends, tightens orbit
// Phase 2 (6–9s):   Locks on logo, slow hover
// Phase 3 (9–11s):  Push-in zoom straight at logo
// Phase 4 (11s+):   Hold, signal parent
function CinematicCamera({ onZoomComplete }: { onZoomComplete: () => void }) {
  const { camera } = useThree()
  const notified = useRef(false)
  const lastAngle = useRef(0)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (t < 3) {
      // Wide high-altitude sweep
      const p = t / 3
      const radius = 20 - p * 5
      const height = 13 - p * 3
      const angle = t * 0.22
      lastAngle.current = angle
      camera.position.set(
        Math.cos(angle) * radius,
        height + Math.sin(t * 0.35) * 1.2,
        Math.sin(angle) * radius
      )
      camera.lookAt(0, 0, 0)

    } else if (t < 6) {
      // Descend and tighten
      const p = (t - 3) / 3
      const ease = 1 - Math.pow(1 - p, 3)
      const radius = 15 - ease * 12
      const height = 10 - ease * 9
      const angle = lastAngle.current + p * 1.8
      camera.position.set(
        Math.cos(angle) * radius,
        height + Math.sin(t * 0.5) * 0.6,
        Math.sin(angle) * radius
      )
      camera.lookAt(0, 0, 0)

    } else if (t < 9) {
      // Lock and hover — slow, intimate
      const p = (t - 6) / 3
      const ease = 1 - Math.pow(1 - p, 2)
      const radius = 3 - ease * 1.8
      const height = 1 - ease * 0.9
      const angle = lastAngle.current + 1.8 + p * 0.8
      camera.position.set(
        Math.cos(angle) * radius,
        height + Math.sin(t * 1.1) * 0.1,
        Math.sin(angle) * radius
      )
      camera.lookAt(0, 0, 0)

    } else if (t < 11) {
      // Push straight in — fly into logo
      const p = (t - 9) / 2
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      const z = THREE.MathUtils.lerp(1.2, 0.05, ease)
      camera.position.set(
        THREE.MathUtils.lerp(camera.position.x, 0, 0.12),
        THREE.MathUtils.lerp(camera.position.y, 0, 0.12),
        z
      )
      camera.lookAt(0, 0, 0)

    } else {
      camera.position.set(0, 0, 0.05)
      camera.lookAt(0, 0, 0)
      if (!notified.current) {
        notified.current = true
        onZoomComplete()
      }
    }
  })

  return null
}

// ─── Ambient Particles ───────────────────────────────────────────────────────
function Particles() {
  const ref = useRef<THREE.Points>(null)
  const count = 1800

  const [positions, colors] = (() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 9 + Math.random() * 16
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = new THREE.Color().setHSL(0.52 + Math.random() * 0.14, 1, 0.5 + Math.random() * 0.25)
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return [pos, col]
  })()

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.022
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045} vertexColors transparent opacity={0.7}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false}
      />
    </points>
  )
}

// ─── Grid ────────────────────────────────────────────────────────────────────
function Grid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[150, 150, 70, 70]} />
      <meshBasicMaterial color="#003366" wireframe transparent opacity={0.1} />
    </mesh>
  )
}

// ─── Moving Drone Light ───────────────────────────────────────────────────────
function DroneLight() {
  const ref = useRef<THREE.PointLight>(null)
  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.elapsedTime
      ref.current.position.set(Math.cos(t * 0.28) * 10, 7, Math.sin(t * 0.28) * 10)
    }
  })
  return <pointLight ref={ref} intensity={2.5} color="#00d4ff" distance={35} />
}

// ─── Logo Target Glow (3D plane behind logo) ──────────────────────────────────
function LogoGlow() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.elapsedTime
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + Math.sin(t * 1.4) * 0.04
      ref.current.position.y = Math.sin(t * 0.7) * 0.06
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, -0.1]}>
      <planeGeometry args={[5, 3]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} />
    </mesh>
  )
}

// ─── Main Preloader ───────────────────────────────────────────────────────────
export default function Preloader({ onEnter, isLoaded }: PreloaderProps) {
  const [zoomDone,      setZoomDone]      = useState(false)
  const [fadeOut,       setFadeOut]       = useState(false)
  const [logoOpacity,   setLogoOpacity]   = useState(0)
  const [logoScale,     setLogoScale]     = useState(1)
  const [flashOpacity,  setFlashOpacity]  = useState(0)
  const [reticleGone,   setReticleGone]   = useState(false)

  // Fade logo in gently on mount
  useEffect(() => {
    const t = setTimeout(() => setLogoOpacity(1), 600)
    return () => clearTimeout(t)
  }, [])

  const handleZoomComplete = useCallback(() => {
    setZoomDone(true)
    setReticleGone(true)
  }, [])

  // Zoom complete → explode logo → white flash → exit
  useEffect(() => {
    if (!zoomDone) return

    // 1. Scale logo up dramatically
    setLogoScale(12)

    // 2. Flash white
    const t1 = setTimeout(() => setFlashOpacity(1), 200)

    // 3. Fade the whole preloader out
    const t2 = setTimeout(() => setFadeOut(true), 500)

    // 4. Call parent
    const t3 = setTimeout(() => onEnter(), 950)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [zoomDone, onEnter])

  // Hard fallback
  useEffect(() => {
    const t = setTimeout(onEnter, 15000)
    return () => clearTimeout(t)
  }, [onEnter])

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: "#000008",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.45s ease-in-out",
      }}
    >
      {/* ── 3D Scene ── */}
      <Canvas
        camera={{ position: [20, 13, 20], fov: 52 }}
        gl={{ antialias: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Environment preset="night" />
        <ambientLight intensity={0.04} />
        <DroneLight />
        <pointLight position={[-14, 9, -9]} intensity={0.9} color="#5500cc" />
        <pointLight position={[0,  0,  2]}  intensity={0.3} color="#00aaff" />
        <Stars radius={130} depth={55} count={700} factor={5} saturation={0} fade speed={0.7} />
        <CinematicCamera onZoomComplete={handleZoomComplete} />
        <Particles />
        <LogoGlow />
        <Grid />
      </Canvas>

      {/* ── Scanlines ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,212,255,0.012) 3px,rgba(0,212,255,0.012) 4px)",
          zIndex: 3,
        }}
      />

      {/* ── Logo (HTML overlay, centered) ── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 12 }}
      >
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            transition: zoomDone
              ? "opacity 0.25s ease-in, transform 0.65s cubic-bezier(0.165, 0.84, 0.44, 1)"
              : "opacity 1.4s cubic-bezier(0.22,1,0.36,1)",
            willChange: "transform, opacity",
            filter: zoomDone ? "brightness(2) saturate(0)" : "drop-shadow(0 0 20px rgba(0,212,255,0.35))",
          }}
        >
          <Image
            src="/images/cygnuz-logo.png"
            alt="Cygnuz AI"
            width={290}
            height={180}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* ── Targeting Reticle ── */}
      {!reticleGone && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 11 }}
        >
          <div style={{ animation: "reticle 11s cubic-bezier(0.4,0,0.2,1) forwards" }}>
            {/* Outer slow ring */}
            <div
              className="absolute rounded-full border border-cyan-500/25"
              style={{ inset: -80, animation: "spin 12s linear infinite" }}
            />
            {/* Mid ring */}
            <div
              className="absolute rounded-full border border-cyan-400/40"
              style={{ inset: -48, animation: "spin 7s linear infinite reverse" }}
            />
            {/* Inner ring */}
            <div
              className="absolute rounded-full border-2 border-cyan-400/60"
              style={{ inset: -24, animation: "spin 3s linear infinite" }}
            />
            {/* Cross hairs */}
            <div className="absolute" style={{ inset: -70 }}>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
            </div>
            {/* Corner brackets */}
            {[
              "top-0 left-0 border-t border-l",
              "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-4 h-4 border-cyan-400 ${cls}`}
                style={{ margin: -28 }}
              />
            ))}
            {/* Center pip */}
            <div className="relative w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(0,212,255,0.7)]" />
          </div>
        </div>
      )}

      {/* ── HUD corners ── */}
      {["top-5 left-5 border-l-2 border-t-2", "top-5 right-5 border-r-2 border-t-2",
        "bottom-5 left-5 border-l-2 border-b-2", "bottom-5 right-5 border-r-2 border-b-2"].map((cls, i) => (
        <div key={i} className={`absolute w-7 h-7 border-cyan-500/50 ${cls}`} style={{ zIndex: 15 }} />
      ))}

      {/* ── Status bar ── */}
      {!zoomDone && (
        <div
          className="pointer-events-none absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3"
          style={{ zIndex: 15 }}
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <p className="text-cyan-400/75 text-xs tracking-[0.35em] font-mono uppercase select-none">
              Acquiring Target
            </p>
          </div>
          <div className="flex items-end gap-0.5">
            {[4,7,5,9,6,8,4,7,5,6].map((h, i) => (
              <div
                key={i}
                className="w-0.5 rounded-sm bg-cyan-400/50"
                style={{
                  height: h * 2,
                  animation: `waveBar 1.1s ease-in-out ${i * 0.09}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── White flash on transition ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-white"
        style={{
          opacity: flashOpacity,
          transition: "opacity 0.35s ease-out",
          zIndex: 30,
        }}
      />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes reticle {
          0%   { transform: scale(3);   opacity: 0;   }
          10%  { opacity: 1; }
          70%  { transform: scale(0.9); opacity: 1;   }
          90%  { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(0.1); opacity: 0;   }
        }
        @keyframes waveBar {
          from { transform: scaleY(0.4); opacity: 0.4; }
          to   { transform: scaleY(1.6); opacity: 1;   }
        }
      `}</style>
    </div>
  )
}