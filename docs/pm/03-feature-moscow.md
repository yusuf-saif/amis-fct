# Feature List — MoSCoW Prioritisation

## AMIS FCT Website Rebuild

**Prepared by:** Product / PM
**Date:** 2026-05-13
**Revised:** 2026-05-14
**Scope:** v1 Public Launch

---

## Prioritisation Framework

Features are scored and categorised using **MoSCoW**:

| Priority | Meaning | Launch condition |
|---|---|---|
| **Must Have** | Non-negotiable for a viable v1 launch | Launch blocked if missing |
| **Should Have** | High value; include if feasible within timeline/budget | Strong target for v1 |
| **Could Have** | Nice-to-have; include if capacity allows | Deferred to v1.1 |
| **Won't Have (now)** | Out of scope for v1; acknowledged for future | Roadmap backlog |

---

## MUST HAVE — Core, Launch-Blocking Features

### M1 — Homepage
**Description:** The public face of AMIS FCT. Must communicate who the association is, what it does, and guide visitors to key sections immediately.

**Acceptance criteria:**

- Hero section with association name, tagline, and 1–2 primary CTAs (e.g., "Find a School", "Latest News")
- Brief mission/about teaser with link to full About page
- Latest news preview (3 most recent posts, dynamically served by the application backend)
- Upcoming events preview (3 nearest events, dynamically served by the application backend)
- School directory teaser (approved member school count + link)
- Footer with address, phone, email, social links, copyright, and privacy policy link
- Fully responsive (mobile, tablet, desktop)

---

### M2 — About Section
**Description:** Establishes institutional credibility and governance transparency.

**Acceptance criteria:**

- History / background page
- Vision, Mission, and Core Values
- Current Executive Council with names, titles, and photos
- Governance structure (organogram or described)
- Downloadable founding documents (constitution, registration certificate) — placeholders accepted at launch

---

### M3 — School Directory (Public View)
**Description:** The single most-requested feature by parents. A searchable, filterable list of all approved member schools.

**Acceptance criteria:**

- Displays only schools with an **Approved** registration status
- Each school card shows: name, zone/area council, level (primary/secondary/both), address, phone number, a photo, and an optional "Active Member" badge
- Filter by: Area Council / Zone, School Level
- Search by school name
- Individual school detail page (see M4)
- Mobile-first layout (card grid on mobile, table optional on desktop)

---

### M4 — Individual School Profile Page
**Description:** Each approved member school gets its own URL and detail page.

**Acceptance criteria:**

- School name, logo/photo, address, contact details
- School level(s) and arm(s) (Nursery / Primary / JSS / SSS)
- Year established, principal's name
- Brief description (submitted by school during registration, editable by admin)
- Location map embed (Google Maps)
- Link back to full directory
- "Report incorrect information" link pre-populated with school name

---

### M5 — School Self-Registration (Public Form)
**Description:** Prospective member schools submit their own registration application via a public form. Admin reviews and either approves or rejects. Approved schools appear in the directory automatically.

**Acceptance criteria:**

