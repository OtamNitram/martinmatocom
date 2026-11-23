# martinmato.com

Martín Mato's personal site and blog: personal stories about leading software teams, mentoring and bringing AI into a team.

The site is an Astro project in this folder. The design lives in `design-system/`: the page designs in `design-system/pages/` (the final Claude Design canvas) are the source of truth, and `design-system/README.md` is the brand book. Node 22.23.4 or newer (`nvm use`, see `.nvmrc`).

```
npm run dev          # or: npx astro dev --background (see AGENTS.md)
npm run build
npm run new-post -- "Sentence case title."
npm run lighthouse   # after a build: performance, accessibility, best practices, SEO
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, author intro, Latest stories with topic filters, Library teaser |
| `/about` | Story timeline, how I work, where to start, contact form in the dark ending |
| `/contact` | Contact form with topic chips |
| `/library` | The 22 books (`src/data/library.ts`, covers in `public/books/`) |
| `/<slug>` | A post (`src/content/posts/<slug>.md`) |
| `/rss.xml`, `/sitemap-index.xml`, `/llms.txt`, `/llms-full.txt` | Feeds and maps for readers, search engines and AI models |

## Writing a post

`npm run new-post -- "Title."` creates a draft in `src/content/posts/`. The front matter is described in `src/content/posts/_template.md`:

- `highlight`: the sentence the story turns on (catch phrase on cards, abstract for search).
- `closingQuestion`: the question that ends the post.
- `image` and `imageAlt`: an optional photo under the head (put the file in `src/content/posts/images/`).
- `##` headings turn the story into numbered chapters with a table of contents and a reading tracker. Without them it reads as one piece.
- `linkedinUrl`: once the story is shared on LinkedIn, the closing card becomes "Join the conversation".
- `startHere: 1..3`: the story's place in About's "Where to start".
- Set `draft: false` to publish. Drafts show in `npm run dev` only.

## Forms and analytics

Copy `.env.example` to `.env` (and set the same keys as build variables in Cloudflare) when the forms have somewhere to send. Without them the forms stay on the page and say they are not open yet.

- Newsletter: Buttondown (`PUBLIC_BUTTONDOWN_ACTION`).
- Contact page, About's contact band and a post's "Write to Martín": Formspree (`PUBLIC_FORMSPREE_ACTION`).
- Analytics: Umami Cloud, cookieless, so no consent banner. The website id is in `src/lib/site.ts` and only `martinmato.com` is counted. Custom events: `read` (25/50/75/100% of a post), `share`, `reply-open`, `reply-sent`, `subscribe`, `contact-sent`, `amazon-click`.

## Deploy (Cloudflare Workers, static assets)

The site is static. `wrangler.jsonc` publishes `dist/` with no Worker script: `/about` answers without a trailing slash (`/about/` redirects to it) and unknown paths get `404.html`. `public/_headers` sets the security headers.

1. In Cloudflare, Workers & Pages → create an application from the GitHub repo `OtamNitram/martinmatocom`: build `npm run build`, deploy `npx wrangler deploy`, build variable `NODE_VERSION=24` plus the `PUBLIC_*` keys.
2. The domain is registered at Namecheap with its nameservers pointing to Cloudflare. Add `martinmato.com` as a custom domain of the Worker, and a redirect rule `www.martinmato.com/*` → `https://martinmato.com/$1` (301).
3. Email Routing: `hi@martinmato.com` forwards to Martín's inbox.
4. Security → AI Crawl Control (or Bots): allow AI crawlers, so the stories can be found and quoted (GEO). Turn on Crawler Hints (IndexNow) and Always Use HTTPS.
5. Google Search Console: add the domain property (DNS verification in Cloudflare) and submit `https://martinmato.com/sitemap-index.xml`; Bing Webmaster Tools can import it.

GitHub runs `npm run lighthouse` on every push to `main`.

## What's here

```
design-system/
  README.md            Brand book: voice, colour, type, spacing, page patterns. Start here.
  pages/*.dc.html      The final page designs (home, about, post, contact, library) and NOTES.md
  tokens.json / .css   All tokens, light and dark (tokens.css is generated; never edit by hand)
  fonts/, assets/      Self-hosted fonts, icons, logo, photos
  reference/           The React reference of the components, to port from (not shipped)
src/
  layouts/BaseLayout.astro   Head (SEO, JSON-LD, theme), header, dark ending
  components/                Header, Footer, Newsletter, ContactForm, TopicTag, PostIcon…
  pages/                     Routes, feeds, share cards (og/), app icons
  scripts/                   shell (theme, menu), stories (filters), post (tracker, share, reply), contact, newsletter, analytics
  styles/                    site (base and shell), one file per page
  content/posts/             The stories
  data/library.ts            The books
.cursor/rules/design-system.mdc   Rules Cursor applies to every request
```
