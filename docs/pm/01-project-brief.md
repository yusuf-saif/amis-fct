# Project Brief & Goals

## AMIS FCT Website Rebuild — amisfct.org

**Organisation:** Association of Model Islamic Schools, Federal Capital Territory (AMIS FCT)
**Project Type:** Full website rebuild (greenfield)
**Prepared by:** Saifur-Rahman Yusuf
**Date:** 2026-05-13
**Revised:** 2026-05-14
**Status:** Discovery — Pre-Build

---

## 1. Background

The Association of Model Islamic Schools, FCT (AMIS FCT) is the umbrella body for all government-designated Model Islamic Schools operating within Nigeria's Federal Capital Territory (Abuja). These schools deliver the national curriculum alongside Islamic studies, values, and character formation, serving tens of thousands of Muslim and non-Muslim students across the FCT's six Area Councils.

The association coordinates academic standards, inter-school competitions, teacher professional development, policy advocacy with FCTA (FCT Administration), and community engagement for member schools and their stakeholders.

The current digital presence (amisfct.org) is either absent, outdated, or underperforming. AMIS FCT lacks a central, authoritative, and modern web platform capable of serving its diverse audiences — parents, students, educators, administrators, government officials, and the wider public.

---

## 2. Problem Statement

> **Parents cannot easily find reliable school information. Educators lack a professional hub. The association has no credible digital home that reflects its authority and reach in Islamic education across the FCT. School membership, dues, and communications are managed entirely through manual, off-system processes.**

Key pain points identified through discovery:

| Pain Point | Audience Affected | Severity |
| --- | --- | --- |
| No searchable directory of member schools | Parents, Public | Critical |
| Official circulars distributed only via WhatsApp | Principals, Teachers | High |
| No events calendar for competitions / PD workshops | Students, Teachers | High |
| No downloadable resources (curriculum guides, forms) | Teachers, Principals | High |
| Association's credibility/governance not visible online | Government, Donors, Media | High |
| No mobile-optimised experience | All users (70%+ mobile) | Critical |
| Arabic/Islamic content not properly rendered online | All Islamic audiences | Medium |
| No newsletter / communication channel beyond WhatsApp | All users | Medium |
| School membership managed via paper / WhatsApp | Association admin | High |
| Annual dues tracking done manually with no audit trail | Association admin, Treasurer | High |
| No targeted bulk communication tool to member schools | Association admin | High |

---

## 3. Vision

> **"The definitive digital home for Islamic education in Nigeria's Federal Capital Territory — trusted by parents, empowering educators, and authoritative for the nation."**

The rebuilt amisfct.org will be the single source of truth for everything related to Model Islamic Schools in the FCT. An integrated admin dashboard will replace manual processes for school membership approvals, content management, annual dues tracking, and direct communications to member schools.

---

## 4. Strategic Goals

### G1 — Credibility & Authority
Establish AMIS FCT as the unambiguous, government-recognised authority on Islamic school education in the FCT. The site must convey professionalism, governance transparency, and institutional legitimacy.

**Outcome:** Government officials, donors, and media treat amisfct.org as a primary reference.

### G2 — Information Accessibility
Make it effortless for any parent, student, or educator to find what they need in under 3 clicks — school locations, event dates, contact details, forms, and resources.

**Outcome:** Reduce inbound WhatsApp/phone enquiries by 40% within 6 months of launch.

### G3 — Community Engagement
Foster a connected community among member schools, parents, teachers, and students through news, events, galleries, and a newsletter.

**Outcome:** 500 newsletter subscribers and 5,000 monthly unique visitors by end of Year 1.

### G4 — Administrative Efficiency
Replace manual, WhatsApp-based distribution of circulars, calendars, and event notices — and paper-based membership and dues tracking — with a managed digital channel and admin dashboard.

**Outcome:** 100% of official circulars published on the site within 24 hours of issue. All active member school dues tracked digitally with a clear payment status for every school every academic year.

### G5 — Outreach & Growth
Attract prospective member schools, educators, and partners by showcasing the association's achievements, values, and reach. Enable schools to self-register online.

**Outcome:** At least 2 new member school applications per quarter submitted via the website registration form.

### G6 — Direct Communications

Enable the association to send targeted, auditable communications to member schools — by LGA, by school arm, by dues status, or individually — replacing ad hoc WhatsApp messaging.

**Outcome:** 100% of association notices to member schools dispatched via the notification system within 12 months of launch.

### G7 — Digital Inclusion
Ensure the site is accessible and performant for users on low-bandwidth mobile connections across FCT's 6 Area Councils, including those in peri-urban zones.

**Outcome:** Page load ≤3 seconds on a simulated 3G connection. WCAG 2.1 AA compliance.

---

## 5. Success Metrics (KPIs)

