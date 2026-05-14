# User Stories

## AMIS FCT Website Rebuild — amisfct.org

**Prepared by:** Product / PM
**Date:** 2026-05-13
**Revised:** 2026-05-14
**Format:** As a [persona], I want to [action], so that [outcome].

Story IDs: US-[Page code]-[number]
Priority codes: P1 (Must), P2 (Should), P3 (Could)

---

## Homepage (HOM)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-HOM-01 | As a first-time visitor, I want to immediately understand what AMIS FCT is and what it does, so I can decide whether this site is relevant to me. | All | P1 | Hero section visible above the fold on all devices; includes organisation name, a one-line tagline, and a clear "Find a School" CTA. |
| US-HOM-02 | As a parent on mobile, I want the homepage to load in under 3 seconds on my 4G connection, so I don't leave before it finishes loading. | Fatima | P1 | Lighthouse mobile performance score ≥85; LCP ≤2.5s on Moto G4 (simulated 4G). |
| US-HOM-03 | As a returning visitor, I want to see the 3 most recent news posts on the homepage, so I can quickly check if anything new has happened without navigating away. | All | P1 | News section shows 3 latest published posts served dynamically by the backend; shows title, date, category badge, and excerpt. |
| US-HOM-04 | As a student, I want to see upcoming events on the homepage, so I know what competitions or activities are coming without searching. | Usman | P1 | Upcoming events section shows next 3 events served dynamically; shows title, date, location, and event type. |
| US-HOM-05 | As a parent, I want to quickly access the school directory from the homepage, so I can start searching without navigating through menus. | Fatima | P1 | Homepage has a prominent "Find a School" CTA and an approved school count ("X member schools") that links directly to /schools. |
| US-HOM-06 | As a visitor, I want to sign up for the newsletter directly from the homepage, so I can stay updated without needing to find a separate page. | Ahmed, Fatima | P2 | Newsletter signup widget on homepage; requires name + email + consent checkbox; shows inline success message after submission. |
| US-HOM-07 | As a visitor on a screen reader, I want all homepage content to be accessible, so I can use the site equally regardless of disability. | All | P1 | All images have descriptive alt text; all interactive elements are keyboard-navigable; heading hierarchy is logical (H1 → H2 → H3). |
| US-HOM-08 | As a social media user, I want to see a gallery preview on the homepage, so I can immediately see the community in action. | Usman, Fatima | P2 | Gallery teaser section shows 6 recent photos in a responsive grid with a "View Gallery" link. |

---

## About Section (ABT)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-ABT-01 | As a government official, I want to read about AMIS FCT's history, governance structure, and legal standing, so I can verify it is a legitimate and recognised body. | Garba | P1 | About page includes: founding history, governance structure, and a link to download the association's constitution/registration document. |
| US-ABT-02 | As a government official, I want to see named executive council members with their official titles and photos, so I can identify the right person for official correspondence. | Garba | P1 | Leadership page shows all current executive members with full name, title, portrait photo, and optional brief bio. |
| US-ABT-03 | As a journalist, I want to download the association's latest annual report or a governance document, so I can accurately describe the association in an article. | Media | P2 | Governance downloads section has at least one downloadable PDF (constitution or annual statement); clearly labelled with document name and year. |
| US-ABT-04 | As a prospective teacher, I want to read about AMIS FCT's vision and values, so I can assess whether this is a community I want to be part of. | Ahmed | P1 | Vision, Mission, and Core Values are clearly written on the About page with headings separating each. |
| US-ABT-05 | As a prospective member school, I want to understand what membership in AMIS FCT entails, so I can decide whether to apply. | Principal (new) | P2 | About > Membership page explains: membership criteria, benefits, and a CTA linking to /schools/register. |
| US-ABT-06 | As a returning visitor, I want the About section to be easy to navigate, so I can jump directly to leadership or governance without scrolling through history. | Garba, Bilkisu | P1 | About section has anchor navigation or sub-page links for: Overview, Leadership, Governance. Breadcrumbs show current location. |

---

