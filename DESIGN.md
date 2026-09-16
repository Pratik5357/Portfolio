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

### Dark

| Token | Value | Use |
|-------|-------|-----|
| `--background` | `oklch(0.15 0.014 260)` | Page ground |
| `--foreground` | `oklch(0.93 0.006 85)` | Primary text |
| `--muted` | `oklch(0.64 0.012 260)` | Labels, metadata |
| `--border` | `oklch(0.29 0.01 260)` | Rules, dividers |
| `--accent` | `oklch(0.68 0.11 165)` | Links, active nav (lifted for contrast) |

Single accent only. Scroll progress uses a minimal accent gradient only on the progress bar fill.

## Typography

- **Sans / display:** Schibsted Grotesk — headings and body
- **Mono:** JetBrains Mono — section labels, dates, stack tags, metrics

Minimum UI text: 12px (`text-xs`). Body: 14–16px.

## Layout

12-column asymmetric grid. Left sticky nav (desktop), top sticky nav (mobile). Sections separated by hairline borders — no card containers.

## Motion

**Thesis:** Hero is a 1.3s layered sequence (clip + blur + letter-spacing settle). Scroll drives section reveals via CSS `view()` timeline where supported; fallback uses 780ms blur+translate transitions. Architecture flows cascade at 220ms/step. Scroll progress bar + accent rail track position; native scrollbar thumb opacity follows `--scroll-progress`.

| Token | Value |
|-------|-------|
| `--ease-dramatic` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--duration-base` | 780ms |
| `--duration-slow` | 1.35s |

## Browser surfaces

Scrollbar: 12px track with OKLCH teal thumb (`--scrollbar-thumb`), intensifies while scrolling. Text selection uses `--selection-bg`.
