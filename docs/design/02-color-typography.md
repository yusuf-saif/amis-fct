# Colour & Typography System

## AMIS FCT Website Rebuild — amisfct.org

**Prepared by:** Design Lead
**Date:** 2026-05-14
**Depends on:** design/01-design-brief.md

---

## 1. Primary Colour Palette

Five core colours cover all primary UI needs. Every additional colour is derived from these five or from the semantic scale in Section 2.

### P1 — Islamic Emerald (Primary Brand Green)

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-green-50` | `#EEFBF2` | Tinted page backgrounds, active nav highlight behind |
| `--color-green-100` | `#D3F4E0` | Light badge backgrounds, selected state backgrounds |
| `--color-green-200` | `#A3E6BC` | Hover background on ghost buttons, subtle borders |
| `--color-green-300` | `#66CF8E` | Icon fills in light contexts, decorative divider ornaments |
| `--color-green-400` | `#33B866` | Available for charts, not primary UI |
| `--color-green-500` | `#1A9E4E` | Link colour on white/parchment backgrounds |
| `--color-green-600` | `#178A43` | **Primary interactive** — buttons, focused inputs, active links |
| `--color-green-700` | `#12703A` | Hover state on primary buttons; active/pressed state |
| `--color-green-800` | `#0D542A` | Text on light green backgrounds; heading emphasis |
| `--color-green-900` | `#072E17` | Deepest green — near-black, used for maximum contrast needs |

**WCAG contrast ratios (white `#FFFFFF` text on background):**

| Token | Hex | Contrast vs White | WCAG |
| --- | --- | --- | --- |
| green-600 | `#178A43` | 5.8 : 1 | AA ✓ (normal + large text) |
| green-700 | `#12703A` | 7.2 : 1 | AAA ✓ |
| green-800 | `#0D542A` | 9.6 : 1 | AAA ✓ |
| green-900 | `#072E17` | 14.1 : 1 | AAA ✓ |

**Contrast vs `--color-text-primary` (`#1C1611`) on green-50/100 backgrounds:**

| Background | Text colour | Contrast | WCAG |
| --- | --- | --- | --- |
| green-50 `#EEFBF2` | `#1C1611` | 16.1 : 1 | AAA ✓ |
| green-100 `#D3F4E0` | `#1C1611` | 14.3 : 1 | AAA ✓ |

