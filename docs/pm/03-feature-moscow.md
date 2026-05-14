# Feature List — MoSCoW Prioritisation
## AMIS FCT Website Rebuild

**Prepared by:** Product / PM
**Date:** 2026-05-13
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
- Latest news preview (3 most recent posts, auto-populated from CMS)
- Upcoming events preview (3 nearest events, auto-populated from CMS)
- School directory teaser (member school count + link)
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

### M3 — School Directory
**Description:** The single most-requested feature by parents. A searchable, filterable list of all member schools.

**Acceptance criteria:**
- List all active member schools (data supplied by association)
- Each school card shows: name, zone/area council, level (primary/secondary/both), address, phone number, and a photo
- Filter by: Area Council / Zone, School Level
- Search by school name
- Individual school detail page (see M4)
- Mobile-first layout (card grid on mobile, table optional on desktop)

---

### M4 — Individual School Profile Page
**Description:** Each member school gets its own URL and detail page.

**Acceptance criteria:**
- School name, logo/photo, address, contact details
- School level(s), year established, principal's name
- Brief description (supplied by school or association)
- Location map embed (Google Maps)
- Link back to full directory

---

### M5 — News & Announcements
**Description:** The primary channel for official news, press releases, and circulars.

**Acceptance criteria:**
- Blog-style listing page (newest first)
- Categories: General News, Official Circular, Press Release, Achievement
- Individual post pages with title, date, author, body text, images
- CMS editor can create/edit/publish/unpublish posts without code
- Social share buttons (WhatsApp, Facebook, Twitter/X) on each post
- Pagination (10 posts per page)

---

### M6 — Events Calendar
**Description:** Upcoming inter-school competitions, PD workshops, meetings, and public events.

**Acceptance criteria:**
- List view of upcoming events (title, date, location, brief description)
- Individual event detail page (full description, location, contact for registration)
- Past events archive
- Events filterable by type: Student Competition, Teacher PD, Association Meeting, Public Event
- CMS editor can create/edit events without code
- "Add to Calendar" link (.ics download) on event detail pages

---

### M7 — Contact Page
**Description:** Clear, accessible ways to reach the association.

**Acceptance criteria:**
- General enquiry form (name, email, phone, subject, message) with NDPR consent checkbox
- Association physical address with embedded Google Map
- Direct phone number(s) and email address(es)
- Named contacts for: General Enquiries, Media/Press, School Membership
- Links to official social media accounts
- Form submissions emailed to designated association email

---

### M8 — Mobile-First Responsive Design
**Description:** Core design requirement, not an add-on.

**Acceptance criteria:**
- All pages render correctly on screens 320px–1440px wide
- Touch targets ≥ 44×44px
- No horizontal scroll on mobile
- Navigation collapses to hamburger menu on mobile
- Images use responsive srcset / lazy loading

---

### M9 — Performance & Accessibility Baseline
**Description:** Non-negotiable for the FCT's primarily mobile, variable-bandwidth audience.

**Acceptance criteria:**
- Lighthouse Performance score ≥ 85 on mobile
- Page load ≤ 3 seconds on simulated 3G (measured with WebPageTest)
- Lighthouse Accessibility score ≥ 90
- WCAG 2.1 AA compliance: colour contrast, alt text, keyboard nav, focus indicators
- Arabic/Urdu text rendered correctly (Noto Naskh Arabic or equivalent web font)

---

### M10 — CMS with Non-Technical Editor Access
**Description:** The association's staff must maintain the site without developer help.

**Acceptance criteria:**
- CMS (recommended: WordPress) with WYSIWYG editor
- Named user roles: Administrator, Editor, Author
- Editor can: publish news posts, create/update events, upload gallery images, update school listings
- No FTP / code access required for routine content management
- Basic CMS training session included in project scope

---

### M11 — SSL / HTTPS & NDPR Compliance
**Description:** Security and legal requirements.

**Acceptance criteria:**
- SSL certificate installed; all traffic redirected to HTTPS
- Privacy Policy page covering data collected via contact forms and analytics
- Cookie consent banner (simple accept/decline, no cookie walls)
- Contact form data stored securely and access-controlled
- No collection of sensitive personal data in v1

---

### M12 — Analytics Integration
**Description:** Baseline measurement for all KPIs defined in the project brief.

**Acceptance criteria:**
- Google Analytics 4 (or privacy-respecting alternative: Plausible/Fathom) installed
- Core events tracked: page views, contact form submissions, resource downloads, school directory searches
- Data accessible to designated association admin

