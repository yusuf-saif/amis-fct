# Handoff Specification

## AMIS FCT Website Rebuild — amisfct.org

**Prepared by:** Design Lead
**Date:** 2026-05-14
**Depends on:** design/01 through design/05

---

## 1. CSS Custom Properties — Full Token Sheet

Paste this into a single `tokens.css` file imported before all other stylesheets.

```css
/* ============================================================
   AMIS FCT DESIGN TOKENS
   Source of truth for all visual decisions.
   Never use raw values in component CSS — always reference a token.
   ============================================================ */

:root {

  /* ----------------------------------------------------------
     COLOUR — Islamic Emerald (Primary)
     ---------------------------------------------------------- */
  --color-green-50:  #EEFBF2;
  --color-green-100: #D4F4DF;
  --color-green-200: #A8E9BE;
  --color-green-300: #6FD898;
  --color-green-400: #3DBF73;
  --color-green-500: #22A456;
  --color-green-600: #178A43;  /* Primary interactive — AA on white, AAA on parchment */
  --color-green-700: #116832;
  --color-green-800: #0C4E25;
  --color-green-900: #072E17;

  /* ----------------------------------------------------------
     COLOUR — Islamic Gold (Accent)
     ---------------------------------------------------------- */
  --color-gold-50:  #FDF8EC;
  --color-gold-100: #FAF0D2;
  --color-gold-200: #F3DC9C;
  --color-gold-300: #ECC861;
  --color-gold-400: #E2B02A;
  --color-gold-500: #CA9415;
  --color-gold-600: #A87510;  /* Use for text/icons only — AA for large text on white */
  --color-gold-700: #7E591A;

  /* ----------------------------------------------------------
     COLOUR — Warm Parchment (Surfaces)
     ---------------------------------------------------------- */
  --color-surface-page:  #FDFAF5;  /* Page background */
  --color-surface-card:  #F5EFE4;  /* Card backgrounds on page */
  --color-surface-muted: #EDE5D6;  /* Muted / secondary card, code blocks */
  --color-surface-line:  #DDD3BF;  /* Dividers, input borders at rest */

  /* Admin surfaces — neutral gray (no warmth) */
  --color-admin-surface-page:    #F8F9FA;
  --color-admin-surface-card:    #FFFFFF;
  --color-admin-surface-sidebar: #1C2536;
  --color-admin-surface-line:    #E2E8F0;

  /* ----------------------------------------------------------
     COLOUR — Text
     ---------------------------------------------------------- */
  --color-text-primary:   #1C1611;  /* 17.2:1 on page bg — AAA */
  --color-text-secondary: #5C4F3A;  /* 8.3:1 on page bg — AAA */
  --color-text-muted:     #8A7A62;  /* 4.6:1 on page bg — AA */
  --color-text-disabled:  #B5A898;  /* Decorative only — not for meaningful text */
  --color-text-inverse:   #FDFAF5;  /* On dark green backgrounds */
  --color-text-link:      #178A43;  /* = green-600; underline required */
  --color-text-link-hover:#0C4E25;  /* = green-800 */

  /* Admin text (on neutral backgrounds) */
  --color-admin-text-primary:   #0F172A;
  --color-admin-text-secondary: #475569;
  --color-admin-text-muted:     #94A3B8;
  --color-admin-text-inverse:   #F8FAFC;  /* On sidebar dark bg */

  /* ----------------------------------------------------------
     COLOUR — Semantic (State)
     ---------------------------------------------------------- */
  --color-success-bg:   #F0FDF4;
  --color-success-text: #166534;
  --color-success-border:#BBF7D0;
  --color-success-icon: #22C55E;

  --color-warning-bg:   #FFFBEB;
  --color-warning-text: #92400E;
  --color-warning-border:#FDE68A;
  --color-warning-icon: #F59E0B;

  --color-error-bg:     #FEF2F2;
  --color-error-text:   #991B1B;
  --color-error-border: #FECACA;
  --color-error-icon:   #EF4444;

  --color-info-bg:      #EFF6FF;
  --color-info-text:    #1E40AF;
  --color-info-border:  #BFDBFE;
  --color-info-icon:    #3B82F6;

  /* ----------------------------------------------------------
     COLOUR — Dues Status Badges
     ---------------------------------------------------------- */
  --color-dues-paid-bg:     var(--color-green-100);
  --color-dues-paid-text:   #166534;
  --color-dues-partial-bg:  #FEF9C3;
  --color-dues-partial-text:#854D0E;
  --color-dues-unpaid-bg:   var(--color-error-bg);
  --color-dues-unpaid-text: var(--color-error-text);
  --color-dues-admin-bg:    #FFFBEB;   /* Amber — admin dashboard only */
  --color-dues-admin-text:  #92400E;

  /* ----------------------------------------------------------
     TYPOGRAPHY — Scale
     ---------------------------------------------------------- */
  --font-family-sans: 'Inter', 'Segoe UI', system-ui, -apple-system, Arial, sans-serif;
  --font-family-arabic: 'Noto Naskh Arabic', 'Traditional Arabic', serif;

  /* Static fallbacks (used when fluid clamp not supported) */
  --font-size-hero: 3.815rem;   /* 61px */
  --font-size-h1:   3.052rem;   /* 49px */
  --font-size-h2:   2.441rem;   /* 39px */
  --font-size-h3:   1.953rem;   /* 31px */
  --font-size-h4:   1.563rem;   /* 25px */
  --font-size-h5:   1.25rem;    /* 20px */
  --font-size-lead: 1.125rem;   /* 18px */
  --font-size-body: 1rem;       /* 16px */
  --font-size-sm:   0.875rem;   /* 14px */
  --font-size-xs:   0.8125rem;  /* 13px */
  --font-size-caption: 0.75rem; /* 12px */

  /* Fluid type (preferred — shrinks cleanly on small screens) */
  --font-size-hero-fluid: clamp(2.25rem, 5vw + 1rem, 3.815rem);
  --font-size-h1-fluid:   clamp(1.875rem, 4vw + 0.75rem, 3.052rem);
  --font-size-h2-fluid:   clamp(1.5rem, 3vw + 0.5rem, 2.441rem);
  --font-size-h3-fluid:   clamp(1.25rem, 2.5vw + 0.25rem, 1.953rem);
  --font-size-h4-fluid:   clamp(1.125rem, 2vw + 0.125rem, 1.563rem);

  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --font-weight-semibold:600;
  --font-weight-bold:    700;

  --line-height-tight:   1.2;
  --line-height-heading: 1.35;
  --line-height-body:    1.65;
  --line-height-loose:   1.85;

  --letter-spacing-tight:  -0.02em;
  --letter-spacing-normal:  0em;
  --letter-spacing-wide:    0.02em;
  --letter-spacing-wider:   0.05em;
  --letter-spacing-caps:    0.08em;  /* All-caps labels, admin section headers */

  /* Arabic adjustments */
  --font-size-arabic-scale: 1.125;   /* Multiply Latin size × this for Arabic equivalence */
  --line-height-arabic-body: 1.9;    /* Arabic needs more breathing room */
  --font-size-adjust-arabic: 0.52;   /* CSS font-size-adjust to align cap heights */

  /* ----------------------------------------------------------
     SPACING
     ---------------------------------------------------------- */
  --space-0:  0px;
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  --space-40: 10rem;     /* 160px */
  --space-48: 12rem;     /* 192px */

  /* Semantic aliases */
  --space-component-xs: var(--space-2);
  --space-component-sm: var(--space-3);
  --space-component-md: var(--space-4);
  --space-component-lg: var(--space-6);
  --space-gap-sm:       var(--space-3);
  --space-gap-md:       var(--space-6);
  --space-gap-lg:       var(--space-8);
  --space-section-mobile:  var(--space-16);
  --space-section-tablet:  var(--space-20);
  --space-section-desktop: var(--space-32);

  /* ----------------------------------------------------------
     BORDER RADIUS
     ---------------------------------------------------------- */
  --radius-sm:   4px;
  --radius-md:   6px;
  --radius-lg:   8px;    /* Admin cards, buttons */
  --radius-xl:   12px;   /* Public cards */
  --radius-2xl:  16px;   /* Modals, hero images */
  --radius-3xl:  24px;   /* Feature callouts */
  --radius-full: 9999px; /* Pills, avatars, toggles */

  /* ----------------------------------------------------------
     SHADOWS — Public Site (warm green tint)
     ---------------------------------------------------------- */
  --shadow-none: none;
  --shadow-sm:   0 1px 2px rgba(15, 70, 38, 0.06);
  --elevation-1: 0 1px 3px rgba(15, 70, 38, 0.10),
                 0 1px 2px rgba(15, 70, 38, 0.06);
  --elevation-2: 0 4px 6px rgba(15, 70, 38, 0.07),
                 0 2px 4px rgba(15, 70, 38, 0.06);
  --elevation-3: 0 10px 15px rgba(15, 70, 38, 0.10),
                 0 4px 6px rgba(15, 70, 38, 0.05);
  --elevation-4: 0 20px 25px rgba(15, 70, 38, 0.12),
                 0 8px 10px rgba(15, 70, 38, 0.04);
  --shadow-focus:       0 0 0 3px rgba(23, 138, 67, 0.35);
  --shadow-focus-error: 0 0 0 3px rgba(220, 38, 38, 0.35);

  /* Admin shadows (neutral gray) */
  --admin-elevation-1: 0 1px 3px rgba(0, 0, 0, 0.10),
                       0 1px 2px rgba(0, 0, 0, 0.06);
  --admin-elevation-2: 0 4px 6px rgba(0, 0, 0, 0.07),
                       0 2px 4px rgba(0, 0, 0, 0.06);
  --admin-elevation-3: 0 10px 15px rgba(0, 0, 0, 0.10),
                       0 4px 6px rgba(0, 0, 0, 0.05);

  /* ----------------------------------------------------------
     Z-INDEX
     ---------------------------------------------------------- */
  --z-base:     0;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-overlay:  300;
  --z-drawer:   400;
  --z-modal:    500;
  --z-toast:    600;
  --z-tooltip:  700;

  /* ----------------------------------------------------------
     TRANSITIONS
     ---------------------------------------------------------- */
  --transition-fast:    100ms ease-out;
  --transition-base:    160ms ease-out;
  --transition-slow:    240ms ease-out;
  --transition-modal:   240ms ease-out;
  --transition-dismiss: 160ms ease-in;

  /* ----------------------------------------------------------
     BREAKPOINTS (reference only — use in @media queries)
     ---------------------------------------------------------- */
  --bp-sm:  480px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;

  /* ----------------------------------------------------------
     LAYOUT
     ---------------------------------------------------------- */
  --container-sm:    640px;
  --container-md:    768px;
  --container-lg:    1024px;
  --container-xl:    1280px;
  --container-admin: 1440px;

  --admin-sidebar-expanded:  240px;
  --admin-sidebar-collapsed:  64px;

}
```

