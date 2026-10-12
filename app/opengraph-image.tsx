import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at top, #20173d 0%, #080808 52%, #050505 100%)",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "78%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 9,
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            FULL-STACK MOBILE DEVELOPER
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              lineHeight: 0.9,
              letterSpacing: -5,
              fontWeight: 600,
            }}
          >
            Karm Patel
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              opacity: 0.75,
              letterSpacing: 1,
            }}
          >
            Flutter Developer | .NET Backend Engineer
          </div>
        </div>
      </div>
    ),
    size,
  );
}
