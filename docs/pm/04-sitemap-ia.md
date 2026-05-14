# Site Map & Information Architecture

## AMIS FCT Website Rebuild — amisfct.org

**Prepared by:** Product / PM
**Date:** 2026-05-13
**Revised:** 2026-05-14

---

## 1. IA Design Principles

1. **Shallow depth** — No page should be more than 3 clicks from the homepage. Parents and students should not have to navigate deeply.
2. **Task-first labels** — Navigation labels answer "what can I do here?" not "what department owns this?" ("Find a School" over "Directory").
3. **Progressive disclosure** — Landing pages provide summaries; detail pages provide depth. Don't front-load information.
4. **Mobile-first hierarchy** — Navigation collapses gracefully to 5 primary items maximum on mobile.
5. **Content types are consistent** — News, Events, Schools, and Resources each have the same structural pattern (list → detail).
6. **Discoverability** — Every major content type is reachable from the homepage and from the global navigation.
7. **Admin separation** — The admin dashboard lives at a distinct path (`/admin`), is never linked from the public site, and requires authentication. It is architecturally separate from the public-facing site map.

---

## 2. Full Site Map — Public

```text
amisfct.org/
│
├── / (Homepage)
│   ├── Hero Banner — Mission statement + 2 CTAs
│   ├── About Teaser — 2-sentence summary + "Learn More" link
│   ├── Latest News — 3 most recent posts (dynamic)
│   ├── Upcoming Events — 3 nearest events (dynamic)
│   ├── School Directory Teaser — approved member count + "Find a School" CTA
│   ├── Photo Gallery Preview — 6 recent photos + "View Gallery" link
│   ├── Newsletter Signup — name + email + consent
│   └── Footer (global)
│
├── /about
│   ├── /about (Overview — history, vision, mission, core values)
│   ├── /about/leadership
│   │   └── Executive Council — grid of named, titled, photographed leaders
│   ├── /about/governance
│   │   ├── Structure / Organogram
│   │   └── Downloads (constitution, registration docs)
│   └── /about/membership (what it means to be a member school)
│
├── /schools
│   ├── /schools (Directory — approved schools only, searchable, filterable)
│   │   ├── Search bar
│   │   ├── Filter: Area Council / Zone
│   │   ├── Filter: Level (Primary / Secondary / Both)
│   │   └── School cards (name, area, level, photo, phone, optional "Active Member" badge)
│   ├── /schools/[school-slug] (Individual School Profile)
│   │   ├── School name + logo/photo
│   │   ├── Arms (Nursery / Primary / JSS / SSS)
│   │   ├── Address + map embed
│   │   ├── Contact details (phone, email)
│   │   ├── Level, year established, principal name
│   │   ├── About the school (short description)
│   │   ├── "Report incorrect information" link (pre-fills contact form)
│   │   └── ← Back to Schools Directory
│   └── /register (School Self-Registration Form — public)
│       ├── School name, Area Council (dropdown)
│       ├── Arms operated (multi-select: Nursery, Primary, JSS, SSS)
│       ├── Address, phone, email, principal name
│       ├── Short description (max 300 words)
│       ├── School photo upload
│       ├── NDPR consent checkbox
│       └── Submit → acknowledgement message + email
│
├── /news
│   ├── /news (News & Announcements — list, newest first)
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
│   ├── /resources/academic-calendar (Current calendar — PDF download + preview)
│   ├── /resources/curriculum (Curriculum Guides — by subject and level)
│   └── /resources/forms (Forms & Templates)
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

## 3. Admin Dashboard Site Map (Login-Protected)

The admin dashboard is entirely separate from the public site. It is never linked from the public navigation. All routes require an authenticated session.

```text
/admin
│
├── /admin/login (Login page — email + password)
│
├── /admin/dashboard (Overview — stats: schools, pending apps, dues summary, recent content)
│
├── /admin/schools
│   ├── /admin/schools (All approved schools — list with edit/remove actions)
│   ├── /admin/schools/[id]/edit (Edit school details)
│   └── /admin/schools/pending (Pending registration applications)
│       └── /admin/schools/pending/[id] (Application detail — Approve / Request More Info / Reject)
│
├── /admin/dues
│   ├── /admin/dues (Dues management — all schools, filter by year/status/tier)
│   ├── /admin/dues/settings (Set dues amounts per tier; set current academic year)
│   └── /admin/dues/[school-id] (Update payment status for a specific school)
│
├── /admin/news
│   ├── /admin/news (All posts — list with edit/delete actions)
│   ├── /admin/news/new (Create post)
│   └── /admin/news/[id]/edit (Edit post)
│
├── /admin/events
│   ├── /admin/events (All events — list)
│   ├── /admin/events/new (Create event)
│   └── /admin/events/[id]/edit (Edit event)
│
├── /admin/resources
│   ├── /admin/resources (All resource files — list by category)
│   ├── /admin/resources/upload (Upload new file)
│   └── /admin/resources/[id]/edit (Edit file metadata / replace file)
│
├── /admin/gallery
│   ├── /admin/gallery (All albums — list)
│   ├── /admin/gallery/new (Create album + upload photos)
│   └── /admin/gallery/[id]/edit (Edit album / manage photos)
│
├── /admin/leadership (Edit executive council members)
│
├── /admin/notifications (Super Admin only — notification system)
│   ├── /admin/notifications (Compose + send / schedule notifications; view history)
│   └── /admin/notifications/[id] (Delivery report for a specific notification)
│
├── /admin/enquiries (Contact form submissions — read-only inbox)
│
├── /admin/users (Super Admin only — manage admin accounts)
│
└── /admin/audit-log (Super Admin only — timestamped log of all admin actions)
```

---

## 4. Global Navigation (Primary — Public Site)

The global navigation bar appears on all public pages. On mobile it collapses to a hamburger menu. The admin dashboard has its own separate navigation sidebar.

**Desktop navigation:**

| Label | URL | Dropdown? |
| --- | --- | --- |
| Home | / | No |
| About | /about | Yes (History, Leadership, Governance) |
| Schools | /schools | Yes (Directory, Register Your School) |
| News & Events | — | Yes (News, Events, Gallery) |
| Resources | /resources | Yes (Circulars, Calendar, Curriculum, Forms) |
| Contact | /contact | No |

**Utility bar (top-right on desktop, collapsed on mobile):**

- Search icon → site-wide search overlay
- Newsletter signup shortcut (icon + "Subscribe")
- Social icons (Facebook, Twitter/X, WhatsApp)

**Mobile navigation (hamburger):**

- Flat list: Home, About, Schools, Register Your School, News, Events, Resources, Gallery, Contact
- Search at top of mobile menu

---

## 5. Footer Navigation

**Footer columns:**

| Column | Links |
| --- | --- |
| About AMIS FCT | Our History, Vision & Mission, Leadership, Governance |
| Schools | School Directory, Register Your School |
| News & Media | Latest News, Events, Photo Gallery |
| Resources | Circulars, Academic Calendar, Curriculum Guides, Forms |
| Get in Touch | Contact Us, Subscribe to Newsletter |
| Legal | Privacy Policy, Cookie Policy |

**Footer bottom bar:**

- © 2026 Association of Model Islamic Schools, FCT. All rights reserved.
- Official address · Phone / Email · Social icons

---

## 6. Breadcrumb Pattern

Breadcrumbs appear on all public pages deeper than level 1.

```text
Home > About > Leadership
Home > Schools > Government Model Islamic Secondary School, Kuje
Home > Schools > Register Your School
Home > News > AMIS FCT Hosts Annual Quiz Competition 2026
Home > Events > Inter-School Islamic Studies Olympiad 2026
Home > Resources > Circulars
```

---

## 7. URL Structure

| Page | URL Pattern | Notes |
| --- | --- | --- |
| Homepage | `/` | |
| About Overview | `/about` | |
| Leadership | `/about/leadership` | |
| Governance | `/about/governance` | |
| School Directory | `/schools` | Approved schools only |
| School Profile | `/schools/govt-model-islamic-secondary-kuje` | Slug from school name |
| School Registration | `/register` | Public form |
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
| Admin Login | `/admin/login` | Never linked from public site |
| Admin Dashboard | `/admin/dashboard` | Auth-gated |

---

## 8. Application Data Model (Simplified)

```text
Data Entity         Key Fields
─────────────────────────────────────────────────────────────────
School              name, slug, area_council, arms[], level,
                    address, phone, email, principal, description,
                    photo_url, status (pending/approved/rejected),
                    rejection_reason, registered_at, approved_at

