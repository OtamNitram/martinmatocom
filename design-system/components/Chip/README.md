# Chip

Topic tag placed above a post title or inside a Next-Read card.

**Use** one chip per post for its main topic ("Artificial Intelligence", "Horizontality"). Text in the `caption` style on `surfaces-strokes`, 1px `surfaces-elevation` border, 4px corners (`radius-s`).

**Consumer provides** the topic text as `children`. Keep it to one to three words.

**As a filter** (`selected` or `onClick` set) it renders a button with `aria-pressed`, at least 40px tall (44px on mobile). Selected: 2px `teal-500` ring, a check and SemiBold text over its own fill. Never a dark fill or a `teal-900` outline, which are reserved for buttons.
