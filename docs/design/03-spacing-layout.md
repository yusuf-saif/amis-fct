# Spacing & Layout System

## AMIS FCT Website Rebuild — amisfct.org

**Prepared by:** Design Lead
**Date:** 2026-05-14
**Depends on:** design/01-design-brief.md, design/02-color-typography.md

---

## 1. Base Spacing Unit

**Base unit: 4px**

All spacing values are multiples of 4px. This aligns with:
- The 8pt grid (common industry standard) — all "comfortable" spacings land on 8px multiples
- Pixel-perfect rendering on 160DPI (Tecno/Xiaomi) and 320DPI (modern flagship) displays — 4px is the smallest unit that renders as a sharp line on 1× and 2× DPI screens
- CSS `rem` at 16px base: 4px = 0.25rem, 8px = 0.5rem, 16px = 1rem — all whole-number rem values

---

## 2. Full Spacing Scale

| Token | Value (px) | Value (rem) | Usage |
| --- | --- | --- | --- |
| `--space-0` | 0px | 0rem | Reset / collapse |
| `--space-1` | 4px | 0.25rem | Micro gaps: icon-to-label, badge padding-x |
| `--space-2` | 8px | 0.5rem | Tight spacing: input inner padding-y, tag padding, avatar gap |
| `--space-3` | 12px | 0.75rem | Small component padding: chip, small badge, nav pill padding |
| `--space-4` | 16px | 1rem | Default component padding-x; form field padding; button padding-y on md |
| `--space-5` | 20px | 1.25rem | Comfortable component padding; list item height padding |
| `--space-6` | 24px | 1.5rem | Card padding; modal padding; sidebar group gap |
| `--space-8` | 32px | 2rem | Section inner padding; between form rows; between card and its heading |
| `--space-10` | 40px | 2.5rem | Component-to-component gap on mobile |
| `--space-12` | 48px | 3rem | Section-to-section gap on mobile; large button height |
| `--space-16` | 64px | 4rem | Section padding-y on mobile |
| `--space-20` | 80px | 5rem | Section padding-y on tablet |
| `--space-24` | 96px | 6rem | Hero padding-y on tablet |
| `--space-32` | 128px | 8rem | Section padding-y on desktop |
| `--space-40` | 160px | 10rem | Hero padding-y on desktop |
| `--space-48` | 192px | 12rem | Maximum hero padding / large hero sections |

**Semantic spacing aliases** (map to scale values above):

| Semantic token | Maps to | Usage |
| --- | --- | --- |
| `--space-component-xs` | `--space-2` (8px) | Minimum internal component padding |
| `--space-component-sm` | `--space-3` (12px) | Small component padding |
| `--space-component-md` | `--space-4` (16px) | Default component padding |
| `--space-component-lg` | `--space-6` (24px) | Large component padding |
| `--space-gap-sm` | `--space-3` (12px) | Tight layout gaps between items |
| `--space-gap-md` | `--space-6` (24px) | Standard layout gaps |
| `--space-gap-lg` | `--space-8` (32px) | Wide layout gaps |
| `--space-section-mobile` | `--space-16` (64px) | Vertical section padding on mobile |
| `--space-section-tablet` | `--space-20` (80px) | Vertical section padding on tablet |
| `--space-section-desktop` | `--space-32` (128px) | Vertical section padding on desktop |

---

## 3. Breakpoints

Four breakpoints, defined as mobile-first `min-width` values.

| Name | Min-width | Target device | Columns |
| --- | --- | --- | --- |
| `xs` (base) | 0px | Small phones, 320px+ (iPhone SE, Tecno Spark) | 4 columns |
| `sm` | 480px | Large phones, 480px+ (most Tecno/Xiaomi) | 4 columns |
| `md` | 768px | Tablets, landscape phones, small laptops | 8 columns |
| `lg` | 1024px | Laptops, desktop browsers | 12 columns |
| `xl` | 1280px | Wide desktops, external monitors | 12 columns |

**CSS custom property definitions:**

```css
--bp-sm:  480px;
--bp-md:  768px;
--bp-lg:  1024px;
--bp-xl:  1280px;
```

**Rationale for breakpoint choices:**

- **0px base:** Every rule is written for mobile first. No `max-width` media queries in the main system.
- **480px:** The majority of Tecno Camon and Xiaomi Redmi devices (5.5–6.5 inch, 720×1600) reach 480px logical width at 160DPI. This breakpoint catches the transition from very small phones to standard large-screen phones.
- **768px:** Classic tablet breakpoint; also captures landscape mode on large phones. Navigation hamburger → full nav happens here.
- **1024px:** Full desktop layout begins. Admin dashboard sidebar appears. 12-column grid active. Primary target for admin users.
- **1280px:** Cosmetic expansion only — max-width containers prevent excessive line lengths. No structural layout changes from 1024px.

