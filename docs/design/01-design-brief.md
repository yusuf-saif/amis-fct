# Design Brief

## AMIS FCT Website Rebuild — amisfct.org

**Prepared by:** Design Lead
**Date:** 2026-05-14
**Phase:** Design — Pre-Wireframe
**Informed by:** PM documents 01–06

---

## 1. Visual Personality

Three adjectives that define how every page should feel when a user lands on it:

### Trustworthy

The site is the first point of contact for parents choosing a school for their child and for government officials verifying an institution. Every visual decision must signal permanence, competence, and honesty. No trick gradients, no flashy sliders, no stock-photo smiles. Real photos of real schools, consistent type, calm layout. Trust is built through restraint.

### Warm

This is a community association, not a government ministry. The audience includes mothers searching on a battered Tecno phone in Kubwa and a principal in Abaji who has never trusted a website before. The site should feel like it was made for them — not about them. Warmth comes from colour temperature (parchment over cold white), photo-forward content, and human-scale typography.

### Dignified

AMIS FCT represents Islamic education. The aesthetic must honour that. Dignified means: no excess, no kitsch Islamic clipart, no overcrowded layouts. Islamic geometric pattern as texture, not decoration. Arabic rendered beautifully. Green used with intention. A dignified site earns institutional respect without announcing it.

---

## 2. Brand Positioning

### Where AMIS FCT sits in the Nigerian education/NGO landscape

Most Nigerian education websites fall into one of three failure modes:

1. **The Ministry Site** — Cold, grey, table-heavy, last updated in 2019. Zero warmth, maximum formality. Government officials respect it but parents avoid it.
2. **The Private School Site** — Expensive-looking templates, generic stock photos of smiling children, blue/white colour schemes. Looks imported, feels inauthentic.
3. **The NGO Site** — Cluttered with donor logos, campaign banners, email popups. Treats the audience as beneficiaries, not community members.

AMIS FCT must occupy a fourth position: **the Institutional Community Hub**. It combines:

- The authority and permanence of a ministry site
- The warmth and approachability of a community organisation
- The cultural authenticity that neither of the above achieve
- The performance and mobile-first design that Nigerian users actually experience

Closest comparator outside Nigeria: **Al-Azhar University's web presence** — authoritative, green-forward, Islamic aesthetic without being garish, shows community breadth. The AMIS FCT site should feel like Al-Azhar's grassroots cousin — same dignity, more human scale.

---

## 3. Design Principles

These five principles govern every design decision, from button padding to page layout.

### P1 — Content Earns the Screen

No element appears without purpose. Every image, icon, pattern, or animation must justify its bandwidth. For a 3G user in Gwagwalada, a decorative 200KB background image is a broken experience. Favour loaded, meaningful content over decorative chrome.

### P2 — One Primary Action Per Page

Every public page has exactly one primary CTA. The school directory page's job is to help parents find a school — not to promote the newsletter, not to push events. Competing CTAs produce paralysis. Secondary actions exist but are visually subordinate.

### P3 — Islamic Design as Language, Not Decoration

Geometric patterns, calligraphy, and arabesque motifs carry meaning in Islamic culture. Used correctly, they communicate heritage and purpose. Used wrongly, they are clip art. Rule: Islamic design elements appear only as texture (background pattern at 4–8% opacity), framing (border treatment on section dividers), or in functional Arabic text. Never as centrepiece decoration.

### P4 — Admin is a Tool, Public is an Experience

The public-facing site and the admin dashboard share a design system but serve fundamentally different purposes. Public: warm, spacious, photo-forward, for occasional users on mobile. Admin: functional, data-dense, for daily desktop users. Same tokens, different application. Never let admin density leak into the public site.

### P5 — Dignity in Every State

Every state a component can be in — loading, empty, error, success — must be handled with the same care as the default state. An empty school directory is not a blank page; it is an invitation. A failed form submission is not a red banner; it is a calm, specific correction. Every edge case has been considered.

---

## 4. Tone of Voice per Persona

| Persona | Tone | Reasoning |
| --- | --- | --- |
| Fatima (Parent) | Warm, clear, direct | She is scanning fast on mobile, no patience for corporate language. "Find a school near you" not "Access our member institution directory." |
| Ahmed (Teacher) | Collegial, professional | He has earned respect as an educator. Talk to him as a peer, not a student. Resource descriptions are precise and factual. |
| Usman (Student) | Energetic, visual-first | Captions on gallery photos should feel exciting. Event descriptions should use active verbs. Short sentences. |
| Bilkisu (Principal) | Formal, structured | She trusts official documents over informal language. Circular titles follow standard naming conventions. Instructions are numbered, not bulleted. |
| Garba (Official) | Institutional, authoritative | About page language mirrors official government report style. Leadership bios are complete, titled, formal. No colloquialisms. |
| Zainab (Admin) | Task-focused, efficient | Admin UI copy is functional. Button labels are verbs: "Approve", "Send", "Update". Success messages confirm the action: "Circular uploaded and published." No cheerful emoji. |

