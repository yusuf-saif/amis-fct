# Wireframes

## AMIS FCT Website Rebuild — amisfct.org

**Prepared by:** Design Lead
**Date:** 2026-05-14
**Format:** Structured ASCII layout diagrams with component annotations
**Convention:**
- `[COMPONENT]` — a named component from 04-component-inventory.md
- `H1/H2/H3` — heading hierarchy
- `---` — horizontal rule / section separator
- `← →` — horizontal layout (side by side)
- Annotations in parentheses (describe content)

Mobile layout is described separately under each page when it differs significantly from desktop.

---

## PUBLIC PAGES

---

### PG01 — Homepage (`/`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV — Desktop]                                      │
│  LOGO  Home  About▾  Schools▾  News&Events▾  Resources▾  Contact │
│                                            [Search🔍] [Subscribe] │
├─────────────────────────────────────────────────────────────────┤
│ [C03 HERO BANNER — Standard]                                    │
│ Background: Parchment + Islamic geometric pattern (6% opacity)  │
│                                                                 │
│  ┌─── LEFT (col 1–7) ─────────────────┐  ┌─ RIGHT (col 8–12) ─┐ │
│  │ بسم الله الرحمن الرحيم (small, RTL)│  │   [Hero photo:    │ │
│  │                                    │  │    school/students]│ │
│  │ H1: The Official Body for          │  │    (rounded 2xl)   │ │
│  │     Model Islamic Schools, FCT     │  │                    │ │
│  │                                    │  │                    │ │
│  │ Body-lg: Connecting X member       │  │                    │ │
│  │ schools across 6 Area Councils     │  └────────────────────┘ │
│  │                                    │                         │
│  │ [CTA: Find a School ▶ (primary)]   │                         │
│  │ [CTA: Latest News  ▶ (ghost)]      │                         │
│  └────────────────────────────────────┘                         │
├─────────────────────────────────────────────────────────────────┤
│ ABOUT TEASER (section, parchment bg)                            │
│  ┌─ LEFT (col 1–8) ──────────────────────────────────────────┐  │
│  │ H2: About AMIS FCT                                        │  │
│  │ Body: 2–3 sentence description of the association mission  │  │
│  │ [Link: Learn More about AMIS FCT →]                       │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│ LATEST NEWS (card-surface bg)                                   │
│  H2: Latest News                            [Link: All News →]  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │
│  │ [C07 NEWS CARD]│  │ [C07 NEWS CARD]│  │ [C07 NEWS CARD]│     │
│  └────────────────┘  └────────────────┘  └────────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│ UPCOMING EVENTS (parchment bg)                                  │
│  H2: Upcoming Events                    [Link: All Events →]    │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │
│  │ [C08 EVT CARD] │  │ [C08 EVT CARD] │  │ [C08 EVT CARD] │     │
│  └────────────────┘  └────────────────┘  └────────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│ SCHOOLS TEASER (green-50 bg, Islamic pattern divider above)     │
│  ┌─ LEFT (col 1–7) ────────────────┐  ┌─ RIGHT (col 8–12) ──┐   │
│  │ H2: Find a Member School        │  │  [C06 SEARCH BAR]   │   │
│  │ Body: X approved schools across │  │  (links to /schools)│   │
│  │ FCT's 6 Area Councils           │  │                     │   │
│  │ [CTA: Browse All Schools ▶]     │  │                     │   │
│  └─────────────────────────────────┘  └─────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│ GALLERY PREVIEW (card-surface bg)                               │
│  H2: Gallery              [Link: View All Photos →]             │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                     │
│  │img │ │img │ │img │ │img │ │img │ │img │  (6 thumbnails 2:3) │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘                     │
├─────────────────────────────────────────────────────────────────┤
│ NEWSLETTER SIGNUP (green-800 bg, white text)                    │
│  H2: Stay Updated                                               │
│  Body: Get official circulars, events, and news directly.       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐    │
│  │ [Name input   ] │  │ [Email input  ] │  │ [Subscribe ▶]│    │
│  └─────────────────┘  └─────────────────┘  └──────────────┘    │
│  ☐ I consent to receive emails (NDPR)  [Privacy Policy]        │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
│  [About] [Schools] [News & Media] [Resources] [Contact] [Legal] │
│  Address · Phone · Email · Social Icons                         │
│  © 2026 Association of Model Islamic Schools, FCT               │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile layout (≤480px):**
- Nav: hamburger only (C02)
- Hero: single column, hero image hidden, text + stacked CTAs
- News/Events cards: full-width, one column, 3 cards scroll vertically
- Gallery: 2-column grid of 6 thumbnails
- Newsletter: single column form, fields stacked

