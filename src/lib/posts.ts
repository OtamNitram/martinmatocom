import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "./site";

export const topics = ["Personal", "Leading Teams", "Mentoring", "AI in Teams"] as const;
export type Topic = (typeof topics)[number];
export type Post = CollectionEntry<"posts">;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"] as const;

export function formatDate(date: Date) {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

export function readTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function isListed(post: Post) {
  if (post.id.startsWith("_")) return false;
  if (import.meta.env.PROD && post.data.draft) return false;
  return true;
}

export async function getPosts() {
  const all = await getCollection("posts");
  return all.filter(isListed).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function pageCount(total: number) {
  return Math.max(1, Math.ceil(total / site.postsPerPage));
}

export function postsForPage(posts: Post[], page: number) {
  const start = (page - 1) * site.postsPerPage;
  return posts.slice(start, start + site.postsPerPage);
}

export function replyHref(post: Post) {
  return post.data.linkedinUrl ?? site.linkedin;
}
