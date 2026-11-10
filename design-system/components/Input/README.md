# Input

Labelled form field from the Figma file, in two sizes: S, a single line 48px tall, and L, a 144px multi-line area. Label in `caption` above, field on `surfaces-highlights` with a 1px `surfaces-strokes` border, 4px corners (`radius-s`), placeholder in `text-secondary`.

**Use** in the contact form on About (Name and Email side by side, then Topic, then Message in size L) and in search fields.

**Consumer provides** `label`, `size` ("s" or "l"), and the usual field props (`name`, `type`, `placeholder`, `value`/`onChange`, `required`). Pair a form with a primary Button ("Send message") and a secondary one ("Clear form").
