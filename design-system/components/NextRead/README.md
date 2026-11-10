# NextRead

Teaser card for a related or highlighted post: chip, title in `h4`, date in `caption`.

**Use** in rows of three under "Highlighted Posts" or at the end of an article.

**Consumer provides** `title`, `href`, optional `tag` (rendered as a Chip) and `date`. `state` forces the Hover (adds `shadow-elevation`) or Active (2px `button-light` border) look for documentation; in a page these come from `:hover` and `:active`.
