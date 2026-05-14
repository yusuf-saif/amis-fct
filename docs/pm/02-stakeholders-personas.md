# Stakeholders & User Personas
## AMIS FCT Website Rebuild

**Prepared by:** Product / PM
**Date:** 2026-05-13

---

## Part 1: Stakeholder Map

### 1.1 Internal Stakeholders

| Role | Interest | Influence | Engagement Level |
|---|---|---|---|
| Executive Chairman / President | Site reflects the association's authority and vision | Very High | Decision maker — approve brief, content, launch |
| Secretary General | News, circulars, and communications are accurate | High | Content approver; primary editorial owner post-launch |
| PRO (Public Relations Officer) | Media, social media presence, gallery | High | Provides photos, press releases, social handles |
| IT Committee / Webmaster | Technical quality, uptime, maintainability | Medium | CMS administrator post-launch; involved in tech decisions |
| Member School Principals | Their school is listed accurately and looks professional | Medium | Supply school data; reviewers during UAT |
| Association Treasurer | Costs controlled; no hidden ongoing expenses | Medium | Approves budget; reviews hosting/maintenance costs |

### 1.2 External Stakeholders

| Role | Interest | Influence | Engagement Level |
|---|---|---|---|
| FCTA Ministry of Education | Association is credible, governance is transparent | High | Referenced; will be consulted on official links |
| Parents / Guardians | School information is accurate and easy to find | High | Primary end users; target of design |
| Students | Events, activities, achievements are showcased | Medium | Secondary end users |
| Teachers / Educators | Professional resources, job opportunities, PD | Medium | Secondary end users |
| Islamic Scholars / Imams | Islamic values accurately represented | Medium | Content advisors for Arabic/Islamic content |
| Donors / Sponsors | Association is credible and impactful | Medium | Decision-makers on partnerships |
| Media / Press | Association is findable and newsworthy | Low-Medium | Use site for press enquiries |
| Prospective Member Schools | Clear process to join the association | Low | Target of outreach content |
| General Public | Accurate, trustworthy information | Low | Broad awareness audience |

### 1.3 RACI Summary

| Activity | Executive Chairman | Secretary General | PRO | IT Committee | Principals |
|---|---|---|---|---|---|
| Approve PRD / brief | **A** | C | I | I | I |
| Supply school data | I | **R** | I | I | **R** |
| Content creation (news/events) | I | **R/A** | **R** | I | C |
| Design approval | **A** | C | C | C | I |
| CMS training | I | **R** | R | **A** | I |
| Launch approval | **A** | C | I | C | I |
| Ongoing content management | I | **R/A** | R | C | C |

*R = Responsible, A = Accountable, C = Consulted, I = Informed*

---

## Part 2: User Personas

### Persona 1 — Fatima (The Informed Parent)

```
Name:       Fatima Abdullahi
Age:        38
Location:   Kubwa, FCT
Occupation: Civil servant (Federal Ministry), mother of 3
Devices:    Tecno Android smartphone (primary), home laptop (occasional)
Connectivity: 4G mobile data, home Wi-Fi
Digital literacy: Moderate — uses WhatsApp, Facebook, Google Search daily
```

**Background:**
Fatima has a 7-year-old about to start primary school and a 12-year-old transitioning to secondary. She is devout and wants her children in a school that upholds Islamic values while delivering strong academics. She has heard about Model Islamic Schools from neighbours but doesn't know which ones are in her area, how admissions work, or how to contact them.

**Goals:**
- Find Model Islamic Schools near Kubwa
- Understand admission requirements and dates
- Verify the schools' reputation and activities
- Get a contact number to call the school

**Frustrations:**
- School information is scattered across WhatsApp groups and word-of-mouth
- Calling schools directly is unreliable (lines often busy or unanswered)
- Official websites (if they exist) are outdated or mobile-unfriendly
- No single place to compare schools by zone or level

**Jobs to Be Done:**
> *"When I want to choose a school for my child, I want to find all Model Islamic Schools near me with their contact details and activities, so I can shortlist and visit the right ones without wasting time."*

**Behavioural Patterns:**
- Searches Google on mobile for "Islamic schools in Kubwa Abuja"
- Skims pages quickly; leaves if she can't find what she needs in 30 seconds
- Shares useful links in WhatsApp family groups
- Trusts content with photos, addresses, and phone numbers over text-only pages

