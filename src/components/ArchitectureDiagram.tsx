"use client";

import { Fragment, useLayoutEffect, useRef, useState } from "react";
import type { ArchEdge, ArchNode, Architecture } from "@/lib/data";

type ArchitectureDiagramProps = {
  architecture: Architecture;
  id: string;
};

type Point = { x: number; y: number };
type RoutedEdge = {
  key: string;
  d: string;
  label?: string;
  labelAt: Point;
  async: boolean;
};

const nodeKindClass: Record<ArchNode["kind"], string> = {
  client: "arch-node",
  service: "arch-node",
  worker: "arch-node arch-node--worker",
  store: "arch-node arch-node--store",
  external: "arch-node arch-node--external",
  legacy: "arch-node arch-node--external arch-node--legacy",
};

function describe(architecture: Architecture) {
  const names = new Map(
    architecture.tiers.flatMap((tier) => tier.nodes.map((node) => [node.id, node.label] as const)),
  );
  return architecture.edges
    .map((edge) => `${names.get(edge.from)} to ${names.get(edge.to)}${edge.label ? ` (${edge.label})` : ""}`)
    .join("; ");
}

/**
 * Orthogonal routing from measured node boxes. Edges between tiers leave the
 * bottom (or top) edge and enter the opposite edge of the target, elbowing in the
 * gap; anchors on a shared side spread out so parallel edges never overlap, and
 * edges sharing a gap each get their own horizontal lane. Edges inside one tier
 * run straight across the column gap.
 */
function route(
  edges: ArchEdge[],
  tierOf: Map<string, number>,
  boxes: Map<string, DOMRect>,
  origin: DOMRect,
): RoutedEdge[] {
  const rel = (id: string) => {
    const r = boxes.get(id)!;
    const left = r.left - origin.left;
    const top = r.top - origin.top;
    return { left, top, right: left + r.width, bottom: top + r.height, cx: left + r.width / 2, cy: top + r.height / 2, width: r.width };
  };

  type Side = "top" | "bottom";
  const sides = new Map<string, { edge: number; otherX: number }[]>();
  const sideKey = (node: string, side: Side) => `${node}:${side}`;
  const gapLanes = new Map<number, number[]>();

  edges.forEach((edge, index) => {
    const a = tierOf.get(edge.from)!;
    const b = tierOf.get(edge.to)!;
    if (a === b) return;
    const down = b > a;
    const claim = (node: string, side: Side, other: string) => {
      const list = sides.get(sideKey(node, side)) ?? [];
      list.push({ edge: index, otherX: rel(other).cx });
      sides.set(sideKey(node, side), list);
    };
    claim(edge.from, down ? "bottom" : "top", edge.to);
    claim(edge.to, down ? "top" : "bottom", edge.from);
    const gap = Math.min(a, b);
    gapLanes.set(gap, [...(gapLanes.get(gap) ?? []), index]);
  });

  const anchorX = (node: string, side: Side, edge: number) => {
    const box = rel(node);
    const list = [...(sides.get(sideKey(node, side)) ?? [])].sort((p, q) => p.otherX - q.otherX);
    if (list.length < 2) return box.cx;
    const spread = Math.min(box.width * 0.5, 24 * (list.length - 1));
    const slot = list.findIndex((item) => item.edge === edge);
    return box.cx - spread / 2 + (spread * slot) / (list.length - 1);
  };

  return edges.map((edge, index) => {
    const a = tierOf.get(edge.from)!;
    const b = tierOf.get(edge.to)!;
    const from = rel(edge.from);
    const to = rel(edge.to);
    const key = `${edge.from}-${edge.to}`;
    const async = Boolean(edge.async);

    if (a === b) {
      const rightward = to.cx > from.cx;
      const x1 = rightward ? from.right : from.left;
      const x2 = rightward ? to.left : to.right;
      const y = from.cy;
      return { key, d: `M ${x1} ${y} H ${x2}`, label: edge.label, labelAt: { x: (x1 + x2) / 2, y: y - 11 }, async };
    }

    const down = b > a;
    const fromSide: Side = down ? "bottom" : "top";
    const toSide: Side = down ? "top" : "bottom";
    let sx = anchorX(edge.from, fromSide, index);
    let tx = anchorX(edge.to, toSide, index);

    // An end that owns its side alone is free to slide toward the other end, so
    // edges drop straight wherever the two boxes overlap instead of jogging.
    const inset = 16;
    const clamp = (x: number, box: { left: number; right: number }) =>
      Math.min(Math.max(x, box.left + inset), box.right - inset);
    const fromAlone = (sides.get(sideKey(edge.from, fromSide))?.length ?? 0) < 2;
    const toAlone = (sides.get(sideKey(edge.to, toSide))?.length ?? 0) < 2;
    const overlapLeft = Math.max(from.left, to.left) + inset;
    const overlapRight = Math.min(from.right, to.right) - inset;
    if (fromAlone && toAlone && overlapLeft <= overlapRight) {
      sx = tx = (overlapLeft + overlapRight) / 2;
    } else if (toAlone) {
      tx = clamp(sx, to);
    } else if (fromAlone) {
      sx = clamp(tx, from);
    }
    // A jog of a few pixels reads as a drawing error; make it a deliberate elbow.
    if (Math.abs(tx - sx) > 0.5 && Math.abs(tx - sx) < 24) {
      if (toAlone) tx = to.cx;
      else if (fromAlone) sx = from.cx;
    }
    const sy = down ? from.bottom : from.top;
    const ty = down ? to.top : to.bottom;
    const lanes = gapLanes.get(Math.min(a, b))!;
    const lane = lanes.indexOf(index);
    const gapTop = Math.min(sy, ty);
    const gapBottom = Math.max(sy, ty);
    const my = gapTop + ((gapBottom - gapTop) * (lane + 1)) / (lanes.length + 1);
    const d = Math.abs(tx - sx) < 2 ? `M ${sx} ${sy} V ${ty}` : `M ${sx} ${sy} V ${my} H ${tx} V ${ty}`;
    const labelAt = Math.abs(tx - sx) > 64 ? { x: (sx + tx) / 2, y: my } : { x: tx, y: my };
    return { key, d, label: edge.label, labelAt, async };
  });
}

