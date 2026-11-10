# Button

Call-to-action button with 4px corners in two variants, primary (filled) and secondary (outlined), with an optional leading icon.

**Use** primary for the one action per block ("Read More", "Share on LinkedIn", "Connect on LinkedIn"); secondary for paging and lesser actions ("Older Entries").

**Consumer provides** the label as `children`; optional `variant`, `icon` (`true` = share, or an icon name), `disabled`, and either `href` (renders an `<a>`) or `onClick`.

States from the file: hover and focus switch to `button-mid`; disabled is 50% opacity. The primary button's hover and focus restate the label colour (`text-contrast`), so a page-level `a:hover { color: … }` can't repaint the label in the fill colour and make it disappear (fixed Nov 2026). Corners are `radius-s` (4px), padding `space-xs`, label in the `button` style. In the dark theme the hover fill `button-mid` gives only 2.6:1 with its label; that pair is kept as designed.
