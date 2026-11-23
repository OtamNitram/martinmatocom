import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const topics = ["Personal", "Leading Teams", "Mentoring", "AI in Teams"] as const;

export const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    topic: z.enum(topics),
    highlight: z.string().optional(),
    closingQuestion: z.string(),
    linkedinUrl: z.string().url().optional(),
    /** Position (1-3) in About's "Where to start"; posts without it are left out unless none has it. */
    startHere: z.number().int().min(1).max(3).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
