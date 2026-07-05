import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Cygnuz AI — 24/7 AI Calling & Automation Agency'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #0a0e1a 50%, #000d1a 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(0,212,255,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Live badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '20px',
            border: '1px solid rgba(6,182,212,0.4)',
            background: 'rgba(6,182,212,0.1)',
            color: '#22d3ee',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22d3ee',
            }}
          />
          24/7 AI Calling Service
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '16px',
            background: 'linear-gradient(90deg, #22d3ee, #3b82f6, #a855f7)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Cygnuz AI
        </div>

        <div
          style={{
            fontSize: '34px',
            fontWeight: 600,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          AI Calling Agents That Never Sleep
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '18px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.5,
            marginBottom: '40px',
          }}
        >
          Inbound support · Outbound sales · Appointment booking · Lead qualification
        </div>

        {/* Stat pills */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { value: '24/7', label: 'Always Active' },
            { value: '< 1s', label: 'Response Time' },
            { value: '95%', label: 'Resolution Rate' },
          ].map(({ value, label }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#22d3ee' }}>{value}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* URL watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '40px',
            fontSize: '14px',
            color: '#334155',
            letterSpacing: '1px',
          }}
        >
          cygnuz.ai
        </div>
      </div>
    ),
    { ...size }
  )
}
