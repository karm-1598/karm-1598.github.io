"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (event: MouseEvent) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const handlePointerEnter = () => {
      gsap.to(cursor, {
        scale: 1.8,
        duration: 0.25,
      });

      gsap.to(follower, {
        scale: 1.5,
        opacity: 0.35,
        duration: 0.25,
      });
    };

    const handlePointerLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.25,
      });

      gsap.to(follower, {
        scale: 1,
        opacity: 0.15,
        duration: 0.25,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor]",
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handlePointerEnter);
      element.addEventListener("mouseleave", handlePointerLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handlePointerEnter);
        element.removeEventListener("mouseleave", handlePointerLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
      />

      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 opacity-15 md:block"
      />
    </>
  );
}