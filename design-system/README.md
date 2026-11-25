Martín Mato's personal site: a calm, editorial blog of personal essays about leading teams, mentoring, bringing AI into a team, and life beyond the job title. It exists to share opinions without armor and to invite disagreement. Serif reading type, deep teal actions, a single mint accent, and lots of white space around an 800px column.

**Source of truth (Nov 23, 2026).** The page designs in `pages/` (exported from the canvas "Martín Mato · Web (consolidado)") win over this README wherever they differ, and the site is built from them. The designer's notes are in `pages/NOTES.md`. This README was updated to match; the rules below that still mention the older design are marked as such.

## Content fundamentals

- **Voice.** First person, as Martín, telling what happened and what he learned ("Nine months into my first job...", "I'd be lying if I said I had an epiphany."). Honest about his own part, including the unflattering bits. Plain words, short sentences when it matters, no hype and no jargon for its own sake.
- **Never prescriptive.** Share experience, don't tell readers how things should be done. Opinions are open to debate and say so ("Everything here is up for debate, and that's the point.").
- **Invite the reader in.** Every post ends with a real question the reader can answer from their own life, and one way to answer it (a `ClosingPrompt`). Disagreement is welcome: "And if you think I got it wrong, even better."
- **Post titles** in sentence case; a title written as a statement may end with a full stop ("The armor I called confidence."). Page and section titles in title case ("About Me", "Highlighted Posts").
- **Topics** are a closed list of four, in this order: "Personal", "Leading Teams", "Mentoring", "AI in Teams". One topic per post.
- **Button labels** are short verb phrases in title case: "Read the latest story", "Send message", "Keep reading".
- **Dates** as "Oct 25, 2026" in the `caption` style; read time as "5 min read" (about 200 words a minute).
- Each post has at most one highlight: the sentence the whole post turns on. In the blog list it is the catch phrase under the title; inside the article it can appear as a `Highlight` quote. No emoji anywhere.

## Visual foundations

**Colour.** Light is the default theme: render in Light unless the reader has chosen Dark (an explicit toggle, remembered per reader). Do not follow the operating system's dark-mode setting automatically. Dark mirrors Light token for token, so components never need theme-specific code; switch by setting `data-theme="dark"` on `<html>`. Always paint with the semantic tokens, never the primitives (`teal-*`, `mint-500`, `neutral-*`).
- Page and cards: `surfaces-white`. Every page ends in the **dark ending**: its last band (the newsletter, or the contact form on About) and the footer share one gradient, `teal-900` to `#00222e`, in both themes. The footer is part of it (copyright in `neutral-200`, links in `neutral-100`, hover `teal-300`).
- Text: `text-primary` for headings, body and nav; `text-secondary` for dates, descriptions and the copyright line.
- Actions: `button-dark` fills the primary button (label `text-contrast`); `button-mid` is hover and focus; `button-light` marks an active Next-Read card.
- `accent` (mint) is used only for the Card icon tile. Do not use it for text or large fills.
- `highlight-rule` (teal) is the short 48x2px rule above a Highlight pull quote, and nothing else.
- `text-highlight` (teal) marks the closing words of a headline, as in the Home title "Stories about leading teams, *without the armor*". Use it once per page, only at `h1` size.
- **Teal scale.** One hue family, `teal-100` to `teal-900`, built around the three Figma teals (900 = Button/Dark, 700 = Button/Mid, 500 = brand teal) with the in-between steps interpolated in OKLCH. Together with the neutrals it is the whole palette: no other hues (no orange, no extra accents) beyond the mint of the Card icon tile.
- **Topics** are told apart at a glance by the whole chip, using only light teal shades and neutrals: Leading Teams `teal-300` fill, AI in Teams `teal-100` fill, Mentoring outlined (page fill, `teal-400` border) and Personal the gray Chip (`neutral-200`). Each has a dot in a deeper shade and `text-primary` text, through its `topic-<name>-surface/stroke/text/dot` tokens; sub-tags inherit their topic's set. Never fill a chip with a dark teal (800 or 900): that is the primary button's colour and a dark chip would read as a call to action.
- Rules: 1px `surfaces-divider` between posts and sections; 1px `surfaces-strokes` around Next-Read cards and above the footer.

