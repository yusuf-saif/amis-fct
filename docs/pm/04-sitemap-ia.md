# Site Map & Information Architecture
## AMIS FCT Website Rebuild — amisfct.org

**Prepared by:** Product / PM
**Date:** 2026-05-13

---

## 1. IA Design Principles

1. **Shallow depth** — No page should be more than 3 clicks from the homepage. Parents and students should not have to navigate deeply.
2. **Task-first labels** — Navigation labels answer "what can I do here?" not "what department owns this?" ("Find a School" over "Directory").
3. **Progressive disclosure** — Landing pages provide summaries; detail pages provide depth. Don't front-load information.
4. **Mobile-first hierarchy** — Navigation collapses gracefully to 5 primary items maximum on mobile.
5. **Content types are consistent** — News, Events, Schools, and Resources each have the same structural pattern (list → detail).
6. **Discoverability** — Every major content type is reachable from the homepage and from the global navigation.

---

## 2. Full Site Map

```
amisfct.org/
│
├── / (Homepage)
│   ├── Hero Banner — Mission statement + 2 CTAs
│   ├── About Teaser — 2-sentence summary + "Learn More" link
│   ├── Latest News — 3 most recent posts (auto)
│   ├── Upcoming Events — 3 nearest events (auto)
│   ├── School Directory Teaser — member count + "Find a School" CTA
│   ├── Photo Gallery Preview — 6 recent photos + "View Gallery" link
│   ├── Newsletter Signup — name + email + consent
│   └── Footer (global)
│
├── /about
│   ├── /about (Overview — renders as page with tabbed or anchor navigation)
│   │   ├── Our History
│   │   ├── Vision & Mission
│   │   └── Core Values
│   ├── /about/leadership
│   │   └── Executive Council — grid of named, titled, photographed leaders
│   ├── /about/governance
│   │   ├── Structure / Organogram
│   │   └── Downloads (constitution, registration docs)
│   └── /about/membership (what it means to be a member school)
│
├── /schools
│   ├── /schools (Directory — searchable, filterable list)
│   │   ├── Search bar
│   │   ├── Filter: Area Council / Zone
│   │   ├── Filter: Level (Primary / Secondary / Both)
│   │   └── School cards (name, area, level, photo, phone)
│   └── /schools/[school-slug] (Individual School Profile)
│       ├── School name + logo/photo
│       ├── Address + map embed
│       ├── Contact details (phone, email)
│       ├── Level, year established, principal name
│       ├── About the school (short description)
│       └── ← Back to Schools Directory
│
├── /news
│   ├── /news (News & Announcements — blog list, newest first)
│   │   ├── Category filter tabs: All / Circulars / Press Release / Achievements
│   │   └── Post cards (title, date, category, excerpt, featured image)
│   └── /news/[post-slug] (Individual Post)
│       ├── Title, date, category, author
│       ├── Featured image
│       ├── Body content
│       ├── Social share (WhatsApp, Facebook, Twitter/X)
│       └── Related posts (3 items)
│
├── /events
│   ├── /events (Events Calendar — upcoming list view, default)
│   │   ├── View toggle: List / Month calendar (Should Have)
│   │   ├── Filter: All / Student Competitions / Teacher PD / Meetings / Public
│   │   └── Event cards (title, date, location, type)
│   ├── /events/[event-slug] (Individual Event Detail)
│   │   ├── Title, date/time, location
│   │   ├── Event type badge
│   │   ├── Full description
│   │   ├── How to register / contact
│   │   ├── Add to Calendar (.ics)
│   │   └── Share (WhatsApp, Facebook)
│   └── /events/archive (Past Events — same layout, historical)
│
├── /resources
│   ├── /resources (Hub page — 4 category cards)
│   ├── /resources/circulars (Official Circulars & Letters — sortable by date)
│   ├── /resources/academic-calendar (Current academic calendar — PDF download + embedded preview)
│   ├── /resources/curriculum (Curriculum Guides — by subject and level)
│   └── /resources/forms (Forms & Templates — admission forms, membership forms, etc.)
│
├── /gallery
│   ├── /gallery (Albums grid — sorted by date, newest first)
│   └── /gallery/[album-slug] (Album detail — photo grid with lightbox)
│
├── /contact
│   ├── General enquiry form
│   ├── Address + embedded Google Map
│   ├── Phone + email (by department)
│   └── Social media links
│
└── /legal (footer-only links)
    ├── /privacy-policy
    └── /cookie-policy
```

---

## 3. Global Navigation (Primary)

The global navigation bar appears on all pages. On mobile it collapses to a hamburger menu.

**Desktop navigation (5 items):**

| Label | URL | Dropdown? |
|---|---|---|
| Home | / | No |
| About | /about | Yes (History, Leadership, Governance) |
| Schools | /schools | No (goes to directory) |
| News & Events | — | Yes (News, Events, Gallery) |
| Resources | /resources | Yes (Circulars, Calendar, Curriculum, Forms) |
| Contact | /contact | No |

**Utility bar (top-right on desktop, collapsed on mobile):**
- Search icon → site-wide search overlay
- Newsletter signup shortcut (icon + "Subscribe")
- Social icons (Facebook, Twitter/X, WhatsApp)

**Mobile navigation (hamburger):**
- Flat list: Home, About, Schools, News, Events, Resources, Gallery, Contact
- Search at top of mobile menu

---

## 4. Footer Navigation

The footer appears on all pages and provides a secondary navigation layer.

**Footer columns:**

