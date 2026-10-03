import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME}, a weekly blog on Web, Mobile, Backend and AI`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fallback share card for every page without its own image (posts use their banner).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#f6f2ea",
          color: "#161411",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase", color: "#8a5a2b" }}>
          Weekly dispatches
        </div>
        <div style={{ fontSize: 168, lineHeight: 1.05, marginTop: 24 }}>{SITE_NAME}</div>
        <div style={{ height: 2, background: "#161411", margin: "32px 0" }} />
        <div style={{ fontSize: 34, lineHeight: 1.35, maxWidth: 900 }}>{SITE_DESCRIPTION}</div>
      </div>
    ),
    size
  );
}
