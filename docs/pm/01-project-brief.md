# Project Brief & Goals
## AMIS FCT Website Rebuild — amisfct.org

**Organisation:** Association of Model Islamic Schools, Federal Capital Territory (AMIS FCT)
**Project Type:** Full website rebuild (greenfield)
**Prepared by:** Product / PM
**Date:** 2026-05-13
**Status:** Discovery — Pre-Build

---

## 1. Background

The Association of Model Islamic Schools, FCT (AMIS FCT) is the umbrella body for all government-designated Model Islamic Schools operating within Nigeria's Federal Capital Territory (Abuja). These schools deliver the national curriculum alongside Islamic studies, values, and character formation, serving tens of thousands of Muslim and non-Muslim students across the FCT's six Area Councils.

The association coordinates academic standards, inter-school competitions, teacher professional development, policy advocacy with FCTA (FCT Administration), and community engagement for member schools and their stakeholders.

The current digital presence (amisfct.org) is either absent, outdated, or underperforming. AMIS FCT lacks a central, authoritative, and modern web platform capable of serving its diverse audiences — parents, students, educators, administrators, government officials, and the wider public.

---

## 2. Problem Statement

> **Parents cannot easily find reliable school information. Educators lack a professional hub. The association has no credible digital home that reflects its authority and reach in Islamic education across the FCT.**

Key pain points identified through discovery:

| Pain Point | Audience Affected | Severity |
|---|---|---|
| No searchable directory of member schools | Parents, Public | Critical |
| Official circulars distributed only via WhatsApp | Principals, Teachers | High |
| No events calendar for competitions / PD workshops | Students, Teachers | High |
| No downloadable resources (curriculum guides, forms) | Teachers, Principals | High |
| Association's credibility/governance not visible online | Government, Donors, Media | High |
| No mobile-optimised experience | All users (70%+ mobile) | Critical |
| Arabic/Islamic content not properly rendered online | All Islamic audiences | Medium |
| No newsletter / communication channel beyond WhatsApp | All users | Medium |

---

## 3. Vision

> **"The definitive digital home for Islamic education in Nigeria's Federal Capital Territory — trusted by parents, empowering educators, and authoritative for the nation."**

The rebuilt amisfct.org will be the single source of truth for everything related to Model Islamic Schools in the FCT: schools, events, resources, leadership, news, and community.

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
Replace manual, WhatsApp-based distribution of circulars, calendars, and event notices with a managed digital channel.

**Outcome:** 100% of official circulars published on the site within 24 hours of issue.

### G5 — Outreach & Growth
Attract prospective member schools, educators, and partners by showcasing the association's achievements, values, and reach.

**Outcome:** At least 2 new member school enquiries per quarter attributable to the website.

### G6 — Digital Inclusion
Ensure the site is accessible and performant for users on low-bandwidth mobile connections across FCT's 6 Area Councils, including those in peri-urban zones.

**Outcome:** Page load ≤3 seconds on a simulated 3G connection. WCAG 2.1 AA compliance.

---

## 5. Success Metrics (KPIs)

| Metric | Baseline | Year 1 Target | Measurement |
|---|---|---|---|
| Monthly Unique Visitors | 0 (new site) | 5,000 | Google Analytics |
| Mobile Traffic Share | — | ≥70% | Google Analytics |
| Page Load Time (3G) | — | ≤3 seconds | Lighthouse / PageSpeed |
| Contact Form Submissions | 0 | 50/month | CMS form logs |
| Newsletter Subscribers | 0 | 500 | Mailchimp / CMS |
| School Directory Completeness | 0% | 100% of member schools | Manual audit |
| Bounce Rate | — | ≤55% | Google Analytics |
| Official Circulars Online | 0% | 100% within 24h | CMS audit |
| Organic Search Ranking | None | Top 3 for "Islamic schools FCT" | Google Search Console |
| Accessibility Score | — | ≥90 Lighthouse | Lighthouse audit |

---

## 6. Scope

### In Scope (v1 Launch)
- Full public-facing website rebuild
- Homepage, About, School Directory, News & Media, Events, Resources, Contact
- CMS implementation for non-technical editorial team
- Mobile-first, responsive design
- Arabic/Islamic text rendering support
- SEO baseline setup
- Analytics integration
- NDPR-compliant privacy policy and cookie notice
- SSL/HTTPS

### Out of Scope (v1)
- Student/parent login portal
- Online payments or fee processing
- E-learning / LMS features
- Mobile application (iOS/Android)
- System integrations (school management systems, WAEC, etc.)
- Forum or discussion board
- Job board (deferred to v1.1)

---

## 7. Constraints & Assumptions

| Constraint | Detail |
|---|---|
| Budget | Association/non-profit budget — prioritise open-source CMS (WordPress or similar) |
| Technical capacity | Post-launch maintenance by non-technical staff; CMS must be user-friendly |
| Connectivity | Target users on 3G/4G mobile; aggressive performance optimisation required |
| Content | Association must supply all school data, logos, photos before launch |
| Compliance | NDPR (Nigerian Data Protection Regulation) compliance required for any data collection |
| Language | English primary; Arabic script support for Quranic content and school names |
| Timeline | Target: 12 weeks from kickoff to production launch |

---

## 8. Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Content not supplied on time by association | High | High | Create content intake template; assign content owner per section; hard deadline 6 weeks pre-launch |
| Scope creep (portal / payment features requested) | Medium | High | Lock scope in signed-off PRD; phase 2 backlog for deferred features |
| Low adoption post-launch (staff don't update site) | Medium | High | CMS training session; assign named content manager; create editorial calendar |
| Budget overrun | Low | Medium | Fixed-scope contract; CMS-first approach minimises custom development |
| Poor performance on low bandwidth | Medium | High | Performance budget set at design stage; lazy loading, image compression, minimal JS |
| Arabic font rendering issues | Low | Medium | Test early with native Arabic speakers; use proven web fonts (Google Noto Naskh Arabic) |

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
|---|---|---|
| Discovery & Planning | Week 1–2 | This document + all PM artefacts; stakeholder interviews |
| Design | Week 3–5 | Wireframes, design system, UI mockups (desktop + mobile) |
| CMS Setup & Development | Week 6–9 | CMS installed, templates built, all pages in staging |
| Content Entry | Week 8–10 | All school data, news, events, resources populated |
| QA & UAT | Week 11 | Cross-browser, mobile, performance, accessibility testing |
| Launch & Handoff | Week 12 | Production launch, DNS cutover, team training |
| Post-Launch Review | Week 14 | Analytics review, fixes, editorial calendar set |
