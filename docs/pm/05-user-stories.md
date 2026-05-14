# User Stories
## AMIS FCT Website Rebuild — amisfct.org

**Prepared by:** Product / PM
**Date:** 2026-05-13
**Format:** As a [persona], I want to [action], so that [outcome].

Story IDs: US-[Page code]-[number]
Priority codes: P1 (Must), P2 (Should), P3 (Could)

---

## Homepage (HOM)

| ID | Story | Persona | Priority | Acceptance Criteria |
|---|---|---|---|---|
| US-HOM-01 | As a first-time visitor, I want to immediately understand what AMIS FCT is and what it does, so I can decide whether this site is relevant to me. | All | P1 | Hero section visible above the fold on all devices; includes organisation name, a one-line tagline, and a clear "Find a School" CTA. |
| US-HOM-02 | As a parent on mobile, I want the homepage to load in under 3 seconds on my 4G connection, so I don't leave before it finishes loading. | Fatima | P1 | Lighthouse mobile performance score ≥85; LCP ≤2.5s on Moto G4 (simulated 4G). |
| US-HOM-03 | As a returning visitor, I want to see the 3 most recent news posts on the homepage, so I can quickly check if anything new has happened without navigating away. | All | P1 | News section shows 3 latest posts auto-populated from CMS; shows title, date, category badge, and excerpt. |
| US-HOM-04 | As a student, I want to see upcoming events on the homepage, so I know what competitions or activities are coming without searching. | Usman | P1 | Upcoming events section shows next 3 events with title, date, location, and event type. |
| US-HOM-05 | As a parent, I want to quickly access the school directory from the homepage, so I can start searching without navigating through menus. | Fatima | P1 | Homepage has a prominent "Find a School" CTA button and a school count ("X member schools") that links directly to /schools. |
| US-HOM-06 | As a visitor, I want to sign up for the newsletter directly from the homepage, so I can stay updated without needing to find a separate page. | Ahmed, Fatima | P2 | Newsletter signup widget on homepage; requires name + email + consent checkbox; shows success message after submission. |
| US-HOM-07 | As a visitor on a screen reader, I want all homepage content to be accessible, so I can use the site equally regardless of disability. | All | P1 | All images have descriptive alt text; all interactive elements are keyboard-navigable; heading hierarchy is logical (H1 → H2 → H3). |
| US-HOM-08 | As a social media user, I want to see a gallery preview on the homepage, so I can immediately see the community in action. | Usman, Fatima | P2 | Gallery teaser section shows 6 recent photos in a responsive grid with a "View Gallery" link. |

---

## About Section (ABT)

| ID | Story | Persona | Priority | Acceptance Criteria |
|---|---|---|---|---|
| US-ABT-01 | As a government official, I want to read about AMIS FCT's history, governance structure, and legal standing, so I can verify it is a legitimate and recognised body. | Garba | P1 | About page includes: founding history, governance structure, and a link to download the association's constitution/registration document. |
| US-ABT-02 | As a government official, I want to see named executive council members with their official titles and photos, so I can identify the right person for official correspondence. | Garba | P1 | Leadership page shows all current executive members with full name, title, portrait photo, and (optional) brief bio. |
| US-ABT-03 | As a journalist, I want to download the association's latest annual report or a governance document, so I can accurately describe the association in an article. | Media | P2 | Governance downloads section has at least one downloadable PDF (constitution or annual statement); clearly labelled with document name and year. |
| US-ABT-04 | As a prospective teacher, I want to read about AMIS FCT's vision and values, so I can assess whether this is a community I want to be part of. | Ahmed | P1 | Vision, Mission, and Core Values are clearly written on the About page with headings separating each. |
| US-ABT-05 | As a prospective member school, I want to understand what membership in AMIS FCT entails and how to apply, so I can make an informed decision to enquire. | Principal (new) | P2 | About > Membership page explains: membership criteria, benefits, and a CTA to use the contact form for membership enquiries. |
| US-ABT-06 | As a returning visitor, I want the About section to be easy to navigate with clear sub-sections, so I can jump directly to leadership or governance without scrolling through history. | Garba, Bilkisu | P1 | About section has anchor navigation or sub-page links for: Overview, Leadership, Governance. Breadcrumbs show current location. |

---

## School Directory (SCH)