---

## 2. Interactive States — Component-by-Component

### Global Rules

Every interactive element must express all five states. No exceptions.

| State | Visual treatment |
| --- | --- |
| **Default** | Base styles as documented in component inventory |
| **Hover** | `--elevation-2` on cards; background shift on buttons/links; `--transition-base` |
| **Focus** | `--shadow-focus` ring (3px, green-400); never suppressed — `:focus-visible` only acceptable if `:focus` has equivalent visible indicator |
| **Active / Pressed** | Scale `0.97` transform; brightness `0.92` on background |
| **Disabled** | Opacity `0.45`; `cursor: not-allowed`; no hover/active states; `aria-disabled="true"` |

### Primary Button

```
Default:  bg green-600, text white, radius-lg, shadow-sm
Hover:    bg green-700, shadow elevation-2, translateY(-1px)  [160ms ease-out]
Focus:    shadow-focus ring, no translateY
Active:   bg green-800, scale(0.97), no shadow
Disabled: bg green-600 opacity 0.45, cursor not-allowed
Loading:  bg green-600, spinner replaces label text, cursor wait, pointer-events none
```

### Secondary Button (outline)

```
Default:  bg transparent, border 1.5px green-600, text green-600, radius-lg
Hover:    bg green-50, border green-700, text green-700  [160ms]
Focus:    shadow-focus ring
Active:   bg green-100, scale(0.97)
Disabled: all green-600 at opacity 0.45
```

