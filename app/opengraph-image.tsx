import { ImageResponse } from "next/og";

export const alt = "Rijal Ammar | Front-End Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "#ededed",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 28,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#a3a3a3",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 999,
            background: "#a3e635",
          }}
        />
        Portfolio
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 112,
            fontWeight: 800,
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          Rijal Ammar
        </div>

        <div style={{ fontSize: 48, color: "#a3e635" }}>
          Front-End Developer
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 30,
          color: "#a3a3a3",
        }}
      >
        Malang, Indonesia · Next.js · React · Tailwind CSS
      </div>
    </div>,
    { ...size },
  );
}
