# Component Inventory

## AMIS FCT Website Rebuild — amisfct.org

**Prepared by:** Design Lead
**Date:** 2026-05-14
**Depends on:** design/02-color-typography.md, design/03-spacing-layout.md

Format per component:
- **Variants / States** — exhaustive list of every visual state
- **Appears on** — pages where this component renders
- **Content slots** — key data properties the component must accept
- **Accessibility** — WCAG requirements specific to this component
- **Mobile behaviour** — how it differs from desktop

---

## PUBLIC SITE COMPONENTS

---

### C01 — Global Navigation (Desktop)

**Variants / States:**
- Default (scrolled to top, transparent or white bg)
- Scrolled (solid white/parchment bg with `elevation-1` shadow — triggered after 80px scroll)
- Item: default, hover (underline + green-600 colour shift), active/current-page (green-600 text + bottom border 2px)
- Dropdown open / closed
- Search overlay open

**Appears on:** All public pages.

**Content slots:**
- Logo (SVG, links to `/`)
- Nav items: Home, About (dropdown), Schools (dropdown), News & Events (dropdown), Resources (dropdown), Contact
- Utility area: Search icon, Newsletter subscribe icon
- Social icons: Facebook, Twitter/X, WhatsApp

**Accessibility:**
- `<nav role="navigation" aria-label="Main navigation">`
- Active page: `aria-current="page"` on current nav item
- Dropdown: `aria-expanded`, `aria-haspopup="true"` on trigger; dropdown panel is `role="menu"`
- Keyboard: Tab through items; Enter/Space opens dropdowns; Escape closes dropdown; Arrow keys navigate within open dropdown
- Skip-to-content link as first focusable element on page: `<a href="#main-content" class="skip-link">`

**Mobile behaviour:** Hidden at `<768px`. Replaced by C02 (Mobile Navigation).

---

### C02 — Global Navigation (Mobile Hamburger)

**Variants / States:**
- Hamburger button: default, hover, pressed
- Navigation overlay: closed (hidden), open (full-screen slide-in from right)
- Nav item: default, active/current
- Search field: shown at top of overlay

**Appears on:** All public pages at `<768px`.

**Content slots:**
- Hamburger icon button (3-bar → X animation on open)
- Logo in top-left of overlay
- Close button top-right
- Search field at top of overlay menu
- Flat list: Home, About, Schools, Register Your School, News, Events, Resources, Gallery, Contact

**Accessibility:**
- Hamburger button: `aria-label="Open menu"` / `aria-label="Close menu"` (toggles)
- Overlay: `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"`
- When open: focus trapped inside overlay; Escape closes; focus returns to hamburger button on close
- Each nav link: `aria-current="page"` for active
- Overlay background: `inert` attribute on rest of page when overlay is open

**Mobile behaviour:** This IS the mobile component. Touch targets are 52px min height per item. Overlay slides in from the right over the page content. Semi-transparent backdrop behind overlay closes menu when tapped.

---

### C03 — Hero Banner

**Variants / States:**
- Standard (Homepage hero — full-bleed, with background pattern)
- Page hero (interior pages — shorter, green bg, page title)
- No image variant (text-only, no photo)

**Appears on:** Homepage (standard), About, Schools, News, Events, Resources, Contact (page hero).

**Content slots:**
- Background: parchment with Islamic geometric SVG pattern at 6% opacity (standard) OR solid green-800 (page hero)
- Eyebrow text (optional, e.g. "Association of Model Islamic Schools, FCT")
- Headline (H1)
- Subheading / description (body-lg)
- Primary CTA button (required)
- Secondary CTA (optional)
- Hero image / photo (optional, right-aligned on desktop, hidden on mobile or shown below text)

**Accessibility:**
- One `<h1>` per page, inside the hero
- Background pattern: `aria-hidden="true"` on SVG pattern element
- Hero image: descriptive `alt` text required
- CTA buttons: unique accessible names (not "Click here")

**Mobile behaviour:** Single column. Headline scales via fluid clamp(). Hero image hidden at `<480px` to preserve performance — the text content carries the message. CTAs stack vertically, full-width.

---

### C04 — School Card (Directory Listing)

**Variants / States:**
- Default
- Hover (slight lift: `elevation-2`, translate-y -2px)
- Active Member badge variant (shows green "Active Member" pill)
- No Photo variant (placeholder with geometric pattern background)
- Loading skeleton variant

**Appears on:** `/schools` (directory), Homepage (teaser section, limited variant).

