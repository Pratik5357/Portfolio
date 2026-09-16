"use client";

import { navSections } from "@/lib/data";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type ScrollSpyNavProps = {
  variant: "desktop" | "mobile";
};

export function ScrollSpyNav({ variant }: ScrollSpyNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const smoothScrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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

    const rootMargin =
      window.innerWidth < 1024 ? "-12% 0px -55% 0px" : "-20% 0px -60% 0px";

    const updateActive = () => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        const projectsTop = projectsSection.getBoundingClientRect().top;
        if (projectsTop > window.innerHeight * 0.35) {
          setActiveId(null);
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        updateActive();

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 1] },
    );

    const onScroll = () => updateActive();

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const linkClass = (id: string) => {
    const isActive = activeId === id;
    return `motion-nav-link copy-stable relative flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-200 focus-visible:text-accent ${
      isActive ? "text-accent" : "text-muted hover:text-accent"
    }`;
  };

  if (variant === "mobile") {
    return (
      <nav
        aria-label="Page sections"
        className="sticky top-0 z-10 -mx-4 flex items-center gap-2 border-b border-border bg-background/95 px-4 pt-[max(0px,env(safe-area-inset-top))] backdrop-blur-sm supports-[backdrop-filter]:bg-background/80 sm:-mx-8 sm:gap-3 sm:px-8 lg:hidden"
      >
        <ul className="flex min-w-0 flex-1 gap-0.5 overflow-x-auto overscroll-x-contain pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navSections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id} className="relative shrink-0">
                <a
                  href={`#${section.id}`}
                  className={`${linkClass(section.id)} whitespace-nowrap px-3`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => smoothScrollTo(e, section.id)}
                >
                  {section.label}
                  <span
                    className={`motion-nav-indicator motion-nav-indicator--horizontal absolute inset-x-3 bottom-0 h-px origin-left bg-accent ${
                      isActive ? "motion-nav-indicator--active" : ""
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>
        <ThemeToggle className="shrink-0 px-2.5" />
      </nav>
    );
  }

  return (
    <nav aria-label="Page sections" className="sticky top-10">
      <ul className="flex flex-col gap-1">
        {navSections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`${linkClass(section.id)} py-1 pl-4`}
                aria-current={isActive ? "location" : undefined}
                onClick={(e) => smoothScrollTo(e, section.id)}
              >
                <span
                  className={`motion-nav-indicator absolute top-2 bottom-2 left-0 w-px origin-top bg-accent ${
                    isActive ? "motion-nav-indicator--active" : ""
                  }`}
                  aria-hidden="true"
                />
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