---

## SHOULD HAVE — High Value, Target for v1

### S1 — Photo & Video Gallery
**Description:** Showcases the association's activities — competitions, events, graduations — building trust and community pride.

**Acceptance criteria:**
- Albums organised by event/year
- Lightbox viewing on desktop; full-screen tap on mobile
- Videos embeddable from YouTube (no self-hosted video)
- Admin can create new albums and upload photos via CMS

---

### S2 — Resources Library (Downloads)
**Description:** Central repository for circulars, academic calendars, curriculum guides, and forms.

**Acceptance criteria:**
- Categorised file listing: Circulars, Academic Calendar, Curriculum Guides, Forms & Templates
- Each entry shows: title, date, file type (PDF/DOCX), file size, download button
- Sortable by date (newest first)
- Admin can upload new documents via CMS
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
- Unique meta title and description for every page (editable via CMS)
- Open Graph tags for social sharing previews
- Canonical URLs
- XML sitemap auto-generated and submitted to Google Search Console
- Robots.txt configured
- Schema.org markup for Organisation, LocalBusiness (school listings), and Event types
- Image alt text required fields in CMS

---

### S7 — Leadership / Executive Council Detail Page
**Description:** Named, photographed leadership builds institutional credibility (critical for Persona 5).

**Acceptance criteria:**
- Portrait photo, full name, official title, and brief bio for each executive member
- CMS-editable (admin can update when leadership changes)
- Linked from About section navigation

---

## COULD HAVE — Nice-to-Have, Defer to v1.1

### C1 — Student Achievements Section
Individual or list showcase of students who won competitions, scholarships, or received recognition. Includes name, school, year, and achievement description.

### C2 — Job Board / Vacancies
Teaching and administrative job listings from member schools. Simple form for schools to submit vacancies, reviewed by association admin before publishing.

### C3 — Online Membership Enquiry Form
Structured form for schools interested in joining AMIS FCT. Captures school details and sends an application notification to the Secretary General.

### C4 — Event Registration Form
Embedded registration form for specific events (e.g., a teacher PD workshop). Collects participant details, sends confirmation email.

### C5 — Donation / Partnership Page
Simple page describing how donors or corporate partners can support AMIS FCT. Contact form for partnership enquiries. (No payment processing in v1.)

### C6 — FAQ Page
Answers common questions: How do I enrol my child? How does a school join AMIS FCT? What is a Model Islamic School? Reduces inbound enquiries.

### C7 — Principal's Corner / Scholar's Blog
Optional long-form section for thought leadership from member school principals or Islamic scholars. Opinion pieces, educational commentary.

### C8 — WhatsApp Community Link / Integration
Prominent "Join our WhatsApp Community" CTA, linking to the official broadcast or community group. Bridges the existing WhatsApp-centric culture with the new website.

### C9 — Multilingual Toggle (Arabic)
Full Arabic translation of key pages (About, School Directory) for audiences more comfortable in Arabic. Technically complex; requires professional Arabic copy.

### C10 — Dark Mode
System-preference-aware dark mode. Low priority given primary audience is daytime mobile users.

---

## WON'T HAVE (v1) — Out of Scope, Acknowledged for Future

| Feature | Rationale for deferral | Future phase |
|---|---|---|
| Student / Parent Login Portal | Requires authentication, database, security — significant scope increase | v2 |
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
| School Directory | Fatima, Bilkisu | M | **Must** |
| Homepage | All | M | **Must** |
| Mobile-First Design | Fatima, Usman | M | **Must** |
| News & Announcements | All | S | **Must** |
| Events Calendar | Usman, Ahmed, Bilkisu | M | **Must** |
| About / Governance | Garba, Bilkisu | S | **Must** |
| Contact Page | All | S | **Must** |
| Resources / Downloads | Ahmed, Bilkisu | S | **Must** |
| CMS (non-technical) | Bilkisu, Secretary Gen | M | **Must** |
| Performance ≤3s | Fatima, Usman | M | **Must** |
| Gallery | Usman, Fatima | M | **Should** |
| Newsletter | Ahmed, Fatima | S | **Should** |
| Site Search | All | S | **Should** |
| SEO | All | S | **Should** |
| Social Share | Fatima, Usman | S | **Should** |
| Achievements | Usman | S | **Could** |
| Job Board | Ahmed | M | **Could** |
| Membership Form | New schools | S | **Could** |
| Login Portal | — | XL | **Won't** |
| E-learning | — | XL | **Won't** |