**Overall register:** British English throughout (per PRD), formal but not stiff. The association is proud, not boastful. Helpful, not deferential.

---

## 5. Aesthetic Inspiration (Described, Not Linked)

### Reference A — "The Digital Masjid" Aesthetic

Imagine a mosque's website that gets design right: deep green primary, warm white or cream background, geometric tile patterns at very low opacity as section dividers, Arabic headers with correct RTL and beautiful Naskh calligraphy, gold accents on interactive elements. Clean navigation. Photo-forward hero sections showing the actual building and community. Typography that mixes a clean sans-serif for Latin text with a respected Arabic typeface for Islamic terms. This is the aesthetic register AMIS FCT should occupy.

Key takeaways: green + cream + gold is the canonical palette. Pattern is texture, not decoration. Arabic typography is given the same visual weight as English.

### Reference B — "The African University Portal" Aesthetic

Consider a well-funded pan-African university that has recently rebuilt its website. It leads with photography of students and campus life (not stock photos — real, proud, local faces). The colour palette anchors on a deep institutional colour (navy, green, or burgundy) with warm neutrals. Typography is generous — large headings, comfortable line height, no wall-of-text pages. Navigation is simple: five items maximum. Mobile experience is prioritised. Downloads are prominent and well-labelled.

Key takeaways: Real photography builds trust faster than any design element. Generous whitespace signals competence. Downloads get visual hierarchy — they are primary content, not afterthoughts.

### Reference C — "The Nigerian Professional Association" Aesthetic