## School Directory (SCH)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-SCH-01 | As a parent, I want to filter schools by Area Council, so I can only see schools that are geographically accessible to me. | Fatima | P1 | Directory has a working filter by Area Council with options for all 6 FCT councils; results update on selection. |
| US-SCH-02 | As a parent, I want to filter schools by level (primary / secondary), so I can find a school appropriate for my child's age. | Fatima | P1 | Directory has a "School Level" filter: Primary, Secondary, Both/Combined; results update on selection. |
| US-SCH-03 | As a parent, I want to search by school name, so I can find a specific school I heard about from a neighbour. | Fatima | P1 | Search bar accepts freetext input and returns matching approved schools on submit or as user types. |
| US-SCH-04 | As a parent, I want each school card to show the school's phone number, so I can call them directly from my phone without navigating to a detail page. | Fatima | P1 | Each school card in the directory listing shows: name, area/zone, level, phone (tappable tel: link on mobile), and a "View Profile" CTA. |
| US-SCH-05 | As a parent, I want to open an individual school's page, so I can see their address on a map, the principal's name, and a photo of the school. | Fatima | P1 | Individual school profile page exists for every approved school with: photo, arms, address, embedded map, phone, email, principal name, level, year established. |
| US-SCH-06 | As a parent, I want to report a school's incorrect details, so the association can fix outdated information quickly. | Fatima | P1 | Each school profile has a "Report incorrect information" link that pre-populates the contact form with the school name; submitted as a "Website Feedback" enquiry. |
| US-SCH-07 | As a visitor on mobile, I want the school directory to scroll easily and load quickly, so I can browse through schools without frustration. | Fatima, Usman | P1 | Directory loads in ≤3 seconds on 3G; cards are full-width on mobile; tap targets ≥44px. |
| US-SCH-08 | As a government official, I want to see all approved member schools in a complete list, so I can cross-reference against official records. | Garba | P1 | All approved schools are listed; total count shown on page ("Showing X schools"). Only approved schools appear — pending and rejected applications are not visible. |
| US-SCH-09 | As a parent, I want to know if a school is an active dues-paying member, so I can choose a school that is in good standing with the association. | Fatima | P2 | School cards and profile pages display an "Active Member" badge for schools with Paid dues status for the current year (admin-configurable toggle). |

---

## School Self-Registration (REG)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-REG-01 | As a school principal, I want to register my school with AMIS FCT through the website, so I can apply for membership without having to visit the secretariat in person. | New school | P1 | Public registration form at /schools/register with fields: school name, area council, arms (multi-select), address, phone, email, principal name, description, photo upload, NDPR consent. |
| US-REG-02 | As a school principal, I want to specify which arms my school operates (Nursery, Primary, JSS, SSS), so the association can correctly determine our membership tier and dues. | New school | P1 | Arms field is a multi-select checkbox group; at least one arm must be selected before the form can be submitted. |
| US-REG-03 | As a school principal, I want to receive an acknowledgement email immediately after submitting the registration form, so I know the application was received and what to expect next. | New school | P1 | On successful form submission: on-page success message shown; acknowledgement email sent to the submitted school email address within 5 minutes; email states expected review timeline. |
| US-REG-04 | As a school principal, I want to be notified by email when the association approves or rejects my application, so I know the outcome without having to chase up. | New school | P1 | On admin approval: automated email sent to school with "Approved" status and a link to their new public profile. On admin rejection: automated email sent with the reason provided by admin. |
| US-REG-05 | As a school principal, I want the registration form to be simple and mobile-friendly, so I can complete it from my phone without difficulty. | New school | P1 | Form renders correctly on screens 320px–1440px; all fields and the submit button are fully usable on mobile; photo upload works from mobile camera/gallery. |
| US-REG-06 | As a visitor, I want to find the school registration form easily from the school directory page, so I know there is a path to apply if my school is not yet listed. | New school | P2 | Directory page (/schools) includes a visible "Register Your School" link at the bottom of the page and in the Schools dropdown in global navigation. |

---

