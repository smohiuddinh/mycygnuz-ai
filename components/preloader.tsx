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
// Phase 0 (0–1.2s):  Wide drone sweep, high altitude
// Phase 1 (1.2–2.4s): Descends, tightens orbit
// Phase 2 (2.4–3.6s): Locks on logo, slow hover
// Phase 3 (3.6–4.6s): Push-in zoom straight at logo
// Phase 4 (4.6s+):   Hold, signal parent
function CinematicCamera({
  onZoomComplete,
  skipSignal,
}: {
  onZoomComplete: () => void
  skipSignal: boolean
}) {
  const { camera } = useThree()
  const notified = useRef(false)
  const lastAngle = useRef(0)
  const skipTime = useRef<number | null>(null)

  useFrame((state) => {
    if (skipSignal && skipTime.current === null) {
      skipTime.current = state.clock.elapsedTime
    }

    const t = skipSignal && skipTime.current !== null
      ? 4.8 + (state.clock.elapsedTime - skipTime.current)
      : state.clock.elapsedTime

    if (t < 1.2) {
      const p = t / 1.2
      const radius = 20 - p * 5
      const height = 13 - p * 3
      const angle = t * 0.55
      lastAngle.current = angle
      camera.position.set(
        Math.cos(angle) * radius,
        height + Math.sin(t * 0.35) * 1.2,
        Math.sin(angle) * radius
      )
      camera.lookAt(0, 0, 0)

    } else if (t < 2.4) {
      const p = (t - 1.2) / 1.2
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

    } else if (t < 3.6) {
      const p = (t - 2.4) / 1.2
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

    } else if (t < 4.6) {
      const p = (t - 3.6) / 1.0
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      const z = THREE.MathUtils.lerp(1.2, 0.05, ease)
      camera.position.set(
        THREE.MathUtils.lerp(camera.position.x, 0, 0.18),
        THREE.MathUtils.lerp(camera.position.y, 0, 0.18),
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
      // slate/neutral tones with a faint emerald tint, matching hero's palette
      const c = new THREE.Color().setHSL(0.45 + Math.random() * 0.08, 0.15, 0.55 + Math.random() * 0.2)
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return [pos, col]
  })()

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.055
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04} vertexColors transparent opacity={0.45}
        sizeAttenuation blending={THREE.NormalBlending} depthWrite={false}
      />
    </points>
  )
}

// ─── Grid ────────────────────────────────────────────────────────────────────
function Grid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[150, 150, 70, 70]} />
      <meshBasicMaterial color="#334155" wireframe transparent opacity={0.08} />
    </mesh>
  )
}

// ─── Moving Drone Light ───────────────────────────────────────────────────────
function DroneLight() {
  const ref = useRef<THREE.PointLight>(null)
  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.elapsedTime
      ref.current.position.set(Math.cos(t * 0.7) * 10, 7, Math.sin(t * 0.7) * 10)
    }
  })
  return <pointLight ref={ref} intensity={1.6} color="#94a3b8" distance={35} />
}

// ─── Logo Target Glow (3D plane behind logo) ──────────────────────────────────
function LogoGlow() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.elapsedTime
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.05 + Math.sin(t * 1.4) * 0.025
      ref.current.position.y = Math.sin(t * 0.7) * 0.06
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, -0.1]}>
      <planeGeometry args={[5, 3]} />
      <meshBasicMaterial color="#64748b" transparent opacity={0.06} />
    </mesh>
  )
}

