export type RevealMode = "reduced" | "scroll";

export function getRevealMode(): RevealMode {
  if (typeof window === "undefined") return "scroll";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  return "scroll";
}

export function isPageAtBottom() {
  const root = document.documentElement;
  return root.scrollTop + root.clientHeight >= root.scrollHeight - 8;
}

export function computeRevealProgress(rect: DOMRect, viewportHeight: number) {
  if (isPageAtBottom() && rect.top < viewportHeight) return 1;

  const isCompact = viewportHeight < 720 || window.innerWidth < 640;
  const start = viewportHeight * (isCompact ? 0.96 : 0.92);
  const end = viewportHeight * (isCompact ? 0.5 : 0.34);
  const top = rect.top;

  if (top >= start) return 0;
  if (top <= end) return 1;
  return (start - top) / (start - end);
}

const listeners = new Set<() => void>();
let rafId: number | null = null;

function tick() {
  rafId = null;
  listeners.forEach((fn) => fn());
}

function onScroll() {
  if (rafId === null) {
    rafId = requestAnimationFrame(tick);
  }
}

export function subscribeScrollReveal(fn: () => void) {
  listeners.add(fn);

  if (listeners.size === 1) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  fn();

  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  };
}