## News & Announcements (NEWS)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-NEWS-01 | As a parent, I want to browse recent news about AMIS FCT activities, so I can stay informed about the association and its member schools. | Fatima | P1 | News listing page shows posts in reverse chronological order with title, date, category, featured image, and excerpt. |
| US-NEWS-02 | As a principal, I want to filter news by "Official Circular", so I can quickly find the directives that apply to my school. | Bilkisu | P1 | News listing has category filter tabs: All / Official Circular / Press Release / General News / Achievement. |
| US-NEWS-03 | As a principal, I want to download an official circular as a PDF from a news post, so I have an authoritative copy for school records. | Bilkisu | P1 | Circular-category posts support a file attachment; attachment shown as a prominent "Download Circular (PDF)" button near top of post. |
| US-NEWS-04 | As any visitor, I want to share a news post to my WhatsApp contacts, so I can pass important announcements to other parents or teachers. | All | P2 | Each news post has share buttons for WhatsApp, Facebook, and Twitter/X. WhatsApp share pre-populates: post title + URL. |
| US-NEWS-05 | As a teacher, I want to see at least 3 related posts at the bottom of each article, so I can discover more content without going back to the listing page. | Ahmed | P2 | News post footer shows 3 related posts based on shared category or tags. |
| US-NEWS-06 | As a visitor, I want news posts to load quickly even if they include photos, so I can read them on mobile without consuming excessive data. | All | P1 | Post images lazy-loaded; served in WebP format; max image width 1200px; first-image LCP ≤2.5s on simulated 3G. |

---

## Events Calendar (EVT)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-EVT-01 | As a student, I want to see a list of upcoming inter-school competitions, so I can find events my school can enter and prepare in advance. | Usman | P1 | Events listing shows upcoming events sorted by date ascending; filterable by "Student Competition" type. |
| US-EVT-02 | As a teacher, I want to filter events to see only professional development workshops, so I can find relevant training opportunities. | Ahmed | P1 | Events filter includes "Teacher PD" type; selecting it shows only PD events. |
| US-EVT-03 | As a student, I want to click an event and see full details including date, time, venue, and how to register, so I can prepare properly. | Usman | P1 | Event detail page includes: title, date/time, venue (with map link), description, type badge, registration contact, and share buttons. |
| US-EVT-04 | As a parent, I want to add an event to my phone's calendar with one tap, so I remember to take my child there without manually copying the date. | Fatima | P2 | Event detail page has "Add to Calendar" button that downloads a .ics file compatible with Google Calendar, Apple Calendar, and Outlook. |
| US-EVT-05 | As a student, I want to share an event link on WhatsApp to tell my classmates about it, so we can all register together. | Usman | P2 | Event detail page has WhatsApp share button pre-populated with event title, date, and URL. |
| US-EVT-06 | As a visitor, I want to browse past events and see results or reports, so I can understand the association's track record. | All | P2 | Events archive at /events/archive shows past events in reverse chronological order; individual past event pages retained with any results published. |

---

## Resources (RES)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-RES-01 | As a principal, I want to find and download the latest official circular from the AMIS FCT resources section, so I have an authoritative reference document. | Bilkisu | P1 | Resources > Circulars page lists all circulars sorted by date (newest first); each entry shows: title, circular number, date, file type/size, and a Download button. |
| US-RES-02 | As a teacher, I want to download the current academic calendar, so I can plan my lessons and know key dates without contacting the office. | Ahmed | P1 | Resources > Academic Calendar page has the current year's calendar as a downloadable PDF; date of publication shown; previous year's calendar also accessible. |
| US-RES-03 | As a teacher, I want to browse and download curriculum guides for Islamic Studies and other subjects, so I can improve my lesson planning. | Ahmed | P2 | Resources > Curriculum section lists available guides by subject and school level; each guide is downloadable as PDF. |
| US-RES-04 | As a parent, I want to download an admission form for a specific school, so I can complete it at home before visiting. | Fatima | P2 | Resources > Forms section includes admission form templates labelled by school level; clearly dated version with file size shown. |
| US-RES-05 | As any visitor, I want resources to download quickly, so I don't have to wait on a slow connection. | All | P1 | All downloadable files are ≤5MB (compressed PDFs); file size shown next to download button before downloading. |
| US-RES-06 | As a principal, I want to receive the latest circular via the website rather than relying on WhatsApp forwarding, so I always have the official version. | Bilkisu | P1 | All new circulars are published to the Resources section within 24 hours of issue (editorial SLA). |

---

