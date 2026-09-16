import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#18181f",
          color: "#eceae4",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6b9e8f",
          }}
        >
          Portfolio
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              margin: 0,
              fontSize: 64,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: 28,
              color: "#a8a6a0",
            }}
          >
            {site.title}
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 20, color: "#6b6a64" }}>
          ASP.NET Core · SQL Server · Integrations
        </p>
      </div>
    ),
    { ...size },
  );
}
