import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento (Open Graph) gerada no build. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#05070D",
          backgroundImage: "radial-gradient(circle at 80% 20%, rgba(59,130,246,0.30), rgba(5,7,13,0) 60%)",
          color: "#E6EAF2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#60A5FA", letterSpacing: 4 }}>
          {profile.location.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 34, color: "#8A94A8", marginTop: 24 }}>{profile.role}</div>
        </div>
        <div style={{ display: "flex", height: 4, width: 220, background: "#3B82F6", borderRadius: 4 }} />
      </div>
    ),
    size,
  );
}
