# Product Requirements Document (PRD)

## amisfct.org — Website Rebuild

### Association of Model Islamic Schools, Federal Capital Territory, Nigeria

| Field | Value |
| --- | --- |
| Document version | 1.1 |
| Status | Draft — Awaiting stakeholder review |
| Prepared by | Product / PM |
| Date | 2026-05-13 |
| Revised | 2026-05-14 |
| Review deadline | TBD |
| Sign-off required | Executive Chairman, Secretary General, IT Committee |

---

## 1. Executive Summary

AMIS FCT (Association of Model Islamic Schools, Federal Capital Territory) requires a complete rebuild of its public website, amisfct.org. The current digital presence is insufficient to serve the association's diverse audiences — parents seeking schools, educators accessing professional resources, students finding competitions, school administrators managing official documents, and government officials verifying institutional credibility.

The rebuilt website will be a modern, mobile-first, custom-built web application that serves as the definitive digital hub for Islamic education in the FCT. It will be fast enough for users on 3G connections, accessible to users with disabilities, culturally appropriate (including Arabic text rendering), and maintainable by non-technical association staff through a secure admin dashboard.

**This PRD governs v1 public launch. The admin dashboard and login are in scope. A parent/school-facing login portal, online payments, and e-learning are explicitly out of scope.**

---

## 2. Problem & Opportunity

### 2.1 Problem

The Association of Model Islamic Schools, FCT currently has no effective digital presence. Key problems include:

- **Parents cannot find schools.** There is no searchable, accurate directory of member schools online. Parents rely on word-of-mouth and WhatsApp groups.
- **Official communications are informal.** Circulars, announcements, and event notices are distributed via WhatsApp — no archival, no searchability, no authority.
- **The association lacks institutional credibility online.** Government officials and potential donors cannot verify AMIS FCT's governance, leadership, or reach through a professional web presence.
- **Educators have no professional hub.** Teachers and principals have no central source for curriculum resources, events, or association directives.
- **Students miss opportunities.** Inter-school competitions and student activities are poorly communicated, leading to low participation and missed preparation time.
- **Membership and dues are unmanaged digitally.** School registration is handled through informal channels; annual dues are tracked manually with no audit trail or summary visibility for leadership.

### 2.2 Opportunity

A well-executed website rebuild will:

- Reduce the volume of WhatsApp/phone enquiries the secretariat handles manually
- Position AMIS FCT as the authoritative body for Islamic education in the FCT ahead of government policy cycles
- Give member schools a professional showcase that attracts parents and staff
- Build a newsletter audience and social media following that amplifies every announcement
- Replace manual dues tracking with a structured, auditable system
- Enable schools to self-register and be reviewed through a managed digital workflow
- Establish a foundation that v2 features (parent portal, payment processing, mobile app) can be built on

---

## 3. Goals & Non-Goals

### Goals

1. Launch a fully functional, publicly accessible website at amisfct.org within 12 weeks
2. Provide a mobile-first experience that loads in ≤3 seconds on 3G
3. Enable non-technical association staff to manage all content via a secure admin dashboard, without needing a developer
4. List 100% of approved member schools in a searchable, filterable directory
5. Publish all official circulars and resources online within 24 hours of issue
6. Enable schools to self-register online; admin to approve/reject applications
7. Track annual dues for all member schools with tier-based amounts, payment status, and CSV export
8. Achieve 5,000 monthly unique visitors and 500 newsletter subscribers within 12 months of launch

### Non-Goals (v1)

- Parent/school-facing login portal — public users do not authenticate (admin login is in scope)
- Online payments or dues payment processing
- E-learning or content behind a paywall
- Integration with school management systems or government databases
- A mobile app
- A job board (deferred to v1.1)

---

## 4. Audience & Personas

Five primary public-facing personas are defined in detail in [02-stakeholders-personas.md](02-stakeholders-personas.md). Summary:

| Persona | Primary Need | Critical Feature |
| --- | --- | --- |
| Fatima — Parent | Find a school near her | School Directory (filtered by zone/level) |
| Ahmed — Teacher | PD resources and events | Resources Library + Events Calendar |
| Usman — Student | Competition dates and achievements | Events Calendar + Gallery |
| Bilkisu — Principal | Access official circulars | Resources > Circulars + News |
| Garba — Government Official | Verify governance and credibility | About/Leadership + Governance Downloads |

**Admin persona (internal):** Association staff (Secretary General, PRO, IT Committee, Dues Manager) who manage content, approve school registrations, and track dues via the admin dashboard.

---

## 5. Feature Requirements

