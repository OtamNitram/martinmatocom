/* llms-full.txt: every story in full, as plain markdown, so models can read and quote it accurately. */
import type { APIRoute } from "astro";
import { formatDate, getPosts } from "../lib/posts";
import { markdownToText } from "../lib/seo";
import { site } from "../lib/site";

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const parts = [
    `# ${site.name}: all stories`,
    "",
    `> Personal stories by ${site.name}, ${site.jobTitle} at ${site.worksFor}, written from ${site.location}, Uruguay. Source: ${site.url}`,
    "",
    ...posts.flatMap((post) => [
      "---",
      "",
      `# ${post.data.title}`,
      "",
      `URL: ${site.url}/${post.id}`,
      `Published: ${formatDate(post.data.date)}${post.data.updated ? ` · Updated: ${formatDate(post.data.updated)}` : ""}`,
      `Topic: ${post.data.topic}`,
      `Author: ${site.name}`,
      ...(post.data.highlight ? [`Key sentence: ${post.data.highlight}`] : []),
      "",
      markdownToText(post.body ?? ""),
      "",
      `Question for the reader: ${post.data.closingQuestion}`,
      "",
    ]),
  ];
  return new Response(parts.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
