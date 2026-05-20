import { ImageResponse } from "next/og";
import { SITE } from "./shared/seo/config";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "64px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "#a1a1aa",
            letterSpacing: 1,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#4ade80",
              display: "flex",
            }}
          />
          <span style={{ display: "flex" }}>devferanmi.xyz</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "#fafafa",
              display: "flex",
            }}
          >
            Oluwaferanmi
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "#a1a1aa",
              display: "flex",
            }}
          >
            Adeniji.
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 30,
              color: "#e4e4e7",
              display: "flex",
            }}
          >
            Senior Software Engineer · Lagos, Nigeria
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a1a1aa",
              lineHeight: 1.5,
              maxWidth: 980,
              display: "flex",
            }}
          >
            Fintech · developer tools · AI. millions of users at Moniepoint. Open-source: Connectic, Monie Utils.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#71717a",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 22px",
              border: "1px solid #27272a",
              borderRadius: 999,
              color: "#e4e4e7",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontSize: 16,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#4ade80",
                display: "flex",
              }}
            />
            Open to work
          </div>
          <div style={{ display: "flex" }}>devferanmi.xyz</div>
        </div>
      </div>
    ),
    size
  );
}
