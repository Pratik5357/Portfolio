"use client";

import { type ElementType, useEffect, useRef, useState } from "react";
import {
  computeRevealProgress,
  getRevealMode,
  subscribeScrollReveal,
  type RevealMode,
} from "@/lib/scrollReveal";

type RevealVariant = "item" | "section" | "heading" | "row";

type RevealOnViewProps = {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: ElementType;
};

export function RevealOnView({
  children,
  className = "",
  variant = "item",
  as: Component = "div",
}: RevealOnViewProps) {
  const ref = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<RevealMode>("scroll");

  useEffect(() => {
    setMode(getRevealMode());
  }, []);

  useEffect(() => {
    if (mode !== "scroll") return;

    const node = ref.current;
    if (!node) return;

    const update = () => {
      const progress = computeRevealProgress(
        node.getBoundingClientRect(),
        window.innerHeight,
      );
      node.style.setProperty("--reveal-progress", progress.toFixed(4));
    };

    return subscribeScrollReveal(update);
  }, [mode]);

  const variantClass = {
    item: "motion-reveal--item",
    section: "motion-reveal--section",
    heading: "motion-reveal--heading",
    row: "motion-reveal--row",
  }[variant];

  return (
    <Component
      ref={ref}
      className={[
        "motion-reveal",
        variantClass,
        mode === "scroll" ? "motion-reveal--scroll" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
}
