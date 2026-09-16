"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import {
  computeRevealProgress,
  getRevealMode,
  subscribeScrollReveal,
  type RevealMode,
} from "@/lib/scrollReveal";

type ArchitectureDiagramProps = {
  steps: string[];
  id: string;
};

export function ArchitectureDiagram({ steps, id }: ArchitectureDiagramProps) {
  const ref = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<RevealMode>("scroll");

  useEffect(() => {
    setMode(getRevealMode());
  }, []);

  useEffect(() => {
    if (mode !== "scroll") return;

    const root = ref.current;
    if (!root) return;

    const stepNodes = Array.from(
      root.querySelectorAll<HTMLElement>(".motion-flow__step"),
    );

    const update = () => {
      const viewportHeight = window.innerHeight;
      stepNodes.forEach((node) => {
        const progress = computeRevealProgress(
          node.getBoundingClientRect(),
          viewportHeight,
        );
        const value = progress.toFixed(4);
        node.style.setProperty("--reveal-progress", value);
        const connector = node.querySelector<HTMLElement>(".motion-flow__connector");
        if (connector) {
          connector.style.setProperty("--reveal-progress", value);
        }
      });
    };

    return subscribeScrollReveal(update);
  }, [mode, steps.length]);

  return (
    <figure
      ref={ref}
      aria-labelledby={`${id}-diagram-title`}
      className={`motion-flow w-full min-w-0 max-w-full xl:max-w-[17.5rem] ${
        mode === "scroll" ? "motion-flow--scroll" : ""
      }`}
    >
      <figcaption id={`${id}-diagram-title`} className="sr-only">
        Architecture: {steps.join(", ")}
      </figcaption>
      <ol className="flex flex-col">
        {steps.map((step, index) => (
          <li
            key={`${id}-${index}`}
            className="motion-flow__step relative"
            style={{ "--step-index": index } as CSSProperties}
          >
            <div className="motion-flow__node border border-foreground/35 px-3.5 py-3 transition-colors duration-200 hover:border-accent/50 hover:bg-accent/[0.03]">
              <p className="font-mono text-xs leading-[1.55] text-pretty text-foreground/90">
                {step}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className="motion-flow__connector mx-auto my-1.5 h-3 w-px bg-foreground/25"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