**Content slots:**
- School photo (16:9 aspect ratio, WebP, lazy-loaded)
- School name (H5, bold)
- Area Council / LGA (label text, muted)
- School level (primary/secondary/both) — displayed as a small tag
- Phone number (tappable `tel:` link on mobile)
- "Active Member" badge (conditional, green-100 bg, green-700 text)
- "View Profile" CTA link

**Accessibility:**
- Entire card is not one big link — only the school name and "View Profile" are links (prevents double-announcement by screen readers)
- Phone number link: `aria-label="Call [School Name]: [number]"`
- Image alt: "[School Name] school building"
- Card: `role="article"`, or inside a `<ul>` with `<li>` items

**Mobile behaviour:** Full-width single column on mobile (4/4 columns). Image at top (16:9), content below. Phone number displayed prominently — it is the most important piece of information for Fatima on a phone.

---

### C05 — School Directory Filters

**Variants / States:**
- Expanded (desktop: inline filter bar)
- Collapsed / dropdown (mobile: "Filter" button opens a bottom sheet)
- Filter active (active filter chip shown with clear × button)
- Filter cleared (back to default)

**Appears on:** `/schools` only.

**Content slots:**
- Area Council dropdown (6 options + All)
- School Level dropdown (Primary / Secondary / Both / All)
- Clear Filters link (visible only when any filter is active)
- Result count: "Showing X of Y schools"

**Accessibility:**
- `<form role="search">` wrapping the filter controls
- Each dropdown: `<label>` explicitly associated with `<select>` or custom dropdown trigger
- Result count is live region: `role="status"` or `aria-live="polite"` — updates when filter applied
- Clear filters button: `aria-label="Clear all filters"`

**Mobile behaviour:** Filters hidden behind a "Filter & Sort" button that opens a bottom sheet (modal panel anchored to bottom of screen). Bottom sheet has full-width dropdowns and a prominent "Apply Filters" button. Active filter count shown on the button: "Filter (2)".

---

### C06 — Search Bar

**Variants / States:**
- Resting (placeholder text visible, subtle border)
- Focused (green focus ring `--shadow-focus`, border green-600)
- Has content (× clear button appears right-aligned)
- Loading (inline spinner replaces clear button)
- No results (search bar + inline "No results for X" message below)

**Appears on:** School directory (`/schools`), Navigation overlay (site-wide search), Admin school search, Admin notification audience search.

**Content slots:**
- Search icon (left-aligned inside field)
- Input field (placeholder text)
- Clear button (right-aligned, only when input has content)
- Loading indicator (inline spinner)

**Accessibility:**
- `role="search"` on the wrapping element
- `<label>` visually hidden but present (`class="sr-only"`)
- `aria-label="Search schools"` or contextual label
- Live results: `aria-live="polite"` on results container
- Clear button: `aria-label="Clear search"`

**Mobile behaviour:** Full-width. Keyboard opens on tap (iOS/Android virtual keyboard). Height 48px for comfortable tap target.

---

### C07 — News Post Card

**Variants / States:**
- Default (image + content)
- No Image (content only, green-50 placeholder background)
- Featured (first card in listing — larger image, more prominent type)
- Hover (slight lift)
- Loading skeleton

**Appears on:** `/news` (listing), Homepage (3 latest posts).

**Content slots:**
- Featured image (3:2 aspect ratio, lazy-loaded)
- Category badge (pill — "Official Circular", "Achievement", etc.)
- Post title (H5 on listing, H4 if featured)
- Date (formatted DD Month YYYY)
- Excerpt (max 120 characters, truncated with ellipsis)
- Author (optional)
- "Read More" link

**Accessibility:**
- `<article>` element
- Heading within article: `<h2>` or `<h3>` (not `<h5>` — this is a heading within a `<section>` context)
- Image alt: descriptive of post content, not filename
- Date: `<time datetime="2026-05-14">14 May 2026</time>`
- "Read More" link includes accessible name: `aria-label="Read more about [Post Title]"`

**Mobile behaviour:** Full-width, stacked (image above content). Image aspect ratio maintained. Title truncated to 2 lines on small screens.

---

### C08 — Event Card

**Variants / States:**
- Upcoming (default, full colour)
- Past (muted colour, "Past Event" label)
- Today (green-600 date highlight)
- Hover (slight lift)
- Loading skeleton

**Appears on:** `/events` (listing), Homepage (3 upcoming events).

