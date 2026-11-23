# Page designs

The approved designs for each page, exported on Nov 23, 2026 from the Claude Design canvas "Martín Mato · Web (consolidado)" (https://claude.ai/artifact/CgCBJtb9ufMznpJbzUCk8D). They are the source of truth for layout, structure and copy. Where they disagree with `../README.md`, these files win. The designer's notes from the canvas are in `NOTES.md`.

| File | Page | Notes |
| --- | --- | --- |
| `home.dc.html` | Blog (home) | Hero with photo, intro, "Latest stories" timeline with topic filter, Library teaser, newsletter, footer. |
| `about.dc.html` | About | Hero with photo, "How I got here" timeline, "How I work" band, "Where to start" posts, dark contact band. |
| `post.dc.html` | A post | Byline, optional chapters (table of contents, rails, floating tracker), closing cards, "Keep reading", newsletter. |
| `contact.dc.html` | Contact | Standalone contact form with topic chips, then the newsletter. |
| `library.dc.html` | Library | The 22 books in four groups, each with a cover and an Amazon link. |

Every page ends with the same dark ending: a band (newsletter, or the contact form on About) and the footer on one gradient. The canvas also has a 390px mobile frame for each page; those frames only render the desktop file at phone width, so mobile behaviour lives in each file's media queries.

## How to read these files

They are Claude Design canvas files, not plain HTML, so they will not render if opened directly:

- `{{name}}` values come from `renderVals()` in the `<script type="text/x-dc">` block at the bottom: that is where the sample posts, books, nav links and form state live.
- `<sc-if>` is a conditional and `<sc-for>` a loop. `data-props` declares the canvas tweaks (theme, `sharedOnLinkedIn`).
- Styles are inline plus a `<helmet><style>` block. Its last "site kit" block overrides the inline styles (for example the `h1` renders 48/48, not the inline 56/60).

## Photos

The `/_blob/...` URLs in these files are uploads inside the canvas and do not resolve here. The photos used are:

| Canvas upload | Local file | Used in |
| --- | --- | --- |
| `be0b5ffe…` | `../assets/photos/hero-notebook.jpg` | Home hero |
| `e8403d4a…`, `85beef4f…` | `../assets/photos/portrait-headshot.jpg` | Home intro, post byline, tracker and sign-off |
| `e2c0e21f…` | `../assets/photos/about-night-notebook.jpg` | About hero |
| Book covers | `../../public/books/<id>.jpg` | Home Library teaser, Library page |

The first post also carries the About photo mirrored and cropped to 3:2 (`src/content/posts/images/the-armor-i-called-confidence.jpg`).

## Placeholders in the designs

Copy marked `[X]` (read times), `[your-post]`, `mailto:[your-email]` and `href="#"` links are placeholders; the site fills them from real data.
