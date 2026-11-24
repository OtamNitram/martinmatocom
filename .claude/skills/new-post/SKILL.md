---
name: new-post
description: Draft, check and publish a story on martinmato.com (the Astro blog in this repo). Use when Martín wants to add, write, draft, edit or publish a post, turn an iA Writer manuscript into a post, add a photo to a post, or says "nuevo post", "subir el post", "publicar la historia", "new story". Covers front matter, typography, the photo, pre-publish checks, the PR and what to do once it is live.
---

# New post on martinmato.com

Martín writes every story himself, usually in iA Writer. Your job is to turn his manuscript into a clean post, check it, and ship it. Talk to him in the language he writes to you in (usually Spanish); the post itself stays in English.

## Ground rules

- **The words are his.** Fix markup and typography only. Never rephrase, add, cut or "improve" a sentence. Suggest edits only if he asks, and show them as suggestions.
- **He decides** the title, topic, description, highlight, closing question, reply placeholder and alt text. Offer two or three options for each, built from his own text, and wait for his pick. Do not invent facts, quotes or dates about him.
- **He approves** anything public: pushing, opening the PR, merging (a merge to `main` deploys to production).
- **When this file and the code disagree, the code wins**: `src/content.config.ts` (the schema), `src/content/posts/_template.md`, `README.md` ("Writing a post"). Tell him the skill is stale.

## 1. Start the draft

1. Get from him: the manuscript (a file path or pasted text), the title, and the photo if there is one.
2. `npm run new-post -- "Sentence case title."` creates `src/content/posts/<slug>.md` with `draft: true`. The slug becomes the URL (`/<slug>`), the share card and the LinkedIn link, so **never change it after publishing**. If `npm` fails, the repo pins Node in `.nvmrc` (`nvm use`).
3. Replace the template body with his manuscript.

## 2. Front matter

Each field on one line. `draft`, `date`, `updated` and `image` stay **unquoted**: the sitemap and the share card read them with a regex.

| Field | Rule |
|---|---|
| `title` | Sentence case, ends with a period: "The armor I called confidence." |
| `description` | 160 characters at most (the build fails above). One or two plain sentences: it is the snippet search engines and AI models quote. |
| `date` | `YYYY-MM-DD`, the publication day. |
| `updated` | Only when he materially changes a published post. Feeds the sitemap's `lastmod`. |
| `topic` | Exactly one of: Personal, Leading Teams, Mentoring, AI in Teams. |
| `highlight` | The sentence the story turns on, in his words (the first post's appears verbatim in the text). It is the catch phrase on the home, About and "Keep reading". |
| `closingQuestion` | The question that ends the story. The page prints it after the body, so **remove it from the end of the body**. The page also adds "Thanks for reading. I’m Martín." itself. |
| `replyPlaceholder` | Optional. Starts the answer to the closing question: "The armor I had to take off was…". |
| `image`, `imageAlt` | Optional photo, see step 4. |
| `linkedinUrl` | Leave out until he has shared the story on LinkedIn. |
| `startHere` | 1–3, only if he says it is one of the stories to start reading with. Run `grep -rn startHere src/content/posts` first and never move another post's number. |
| `draft` | `true` until step 6. |

## 3. Body

- First person, never prescriptive: the site says "everything here is up for debate".
- No `# ` heading: the title is the h1. Use `##` in sentence case only when the story has clear parts; each becomes a numbered chapter with a table of contents and the reading tracker. Without `##` it reads as one piece. Never `###`.
- Typography: `’` for apostrophes and `“ ”` for quotes, never the straight ones (the published post has none). Fix stray or unmatched quotes that iA Writer exports leave behind. The published post has no em dashes: flag any in new text and ask instead of changing them.
- Stick to paragraphs, `##` headings, links, `**bold**` and `*italic*`. The RSS and `llms-full.txt` converter (`markdownToHtml` in `src/lib/seo.ts`) does not understand lists, tables, code or images, so they would show as raw text there. If a story needs one, ask him first.
- Do not touch `src/pages`, styles or `design-system/` for a post. If a story needs something the design does not have, ask.

## 4. Photo (optional)

- A real photo, never stock. One per post, shown under the title at up to 721px wide, cropped 3:2. It also becomes the right half of the share card.
- Save it as `src/content/posts/images/<slug>.jpg`: JPEG, 3:2, at least 721px wide, under about 400 KB. Crop and resize with `sharp` (already a dependency) or `sips` on macOS.
- Show him the crop **before** committing; he picks what stays in frame.
- Front matter: `image: ./images/<slug>.jpg` and an `imageAlt` that says what the photo shows ("Martín writing in his notebook at the dining table at night, under a warm lamp").

## 5. Check and preview

1. `npm run check-post -- <slug>`. Fix every error, read every warning. It checks the front matter, the photo, typography and the body structure.
2. Preview: `npx astro dev --background`, open `http://localhost:4321/<slug>` (drafts show in dev; `npx astro dev status` prints the port). Look at the head, the photo crop, the chapters, the closing card, at a phone width (about 390px) and on desktop, in light and dark (toggle at the top right). Then `npx astro dev stop`.
3. Show him the result and fix what he points out.

## 6. Publish (only when he says go)

1. Set `draft: false` and `date` to today, or the day he chooses.
2. `npm run build`, then `npm run check-post -- <slug> --built`. It must pass: the page, canonical, JSON-LD, share card under 300 KB (WhatsApp skips larger ones), sitemap, RSS, `llms.txt` and `llms-full.txt`.
3. Branch `post/<slug>` from an up-to-date `main`. Commit only the `.md` and its image, as `feat: publish "<title>"`.
4. Push and open a PR into `main`. If `gh auth status` works use `gh pr create`; if not, give him `https://github.com/OtamNitram/martinmatocom/compare/main...post/<slug>?expand=1`.
5. CI runs Lighthouse. Its single run on the home page is flaky (performance 0.87–0.93 on a GitHub runner): if that is the only failure, re-run the failed job before touching code.
6. He merges. Cloudflare Workers Builds deploys `main` automatically in a minute or two.

## 7. Once it is live

1. Verify with `curl -sI`: `https://martinmato.com/<slug>` is 200; `https://martinmato.com/og/<slug>.jpg` is `image/jpeg`; `https://martinmato.com/rss.xml` and `/sitemap-0.xml` list the slug.
2. Tell him what is left on his side, and offer to prepare it:
   - Share the story on LinkedIn, then send you the link. Add it as `linkedinUrl:` in a small PR (`feat: link <slug> to its LinkedIn post`): the closing card becomes "Join the conversation". If the preview looks old, refresh it in LinkedIn's Post Inspector.
   - Optional: Google Search Console → URL inspection → "Request indexing" for the new URL. Bing and others are pinged by Cloudflare Crawler Hints; Google is not, though it finds the sitemap anyway.
   - Nothing to do for analytics: Umami counts the visit and the `read` events (25, 50, 75, 100%) by itself.

## Editing a published post

Change the text, set `updated: YYYY-MM-DD` (unquoted) if the change is material, never touch the slug, then `npm run build` and `npm run check-post -- <slug> --built` and ship it as a PR like any other change.