---

## 4. Grid System

### Public Site Grid

| Breakpoint | Columns | Gutter (column gap) | Margin (page padding) |
| --- | --- | --- | --- |
| xs (0px) | 4 | 16px | 16px |
| sm (480px) | 4 | 16px | 24px |
| md (768px) | 8 | 24px | 32px |
| lg (1024px) | 12 | 32px | 48px |
| xl (1280px) | 12 | 32px | 48px |

**CSS implementation:**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-cols, 4), 1fr);
  gap: var(--grid-gap, 1rem);
  padding-inline: var(--grid-margin, 1rem);
}

@media (min-width: 768px) {
  .grid {
    --grid-cols: 8;
    --grid-gap: 1.5rem;
    --grid-margin: 2rem;
  }
}

@media (min-width: 1024px) {
  .grid {
    --grid-cols: 12;
    --grid-gap: 2rem;
    --grid-margin: 3rem;
  }
}
```

### Column span patterns (public site)

| Element | Mobile (4col) | Tablet (8col) | Desktop (12col) |
| --- | --- | --- | --- |
| Full-width section | 4/4 | 8/8 | 12/12 |
| Reading column (body text) | 4/4 | 6/8 (offset 1) | 8/12 (offset 2) |
| News card | 4/4 | 4/8 | 4/12 |
| School card | 4/4 | 4/8 | 3/12 |
| Event card | 4/4 | 4/8 | 4/12 |
| Gallery thumbnail | 2/4 | 2/8 | 2/12 |
| Sidebar | — | 3/8 | 3/12 |
| Main + sidebar layout | 4+0 | 5+3 | 8+4 |

### Admin Dashboard Grid

Admin uses a fixed sidebar layout, not the fluid public grid.

| Breakpoint | Layout |
| --- | --- |
| xs–sm (0–767px) | Single column, sidebar hidden (hamburger icon) |
| md (768–1023px) | Sidebar collapsed (icon-only, 64px wide) + content |
| lg+ (1024px+) | Sidebar expanded (240px wide) + content area |

**Admin content area columns:** 12-column internal grid within the content area, using 16px gutters and 24px margins.

---

## 5. Container Max-Widths

| Token | Max-width | Usage |
| --- | --- | --- |
| `--container-sm` | 640px | Narrow reading content: blog post body, privacy policy |
| `--container-md` | 768px | Forms (contact, registration), modals |
| `--container-lg` | 1024px | Default page content |
| `--container-xl` | 1280px | Full-width page content (homepage, directory) |
| `--container-admin` | 1440px | Admin dashboard full width |

**Implementation pattern:**

```css
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-inline: auto;
  padding-inline: var(--grid-margin);
}

.container--narrow {
  max-width: var(--container-sm);
}

