import type { Post } from "./posts";
import { site } from "./site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.jobTitle,
    worksFor: { "@type": "Organization", name: site.worksFor },
    homeLocation: { "@type": "Place", name: `${site.location}, Uruguay` },
    url: site.url,
    sameAs: [site.linkedin, site.x, site.github],
  };
}

export function postJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.date.toISOString(),
    dateModified: (post.data.updated ?? post.data.date).toISOString(),
    abstract: post.data.highlight ?? post.data.description,
    author: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/${post.id}`,
    image: `${site.url}/og/${post.id}.png`,
  };
}

export function markdownToHtml(markdown: string) {
  const escape = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return markdown
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const quote = block.startsWith("> ");
      const text = escape(quote ? block.replace(/^> /gm, "") : block).replace(/\n/g, " ");
      return quote ? `<blockquote><p>${text}</p></blockquote>` : `<p>${text}</p>`;
    })
    .join("");
}
