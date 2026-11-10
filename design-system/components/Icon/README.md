# Icon

The site's eight-glyph icon set (share, quote, back, group, psychology, coach, external-link, menu), drawn inline and coloured with `currentColor`.

**Use** inside buttons, links, the Card icon tile and the Highlight quote. Set the colour on the parent; in the file the set is inked in `surfaces-highlights`, which only reads on dark fills (`button-dark`).

**Consumer provides** `name` (one of the eight), optional `size` in px (default 18) and `label` when the icon carries meaning on its own (otherwise it is `aria-hidden`).

**Don't** mix in glyphs from other icon libraries without adding them to the set first.