Full prioritisation documented in [03-feature-moscow.md](03-feature-moscow.md). This section defines detailed requirements for each Must Have feature.

---

### 5.1 Homepage

**Purpose:** Orient every visitor and direct them to their primary task within 5 seconds.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-HOM-01 | Hero section visible above the fold on all viewport widths (320px–1440px). Contains: association logo, name, tagline, and 2 CTAs: "Find a School" (→ /schools) and "Latest News" (→ /news). | Must |
| REQ-HOM-02 | About teaser: 2–3 sentence description of AMIS FCT with a "Learn More" link to /about. | Must |
| REQ-HOM-03 | Latest news: 3 most recent published posts, served dynamically from the backend. Each shows: featured image, category badge, title, date, excerpt (max 120 chars). | Must |
| REQ-HOM-04 | Upcoming events: next 3 events by start date, served dynamically. Each shows: event title, date, location, event type. | Must |
| REQ-HOM-05 | School directory teaser: displays total approved member school count. CTA "Find a School" links to /schools. | Must |
| REQ-HOM-06 | Gallery teaser: 6 most recent photos from the latest published gallery album. CTA "View Gallery" links to /gallery. | Should |
| REQ-HOM-07 | Newsletter signup widget: Name + Email fields + NDPR consent checkbox + submit button. On success: inline "Thank you" message. Subscriber added to designated email list. | Should |
| REQ-HOM-08 | Global footer present: association name, address, phone, email, social links, copyright, Privacy Policy link. | Must |
| REQ-HOM-09 | Lighthouse mobile performance score ≥85. LCP ≤2.5s on simulated Moto G4 / 4G. | Must |

---

### 5.2 About Section

**Purpose:** Establish credibility, communicate values, and provide governance transparency.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-ABT-01 | About overview page at /about containing: Our History, Vision & Mission, Core Values. Content editable by super admin via admin dashboard. | Must |
| REQ-ABT-02 | Leadership page at /about/leadership. Displays current executive council as a responsive grid: portrait photo, full name, official title, optional short bio. Admin-editable via admin dashboard. | Must |
| REQ-ABT-03 | Governance page at /about/governance. Includes: governance structure description, and at minimum 1 downloadable document (PDF) — constitution or official registration certificate. Document upload managed via admin dashboard. | Must |
| REQ-ABT-04 | Membership page at /about/membership describing member school criteria, benefits, and a CTA linking to /schools/register. | Should |
| REQ-ABT-05 | All About sub-pages display breadcrumb navigation. | Must |

---

### 5.3 School Directory (Public)

**Purpose:** Primary decision-support tool for parents. Displays only schools with Approved status. Must be fast, accurate, and filterable.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-SCH-01 | Directory page at /schools displaying all Approved member schools only. Default sort: alphabetical by school name. | Must |
| REQ-SCH-02 | Filter by Area Council: dropdown or tab bar with all 6 FCT Area Councils (Abuja Municipal, Bwari, Gwagwalada, Kuje, Kwali, Abaji). Selecting one updates results without page reload. | Must |
| REQ-SCH-03 | Filter by School Level: Primary, Secondary, Both/Combined. | Must |
| REQ-SCH-04 | Text search by school name: freetext input, results filtered on submit or live. | Must |
| REQ-SCH-05 | School card in listing shows: school name, area council, level, phone number (tel: link on mobile), optional "Active Member" badge, and "View Profile" CTA. | Must |
| REQ-SCH-06 | Individual school profile page at /schools/[slug]. Contains: school name, photo/logo, arms (Nursery/Primary/JSS/SSS), address, embedded Google Map, phone, email, principal name, level, year established, short description, "Report incorrect information" link. | Must |
| REQ-SCH-07 | "Report incorrect information" link pre-populates the contact form with the school name and subject "Website Feedback". | Must |
| REQ-SCH-08 | Pending and Rejected school registrations are never visible on the public directory. | Must |
| REQ-SCH-09 | Result count displayed: "Showing X of Y schools" where X = filtered results, Y = total approved. | Should |
| REQ-SCH-10 | "Active Member" badge shown on school cards and profiles when that school has Paid dues status for the current academic year. Badge display is togglable globally by super admin (on/off setting). | Should |

---

### 5.4 School Self-Registration (Public Form)