---

### PG02 — About Overview (`/about`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C03 PAGE HERO — green-800 bg]                                  │
│  [C21 BREADCRUMB: Home > About]                                 │
│  H1: About AMIS FCT                                             │
│  H2-subtitle: The Official Association for Model Islamic Schools│
├─────────────────────────────────────────────────────────────────┤
│ ABOUT SUB-NAV (tabs or inline links)                            │
│  [Overview] [Leadership] [Governance] [Membership]              │
├─────────────────────────────────────────────────────────────────┤
│ MAIN CONTENT (reading column: 8 of 12 cols, offset 2)          │
│  H2: Our History                                                │
│  Body paragraphs...                                             │
│  ---                                                            │
│  H2: Vision & Mission                                           │
│  H3: Vision                                                     │
│  Body...                                                        │
│  H3: Mission                                                    │
│  Body...                                                        │
│  ---                                                            │
│  H2: Core Values                                                │
│  Value grid (3 columns): icon + title + description per value   │
├─────────────────────────────────────────────────────────────────┤
│ CTA STRIP: "Join AMIS FCT" → [Register Your School]            │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

### PG03 — Leadership (`/about/leadership`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C03 PAGE HERO]                                                 │
│  [C21 BREADCRUMB: Home > About > Leadership]                    │
│  H1: Executive Council                                          │
├─────────────────────────────────────────────────────────────────┤
│ ABOUT SUB-NAV: [Overview] [Leadership ●] [Governance] [Membership]│
├─────────────────────────────────────────────────────────────────┤
│ LEADERSHIP GRID (3 cols on desktop, 2 on tablet, 1 on mobile)  │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │ [Portrait photo] │  │ [Portrait photo] │  │[Portrait ph] │  │
│  │ Name (H5 bold)   │  │ Name             │  │ Name         │  │
│  │ Title (medium)   │  │ Title            │  │ Title        │  │
│  │ Short bio (body-sm)  Bio               │  │ Bio          │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
│   (repeat for all executive members)                            │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

### PG04 — School Directory (`/schools`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C03 PAGE HERO]                                                 │
│  [C21 BREADCRUMB: Home > Schools]                               │
│  H1: Find a Member School                                       │
│  Body: X approved schools across FCT's 6 Area Councils.        │
├─────────────────────────────────────────────────────────────────┤
│ FILTER BAR (sticky on scroll)                                   │
│  [C06 Search bar: Search by name...]                            │
│  [C05 Filters: Area Council ▾]  [School Level ▾]  [Clear filters]│
│  Result count: "Showing 28 schools"                             │
├─────────────────────────────────────────────────────────────────┤
│ SCHOOL GRID (4 cols desktop, 2 cols tablet, 1 col mobile)       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │[C04 SCH] │  │[C04 SCH] │  │[C04 SCH] │  │[C04 SCH] │       │
│  │ Card     │  │ Card     │  │ Card     │  │ Card     │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│  (...repeat for all matching schools...)                        │
├─────────────────────────────────────────────────────────────────┤
│ [C28 PAGINATION]                                                │
├─────────────────────────────────────────────────────────────────┤
│ REGISTER TEASER                                                 │
│  Body: Is your school not listed?  [Register Your School →]     │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile:** Filters collapse to "Filter (X)" button → bottom sheet. Grid becomes 1 column, full-width cards.

---