**Content slots:**
- Event type badge (pill — "Student Competition", "Teacher PD", etc.)
- Event title (H5)
- Date block: day number (large, bold, green), month, year
- Location (icon + text)
- Brief description (2 lines max, truncated)
- "View Details" link

**Accessibility:**
- `<article>` element
- Date: `<time datetime="2026-06-01T09:00">1 June 2026 at 09:00</time>`
- Location icon: `aria-hidden="true"`; text label provides full information
- "View Details" link: `aria-label="View details for [Event Title]"`

**Mobile behaviour:** Full-width. Date block displayed as a horizontal band (day + month on the left, coloured). Event title and location prominent. Touch-friendly height.

---

### C09 — Resource Download Row

**Variants / States:**
- Default
- Hover (green-50 background tint, download icon animates)
- Downloading (progress indicator, optional)
- New (green badge "New" for resources uploaded in last 7 days)

**Appears on:** `/resources/circulars`, `/resources/academic-calendar`, `/resources/curriculum`, `/resources/forms`.

**Content slots:**
- File type icon (PDF icon, DOCX icon — colour-coded)
- Document title
- Circular number (optional, for Circulars category)
- Date published
- File size (auto-detected, e.g., "245 KB")
- Download button (icon + label "Download")

**Accessibility:**
- `<a download href="...">` for the download action
- Download link: `aria-label="Download [Title] (PDF, 245 KB)"`
- File type icon: `aria-hidden="true"` (description is in the button label)
- List structure: rows inside `<ul>`, each row is `<li>`

**Mobile behaviour:** Title on first line; metadata (date, size) on second line, muted. Download button becomes a full-width `<a>` with tappable height 48px.

---

### C10 — Gallery Album Card

**Variants / States:**
- Default
- Hover (cover photo zooms in slightly with `scale(1.03)`, overlay appears with album title)
- Loading skeleton

**Appears on:** `/gallery` (albums listing), Homepage (gallery preview teaser — 6 photos, not album cards).

**Content slots:**
- Cover photo (4:3 aspect ratio)
- Album title (overlaid on photo on hover; below photo on default)
- Event / date association (metadata below title)
- Photo count badge ("12 photos")

**Accessibility:**
- Image alt: "[Album Title] — event photos"
- Card link: wraps the entire card, `aria-label="View album: [Album Title], [Photo Count] photos"`
- Hover-only overlay: album title must also be visible in default state (below photo) — hover state is an enhancement, not the only way to read it

**Mobile behaviour:** 2 columns at mobile (2/4 grid). Titles always visible below photo (no hover-only overlay). Touch targets are full card size.

---

### C11 — Contact Form

**Variants / States:**
- Default (empty)
- Focused field (green focus ring)
- Filled field
- Validation error (field-level: red border, error message below field)
- Submitting (button shows loading spinner, fields disabled)
- Success (form replaced by success message)
- Server error (alert banner above form)

**Appears on:** `/contact`, Homepage (newsletter variant is a subset of this).

**Content slots:**
- Full Name (required)
- Email (required)
- Phone (optional)
- Subject dropdown (required: General Enquiry / School Admissions / School Membership / Partnership / Media / Website Feedback)
- Message textarea (required, min 20 chars)
- NDPR consent checkbox + Privacy Policy link
- Submit button

**Accessibility:**
- `<form>` with `aria-label="Contact us"`
- Each field: `<label>` explicitly paired via `for`/`id`
- Required fields: `required` attribute + visual asterisk with `aria-label="required"`
- Error messages: `role="alert"` on error text; field `aria-describedby` points to error id
- Consent checkbox: `aria-required="true"`
- Submit button: `aria-busy="true"` during submission

**Mobile behaviour:** Single column (no multi-column layouts). Textarea height 120px minimum. Submit button full-width on mobile.

---

### C12 — School Registration Form (Multi-Step)

