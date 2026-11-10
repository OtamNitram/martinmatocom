# Header

Top bar: the Logo (57×48 frame) and "Martín Mato" in Source Serif 4 Bold 30 on the left; on desktop, the links Blog, About and Contact plus a primary "Subscribe" button, right-aligned with 24px between them. Mobile swaps the nav for a 48px menu button. Both are 96px tall with 24px vertical padding (96px sides on desktop, 16px on mobile).

**Use** once per page, full width, on `surfaces-white` with `shadow-elevation`.

**Consumer provides** `device` ("desktop" or "mobile"), optional `name`, `homeHref`, `links` (`{label, href, current}`), `cta` (`{label, href}`, or `false` to hide the button) and `onMenu`.