## Gallery (GAL)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-GAL-01 | As a student, I want to browse photos from past competitions and events, so I can feel pride in my school's participation and get excited about future events. | Usman | P2 | Gallery page shows albums in a grid sorted by date (newest first); each album shows a cover photo, title, and event date. |
| US-GAL-02 | As a parent, I want to view individual photos in a full-screen lightbox, so I can see event details clearly without leaving the page. | Fatima | P2 | Clicking a photo opens a lightbox overlay with navigation arrows; Escape or clicking outside closes it; swipe left/right navigates on mobile. |
| US-GAL-03 | As a visitor on mobile, I want the gallery to load quickly even with many photos, so I don't wait forever or use excessive data. | All | P2 | Gallery uses lazy loading; images served in WebP; thumbnails ≤100KB each; album page loads in ≤4 seconds on 3G. |

---

## Contact (CON)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-CON-01 | As a parent, I want to send an enquiry to AMIS FCT about school admissions, so I get directed to the right person without having to know who to ask. | Fatima | P1 | Contact form has a "Subject" dropdown including "School Admissions Enquiry"; submitted form emailed to designated inbox and stored in admin dashboard. |
| US-CON-02 | As a journalist, I want to easily find a named media contact with an email or phone number, so I can request a statement without going through a general enquiry queue. | Media | P2 | Contact page lists a named media/press contact with email and/or phone number, separate from the general enquiry form. |
| US-CON-03 | As a donor or partner, I want to find a partnership enquiry contact, so I can initiate a conversation about supporting AMIS FCT. | Donor | P2 | Contact page includes "Partnership / Sponsorship" in the subject dropdown. |
| US-CON-04 | As a visitor, I want to see the association's physical address on a map, so I know where their office is if I need to visit in person. | All | P1 | Contact page includes an embedded Google Map centred on the AMIS FCT office address; "Get Directions" link opens maps app on mobile. |
| US-CON-05 | As a visitor, I want to be clearly informed how my contact form data will be used before I submit it, so I trust the site with my personal information. | All | P1 | Contact form has an NDPR-compliant consent checkbox linking to the Privacy Policy; form cannot be submitted without checking the box. |
| US-CON-06 | As a form submitter, I want to receive a confirmation that my message has been sent, so I know it wasn't lost. | All | P1 | On successful submission: on-page success message shown; auto-acknowledgement email sent to submitter within 5 minutes. |
| US-CON-07 | As a visitor, I want to find AMIS FCT's official social media accounts on the contact page, so I can follow them on Facebook or WhatsApp. | All | P2 | Contact page lists official social media accounts with direct links; icons clearly identifiable. |

---

## Admin — Content Management (ADM)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-ADM-01 | As an admin, I want to log in to the admin dashboard with my email and password, so I can manage site content securely without exposing admin access to the public. | Admin | P1 | Login page at /admin/login accepts email + password; successful login creates a session and redirects to /admin/dashboard; failed login shows an error; account locked after 5 consecutive failures. |
| US-ADM-02 | As an admin, I want to see a summary dashboard on login, so I can immediately see what needs my attention (pending applications, outstanding dues, recent enquiries). | Admin | P1 | Dashboard shows: count of pending school applications, dues summary for current year (paid / partial / unpaid counts), count of unread contact enquiries, and links to each. |
| US-ADM-03 | As an editor, I want to create, edit, and publish news posts from the admin dashboard, so I can publish official announcements without needing a developer. | Editor, Sec Gen | P1 | Admin news section has a form with: title, body (rich text editor), category, featured image upload, PDF attachment upload, publish date, and publish/draft toggle. |
| US-ADM-04 | As an editor, I want to create and manage events from the admin dashboard, so upcoming events appear on the public site immediately after I publish them. | Editor, PRO | P1 | Admin events section has a form with: title, start/end date-time, location, event type, description (rich text), registration info, and publish toggle. |
| US-ADM-05 | As an editor, I want to upload resource files (circulars, calendar, guides) to the admin dashboard and assign them a category, so they appear in the correct section of the public Resources page. | Editor, Sec Gen | P1 | Admin resources section allows upload of PDF/DOCX; fields: title, category (dropdown), file; file size validated ≤10MB; uploaded files appear immediately in the public resources section. |
| US-ADM-06 | As an editor, I want to create gallery albums and upload photos from the admin dashboard, so event photos are published without developer involvement. | Editor, PRO | P2 | Admin gallery section allows: create album (title, event name, date, cover photo), bulk photo upload, set alt text per photo. |
| US-ADM-07 | As a super admin, I want to edit executive council member profiles, so the leadership page stays current when personnel change. | Super Admin | P1 | Admin leadership section lists all executive members; each record is editable: name, title, photo, bio, sort order. |
| US-ADM-08 | As a super admin, I want to view all inbound contact form enquiries in the admin dashboard, so I have a backup record independent of email. | Super Admin | P1 | Admin enquiries section shows all submissions in a read-only list: date, name, subject, message; marked as read/unread. |
| US-ADM-09 | As a super admin, I want to create and manage admin user accounts, so I can grant or revoke access without needing a developer. | Super Admin | P1 | Admin users section allows: create user (email, role, temporary password), edit role, deactivate account. Roles: Super Admin, Editor, Dues Manager. |
| US-ADM-10 | As a super admin, I want to view an audit log of all admin actions, so I can trace who changed what and when if an issue arises. | Super Admin | P1 | Audit log shows: timestamp, admin user, action type, entity affected. Entries are read-only and cannot be deleted. |
| US-ADM-11 | As an admin, I want my session to expire after 30 minutes of inactivity, so the dashboard is not left open on an unattended device. | Admin | P1 | Session expires after 30 minutes of no activity; user is redirected to /admin/login with a "Session expired" message; unsaved work prompts a warning before expiry where technically feasible. |