A bar association, medical council, or regulatory body website done well. The design communicates credibility to two audiences simultaneously: members (who need practical access to resources) and the public/press (who need to verify the body's legitimacy). Achieves this through: prominent founding date / registration details in the footer, named leadership with photographs, downloadable governance documents above the fold, and a news section that reflects institutional activity (not personal blogs).

Key takeaways: Governance transparency is a design element. Footer information density is not a failure — for this audience it builds trust. Leadership photos matter more than hero photography.

---

## 6. What to Avoid

These patterns would actively harm AMIS FCT's audience and should never be used.

| Anti-pattern | Why it hurts |
| --- | --- |
| Auto-playing video or audio | Destroys 3G users; culturally inappropriate on a site with Islamic content |
| Parallax scrolling | Causes jank on low-end devices; adds no information |
| Generic stock photography (smiling children, handshakes) | Destroys trust immediately for FCT locals who know it is not real |
| Blue as a primary colour | Over-used by Nigerian government and education sites; reads as generic |
| Neon or fluorescent green | Reads as WhatsApp/tech, not Islamic institution |
| Popup email capture on first visit | Disrespects users who arrived with a specific intent |
| Full-bleed background patterns with content on top | Severely reduces readability, especially on small screens in bright sunlight |
| White text on light green | Fails WCAG; the specific pitfall of Islamic green palettes done wrong |
| Overly decorative Arabic calligraphy as primary visual element | Reduces legibility; risks misusing sacred text as decoration |
| Complex mega-menus | The audience includes low-tech literacy users; one level of dropdown maximum |
| Infinite scroll | Pagination is better for content archives; infinite scroll breaks browser history and is disorienting for infrequent visitors |
| Carousels / hero sliders | Auto-advancing content fails accessibility, destroys performance, and users ignore them; a single static hero communicates more effectively |
| Fixed/sticky headers taller than 56px on mobile | Consumes too much screen real estate on 5.5-inch displays |

---

## 7. Islamic Design Considerations

### Geometric Patterns

Islamic geometric patterns — zellige, girih, arabesque — are mathematics made visual. They are appropriate and culturally resonant when used as:

- **Section background texture:** 4–8% opacity SVG pattern tiles on section backgrounds, particularly the hero and newsletter sections. Use a classic 8-point star or hexagonal interlace in the primary green, very low opacity against the parchment background. Never on top of text.
- **Divider ornaments:** A small geometric star or interlace motif can serve as a horizontal rule between major page sections. 24px tall, centred, in `--color-green-300`. Not on every section — reserve for the most structurally important page breaks (hero-to-about, or events-to-gallery).
- **Admin sidebar header accent:** A 4px geometric border strip along the left edge of the admin sidebar, in `--color-green-600`. Ties the admin to the brand without imposing public design on a functional tool.

### Arabic Calligraphy

- The Basmala ("Bismillah ir-Rahman ir-Rahim") may appear in the hero section or site header as a subtle opening invocation, rendered in Noto Naskh Arabic or Scheherazade New, in `--color-green-800`, small (20px), right-aligned.
- School names that have official Arabic forms should display the Arabic name beneath the English name in the school directory cards, in a slightly smaller size.
- Official circular titles that include Arabic phrases render the Arabic portion inline with correct RTL direction using `<span dir="rtl" lang="ar">`.
- **Do not use Arabic calligraphy as a decorative image** (PNG/SVG of calligraphy). Use actual text. This is both technically superior (screenreader-accessible, scalable, localizable) and culturally more respectful.

### Colour and Symbolism

- Green is the colour of Paradise in Islamic tradition and of the Prophet's banner. It is the non-negotiable primary colour. Never compromise it for trend or contrast convenience — solve contrast through shade selection, not colour substitution.
- Gold is the traditional companion to Islamic green, representing knowledge and value. Use sparingly for the highest-value interactive elements (primary CTA buttons, active navigation states) and decorative accents on the public site only.
- White and cream represent purity and clarity. These are the backgrounds.
- Red is used only for error states and never as a brand colour.
- Avoid purple, pink, and orange as accent colours — they do not fit the cultural register.

### Qibla and Directionality

- Although the site is primarily LTR (English), all Arabic text blocks must be properly marked `dir="rtl"` and `lang="ar"`. The browser must know the text is Arabic, not just right-aligned English.
- Mixed-direction paragraphs (English sentence with an Arabic term inline) use the Unicode Bidirectional Algorithm correctly — no manual right-alignment tricks that break at different font sizes.

### Imagery Ethics

- Do not display images of prayer in progress (makruh / discouraged in some scholarly opinions when used for promotional purposes).
- Images of students, teachers, and school buildings are appropriate and encouraged.
- Female students and staff may appear in photography provided they are presented with dignity and modesty — consistent with the community's values.
- No images where individuals would reasonably expect their photo not to be published.

---

## 8. Mobile-First Rationale

### The FCT Mobile Reality

The project brief documents that 70%+ of target users are on mobile. This is not an assumption — it reflects Nigeria's digital landscape:

- **Device profile:** Tecno Camon series, Xiaomi Redmi series — mid-range Android devices with 5.5–6.5 inch displays at 720×1600px (HD). Not flagship hardware. JavaScript-heavy SPAs perform poorly.
- **Connection profile:** 3G (HSPA+ at 1–5 Mbps) in peri-urban areas (Kuje, Kwali, Abaji); 4G LTE in urban cores (Abuja Municipal, Gwagwalada). Expect intermittent connectivity and high latency.
- **Battery and heat:** Mid-range Snapdragon/MediaTek processors throttle under load. Heavy CSS transitions and JavaScript animations cause dropped frames and thermal throttle.
- **Data cost:** Mobile data is metered. Users actively avoid pages that use excessive data. File size is a UX decision.

### Design Decisions Driven by This Reality

1. **Mobile breakpoint is the design start point, not the end point.** Every component is designed at 360px wide first. Desktop is progressive enhancement.
2. **Touch targets are 48×48px minimum** (4px above WCAG's 44px) because Tecno displays at 160 DPI vs iPhone's 460 DPI — physical size of a 44px target is larger on a low-DPI screen, giving more tolerance.
3. **No hover-only states that carry information.** Hover does not exist on mobile. Tooltips that only show on hover are invisible to 70% of users.
4. **Images are the biggest performance risk.** All images: WebP format, lazy-loaded, `srcset` with mobile-first sizes. A school card thumbnail is 320px wide on mobile — serving a 1200px image wastes 14× the bytes.
5. **Font loading is explicit.** `font-display: swap` on all web fonts. Body text renders in system fallback immediately; web font replaces it when loaded. No invisible text.
6. **Navigation collapses to hamburger at ≤768px** with a full-screen overlay (not a tiny dropdown that requires precise tapping). The overlay has large tap targets (min 48px height per item).
7. **Forms are single-column on mobile.** Multi-column form layouts require pinch-zooming. The school registration form is one field per row on mobile.
8. **Admin dashboard is desktop-only by design** but gracefully functional at tablet width. Admin on mobile phone is not a supported workflow.
