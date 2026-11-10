# Page designs

The approved designs for each page, exported from the Claude Design canvases. Use them as the reference for layout, structure and copy.

| File | Page | Notes |
| --- | --- | --- |
| `home.dc.html` | Blog (home) | Intro, TagFilter, PostCards, "Older Entries". |
| `post.dc.html` | A post | "The armor I called confidence.": Article with author block, Highlight, ClosingPrompt, newsletter band. The most recent design (Nov 2026). |
| `about.dc.html` | About | Hero with portrait, Approach & Methodology cards, Highlighted Posts, Contact form. |
| `archive.dc.html` | Archive | Search, year and month filters, TagFilter, posts grouped by year. |
| `contact.dc.html` | Contact | Standalone contact form. The README says contact lives at the end of About; treat this one as an alternative. |

## How to read these files

They are Claude Design canvas files, not plain HTML, so they will not render if opened directly:

- `<x-import component-from-global-scope="MartinsWeb.Header" device="..." links="...">` is the `Header` component. Attributes are its props in kebab case (`home-href` is `homeHref`).
- `{{name}}` values come from `renderVals()` in the `<script type="text/x-dc">` block at the bottom: that is where the sample posts, nav links and form state live.
- `<sc-if>` is a conditional and `<sc-for>` a loop.
- The `:root { ... }` block in each file's `<helmet>` is a copy of the tokens: use `../tokens.css` instead.

## Photos

The `/_blob/...` URLs in these files are uploads inside the canvases and do not resolve here. The photos themselves are in `../assets/photos/`:

| File | What it is | Used in |
| --- | --- | --- |
| `portrait-headshot.jpg` | Studio portrait, grey background, 1024×1024 | About hero (`about.dc.html`) and the post author block (`post.dc.html`) |
| `portrait-smile.jpg` | Smiling portrait, grey background, 1152×928 | Earlier Home design |
| `kaizen-booth-standing.jpg` | Martín standing by the Kaizen booth, portrait, 960×1280 | About redesign proposals |
| `kaizen-booth-wide.jpg` | The Kaizen booth, landscape, 1280×960 | About redesign proposals (hero) |
| `kaizen-booth-seated.jpg` | Martín seated at the booth, portrait crop, 800×960 | About redesign proposals |

The README prefers a natural photo in context (the booth) over a posed portrait for heroes, and keeps the portrait for the post author block. Show Martín once per page.

## Not included

- The About redesign proposals ("cercana", "jerarquía", "solapa") still in progress on the About canvas. The README's Page patterns describe where that redesign is heading.
- Copy marked `[X]` (read times) is a placeholder.
