"use client"

import { useState, useEffect, useRef } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  from: "bot" | "user"
  text: string
}

// ─── Demo script ──────────────────────────────────────────────────────────────

const demoScript: Message[] = [
  { from: "bot", text: "Hello! I'm your AI assistant. How can I help you today?" },
  { from: "user", text: "I need to schedule a meeting for next week" },
  { from: "bot", text: "Happy to help! What day next week works best for you?" },
  { from: "user", text: "Tuesday afternoon would be perfect" },
  { from: "bot", text: "I found open slots on Tuesday. Would 2:00 PM or 3:30 PM work better?" },
]

// ─── Icons ────────────────────────────────────────────────────────────────────

function SendIcon() {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.74 3.42 2 2 0 0 1 3.71 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#639922" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#EF9F27" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "flex-end" }}>
      <div style={avatarStyle("bot")}>AI</div>
      <div
        style={{
          background: "#131d33",
          border: "0.5px solid #1e2d4a",
          borderRadius: "4px 12px 12px 12px",
          padding: "10px 14px",
          display: "flex",
          gap: 4,
        }}
      >
        {[0, 150, 300].map((delay, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#378ADD",
              animation: "ai-bounce 1.2s infinite",
              animationDelay: `${delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Shared style helpers ─────────────────────────────────────────────────────

function avatarStyle(from: "bot" | "user"): React.CSSProperties {
  return {
    width: 30,
    height: 30,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 500,
    flexShrink: 0,
    background: from === "bot" ? "#0c1f3a" : "#0d1f0d",
    color: from === "bot" ? "#85B7EB" : "#97C459",
    border: `0.5px solid ${from === "bot" ? "#1a3a5c" : "#1a3a1a"}`,
  }
}

function bubbleStyle(from: "bot" | "user"): React.CSSProperties {
  return {
    maxWidth: "76%",
    padding: "8px 12px",
    fontSize: 13,
    lineHeight: 1.5,
    borderRadius: from === "bot" ? "4px 12px 12px 12px" : "12px 12px 4px 12px",
    background: from === "bot" ? "#131d33" : "#185FA5",
    color: from === "bot" ? "#e0e8ff" : "#ffffff",
    border: from === "bot" ? "0.5px solid #1e2d4a" : "none",
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: React.ReactNode
  iconBg: string
  title: string
  items: string[]
}

function FeatureCard({ icon, iconBg, title, items }: FeatureCardProps) {
  return (
    <div
      style={{
        background: "#0f1629",
        border: "0.5px solid #1e2d4a",
        borderRadius: 12,
        padding: "14px 16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            background: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#c8d8f0" }}>{title}</span>
      </div>

      {items.map((item) => (
        <div
          key={item}
          style={{
            fontSize: 12,
            color: "#4a5a7a",
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 3,
          }}
        >
          <span
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "#1e2d4a",
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          {item}
        </div>
      ))}
    </div>
  )
}

interface MetricCardProps {
  value: string
  label: string
}

function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "10px 8px",
        background: "#0a0e1a",
        borderRadius: 8,
        border: "0.5px solid #1a2540",
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 500, color: "#378ADD" }}>{value}</div>
      <div style={{ fontSize: 10, color: "#3a4a6a", marginTop: 2 }}>{label}</div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AIAgentDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [inputVal, setInputVal] = useState<string>("")
  const [demoIdx, setDemoIdx] = useState<number>(0)
  const [demoRunning, setDemoRunning] = useState<boolean>(true)

  // Ref to the scrollable messages box — NOT the page
  const messagesBoxRef = useRef<HTMLDivElement | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  // Scroll only the chat box, not the whole page
  const scrollToBottom = () => {
    const box = messagesBoxRef.current
    if (box) box.scrollTop = box.scrollHeight
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Demo auto-play
  useEffect(() => {
    if (!demoRunning || demoIdx >= demoScript.length) return

    const msg = demoScript[demoIdx]

    if (msg.from === "bot") {
      setIsTyping(true)
      const t = setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [...prev, msg])
        setDemoIdx((i) => i + 1)
      }, 900)
      timersRef.current.push(t)
    } else {
      const t = setTimeout(() => {
        setMessages((prev) => [...prev, msg])
        setDemoIdx((i) => i + 1)
      }, 400)
      timersRef.current.push(t)
    }

    return clearTimers
  }, [demoIdx, demoRunning])

  const restartDemo = () => {
    clearTimers()
    setMessages([])
    setIsTyping(false)
    setDemoIdx(0)
    setDemoRunning(true)
  }

  const sendMessage = () => {
    const val = inputVal.trim()
    if (!val) return
    clearTimers()
    setDemoRunning(false)
    setMessages((prev) => [...prev, { from: "user", text: val }])
    setInputVal("")
    setIsTyping(true)
    const t = setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thanks! A live agent will follow up shortly." },
      ])
    }, 1000)
    timersRef.current.push(t)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <section
      style={{
        padding: "2.5rem 1.5rem",
        background: "#0a0e1a",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <style>{`
        @keyframes ai-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes ai-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .ai-chat-input:focus { outline: none; border-color: #378ADD !important; }
        .ai-chat-input::placeholder { color: #3a4a6a; }
        .ai-msgs::-webkit-scrollbar { width: 3px; }
        .ai-msgs::-webkit-scrollbar-track { background: transparent; }
        .ai-msgs::-webkit-scrollbar-thumb { background: #1e2d4a; border-radius: 2px; }
        .ai-send-btn:hover { background: #378ADD !important; }
        .ai-restart-btn:hover { border-color: #378ADD !important; color: #85B7EB !important; }
        .ai-cta-btn:hover { background: #378ADD !important; }
        @media (max-width: 700px) {
          .ai-demo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            fontWeight: 500,
            padding: "4px 12px",
            borderRadius: 20,
            background: "#0c1a2e",
            color: "#85B7EB",
            border: "0.5px solid #1a3a5c",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#378ADD",
              animation: "ai-pulse 2s infinite",
              display: "inline-block",
            }}
          />
          Live preview
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 500, color: "#f0f4ff", marginBottom: "0.4rem" }}>
          AI agent in action
        </h2>
        <p style={{ fontSize: 14, color: "#6b7fa8", lineHeight: 1.6, maxWidth: 460 }}>
          Watch how our agents handle real conversations and automate complex workflows — no setup required.
        </p>
      </div>

      {/* ── Grid ── */}
      <div
        className="ai-demo-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* ── Chat card ── */}
        <div>
          <div
            style={{
              background: "#0f1629",
              border: "0.5px solid #1e2d4a",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {/* Chat header */}
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "0.5px solid #1a2540",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={avatarStyle("bot")}>AI</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#e0e8ff" }}>Assistant</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#1D9E75",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#1D9E75",
                      animation: "ai-pulse 2s infinite",
                      display: "inline-block",
                    }}
                  />
                  Online
                </div>
              </div>
            </div>

            {/* Messages — fixed height, scrolls internally only */}
            <div
              ref={messagesBoxRef}
              className="ai-msgs"
              style={{
                padding: 14,
                height: 260,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 7,
                    alignItems: "flex-end",
                    flexDirection: msg.from === "user" ? "row-reverse" : "row",
                  }}
                >
                  <div style={avatarStyle(msg.from)}>
                    {msg.from === "bot" ? "AI" : "U"}
                  </div>
                  <div style={bubbleStyle(msg.from)}>{msg.text}</div>
                </div>
              ))}
              {isTyping && <TypingIndicator />}
            </div>

            {/* Input row */}
            <div
              style={{
                padding: "10px 14px",
                borderTop: "0.5px solid #1a2540",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <input
                className="ai-chat-input"
                style={{
                  flex: 1,
                  background: "#0a0e1a",
                  border: "0.5px solid #1e2d4a",
                  borderRadius: 20,
                  padding: "8px 14px",
                  fontSize: 13,
                  color: "#e0e8ff",
                  fontFamily: "inherit",
                }}
                placeholder="Type a message..."
                value={inputVal}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="ai-send-btn"
                onClick={sendMessage}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#185FA5",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.15s",
                }}
              >
                <SendIcon />
              </button>
            </div>
          </div>

          {/* Restart button */}
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <button
              className="ai-restart-btn"
              onClick={restartDemo}
              style={{
                fontSize: 11,
                color: "#3a4a6a",
                background: "none",
                border: "0.5px solid #1e2d4a",
                padding: "5px 14px",
                borderRadius: 20,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color 0.15s, color 0.15s",
              }}
            >
              ↺ Restart demo
            </button>
          </div>
        </div>

        {/* ── Feature cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <FeatureCard
            icon={<PhoneIcon />}
            iconBg="#0c1f3a"
            title="Voice AI"
            items={[
              "Natural conversation flow",
              "Multi-language support",
              "Emotion recognition",
              "Real-time responses",
            ]}
          />

          <FeatureCard
            icon={<CalendarIcon />}
            iconBg="#0d1f0d"
            title="Automation"
            items={[
              "Appointment scheduling",
              "Lead qualification",
              "Data collection",
              "Follow-up automation",
            ]}
          />

          {/* Performance card */}
          <div
            style={{
              background: "#0f1629",
              border: "0.5px solid #1e2d4a",
              borderRadius: 12,
              padding: "14px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  background: "#1f1200",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ZapIcon />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#c8d8f0" }}>Performance</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <MetricCard value="95%" label="Accuracy rate" />
              <MetricCard value="24/7" label="Availability" />
            </div>
          </div>

          {/* CTA */}
          <button
  className="ai-cta-btn"
  style={{
    width: "100%",
    padding: 10,
    borderRadius: 8,
    background: "#185FA5",
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "inherit",
    transition: "background 0.15s",
  }}
  onClick={() => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  Schedule a live demo
</button>
        </div>
      </div>
    </section>
  )
}