| Column | Links |
|---|---|
| About AMIS FCT | Our History, Vision & Mission, Leadership, Governance |
| Schools | School Directory, Join as a Member School |
| News & Media | Latest News, Events, Photo Gallery |
| Resources | Circulars, Academic Calendar, Curriculum Guides, Forms |
| Get in Touch | Contact Us, Subscribe to Newsletter |
| Legal | Privacy Policy, Cookie Policy |

**Footer bottom bar:**
- © 2026 Association of Model Islamic Schools, FCT. All rights reserved.
- Official address
- Phone / Email
- Social icons

---

## 5. Breadcrumb Pattern

Breadcrumbs appear on all pages deeper than level 1 to aid wayfinding.

Examples:
```
Home > About > Leadership
Home > Schools > Government Model Islamic Secondary School, Kuje
Home > News > AMIS FCT Hosts Annual Quiz Competition 2026
Home > Events > Inter-School Islamic Studies Olympiad 2026
Home > Resources > Circulars
```

---

## 6. URL Structure

| Page | URL Pattern | Notes |
|---|---|---|
| Homepage | `/` | |
| About Overview | `/about` | |
| Leadership | `/about/leadership` | |
| Governance | `/about/governance` | |
| School Directory | `/schools` | |
| School Profile | `/schools/govt-model-islamic-secondary-kuje` | Slug from school name |
| News Listing | `/news` | |
| News Post | `/news/amis-fct-quiz-competition-2026` | Slug from post title |
| Events Listing | `/events` | |
| Event Detail | `/events/inter-school-olympiad-2026` | Slug from event title |
| Events Archive | `/events/archive` | |
| Resources Hub | `/resources` | |
| Circulars | `/resources/circulars` | |
| Academic Calendar | `/resources/academic-calendar` | |
| Gallery Albums | `/gallery` | |
| Gallery Album | `/gallery/inter-school-competition-2025` | |
| Contact | `/contact` | |
| Privacy Policy | `/privacy-policy` | |

---

## 7. Content Types & Relationships

```
Content Type        Parent / Related
─────────────────────────────────────────
School Profile      ← referenced by: Directory, News posts (tag), Events (location)
News Post           ← tagged with: School, Category, Event
Event               ← tagged with: Type, School(s) involved
Resource File       ← categorised by: Circulars / Calendar / Curriculum / Forms
Gallery Album       ← linked to: Event (optional)
Executive Member    ← belongs to: Leadership page
```

---

## 8. CMS Page Hierarchy (WordPress / Headless)

```
Pages (static)
├── Home
├── About (parent)
│   ├── Leadership (child)
│   └── Governance (child)
├── Contact
├── Resources (parent)
│   ├── Academic Calendar (child)
│   ├── Circulars (child)
│   ├── Curriculum (child)
│   └── Forms (child)
├── Privacy Policy
└── Cookie Policy

Custom Post Types
├── Schools (CPT: school)
├── Events (CPT: event — or use The Events Calendar plugin)
└── Gallery Albums (CPT: album, with sub-photos)

Standard Post Type
└── News & Announcements (with Categories: General, Circular, Press Release, Achievement)
```

---

## 9. Information Hierarchy per Key Page

### Homepage — F-Pattern Reading
```
[LOGO + NAV]
[HERO: Mission + CTA "Find a School" | CTA "Latest News"]
[ABOUT: 2-sentence teaser | "Learn More"]
[NEWS: 3 post cards — image, title, date, excerpt]
[EVENTS: 3 event cards — title, date, location, type]
[SCHOOLS: "X Member Schools across FCT" + search bar + "Browse All"]
[GALLERY: 6 photo thumbnails + "View Gallery"]
[NEWSLETTER: headline, sub, email field, submit]
[FOOTER]
```

### School Directory — Inverted Pyramid
```
[TITLE + intro paragraph]
[SEARCH BAR — prominent, auto-focus on mobile]
[FILTERS: Area Council | School Level | (clear filters)]
[RESULTS COUNT: "Showing 24 schools"]
[SCHOOL CARDS: photo, name, zone, level, phone, "View Profile" link]
[PAGINATION]
```

### Individual School Profile — Details First
```
[SCHOOL NAME + LOGO/PHOTO]
[KEY FACTS BAR: Zone | Level | Year Est. | Principal]
[CONTACT BAR: Phone | Email | "Open in Maps" link]
[ABOUT: 2–3 paragraphs]
[MAP EMBED]
[← Back to All Schools]
```

### News Post — Standard Article
```
[CATEGORY BADGE]
[TITLE (H1)]
[DATE | AUTHOR]
[FEATURED IMAGE]
[BODY CONTENT]
[SHARE BAR: WhatsApp | Facebook | Twitter/X]
[RELATED POSTS: 3 cards]
```

---

## 10. Navigation Flow Diagram (Key Journeys)

### Parent Finding a School
```
Google "Islamic school Kubwa Abuja"
→ /schools (directory, pre-filtered to Area Council)
→ /schools/govt-model-islamic-primary-kubwa (school profile)
→ Tap phone number to call
```

### Teacher Finding a Circular
```
Homepage
→ Resources (nav)
→ /resources/circulars
→ Download PDF (Circular #12/2026 — Academic Calendar)
```

### Student Checking Events
```
Homepage
→ Upcoming Events section (or direct "Events" nav link)
→ /events (filtered to "Student Competitions")
→ /events/islamiyya-quiz-competition-2026 (detail)
→ Download .ics / Share on WhatsApp
```

### Official Verifying Governance
```
Google "AMIS FCT Nigeria"
→ Homepage
→ About → /about
→ /about/leadership (council bios)
→ /about/governance (download constitution PDF)
```