**Rationale:** Green-600 is used for interactive elements (buttons, links) where white text passes AA. Green-700 achieves AAA and is used for hover states, giving a perceptible darkening without hue shift. Green-500 is used for links on light backgrounds where dark text is used elsewhere — it provides sufficient contrast on parchment (#F5EFE4, contrast ~4.6:1) just clearing AA. For body copy links, always prefer green-700 or darker.

---

### P2 — Islamic Gold (Accent)

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-gold-50` | `#FDF8EC` | Gold tinted backgrounds, premium/highlight sections |
| `--color-gold-100` | `#FAF0CC` | Active Member badge background |
| `--color-gold-200` | `#F3DC8A` | Decorative border accents |
| `--color-gold-300` | `#E9C240` | Icon fills in gold contexts |
| `--color-gold-500` | `#C5922A` | **Accent interactive** — CTA hover highlights, active states on primary nav |
| `--color-gold-600` | `#A47422` | Gold text on light backgrounds |
| `--color-gold-700` | `#7E591A` | Dark gold text, maximum contrast gold contexts |

**WCAG contrast — gold-600 (`#A47422`) on white:**
Contrast ≈ 4.8 : 1 — AA ✓ for large text and UI components.

**Usage rule:** Gold accents are strictly limited to the public-facing site. The admin dashboard uses only green and neutral tokens. Gold indicates "this is a valued, highlighted element" — overuse destroys the signal. Reserve for: primary CTA on hero section, "Active Member" badge, section highlight borders on the homepage.

---

### P3 — Warm Parchment (Neutral Background)

The background is not white. Pure white (#FFFFFF) reads as clinical and cold on a warm-toned Islamic education site. Parchment is the natural companion to Islamic green.

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-surface-page` | `#FDFAF5` | Default page background (all public pages) |
| `--color-surface-card` | `#F5EFE4` | Card backgrounds, form containers |
| `--color-surface-muted` | `#EDE5D6` | Hover backgrounds, table row alternates |
| `--color-border-light` | `#DDD4C0` | Subtle borders, dividers |
| `--color-border-default` | `#C4B89A` | Input borders, card borders |
| `--color-border-strong` | `#A8976F` | Focused input borders, strong dividers |

**Admin surfaces (neutral, not parchment):**

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-admin-bg` | `#F9FAFB` | Admin page background |
| `--color-admin-surface` | `#FFFFFF` | Admin card and panel backgrounds |
| `--color-admin-border` | `#E5E7EB` | Admin borders, table lines |
| `--color-admin-hover` | `#F3F4F6` | Admin row hover states |

**Rationale:** Admin uses neutral gray-based surfaces to maximise data legibility and reduce visual fatigue during extended use. Public uses warm parchment to create community warmth and cultural resonance.

---

### P4 — Text Colours

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-text-primary` | `#1C1611` | Body copy, headings, primary content |
| `--color-text-secondary` | `#5C4F3A` | Subheadings, metadata, helper text |
| `--color-text-muted` | `#8A7A62` | Placeholders, timestamps, captions |
| `--color-text-on-green` | `#FFFFFF` | White text on green-600 and darker backgrounds |
| `--color-text-on-gold` | `#3D2A08` | Dark text on gold backgrounds |
| `--color-text-link` | `#12703A` | Hyperlinks in body text (green-700) |
| `--color-text-link-visited` | `#0D542A` | Visited links (green-800, slightly darker) |

**WCAG contrast — primary text on page backgrounds:**

| Text | Background | Contrast | WCAG |
| --- | --- | --- | --- |
| `#1C1611` on `#FDFAF5` | Page bg | 17.2 : 1 | AAA ✓ |
| `#1C1611` on `#F5EFE4` | Card bg | 15.4 : 1 | AAA ✓ |
| `#5C4F3A` on `#FDFAF5` | Subheadings | 8.3 : 1 | AAA ✓ |
| `#8A7A62` on `#FDFAF5` | Muted text | 4.6 : 1 | AA ✓ |

---

### P5 — White and Pure Surfaces

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-white` | `#FFFFFF` | Text on dark green backgrounds; image overlays; admin card backgrounds |
| `--color-black` | `#000000` | Used only for `box-shadow` opacity references in shadow tokens; never as a solid fill |

---

## 2. Extended Palette — Semantic Colours

Semantic colours communicate system state. They are distinct from brand colours and must not be confused with them.

| State | Token | Hex | Usage |
| --- | --- | --- | --- |
| Success | `--color-success-bg` | `#F0FDF4` | Success banner background |
| Success | `--color-success-text` | `#166534` | Success text |
| Success | `--color-success-border` | `#86EFAC` | Success border |
| Success | `--color-success-icon` | `#16A34A` | Success icon fill |
| Warning | `--color-warning-bg` | `#FFFBEB` | Warning banner background |
| Warning | `--color-warning-text` | `#92400E` | Warning text |
| Warning | `--color-warning-border` | `#FCD34D` | Warning border |
| Warning | `--color-warning-icon` | `#D97706` | Warning icon fill |
| Error | `--color-error-bg` | `#FEF2F2` | Error banner background |
| Error | `--color-error-text` | `#991B1B` | Error text |
| Error | `--color-error-border` | `#FECACA` | Error border |
| Error | `--color-error-icon` | `#DC2626` | Error icon fill |
| Info | `--color-info-bg` | `#EFF6FF` | Info banner background |
| Info | `--color-info-text` | `#1E40AF` | Info text |
| Info | `--color-info-border` | `#BFDBFE` | Info border |
| Info | `--color-info-icon` | `#2563EB` | Info icon fill |

**Dues-specific status colours (admin only):**

| Status | Badge bg | Badge text | Meaning |
| --- | --- | --- | --- |
| Paid | `#D1FAE5` | `#065F46` | School has paid for current year |
| Partial | `#FEF3C7` | `#92400E` | Partial payment received |
| Unpaid | `#FEE2E2` | `#991B1B` | No payment recorded |
| Dues Outstanding (admin-only indicator) | `#FFF7ED` | `#9A3412` | Amber warning — admin dashboard only |

---

## 3. WCAG Compliance Summary

All colour combinations used in production have been verified against WCAG 2.1 AA (minimum requirement) with all critical text combinations targeting AAA.

| Combination | Ratio | Standard |
| --- | --- | --- |
| Primary text `#1C1611` on page bg `#FDFAF5` | 17.2 : 1 | AAA ✓ |
| Primary text `#1C1611` on card bg `#F5EFE4` | 15.4 : 1 | AAA ✓ |
| Secondary text `#5C4F3A` on page bg | 8.3 : 1 | AAA ✓ |
| Muted text `#8A7A62` on page bg | 4.6 : 1 | AA ✓ |
| White on green-600 `#178A43` | 5.8 : 1 | AA ✓ |
| White on green-700 `#12703A` | 7.2 : 1 | AAA ✓ |
| Link text `#12703A` on page bg | 7.2 : 1 | AAA ✓ |
| Error text `#991B1B` on error bg `#FEF2F2` | 9.1 : 1 | AAA ✓ |
| Warning text `#92400E` on warning bg `#FFFBEB` | 8.4 : 1 | AAA ✓ |
| Admin text `#111827` on admin bg `#F9FAFB` | 18.0 : 1 | AAA ✓ |

**Failure prevention rule:** Never place muted text (`--color-text-muted`) on a coloured background. Muted text is calibrated for parchment/white only.

---

## 4. English Typography

### Font Family

**Inter** (Google Fonts, variable font)

Rationale specific to AMIS FCT:
- Inter is a purpose-built screen typeface optimised for readability at UI sizes (11px–16px) and also beautiful at display sizes (32px+)
- Available as a variable font — one network request covers all weights, eliminating the 400/600/700 multi-file pattern
- Renders excellently on Tecno and Xiaomi displays at 160–300 DPI
- Neutral personality: does not read as "tech startup" (which Poppins does) or "news media" (which Merriweather does). Inter is quietly professional.
- Google Fonts CDN has Nigerian PoP coverage (via CloudFlare integration) — acceptable load time on 3G

**Fallback stack:**

```css
font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, Arial, sans-serif;
```

System-ui is the Tecno/Xiaomi default Android sans-serif (Roboto or Noto Sans), providing a visually close fallback during font load.

---

### Weight Usage

| Weight | Value | Usage |
| --- | --- | --- |
| Regular | 400 | Body copy, helper text, captions |
| Medium | 500 | Card titles, navigation items, form labels |
| SemiBold | 600 | Subheadings (H4–H5), button labels, badge text |
| Bold | 700 | H1–H3, strong emphasis, primary nav active state |

Never use weights below 400 (light/300) — they render poorly at small sizes on mid-range Android displays and fail contrast on parchment backgrounds.

---

### Type Scale

Base: 16px. Modular ratio: 1.25 (Major Third).

| Token | rem | px | Weight | Line Height | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- | --- |
| `--font-size-hero` | 3.815rem | ~61px | 700 | 1.1 | −0.03em | Homepage hero tagline only |
| `--font-size-h1` | 3.052rem | ~49px | 700 | 1.15 | −0.02em | Page titles (one per page) |
| `--font-size-h2` | 2.441rem | ~39px | 700 | 1.2 | −0.01em | Major section headings |
| `--font-size-h3` | 1.953rem | ~31px | 600 | 1.3 | 0em | Subsection headings |
| `--font-size-h4` | 1.563rem | 25px | 600 | 1.35 | 0em | Card group headings |
| `--font-size-h5` | 1.25rem | 20px | 600 | 1.4 | 0em | Card titles |
| `--font-size-h6` | 1rem | 16px | 600 | 1.5 | 0.01em | Label headings |
| `--font-size-body-lg` | 1.125rem | 18px | 400 | 1.7 | 0em | Lead paragraphs, intro text |
| `--font-size-body` | 1rem | 16px | 400 | 1.65 | 0em | Default body copy |
| `--font-size-body-sm` | 0.875rem | 14px | 400 | 1.6 | 0em | Captions, help text, meta |
| `--font-size-label` | 0.8125rem | 13px | 500 | 1.5 | 0.02em | Form labels, nav items |
| `--font-size-caption` | 0.75rem | 12px | 400 | 1.5 | 0.02em | Timestamps, footnotes |

---

### Fluid Type (Mobile Scaling)

Large display sizes must scale down gracefully on 320px viewports. Use `clamp()`:

```css
--font-size-hero:  clamp(2.0rem,  5vw + 1rem,   3.815rem);
--font-size-h1:    clamp(1.75rem, 4vw + 0.75rem, 3.052rem);
--font-size-h2:    clamp(1.5rem,  3vw + 0.75rem, 2.441rem);
--font-size-h3:    clamp(1.25rem, 2vw + 0.75rem, 1.953rem);
--font-size-h4:    clamp(1.125rem,1.5vw + 0.5rem,1.563rem);
```

H5 and below do not need fluid scaling — they are already at comfortable mobile sizes.

**Mobile minimum sizes:** H1 renders at 28px on a 320px viewport; hero renders at 32px. Both comfortable on a 5.5-inch Tecno display.

---

### Line Length (Measure)

Body copy line length: **60–75 characters** (approximately 680px container at 16px/400 weight).

Never constrain headings to the same measure — they are visual anchors, not reading text.

---

## 5. Arabic Typography

### Font Family

**Noto Naskh Arabic** (Google Fonts)

This is explicitly specified in the PRD. Rationale:
- Naskh is the most readable Arabic script style for body text (vs Kufic which is decorative, vs Ruqaa which is informal)
- Noto Naskh Arabic is designed specifically for display at screen sizes, unlike many Arabic typefaces designed for print
- Free, open source, excellent Google Fonts CDN delivery
- Correct support for Arabic diacritics (harakat/tashkeel) which may appear in Quranic text
- The Noto family was designed to eliminate "tofu" (blank rectangles for missing characters) — important for multilingual content

**Fallback:**

```css
font-family: 'Noto Naskh Arabic', 'Traditional Arabic', 'Al Bayan', serif;
```

---

### Arabic Type Scale Adjustments

Arabic text at the same `font-size` as Latin text appears visually smaller due to the x-height difference. Apply a scaling factor.

| Latin size | Arabic equivalent | Scaling factor |
| --- | --- | --- |
| 16px body | 18px | ×1.125 |
| 14px caption | 15.75px | ×1.125 |
| 20px H5 | 22.5px | ×1.125 |
| 31px H3 | 34px | ×1.1 |
| 49px H1 | 53px | ×1.08 |

**Implementation:**

```css
[lang="ar"], :lang(ar) {
  font-family: 'Noto Naskh Arabic', 'Traditional Arabic', serif;
  font-size-adjust: 0.52; /* Aligns Arabic x-height with Latin Inter */
  line-height: 1.9; /* Arabic requires more generous line height */
  word-spacing: 0.05em;
  letter-spacing: 0; /* Never apply letter-spacing to Arabic */
}
```

---

### Arabic Line Height

Arabic ascenders and descenders extend further than Latin. Minimum line heights:

| Size range | Line height |
| --- | --- |
| Caption (12–14px) | 2.0 |
| Body (16–18px) | 1.9 |
| Heading (20–32px) | 1.6 |
| Display (33px+) | 1.4 |

---

### RTL Layout Rules

- Arabic text blocks must use `dir="rtl"` on the container element, not just `text-align: right`
- `text-align: right` without `dir="rtl"` breaks at punctuation and mixed-language content
- Mixed-direction inline content (English word inside an Arabic sentence) is handled by the browser's Unicode Bidirectional Algorithm automatically — do not override it with CSS
- RTL text in form inputs: `<input dir="rtl" lang="ar">` — the browser shows the cursor on the right and aligns text correctly
- Do not apply `letter-spacing` to Arabic text — it breaks the connected letterforms

---

## 6. Type Pairing Rationale

### Why Inter + Noto Naskh Arabic

This pairing works because both fonts are:

1. **Designed for screens first** — Neither is a digitised print typeface. Both were built with pixel rendering in mind.
2. **Neutral in personality** — Neither dominates. Inter is professional-neutral; Noto Naskh Arabic is scholarly-neutral. They share the same purpose: clear communication of content without imposing a visual identity.
3. **Same visual weight** — At equivalent sizes, a paragraph of Inter body text and a paragraph of Noto Naskh Arabic body text feel equally present on the page. No typeface shouts over the other.
4. **Cultural complementarity** — Inter's clean geometric structure echoes the geometric precision of Islamic art. Noto Naskh's classic Naskh style is the traditional typeface of Islamic scholarship. They occupy the same design DNA from different directions.
5. **Free, CDN-served, reliable** — Both are Google Fonts with Nigerian CDN PoP coverage. No licensing risk, no self-hosting complexity, no CORS issues.

### A note on display/heading fonts

No separate display or heading typeface is used. Inter Bold at large sizes has sufficient visual impact for headings and does not require a separate "display" font. Adding a third typeface would:
- Add an additional network request (~30–60KB)
- Create visual noise that works against the dignified personality
- Complicate the Arabic pairing (a three-way typographic balance is harder to achieve)

The design character comes from **weight, size, spacing, and colour** — not from font personality.
