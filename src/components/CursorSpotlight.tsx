"use client";

import { useEffect, useRef } from "react";

/**
 * Purely decorative, ambient glow that trails the cursor — sits behind all page
 * content (z-index: -1) so it only bleeds through whitespace, never obscures
 * anything being read. Gated off for touch (no cursor to follow) and reduced
 * motion, both in JS (skip the listener) and CSS (belt-and-suspenders opacity).
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduced || !fine) return;

    const node = ref.current;
    if (!node) return;

    let raf = 0;

    const onMove = (event: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        raf = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />;
}