| ID | Story | Persona | Priority | Acceptance Criteria |
|---|---|---|---|---|
| US-SCH-01 | As a parent, I want to filter schools by Area Council (zone), so I can only see schools that are geographically accessible to me. | Fatima | P1 | Directory has a working filter by Area Council with options for all 6 FCT Area Councils; results update on selection. |
| US-SCH-02 | As a parent, I want to filter schools by level (primary / secondary), so I can find a school appropriate for my child's age. | Fatima | P1 | Directory has a "School Level" filter: Primary, Secondary, Both/Combined; results update on selection. |
| US-SCH-03 | As a parent, I want to search by school name, so I can find a specific school I heard about from a neighbour. | Fatima | P1 | Search bar accepts freetext input and returns matching schools as user types (live search or on submit). |
| US-SCH-04 | As a parent, I want each school card to show the school's phone number, so I can call them directly from my phone without navigating to a detail page. | Fatima | P1 | Each school card in the directory listing shows: name, area/zone, level, phone number (tappable link on mobile), and a "View Profile" CTA. |
| US-SCH-05 | As a parent, I want to open an individual school's page, so I can see their address on a map, the principal's name, and a photo of the school. | Fatima | P1 | Individual school profile page exists for every member school with: photo, address, embedded map, phone, email, principal name, level, year established. |
| US-SCH-06 | As a principal, I want my school's listing to have an accurate description and up-to-date contact details, so parents calling the association don't get outdated information. | Bilkisu | P1 | Each school profile is CMS-editable; school profile includes a "Report incorrect information" link to the contact form, pre-populated with school name. |
| US-SCH-07 | As a visitor on mobile, I want the school directory to scroll easily and load quickly, so I can browse through schools without frustration. | Fatima, Usman | P1 | Directory loads in ≤3 seconds on 3G; cards are full-width on mobile; tap targets ≥44px. |
| US-SCH-08 | As a government official, I want to see all member schools in a complete list, so I can cross-reference against official records. | Garba | P1 | All active member schools are listed; total count shown on page ("Showing X schools"). |

---

## News & Announcements (NEWS)

| ID | Story | Persona | Priority | Acceptance Criteria |
|---|---|---|---|---|
| US-NEWS-01 | As a parent, I want to browse recent news about AMIS FCT activities, so I can stay informed about the association and its member schools. | Fatima | P1 | News listing page shows posts in reverse chronological order with title, date, category, featured image, and excerpt. |
| US-NEWS-02 | As a principal, I want to filter news by "Official Circular", so I can quickly find the directives that apply to my school. | Bilkisu | P1 | News listing has category filter tabs: All / Official Circular / Press Release / General News / Achievement. |
| US-NEWS-03 | As a principal, I want to download an official circular as a PDF from a news post, so I have an authoritative copy for school records. | Bilkisu | P1 | Circular-category posts support a file attachment; attachment shown as a prominent "Download Circular (PDF)" button near top of post. |
| US-NEWS-04 | As any visitor, I want to share a news post to my WhatsApp contacts, so I can pass important announcements to other parents or teachers. | All | P2 | Each news post has share buttons for WhatsApp, Facebook, and Twitter/X. WhatsApp share pre-populates: post title + URL. |
| US-NEWS-05 | As a teacher, I want to see at least 3 related posts at the bottom of each article, so I can discover more content without going back to the listing page. | Ahmed | P2 | News post footer shows 3 related posts based on shared category or tags. |
| US-NEWS-06 | As an editor/Secretary General, I want to publish a news post from the CMS without needing developer access, so I can respond quickly to events. | Bilkisu, Sec Gen | P1 | CMS allows creation/editing/publishing of news posts with: title, body (rich text), category, featured image, attachment (PDF), publish date. |
| US-NEWS-07 | As a visitor, I want news posts to load quickly even if they include photos, so I can read them on mobile without consuming excessive data. | All | P1 | Post images lazy-loaded; served in WebP format; max image width 1200px; first-image LCP ≤2.5s on simulated 3G. |

---

## Events Calendar (EVT)

