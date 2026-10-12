"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WorldCanvas = dynamic(() => import("./WorldCanvas"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="descent-fallback" />,
});

export default function DescentCanvas() {
  const [worldReady, setWorldReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setWorldReady(true), 800);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      <div className="descent-fallback" />
      {worldReady ? <WorldCanvas /> : null}
    </div>
  );
}