### PG05 — School Profile (`/schools/[slug]`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C21 BREADCRUMB: Home > Schools > Government Model Islamic ...]  │
├─────────────────────────────────────────────────────────────────┤
│ SCHOOL HEADER (parchment bg)                                    │
│  ┌─ LEFT (col 1–8) ───────────────────┐  ┌─ RIGHT (col 9–12) ─┐ │
│  │ School Logo / Photo (rounded-xl)   │  │ [School photo full]│ │
│  │ H1: [School Name]                  │  │                    │ │
│  │ [Tag: Primary] [Tag: Active Member]│  │                    │ │
│  │ Area Council: Bwari                │  │                    │ │
│  │ Arms: Primary, JSS                 │  │                    │ │
│  │ Year Established: 1989             │  │                    │ │
│  │ Principal: Malam Umar Farouk       │  └────────────────────┘ │
│  │                                    │                         │
│  │ 📞 [Phone — tappable tel: link]    │                         │
│  │ ✉  [Email — mailto: link]          │                         │
│  └────────────────────────────────────┘                         │
├─────────────────────────────────────────────────────────────────┤
│ ABOUT THIS SCHOOL (card, 8/12 cols, offset 2)                   │
│  H2: About the School                                           │
│  Body: [School description — admin-editable]                    │
├─────────────────────────────────────────────────────────────────┤
│ LOCATION MAP (full-width card)                                  │
│  H2: Location                                                   │
│  [Embedded Google Map — rounded-xl]                             │
│  Body: Physical address in full                                 │
├─────────────────────────────────────────────────────────────────┤
│ ACTION LINKS (muted, at bottom)                                 │
│  [← Back to School Directory]    [Report incorrect information] │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