| ID | Story | Persona | Priority | Acceptance Criteria |
|---|---|---|---|---|
| US-EVT-01 | As a student, I want to see a list of upcoming inter-school competitions, so I can find events my school can enter and prepare in advance. | Usman | P1 | Events listing shows upcoming events sorted by date ascending; filterable by "Student Competition" type. |
| US-EVT-02 | As a teacher, I want to filter events to see only professional development (PD) workshops, so I can find relevant training opportunities. | Ahmed | P1 | Events filter includes "Teacher PD" type; selecting it shows only PD events. |
| US-EVT-03 | As a student, I want to click an event and see full details including date, time, venue, rules, and how to register, so I can prepare properly. | Usman | P1 | Event detail page includes: title, date/time, venue (with map link if applicable), description, type badge, registration contact or link, and share buttons. |
| US-EVT-04 | As a parent, I want to add an event to my phone's calendar with one tap, so I remember to take my child there without manually copying the date. | Fatima | P2 | Event detail page has "Add to Calendar" button that downloads a .ics file compatible with Google Calendar, Apple Calendar, and Outlook. |
| US-EVT-05 | As a student, I want to share an event link on WhatsApp to tell my classmates about it, so we can all register together. | Usman | P2 | Event detail page has WhatsApp share button pre-populated with event title, date, and URL. |
| US-EVT-06 | As a visitor, I want to browse past events and see results or reports, so I can understand the association's track record. | All | P2 | Events archive at /events/archive shows past events in reverse chronological order; individual past event pages retained with any results or outcome published. |
| US-EVT-07 | As an editor, I want to create and publish events in the CMS, so upcoming activities are visible to all stakeholders without a developer. | Sec Gen, PRO | P1 | CMS event creation form includes: title, date/time, end date/time, location, type (dropdown), description (rich text), registration info, publish toggle. |

---

## Resources (RES)

| ID | Story | Persona | Priority | Acceptance Criteria |
|---|---|---|---|---|
| US-RES-01 | As a principal, I want to find and download the latest official circular from the AMIS FCT resources section, so I have an authoritative reference document. | Bilkisu | P1 | Resources > Circulars page lists all circulars sorted by date (newest first); each entry shows: title, circular number (if applicable), date, file type/size, and a Download button. |
| US-RES-02 | As a teacher, I want to download the current academic calendar, so I can plan my lessons and know key dates without contacting the office. | Ahmed | P1 | Resources > Academic Calendar page has the current year's calendar as a downloadable PDF; date of publication shown; previous year's calendar also accessible. |
| US-RES-03 | As a teacher, I want to browse and download curriculum guides for Islamic Studies and other subjects, so I can improve my lesson planning. | Ahmed | P2 | Resources > Curriculum section lists available guides by subject and school level (primary/secondary); each guide is downloadable as PDF. |
| US-RES-04 | As a parent, I want to download an admission form for a specific school, so I can complete it at home before visiting. | Fatima | P2 | Resources > Forms section includes admission form templates; forms labelled by school level; clearly dated version. |
| US-RES-05 | As any visitor, I want resources to download quickly, so I don't have to wait on a slow connection. | All | P1 | All downloadable files are ≤5MB (compressed/optimised PDFs); file size shown next to download button so users can judge before downloading. |
| US-RES-06 | As a principal, I want to receive the latest circular via the website rather than relying on WhatsApp forwarding, so I always have the official version. | Bilkisu | P1 | All new circulars are published to the Resources section within 24 hours of issue (editorial SLA, not a technical requirement). |

---

## Gallery (GAL)

| ID | Story | Persona | Priority | Acceptance Criteria |
|---|---|---|---|---|
| US-GAL-01 | As a student, I want to browse photos from past competitions and events, so I can feel pride in my school's participation and get excited about future events. | Usman | P2 | Gallery page shows albums in a grid sorted by date (newest first); each album shows a cover photo, title, and event date. |
| US-GAL-02 | As a parent, I want to view individual photos in a full-screen lightbox, so I can see event details clearly without leaving the page. | Fatima | P2 | Clicking a photo opens a lightbox overlay with navigation arrows; pressing Escape or clicking outside closes it. On mobile, swipe left/right navigates. |
| US-GAL-03 | As a visitor on mobile, I want the gallery to load quickly even with many photos, so I don't wait forever or use excessive data. | All | P2 | Gallery uses lazy loading; images served in WebP; thumbnails are ≤100KB each; album page loads in ≤4 seconds on 3G. |
| US-GAL-04 | As a PRO, I want to create new photo albums and upload photos from the CMS, so I can update the gallery after every event without a developer. | PRO | P2 | CMS supports: create album (title, event, date, cover photo), upload multiple images (bulk), set alt text per image. |

---

## Contact (CON)