.container--form {
  max-width: var(--container-md);
}
```

---

## 6. Component-Level Spacing Rules

### Buttons

| Size | Padding Y | Padding X | Min height | Min width | Font size |
| --- | --- | --- | --- | --- | --- |
| sm | 8px | 16px | 36px | 80px | 13px |
| md | 12px | 24px | 44px | 100px | 15px |
| lg | 16px | 32px | 52px | 120px | 16px |

**Touch target rule:** All interactive elements have a minimum touch target of 44×44px (per WCAG 2.5.5). For buttons smaller than 44px tall, extend the clickable area with padding while keeping visual size smaller (using negative margin or `::before` pseudo-element).

### Form Fields

| State | Padding Y | Padding X | Height | Border radius | Border width |
| --- | --- | --- | --- | --- | --- |
| Default | 12px | 16px | 48px | 6px | 1.5px |
| Focus | 12px | 16px | 48px | 6px | 2px |
| Error | 12px | 16px | 48px | 6px | 2px |

Multi-line textarea minimum height: 120px (4 lines at 16px/1.65 line height).

### Cards

| Element | Padding | Border radius | Shadow |
| --- | --- | --- | --- |
| School card | 20px | 12px | elevation-1 |
| News card | 0 (image flush) / 20px body | 12px | elevation-1 |
| Event card | 20px | 12px | elevation-1 |
| Resource row | 12px 16px | 8px | none (inside list) |
| Admin data card | 24px | 8px | elevation-1 |
| Admin stats card | 20px | 8px | elevation-1 |

Gap between cards in a grid: `--space-gap-md` (24px).

### Navigation

| Element | Height | Padding X | Font |
| --- | --- | --- | --- |
| Desktop nav bar | 64px | 48px (page margin) | 15px / 500 |
| Mobile nav bar (sticky) | 56px | 16px | — |
| Mobile nav overlay item | 52px min | 24px | 18px / 500 |
| Admin sidebar item | 44px | 16px | 14px / 500 |
| Admin sidebar section label | 32px | 16px | 11px / 600 |
| Breadcrumb item | 28px | 0 | 13px / 400 |

### Modal / Dialog

| Property | Value |
| --- | --- |
| Max-width | 560px |
| Padding | 32px |
| Border radius | 16px |
| Top position on mobile | 0 (full-screen sheet) |
| Backdrop opacity | 60% black |
| Animation in | slide up 240ms ease-out |
| Animation out | fade down 160ms ease-in |

---

## 7. Border Radius Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | 4px | Tags, badges, small pills |
| `--radius-md` | 6px | Input fields, small buttons |
| `--radius-lg` | 8px | Buttons (default), admin cards, table rows |
| `--radius-xl` | 12px | Public-facing cards (school, news, event) |
| `--radius-2xl` | 16px | Modals, drawers, hero images |
| `--radius-3xl` | 24px | Feature callout cards, newsletter section |
| `--radius-full` | 9999px | Pills, avatar circles, toggle switches, circular buttons |

**Public vs Admin radius distinction:**
- Public site uses `--radius-xl` (12px) and `--radius-2xl` (16px) as dominant card radii — rounder corners feel warmer and more approachable.
- Admin dashboard uses `--radius-lg` (8px) as dominant — slightly crisper, more data-focused, less decorative.

---

## 8. Shadow / Elevation Scale

Shadows are layered and warm-tinted (slight green/amber tint) on the public site. Admin shadows are neutral gray.

### Public Site Shadows

| Token | Value | Usage |
| --- | --- | --- |
| `--shadow-none` | `none` | Flat elements within cards |
| `--shadow-sm` | `0 1px 2px rgba(15, 70, 38, 0.06)` | Subtle hover state lift |
| `--elevation-1` | `0 1px 3px rgba(15, 70, 38, 0.10), 0 1px 2px rgba(15, 70, 38, 0.06)` | Default cards |
| `--elevation-2` | `0 4px 6px rgba(15, 70, 38, 0.07), 0 2px 4px rgba(15, 70, 38, 0.06)` | Hovered cards |
| `--elevation-3` | `0 10px 15px rgba(15, 70, 38, 0.10), 0 4px 6px rgba(15, 70, 38, 0.05)` | Floating elements, dropdowns |
| `--elevation-4` | `0 20px 25px rgba(15, 70, 38, 0.12), 0 8px 10px rgba(15, 70, 38, 0.04)` | Modals, drawers |
| `--shadow-focus` | `0 0 0 3px rgba(23, 138, 67, 0.35)` | Focus ring on interactive elements |
| `--shadow-focus-error` | `0 0 0 3px rgba(220, 38, 38, 0.35)` | Focus ring on errored fields |

### Admin Shadows (neutral)

| Token | Value | Usage |
| --- | --- | --- |
| `--admin-elevation-1` | `0 1px 3px rgba(0, 0, 0, 0.10), 0 1px 2px rgba(0, 0, 0, 0.06)` | Admin cards |
| `--admin-elevation-2` | `0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)` | Admin hover states |
| `--admin-elevation-3` | `0 10px 15px rgba(0, 0, 0, 0.10), 0 4px 6px rgba(0, 0, 0, 0.05)` | Admin dropdowns, popovers |

**Rationale:** The green-tinted shadow on the public site subtly warms the "depth" and reinforces the brand colour even in shadows. On low-contrast backgrounds (parchment), pure black shadows can feel harsh — the green tint is barely perceptible but makes the overall impression softer. Admin shadows use neutral black because data legibility is priority over warmth.

---

## 9. Z-Index Scale

A defined z-index scale prevents stacking context conflicts, which are a common source of UI bugs when overlapping elements (sticky nav, dropdowns, modals, toasts) are combined.

| Token | Value | Usage |
| --- | --- | --- |
| `--z-base` | 0 | Default document flow |
| `--z-raised` | 10 | Raised cards (on hover), sticky table headers |
| `--z-dropdown` | 100 | Dropdown menus, combobox panels |
| `--z-sticky` | 200 | Sticky navigation bar |
| `--z-overlay` | 300 | Mobile menu overlay background |
| `--z-drawer` | 400 | Mobile navigation drawer, admin sidebar on mobile |
| `--z-modal` | 500 | Modal dialogs, full-screen overlays |
| `--z-toast` | 600 | Toast notifications (must appear above everything including modals) |
| `--z-tooltip` | 700 | Tooltips (appear above all other elements) |

**Rule:** Never use arbitrary z-index values in component CSS. Always reference a token. If a new layer is needed, add it to this scale with a named token and usage note.