### PG06 — Register a School (`/register`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C03 PAGE HERO]                                                 │
│  H1: Register Your School with AMIS FCT                         │
│  Body: What to expect after submitting your application.        │
├─────────────────────────────────────────────────────────────────┤
│ MULTI-STEP FORM (container--form: max 768px, centred)           │
│                                                                 │
│  Step indicator: ① School Details  ②─ Contact  ③─ Description  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  [C12 REGISTRATION FORM — STEP 1 shown]                         │
│                                                                 │
│  School Name *                                                  │
│  [                                    ]                         │
│                                                                 │
│  Area Council *            Year Established *                   │
│  [Dropdown ▾            ]  [     YYYY     ]                     │
│                                                                 │
│  School Arms * (select all that apply)                          │
│  ☐ Nursery   ☐ Primary   ☐ JSS   ☐ SSS                         │
│                                                                 │
│  Principal Name *                                               │
│  [                                    ]                         │
│                                                                 │
│                           [Next: Contact Details →]             │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Review notice: "Your application will be reviewed within 5     │
│  working days. You will receive an email with the outcome."     │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Success state (after submit):**
```
┌─────────────────────────────────────────────────────────────────┐
│  [C33 SUCCESS ALERT: Application received]                      │
│  H2: Application Submitted                                      │
│  Body: Thank you. We have received your application for         │
│  [School Name]. You will receive a confirmation email at        │
│  [email] shortly, and we will notify you of our decision        │
│  within 5 working days.                                         │
│  [← Back to School Directory]                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### PG07 — News Listing (`/news`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C03 PAGE HERO]                                                 │
│  H1: News & Announcements                                       │
├─────────────────────────────────────────────────────────────────┤
│ [C29 CATEGORY TABS]                                             │
│  All | Official Circular | Press Release | Achievement | General │
├─────────────────────────────────────────────────────────────────┤
│ NEWS GRID (3 cols desktop, 2 tablet, 1 mobile)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │[C07 Featured]│  │ [C07 Card  ] │  │ [C07 Card  ] │          │
│  │(larger image)│  │              │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ [C07 Card  ] │  │ [C07 Card  ] │  │ [C07 Card  ] │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  (... etc. 10 per page ...)                                     │
├─────────────────────────────────────────────────────────────────┤
│ [C28 PAGINATION]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

### PG08 — News Post (`/news/[slug]`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C21 BREADCRUMB: Home > News > Post Title...]                   │
├─────────────────────────────────────────────────────────────────┤
│ ARTICLE HEADER (reading column: col 2–11)                       │
│  [C32 CATEGORY BADGE: Official Circular]                        │
│  H1: [Post Title]                                               │
│  Meta: 14 May 2026 · By Secretary General                       │
│  [Featured image — full-width, rounded-xl, 16:9]               │
├─────────────────────────────────────────────────────────────────┤
│ ARTICLE BODY (reading column: col 3–10, max 680px)              │
│  [Rich text body content]                                       │
│                                                                 │
│  [If Circular category:]                                        │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ 📄 Download Circular (PDF, 245 KB)                     │    │
│  └────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│ SHARE BAR                                                       │
│  Share on: [WhatsApp] [Facebook] [Twitter/X]                    │
├─────────────────────────────────────────────────────────────────┤
│ RELATED POSTS                                                   │
│  H2: Related Posts                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ [C07 Card  ] │  │ [C07 Card  ] │  │ [C07 Card  ] │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

### PG09 — Events Listing (`/events`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C03 PAGE HERO]                                                 │
│  H1: Events                                                     │
│  Body: Competitions, workshops, and association meetings.       │
├─────────────────────────────────────────────────────────────────┤
│ [C29 FILTER TABS]                                               │
│  All | Student Competition | Teacher PD | Meeting | Public      │
├─────────────────────────────────────────────────────────────────┤
│ EVENTS LIST (timeline layout on desktop: date column + event)   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ [C08 EVENT CARD — full-width list variant]             │    │
│  │ [Date block left] [Title + type + location + excerpt]  │    │
│  └────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ [C08 EVENT CARD]                                       │    │
│  └────────────────────────────────────────────────────────┘    │
│  (...repeat for upcoming events...)                             │
├─────────────────────────────────────────────────────────────────┤
│ PAST EVENTS LINK                                                │
│  Body: Looking for past events?  [Browse Event Archive →]       │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

### PG10 — Event Detail (`/events/[slug]`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C21 BREADCRUMB: Home > Events > Event Title]                   │
├─────────────────────────────────────────────────────────────────┤
│ EVENT HEADER                                                    │
│  ┌─ LEFT (col 1–8) ───────────────────┐  ┌─ RIGHT (col 9–12) ─┐ │
│  │ [C32 TYPE BADGE: Student Competition]   KEY DETAILS CARD    │ │
│  │ H1: [Event Title]                  │  │ Date: 12 June 2026 │ │
│  │                                    │  │ Time: 09:00–16:00  │ │
│  │ Body: Full event description       │  │ Location: [Name]   │ │
│  │       ...                          │  │ [Map Link]         │ │
│  │                                    │  │                    │ │
│  │ H2: How to Register                │  │ [Add to Calendar]  │ │
│  │ Body: Contact PRO at 08...         │  │ [Share WhatsApp]   │ │
│  │                                    │  │ [Share Facebook]   │ │
│  └────────────────────────────────────┘  └────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ BACK LINK: [← Back to Events]                                   │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

### PG11 — Resources Hub (`/resources`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C03 PAGE HERO]                                                 │
│  H1: Resources                                                  │
│  Body: Official documents, curriculum guides, and forms.        │
├─────────────────────────────────────────────────────────────────┤
│ CATEGORY CARDS (2×2 grid on desktop, 2×2 on tablet, 1 col mobile)│
│  ┌───────────────────────┐  ┌───────────────────────┐           │
│  │ 📋 Official Circulars │  │ 📅 Academic Calendar  │           │
│  │ Body: Latest official │  │ Body: Current year    │           │
│  │ directives from AMIS  │  │ calendar for FCT      │           │
│  │ [Browse Circulars →]  │  │ [Download Calendar →] │           │
│  └───────────────────────┘  └───────────────────────┘           │
│  ┌───────────────────────┐  ┌───────────────────────┐           │
│  │ 📚 Curriculum Guides  │  │ 📝 Forms & Templates  │           │
│  │ Body: By subject and  │  │ Body: Admission forms,│           │
│  │ school level          │  │ application templates │           │
│  │ [Browse Guides →]     │  │ [Browse Forms →]      │           │
│  └───────────────────────┘  └───────────────────────┘           │
├─────────────────────────────────────────────────────────────────┤
│ LATEST CIRCULARS PREVIEW                                        │
│  H2: Recent Circulars                    [View All Circulars →] │
│  [C09 Download Row]                                             │
│  [C09 Download Row]                                             │
│  [C09 Download Row]                                             │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

### PG12 — Circulars (`/resources/circulars`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C03 PAGE HERO]                                                 │
│  [C21 BREADCRUMB: Home > Resources > Circulars]                 │
│  H1: Official Circulars                                         │
├─────────────────────────────────────────────────────────────────┤
│ SORT / FILTER BAR                                               │
│  Sort by: [Newest First ▾]    Year: [2026 ▾]                   │
│  Showing X circulars                                            │
├─────────────────────────────────────────────────────────────────┤
│ CIRCULAR LIST (grouped by year)                                 │
│  H3: 2026                                                       │
│  [C09 Download Row: Circular 14/2026 · 14 May 2026 · PDF 180KB]│
│  [C09 Download Row: Circular 13/2026 · 03 May 2026 · PDF 210KB]│
│  [C09 Download Row: Circular 12/2026 · 20 Apr 2026 · PDF 155KB]│
│  ...                                                            │
│  H3: 2025                                                       │
│  [C09 Download Row]                                             │
│  ...                                                            │
├─────────────────────────────────────────────────────────────────┤
│ [C28 PAGINATION if needed]                                      │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

### PG13 — Contact (`/contact`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C03 PAGE HERO]                                                 │
│  H1: Contact Us                                                 │
├─────────────────────────────────────────────────────────────────┤
│ CONTACT LAYOUT                                                  │
│  ┌─ LEFT (col 1–7): FORM ─────────────────┐  ┌─ RIGHT (col 8–12)┐│
│  │ H2: Send us a message                  │  │ H2: Our Office   ││
│  │ [C11 CONTACT FORM]                     │  │ [Google Map]     ││
│  │                                        │  │                  ││
│  └────────────────────────────────────────┘  │ Address          ││
│                                             │ Phone            ││
│                                             │ Email            ││
│                                             │                  ││
│                                             │ H3: Key Contacts ││
│                                             │ General:         ││
│                                             │ Media:           ││
│                                             │ Membership:      ││
│                                             │                  ││
│                                             │ Social: [icons]  ││
│                                             └──────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile:** Stacks to single column: form first, then office details below.

---

### PG14 — Privacy Policy (`/privacy-policy`)

```
┌─────────────────────────────────────────────────────────────────┐
│ [C01 GLOBAL NAV]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [C21 BREADCRUMB: Home > Privacy Policy]                         │
│ H1: Privacy Policy                                              │
│ Last updated: [date]                                            │
├─────────────────────────────────────────────────────────────────┤
│ CONTENT (reading column: container--sm, max 640px, centred)     │
│  [Long-form legal text, with H2 section headings]               │
│  Sections: Data collected · How we use it · Storage · Rights... │
├─────────────────────────────────────────────────────────────────┤
│ [C22 FOOTER]                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## ADMIN PAGES