---

## Admin — School Registration Review (ARG)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-ARG-01 | As an admin, I want to see all pending school registration applications in the dashboard, so I can review and action them promptly. | Super Admin | P1 | Admin > Schools > Pending shows a list of all applications with status "Pending"; each row shows school name, area council, arms, submitted date, and "Review" button. |
| US-ARG-02 | As an admin, I want to view the full details of a pending registration application, so I can make an informed approval or rejection decision. | Super Admin | P1 | Application detail page shows all submitted fields: name, area council, arms, address, phone, email, principal, description, uploaded photo, and submission date. |
| US-ARG-03 | As an admin, I want to approve a school registration with one action, so the school immediately appears in the public directory. | Super Admin | P1 | "Approve" button on application detail page: sets school status to Approved, publishes school to public directory, sends approval email to school, creates audit log entry. |
| US-ARG-04 | As an admin, I want to reject a school registration and provide a reason, so the school knows why they were not approved and what to do next. | Super Admin | P1 | "Reject" button opens a text field for rejection reason (required); on confirm: sets status to Rejected, sends rejection email to school with the reason, creates audit log entry. |
| US-ARG-05 | As an admin, I want to edit an approved school's details at any time, so I can correct errors or update information when a school contacts us with changes. | Super Admin | P1 | Admin > Schools lists all approved schools; each has an "Edit" button opening a form pre-populated with current fields; changes saved immediately and reflected on public profile. |
| US-ARG-06 | As an admin, I want to remove a school from the directory, so I can de-list schools that have left the association or have been found to have inaccurate data. | Super Admin | P1 | Admin > Schools has a "Remove" action per school; requires confirmation ("Are you sure?"); removed schools no longer appear in the public directory; action logged in audit trail. |

---