**Design Implications:**
- School directory must be mobile-first and filterable by area/zone
- Each school listing must show address, phone, level (primary/secondary), and a photo
- Page load must be fast on 4G; avoid heavy carousels or auto-play video
- WhatsApp share button on school pages

---

### Persona 2 — Malam Ahmed (The Professional Educator)

```
Name:       Ahmed Musa Bello
Age:        42
Location:   Gwagwalada, FCT
Occupation: Senior Islamic Studies Teacher, Government Secondary School
Devices:    Laptop (school office), Android smartphone
Connectivity: School Wi-Fi (often slow), 4G mobile
Digital literacy: Moderate-High — uses email, Google Workspace, YouTube for PD
```

**Background:**
Ahmed has taught Islamic Studies for 14 years. He is dedicated but feels isolated — there is little professional community for Islamic educators beyond his own school. He wants to grow, attend workshops, access better curriculum materials, and perhaps apply for a senior role in another school. He knows AMIS FCT exists but doesn't know what it offers him professionally.

**Goals:**
- Find upcoming teacher professional development (PD) workshops
- Download curriculum guides and teaching resources
- Discover job openings in member schools
- Stay updated on association news and directives

**Frustrations:**
- PD events are communicated ad hoc through school principals, not directly to teachers
- Curriculum resources are not centralised — he relies on old textbooks and WhatsApp PDFs
- No official job board for Islamic school vacancies in the FCT
- No professional community to belong to beyond his school

**Jobs to Be Done:**
> *"When I want to grow professionally, I want to find workshops, download resources, and discover job opportunities across AMIS FCT schools, so I can advance my career and improve my teaching."*

**Behavioural Patterns:**
- Uses Google to search for Islamic education resources and workshops
- Downloads PDFs for offline use (intermittent school Wi-Fi)
- Subscribes to email newsletters if they provide genuine value
- Recommends useful resources to colleagues verbally

**Design Implications:**
- Resources library must be easily downloadable; show file size and format
- Events calendar must distinguish between student events and teacher/PD events
- Newsletter signup must communicate clear value ("official AMIS FCT circulars, PD events, resources")
- Job board (v1.1 scope): teaser on site pointing to contact for vacancies

---

### Persona 3 — Usman (The Aspiring Student)

```
Name:       Usman Suleiman
Age:        16
Location:   Kuje, FCT
School:     Government Model Islamic Secondary School, Kuje
Devices:    Xiaomi Android smartphone (primary)
Connectivity: 4G mobile data (shared family plan, data rationing)
Digital literacy: High — active on TikTok, YouTube, WhatsApp; school projects via Google Docs
```

**Background:**
Usman is a bright SSS2 student who is passionate about Islamic quiz competitions and public speaking. He's heard AMIS FCT organises inter-school competitions but can only find out through his teacher, who sometimes forgets to inform students in advance. He wants to represent his school and also explore scholarship opportunities.

**Goals:**
- Know about upcoming inter-school competitions and their rules
- See results and achievements from past competitions
- Discover scholarship opportunities for Muslim students in FCT
- Feel proud of his school's presence on the association's site

**Frustrations:**
- Finds out about competitions too late to properly prepare
- His school's achievements are not documented anywhere public
- No direct source of information — has to ask teachers who may not know
- Website experiences are often slow and clunky on his phone

**Jobs to Be Done:**
> *"When I want to participate and excel, I want to know about competitions, deadlines, and achievements early enough to prepare, so I can represent my school and build my future."*

**Behavioural Patterns:**
- Primarily mobile; expects fast, visually engaging content
- Shares content via WhatsApp Status and TikTok
- Loses interest quickly if a page is text-heavy with no photos
- More likely to check the site if he gets a WhatsApp link from a friend

**Design Implications:**
- Events page must be visually engaging with dates prominently displayed
- Past achievements / gallery must be celebratory — photos of winners, trophies, certificates
- "Add to calendar" / reminder functionality on event pages
- Mobile performance is non-negotiable for this persona

---

### Persona 4 — Hajiya Bilkisu (The School Administrator)