| ID | Story | Persona | Priority | Acceptance Criteria |
|---|---|---|---|---|
| US-CON-01 | As a parent, I want to send an enquiry to AMIS FCT about school admissions, so I get directed to the right person without having to know who to ask. | Fatima | P1 | Contact form has a "Subject" dropdown including "School Admissions Enquiry"; submitted form emails the designated inbox with all form fields. |
| US-CON-02 | As a journalist, I want to easily find a named media contact with an email or phone number, so I can request a statement without going through a general enquiry queue. | Media | P2 | Contact page lists a named media/press contact with email and/or phone number, separate from the general enquiry form. |
| US-CON-03 | As a donor or partner, I want to find a partnership enquiry contact, so I can initiate a conversation about supporting AMIS FCT. | Donor | P2 | Contact page includes a "Partnership / Sponsorship" contact option; form subject dropdown includes "Partnership Enquiry". |
| US-CON-04 | As a visitor, I want to see the association's physical address on a map, so I know where their office is if I need to visit in person. | All | P1 | Contact page includes an embedded Google Map centred on the AMIS FCT office address; "Get Directions" link opens maps app on mobile. |
| US-CON-05 | As a visitor, I want to be clearly informed how my contact form data will be used before I submit it, so I trust the site with my personal information. | All | P1 | Contact form has an NDPR-compliant consent checkbox: "I agree that my submitted data is collected and stored according to [Privacy Policy link]." Form cannot be submitted without checking the box. |
| US-CON-06 | As a form submitter, I want to receive a confirmation that my message has been sent, so I know it wasn't lost. | All | P1 | On successful form submission, an on-page success message is shown: "Thank you, your message has been received. We will respond within 3 working days." Auto-acknowledgement email sent to submitter. |
| US-CON-07 | As a visitor, I want to find AMIS FCT's official social media accounts on the contact page, so I can follow them on Facebook or WhatsApp. | All | P2 | Contact page lists official social media accounts (Facebook, Twitter/X, WhatsApp) with direct links; icons clearly identifiable. |

---

## Cross-Cutting / Global Stories (GBL)

| ID | Story | Persona | Priority | Acceptance Criteria |
|---|---|---|---|---|
| US-GBL-01 | As any visitor on a screen reader, I want all pages to have proper semantic HTML and ARIA labels, so I can navigate the site without visual cues. | All | P1 | Lighthouse accessibility score ≥90; all form inputs have labels; images have alt text; skip-to-content link present on all pages. |
| US-GBL-02 | As any visitor, I want to read Arabic text (Quranic verses, Islamic terms, school names in Arabic) rendered correctly, so content is readable and culturally respectful. | All | P1 | Arabic text uses correct RTL direction (`dir="rtl"`) and is rendered using Noto Naskh Arabic or equivalent web font loaded from CDN. |
| US-GBL-03 | As an SEO-conscious stakeholder, I want every page to have a unique, descriptive meta title and description, so the site ranks well in Google searches. | Association | P2 | All pages have unique `<title>` and `<meta description>`; Open Graph tags set for social sharing; schema.org markup for Organisation and Event types. |
| US-GBL-04 | As any visitor, I want the site to work on both Android (Chrome) and iOS (Safari) browsers, so my device type doesn't exclude me. | All | P1 | Cross-browser testing passes on: Chrome Android (latest), Safari iOS (latest), Chrome Desktop (latest), Firefox Desktop (latest). |
| US-GBL-05 | As the IT committee, I want the website to be maintained without a developer for routine content changes, so the association is not dependent on external contractors for day-to-day updates. | Association | P1 | CMS (WordPress or equivalent) enables: news posting, event creation, resource upload, school profile editing — all without code. CMS training documented. |
| US-GBL-06 | As a visitor from Google Search, I want URLs to be clean and descriptive, so I can tell what a page is about before clicking. | All | P2 | All URLs follow the pattern defined in the IA doc (e.g., `/schools/[school-slug]`, `/news/[post-slug]`); no query-string-only pages for public content. |
| US-GBL-07 | As the association, I want to track how many people visit the site, which pages they view, and how many submit contact forms, so we can measure the site's impact against our KPIs. | Association | P1 | Google Analytics 4 (or Plausible) installed; page views, form submissions, file downloads, and search queries tracked as events. |
| US-GBL-08 | As any visitor, I want to see a cookie consent notice the first time I visit, so I know my privacy choices are respected. | All | P1 | Cookie banner shown on first visit; user can Accept or Decline non-essential cookies; preference remembered for 12 months; privacy policy link in banner. |