## Dues Management (DUE)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-DUE-01 | As a dues manager, I want to see the dues status of every approved member school for the current academic year, so I can quickly assess collection progress. | Dues Manager | P1 | Dues management view shows all approved schools in a table: school name, arms, dues tier, dues amount, payment status (Paid/Partial/Unpaid), payment date, academic year. |
| US-DUE-02 | As a dues manager, I want the system to automatically assign a dues tier to each school based on its highest arm, so I don't have to calculate tiers manually. | Dues Manager | P1 | Tier is derived automatically: SSS present → Tier 1; JSS (no SSS) → Tier 2; Primary (no JSS/SSS) → Tier 3; Nursery only → Tier 4. Tier updates automatically if admin changes a school's arms. |
| US-DUE-03 | As a super admin, I want to set the dues amount for each tier for each academic year, so the amounts can be updated by the association without a developer. | Super Admin | P1 | Admin > Dues > Settings page has a form: select academic year, enter amount for each tier (Tier 1–4). Amounts saved and used automatically in the dues table for that year. |
| US-DUE-04 | As a dues manager, I want to update a school's payment status to Paid, Partial, or Unpaid and record the payment date, so the dues record reflects the actual payment situation. | Dues Manager | P1 | Each school row in the dues table has an "Update" action; opens a form: status dropdown (Paid/Partial/Unpaid), payment date field, optional notes; saved status reflected immediately in the table. |
| US-DUE-05 | As a dues manager, I want to filter the dues view by payment status, so I can quickly see which schools still owe dues. | Dues Manager | P1 | Dues view has filter controls: Academic Year (dropdown), Payment Status (All / Paid / Partial / Unpaid), Dues Tier. Filters apply immediately without page reload. |
| US-DUE-06 | As a dues manager, I want to see summary statistics at the top of the dues view, so I know the total amount collected, total outstanding, and breakdown by status. | Dues Manager | P1 | Summary strip at top of dues view shows: Total Collected (₦), Total Outstanding (₦), count of schools by status (X Paid / Y Partial / Z Unpaid), all for the selected academic year. |
| US-DUE-07 | As a dues manager, I want to export the dues table as a CSV file, so I can share it with the treasurer or use it in financial reports. | Dues Manager | P1 | "Export CSV" button downloads a file with columns: School Name, Area Council, Arms, Dues Tier, Dues Amount, Payment Status, Payment Date, Academic Year. All currently-filtered rows are included. |
| US-DUE-08 | As a parent, I want to see whether a school is an active dues-paying member when I view their profile, so I can choose a school in good standing with the association. | Fatima | P2 | School directory cards and profile pages show an "Active Member" badge for schools with Paid status for the current year; badge is togglable by super admin across the whole site (on/off setting). |

---

## Cross-Cutting / Global Stories (GBL)

| ID | Story | Persona | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- |
| US-GBL-01 | As any visitor on a screen reader, I want all pages to have proper semantic HTML and ARIA labels, so I can navigate the site without visual cues. | All | P1 | Lighthouse accessibility score ≥90; all form inputs have labels; images have alt text; skip-to-content link present on all pages. |
| US-GBL-02 | As any visitor, I want to read Arabic text (Quranic verses, Islamic terms, school names in Arabic) rendered correctly, so content is readable and culturally respectful. | All | P1 | Arabic text uses correct RTL direction (`dir="rtl"`) and is rendered using Noto Naskh Arabic or equivalent web font. |
| US-GBL-03 | As an SEO-conscious stakeholder, I want every page to have a unique, descriptive meta title and description, so the site ranks well in Google searches. | Association | P2 | All pages have unique `<title>` and `<meta description>`; Open Graph tags set for social sharing; schema.org markup for Organisation and Event types. |
| US-GBL-04 | As any visitor, I want the site to work on both Android (Chrome) and iOS (Safari) browsers, so my device type doesn't exclude me. | All | P1 | Cross-browser testing passes on: Chrome Android (latest), Safari iOS (latest), Chrome Desktop (latest), Firefox Desktop (latest). |
| US-GBL-05 | As the association's content team, I want to manage all site content through the admin dashboard without needing a developer, so we are not dependent on external contractors for day-to-day updates. | Admin | P1 | Admin dashboard enables without code: news posting, event creation, resource upload, school profile editing, gallery management, leadership page updates. |
| US-GBL-06 | As a visitor from Google Search, I want URLs to be clean and descriptive, so I can tell what a page is about before clicking. | All | P2 | All URLs follow the pattern defined in the IA doc; no query-string-only pages for public content. |
| US-GBL-07 | As the association, I want to track how many people visit the site and which actions they take, so we can measure impact against our KPIs. | Association | P1 | Analytics installed on public pages; events tracked: page views, form submissions, file downloads, school search queries, registration form submissions. |
| US-GBL-08 | As any visitor, I want to see a cookie consent notice the first time I visit, so I know my privacy choices are respected. | All | P1 | Cookie banner shown on first visit; user can Accept or Decline non-essential cookies; preference stored for 12 months; privacy policy link in banner. |