**Purpose:** Enable prospective member schools to apply for membership online, replacing informal application via WhatsApp or in-person visits.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-REG-01 | Public registration form at /schools/register. Accessible from the school directory page and the global navigation Schools dropdown. | Must |
| REQ-REG-02 | Form fields: school name (required), area council (required, dropdown — 6 FCT councils), arms operated (required, multi-select checkboxes: Nursery, Primary, JSS, SSS — at least one required), address (required), phone (required), email (required), principal name (required), short description (required, max 300 words), school photo (required, JPG/PNG, max 5MB). | Must |
| REQ-REG-03 | NDPR consent checkbox required before submission. Text: "I agree that my submitted data is collected and stored according to our [Privacy Policy]." | Must |
| REQ-REG-04 | Spam protection: honeypot field + reCAPTCHA v3. | Must |
| REQ-REG-05 | On successful submission: on-page success message shown; acknowledgement email sent to the school's submitted email address within 5 minutes; admin receives a notification in the dashboard. | Must |
| REQ-REG-06 | Submitted application stored in the database with status: Pending. | Must |
| REQ-REG-07 | Form fully functional on mobile (320px+); photo upload from mobile camera/gallery. | Must |

---

### 5.5 Admin Dashboard — School Registration Review

**Purpose:** Admin reviews pending applications and approves or rejects with one action.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-ARG-01 | Admin > Schools > Pending lists all applications with Pending status, sorted by submission date. Shows: school name, area council, arms, submitted date, "Review" button. | Must |
| REQ-ARG-02 | Application detail page shows all submitted fields plus the uploaded photo. | Must |
| REQ-ARG-03 | "Approve" action: sets status to Approved, makes school live in public directory immediately, sends approval email to school, creates audit log entry. | Must |
| REQ-ARG-04 | "Reject" action: requires a rejection reason (text field, required); sets status to Rejected; sends rejection email to school including the reason; creates audit log entry. | Must |
| REQ-ARG-05 | Admin > Schools lists all Approved schools with Edit and Remove actions. Edit opens a pre-populated form. Remove requires confirmation and is logged in the audit trail. | Must |

---

### 5.6 News & Announcements

**Purpose:** Official communication channel. Must support categories, attachments, and social sharing.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-NEWS-01 | News listing page at /news. Posts in reverse chronological order. Pagination: 10 posts per page. | Must |
| REQ-NEWS-02 | Category filter tabs: All / Official Circular / Press Release / General News / Achievement. | Must |
| REQ-NEWS-03 | Post listing card shows: featured image, category badge, title, date, excerpt (120 chars max). | Must |
| REQ-NEWS-04 | Individual post page at /news/[slug] with: title, date, category badge, author, featured image, rich text body, PDF attachment (optional), share buttons (WhatsApp, Facebook, Twitter/X). | Must |
| REQ-NEWS-05 | "Official Circular" category posts must support a file attachment field (PDF). Attachment rendered as a prominent download button labelled "Download Circular (PDF, X KB)". | Must |
| REQ-NEWS-06 | Related posts (3 items, same category or tags) shown at bottom of each post. | Should |
| REQ-NEWS-07 | News posts managed via admin dashboard. Editor role can: create, edit, preview, publish, unpublish, delete posts. | Must |
| REQ-NEWS-08 | Post images lazy-loaded and served in WebP format. Max width 1200px. | Must |

---

### 5.7 Events Calendar

**Purpose:** Central schedule for inter-school competitions, PD workshops, meetings, and public events.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-EVT-01 | Events listing page at /events. Default view: upcoming events, sorted by start date ascending. | Must |
| REQ-EVT-02 | Filter by event type: All / Student Competition / Teacher PD / Association Meeting / Public Event. | Must |
| REQ-EVT-03 | Event card in listing shows: title, start date/time, location, type badge. | Must |
| REQ-EVT-04 | Individual event detail page at /events/[slug]. Contains: title, date/time, end date/time, location (with map link), event type badge, full description, registration info/contact, share buttons (WhatsApp, Facebook). | Must |
| REQ-EVT-05 | "Add to Calendar" button on event detail page downloads a .ics file pre-populated with event title, date/time, and location. | Should |
| REQ-EVT-06 | Past events archive at /events/archive. Same listing layout; sorted by start date descending. | Should |
| REQ-EVT-07 | Events managed via admin dashboard. Admin/Editor can create, edit, publish, and delete events. Fields: title, start date/time, end date/time, location, event type, description (rich text), registration info, publish toggle. | Must |

---

### 5.8 Resources Library