---

### ADM01 — Admin Login (`/admin/login`)

```
┌─────────────────────────────────────────────────────────────────┐
│ FULL PAGE centred layout (no public nav, no public footer)      │
│                                                                 │
│                    ┌────────────────────────────┐               │
│                    │  [AMIS FCT Logo]            │               │
│                    │  H1: Admin Sign In          │               │
│                    │                             │               │
│                    │  Email address *            │               │
│                    │  [                       ]  │               │
│                    │                             │               │
│                    │  Password *                 │               │
│                    │  [                    👁  ]  │               │
│                    │                             │               │
│                    │  [Sign In  ▶ ]              │               │
│                    │                             │               │
│                    │  [C33 Error alert if wrong] │               │
│                    └────────────────────────────┘               │
│                                                                 │
│  bg: `--color-admin-bg` (light gray), card: white, centred     │
└─────────────────────────────────────────────────────────────────┘
```

Note: No "Forgot password?" on the public login — password reset is admin-managed. If lockout occurs (5 failures), error states "Account locked for 15 minutes."

---

### ADM02 — Admin Dashboard Overview (`/admin/dashboard`)

```
┌──────────────┬──────────────────────────────────────────────────┐
│ [C13 SIDEBAR]│ ADMIN TOPBAR: [Hamburger] AMIS FCT Admin  [User▾]│
│              ├──────────────────────────────────────────────────┤
│  Dashboard   │ H1: Dashboard                                    │
│  ──────────  │ Body-sm: Welcome back, Zainab                    │
│  Schools ③   │                                                  │
│  Dues        │ STATS ROW (4 KPI cards)                          │
│  ──────────  │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐│
│  News        │ │Pending   │ │Dues Paid │ │Unread    │ │Active││
│  Events      │ │Apps: 3   │ │12/38     │ │Enquiries │ │Schls ││
│  Resources   │ │[View all]│ │[Dues ▶]  │ │  5       │ │  38  ││
│  Gallery     │ └──────────┘ └──────────┘ └──────────┘ └──────┘│
│  ──────────  │                                                  │
│  Notifs      │ CONTENT ROW (2 columns)                          │
│  ──────────  │ ┌─ LEFT (8 cols) ─────────────┐ ┌─ RIGHT (4) ─┐ │
│  Enquiries   │ │ H2: Pending Applications (3) │ │H2: Recent  │ │
│  ──────────  │ │ [Table: name, LGA, date, ▶]  │ │ Activity   │ │
│  Users       │ │ [View all pending →]         │ │            │ │
│  Audit Log   │ └──────────────────────────────┘ │ List of    │ │
│              │                                  │ last 5     │ │
│  ──────────  │ ┌─ LEFT (8 cols) ─────────────┐ │ admin      │ │
│  Sign out    │ │ H2: Dues Summary 2025/26     │ │ actions    │ │
│              │ │ [C20 Summary strip:          │ └────────────┘ │
│              │ │  Total ₦X | Partial ₦Y | Out]│                │
│              │ │ [View Dues →]                │                │
│              │ └──────────────────────────────┘                │
└──────────────┴──────────────────────────────────────────────────┘
```