### Ghost Button (text only)

```
Default:  bg transparent, text green-600, no border
Hover:    bg green-50  [160ms]
Focus:    shadow-focus ring (tight, 2px offset)
Active:   bg green-100, scale(0.98)
```

### Destructive Button (admin — delete/reject)

```
Default:  bg error-bg, text error-text, border 1px error-border
Hover:    bg #FEE2E2, border #FCA5A5  [160ms]
Focus:    shadow-focus-error ring
Active:   bg #FECACA, scale(0.97)
```

### Text Input / Textarea / Select

```
Default:  bg white, border 1.5px surface-line (#DDD3BF), radius-md, text-primary
Hover:    border green-400  [100ms]
Focus:    border green-600 2px, shadow-focus ring, outline none
Error:    border error-icon (#EF4444) 2px, shadow-focus-error ring
Success:  border success-icon (#22C55E) 2px
Disabled: bg surface-muted, text-disabled, cursor not-allowed, border surface-line
Read-only:bg surface-muted, no border change on hover
```

### Checkbox / Radio

```
Default:  border 2px surface-line, bg white
Hover:    border green-400  [100ms]
Focus:    shadow-focus ring offset 2px
Checked:  bg green-600, border green-600, white tick/dot
Checked+hover: bg green-700
Disabled: opacity 0.45, cursor not-allowed
Error:    border error-icon; checked error: bg error-icon
```

### Toggle Switch

```
Track default: bg surface-line, radius-full
Track on:      bg green-600
Thumb:         bg white, radius-full, elevation-1
Thumb position:left (off), right (on) — translateX transition 160ms ease-out
Focus:         shadow-focus ring on track
Disabled:      opacity 0.45
```

### Navigation Link (desktop)

```
Default:  text-secondary, font-medium, no underline
Hover:    text green-700, underline offset 3px  [100ms]
Focus:    text green-700, visible focus outline (shadow-focus inset)
Active:   text green-600, border-bottom 2px green-600
Current:  text green-600, border-bottom 2px green-600, font-semibold
```

### Admin Sidebar Item

```
Default:  text admin-text-inverse opacity 0.75, bg transparent, radius-lg
Hover:    bg white/10, text inverse opacity 1  [100ms]
Focus:    bg white/10, focus ring white/40
Active:   bg green-600/30, text white
Current:  bg green-600, text white, font-medium
```

### School Card / News Card / Event Card

```
Default:  bg surface-card, elevation-1, radius-xl
Hover:    elevation-2, translateY(-2px)  [160ms ease-out]
Focus:    shadow-focus ring (whole card), no translateY
Active:   translateY(0), elevation-1
```

### Resource Download Row

```
Default:  bg transparent, border-bottom 1px surface-line
Hover:    bg surface-muted  [100ms]
Focus:    shadow-focus inset
Active:   bg green-50
```

### Admin Data Table Row

```
Default:  bg white, border-bottom 1px admin-surface-line
Hover:    bg slate-50  [100ms]
Focus:    outline 2px solid green-500 inset
Selected: bg green-50, border-left 3px green-600
```

### Tab (C29)

```
Default:  text-secondary, border-bottom 2px transparent, pb 12px
Hover:    text-primary, border-bottom 2px surface-line  [100ms]
Focus:    text-primary, shadow-focus inset below tab
Active/Selected: text green-700, border-bottom 2px green-600, font-medium
Disabled: opacity 0.45
```

### Dropdown Trigger (C30)

```
Default:  same as secondary button + chevron icon
Hover:    same as secondary button hover
Open:     border green-600, chevron rotated 180deg (160ms)
Focus:    shadow-focus ring
Panel:    elevation-3, radius-xl, border surface-line, bg white
Panel item hover: bg surface-muted  [100ms]
Panel item selected: bg green-50, text green-700, checkmark icon
```

### Modal Backdrop

```
Backdrop: bg black, opacity 0 → 0.60  [240ms ease-out]
Panel in: opacity 0 + translateY(16px) → opacity 1 + translateY(0)  [240ms ease-out]
Panel out: opacity 1 → 0 + translateY(8px)  [160ms ease-in]
```

### Toast Notification (C25)

```
In:  translateY(-16px) opacity 0 → translateY(0) opacity 1  [240ms ease-out]
Out: opacity 1 → 0  [160ms ease-in]
Auto-dismiss: 5s for success/info; 8s for warning; no auto-dismiss for error
```

### Pagination (C28)

```
Default:  bg transparent, text-secondary, border 1px surface-line, radius-md
Hover:    bg surface-muted, text-primary  [100ms]
Focus:    shadow-focus ring
Current:  bg green-600, text white, border green-600, font-medium
Disabled (prev/next): opacity 0.45, cursor not-allowed
```

---

## 3. Animation & Transition Guidelines

### Core Principle

Every animation must be justifiable to a 3G user on a Tecno Camon. If the animation does not communicate state change, confirm an action, or guide attention — remove it.

### Allowed Animations

| Purpose | Duration | Easing | Notes |
| --- | --- | --- | --- |
| Button press feedback | 100ms | ease-out | Scale 0.97 |
| Hover state changes | 100–160ms | ease-out | Colour, bg, shadow |
| Focus ring appearance | 100ms | ease-out | Box-shadow |
| Card lift on hover | 160ms | ease-out | TranslateY(-2px) + shadow |
| Modal enter | 240ms | ease-out | Fade + slide up |
| Modal exit | 160ms | ease-in | Fade + slide down |
| Toast enter/exit | 240ms / 160ms | ease-out / ease-in | — |
| Dropdown open/close | 160ms | ease-out | Opacity + translateY(4px) |
| Mobile menu open | 240ms | ease-out | Slide in from right |
| Mobile menu close | 200ms | ease-in | Slide out |
| Accordion expand | 240ms | ease-out | height: 0 → auto via max-height |
| Skeleton shimmer | 1400ms | linear | Loop — indicates loading |
| Tab indicator | 160ms | ease-out | Slide + fade |
| Chevron rotate | 160ms | ease-out | Dropdown/accordion |