// ─── Main Preloader ───────────────────────────────────────────────────────────
export default function Preloader({ onEnter, isLoaded }: PreloaderProps) {
  const [zoomDone,     setZoomDone]     = useState(false)
  const [fadeOut,      setFadeOut]      = useState(false)
  const [logoOpacity,  setLogoOpacity]  = useState(0)
  const [logoScale,    setLogoScale]    = useState(1)
  const [reticleGone,  setReticleGone]  = useState(false)
  const [skipSignal,   setSkipSignal]   = useState(false)
  const [skipVisible,  setSkipVisible]  = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLogoOpacity(1), 300)
    const t2 = setTimeout(() => setSkipVisible(true), 800)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  const handleZoomComplete = useCallback(() => {
    setZoomDone(true)
    setReticleGone(true)
  }, [])

  useEffect(() => {
    if (!zoomDone) return
    setLogoScale(14)
    const t1 = setTimeout(() => setFadeOut(true), 150)
    const t2 = setTimeout(() => onEnter(), 550)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [zoomDone, onEnter])

  const handleSkip = useCallback(() => {
    if (zoomDone) return
    setSkipVisible(false)
    setSkipSignal(true)
    setReticleGone(true)
  }, [zoomDone])

  useEffect(() => {
    const t = setTimeout(onEnter, 10000)
    return () => clearTimeout(t)
  }, [onEnter])

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.4s ease-in-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* ── Subtle grid, matching hero ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(148,163,184,0.06)_1px,_transparent_1px)] [background-size:40px_40px]" />

      {/* ── Faint glow blobs, matching hero ── */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-800/30 rounded-full blur-3xl pointer-events-none" />

      {/* ── 3D Scene ── */}
      <Canvas
        camera={{ position: [20, 13, 20], fov: 52 }}
        gl={{ antialias: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Environment preset="night" />
        <ambientLight intensity={0.15} />
        <DroneLight />
        <pointLight position={[-14, 9, -9]} intensity={0.4} color="#475569" />
        <pointLight position={[0,  0,  2]}  intensity={0.2} color="#cbd5e1" />
        <Stars radius={130} depth={55} count={500} factor={4} saturation={0} fade speed={1} />
        <CinematicCamera onZoomComplete={handleZoomComplete} skipSignal={skipSignal} />
        <Particles />
        <LogoGlow />
        <Grid />
      </Canvas>

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
              ? "opacity 0.2s ease-in, transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)"
              : "opacity 1s cubic-bezier(0.22,1,0.36,1)",
            willChange: "transform, opacity",
            filter: zoomDone
              ? "brightness(1.4) saturate(0)"
              : "drop-shadow(0 0 16px rgba(148,163,184,0.25))",
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
          <div style={{ animation: "reticle 4.8s cubic-bezier(0.4,0,0.2,1) forwards" }}>
            <div
              className="absolute rounded-full border border-slate-600/25"
              style={{ inset: -80, animation: "spin 6s linear infinite" }}
            />
            <div
              className="absolute rounded-full border border-slate-500/35"
              style={{ inset: -48, animation: "spin 3.5s linear infinite reverse" }}
            />
            <div
              className="absolute rounded-full border-2 border-slate-400/50"
              style={{ inset: -24, animation: "spin 1.5s linear infinite" }}
            />
            <div className="absolute" style={{ inset: -70 }}>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/25 to-transparent" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-500/25 to-transparent" />
            </div>
            {[
              "top-0 left-0 border-t border-l",
              "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-4 h-4 border-slate-500/60 ${cls}`}
                style={{ margin: -28 }}
              />
            ))}
            <div className="relative w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_3px_rgba(16,185,129,0.5)]" />
          </div>
        </div>
      )}

      {/* ── HUD corners ── */}
      {["top-5 left-5 border-l-2 border-t-2", "top-5 right-5 border-r-2 border-t-2",
        "bottom-5 left-5 border-l-2 border-b-2", "bottom-5 right-5 border-r-2 border-b-2"].map((cls, i) => (
        <div key={i} className={`absolute w-7 h-7 border-slate-600/40 ${cls}`} style={{ zIndex: 15 }} />
      ))}

      {/* ── Skip Button ── */}
      {skipVisible && !zoomDone && (
        <button
          onClick={handleSkip}
          className="absolute top-5 right-16 flex items-center gap-2 px-4 py-1.5 rounded-full font-medium text-xs tracking-widest uppercase border border-slate-700 bg-slate-800/60 text-slate-400 backdrop-blur-sm transition-colors duration-300 hover:bg-slate-800 hover:border-slate-600 hover:text-slate-200"
          style={{
            zIndex: 20,
            cursor: "pointer",
            animation: "fadeInSkip 0.4s ease forwards",
          }}
        >
          <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor">
            <polygon points="0,0 8,4.5 0,9" />
          </svg>
          Skip
        </button>
      )}

      {/* ── Status bar ── */}
      {!zoomDone && (
        <div
          className="pointer-events-none absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3"
          style={{ zIndex: 15 }}
        >
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/60">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
        <p className="text-slate-400 text-xs tracking-[0.3em] font-medium uppercase select-none">
  Built for trust, powered by AI
</p>
          </div>
          <div className="flex items-end gap-0.5">
            {[4,7,5,9,6,8,4,7,5,6].map((h, i) => (
              <div
                key={i}
                className="w-0.5 rounded-sm bg-slate-500/50"
                style={{
                  height: h * 2,
                  animation: `waveBar 0.55s ease-in-out ${i * 0.045}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom fade into hero, matching hero's own bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" style={{ zIndex: 14 }} />

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
        @keyframes fadeInSkip {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}