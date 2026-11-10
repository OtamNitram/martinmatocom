export const site = {
  name: "Martín Mato",
  description:
    "Personal essays about leading teams, mentoring and bringing AI into a team. Written from Montevideo.",
  url: "https://martinmato.com",
  linkedin: "https://www.linkedin.com/in/martinmato/",
  x: "https://x.com/otamnitram",
  xHandle: "@otamnitram",
  github: "https://github.com/OtamNitram",
  authorLine: "Principal Software Engineer. Writes from Montevideo, Uruguay.",
  jobTitle: "Principal Software Engineer",
  worksFor: "Kaizen Softworks",
  location: "Montevideo",
  postsPerPage: 2,
} as const;

export type NavKey = "blog" | "about" | "archive";

export const nav = [
  { key: "blog" as const, label: "Blog", href: "/" },
  { key: "about" as const, label: "About", href: "/about" },
  { key: "about" as const, label: "Contact", href: "/about#contact" },
];

export const footerNav = [
  { label: "Posts", href: "/archive" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/about#contact" },
  { label: "RSS", href: "/rss.xml" },
];