### Forbidden Animations

- Parallax scrolling effects
- Auto-advancing content (carousels, sliders, marquees)
- Continuous looping animations outside loading states
- Scroll-triggered entrance animations that delay content visibility
- CSS `animation` on layout properties (width, height, margin) — use `transform` and `opacity` only
- `transition: all` — always specify exact properties

### `prefers-reduced-motion`

All transitions and animations must respect the OS accessibility setting:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Exception: the skeleton shimmer loader may use a very subtle opacity pulse (no position change) even with reduced-motion — it communicates "loading" rather than decoration.

### Performance Budget

- No animation property that triggers layout reflow (`top`, `left`, `width`, `height`, `margin`, `padding`)
- Animatable properties only: `transform`, `opacity`, `box-shadow`, `background-color`, `color`, `border-color`
- Use `will-change: transform` sparingly — only on elements that animate on every hover (cards). Remove `will-change` after animation completes for JS-triggered animations.

---

## 4. Form Validation — Rules & Error Copy

### Validation Trigger Policy

- **On blur:** Validate the field the user just left. Show inline error immediately.
- **On submit:** Re-validate all fields; scroll to first error; announce errors to screen readers via `aria-live="assertive"`.
- **On correction:** Clear error on next valid keystroke (do not wait for blur).
- **Do not validate on first keystroke** (typing-while-red is disorienting).

### Error Message Format

