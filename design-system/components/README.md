# Components

Fifteen components. Each folder has:

- `README.md`: what it is, when to use it, what the consumer provides, and the decisions behind it.
- `example.html`: how it is used, with real props and copy. It runs inside the design system page (with `tokens.css`, `reference/bundle.css`, React and `reference/bundle.js` preloaded as `window.MartinsWeb`), so read it as a usage example rather than opening it on its own.

Props for all of them are typed in `index.d.ts`. The working implementation is `../reference/bundle.js` and `../reference/bundle.css`: port its markup, `mw-*` class names and states into the site's components.

| Component | What it is |
| --- | --- |
| Logo | The block navy M with a teal script m, in a 57 × 48 frame. |
| Icon | The eight-glyph icon set, inline, coloured with `currentColor`. |
| Button | Primary (filled) or secondary (outlined) action, 4px corners, optional leading icon. |
| Link | Underlined text link for header navigation and footer links. |
| Chip | Topic tag above a post title or in a Next-Read card; a toggle when used as a filter. |
| Card | Pillar card with a mint icon tile, used on About ("Approach & Methodology"). |
| Highlight | Editorial pull quote: short teal rule above one sentence in `pull-quote`. |
| NextRead | Teaser card for a related or highlighted post. |
| PostCard | One post in the blog list: meta line, title, catch phrase, Read More. |
| TagFilter | Topic chips above the blog list, starting with "All", with a post count. |
| Article | The long-form post page: meta, `h1`, author block, `body-long` body, closing. |
| ClosingPrompt | The question that ends every post, with a single way to answer it. |
| Header | Top bar: logo and name, nav links, "Subscribe"; a menu button on mobile. |
| Footer | Bottom band with the copyright line and links. |
| Input | Labelled form field, S (one line) or L (multi-line). |

Not a component yet: the newsletter band at the end of a post. It is specified in `../README.md` (Article pattern) and drawn in `../pages/post.dc.html`.