DuesRecord          school_id, academic_year, tier (1-4),
                    amount, status (paid/partial/unpaid),
                    payment_date, notes

NewsPost            title, slug, body, category, featured_image,
                    attachment_url, author, published_at, status

Event               title, slug, start_dt, end_dt, location,
                    event_type, description, registration_info,
                    status, published_at

ResourceFile        title, category, file_url, file_size,
                    file_type, uploaded_at, version

GalleryAlbum        title, slug, event_ref, cover_photo_url,
                    date, photos[]

ExecutiveMember     name, title, photo_url, bio, sort_order

ContactEnquiry      name, email, phone, subject, message,
                    consent, submitted_at, read

AdminUser           email, password_hash, role (super/editor/dues),
                    created_at, last_login

AuditLog            admin_user_id, action, entity_type,
                    entity_id, timestamp, metadata
```

---

## 9. Information Hierarchy per Key Page

### Homepage — F-Pattern Reading

```text
[LOGO + NAV]
[HERO: Mission + CTA "Find a School" | CTA "Latest News"]
[ABOUT: 2-sentence teaser | "Learn More"]
[NEWS: 3 post cards — image, title, date, excerpt]
[EVENTS: 3 event cards — title, date, location, type]
[SCHOOLS: "X Approved Member Schools across FCT" + search bar + "Browse All"]
[GALLERY: 6 photo thumbnails + "View Gallery"]
[NEWSLETTER: headline, sub, email field, submit]
[FOOTER]
```

### School Directory — Inverted Pyramid

```text
[TITLE + intro paragraph]
[SEARCH BAR — prominent, auto-focus on mobile]
[FILTERS: Area Council | School Level | (clear filters)]
[RESULTS COUNT: "Showing 24 schools"]
[SCHOOL CARDS: photo, name, zone, level, phone, optional badge, "View Profile" link]
[PAGINATION]
[REGISTER YOUR SCHOOL — text link at bottom]
```

### School Registration Form — Linear Flow

```text
[TITLE: "Register Your School with AMIS FCT"]
[INTRO: what happens after submission]
[FORM: name → area council → arms → address → phone → email → principal → description → photo]
[CONSENT CHECKBOX]
[SUBMIT]
[SUCCESS STATE: "Application received. You will be notified by email within X working days."]
```

### Admin Dues View — Data Table

```text
[ACADEMIC YEAR SELECTOR + FILTER BAR: Status | Tier]
[SUMMARY STRIP: Total Paid ₦X | Partial ₦Y | Outstanding ₦Z | X of Y schools paid]
[TABLE: School | Arms | Tier | Amount | Status | Date | Actions]
[EXPORT CSV BUTTON]
```

### News Post — Standard Article

```text
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

