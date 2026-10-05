"use client";

import { useEffect } from "react";

/**
 * Case-study detail lives in a collapsed <details>. When an in-page link (e.g.
 * "Case study" in Experience) or the initial URL hash targets a project, open
 * its details before the browser scrolls, so the reader lands on the full story.
 */
function openCaseStudy(id: string) {
  const details = document.getElementById(id)?.querySelector("details");
  if (!details || details.open) return false;
  details.open = true;
  return true;
}

export function CaseStudyAnchors() {
  useEffect(() => {
    const initial = decodeURIComponent(window.location.hash.slice(1));
    if (initial && openCaseStudy(initial)) {
      document.getElementById(initial)?.scrollIntoView({ block: "start" });
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (link) openCaseStudy(decodeURIComponent(link.hash.slice(1)));
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
