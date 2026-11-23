import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts } from "../lib/posts";
import { markdownToHtml } from "../lib/seo";
import { site } from "../lib/site";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.id}`,
      categories: [post.data.topic],
      author: `${site.email} (${site.name})`,
      content: `${markdownToHtml(post.body ?? "")}<p><em>${post.data.closingQuestion}</em></p>`,
    })),
    customData: `<language>en</language>`,
  });
}