- Public registration form at `/schools/register`
- Form fields: school name, area council (dropdown — 6 FCT councils), arms operated (multi-select: Nursery, Primary, JSS, SSS), address, phone, email, principal name, short description (max 300 words), school photo upload (JPG/PNG, max 5MB)
- NDPR consent checkbox required before submission
- On submission: school receives an acknowledgement email ("Your application is under review"); admin receives an alert notification
- Admin dashboard shows the application in a **Pending Applications** queue
- Admin can: view all submitted fields, Approve (school becomes live in directory) or Reject (with a brief reason, emailed to the school's registered email)
- After approval, admin can edit or remove any school listing at any time
- Spam / bot protection: honeypot field + reCAPTCHA v3

---

### M6 — News & Announcements
**Description:** The primary channel for official news, press releases, and circulars.

**Acceptance criteria:**

- Blog-style listing page (newest first)
- Categories: General News, Official Circular, Press Release, Achievement
- Individual post pages with title, date, author, body text, images
- Admin can create/edit/publish/unpublish/delete posts via the admin dashboard
- Social share buttons (WhatsApp, Facebook, Twitter/X) on each post
- Pagination (10 posts per page)

---

### M7 — Events Calendar
**Description:** Upcoming inter-school competitions, PD workshops, meetings, and public events.

**Acceptance criteria:**

- List view of upcoming events (title, date, location, brief description)
- Individual event detail page (full description, location, contact for registration)
- Past events archive
- Events filterable by type: Student Competition, Teacher PD, Association Meeting, Public Event
- Admin can create/edit/publish/delete events via the admin dashboard
- "Add to Calendar" link (.ics download) on event detail pages

---

### M8 — Contact Page
**Description:** Clear, accessible ways to reach the association.

**Acceptance criteria:**

- General enquiry form (name, email, phone, subject, message) with NDPR consent checkbox
- Association physical address with embedded Google Map
- Direct phone number(s) and email address(es)
- Named contacts for: General Enquiries, Media/Press, School Membership
- Links to official social media accounts
- Form submissions emailed to designated association email and stored in admin dashboard

---

### M9 — Mobile-First Responsive Design
**Description:** Core design requirement, not an add-on.

**Acceptance criteria:**

- All pages render correctly on screens 320px–1440px wide
- Touch targets ≥ 44×44px
- No horizontal scroll on mobile
- Navigation collapses to hamburger menu on mobile
- Images use responsive srcset / lazy loading

---

### M10 — Performance & Accessibility Baseline
**Description:** Non-negotiable for the FCT's primarily mobile, variable-bandwidth audience.

**Acceptance criteria:**

- Lighthouse Performance score ≥ 85 on mobile
- Page load ≤ 3 seconds on simulated 3G (measured with WebPageTest)
- Lighthouse Accessibility score ≥ 90
- WCAG 2.1 AA compliance: colour contrast, alt text, keyboard nav, focus indicators
- Arabic/Urdu text rendered correctly (Noto Naskh Arabic or equivalent web font)

---

### M11 — Secure Admin Dashboard
**Description:** A login-protected dashboard for the association's designated staff to manage all site content, school registrations, and dues records — without requiring developer access for routine operations.

**Acceptance criteria:**

- Accessible at `/admin` (or equivalent non-guessable path); HTTPS-only
- Login with email + password; no public registration; accounts created by the super-admin only
- User roles: Super Admin (full access), Editor (content only — news, events, resources, gallery), Dues Manager (school list + dues only)
- Editors can: create/edit/publish/delete news posts, events, resource files, and gallery albums
- Super Admin can additionally: approve/reject school registration applications, edit/remove school listings, manage dues records, manage admin user accounts
- Session timeout after 30 minutes of inactivity
- All admin actions logged with timestamp and actor (audit log)
- Rate-limited login (max 5 attempts before temporary lockout)

---

### M12 — Annual Dues Management
**Description:** The admin dashboard includes a dues tracking module. Each member school has one or more arms (Nursery, Primary, JSS, SSS). The highest arm determines the school's annual dues tier. Admin records payment status for each school each academic year.

**Acceptance criteria:**

- Each school record stores its arm(s): Nursery, Primary, JSS, SSS (set during registration, editable by admin)
- Dues tier is automatically derived from the highest arm present:
  - SSS → Tier 1 (highest)
  - JSS (no SSS) → Tier 2
  - Primary (no JSS/SSS) → Tier 3
  - Nursery only → Tier 4 (lowest)
- Dues amounts per tier are configurable by Super Admin (amounts set by association; not hard-coded)
- Admin dashboard > Dues Management view shows a table of all approved schools with columns: School Name, Arms, Dues Tier, Annual Dues Amount, Payment Status, Payment Date, Academic Year
- Payment status options: **Paid** / **Partial** / **Unpaid**
- Admin can update any school's payment status and record the payment date
- Summary stats visible at top of Dues view: Total Collected (this year), Total Outstanding, Count by status
- Admin can filter dues view by: Academic Year, Payment Status, Dues Tier
- Export to CSV (school name, tier, amount, status, year)
- School directory (public) can display an "Active Member" badge on schools marked Paid for the current year (admin-configurable toggle)

---

### M13 — SSL / HTTPS & NDPR Compliance
**Description:** Security and legal requirements.

**Acceptance criteria:**

- SSL certificate installed; all traffic redirected to HTTPS
- Privacy Policy page covering data collected via contact forms, registration forms, and analytics
- Cookie consent banner (simple accept/decline, no cookie walls)
- Registration and contact form data stored securely and access-controlled to admin users only
- No collection of sensitive personal data beyond what is required for school registration and enquiry handling

---

### M14 — Analytics Integration
**Description:** Baseline measurement for all KPIs defined in the project brief.

**Acceptance criteria:**

- Google Analytics 4 (or privacy-respecting alternative: Plausible/Fathom) installed on public-facing pages only
- Core events tracked: page views, contact form submissions, resource downloads, school directory searches, school registration form submissions
- Analytics data accessible to designated association admin (not exposed in admin dashboard — via analytics provider's own interface)

---

## SHOULD HAVE — High Value, Target for v1

### S1 — Photo & Video Gallery
**Description:** Showcases the association's activities — competitions, events, graduations — building trust and community pride.

**Acceptance criteria:**

- Albums organised by event/year
- Lightbox viewing on desktop; full-screen tap on mobile
- Videos embeddable from YouTube (no self-hosted video)
- Admin can create new albums and upload photos via the admin dashboard

---

### S2 — Resources Library (Downloads)
**Description:** Central repository for circulars, academic calendars, curriculum guides, and forms.

**Acceptance criteria:**

- Categorised file listing: Circulars, Academic Calendar, Curriculum Guides, Forms & Templates
- Each entry shows: title, date, file type (PDF/DOCX), file size, download button
- Sortable by date (newest first)
- Admin can upload and manage documents via the admin dashboard
- Files versioned (new upload replaces old, with date)

---

### S3 — Newsletter Signup
**Description:** Builds a direct communication channel beyond WhatsApp.

**Acceptance criteria:**

- Signup form (name + email) with NDPR consent
- Integrated with Mailchimp or similar free-tier email tool
- Double opt-in confirmation email
- Unsubscribe mechanism compliant with NDPR
- Signup prompt on Homepage and Contact page

---

### S4 — Site-Wide Search
**Description:** Enables quick retrieval across all content types.

**Acceptance criteria:**

- Search bar in navigation (visible on all pages)
- Results include: news posts, event pages, school listings, resource files
- Results ranked by relevance
- "No results" state with suggestions (e.g., "Try contacting us")

---

### S5 — Social Media Integration
**Description:** Amplifies content reach via the platforms AMIS FCT's audience already uses.

**Acceptance criteria:**

- Social share buttons on all News posts and Event pages: WhatsApp, Facebook, Twitter/X
- Footer links to official social accounts
- Optional: embedded Facebook Page feed or Twitter/X timeline on homepage sidebar

---

### S6 — SEO Baseline
**Description:** Ensures the site is discoverable through organic search.

**Acceptance criteria:**

- Unique meta title and description for every page (configurable via admin dashboard)
- Open Graph tags for social sharing previews
- Canonical URLs
- XML sitemap auto-generated and submitted to Google Search Console
- Robots.txt configured (block `/admin`)
- Schema.org markup for Organisation, LocalBusiness (school listings), and Event types
- Alt text required for all image uploads in admin dashboard

---

### S7 — Leadership / Executive Council Detail Page
**Description:** Named, photographed leadership builds institutional credibility.

**Acceptance criteria:**

- Portrait photo, full name, official title, and brief bio for each executive member
- Manageable via admin dashboard (Super Admin updates names/photos without code)
- Linked from About section navigation

---

## COULD HAVE — Nice-to-Have, Defer to v1.1

### C1 — Student Achievements Section
Individual or list showcase of students who won competitions, scholarships, or received recognition. Includes name, school, year, and achievement description.

### C2 — Job Board / Vacancies
Teaching and administrative job listings from member schools. Admin can post and remove vacancies via the admin dashboard.

### C3 — Event Registration Form
Embedded registration form for specific events (e.g., a teacher PD workshop). Collects participant details; admin views registrations in the dashboard.

### C4 — Donation / Partnership Page
Simple page describing how donors or corporate partners can support AMIS FCT. Contact form for partnership enquiries. (No payment processing in v1.)

### C5 — FAQ Page
Answers common questions: How do I enrol my child? How does a school join AMIS FCT? What is a Model Islamic School? Reduces inbound enquiries.

### C6 — Principal's Corner / Scholar's Blog
Optional long-form section for thought leadership from member school principals or Islamic scholars. Opinion pieces, educational commentary.

### C7 — WhatsApp Community Link / Integration
Prominent "Join our WhatsApp Community" CTA, linking to the official broadcast or community group. Bridges the existing WhatsApp-centric culture with the new website.

### C8 — Multilingual Toggle (Arabic)
Full Arabic translation of key pages (About, School Directory) for audiences more comfortable in Arabic. Technically complex; requires professional Arabic copy.

### C9 — Dark Mode
System-preference-aware dark mode. Low priority given primary audience is daytime mobile users.

### C10 — Dues Payment Reminders
Automated email reminders sent to schools with Unpaid or Partial status as the dues deadline approaches. Requires email integration beyond the newsletter tool.

---

## WON'T HAVE (v1) — Out of Scope, Acknowledged for Future

| Feature | Rationale for deferral | Future phase |
|---|---|---|
| Parent / School-Facing Login Portal | Public users do not authenticate in v1; admin login is in scope | v2 |
| Online Fee / Payment Processing | Requires payment gateway integration, financial compliance — out of scope | v2 |
| E-Learning / LMS | Entirely separate product category | v3+ |
| School Management System Integration | No existing system to integrate with | v3+ |
| iOS / Android Mobile App | Website achieves same goals with PWA patterns at far lower cost | v3+ |
| Forum / Discussion Board | Moderation overhead; WhatsApp already covers this use case | v3+ |
| AI Chatbot | No content base ready to power it; premature | v2+ |
| Live Streaming | Bandwidth and cost prohibitive for target audience | v2+ |
| WAEC / JAMB Results Integration | External API dependency; requires approval from NECO/WAEC | v3+ |

---

## Feature Priority Matrix

| Feature | Persona(s) | Effort (S/M/L) | Priority |
|---|---|---|---|
| School Directory (public) | Fatima, Bilkisu, Garba | M | **Must** |
| School Self-Registration Form | New schools | M | **Must** |
| Admin Dashboard | Association staff | L | **Must** |
| Dues Management Module | Treasurer, Sec Gen | M | **Must** |
| Homepage | All | M | **Must** |
| Mobile-First Design | Fatima, Usman | M | **Must** |
| News & Announcements | All | S | **Must** |
| Events Calendar | Usman, Ahmed, Bilkisu | M | **Must** |
| About / Governance | Garba, Bilkisu | S | **Must** |
| Contact Page | All | S | **Must** |
| Performance ≤3s | Fatima, Usman | M | **Must** |
| Gallery | Usman, Fatima | M | **Should** |
| Resources / Downloads | Ahmed, Bilkisu | S | **Should** |
| Newsletter | Ahmed, Fatima | S | **Should** |
| Site Search | All | S | **Should** |
| SEO | All | S | **Should** |
| Social Share | Fatima, Usman | S | **Should** |
| Achievements | Usman | S | **Could** |
| Job Board | Ahmed | M | **Could** |
| Parent/School Login Portal | — | XL | **Won't** |
| Online Payments | — | XL | **Won't** |
| E-learning | — | XL | **Won't** |
