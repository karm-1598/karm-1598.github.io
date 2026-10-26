"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { zoneIds } from "@/lib/scroll-store";
import { useReducedMotion } from "@/lib/useReducedMotion";

const zoneNumbers = new Map(zoneIds.map((zone, index) => [zone, index + 1]));

export function SessionPreloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  const dismiss = useCallback(() => {
    try {
      window.sessionStorage.setItem("karm-portfolio-intro-seen", "true");
    } catch {
      // Session storage is unavailable
    }
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.classList.remove("is-visible");
    window.setTimeout(() => {
      overlay.hidden = true;
      if (document.activeElement === skipRef.current) {
        document.querySelector<HTMLElement>("#main")?.focus();
      }
    }, reducedMotion ? 0 : 240);
  }, [reducedMotion]);

  useEffect(() => {
    const storageKey = "karm-portfolio-intro-seen";
    try {
      if (window.sessionStorage.getItem(storageKey)) return;
    } catch {
      // Session storage is unavailable
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.hidden = false;
    window.requestAnimationFrame(() => {
      overlay.classList.add("is-visible");
      skipRef.current?.focus();
    });
    const timeout = window.setTimeout(dismiss, reducedMotion ? 160 : 720);

    return () => window.clearTimeout(timeout);
  }, [dismiss, reducedMotion]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (overlayRef.current?.hidden) return;
      if (event.key === "Escape") {
        dismiss();
      } else if (event.key === "Tab") {
        event.preventDefault();
        skipRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dismiss]);

  return (
    <div
      aria-label="Portfolio introduction"
      aria-modal="true"
      className="session-preloader fixed inset-0 z-[100] grid place-items-center bg-background"
      hidden
      ref={overlayRef}
      role="dialog"
    >
      <div className="text-center">
        <p className="font-display text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">
          KP<span className="text-accent">.</span>
        </p>
        <p className="mt-4 font-mono text-[0.625rem] tracking-[0.18em] text-muted">
          FLUTTER / .NET
        </p>
        <button
          className="mt-8 min-h-10 rounded-full border border-border px-4 text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          onClick={dismiss}
          ref={skipRef}
          type="button"
        >
          Skip intro
        </button>
      </div>
      <div aria-hidden="true" className="session-preloader__rule" />
    </div>
  );
}

export function ScrollChrome() {
  const [activeZone, setActiveZone] = useState<(typeof zoneIds)[number]>("hero");
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progressElement = progressRef.current;
    const sections = zoneIds.map((zone) => ({
      zone,
      element: document.querySelector<HTMLElement>(
        `[data-scroll-zone="${zone}"]`,
      ),
    }));
    if (sections.some(({ element }) => !element)) return;

    const activeTriggers = sections.map(({ zone, element }) =>
      ScrollTrigger.create({
        trigger: element as HTMLElement,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => setActiveZone(zone),
        onEnterBack: () => setActiveZone(zone),
      }),
    );
    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: () => {
        const contact = document.querySelector<HTMLElement>(
          '[data-scroll-zone="contact"]',
        );
        if (!contact) return "max";
        return Math.max(
          1,
          contact.getBoundingClientRect().bottom +
            window.scrollY -
            window.innerHeight,
        );
      },
      onUpdate: (trigger) => {
        progressElement?.style.setProperty(
          "transform",
          `scaleX(${trigger.progress})`,
        );
      },
    });

    ScrollTrigger.refresh();
    return () => {
      activeTriggers.forEach((trigger) => trigger.kill());
      progressTrigger.kill();
      progressElement?.style.removeProperty("transform");
    };
  }, []);

  const activeNumber = String(zoneNumbers.get(activeZone) ?? 1).padStart(2, "0");

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-white/[0.05]"
      >
        <div
          className="h-full origin-left bg-accent shadow-[0_0_12px_rgba(140,228,209,0.7)]"
          ref={progressRef}
        />
      </div>
      <div
        aria-label={`Section ${activeNumber} of 06`}
        className="pointer-events-none fixed left-4 top-[4.5rem] z-[45] rounded-full border border-border bg-background/80 px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.12em] text-muted backdrop-blur-xl sm:left-6"
        role="status"
      >
        <span className="text-accent">{activeNumber}</span> / 06
      </div>
    </>
  );
}

export function DesktopCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!query.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = -100;
    let y = -100;
    let targetX = x;
    let targetY = y;
    let frame = 0;
    let visible = false;

    const move = (event: globalThis.PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        cursor.classList.add("is-visible");
      }
      const target = event.target;
      if (target instanceof Element && target.closest("a,button,[role=button]")) {
        cursor.classList.add("is-hovering");
      } else {
        cursor.classList.remove("is-hovering");
      }
    };

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(tick);
    };
    const leave = () => {
      visible = false;
      cursor.classList.remove("is-visible", "is-hovering");
    };

    document.documentElement.classList.add("has-desktop-cursor");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", leave);
    frame = window.requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-desktop-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", leave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div aria-hidden="true" className="desktop-cursor" ref={cursorRef} />;
}

export function Magnetic({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.22 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.22 });

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="inline-flex"
      onPointerLeave={reset}
      onPointerMove={onPointerMove}
      style={reducedMotion ? undefined : { x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