```
Name:       Bilkisu Yusuf Adamu
Age:        55
Location:   Abaji, FCT
Occupation: Principal, Government Model Islamic Primary School
Devices:    Office desktop (Windows), personal smartphone (basic Android)
Connectivity: Office broadband (unstable), personal 4G
Digital literacy: Low-Moderate — uses email, WhatsApp, basic MS Office
```

**Background:**
Hajiya Bilkisu has run her school for 12 years. She is highly respected and is on good terms with the AMIS FCT executive. She receives association circulars, event notices, and meeting announcements via WhatsApp groups managed by the Secretary General. She wants the association to project a professional image and for her school to be properly represented online, but she has limited tech confidence.

**Goals:**
- Access and download official circulars and meeting minutes
- Verify her school's listing on the directory is accurate
- Share association news and events with parents via the official website (more credible than WhatsApp forwards)
- Submit school updates or photos to the association for the website

**Frustrations:**
- WhatsApp groups are chaotic — important circulars get buried under messages
- No central archive of past circulars or meeting minutes
- Her school's profile on any existing site is incomplete or wrong
- Doesn't know who to contact to fix website issues

**Jobs to Be Done:**
> *"When I need to reference an official directive, I want to download the original circular from the association website, so I have an authoritative document to act on and share with my staff."*

**Behavioural Patterns:**
- Prefers official documents over WhatsApp forwards for institutional use
- Checks the site infrequently (monthly) but needs what she's looking for immediately when she does
- Will call the PRO if she can't find something on the site
- Low tolerance for complex navigation; expects simple, clear menus

**Design Implications:**
- Resources > Circulars section must be prominent, well-labelled, and sortable by date
- Contact page must clearly identify the right person to call for different needs
- Navigation must be simple — 5 main items maximum in the primary nav
- School directory must have a "Report an error" or "Update your school info" call-to-action

---

### Persona 5 — Alhaji Garba (The Decision Maker)

```
Name:       Alhaji Garba Umar Ishaq
Age:        60
Location:   Garki, Abuja (FCT)
Occupation: Senior Policy Officer, FCTA Ministry of Education
Devices:    Government desktop (Windows), personal iPhone
Connectivity: Office broadband, home Wi-Fi
Digital literacy: Moderate — uses email, reads reports, formal web browsing
```

**Background:**
Alhaji Garba is a senior government official who interacts with AMIS FCT in an official capacity — policy matters, school inspections, budget allocations, and inter-agency events. He occasionally refers civil society organisations and corporate donors to the association. When recommending AMIS FCT, he wants to be confident that the site they'll visit conveys institutional credibility.

**Goals:**
- Quickly verify AMIS FCT's governance and official status
- Find leadership contacts for formal correspondence
- Access annual reports or statements for reference in policy documents
- Confirm the list of member schools for official purposes

**Frustrations:**
- Cannot find a professional, up-to-date website to reference in official documents
- Association communications feel informal (WhatsApp-heavy)
- No published annual report or governance document online

**Jobs to Be Done:**
> *"When I need to reference AMIS FCT in official correspondence or recommend them to a donor, I want to verify their governance, leadership, and reach through a professional website, so I can vouch for them with confidence."*

**Behavioural Patterns:**
- Reads carefully rather than skimming — values completeness over speed
- Expects formal language, titles, and official designations
- Will share the URL with colleagues and donors directly
- Low frequency but high-stakes visits

**Design Implications:**
- About page must include leadership with full names, titles, and photos
- Downloadable annual report / governance document is essential for this persona
- Footer must show official registration details (if applicable), address, and contact
- Professional, formal design aesthetic — avoid anything that looks like a student project

---

## Part 3: Empathy Summary

| Need | Fatima (Parent) | Ahmed (Teacher) | Usman (Student) | Bilkisu (Principal) | Garba (Official) |
|---|---|---|---|---|---|
| School directory | Critical | Medium | Low | Critical | High |
| Events / calendar | Medium | High | Critical | Medium | Low |
| Resources / downloads | Low | Critical | Low | Critical | Medium |
| News / announcements | Medium | High | Medium | High | Medium |
| Leadership / governance | Low | Low | Low | Medium | Critical |
| Annual report | Low | Low | Low | Low | Critical |
| Gallery / achievements | Medium | Low | Critical | Medium | Low |
| Newsletter | Medium | High | Low | Medium | Low |
| Mobile performance | Critical | High | Critical | Medium | Low |
| Arabic content support | High | High | High | High | Low |
