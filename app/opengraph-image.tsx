import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "Cygnuz AI — AI automation agency building AI agents, 24/7 voice agents and workflow automation"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/images/cygnuz-logo.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(ellipse 80% 70% at 50% -10%, #0e3a4a 0%, #020617 60%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={300} height={163} style={{ marginLeft: -60, marginTop: -30 }} alt="" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(103,232,249,0.3)",
              background: "rgba(34,211,238,0.08)",
              color: "#a5f3fc",
              fontSize: 20,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#34d399" }} />
            AI Call Agents live 24/7
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#67e8f9", letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>
            AI Automation Agency
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 980 }}>
            AI agents & automation that give your team 100+ hours back every month
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#94a3b8" }}>
          {["AI Call Agents", "Workflow Automation", "AI Chatbots", "Custom AI Software"].map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
