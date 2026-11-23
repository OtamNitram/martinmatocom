import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "./site";

export const topics = ["Personal", "Leading Teams", "Mentoring", "AI in Teams"] as const;
export type Topic = (typeof topics)[number];

/** The order the canvas shows topics in (filters on the home). */
export const topicOrder: Topic[] = ["Leading Teams", "AI in Teams", "Mentoring", "Personal"];

/** Short ids for classes and data attributes. */
export const topicSlug: Record<Topic, string> = {
  "Leading Teams": "leading",
  "AI in Teams": "ai",
  Mentoring: "mentoring",
  Personal: "personal",
};

/** The line that invites the reader in: the post's highlight, else its first paragraph. */
export function catchPhrase(post: CollectionEntry<"posts">) {
  if (post.data.highlight) return post.data.highlight;
  const first = (post.body ?? "")
    .trim()
    .split(/\n{2,}/)
    .find((block) => block.trim() && !block.startsWith("#") && !block.startsWith(">"));
  return (first ?? post.data.description).replace(/[*_`]/g, "").replace(/\s+/g, " ").trim();
}
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

/** "Keep reading" under a post: the same topic first, then the newest, never the post itself. */
export async function relatedPosts(post: Post, count = 2) {
  const others = (await getPosts()).filter((other) => other.id !== post.id);
  const sameTopic = others.filter((other) => other.data.topic === post.data.topic);
  const rest = others.filter((other) => other.data.topic !== post.data.topic);
  return [...sameTopic, ...rest].slice(0, count);
}

/** Minutes to read, as a number (about 200 words a minute). */
export function readMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** The three posts About suggests to a new reader: those marked startHere, else the newest. */
export async function startPosts() {
  const posts = await getPosts();
  const marked = posts.filter((post) => post.data.startHere).sort((a, b) => (a.data.startHere ?? 0) - (b.data.startHere ?? 0));
  return (marked.length ? marked : posts).slice(0, 3);
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