---

### ADM03 — Schools List (`/admin/schools`)

```
┌──────────────┬──────────────────────────────────────────────────┐
│ [C13 SIDEBAR]│ H1: Schools                                      │
│              │ [Tab: Approved (38)] [Tab: Pending (3)]          │
│              ├──────────────────────────────────────────────────┤
│              │ FILTER BAR: [Search by name] [LGA▾] [Level▾]    │
│              ├──────────────────────────────────────────────────┤
│              │ [C14 ADMIN DATA TABLE]                           │
│              │ School Name | LGA | Arms | Level | Status | Date │
│              │ [row]       |     |      |       | Approved|     │
│              │ [Edit] [Remove]                                  │
│              │ ...                                              │
│              ├──────────────────────────────────────────────────┤
│              │ [C28 PAGINATION]                                 │
└──────────────┴──────────────────────────────────────────────────┘
```

**Pending tab** (`/admin/schools/pending`): Same table structure, Action column shows [Review] button only.

---

### ADM04 — School Application Detail (`/admin/schools/pending/[id]`)

```
┌──────────────┬──────────────────────────────────────────────────┐
│ [C13 SIDEBAR]│ [← Back to Pending Applications]                │
│              │ H1: Application Review                          │
│              │ Submitted: 14 May 2026 14:32                    │
│              ├──────────────────────────────────────────────────┤
│              │ ┌─ LEFT (8 cols) ─────────────────────┐          │
│              │ │ ALL SUBMITTED FIELDS (read-only)    │          │
│              │ │ School Name: [value]                │          │
│              │ │ Area Council: [value]               │          │
│              │ │ Arms: Primary, JSS                  │          │
│              │ │ Year Established: [value]           │          │
│              │ │ Principal: [value]                  │          │
│              │ │ Email: [value]   Phone: [value]     │          │
│              │ │ Address: [value]                    │          │
│              │ │ Description: [value text]           │          │
│              │ └─────────────────────────────────────┘          │
│              │                                                  │
│              │ ┌─ RIGHT (4 cols) ────────────────────┐          │
│              │ │ [School Photo uploaded]             │          │
│              │ │ (full size)                         │          │
│              │ └─────────────────────────────────────┘          │
│              ├──────────────────────────────────────────────────┤
│              │ [C19 APPROVAL ACTION BUTTONS]                    │
│              │ [✓ Approve]  [? Request More Info]  [✗ Reject]   │
│              │ (green)      (amber)                (red)        │
└──────────────┴──────────────────────────────────────────────────┘
```

---