**Type.** Three Google families, loaded by `components/bundle.css`: Source Serif 4 (`serif`) for reading and headings, Instrument Sans (`sans`) for UI labels and Next-Read titles, and Space Mono (`mono`) only for the uppercase `caption-mono` eyebrow above a page title ("TALKING DEV").
- `h1` 48 Bold on a fixed 48px line for page titles; `h2` 32 SemiBold for section and card titles, and for post titles when no section title heads them; `h3` 24 SemiBold serif for post titles inside a section headed by an `h2`, and for the closing question of a post (`ClosingPrompt`); `h4` 24 Instrument Sans for Next-Read teaser titles.
- Follow the heading order in markup and in looks: a level is always visibly smaller or quieter than the one above it, and never skip a level. When a new level is needed, add it and move the lower ones down one step rather than reusing a style at the wrong level.
- `body` 20 for short copy and excerpts, `body-long` 20 with 1.6 line height for article paragraphs, `pull-quote` 32 Medium Italic on a 1.3 line for the Highlight inside an article, `highlights` 18 Medium Italic for small inline quotes, `caption` 14 for dates, chips and descriptions, `button` 14 Instrument Sans Medium for actions and links.
- Below 600px switch to the `*-mobile` styles (H1 36, H2 24, H3 20, H4 20, body 16, body-long 18, pull-quote 24, highlights 14, caption 12, caption-mono 14).
- Line height follows the file's "Auto" (1.35 for Source Serif 4, 1.2 for Instrument Sans) except `h1` (fixed 48px) and long reading, where `body-long` uses 1.6.

**Spacing and layout.** The page content sits in a centred `container-max` (1440px) box; above 1440px the whole layout centres and the backgrounds (hero photo, footer band) keep running edge to edge. Side padding inside the container follows the breakpoint: `gutter-lg` 96px from 1024px, `gutter-md` 48px from 600 to 1023px, `gutter-sm` 16px below 600px. Breakpoints: `breakpoint-sm` 600 (phone type and spacing), `breakpoint-md` 768 (hero stacks, header nav collapses), `breakpoint-lg` 1024 (desktop gutter). **No text block is ever wider than `measure-page` (800px)** at any size, for readability; article bodies use `measure-reading` (680px). Only non-text layouts (the Library grid, chip rows) may use the full container width. Every section pads 48px top and bottom (24px below 600px, the `--section` variable), so two sections meet at 96px (48px); sections are not split by dividers; on pages that mix several kinds of content (About, a future Home), sections are told apart by their shape and background instead, with no dividers (see Page patterns). Header and footer use `space-l` vertical and `space-xxl` side padding on desktop, `space-m` on mobile. Inside components: `space-xs` button padding and icon gaps, `space-s` between teaser parts, `space-l` card padding, `space-m` around a quote (plus `space-xl` from the Article). On mobile use the `*-mobile` spacing tokens.

