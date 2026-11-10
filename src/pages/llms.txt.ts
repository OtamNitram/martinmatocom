import type { APIRoute } from "astro";
import { getPosts } from "../lib/posts";
import { site } from "../lib/site";

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.jobTitle} at ${site.worksFor}. Writes from ${site.location}, Uruguay about leading teams, mentoring and bringing AI into a team.`,
    "",
    "## Posts",
    ...posts.map((post) => `- [${post.data.title}](${site.url}/${post.id}): ${post.data.description}`),
    "",
    "## Profiles",
    `- [LinkedIn](${site.linkedin})`,
    `- [X](${site.x})`,
    `- [GitHub](${site.github})`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