| Metric | Baseline | Year 1 Target | Measurement |
| --- | --- | --- | --- |
| Monthly Unique Visitors | 0 (new site) | 5,000 | Analytics |
| Mobile Traffic Share | — | ≥70% | Analytics |
| Page Load Time (3G) | — | ≤3 seconds | Lighthouse / PageSpeed |
| Contact Form Submissions | 0 | 50/month | Admin dashboard logs |
| Newsletter Subscribers | 0 | 500 | Email provider |
| School Directory Completeness | 0% | 100% of member schools | Admin dashboard audit |
| Bounce Rate | — | ≤55% | Analytics |
| Official Circulars Online | 0% | 100% within 24h | Admin audit |
| Organic Search Ranking | None | Top 3 for "Islamic schools FCT" | Google Search Console |
| Accessibility Score | — | ≥90 Lighthouse | Lighthouse audit |
| School Registration Applications | 0 | ≥2/quarter | Admin dashboard |
| Dues Tracking Completeness | 0% | 100% of schools tracked | Admin dashboard |
| Notifications Sent via Dashboard | 0 | All association notices | Admin dashboard |

---

## 6. Scope

### In Scope (v1 Launch)

- Full public-facing website (custom-built web application)
- Homepage, About, School Directory, News & Media, Events, Resources, Contact
- School self-registration form (public, at `/register`) with admin review workflow (Approve / Reject / Request More Info)
- Secure admin dashboard (login-protected) with two roles: Super Admin and Editor
- Annual dues management: automatic tier assignment by highest school arm, configurable amounts, payment tracking, CSV export
- Notification system: admin composes and sends targeted email notifications to member schools (by LGA, arm, dues status, or individually); scheduling; delivery reporting
- Admin content management for News, Events, Resources, and Gallery with rich-text editing, auto-save, preview, and scheduling
- Mobile-first, responsive design
- Arabic/Islamic text rendering support
- SEO baseline setup
- Analytics integration
- NDPR-compliant privacy policy and cookie notice
- SSL/HTTPS

### Out of Scope (v1)

- Parent/school-facing login portal (public users do not log in)
- Online payments or dues payment processing
- SMS or WhatsApp notification channels (email only in v1)
- E-learning / LMS features
- Mobile application (iOS/Android)
- System integrations (school management systems, WAEC, etc.)
- Forum or discussion board
- Job board (deferred to v1.1)

---

## 7. Constraints & Assumptions

| Constraint | Detail |
| --- | --- |
| Budget | Association/non-profit budget — custom web application with focused feature set |
| Technical capacity | Post-launch management by non-technical staff via the admin dashboard; two named admins required |
| Connectivity | Target users on 3G/4G mobile; aggressive performance optimisation required |
| Content | Initial school data seeded by association; ongoing additions via school self-registration |
| Notifications | Email only in v1; all registered schools must have a valid email address |
| Compliance | NDPR (Nigerian Data Protection Regulation) compliance required for any data collection |
| Language | English primary; Arabic script support for Quranic content and school names |
| Timeline | Target: 12 weeks from kickoff to production launch |

---

## 8. Risks

| Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- |
| Initial school data not supplied on time | High | High | Parallel path: seed with known schools; self-registration allows ongoing additions post-launch |
| Scope creep (payment processing, parent portal) | Medium | High | Lock scope in signed-off PRD; change request process defined |
| Low admin dashboard adoption post-launch | Medium | High | Admin dashboard training session; named Super Admin; monthly content audit; editorial calendar |
| Budget overrun | Low | Medium | Fixed-scope contract; admin dashboard scoped strictly to operational needs |
| Poor performance on low bandwidth | Medium | High | Performance budget set at design stage; lazy loading, image compression, minimal JS |
| Arabic font rendering issues | Low | Medium | Test early with native Arabic speakers; use proven web fonts (Google Noto Naskh Arabic) |
| Admin credentials compromised | Low | High | bcrypt/Argon2 hashing; HTTPS-only; rate-limited login; session expiry; audit log |
| Dues tier rules contested by member schools | Low | Medium | Tier logic signed off by Executive Chairman before build; configurable amounts reduce disputes |
| Notification email delivery issues | Low | Medium | Use reputable transactional email provider (e.g., Resend, Mailgun); monitor bounce rates |

---

## 9. Stakeholder Sign-off Required

- [ ] AMIS FCT Executive Chairman / President
- [ ] Secretary General
- [ ] IT Committee Representative
- [ ] Lead Developer / Agency
- [ ] Design Lead

---

## 10. Timeline (High-Level)

| Phase | Duration | Key Deliverables |
| --- | --- | --- |
| Discovery & Planning | Week 1–2 | This document + all PM artefacts; stakeholder interviews |
| Design | Week 3–5 | Wireframes, design system, UI mockups (desktop + mobile) including admin dashboard |
| Backend & Admin Dashboard Development | Week 6–9 | Database, API, admin dashboard (content, schools, dues, notifications), public pages in staging |
| Content Entry & School Data | Week 8–10 | Initial school data seeded; news, events, resources populated; dues amounts configured |
| QA & UAT | Week 11 | Cross-browser, mobile, performance, accessibility, admin flow, notification delivery testing |
| Launch & Handoff | Week 12 | Production launch, DNS cutover, admin training |
| Post-Launch Review | Week 14 | Analytics review, fixes, editorial calendar set |