- Position: directly below the field, before the helper text
- Icon: 16px red circle-x icon left of text
- Colour: `--color-error-text` (#991B1B)
- Font: 13px / 400 weight
- Must be associated via `aria-describedby` on the input
- Copy: specific, not generic. Never "This field is required." — always say what is needed.

---

### Contact Form (PG13)

| Field | Rule | Error Copy |
| --- | --- | --- |
| Name | Required; min 2 chars; max 80 chars | "Please enter your name." |
| | Contains only letters, spaces, hyphens, apostrophes | "Name may only contain letters, spaces, hyphens, and apostrophes." |
| Email | Required; valid email format | "Please enter a valid email address (e.g. name@example.com)." |
| Subject | Required; min 3 chars; max 120 chars | "Please enter a subject (at least 3 characters)." |
| Message | Required; min 20 chars; max 2000 chars | "Please write a message (at least 20 characters)." |
| | Over max | "Message is too long — maximum 2,000 characters." |

**Success state:** Replace form with a calm confirmation panel:
> "Thank you, [Name]. Your message has been received. We aim to respond within 2 working days."

**Network error:** Keep form visible. Show an alert banner above the submit button:
> "Your message could not be sent — please check your connection and try again. If the problem persists, email us at info@amisfct.org."

---

### School Registration Form — Step 1 (School Details)

| Field | Rule | Error Copy |
| --- | --- | --- |
| School name | Required; 3–150 chars | "Please enter the school's full name." |
| Area council | Required; must select from list | "Please select the school's area council." |
| Arms operated | Required; at least one must be selected | "Please select at least one arm operated by the school." |
| Year established | Required; 4-digit year; 1900–current year | "Please enter the year established (e.g. 1998)." |
| | Outside range | "Year must be between 1900 and [current year]." |
| Short description | Optional; max 300 chars | — |
| | Over max | "Description is too long — maximum 300 characters." |

### School Registration Form — Step 2 (Contact Details)

| Field | Rule | Error Copy |
| --- | --- | --- |
| Principal's name | Required; 2–80 chars | "Please enter the principal's full name." |
| Contact email | Required; valid email | "Please enter a valid email address. This will be used for all official correspondence." |
| Contact phone | Required; valid Nigerian mobile (10–11 digits, starts 07/08/09) | "Please enter a valid Nigerian phone number (e.g. 08012345678)." |
| Physical address | Required; min 10 chars; max 250 chars | "Please enter the school's physical address." |

### School Registration Form — Step 3 (Photo Upload)

| Field | Rule | Error Copy |
| --- | --- | --- |
| School photo | Optional; JPEG/PNG/WebP only; max 5 MB | "Only JPEG, PNG, or WebP files are accepted." |
| | File too large | "This file is too large — maximum size is 5 MB. Please compress the image and try again." |

**Step navigation errors:** If user clicks "Next" before completing required fields:
> Show all errors on current step. Do not advance. Announce error count: "3 errors need to be corrected before continuing."

**Submission success:**
> "Your registration has been submitted. AMIS FCT will review your application and contact you at [email address] within 5–7 working days."

---

### Admin Login Form (ADM01)

| Field | Rule | Error Copy |
| --- | --- | --- |
| Email | Required | "Please enter your email address." |
| Password | Required | "Please enter your password." |
| Invalid credentials | — | "The email address or password is incorrect. Please try again." |
| Account locked (5 failed attempts) | — | "Your account has been temporarily locked after too many failed attempts. Please try again in 15 minutes or contact your Super Admin." |

---

### Admin — Notification Composer (ADM07)

| Field | Rule | Error Copy |
| --- | --- | --- |
| Subject | Required; 3–150 chars | "Please enter a subject for this notification." |
| Body | Required; min 10 chars | "Please write a message body before sending." |
| Audience | Required; at least one segment selected | "Please select at least one recipient group." |
| Scheduled time | If scheduling: must be at least 10 min in future | "Scheduled time must be at least 10 minutes from now." |
| Scheduled time | Must be a valid date/time | "Please enter a valid date and time." |

**Send confirmation modal:**
> "You are about to send this notification to [N] schools. This cannot be undone. Proceed?"
> Buttons: **Send now** (destructive primary) / **Cancel**

---

### Admin — Dues Amount Settings (ADM08)

| Field | Rule | Error Copy |
| --- | --- | --- |
| Tier amount | Required; positive integer or decimal; max 999,999 | "Please enter a valid amount (numbers only, no currency symbols)." |
| | Zero or negative | "Amount must be greater than zero." |

---

## 5. Empty States

Empty states are not failures — they are invitations. Each must include a title, a one-sentence explanation, and an action where appropriate. No raw "No results found." text.

### Public Site Empty States

| Context | Illustration / Icon | Title | Body | Action |
| --- | --- | --- | --- | --- |
| School directory — no results matching filter | Search icon, muted green | "No schools match your filters" | "Try adjusting the area council or arm filters, or browse all member schools." | "Clear filters" link |
| School directory — zero schools registered | Building icon | "No schools listed yet" | "AMIS FCT member schools will appear here as they are added." | — |
| News listing — no articles | Newspaper icon | "No news yet" | "Articles and updates from AMIS FCT will appear here." | — |
| Events listing — no upcoming events | Calendar icon | "No upcoming events" | "Check back soon for AMIS FCT events and programmes." | — |
| Resources hub — no resources | Folder icon | "No resources available yet" | "Circulars, forms, and guidelines will be published here." | — |
| Gallery — no albums | Photo icon | "No photos yet" | "Photos from AMIS FCT events and member schools will appear here." | — |

### Admin Empty States

| Context | Icon | Title | Body | Action |
| --- | --- | --- | --- | --- |
| Schools list — no approved schools | Building icon | "No approved schools yet" | "Submitted applications will appear here once approved." | "View pending applications" |
| Applications queue — no pending applications | Inbox icon | "No pending applications" | "New school registration requests will appear here." | — |
| Dues table — no schools | Table icon | "No schools to display" | "Dues records appear here once schools are approved." | — |
| News list — no articles | Pencil icon | "No articles published" | "Create your first news article." | "Write an article" button |
| Events list — no events | Calendar icon | "No events created" | "Create your first event." | "Add an event" button |
| Resources list — no resources | Upload icon | "No resources uploaded" | "Upload circulars, forms, or guidance documents." | "Upload resource" button |
| Gallery — no photos | Camera icon | "No photos uploaded" | "Upload photos from AMIS FCT events." | "Upload photos" button |
| Notifications — no history | Bell icon | "No notifications sent yet" | "Notifications you send to member schools will appear here." | "Compose notification" button |
| Notification delivery report — no data | Chart icon | "Delivery data not available yet" | "Delivery statistics update within a few minutes of sending." | — |
| Admin users — only one user | Person icon | "Only one admin account" | "Add another admin to share content management responsibilities." | "Add admin user" button |
| Search — no results | Search icon | "No results found" | "No schools, articles, or records match "[query]"." | "Clear search" link |

---

## 6. Loading State Behaviour

### Skeleton Screens (preferred over spinners for content areas)

Use skeleton screens — grey animated placeholder shapes matching the content layout — for all list and card content that loads asynchronously.

| Component | Skeleton anatomy |
| --- | --- |
| School card | Thumbnail rect (full width, 180px height) + 3 text lines (widths: 60%, 80%, 40%) |
| News card | Thumbnail rect (full width, 200px) + 2 text lines (80%, 60%) |
| Event card | No image; date chip rect (60px×24px) + 3 text lines |
| Resource row | Icon circle (32px) + 2 text lines + download button rect |
| Admin table row | 5 cell rects at varying widths |
| KPI stat card | Large number rect (80px×32px) + 1 label line |
| School profile hero | Full-width rect 320px tall |

Skeleton animation: `background: linear-gradient(90deg, #EDE5D6 25%, #F5EFE4 50%, #EDE5D6 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite linear;`

Admin skeletons use neutral grays: `#E2E8F0` / `#F1F5F9`.

### Spinners (for actions, not content loads)

- Use a spinner only for user-triggered actions: form submit, file upload, "Send notification" button.
- Spinner replaces button label text; button width does not change (prevents layout shift).
- Spinner: 16px diameter, stroke 2px, green-600 on white buttons / white on green buttons.
- Spinner animation: rotate 360deg over 700ms linear infinite.
- Disable all form fields while a submit spinner is active.

### Progress Indicator (file upload, bulk operations)

- Show a progress bar beneath the upload zone.
- Bar fill: green-600; track: surface-muted.
- Text: "Uploading… [N]%" — update in real time.
- On completion: replace with success icon + "Uploaded successfully."
- On failure: replace with error message + "Try again" link.

### Page-Level Loading

- Initial server render should display populated HTML — no full-page spinner.
- If a page section loads via client-side fetch, show skeleton for that section only.
- No full-screen loading overlays.

---

## 7. Accessibility Checklist

### Per Component Type

#### All Interactive Elements
- [ ] Keyboard operable: Tab to reach, Enter/Space to activate
- [ ] Visible focus indicator: `--shadow-focus` ring, never `outline: none` without replacement
- [ ] Touch target ≥ 44×44px (WCAG 2.5.5, our standard 48×48px)
- [ ] `cursor: pointer` on all clickable elements
- [ ] Never rely on colour alone to convey state — always add icon or text label

#### Buttons
- [ ] `<button type="button">` or `<button type="submit">` — never `<div>` or `<span>`
- [ ] Descriptive label: "Approve school" not "Approve" on a page with multiple approve buttons
- [ ] Loading state: `aria-busy="true"` + visually hidden spinner label "Loading…"
- [ ] Disabled state: `aria-disabled="true"` (prefer over `disabled` attribute for keyboard discoverability)
- [ ] Icon-only buttons: `aria-label` mandatory (e.g. `aria-label="Delete resource"`)

#### Form Fields
- [ ] Every input has a `<label>` with `for` matching `id` — never `placeholder` as sole label
- [ ] Required fields: `aria-required="true"` + visual indicator (asterisk with legend)
- [ ] Error messages: `aria-describedby` links field to error element; `role="alert"` on error container
- [ ] Fieldsets for related radios/checkboxes with `<legend>`
- [ ] `autocomplete` attributes on personal data fields (name, email, tel, address)
- [ ] Select dropdowns: native `<select>` preferred; custom dropdowns need full ARIA combobox pattern

#### Navigation
- [ ] `<nav aria-label="Main navigation">` landmark
- [ ] Current page: `aria-current="page"` on active link
- [ ] Skip link: `<a href="#main-content" class="skip-link">Skip to main content</a>` first element in body
- [ ] Mobile menu: `aria-expanded` on hamburger button; trap focus within open menu
- [ ] Dropdown menus: `aria-haspopup="true"`, `aria-expanded`, arrow-key navigation within menu

#### Cards (links)
- [ ] Entire card surface is one link — wrap in `<a>` with descriptive `aria-label` if card title alone is ambiguous
- [ ] Avoid nested interactive elements inside a card link (use CSS `pointer-events: none` on inner elements, or restructure)
- [ ] Image: meaningful `alt` text on all card thumbnail images

#### Data Tables (admin)
- [ ] `<table>` with `<caption>` or `aria-labelledby`
- [ ] `<th scope="col">` for column headers
- [ ] Sortable columns: `aria-sort="ascending/descending/none"` on `<th>`
- [ ] Row selection checkboxes: `aria-label="Select [School Name]"` per row
- [ ] "Select all" checkbox: `aria-label="Select all schools"`

#### Modals
- [ ] Focus moves to modal on open (first focusable element or modal heading)
- [ ] Focus trapped within modal while open
- [ ] Escape key closes modal
- [ ] Focus returns to trigger element on close
- [ ] `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to modal heading
- [ ] Backdrop click closes modal (also keyboard: Escape)
- [ ] `aria-live="polite"` for dynamically injected modal content

#### Toasts / Alerts
- [ ] Success/info toasts: `role="status"` (polite announcement)
- [ ] Error/warning toasts: `role="alert"` (assertive announcement)
- [ ] Persistent errors: do not auto-dismiss
- [ ] Dismiss button has `aria-label="Dismiss notification"`

#### Images
- [ ] Meaningful images: descriptive `alt` text (describe what the image shows and why it matters in context)
- [ ] Decorative images: `alt=""` (empty string, not absent)
- [ ] Gallery thumbnails: alt text entered per photo by admin (required field in upload form)
- [ ] School photos: alt = "[School Name] — [brief description]"
- [ ] Background SVG patterns: CSS `background-image` (not `<img>`) — no alt needed

#### Arabic / RTL Content
- [ ] All Arabic text: `lang="ar"` attribute on containing element
- [ ] All Arabic text: `dir="rtl"` attribute (or inherits from `lang="ar"` scoped container)
- [ ] Screen reader reads Arabic correctly only with correct `lang` — this is not optional
- [ ] Mixed LTR/RTL inline: use `<span dir="rtl" lang="ar">` inline, not CSS `text-align: right`

#### Colour Contrast (minimum WCAG 2.1 AA; target AAA for body text)
- [ ] Body text on page bg: 17.2:1 (passes AAA)
- [ ] Secondary text on page bg: 8.3:1 (passes AAA)
- [ ] Muted text on page bg: 4.6:1 (passes AA)
- [ ] White text on green-600: 5.1:1 (passes AA — do not use on smaller than 18px)
- [ ] Green-600 on white: 5.1:1 (passes AA)
- [ ] Error text on error bg: 7.8:1 (passes AAA)
- [ ] Confirm every new colour combination before shipping

---

## 8. RTL & Arabic Rendering Implementation Notes

### When Arabic Appears in the AMIS FCT Site

| Location | Content | Implementation |
| --- | --- | --- |
| Site header / hero | Basmala invocation | `<p class="basmala" dir="rtl" lang="ar">` |
| School directory cards | Official Arabic school name (if exists) | `<span class="school-name-ar" dir="rtl" lang="ar">` below English name |
| Resource/circular titles | Arabic phrase inline | `<span dir="rtl" lang="ar">` inline within the title |
| Leadership page | Arabic names | `<span dir="rtl" lang="ar">` |

The site is LTR. Arabic appears as islands within LTR pages. **Do not set `dir="rtl"` on `<html>` or `<body>`** — this would flip the entire layout.

### Font Loading

```css
@font-face {
  font-family: 'Noto Naskh Arabic';
  src: url('/fonts/NotoNaskhArabic-Variable.woff2') format('woff2-variations');
  font-weight: 400 700;
  font-display: swap;
  unicode-range: U+0600-U+06FF, U+0750-U+077F, U+FB50-U+FDFF, U+FE70-U+FEFF;
}
```

The `unicode-range` descriptor ensures the Arabic font only loads on pages that actually contain Arabic characters, saving bandwidth for users on pages with no Arabic content.

### Arabic Text CSS

```css
[lang="ar"] {
  font-family: var(--font-family-arabic);
  font-size-adjust: var(--font-size-adjust-arabic);  /* Align cap height with Latin */
  direction: rtl;
  text-align: right;
  letter-spacing: 0;  /* Never apply letter-spacing to Arabic — it breaks glyph joining */
}

.basmala {
  font-size: calc(1.125rem * var(--font-size-arabic-scale));  /* ≈ 20px */
  line-height: var(--line-height-arabic-body);
  color: var(--color-green-800);
  font-weight: 400;
}

.school-name-ar {
  font-size: calc(var(--font-size-sm) * var(--font-size-arabic-scale));  /* ≈ 15.75px */
  line-height: var(--line-height-arabic-body);
  color: var(--color-text-secondary);
  display: block;
  margin-top: var(--space-1);
}
```

### Logical Properties

Use CSS logical properties throughout so if a future bilingual version switches `dir="rtl"` on the root, layout mirrors automatically:

```css
/* Use this:                      Not this: */
margin-inline-start: 1rem;     /* margin-left */
padding-inline-end: 1.5rem;    /* padding-right */
border-inline-start: ...;      /* border-left */
inset-inline-start: 0;         /* left: 0 */
text-align: start;             /* text-align: left */
```

Exception: explicit decorative elements (sidebar border accent, admin left stripe) may use physical properties intentionally.

### Testing Arabic Rendering

Before shipping any page containing Arabic:
1. Test in Firefox, Chrome, and Safari — Arabic ligature rendering differs
2. Test with screen reader (VoiceOver iOS for mobile; NVDA on Windows for desktop) — confirm Arabic is announced in Arabic, not character-by-character
3. Verify no letter-spacing CSS leaks onto Arabic text nodes
4. Test Basmala at 13px, 16px, 20px — ligatures must remain legible at small sizes

---

## 9. Image Optimisation Requirements

### Format

All images served on the website must be WebP. The build pipeline must:
1. Accept source uploads in JPEG, PNG, or WebP
2. Convert JPEG/PNG to WebP automatically on ingest
3. Store both the original (for re-export) and the WebP derivatives

**AVIF:** Use as the preferred format served via `<picture>` with WebP fallback, only if AVIF encoding is supported in the deployment environment. WebP is the guaranteed minimum.

```html
<!-- Preferred pattern -->
<picture>
  <source srcset="school-photo.avif" type="image/avif">
  <source srcset="school-photo.webp" type="image/webp">
  <img src="school-photo.jpg" alt="Hilal Academy — school building in Kubwa" loading="lazy" width="400" height="280">
</picture>
```

### Lazy Loading

- **Lazy-load:** All images below the fold. Use native `loading="lazy"`.
- **Eager-load:** The hero section image (above the fold on any viewport); the site logo.
- Always include explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS). The browser uses these to reserve space before the image loads.

### `srcset` and `sizes` — Required Attribute Sets

#### School Card Thumbnail (C04)
```html
<img
  srcset="school-thumb-320w.webp 320w,
          school-thumb-640w.webp 640w,
          school-thumb-960w.webp 960w"
  sizes="(min-width: 1024px) 300px,
         (min-width: 768px) calc(50vw - 32px),
         calc(100vw - 32px)"
  src="school-thumb-640w.webp"
  alt="..."
  width="320" height="220"
  loading="lazy"
>
```

#### News Card Thumbnail (C07)
```html
<img
  srcset="news-thumb-480w.webp 480w,
          news-thumb-960w.webp 960w"
  sizes="(min-width: 1024px) 380px,
         (min-width: 768px) calc(50vw - 40px),
         calc(100vw - 32px)"
  src="news-thumb-480w.webp"
  alt="..."
  width="480" height="270"
  loading="lazy"
>
```

#### Hero Image (PG01, PG03–PG05, PG08, PG10)
```html
<img
  srcset="hero-640w.webp 640w,
          hero-1024w.webp 1024w,
          hero-1440w.webp 1440w"
  sizes="100vw"
  src="hero-1024w.webp"
  alt="..."
  width="1440" height="560"
  loading="eager"
  fetchpriority="high"
>
```

#### School Profile Full Photo (PG05)
```html
<img
  srcset="profile-640w.webp 640w,
          profile-1024w.webp 1024w"
  sizes="(min-width: 1024px) 800px, 100vw"
  src="profile-640w.webp"
  alt="..."
  width="800" height="500"
  loading="lazy"
>
```

#### Gallery Thumbnail (PG10, ADM09)
```html
<img
  srcset="gallery-240w.webp 240w,
          gallery-480w.webp 480w"
  sizes="(min-width: 1024px) 180px,
         (min-width: 768px) calc(25vw - 24px),
         calc(50vw - 20px)"
  src="gallery-240w.webp"
  alt="[Admin-entered alt text]"
  width="240" height="180"
  loading="lazy"
>
```

### Image Size Targets (WebP, quality 80)

| Type | Dimensions | Max file size |
| --- | --- | --- |
| School card thumbnail | 320×220px | 30 KB |
| School card thumbnail @2x | 640×440px | 55 KB |
| News card thumbnail | 480×270px | 40 KB |
| Hero (mobile) | 640×360px | 60 KB |
| Hero (desktop) | 1440×560px | 180 KB |
| School profile photo | 800×500px | 90 KB |
| Gallery thumbnail | 240×180px | 18 KB |
| Gallery full | 1200×900px | 150 KB |
| Leadership headshot | 240×240px | 22 KB |

### Admin Upload Constraints (enforced server-side)

| Upload type | Max file size | Accepted formats |
| --- | --- | --- |
| School photo | 5 MB (source) | JPEG, PNG, WebP |
| News article image | 5 MB (source) | JPEG, PNG, WebP |
| Gallery photo | 8 MB (source) | JPEG, PNG, WebP |
| Leadership headshot | 3 MB (source) | JPEG, PNG, WebP |
| Resource file (PDF, DOC, DOCX, XLS, XLSX) | 20 MB | PDF, DOC, DOCX, XLS, XLSX |

Server converts all image uploads to WebP derivatives at ingest. The original file is retained for re-cropping.

---

## 10. Icon System

### Recommendation: Lucide Icons

**Library:** Lucide React (or Lucide SVG sprite for non-React environments)
**Version:** Pin to a specific version in `package.json` — icon designs change between releases.

**Why Lucide over alternatives:**
- MIT licensed — no usage restrictions
- Consistent 24px grid with 2px stroke — matches the AMIS FCT design weight
- 1,300+ icons, all named clearly (no Heroicons "arrow-up-right" ambiguity)
- SVG sprites available — zero JS overhead for static server renders
- Stroke-based (not fill-based) — scales cleanly and works at 16px without becoming blobs
- Active maintenance; accessible by default with `aria-hidden`

### Implementation Pattern

```html
<!-- Inline SVG (for interactive elements needing CSS colour inheritance) -->
<svg class="icon icon--16" aria-hidden="true" focusable="false">
  <use href="/icons/sprite.svg#school"></use>
</svg>

<!-- Icon with label (button) -->
<button type="button" aria-label="Delete resource">
  <svg class="icon icon--16" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#trash-2"></use>
  </svg>
</button>

<!-- Icon with visible label (no aria-label needed on button) -->
<button type="button">
  <svg class="icon icon--16" aria-hidden="true" focusable="false">
    <use href="/icons/sprite.svg#upload"></use>
  </svg>
  Upload resource
</button>
```

### Icon Sizes

```css
.icon       { width: 1rem;    height: 1rem;    }   /* 16px — inline, labels */
.icon--20   { width: 1.25rem; height: 1.25rem; }   /* 20px — buttons */
.icon--24   { width: 1.5rem;  height: 1.5rem;  }   /* 24px — nav, headers */
.icon--32   { width: 2rem;    height: 2rem;    }   /* 32px — empty states */
.icon--48   { width: 3rem;    height: 3rem;    }   /* 48px — empty state hero */
```

### Core Icon Assignments

| Context | Icon name | Size |
| --- | --- | --- |
| Navigation — Schools | `school` (or `building-2`) | 24px |
| Navigation — News | `newspaper` | 24px |
| Navigation — Events | `calendar-days` | 24px |
| Navigation — Resources | `folder-open` | 24px |
| Navigation — About | `info` | 24px |
| Navigation — Contact | `mail` | 24px |
| Admin — Dashboard | `layout-dashboard` | 20px |
| Admin — Schools | `building-2` | 20px |
| Admin — Dues | `coins` | 20px |
| Admin — Notifications | `bell` | 20px |
| Admin — Gallery | `image` | 20px |
| Admin — Settings | `settings` | 20px |
| Admin — Users | `users` | 20px |
| Action — Download | `download` | 16px |
| Action — Upload | `upload` | 16px |
| Action — Delete | `trash-2` | 16px |
| Action — Edit | `pencil` | 16px |
| Action — Approve | `check-circle` | 16px |
| Action — Reject | `x-circle` | 16px |
| Action — Request more info | `message-circle` | 16px |
| Action — Search | `search` | 20px |
| Action — Filter | `filter` | 16px |
| Action — Close/dismiss | `x` | 20px |
| Action — Menu (hamburger) | `menu` | 24px |
| Action — Chevron down | `chevron-down` | 16px |
| Action — External link | `external-link` | 14px |
| Status — Success | `check-circle-2` | 16px |
| Status — Warning | `alert-triangle` | 16px |
| Status — Error | `x-circle` | 16px |
| Status — Info | `info` | 16px |
| Dues — Paid | `check-circle-2` | 14px |
| Dues — Partial | `clock` | 14px |
| Dues — Unpaid | `alert-circle` | 14px |
| File type — PDF | `file-text` | 20px |
| File type — Word | `file-text` | 20px |
| File type — Excel | `table-2` | 20px |
| Pagination — Previous | `chevron-left` | 16px |
| Pagination — Next | `chevron-right` | 16px |

### Accessibility Rules for Icons

1. **Decorative icons** (alongside visible text): `aria-hidden="true"` always
2. **Standalone icon buttons**: `aria-label` on the `<button>` element describes the action
3. **Status icons**: pair with visually hidden text: `<span class="sr-only">Error:</span>`
4. `focusable="false"` on all SVGs — prevents SVG from receiving Tab focus in older IE/Edge
5. Icons must not be the sole colour indicator of state — pair with text label or distinct shape

### SVG Sprite Generation

Build step: collect all used icons from Lucide's icon set, inline them into a single `/public/icons/sprite.svg` file using a build script (e.g. `lucide-static` CLI or a custom Vite plugin). The sprite is served as a static asset with a long cache header.

Do not import icon components dynamically at runtime — this adds JS overhead and delays rendering on 3G. Pre-bundle the sprite at build time.

---

## 11. Component Accessibility — Quick Reference Card

| Component | Role/Landmark | Key ARIA | Keyboard |
| --- | --- | --- | --- |
| Global nav | `<nav aria-label="Main">` | `aria-current="page"` on active | Tab through links |
| Mobile nav trigger | `<button>` | `aria-expanded`, `aria-controls` | Enter to open, Escape to close |
| Mobile nav drawer | `<nav aria-label="Main">` | `aria-modal` | Trap focus; Escape closes |
| Search bar | `<search>` or `role="search"` | `aria-label="Search schools"` | Tab to input, Enter submits |
| Card (linked) | `<article>` or `<li>` | `aria-label` if title insufficient | Enter to follow link |
| Directory filters | `<fieldset>` + `<legend>` | `aria-expanded` on collapse | Tab through, Space to check |
| Accordion | `<button aria-expanded>` + panel | `aria-controls`, `aria-expanded` | Enter/Space toggles, Tab moves |
| Tabs | `role="tablist"` | `role="tab"`, `aria-selected`, `role="tabpanel"` | Arrow keys between tabs, Tab into panel |
| Modal | `role="dialog"` | `aria-modal`, `aria-labelledby` | Tab traps within; Escape closes |
| Toast | `role="alert"` or `role="status"` | `aria-live="assertive/polite"` | Dismiss button keyboard-operable |
| Data table | `<table>` + `<caption>` | `scope="col"` on `<th>` | Tab through cells (sortable headers) |
| Date picker | `role="dialog"` for calendar | `aria-label` per date cell | Arrow keys navigate calendar |
| File upload | `<input type="file">` | `aria-describedby` for instructions | Enter/Space opens file dialog |
| Rich text editor | `role="textbox" aria-multiline` | `aria-label="Article body"` | Standard text editing keys |
| Pagination | `<nav aria-label="Pagination">` | `aria-current="page"` | Tab through page links |
| Breadcrumb | `<nav aria-label="Breadcrumb">` | `aria-current="page"` on last item | Tab through links |
| Dropdown | `role="combobox"` or `<select>` | `aria-expanded`, `aria-haspopup` | Enter opens; Arrow keys navigate; Escape closes |
| Toggle switch | `role="switch"` | `aria-checked` | Space toggles |
| Dues status badge | `<span>` | None (decorative) | — |
| Skeleton loader | `aria-busy="true"` on container | `aria-live="polite"` on container | — |
| Empty state | `<section>` or plain div | `aria-label` if needed | CTA button keyboard-operable |

---

*End of Handoff Specification — design/06-handoff-spec.md*