**Purpose:** Permanent, searchable archive for official documents — replacing ad hoc WhatsApp distribution.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-RES-01 | Resources hub at /resources with 4 category cards linking to sub-sections. | Must |
| REQ-RES-02 | Circulars at /resources/circulars. Lists all circulars sorted by date (newest first). Each entry: title, circular number, date, file type/size, Download button. | Must |
| REQ-RES-03 | Academic Calendar at /resources/academic-calendar. Current year's calendar as downloadable PDF with prominent download CTA. Previous year accessible in archive list below. | Must |
| REQ-RES-04 | Curriculum Guides at /resources/curriculum. Files grouped by subject and school level. Each: title, subject, level, date, file size, Download button. | Should |
| REQ-RES-05 | Forms & Templates at /resources/forms. Each: form name, intended use, date, file size, Download button. | Should |
| REQ-RES-06 | All resource files uploaded and managed via admin dashboard. File size limit: 10MB per file. All files ≤5MB where possible. File size displayed next to download button. | Must |
| REQ-RES-07 | File downloads tracked as analytics events (filename + category). | Should |

---

### 5.9 Photo Gallery

**Purpose:** Social proof, community celebration, and organic content sharing.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-GAL-01 | Gallery albums page at /gallery. Grid of album cards sorted by date (newest first). Each card: cover photo, album title, event/date. | Should |
| REQ-GAL-02 | Album detail page at /gallery/[album-slug]. Responsive photo grid. Click/tap opens lightbox with full-size image and left/right navigation. Keyboard-accessible (arrow keys, Escape to close). | Should |
| REQ-GAL-03 | Gallery images lazy-loaded; thumbnails ≤100KB; served in WebP; Album page loads ≤4 seconds on 3G. | Should |
| REQ-GAL-04 | Videos section (optional): embeds YouTube videos from association's channel. No self-hosted video. | Could |
| REQ-GAL-05 | Gallery managed via admin dashboard. Admin can: create new album (title, cover, date), upload multiple photos, set alt text per image. | Should |

---

### 5.10 Contact Page

**Purpose:** Friction-free gateway to reach the right person for any enquiry type.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-CON-01 | Contact page at /contact with: general enquiry form, named contacts by department, physical address, embedded Google Map, social media links. | Must |
| REQ-CON-02 | Enquiry form fields: Full Name (required), Email (required), Phone (optional), Subject (required, dropdown), Message (required, min 20 chars). | Must |
| REQ-CON-03 | Subject dropdown options: General Enquiry / School Admissions / School Membership / Partnership / Media Enquiry / Website Feedback. | Must |
| REQ-CON-04 | NDPR consent checkbox: required before form submission. Text: "I agree that my submitted data is collected and stored according to our [Privacy Policy]." | Must |
| REQ-CON-05 | On successful submission: inline success message shown; submitted data emailed to designated association inbox; auto-acknowledgement email sent to submitter; submission stored in admin dashboard enquiries inbox. | Must |
| REQ-CON-06 | Named contacts listed for: General / Media-Press / School Membership. At minimum: name, email, phone. | Should |
| REQ-CON-07 | Embedded Google Map centred on AMIS FCT office address. "Get Directions" link opens device's maps application. | Must |

---

### 5.11 Newsletter

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-NWS-01 | Newsletter signup form (name + email + consent checkbox) present on Homepage and Contact page. | Should |
| REQ-NWS-02 | Integration with Mailchimp (free tier) or equivalent. On submission: subscriber added to list; double opt-in confirmation email sent. | Should |
| REQ-NWS-03 | Unsubscribe link in all newsletter emails, NDPR-compliant. | Should |

---

### 5.12 Secure Admin Dashboard

**Purpose:** Login-protected hub for all content management, school registration approvals, dues tracking, and system administration.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-ADM-01 | Admin login page at /admin/login. Accepts email + password. Successful login creates a server-side session; failed login shows generic error; account locked after 5 consecutive failures for 15 minutes. | Must |
| REQ-ADM-02 | Admin dashboard home shows summary stats: pending school applications count, dues summary (paid/partial/unpaid counts for current year), unread contact enquiries count, links to each section. | Must |
| REQ-ADM-03 | Three roles: Super Admin (full access), Editor (news, events, resources, gallery — no school/dues/user management), Dues Manager (school list and dues only). Role-based access enforced server-side. | Must |
| REQ-ADM-04 | All admin routes return 401/redirect to login if accessed without a valid session. Admin paths are never linked from the public site. | Must |
| REQ-ADM-05 | Session expires after 30 minutes of inactivity; user redirected to /admin/login with "Session expired" message. | Must |
| REQ-ADM-06 | All admin actions (create, update, delete, approve, reject) are written to an immutable audit log: timestamp, admin user, action type, entity type, entity ID. | Must |
| REQ-ADM-07 | Super Admin can create, edit role, and deactivate admin user accounts. Password reset via email link. No self-registration for admin accounts. | Must |
| REQ-ADM-08 | Admin enquiries inbox shows all contact form submissions (read-only): date, name, subject, message, read/unread status. | Must |

