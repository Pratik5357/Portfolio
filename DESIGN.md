# Design System

## Color (OKLCH)

Themes use `data-theme="light"` / `data-theme="dark"` on `<html>`. User preference persists in `localStorage`; system default follows `prefers-color-scheme`.

### Light

| Token | Value | Use |
|-------|-------|-----|
| `--background` | `oklch(0.985 0.004 85)` | Page ground |
| `--foreground` | `oklch(0.22 0.012 260)` | Primary text |
| `--muted` | `oklch(0.48 0.012 260)` | Labels, metadata |
| `--border` | `oklch(0.88 0.006 260)` | Rules, dividers |
| `--accent` | `oklch(0.46 0.1 165)` | Links, active nav |
| `--panel` | `oklch(0.972 0.005 85)` | Project panel ground |

### Dark

| Token | Value | Use |
|-------|-------|-----|
| `--background` | `oklch(0.15 0.014 260)` | Page ground |
| `--foreground` | `oklch(0.93 0.006 85)` | Primary text |
| `--muted` | `oklch(0.64 0.012 260)` | Labels, metadata |
| `--border` | `oklch(0.29 0.01 260)` | Rules, dividers |
| `--accent` | `oklch(0.68 0.11 165)` | Links, active nav (lifted for contrast) |
| `--panel` | `oklch(0.18 0.014 260)` | Project panel ground |

Single accent only. Scroll progress uses a minimal accent gradient only on the progress bar fill.

## Typography

- **Sans / display:** Schibsted Grotesk — headings and body
- **Mono:** JetBrains Mono — section labels, dates, stack tags, metrics

Minimum UI text: 12px (`text-xs`). Body: 14–16px.

## Layout

12-column asymmetric grid. Left sticky nav (desktop), top sticky nav (mobile). Sections separated by hairline borders — no card containers, with one exception: Projects uses flat framed panels (1px `--border`, `--panel` ground, no shadow, nothing nested that draws its own box). Public builds are full-width featured panels (content 7/12, architecture 5/12); client work is a 3-up index that becomes a single column while a case study is open, so reading order never reflows. Architecture is a layered component diagram (`ArchitectureDiagram.tsx`, data in `Project.architecture`): vertical mono lane names, dashed lane rules, nodes shaped by kind (store = cylinder, external = dashed, worker = stacked outline, legacy = dashed + struck), orthogonal 1px edges with mono labels, dashed for push/async. The case study's own component is the one accent node.

Accent jobs inside Projects: teal-tinted mono stack tags (`.stack-tag`), filled teal primary CTA and outlined secondary (`.cta`), a teal Live marker. Still a single accent.

## Motion

**Thesis:** Minimal — subtle hovers only, per product brief. Hero is a simple fade/rise (~320–380ms, staggered by ~100ms per element), no clip-path wipe or blur choreography. Scroll drives section reveals via a JS scroll listener computing per-element progress (`src/lib/scrollReveal.ts`), applied as translate-only transforms (no blur) so content stays legible before it's fully in view. Architecture flows cascade similarly, translate-only. Scroll progress bar + accent rail track position; native scrollbar thumb opacity follows `--scroll-progress`.

| Token | Value |
|-------|-------|
| `--ease-dramatic` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--duration-fast` | 320ms |

## Browser surfaces

Scrollbar: 12px track with OKLCH teal thumb (`--scrollbar-thumb`), intensifies while scrolling. Text selection uses `--selection-bg`.

## Component roles (consistency rules)

- **Text colour:** three roles only, `--foreground` (titles), `--copy` (body, verdicts, leads; Tailwind `text-copy`) and `--muted` (metadata). No ad-hoc opacity overrides.
- **Tokens:** technology names use `.stack-tag` (teal-tinted mono) everywhere, hero included. States use `.status-tag` (teal dot + mono caps): Live, In progress.
- **Actions:** page-level actions are `.cta--primary` / `.cta--secondary` (hero, featured projects). In-flow jumps are mono `motion-link` with ↓. Disclosure uses a chevron. Every external link carries ↗ and announces "opens in a new tab".
- **Headings:** h2 section 30px; featured project h4 26px (22px mobile), always below h2; client h4 20px; group h3 is `.label-caps--strong`; case-note labels are `.label-caps`.
- **Focus ring:** solid `--accent` (passes 3:1 in both themes). Touch targets ≥44px, dock included.
