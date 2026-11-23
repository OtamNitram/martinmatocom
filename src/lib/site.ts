export const site = {
  name: "Martín Mato",
  description:
    "Personal essays about leading teams, mentoring and bringing AI into a team. Written from Montevideo.",
  url: "https://martinmato.com",
  email: "hi@martinmato.com",
  linkedin: "https://www.linkedin.com/in/martinmato/",
  x: "https://x.com/otamnitram",
  xHandle: "@otamnitram",
  github: "https://github.com/OtamNitram",
  jobTitle: "Principal Software Engineer",
  worksFor: "Kaizen Softworks",
  location: "Montevideo",
} as const;

export type NavKey = "blog" | "about" | "contact";

export const nav = [
  { key: "blog" as const, label: "Blog", href: "/" },
  { key: "about" as const, label: "About", href: "/about" },
  { key: "contact" as const, label: "Contact", href: "/contact" },
];

export const footerNav = [
  { label: "Blog", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "RSS", href: "/rss.xml" },
];