```text
Google "Islamic school Kubwa Abuja"
→ /schools (directory, filtered to Area Council: Bwari)
→ /schools/govt-model-islamic-primary-kubwa (school profile)
→ Tap phone number to call
```

### School Applying for Membership

```text
/schools (directory) → "Register Your School" link at bottom
→ /register (fill form + upload photo)
→ Submit → acknowledgement message + confirmation email to school
[Admin receives notification in dashboard]
[Admin → /admin/schools/pending → reviews application]
[Admin approves → school auto-appears in public directory]
[School receives approval email]
```

### Admin Reviewing a Registration

```text
/admin/login
→ /admin/dashboard (pending applications badge)
→ /admin/schools/pending
→ /admin/schools/pending/[id] (view all submitted details)
→ Approve → school appears in public directory immediately; welcome email sent to school
   OR Request More Info → compose message → email sent; application stays Pending
   OR Reject → enter reason → rejection email sent to school
```

### Admin Tracking Dues

```text
/admin/dues (select academic year 2025/2026)
→ Filter by status: Unpaid
→ Find school → click "Update"
→ Set status: Paid, enter payment date → Save
→ Record updated; audit log entry created automatically
```

### Teacher Finding a Circular

```text
Homepage → Resources (nav)
→ /resources/circulars
→ Download PDF (Circular #12/2026)
```

### Government Official Verifying Governance

```text
Google "AMIS FCT Nigeria"
→ Homepage → About → /about
→ /about/leadership (council bios)
→ /about/governance (download constitution PDF)
```

### Admin Sending a Dues Reminder Notification

```text
/admin/login
→ /admin/notifications → "Compose Notification"
→ Subject: "Annual Dues Reminder — 2025/2026"
→ Audience: By Dues Status → Unpaid
→ Audience preview shows: "23 schools will receive this"
→ Message body written in rich text editor
→ Choose: Send Now
→ Delivery report generated: 23 sent / 23 delivered / 0 failed
→ Notification logged in history with timestamp and sender
```