---

### 5.13 Annual Dues Management

**Purpose:** Replace manual dues tracking with a structured, auditable, per-school record covering tier, amount, and payment status for each academic year.

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-DUE-01 | Each school record stores its arms: Nursery, Primary, JSS, SSS (set during registration, editable by admin). | Must |
| REQ-DUE-02 | Dues tier derived automatically from highest arm present: SSS → Tier 1; JSS (no SSS) → Tier 2; Primary (no JSS/SSS) → Tier 3; Nursery only → Tier 4. Tier recalculates if admin updates arms. | Must |
| REQ-DUE-03 | Super Admin can set dues amounts per tier per academic year via Admin > Dues > Settings. Amounts are not hard-coded. A new year's amounts can be set independently of prior years. | Must |
| REQ-DUE-04 | Admin > Dues displays all approved schools in a table: school name, area council, arms, tier, dues amount (from tier settings), payment status, payment date, academic year. | Must |
| REQ-DUE-05 | Payment status options: Paid / Partial / Unpaid. Admin (Dues Manager or Super Admin) can update status and record payment date and optional notes per school per year. | Must |
| REQ-DUE-06 | Filter controls on dues view: Academic Year (dropdown), Payment Status, Dues Tier. Filters apply without page reload. | Must |
| REQ-DUE-07 | Summary strip at top of dues view: Total Collected (₦), Total Outstanding (₦), count of schools by status (X Paid / Y Partial / Z Unpaid), for the selected academic year. | Must |
| REQ-DUE-08 | Export to CSV: columns — School Name, Area Council, Arms, Dues Tier, Dues Amount, Payment Status, Payment Date, Academic Year. Exports currently-filtered rows. | Must |
| REQ-DUE-09 | "Active Member" badge: public school cards and profiles display badge when payment status is Paid for current year. Badge display is controlled by a global toggle in admin settings. | Should |
| REQ-DUE-10 | All dues status updates are written to the audit log (admin user, school, status change, timestamp). | Must |

---

### 5.14 SEO & Analytics

| Req ID | Requirement | Priority |
| --- | --- | --- |
| REQ-SEO-01 | Every public page has a unique, descriptive meta title (≤60 chars) and meta description (≤160 chars) configurable via admin dashboard. | Should |
| REQ-SEO-02 | Open Graph tags (og:title, og:description, og:image) set for all public pages. | Should |
| REQ-SEO-03 | XML sitemap auto-generated for public pages and submitted to Google Search Console. Admin paths excluded. | Should |
| REQ-SEO-04 | Robots.txt configured to allow indexing of all public pages; disallow `/admin`. | Should |
| REQ-SEO-05 | Schema.org markup: Organization (homepage), LocalBusiness (school profiles), Event (event pages). | Should |
| REQ-SEO-06 | Analytics (Google Analytics 4 or Plausible) installed on public pages only. Events tracked: page views, form submissions, file downloads, school search queries, registration form submissions. | Must |
| REQ-SEO-07 | Google Search Console verified and sitemap submitted within 48 hours of launch. | Should |

---

## 6. Non-Functional Requirements

### 6.1 Performance

| Metric | Target | Measurement tool |
| --- | --- | --- |
| Mobile Lighthouse Performance | ≥85 | Lighthouse CI / PageSpeed Insights |
| Largest Contentful Paint (LCP) | ≤2.5s on 4G | WebPageTest |
| First Input Delay / INP | ≤200ms | Chrome UX Report |
| Total Blocking Time (TBT) | ≤200ms | Lighthouse |
| Page weight (homepage) | ≤500KB (compressed) | WebPageTest |
| Image format | WebP with JPEG fallback | Build process |
| Font loading | font-display: swap; max 2 custom font families | CSS audit |

### 6.2 Accessibility

| Requirement | Standard | Target |
| --- | --- | --- |
| Colour contrast (text on background) | WCAG 2.1 AA | ≥4.5:1 for body text, ≥3:1 for large text |
| Keyboard navigation | WCAG 2.1 AA | All interactive elements focusable; visible focus ring |
| Screen reader compatibility | WCAG 2.1 AA | NVDA + Chrome (Windows); VoiceOver + Safari (iOS) |
| Alt text | WCAG 2.1 AA | Required field for all image uploads in admin dashboard |
| Heading hierarchy | WCAG 2.1 AA | One H1 per page; logical H2–H6 nesting |
| Lighthouse Accessibility score | — | ≥90 |
| Skip-to-content link | WCAG 2.4.1 | Present on all public pages |
| Form labels | WCAG 2.1 AA | All form inputs have explicit `<label>` elements |

