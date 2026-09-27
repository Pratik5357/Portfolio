"use client";

import { useEffect, useRef, useState } from "react";
import { navSections } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

export function NavDock() {
  const [activeId, setActiveId] = useState<string | null>(navSections[0]?.id ?? null);
  const [mounted, setMounted] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  // Set on click, cleared once that section actually intersects (or after a timeout).
  // While set, the scroll-linked observer can't override the pill with a section
  // the smooth-scroll is only passing through on its way to the click target.
  const pendingIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Mount flag drives the one-time entrance animation — never re-fires.
    setMounted(true);
  }, []);

  const smoothScrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Instant feedback: don't wait for the observer to confirm the destination.
    pendingIdRef.current = id;
    setActiveId(id);
    window.setTimeout(() => {
      if (pendingIdRef.current === id) pendingIdRef.current = null;
    }, 1000);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const sections = navSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const applyActive = (id: string) => {
      if (pendingIdRef.current && pendingIdRef.current !== id) return;
      pendingIdRef.current = null;
      setActiveId(id);
    };

    // Reference-line scrollspy, not intersection-ratio comparison: ratio compares
    // intersecting area against each section's OWN height, so a short section (Stack)
    // reads as "more visible" than a tall one (Projects) the moment it starts entering
    // — Projects would never win and got skipped scrolling down. A single reference
    // line near the top of the viewport is direction- and height-independent: the
    // active section is whichever one's top has most recently crossed it.
    let ticking = false;

    const computeActive = () => {
      // At the very bottom of the page there's no content left below the last
      // section's top to push it past the reference line — the loop below would
      // never "arm" for it. Scroll-to-bottom always means the last section, full stop.
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const lastSection = sections[sections.length - 1];

      if (lastSection && maxScroll > 0 && window.scrollY >= maxScroll - 2) {
        applyActive(lastSection.id);
        ticking = false;
        return;
      }

      const referenceY = window.innerHeight * 0.3;

      let currentId = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= referenceY) {
          currentId = section.id;
        } else {
          break;
        }
      }

      if (currentId) applyActive(currentId);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(computeActive);
      }
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const highlight = highlightRef.current;
    if (!list || !highlight || !activeId) return;

    const positionHighlight = () => {
      const activeLink = list.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`);
      if (!activeLink) return;

      const listRect = list.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      highlight.style.transform = `translateX(${linkRect.left - listRect.left}px)`;
      highlight.style.width = `${linkRect.width}px`;
    };

    positionHighlight();

    window.addEventListener("resize", positionHighlight);
    return () => window.removeEventListener("resize", positionHighlight);
  }, [activeId]);

  return (
    <nav
      aria-label="Page sections"
      className={`motion-dock fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6 ${
        mounted ? "motion-dock--in" : ""
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="motion-dock__pill flex items-center gap-1 rounded-full border border-border bg-background/85 py-1.5 pl-1.5 pr-2 shadow-[0_8px_24px_rgb(0_0_0/0.10)] backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
        <ul ref={listRef} className="relative flex items-center gap-0.5">
          <div
            ref={highlightRef}
            className="motion-dock__highlight absolute inset-y-0 left-0 rounded-full bg-accent/12"
            aria-hidden="true"
          />
          {navSections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id} className="relative">
                <a
                  href={`#${section.id}`}
                  data-nav-id={section.id}
                  onClick={(event) => smoothScrollTo(event, section.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`motion-dock__link relative z-10 flex h-10 items-center whitespace-nowrap rounded-full px-3.5 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-200 ${
                    isActive ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="motion-dock__divider h-5 w-px shrink-0 bg-border" aria-hidden="true" />
        <ThemeToggle compact className="motion-dock__theme" />
      </div>
    </nav>
  );
}
