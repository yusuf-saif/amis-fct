export type NavItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

export const publicNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "News & Media",
    href: "/events",
    children: [
      { label: "News & Announcements", href: "/news" },
      { label: "Events & Activities", href: "/events" },
      { label: "Photo Gallery", href: "/gallery" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About AMIS FCT", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Governance", href: "/about/governance" },
      { label: "Membership", href: "/about/membership" },
    ],
  },
  {
    label: "Schools",
    href: "/schools",
    children: [
      { label: "School Directory", href: "/schools" },
      { label: "Register Your School", href: "/register" },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const mobileNavigation = [
  { label: "Home", href: "/" },
  { label: "News & Announcements", href: "/news" },
  { label: "Events & Activities", href: "/events" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "About AMIS FCT", href: "/about" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Governance", href: "/about/governance" },
  { label: "Membership", href: "/about/membership" },
  { label: "Member Schools", href: "/schools" },
  { label: "Register Your School", href: "/register" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const aboutSubNavigation = [
  { label: "Overview", href: "/about" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Governance", href: "/about/governance" },
  { label: "Membership", href: "/about/membership" },
];

export const footerColumns = [
  {
    heading: "About AMIS FCT",
    links: [
      { label: "Our History", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Governance", href: "/about/governance" },
      { label: "Membership", href: "/about/membership" },
    ],
  },
  {
    heading: "Schools",
    links: [
      { label: "School Directory", href: "/schools" },
      { label: "Register Your School", href: "/register" },
    ],
  },
  {
    heading: "News & Media",
    links: [
      { label: "Latest News", href: "/news" },
      { label: "Events", href: "/events" },
      { label: "Photo Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Circulars", href: "/resources" },
      { label: "Academic Calendar", href: "/resources" },
      { label: "Curriculum Guides", href: "/resources" },
      { label: "Forms", href: "/resources" },
    ],
  },
  {
    heading: "Get in Touch",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const leadershipMembers = [
  {
    name: "Alhaji Musa Ibrahim",
    title: "Executive Chairman",
    bio: "Provides strategic direction for the association and leads engagement with member schools, scholars, and public stakeholders across the FCT.",
  },
  {
    name: "Hajiya Zainab Abdullahi",
    title: "Secretary General",
    bio: "Coordinates administration, records, and official communications to ensure member schools receive timely guidance and policy updates.",
  },
  {
    name: "Mallam Idris Muhammad",
    title: "Director of Programmes",
    bio: "Oversees teacher development, student activities, and inter-school programmes aligned with the association's educational mission.",
  },
  {
    name: "Ustadh Sadiq Bello",
    title: "Public Relations Officer",
    bio: "Supports public-facing communications, media coordination, and storytelling that reflects the dignity and warmth of the AMIS FCT community.",
  },
  {
    name: "Hajiya Khadijat Sani",
    title: "Treasurer",
    bio: "Guides internal financial accountability processes and supports the association's structured dues and reporting systems.",
  },
  {
    name: "Dr. Salman Yusuf",
    title: "Adviser, Quality Assurance",
    bio: "Advises on school standards, academic quality, and institutional credibility with government and community partners.",
  },
];