### ADM05 — Dues Management (`/admin/dues`)

```
┌──────────────┬──────────────────────────────────────────────────┐
│ [C13 SIDEBAR]│ H1: Dues Management                             │
│              │                                                  │
│              │ ACADEMIC YEAR SELECTOR: [2025/2026 ▾]           │
│              │                                                  │
│              │ [C20 SUMMARY STRIP]                              │
│              │ ┌─────────────┐ ┌───────────────┐ ┌──────────┐  │
│              │ │Total: ₦247K │ │Partial: ₦48K  │ │Out: ₦182K│  │
│              │ │ (12 schools)│ │(4 schools)    │ │(22 schs) │  │
│              │ └─────────────┘ └───────────────┘ └──────────┘  │
│              │                                                  │
│              │ FILTER BAR: [LGA▾] [Tier▾] [Status▾] [Export CSV]│
│              │                                                  │
│              │ [C14 DATA TABLE]                                 │
│              │ School | LGA | Arms | Tier | Amount | Paid | Bal │
│              │        |     |      |      | ₦5,000 | ₦5K  |  0 │
│              │ [C15 BADGE: Paid]                                │
│              │ Actions: [Update]                                │
│              │ ...                                              │
│              │                                                  │
│              │ [C28 PAGINATION]                                 │
└──────────────┴──────────────────────────────────────────────────┘
```

---

### ADM06 — News Post Editor (`/admin/news/new` and `/admin/news/[id]/edit`)

```
┌──────────────┬──────────────────────────────────────────────────┐
│ [C13 SIDEBAR]│ H1: New Post / Edit: [Post Title]                │
│              │ Auto-save: "Saved 2 minutes ago"                 │
│              ├──────────────────────────────────────────────────┤
│              │ ┌─ MAIN (col 1–8) ───────────────┐ ┌─ SIDEBAR ─┐│
│              │ │ Title *                         │ │ Status    ││
│              │ │ [                             ] │ │ [Draft▾]  ││
│              │ │                                 │ │           ││
│              │ │ [C17 RICH TEXT EDITOR]          │ │ Publish   ││
│              │ │ [B I U | H2 H3 | ≡ 1. | 🔗 🖼 ] │ │ Date:     ││
│              │ │ [                             ] │ │ [Date 📅] ││
│              │ │ [                             ] │ │           ││
│              │ │ ...                             │ │ Category  ││
│              │ │                                 │ │ [Select▾] ││
│              │ │ Featured Image                  │ │           ││
│              │ │ [C18 FILE UPLOAD]               │ │ Tags      ││
│              │ │                                 │ │ [Add tags]││
│              │ │ PDF Attachment (for Circulars)  │ │           ││
│              │ │ [C18 FILE UPLOAD]               │ │ Meta SEO  ││
│              │ │                                 │ │ [Title  ] ││
│              │ │                                 │ │ [Desc.  ] ││
│              │ └─────────────────────────────────┘ │           ││
│              │                                     │ [Preview] ││
│              │                                     │ [Publish] ││
│              │                                     └───────────┘│
└──────────────┴──────────────────────────────────────────────────┘
```

---

### ADM07 — Notification Composer (`/admin/notifications`)

```
┌──────────────┬──────────────────────────────────────────────────┐
│ [C13 SIDEBAR]│ [C29 TABS: Compose | History]                   │
│              ├──────────────────────────────────────────────────┤
│              │ COMPOSE TAB                                      │
│              │                                                  │
│              │ Subject *                                        │
│              │ [                                              ] │
│              │                                                  │
│              │ Audience *                                       │
│              │ ○ All member schools                             │
│              │ ○ By Area Council: [Bwari ×] [Kuje ×] [+ Add]  │
│              │ ○ By School Arm:   [SSS ×] [+ Add]              │
│              │ ○ By Dues Status:  [Unpaid ×]                   │
│              │ ○ Individual school: [Search by name...]         │
│              │                                                  │
│              │ Recipient preview: "23 schools will receive this"│
│              │                                                  │
│              │ Message *                                        │
│              │ [C17 RICH TEXT EDITOR]                           │
│              │                                                  │
│              │ Attachment (optional)                            │
│              │ [C18 FILE UPLOAD: PDF only]                      │
│              │                                                  │
│              │ Send options:                                    │
│              │ ○ Send Now                                       │
│              │ ○ Schedule: [Date 📅] [Time ⏰]                  │
│              │                                                  │
│              │             [Send Notification ▶] [Save Draft]  │
└──────────────┴──────────────────────────────────────────────────┘
```