### 6.3 Browser & Device Support

| Category | Requirement |
| --- | --- |
| Mobile browsers | Chrome Android (latest 2 versions), Safari iOS (latest 2 versions) |
| Desktop browsers | Chrome (latest 2), Firefox (latest 2), Edge (latest 2), Safari (latest 2) |
| Minimum screen width | 320px (iPhone SE) |
| Maximum tested width | 1440px |
| Touch targets | ≥44×44px on all interactive elements |
| No horizontal scroll | All pages at any supported viewport width |

### 6.4 Security

| Requirement | Detail |
| --- | --- |
| SSL/HTTPS | All traffic redirected to HTTPS; SSL certificate auto-renewing (Let's Encrypt) |
| Admin authentication | Server-side session management; HTTPS-only cookies; HttpOnly + Secure flags; rate-limited login (max 5 attempts / 15-min lockout) |
| Admin path security | `/admin` routes return 401/redirect without a valid session; admin paths never exposed in public HTML or sitemaps |
| Password storage | Passwords hashed using bcrypt (minimum cost factor 12) or Argon2id; no plaintext storage |
| Form spam protection | Honeypot field + reCAPTCHA v3 on all public forms (contact, registration) |
| NDPR compliance | Privacy Policy published; cookie consent banner; data collected only for stated purposes; contact and registration data access-restricted to authenticated admins |
| File uploads | Allowed types: PDF, DOCX, JPG, PNG, WebP; max 10MB per file; file type validated server-side (not just by extension); stored outside public web root |
| Dependency management | All third-party packages pinned to specific versions; security patches applied within 7 days of release |
| Audit log | Immutable server-side log of all admin actions; not deletable via admin UI |

### 6.5 Hosting & Infrastructure

| Requirement | Detail |
| --- | --- |
| Hosting type | VPS or managed cloud hosting (e.g., DigitalOcean, Railway, Render, or Hostinger VPS Nigeria) |
| Uptime SLA | ≥99.5% monthly (≤3.6 hours downtime/month) |
| Backups | Daily automated database and file backups; 30-day retention; restore tested before launch |
| CDN | CloudFlare free tier (or equivalent) for static asset caching and DDoS protection |
| Nigeria/West Africa CDN PoP | Required — ensure CDN has a Nigerian or West African PoP for lowest latency to target users |
| Domain | amisfct.org (existing) — DNS to be migrated to new hosting on launch day |
| Environment separation | Staging environment required; no testing on production |

### 6.6 Admin Dashboard — Content Management

| Requirement | Detail |
| --- | --- |
| Access model | Login-protected; role-based (Super Admin / Editor / Dues Manager); no public self-registration |
| No-code content editing | All routine content (news, events, resources, schools, leadership, gallery) manageable by non-technical staff without code |
| Rich text editor | WYSIWYG editor for news post body and event descriptions; supports headings, lists, bold/italic, links, and image embedding |
| Media management | Image upload with server-side compression and WebP conversion; file storage on CDN or object storage (e.g., Cloudflare R2 or AWS S3) |
| Arabic/RTL support | Rich text editor supports RTL input; correct `dir="rtl"` applied to Arabic text blocks in rendered output |
| Admin training | One structured training session for content manager and dues manager; written admin guide provided at handoff |

---

## 7. Content Requirements

### 7.1 Content to be Supplied by AMIS FCT

The following content must be supplied by the association by **Week 6** (for initial data seeding). Ongoing school additions will flow through the self-registration system post-launch.

| Content Item | Owner | Format | Deadline |
| --- | --- | --- | --- |
| Seed school data: name, zone, arms, level, address, phone, email, principal | Secretary General | Spreadsheet (template provided) | Week 6 |
| School photos (1 per school minimum) | Principals / PRO | JPEG/PNG ≥ 800px wide | Week 7 |
| School logos (optional) | Principals | PNG with transparency | Week 7 |
| Executive council: names, titles, photos | Secretary General | Spreadsheet + portrait photos | Week 5 |
| Association history text | Secretary General / Chairman | Word document or Google Doc | Week 5 |
| Vision, Mission, Core Values text | Executive Chairman | Word document | Week 4 |
| Constitution / registration document | Secretary General | PDF | Week 5 |
| Existing circulars to be published | Secretary General | PDFs (named with date/ref) | Week 7 |
| Academic calendar | Secretary General | PDF | Week 6 |
| Existing gallery photos (events, competitions) | PRO | JPEG/PNG organised by album | Week 7 |
| Social media account handles/URLs | PRO | Text list | Week 4 |
| Office address, phone, emails | Secretary General | Text | Week 4 |
| Dues amounts per tier for current year | Treasurer / Chairman | Text (Tier 1–4 amounts in ₦) | Week 6 |

### 7.2 Content Standards

- All written content in British English
- All dates in format: DD Month YYYY (e.g., 14 May 2026)
- Arabic text: supplied by a qualified Arabic-literate person within the association; not to be auto-translated
- Photos: minimum 800×600px; JPG or PNG; no watermarks unless association's own logo
- No third-party copyrighted content without licence (images, text, logos)

---

## 8. Design Requirements

| Requirement | Detail |
| --- | --- |
| Design approach | Mobile-first; progressive enhancement for desktop |
| Tone | Professional, warm, community-oriented; reflects Islamic values with dignity |
| Colour palette | To be defined in design phase; must include green (traditional Islamic), white, and a complementary accent; all colours WCAG AA contrast-compliant |
| Typography | English: clean sans-serif (e.g., Inter, Source Sans 3); Arabic: Noto Naskh Arabic |
| Logo | Association logo provided by AMIS FCT; vector format (SVG) requested |
| Imagery | Authentic photos of member schools, students, teachers; no generic stock photos |
| Islamic design elements | Geometric patterns, Arabic calligraphy accents — used tastefully, not distractingly |
| Responsive breakpoints | 320px (mobile), 768px (tablet), 1024px (desktop), 1440px (wide desktop) |
| Admin dashboard design | Functional, clean, data-first; does not need to match public site aesthetic; usable on desktop primarily |
| Design deliverables | Wireframes (mobile + desktop) for all Must Have public pages; wireframe for admin dashboard key views (dues table, pending applications); full mockups for Homepage, School Directory, and School Profile page |

---

## 9. Assumptions

1. AMIS FCT holds or can renew control of the amisfct.org domain.
2. The association has, or will create, an official email address (e.g., `info@amisfct.org`) for form submissions.
3. A named Content Manager and a named Dues Manager within the association will be trained and responsible for their respective admin dashboard responsibilities post-launch.
4. All seed school data will be supplied in a structured spreadsheet by Week 6.
5. The association approves the use of Google Maps (free tier) for map embeds. If not, OpenStreetMap (Leaflet) will be substituted.
6. The project is hosted in a cloud environment; no on-premise server.
7. Google Analytics 4 is acceptable as the analytics tool. If the association has privacy concerns, Plausible Analytics is the alternative.
8. Dues amounts per tier will be supplied by the association before launch; the system is not pre-populated with any amounts.
9. The association understands that dues management in v1 is a tracking tool only — no online payment collection is in scope.

---

## 10. Dependencies

| Dependency | Owner | Risk if delayed |
| --- | --- | --- |
| Domain DNS access (amisfct.org) | AMIS FCT | Launch blocked — no production deployment without DNS control |
| Hosting account setup | Developer / IT committee | Development environment blocked |
| Seed school data (spreadsheet) | Secretary General | Empty directory at launch; reputation risk |
| Executive council photos | Secretary General / PRO | Leadership page uses placeholder images only |
| Association logo (vector) | AMIS FCT | Design and branding inconsistent |
| Dues tier amounts (₦ per tier) | Treasurer / Chairman | Dues settings cannot be configured before launch |
| Admin user list (emails + roles) | IT Committee | Admin accounts cannot be created before launch |
| Google Maps API key | Developer | Map embeds non-functional; fallback to static image link |

---

## 11. Risks

| Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- |
| Initial school data not delivered on time | High | High | Seed template issued Week 1; hard deadline Week 6; self-registration allows ongoing additions post-launch |
| Scope creep (payment processing, parent portal) | Medium | High | PRD signed off before build starts; change request process defined |
| Admin dashboard abandoned post-launch | Medium | High | Training session + written guide; named content manager and dues manager; monthly content audit; editorial calendar |
| Performance targets not met | Low | High | Performance budget defined at design stage; Lighthouse CI on every build |
| Arabic text rendering issues | Low | Medium | Tested in Week 6 QA; reviewed by Arabic-literate association member |
| Admin credentials compromised | Low | High | bcrypt/Argon2 password hashing; HTTPS-only; rate-limited login; audit log; session expiry |
| Dues tier logic disputed by member schools | Low | Medium | Tier rules documented here and signed off by Executive Chairman before build; not hard-coded |
| DNS migration downtime | Low | Medium | Migration scheduled in off-peak hours (Friday night); TTL lowered 48h in advance |

---

## 12. Launch Checklist

### Technical

- [ ] All Must Have features implemented and passing UAT
- [ ] Lighthouse Performance ≥85 (mobile) across all Must Have public pages
- [ ] Lighthouse Accessibility ≥90 across all Must Have public pages
- [ ] SSL certificate installed; HTTPS enforced on all routes
- [ ] Admin dashboard login tested: rate limiting, session expiry, role enforcement
- [ ] All public forms functional; submissions arriving at designated inbox and stored in admin
- [ ] School self-registration form end-to-end tested (submit → admin notified → approve → school live)
- [ ] Dues management: tier calculation verified for all arm combinations; amounts configured for current year
- [ ] Cookie consent banner live; Privacy Policy page published
- [ ] Analytics tracking confirmed (page views, form submissions, downloads, registration submissions)
- [ ] XML sitemap submitted to Google Search Console; /admin excluded
- [ ] Robots.txt configured (disallow /admin)
- [ ] Cross-browser testing passed (Chrome Android, Safari iOS, Chrome Desktop, Firefox Desktop)
- [ ] 404 page designed and configured
- [ ] Redirect rules in place for any old URLs (if migrating from existing site)
- [ ] Audit log verified: sample actions create correct entries

### Content

- [ ] All seed schools loaded, reviewed, and set to Approved status
- [ ] Executive council page complete with photos and titles
- [ ] About/History/Vision pages reviewed and approved by Executive Chairman
- [ ] Governance documents uploaded
- [ ] At least 3 news posts published
- [ ] At least 3 upcoming events published
- [ ] Academic calendar uploaded
- [ ] At least 5 circulars uploaded to Resources
- [ ] At least 1 gallery album with photos
- [ ] Contact page: address, phones, emails verified
- [ ] Dues amounts for current academic year configured in Admin > Dues > Settings
- [ ] All seed schools have dues records for current year (status set to Unpaid as baseline)

### Operational

- [ ] Admin dashboard training session completed with content manager, PRO, and dues manager
- [ ] Admin user accounts created with correct roles (minimum-privilege)
- [ ] Hosting backups verified and automated
- [ ] Editorial calendar for first 3 months agreed
- [ ] Social media accounts linked and verified
- [ ] Association informed of new URL structure (if changing)
- [ ] Post-launch uptime monitoring alert configured
- [ ] Admin credentials stored securely (password manager, not email/WhatsApp)

---

## 13. Post-Launch Roadmap (v1.1 and Beyond)

| Feature | Target version | Rationale |
| --- | --- | --- |
| Job Board / Vacancies | v1.1 (Month 3) | Teacher persona need; manageable via admin dashboard post-launch |
| Student Achievements section | v1.1 (Month 3) | Drives student and parent engagement; content is available |
| Event Registration Forms | v1.1 (Month 4) | Reduces manual registration overhead for PRO |
| Donation / Partnership Page | v1.2 (Month 6) | Revenue/partner channel; no payment processing required in v1.2 |
| FAQ Page | v1.2 (Month 6) | Reduces inbound enquiry volume as traffic grows |
| WhatsApp Community Integration | v1.1 (Month 3) | Bridge WhatsApp-native users to the website |
| Dues Payment Reminders (email) | v1.2 (Month 6) | Automated reminders for Unpaid/Partial schools near deadline |
| Parent / School-Facing Login Portal | v2 (Month 9–12) | Requires auth infrastructure for public users; high effort; high value |
| Online Dues / Fee Payment | v2 (Month 9–12) | Requires payment gateway + financial compliance work |
| Mobile PWA | v2 (Month 9–12) | Progressive Web App for offline resource access |

---

## 14. Approval

| Stakeholder | Role | Signature | Date |
| --- | --- | --- | --- |
| — | Executive Chairman | — | — |
| — | Secretary General | — | — |
| — | IT Committee Lead | — | — |
| — | Design Lead | — | — |
| — | Lead Developer | — | — |

---

*References: [01-project-brief.md](01-project-brief.md) · [02-stakeholders-personas.md](02-stakeholders-personas.md) · [03-feature-moscow.md](03-feature-moscow.md) · [04-sitemap-ia.md](04-sitemap-ia.md) · [05-user-stories.md](05-user-stories.md)*
