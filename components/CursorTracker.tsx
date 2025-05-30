"use client";
import { useEffect, useState } from "react";

export default function CursorTracker() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(147, 60, 253, 0.7)",
        pointerEvents: "none",
        mixBlendMode: "screen",
        zIndex: 1000,
        boxShadow: "0 0 8px 4px rgba(129, 32, 248, 0.6), 0 0 16px 8px rgba(207,168,255,0.4)",
      }}
    />
  );
}