**Hero text block.** The hero on Home and About is one text block on the page's left edge: the `caption-mono` eyebrow, the title at 48/48 Bold (36/48 below 600px; the canvas overrides the older `display` 56/60), its closing words in `text-highlight`, a lead paragraph in `body` capped at `measure-lead` (600px), then the actions (primary Button plus a text link). The block is `measure-hero` (700px) of content, and the page gutter is padding outside it, never inside: a 700px box with the gutter inside leaves only about 500px of text, which reads cramped. The hero photo fills the right side, faded into the page toward the text, at the top and at the bottom. So that any photo works, its box starts only 96px (`space-xxl`) before the text block ends: the text always sits on page colour, with at most about 30% of the photo showing through behind its last characters, and the person in the shot lands in the solid part of the fade. Never fix a busy photo with manual line breaks in the title. On the Home the title wraps naturally so its accent ("keeps teaching me.", never broken) sits on its own line; About balances its lines. The photo element fills exactly its box (an explicit width plus `object-fit: cover`, never `width: auto`, which lets it overflow and crop unpredictably), and the source photo is cropped beforehand so no object is cut at the frame edge: a pole or a banner sliced at the border reads as a stray line.
- **Choose a natural photo over a posed portrait.** Martín in context (at work, at an event, at the Kaizen booth) gives more authority than a studio portrait. Show him once per page: no second author portrait (such as a book-jacket flap) on a page whose hero already shows him; keep those portraits for places that need them, such as the author block of a post page, which has no hero (see Article pattern). Below 768px the header comes first, then the photo on top, full width, fading at the bottom, and the title switches to `display-mobile`.
- **Two primary buttons are fine here.** The header's "Subscribe" and the hero's main action (for example "Let's talk" on About) are both primary buttons: they sit far enough apart that they don't compete, and each is the main action of its own area. Inside one block, keep a single primary button.

**Mobile navigation.** Below 768px the header nav collapses into a 48px hamburger button (three rounded 4px bars in `button-dark`) on the right of the header, which has a `surfaces-white` background and `shadow-elevation`. It opens a drop-down list under the header: one full-width row per link (Instrument Sans 16 Medium, 1px `surfaces-strokes` between rows, the current page in `button-mid`), then "Subscribe" as a full-width primary button. Next to the hamburger (and, on desktop, after the nav) sits the theme button: 44×44, 1px `surfaces-strokes` border, a moon in Light and a sun in Dark, labelled "Switch to dark mode" / "Switch to light mode". The choice is kept in localStorage and the header turns `#121b27` with a 1px hairline in Dark. In Dark, `button-mid` is `teal-300` and the `text-highlight` accent stays teal. The button switches its label between "Open menu" and "Close menu" and sets `aria-expanded`; choosing a link closes the list.

**Alignment.** One left edge per page: the page's side padding (`space-xxl` 96px on desktop, the mobile padding on phones). Logo, hero, section titles and subtitles, section controls (filters, counts, actions such as "Older entries") and section content all start on it. Indent only content that hangs from a rail or vertical line: today that is the Latest stories timeline, where the rail sits on the main edge and each post is indented 32px on desktop and 20px on mobile. The same rule holds at every breakpoint; only the indent size changes. Do not indent a section's body just to set it apart: spacing separates sections, indentation means nesting.

**Shape and depth.** Three radii, one per role. The small interactive pieces (Buttons, Chips and topic tags, Input fields) use `radius-s` (4px): enough to soften the touch points while the page keeps its editorial tone. Structure stays square (`radius-none`): Next-Read cards, header, footer, the contact form and links. Only Cards round to `radius-card` (8px). Round shapes (avatar, timeline dots) stay fully round. Never use full pills: they read playful and clash with the serif headings. One shadow in use: `shadow-elevation` (header, Cards, the contact form, teaser hover); `shadow-highlights` is still defined but the Highlight quote no longer uses it. No gradients, except the dark ending.

**States.** A selected filter chip shows a 2px `teal-500` ring, a check in `button-mid` and SemiBold text, and keeps its own topic fill. Never mark selection with a dark fill or a `teal-900` outline: filled dark is the primary button and a dark outline is the secondary button, so a chip styled that way reads as an action instead of an active filter. The ring meets 3:1 against the page (WCAG 1.4.11). Hover darkens or lightens toward `button-mid`; links lose their underline on hover and turn `text-secondary` when visited; disabled is 50% opacity. Focus rings are 1px `button-mid` offset 2-3px.

**Contrast notes.** These pairs from the file are below WCAG and are kept as designed: icons in `surfaces-highlights` on `accent` (1.8:1 light); `text-highlight` in dark, which equals the dark page (1:1); in dark, `text-contrast` on `button-mid` and `button-mid` text on `surfaces-white` (2.6:1), and the `button-light` active border (1.3:1).

## Blog patterns

The Home (`pages/home.dc.html`) is the heart of the site.

