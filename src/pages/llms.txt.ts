/* llms.txt (https://llmstxt.org): a short, plain map of the site for language models. */
import type { APIRoute } from "astro";
import { getPosts } from "../lib/posts";
import { site } from "../lib/site";
import { bookGroups, books } from "../data/library";

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} is a ${site.jobTitle} at ${site.worksFor} who leads software teams from ${site.location}, Uruguay. He writes personal stories about leading teams, mentoring, bringing AI into a team, and life beyond the job title. Opinions are his own and open to debate.`,
    "",
    "Topics: Leading Teams, AI in Teams, Mentoring, Personal. Every story is first person and ends with a question for the reader.",
    "",
    "## Stories",
    ...posts.map((post) => `- [${post.data.title}](${site.url}/${post.id}): ${post.data.description} (${post.data.topic}, ${post.data.date.toISOString().slice(0, 10)})`),
    "",
    "## About",
    `- [About ${site.name}](${site.url}/about): how he got here, how he works (team building, psychological safety, ontological coaching) and where to start reading`,
    `- [Contact](${site.url}/contact): write to him directly`,
    `- [Library](${site.url}/library): ${books.length} books he keeps going back to, grouped as ${bookGroups.join(", ")}`,
    "",
    "## Optional",
    `- [Full text of every story](${site.url}/llms-full.txt)`,
    `- [RSS feed](${site.url}/rss.xml)`,
    `- [LinkedIn](${site.linkedin})`,
    `- [GitHub](${site.github})`,
    `- [X](${site.x})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
