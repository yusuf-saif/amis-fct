export type NavItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

export const publicNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Overview", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Governance", href: "/about/governance" },
      { label: "Membership", href: "/about/membership" },
    ],
  },
  { label: "Schools" },
  { label: "News & Events" },
  { label: "Resources" },
  { label: "Contact" },
];

export const mobileNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Governance", href: "/about/governance" },
  { label: "Membership", href: "/about/membership" },
  { label: "Schools", href: "/" },
  { label: "News", href: "/" },
  { label: "Events", href: "/" },
  { label: "Resources", href: "/" },
  { label: "Contact", href: "/" },
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
      { label: "School Directory", href: "/" },
      { label: "Register Your School", href: "/" },
    ],
  },
  {
    heading: "News & Media",
    links: [
      { label: "Latest News", href: "/" },
      { label: "Events", href: "/" },
      { label: "Photo Gallery", href: "/" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Circulars", href: "/" },
      { label: "Academic Calendar", href: "/" },
      { label: "Curriculum Guides", href: "/" },
      { label: "Forms", href: "/" },
    ],
  },
];

export const homepageNews = [
  {
    category: "Official Circular",
    title: "AMIS FCT issues transition guidance for the 2026 academic session",
    date: "14 May 2026",
    excerpt: "A new circular clarifies reporting timelines, school readiness checks, and documentation expectations for member schools.",
  },
  {
    category: "Achievement",
    title: "Member schools recognised for excellence in inter-school Qur'an recitation",
    date: "09 May 2026",
    excerpt: "The association celebrated outstanding student performance and renewed its commitment to balanced academic and moral formation.",
  },
  {
    category: "General News",
    title: "AMIS FCT digital rebuild enters structured implementation phase",
    date: "02 May 2026",
    excerpt: "The secretariat has approved a phased rebuild intended to improve credibility, communication, and member school visibility.",
  },
];

export const homepageEvents = [
  {
    type: "Association Meeting",
    title: "Annual Principals Strategy Meeting",
    date: "20 July 2026",
    location: "AMIS FCT Secretariat, Abuja",
  },
  {
    type: "Teacher PD",
    title: "Islamic Studies curriculum alignment workshop",
    date: "05 August 2026",
    location: "Gwagwalada Learning Centre",
  },
  {
    type: "Student Competition",
    title: "Inter-school quiz and recitation showcase",
    date: "21 August 2026",
    location: "Abuja Municipal Hall",
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