**History tab:** Table showing past notifications — Date, Subject, Audience, Sent By, Delivered/Failed counts. [View Report] action per row.

---

### ADM08 — Admin Settings (`/admin/dues/settings` and `/admin/users`)

```
┌──────────────┬──────────────────────────────────────────────────┐
│ [C13 SIDEBAR]│ H1: Settings                                    │
│              │                                                  │
│              │ [C29 TABS: Dues Amounts | Admin Users]          │
│              ├──────────────────────────────────────────────────┤
│              │ DUES AMOUNTS TAB                                 │
│              │                                                  │
│              │ Academic Year: [2025/2026 ▾]                    │
│              │                                                  │
│              │ ┌──────────────────────────────────────────┐    │
│              │ │ Tier 1 (Nursery only)   ₦ [       ]      │    │
│              │ │ Tier 2 (Primary highest) ₦ [       ]     │    │
│              │ │ Tier 3 (JSS highest)    ₦ [       ]      │    │
│              │ │ Tier 4 (SSS highest)    ₦ [       ]      │    │
│              │ └──────────────────────────────────────────┘    │
│              │                                                  │
│              │ [Save Dues Amounts]                              │
│              │                                                  │
│              │ Active Member badge: ○ Show publicly ○ Hide     │
│              ├──────────────────────────────────────────────────┤
│              │ ADMIN USERS TAB (Super Admin only)               │
│              │                                                  │
│              │ [+ Add Admin User]                               │
│              │                                                  │
│              │ [C14 TABLE: Name | Email | Role | Last Login     │
│              │  | Status | Actions: Edit / Deactivate]         │
└──────────────┴──────────────────────────────────────────────────┘
```

---

### ADM09 — Gallery Management (`/admin/gallery/new`)

```
┌──────────────┬──────────────────────────────────────────────────┐
│ [C13 SIDEBAR]│ H1: New Album                                   │
│              │                                                  │
│              │ Album Title *                                    │
│              │ [                                             ]  │
│              │                                                  │
│              │ Date *              Linked Event (optional)      │
│              │ [Date picker 📅]    [Search events...    ▾]     │
│              │                                                  │
│              │ Cover Photo *                                    │
│              │ [C18 FILE UPLOAD — single image]                │
│              │                                                  │
│              │ Album Photos * (bulk upload)                     │
│              │ [C18 FILE UPLOAD — multiple images]             │
│              │                                                  │
│              │ [Thumbnail grid of uploaded photos]              │
│              │ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│              │ │img │ │img │ │img │ │img │ │img │ │img │     │
│              │ │[alt]│ │[alt]│ │[alt]│ ...                    │
│              │ └────┘ └────┘ └────┘                            │
│              │                                                  │
│              │          [Save Draft]  [Publish Album ▶]        │
└──────────────┴──────────────────────────────────────────────────┘
```

---

### ADM10 — Resources Upload (`/admin/resources/upload`)

```
┌──────────────┬──────────────────────────────────────────────────┐
│ [C13 SIDEBAR]│ H1: Upload Resource                             │
│              │                                                  │
│              │ Title *                                          │
│              │ [                                             ]  │
│              │                                                  │
│              │ Category *                                       │
│              │ ○ Official Circular  ○ Academic Calendar        │
│              │ ○ Curriculum Guide   ○ Form & Template          │
│              │                                                  │
│              │ Circular Number (if Circular category)          │
│              │ [Circular XX/YYYY                             ]  │
│              │                                                  │
│              │ Date *                                           │
│              │ [Date picker 📅]                                 │
│              │                                                  │
│              │ File * (PDF, max 10MB)                          │
│              │ [C18 FILE UPLOAD]                               │
│              │ File size auto-detected after upload             │
│              │                                                  │
│              │          [Cancel]  [Upload & Publish ▶]         │
└──────────────┴──────────────────────────────────────────────────┘
```
