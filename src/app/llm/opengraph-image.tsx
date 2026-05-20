import { ImageResponse } from "next/og";

export const alt = "feranmi.ai — ask me anything";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "64px 56px 64px 64px",
            gap: 56,
          }}
        >
          {/* Left — chat preview */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 18,
              justifyContent: "center",
            }}
          >
            {/* User bubble */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: "#fafafa",
                  color: "#0a0a0a",
                  borderRadius: "18px 18px 4px 18px",
                  padding: "14px 22px",
                  fontSize: 22,
                  maxWidth: 460,
                  display: "flex",
                  fontWeight: 600,
                }}
              >
                is feranmi open to work?
              </div>
            </div>

            {/* AI bubble */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 999,
                  background: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#0a0a0a", fontSize: 22, fontWeight: 700, display: "flex" }}>
                  *
                </span>
              </div>
              <div
                style={{
                  background: "#18181b",
                  border: "1px solid #27272a",
                  color: "#e4e4e7",
                  borderRadius: "4px 18px 18px 18px",
                  padding: "14px 22px",
                  fontSize: 22,
                  maxWidth: 460,
                  lineHeight: 1.5,
                  display: "flex",
                }}
              >
                yes — actively exploring senior roles in fintech &amp; developer tools.
              </div>
            </div>

            {/* User bubble 2 */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: "#fafafa",
                  color: "#0a0a0a",
                  borderRadius: "18px 18px 4px 18px",
                  padding: "14px 22px",
                  fontSize: 22,
                  maxWidth: 460,
                  display: "flex",
                  fontWeight: 600,
                }}
              >
                what&apos;s his best project?
              </div>
            </div>

            {/* AI bubble 2 */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 999,
                  background: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#0a0a0a", fontSize: 22, fontWeight: 700, display: "flex" }}>
                  *
                </span>
              </div>
              <div
                style={{
                  background: "#18181b",
                  border: "1px solid #27272a",
                  color: "#e4e4e7",
                  borderRadius: "4px 18px 18px 18px",
                  padding: "14px 22px",
                  fontSize: 22,
                  maxWidth: 460,
                  lineHeight: 1.5,
                  display: "flex",
                }}
              >
                Moniepoint&apos;s loan systems — millions of users, zero downtime.
              </div>
            </div>
          </div>

          {/* Right — CTA */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 22,
              width: 320,
              paddingLeft: 44,
              borderLeft: "1px solid #27272a",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#a1a1aa",
                fontSize: 16,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0a0a0a",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                *
              </span>
              feranmi.ai
            </div>

            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#fafafa",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <span style={{ display: "flex" }}>ask me</span>
              <span style={{ display: "flex", color: "#a1a1aa" }}>anything.</span>
            </div>

            <div
              style={{
                fontSize: 17,
                color: "#a1a1aa",
                lineHeight: 1.6,
                display: "flex",
              }}
            >
              Grounded in Feranmi&apos;s actual work, experience &amp; opinions.
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                border: "1px solid #27272a",
                borderRadius: 999,
                fontSize: 14,
                color: "#e4e4e7",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#4ade80",
                  display: "flex",
                }}
              />
              online now
            </div>

            <div style={{ color: "#52525b", fontSize: 15, display: "flex" }}>
              devferanmi.xyz/llm
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