- **Page order:** Header; hero (eyebrow "Talking Dev", title "What leading software teams **keeps teaching me.**", lead, "Read the latest story" and "More about me", the notebook photo fading in on the right); the author intro (124px round portrait, 88 on phones, "Martín Mato · Principal Software Engineer", one line, links Contact, LinkedIn, Email); **Latest stories**; the **Library** teaser; the dark ending with the newsletter.
- **Latest stories:** an `h2`, a "Topics" label, then filter chips in this order: All, Leading Teams, AI in Teams, Mentoring, Personal, each with its count ("Leading Teams · 1"). A count line in uppercase `mono` ("Showing all 3 stories", "Showing 1 story about AI in Teams", "No stories about Mentoring yet") and an empty state ("Nothing here yet… See all stories"). Posts hang from a 1px rail, indented 32px (20px below 768): the topic tag and "OCT 25, 2026 · 4 MIN READ" in `mono`, the title in `h3`, the catch phrase (the post's highlight, else its first paragraph), "Keep reading →". The whole card is the link and tints on hover. The list ends with "If one of these stories reminded you of your own, tell me about it."
- **Topics** are a closed list of four. Topic tags keep their own fill (Leading Teams `teal-300`, AI in Teams `teal-100`, Mentoring outlined, Personal gray); in Dark the canvas flattens them to `surfaces-highlights`.
- **No paging and no archive** for now: the Home lists every story. When there are enough, an "Older entries" page comes back.
- **Library teaser:** "Library" (`h2`, a link), "Books I keep going back to.", four fixed covers (Multipliers, Coaching: el arte de soplar brasas, The Thin Book of Trust, Storyworthy; 4 columns, 3 below 1024, 2 below 600), each leading to its row on `/library`, then "See all 22 books →".
- **No cover images** on stories in lists. A post may carry one photo of its own, shown under its head.

## Library pattern

`/library` (`pages/library.dc.html`): an `h1`, "Books I keep going back to.", a divider, then the books in four groups (Leading teams, Conversations, AI & product, Habits & life), two columns (one below 1024). Each book: its cover (128px, 96 on phones, 2:3), title in 20 SemiBold, author in Instrument Sans 14, an optional personal line (what happened to me with the book, not what it teaches), and "On Amazon ↗" in a new tab (Kindle edition, no affiliate links). A book linked from the Home is outlined in `teal-500`. The data lives in `src/data/library.ts`.

## Page patterns

Learned on the About page (Nov 2026); use them for any page that introduces Martín or mixes several kinds of content.

- **Every section gets its own shape.** Give each a different job and a different form: a timeline on a rail for a story, a title column next to a list for principles, a grid for posts, a band for the invitation. Hierarchy comes from that variety, not from boxes or borders.
- **No boxes around content.** Sections stay open on the page or on a band.
- **Tinted band.** A full-bleed `surfaces-highlights` band separates a section with a different kind of content (About's "How I work", a post's "Keep reading").
- **Title column + list.** The `h2` and subtitle in a 300px column (sticky on desktop) and the list on the right (up to 640px), 96px between columns and 32px between items, numbered with a small `mono` "01" in `button-mid`. Below 1024px it stacks.
- **About** (`pages/about.dc.html`): hero with the night notebook photo ("Hi, I'm Martín", "I lead software teams. **Here I write about it.**", "Let's talk" and "Connect on LinkedIn ↗"); "How I got here", five steps on a rail (2008, 2016, 2017, 2018, Today; the last dot filled), in a 608px column on desktop; "How I work" on the tinted band; "Where to start", three identical teasers (posts marked `startHere`, else the newest); the dark ending holds the contact form ("Let's talk", "Got a story like mine? Tell me about it.").
- **The dark band** inverts as in the dark theme: text in `text-contrast`, secondary text in `neutral-200`, the eyebrow in `teal-300`, the primary button in `teal-500` with a `neutral-900` label (hover `teal-400`), buttons 48px tall to match the fields.

## Article pattern

A post page (`pages/post.dc.html`) is Header, the article, "Keep reading", the dark ending with the newsletter, Footer.

- **Head:** the topic as the neutral gray tag (in every topic), "Oct 25, 2026 · 4 min read", the title (48/48, 36/48 below 600), then the byline: a 56px round portrait with a `teal-300` ring, "Written by **Martín Mato**", and "Principal Software Engineer at Kaizen Softworks · About me" in italic. A 1px `surfaces-divider` rule closes the head. The post's own photo, if it has one, goes right under it, 3:2.
- **Body:** 680px, 20/1.6 (18 on phones), 24px between paragraphs. No pull quote: the post's `highlight` is used on cards and for search, not repeated in the body.
- **Chapters** (only when the story has `##` parts): each `h2` gets a `mono` number ("01") and a copy-link button (visible on hover, always on touch screens; copying shows a toast). Below 1200px a collapsible "In this story · N parts" sits above the body. From 1200px a left rail lists the chapters (the current one bold), with a 2px progress line and "42% read · about 2 min left".
- **The author stays visible:** from 1200px a 220px Card on the right ("Martín Mato", "Principal Software Engineer · Montevideo", Write to me, Share, About me); below 1200px a floating tracker (portrait, "Martín · 03 / 06 · 42%", the chapter, Reply and Share) shows after 360px of scroll, hides near the end, and on phones only while scrolling down. A 3px teal bar along the top of the window shows the progress.
- **Close:** "Thanks for reading. I'm Martín." with the portrait and a line of bio on the tinted surface; then "Continue the conversation", the question in `h3`, and three Cards with a mint icon tile: "Write to me" (a private note to the inbox, in a dialog), LinkedIn ("Talk on LinkedIn" to the profile, or once `linkedinUrl` is set, "Join the conversation" to the post, highlighted), and "Send it to someone" (the phone's share menu, else a sheet with Copy link, WhatsApp, LinkedIn, X and Email).
- **Keep reading:** two stories on the tinted band (same topic first, then the newest), hidden when there are none.

## Contact pattern

Contact has its own page (`pages/contact.dc.html`), and About keeps a contact form in its dark ending.

- **Contact page:** "Contact", a lead, "Prefer LinkedIn? Send me a message there", a divider, then a form in the 800px column: Name and Email, "What's it about?" chips (A post, A story of my own, Just saying hi), Message, "Send message". Errors go under each field; after sending: "Thanks, Ana. Your message is on its way.", "Read the latest post" and "Send another message". The newsletter closes the page.
- **About's band:** Name and Email side by side, Message, one combined error line, "Send message"; after sending, "Thanks, Ana." and "Send another message".
- Both post to Formspree, as does a post's "Write to Martín".

## Iconography

Eight solid glyphs from the file's Icon set (share, quote, back, group, psychology, coach, external-link, menu), 18px on an 18-20px box. Use them through the `Icon` component, which inherits `currentColor`. The `quote` glyph is no longer part of the Highlight (Nov 2026). The SVG files in the Icons group are inked `neutral-900`. Use no other icon library and no emoji.

## Logo

The mark is a block navy M with a teal script m (Logos group). Use the `Logo` component at 48px high directly next to "Martín Mato" set in Source Serif 4 Bold 30; the mark sits small inside its 57×48 frame, which provides the spacing. The script m stays `teal-500`; the M follows `text-primary`. In the header the script m writes itself once on load (a stroke mask, 1.5s) and then settles; with reduced motion it appears at once.

## Not synced

Notes and component guidelines paraphrase the Figma file. Not imported:
- Font files: Source Serif 4, Instrument Sans and Space Mono load from Google Fonts; no .woff2 was in the file.
- The comment box ("Background+Border") is a loose frame, not a component, and uses Inter and Geist from outside the system.
- The "Exploration" section, the alternative Home with search and popular topics in the "v1" section, loose vectors on the canvas, and the About-page portrait photo.
- The Sour Gummy "?" glyph on the components page, which is not used by any component.
