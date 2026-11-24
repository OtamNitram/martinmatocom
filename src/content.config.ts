import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const topics = ["Personal", "Leading Teams", "Mentoring", "AI in Teams"] as const;

export const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(160),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      topic: z.enum(topics),
      /** The sentence the post turns on: the catch phrase on cards and the abstract for search. */
      highlight: z.string().optional(),
      closingQuestion: z.string(),
      /** The LinkedIn post where this story was shared: switches the closing card to "Join the conversation". */
      linkedinUrl: z.string().url().optional(),
      /** A photo shown under the post's head, cropped 3:2. */
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** Placeholder of "Write to Martín", e.g. "The armor I had to take off was…". */
      replyPlaceholder: z.string().optional(),
      /** Position (1-3) in About's "Where to start"; posts without it are left out unless none has it. */
      startHere: z.number().int().min(1).max(3).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