**Variants / States:**
- Step indicator (progress: Step 1 of 3)
- Each step: idle, partially filled, complete, with errors
- File upload: idle, dragging (only desktop), uploading, uploaded, error
- Step validation (can't proceed to next step with unresolved errors)
- Final submit: submitting, success, server error

**Appears on:** `/register`

**Content slots:**
- **Step 1 — School Details:** Name, Area Council (dropdown), Arms (multi-select checkboxes), Year Established, Principal Name
- **Step 2 — Contact & Location:** Contact Email, Contact Phone, Physical Address
- **Step 3 — About & Photo:** Short Description (300-word max with counter), School Photo (file upload), NDPR consent
- Step navigation: Back button, Next button / Submit button
- Step indicator (e.g., "Step 2 of 3")

**Accessibility:**
- `<form>` labelled for each step: `aria-label="School registration — step 2 of 3"`
- Step indicator: `role="progressbar"`, `aria-valuenow`, `aria-valuemax`
- Multi-select checkboxes: `<fieldset>` + `<legend>` grouping
- File upload: `<input type="file">` with explicit label; supported file types listed in label
- Word counter: `aria-live="polite"` to announce count updates
- Error summary at top of step when proceeding with errors: `role="alert"` listing all field errors with jump links

**Mobile behaviour:** Single column, full-width fields. Multi-step approach is specifically chosen to avoid a long scrolling single-page form on mobile. Step indicator is a simple numbered circle row at the top.

---

## ADMIN COMPONENTS

---

### C13 — Admin Sidebar Navigation

**Variants / States:**
- Expanded (240px wide, full labels)
- Collapsed / icon-only (64px wide, tooltips on hover — at `md` breakpoint)
- Nav item: default, hover, active/current
- Section label (non-interactive divider between groups)
- Notification badge on item (e.g., "3 pending" on Schools item)

**Appears on:** All admin pages at `/admin/*`.

**Content slots:**
- Logo / brand mark (top of sidebar)
- Navigation groups:
  - Overview: Dashboard
  - Schools: All Schools, Pending Applications
  - Dues: Dues Management, Settings
  - Content: News, Events, Resources, Gallery
  - Leadership
  - Communications: Notifications
  - Inbox: Enquiries
  - Administration: Users, Audit Log (Super Admin only)
- Current user avatar + name + role (bottom of sidebar)
- Sign Out link (bottom)

**Accessibility:**
- `<nav role="navigation" aria-label="Admin navigation">`
- Active item: `aria-current="page"`
- Collapsed state tooltips for icon-only mode: `title` attribute + programmatic tooltip on focus
- Notification badges: `aria-label="[Count] pending [item]"` on the badge element; screen reader reads "Schools, 3 pending applications"
- Super Admin-only items: not rendered in DOM for Editor role (not just hidden) to prevent discovery

**Mobile behaviour:** Sidebar hidden entirely at `<768px`. Access via hamburger icon in admin top bar. On mobile, sidebar opens as a drawer overlaying the content, not pushing it.

---

### C14 — Admin Data Table

**Variants / States:**
- Default (with column headers)
- Sortable column header: default, hover, sorted-asc (↑), sorted-desc (↓)
- Row: default, hover (`--color-admin-hover`), selected (checkbox checked)
- Row action buttons: Edit, Remove/Delete, View, Approve, Reject (contextual)
- Loading state (skeleton rows)
- Empty state (no rows match current filter)
- Paginated (footer with prev/next)

**Appears on:** `/admin/schools`, `/admin/dues`, `/admin/news`, `/admin/events`, `/admin/resources`, `/admin/gallery`, `/admin/notifications`, `/admin/enquiries`, `/admin/users`, `/admin/audit-log`.

**Content slots:**
- Column headers (configurable per use case, sortable flag per column)
- Row data cells
- Row action cell (aligned right)
- Checkbox column (optional, for bulk actions)
- Pagination footer: page X of Y, rows per page selector, prev/next buttons

**Accessibility:**
- `<table>` with `<caption>` (visually hidden but present)
- Column headers: `<th scope="col">`; sort button inside `<th>`: `aria-sort="ascending"/"descending"/none`
- Row checkboxes: `aria-label="Select [row identifier]"`
- Pagination: `<nav aria-label="Table pagination">`
- Empty state and loading state replace `<tbody>` content, maintaining table structure

**Mobile behaviour:** At `<768px`, admin tables switch to a card-list layout (each row becomes a vertical card showing key fields only, with action buttons). Column headers are hidden; field labels appear inline in each card. This is the "responsive table" pattern for admin on tablet.

---

### C15 — Dues Status Badge

**Variants:**
- Paid (green-100 bg, green-800 text)
- Partial (yellow-100 bg, yellow-800 text: `#FEF3C7` / `#92400E`)
- Unpaid (red-100 bg, red-800 text: `#FEE2E2` / `#991B1B`)
- Dues Outstanding (amber-50 bg, amber-800 text — admin only)

**Appears on:** `/admin/dues` table, `/admin/dashboard` summary strip; "Active Member" badge variant on `/schools` and `/schools/[slug]` (public, Paid only, green).

**Content slots:**
- Status label text
- Optional icon (checkmark for Paid, partial for Partial, X for Unpaid)

**Accessibility:**
- Not conveyed by colour alone — the text label carries the meaning
- For decorative icon: `aria-hidden="true"`
- For screen readers: the status text in the table cell is sufficient

**Mobile behaviour:** Badge is inline with the school name in the responsive card layout. No behavioural difference.

---

### C16 — Notification Composer

**Variants / States:**
- Idle (empty form)
- Audience selected (recipient count preview shown)
- Body writing (rich text editor active)
- Schedule mode (date/time picker visible)
- Sending (submit button loading state, fields locked)
- Sent successfully (success banner, form cleared)
- Error (server error alert)

**Appears on:** `/admin/notifications`

**Content slots:**
- Subject line input
- Audience selector (multi-select with sections: All, By LGA, By Arm, By Dues Status, Individual)
- Recipient count preview: "This notification will be sent to X schools"
- Rich text body editor (see C17)
- Optional PDF attachment upload (see C19)
- Send options: "Send Now" radio / "Schedule" radio
- Date + time picker (visible when Schedule selected)
- Send / Schedule button

**Accessibility:**
- Form: `aria-label="Compose notification"`
- Audience selector: custom multi-select with `role="combobox"` or standard `<select multiple>` with visible label
- Recipient count: `aria-live="polite"` to announce when audience changes
- Date/time picker: see C26 (Date Picker component)

**Mobile behaviour:** This is a desktop-only admin flow. At `<768px`, a simplified version is accessible but the full composer is not the primary mobile experience.

---

### C17 — Rich Text Editor

**Variants / States:**
- Idle
- Active (cursor inside, toolbar highlighted)
- Character/word count shown (for description fields with limits)
- Auto-saved indicator (bottom-right: "Saved just now")
- Dirty (unsaved changes since last save)
- Error (server save failed)

**Appears on:** `/admin/news/new`, `/admin/news/[id]/edit`, `/admin/events/new`, `/admin/events/[id]/edit`, `/admin/notifications` (body), `/admin/schools/pending/[id]` (Request More Info message).

**Content slots:**
- Toolbar: Bold, Italic, Underline, Link, Bullet List, Numbered List, Heading (H2/H3 only — H1 is for page title), Image insert, RTL direction toggle (for Arabic content blocks)
- Content area (contenteditable)
- Character / word count (below editor, muted)
- Auto-save indicator

**Accessibility:**
- `role="textbox"`, `aria-multiline="true"`, `aria-label="Post body"`
- Toolbar buttons: `role="button"`, `aria-pressed` (for toggle states), `aria-label` for each action
- Keyboard accessible: Tab enters editor; Esc exits; toolbar accessible via keyboard navigation
- RTL toggle: `aria-label="Toggle right-to-left text direction for Arabic"`

**Mobile behaviour:** Toolbar scrolls horizontally on mobile to accommodate all buttons in a single row. Content area is full-width.

---

### C18 — File Upload Component

**Variants / States:**
- Idle (dropzone with instructions)
- Drag over (border becomes green-600, background green-50 — desktop only)
- Uploading (progress bar, filename shown)
- Uploaded (checkmark, filename, file size, remove button)
- Error (red border, error message: "File too large", "Invalid file type")
- Multiple files (list of uploaded files, each with remove button)

**Appears on:** `/register` (school photo), `/admin/news/new` (featured image, attachments), `/admin/resources/upload`, `/admin/gallery/new` (bulk photos), `/admin/notifications` (PDF attachment).

**Content slots:**
- Upload area (dashed border, icon, "Choose file or drag and drop")
- Accepted file types label (e.g., "JPG, PNG up to 5MB")
- `<input type="file">` (visually hidden, triggered by click on upload area)
- For bulk/gallery: `multiple` attribute; shows thumbnail grid of uploaded images
- Progress bar (during upload)
- Uploaded file list

**Accessibility:**
- `<label>` wraps the visual upload area and the hidden input — clicking anywhere on the area triggers the file picker
- `aria-label` on input includes accepted types and size limit
- Drag-and-drop is enhancement; keyboard users use the file input
- Progress: `role="progressbar"`, `aria-valuenow`, `aria-valuemax`
- Error: `role="alert"`, announced immediately

**Mobile behaviour:** No drag-and-drop on mobile (interaction doesn't exist). File picker opens device camera/gallery picker. Multiple file selection supported on modern Android.

---

### C19 — Approval Action Buttons

**Variants:**
- Three-button set: Approve (green), Request More Info (amber), Reject (red)
- Two-button set for already-actioned: "Approved — View Profile" / "Rejected — View Reason"
- Loading state on each button (spinner, disabled others while one is processing)
- Confirmation modal required for Approve and Reject (not for Request More Info, which is reversible)

**Appears on:** `/admin/schools/pending/[id]`

**Content slots:**
- Approve: `--color-green-600` background, white text; opens confirmation modal
- Request More Info: `--color-warning-bg` background, `--color-warning-text` text, opens a text input modal for the message
- Reject: `--color-error-bg` background, `--color-error-text` text; opens rejection reason modal

**Accessibility:**
- Buttons: `type="button"`, explicit `aria-label` including the school name: "Approve [School Name]'s application"
- Modal: focus moves to modal on open; trapped inside; Escape closes (with "are you sure" if a reason was typed)

**Mobile behaviour:** Buttons stack vertically, full-width on mobile.

---

### C20 — Stats / KPI Cards

**Variants:**
- Simple count (large number + label)
- Count with trend (number + up/down percentage vs last period)
- Progress bar variant (X of Y, progress fill)
- Dues summary variant (₦ total with breakdown)

**Appears on:** `/admin/dashboard`, `/admin/dues` (summary strip).

**Content slots:**
- Label (e.g., "Pending Applications")
- Primary value (number, currency, or percentage)
- Secondary value / trend (optional)
- Icon (optional, reinforces meaning)
- Link to relevant section (optional, makes entire card clickable)

**Accessibility:**
- `<article>` or `<section>` with `<h3>` for the label
- Currency values: `aria-label="Total collected: ₦247,000"` (screen reader announces the symbol correctly)
- Trend icons (↑↓): `aria-hidden="true"`, trend text in visible label

**Mobile behaviour:** Cards form a 2-column grid on mobile, full-width stack if fewer than 2. Compact variant with smaller numbers on small screens.

---

## SHARED / UTILITY COMPONENTS

---

### C21 — Breadcrumb

**Variants:** Standard (text links) only.

**Appears on:** All public pages deeper than level 1 (About, About/Leadership, Schools/[slug], News/[slug], etc.).

**Content slots:**
- Items: Home → [Section] → [Current Page]
- Current page item is text (not a link)
- Separator: `/` or `›` character

**Accessibility:**
- `<nav aria-label="Breadcrumb">`, `<ol>` list
- Current page item: `aria-current="page"`
- Separators: `aria-hidden="true"`

**Mobile behaviour:** Truncates to "← [Parent Page]" on small screens when more than 2 levels deep. Shows back navigation clearly.

---

### C22 — Footer (Public)

**Content slots:**
- Logo + Association name
- Tagline
- Four link columns: About, Schools, News & Media, Resources, Contact (per IA document)
- Address, phone, email
- Social media icons
- Copyright line
- Privacy Policy + Cookie Policy links

**Accessibility:**
- `<footer role="contentinfo">`
- Each column: `<h3>` heading + `<ul>` list
- Address: `<address>` element

**Mobile behaviour:** Columns stack vertically. Logo and tagline above. Address and copyright below links.

---

### C23 — Cookie Consent Banner

**Variants / States:**
- First visit (shown at bottom of screen)
- Dismissed (hidden, preference stored in localStorage for 12 months)

**Content slots:**
- Short explanation (1 sentence)
- Privacy Policy link
- Accept button (primary)
- Decline button (ghost)

**Accessibility:**
- `role="dialog"`, `aria-live="polite"`, `aria-label="Cookie consent"`
- Focus is NOT trapped (unlike modals) — users should still be able to use the site while banner is visible
- Both Accept and Decline buttons have explicit `aria-label`

**Mobile behaviour:** Full-width bar at screen bottom. Stacked layout (text above buttons). Minimum touch target 44px on both buttons.

---

### C24 — Modal / Dialog

**Variants / States:**
- Informational (close button only)
- Confirmation (Cancel + Confirm actions)
- Form modal (e.g., rejection reason, request more info)
- Destructive confirmation (red confirm button)
- Loading (content replaced with spinner while async action runs)

**Appears on:** School approval/rejection actions, remove school confirmation, delete post confirmation, admin user deactivation.

**Content slots:**
- Title
- Body content (text or form)
- Action buttons (right-aligned: Cancel [ghost] + Confirm [primary or destructive])
- Close × button top-right

**Accessibility:**
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title id)
- Focus moves to first focusable element inside modal on open
- Focus trapped inside while open
- Escape key closes (with unsaved-changes warning for form modals)
- Background content: `inert` attribute when modal open

**Mobile behaviour:** Full-screen sheet (bottom-anchored) at `<480px`. Slides up from bottom. Matches Apple/Android bottom sheet pattern familiar to mobile users.

---

### C25 — Toast Notification

**Variants:**
- Success (green icon, green-800 bg or white with green border)
- Error (red)
- Warning (amber)
- Info (blue)
- With action (e.g., "Undo" button inline)

**Appears on:** All admin pages (triggered by save, publish, approve, delete actions). Public pages for form submissions.

**Content slots:**
- Icon (type-specific)
- Message text (brief, specific: "Circular uploaded and published." not "Success!")
- Optional action button (Undo, View)
- Auto-dismiss timer (4 seconds default; 6 seconds if action button present)

**Accessibility:**
- `role="status"` for informational toasts
- `role="alert"` for error toasts (announced immediately by screen reader)
- `aria-live="polite"` on the toast container
- Close button: `aria-label="Dismiss notification"`

**Mobile behaviour:** Full-width at bottom of screen (above any navigation). Stacks if multiple toasts.

---

### C26 — Empty State

**Variants:**
- No data yet (fresh/first-use empty state)
- No results (search/filter found nothing)
- Error loading data (retry option)

**Appears on:** Every list/table page in both public and admin site.

**Content slots:**
- Illustration (simple line drawing, culturally appropriate — not generic SaaS stock art)
- Heading (see Section on empty state copy in `06-handoff-spec.md`)
- Subtext explanation
- CTA (contextual: "Register your school", "Create first post", "Clear filters")

**Accessibility:**
- Not inside a `<table>` structure — empty state replaces the whole content area
- Illustration: `aria-hidden="true"` (purely decorative)
- Heading is focusable target if keyboard user is redirected here

**Mobile behaviour:** Centred, full-width. Illustration scales down. No change in structure.

---

### C27 — Loading Skeleton

Shown while async data is fetching. Matches the exact layout of the content it will replace.

**Variants:**
- School card skeleton (image placeholder + text lines)
- News card skeleton
- Table row skeleton (3 skeletons shown)
- Stats card skeleton
- Full-page skeleton (admin dashboard on first load)

**Implementation:** CSS-only animated gradient shimmer (`background: linear-gradient(90deg, ...)` + `animation: shimmer 1.5s infinite`). No JavaScript required.

**Accessibility:**
- Container: `aria-busy="true"` while loading; `aria-label="Loading content"`
- Skeleton elements: `aria-hidden="true"` (they convey no meaning)
- When content loads: `aria-busy="false"` removed; focus management if user was waiting

---

### C28 — Pagination

**Variants:**
- Standard (prev / [1] [2] [3] ... [N] / next)
- Simple (prev / next with "Page X of Y" label)
- Loading (buttons disabled during page fetch)

**Appears on:** `/news`, `/resources/circulars`, `/admin/schools`, `/admin/dues`, `/admin/news`, `/admin/audit-log`.

**Content slots:**
- Previous button (disabled on first page)
- Page number buttons (active page highlighted, ellipsis for large page ranges)
- Next button (disabled on last page)
- "Page X of Y" label

**Accessibility:**
- `<nav aria-label="Pagination">`
- Current page: `aria-current="page"`
- Prev/Next: `aria-label="Go to previous page"` / `"Go to next page"`
- Disabled buttons: `aria-disabled="true"`, `disabled` attribute

**Mobile behaviour:** Shows prev/next + current page number only (no page number buttons). Simple and space-efficient.

---

### C29 — Tabs

**Variants / States:**
- Tab: default, hover, active/selected, disabled
- Tab panel: visible/hidden
- Overflow: scrollable tabs when too many to fit width

**Appears on:** `/news` (category filter: All / Official Circular / Press Release / Achievement), `/events` (filter), `/resources` (sub-sections), `/admin/dues` (filter tabs), `/admin/notifications` (Compose / History tabs).

**Content slots:**
- Tab labels (text, optional count badge)
- Tab panels (swappable content regions)

**Accessibility:**
- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Selected tab: `aria-selected="true"`, `tabindex="0"`; others: `tabindex="-1"`
- Keyboard: Arrow keys navigate between tabs; Enter/Space selects; Tab moves focus into tab panel

**Mobile behaviour:** Scrolls horizontally if tabs overflow viewport width. Touch-swipe to navigate between panels (progressive enhancement).

---

### C30 — Dropdown / Select

**Variants:**
- Native `<select>` (used for simple single-select with no custom styling needs)
- Custom dropdown (styled to match design system, supports search within options)
- Multi-select (checkboxes inside dropdown — used for notification audience selector, school arms)

**Appears on:** Throughout forms, filter bars, admin settings.

**Content slots:**
- Trigger button (selected value or placeholder)
- Dropdown panel (absolutely positioned)
- Option list
- Search input (custom dropdown with many options)

**Accessibility:**
- Custom dropdown: `role="combobox"` pattern (ARIA 1.2 combobox spec)
- `aria-expanded`, `aria-haspopup="listbox"`
- Option list: `role="listbox"`, options: `role="option"`, selected: `aria-selected="true"`
- Keyboard: Enter opens; Arrow keys navigate; Enter selects; Escape closes
- Always prefer native `<select>` if custom styling is not required — it has better mobile native UX

**Mobile behaviour:** Native `<select>` elements use the OS native picker on mobile (iOS bottom wheel picker, Android dropdown picker) — do not replace these with custom dropdowns on mobile. Mobile pickers are far more accessible and usable than custom implementations.

---

### C31 — Date Picker

**Variants / States:**
- Input trigger: idle, focused, has value
- Calendar panel: open, closed
- Date: selectable, selected, today, disabled (past dates when scheduling future events)
- Date range (for event start/end — two pickers, second disabled until first selected)
- Date + time (for notification scheduling, event creation)

**Appears on:** `/admin/events/new` (start/end dates), `/admin/notifications` (schedule date/time), `/admin/dues` (payment date), admin registration fields.

**Content slots:**
- Text input (formatted date, user-editable)
- Calendar icon trigger button
- Month/year navigation (prev/next month arrows)
- Day grid
- Time selector (if date + time variant)
- "Today" shortcut button

**Accessibility:**
- Text input accepts `YYYY-MM-DD` ISO format as well as human-readable input
- Calendar: `role="grid"`, days: `role="gridcell"`, selected: `aria-selected="true"`, today: `aria-label="Today, [Date]"`
- Navigation buttons: `aria-label="Previous month"` / `"Next month"`
- `aria-live="polite"` announces month/year change

**Mobile behaviour:** Text input only on mobile — no floating calendar panel (unusable on small screens). Browser native `<input type="date">` or `<input type="datetime-local">` used on mobile viewports.

---

### C32 — Tag / Badge

**Variants:**
- Category tag (outlined, grey): e.g., "Official Circular"
- Status badge (filled): "Approved", "Pending", "Rejected"
- Dues badge (coloured): Paid / Partial / Unpaid
- Count badge (on nav items): number in small green circle
- "New" badge: small green pill
- Removable tag (in filter bar, with × close button)

**Content slots:** Label text, optional icon, optional close button.

**Accessibility:**
- Pure decorative colour badges: the text label carries meaning
- Removable tag close button: `aria-label="Remove [label] filter"`

---

### C33 — Alert Banner

**Variants:**
- Success (green)
- Warning (amber)
- Error (red)
- Info (blue)
- Dismissible (× button, or auto-dismiss)
- Sticky (remains visible while scrolling — used for critical admin warnings)

**Appears on:** Form submission feedback, admin action results, system messages at top of admin pages.

**Content slots:**
- Icon (type-specific)
- Title (optional, bold)
- Body text
- Action link or button (optional)
- Close button (optional)

**Accessibility:**
- `role="alert"` for error/warning (announced immediately)
- `role="status"` for success/info
- Close button: `aria-label="Dismiss alert"`

---

### C34 — Avatar

**Variants:**
- Image (admin user photo)
- Initials fallback (when no photo set — first two initials on green-600 background)
- Sizes: sm (24px), md (32px), lg (40px), xl (56px)

**Appears on:** Admin sidebar (current user), admin audit log, admin user management list.

**Content slots:**
- Image (optional)
- User name (for alt text and initials fallback)

**Accessibility:**
- `<img alt="[User Name]">` if image; if initials: `aria-label="[User Name]"`
- Used alongside visible name text in most contexts — the avatar itself is supplementary

**Mobile behaviour:** No change — avatars are small and consistent across viewports.