export function ArchitectureDiagram({ architecture, id }: ArchitectureDiagramProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [routed, setRouted] = useState<RoutedEdge[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tierOf = new Map<string, number>();
    architecture.tiers.forEach((tier, index) => tier.nodes.forEach((node) => tierOf.set(node.id, index)));

    const measure = () => {
      const origin = root.getBoundingClientRect();
      if (origin.width === 0) return;
      const boxes = new Map<string, DOMRect>();
      root.querySelectorAll<HTMLElement>("[data-arch-node]").forEach((el) => {
        boxes.set(el.dataset.archNode!, el.getBoundingClientRect());
      });
      setSize({ width: origin.width, height: origin.height });
      setRouted(route(architecture.edges, tierOf, boxes, origin));
    };

    // Measured, not rendered on the server: a <details> opening or a panel
    // resizing re-routes through the observer.
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [architecture]);

  const flowTiers = new Set(
    architecture.edges.flatMap((edge) => {
      const tier = architecture.tiers.findIndex((t) => t.nodes.some((n) => n.id === edge.from));
      return architecture.tiers[tier]?.nodes.some((n) => n.id === edge.to) ? [tier] : [];
    }),
  );
  const markerId = `${id}-arrow`;

  return (
    <figure aria-labelledby={`${id}-diagram-title`} className="w-full min-w-0">
      <figcaption id={`${id}-diagram-title`} className="sr-only">
        Architecture: {describe(architecture)}
      </figcaption>
      <div ref={rootRef} className="arch" aria-hidden="true">
        {architecture.tiers.map((tier, tierIndex) => (
          <Fragment key={tier.name}>
            <div className="arch-lane">
              <span className="arch-lane__name">{tier.name}</span>
              <div
                className={`arch-lane__nodes${flowTiers.has(tierIndex) ? " arch-lane__nodes--flow" : ""}`}
                style={{ gridTemplateColumns: `repeat(${tier.nodes.length}, minmax(0, 1fr))` }}
              >
                {tier.nodes.map((node) => (
                  <div
                    key={node.id}
                    data-arch-node={node.id}
                    className={[
                      nodeKindClass[node.kind],
                      node.core ? "arch-node--core" : "",
                      tier.nodes.length === 1 ? "arch-node--solo" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="arch-node__label">{node.label}</span>
                    {node.detail && <span className="arch-node__detail">{node.detail}</span>}
                  </div>
                ))}
              </div>
            </div>
            {tierIndex < architecture.tiers.length - 1 && <div className="arch-gap" />}
          </Fragment>
        ))}

        {size.width > 0 && (
          <svg
            className="arch-edges"
            width={size.width}
            height={size.height}
            viewBox={`0 0 ${size.width} ${size.height}`}
          >
            <defs>
              <marker
                id={markerId}
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0.5 L 7 4 L 0 7.5 z" className="arch-edges__head" />
              </marker>
            </defs>
            {routed.map((edge) => (
              <path
                key={edge.key}
                d={edge.d}
                className={`arch-edges__line${edge.async ? " arch-edges__line--async" : ""}`}
                markerEnd={`url(#${markerId})`}
              />
            ))}
          </svg>
        )}

        {routed.map((edge) =>
          edge.label ? (
            <span
              key={`${edge.key}-label`}
              className="arch-edge-label"
              style={{ left: edge.labelAt.x, top: edge.labelAt.y }}
            >
              {edge.label}
            </span>
          ) : null,
        )}
      </div>
    </figure>
  );
}
