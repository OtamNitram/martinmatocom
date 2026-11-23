/**
 * Structured data (schema.org JSON-LD). Every page emits one @graph: the WebSite and the Person
 * (with stable @ids, so search engines and AI models tie every page to the same author),
 * plus the page's own nodes from the helpers below.
 */
import type { Post } from "./posts";
import { site } from "./site";
import type { Book } from "../data/library";

type Node = Record<string, unknown>;

export const ids = {
  website: `${site.url}/#website`,
  person: `${site.url}/#person`,
  blog: `${site.url}/#blog`,
};

export const postUrl = (post: Post) => `${site.url}/${post.id}`;

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: `${site.url}/`,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    author: { "@id": ids.person },
    publisher: { "@id": ids.person },
  };
}

export function personNode(image?: string): Node {
  return {
    "@type": "Person",
    "@id": ids.person,
    name: site.name,
    url: `${site.url}/about`,
    ...(image ? { image } : {}),
    description:
      "Principal Software Engineer at Kaizen Softworks who leads software teams from Montevideo, Uruguay, mentors people who are starting to lead, and brings AI into how teams work.",
    jobTitle: site.jobTitle,
    worksFor: { "@type": "Organization", name: site.worksFor },
    homeLocation: { "@type": "Place", name: `${site.location}, Uruguay` },
    email: `mailto:${site.email}`,
    knowsAbout: [
      "Leading software teams",
      "Mentoring",
      "AI adoption in software teams",
      "Psychological safety",
      "Ontological coaching",
      "Software engineering",
    ],
    sameAs: [site.linkedin, site.x, site.github],
  };
}

export function blogNodes(posts: Post[]): Node[] {
  return [
    {
      "@type": "Blog",
      "@id": ids.blog,
      url: `${site.url}/`,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      author: { "@id": ids.person },
      publisher: { "@id": ids.person },
      isPartOf: { "@id": ids.website },
      blogPost: posts.map((post) => ({ "@id": `${postUrl(post)}#article` })),
    },
  ];
}

export function profileNodes(): Node[] {
  return [
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/about#page`,
      url: `${site.url}/about`,
      name: `About ${site.name}`,
      inLanguage: "en",
      isPartOf: { "@id": ids.website },
      mainEntity: { "@id": ids.person },
    },
  ];
}

export function contactNodes(): Node[] {
  return [
    {
      "@type": "ContactPage",
      "@id": `${site.url}/contact#page`,
      url: `${site.url}/contact`,
      name: `Contact ${site.name}`,
      inLanguage: "en",
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.person },
    },
  ];
}

export function libraryNodes(books: Book[]): Node[] {
  return [
    {
      "@type": "CollectionPage",
      "@id": `${site.url}/library#page`,
      url: `${site.url}/library`,
      name: "Library: books Martín Mato keeps going back to",
      inLanguage: "en",
      isPartOf: { "@id": ids.website },
      author: { "@id": ids.person },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: books.length,
        itemListElement: books.map((book, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Book",
            "@id": `${site.url}/library#book-${book.id}`,
            name: book.title,
            author: book.author.split(/,\s*|\s&\s/).map((name) => ({ "@type": "Person", name })),
            image: `${site.url}/books/${book.id}.jpg`,
            genre: book.group,
          },
        })),
      },
    },
  ];
}

export function postNodes(post: Post, options: { wordCount: number; images: string[] }): Node[] {
  const url = postUrl(post);
  return [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.data.title,
      description: post.data.description,
      abstract: post.data.highlight ?? post.data.description,
      datePublished: post.data.date.toISOString(),
      dateModified: (post.data.updated ?? post.data.date).toISOString(),
      author: { "@id": ids.person },
      publisher: { "@id": ids.person },
      image: options.images,
      url,
      mainEntityOfPage: url,
      isPartOf: { "@id": ids.blog },
      articleSection: post.data.topic,
      keywords: [post.data.topic],
      wordCount: options.wordCount,
      inLanguage: "en",
      ...(post.data.linkedinUrl ? { discussionUrl: post.data.linkedinUrl } : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: post.data.title, item: url },
      ],
    },
  ];
}

/** Markdown to plain HTML for feeds: paragraphs, ## headings, quotes, links and emphasis. */
export function markdownToHtml(markdown: string) {
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (value: string) =>
    escape(value)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/\n/g, " ");
  return markdown
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const heading = block.match(/^(#{2,4})\s+(.*)$/);
      if (heading) {
        const level = heading[1].length;
        return `<h${level}>${inline(heading[2])}</h${level}>`;
      }
      if (block.startsWith("> ")) return `<blockquote><p>${inline(block.replace(/^> ?/gm, ""))}</p></blockquote>`;
      return `<p>${inline(block)}</p>`;
    })
    .join("");
}

/** Markdown to plain text for llms-full.txt: keeps ## headings, drops link and emphasis syntax. */
export function markdownToText(markdown: string) {
  return markdown
    .trim()
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1 ($2)")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1$2");
}
