# martinmato.com

Martín Mato's personal site and blog: personal essays about leading teams, mentoring and bringing AI into a team.

The site is an Astro project in this folder. The design system next to it is the source of truth for how it looks. Node 22.23.4 or newer (`nvm use`, see `.nvmrc`).

```
npm run dev
npm run build
npm run new-post -- "Sentence case title."
```

Copy `.env.example` to `.env` when the newsletter and contact forms have somewhere to send. Without those keys the forms stay on the page and say they are not open yet. The welcome email, the reply-to address and the RSS-to-email draft are set in Buttondown. The contact form is a Formspree endpoint that delivers to your inbox.

## Deploy

The site is static. Cloudflare Pages builds `npm run build` and publishes `dist`.

1. In Cloudflare, create a Pages project from `OtamNitram/martinmatocom`, production branch `main`, build command `npm run build`, output directory `dist`. Node 22 or newer.
2. Add the same keys from `.env.example` as Pages environment variables, including `PUBLIC_CF_BEACON_TOKEN` from Web Analytics. The beacon is omitted until that token exists, so there is no cookie banner.
3. Attach `martinmato.com` and redirect `www` to the apex. `public/_redirects` and `public/_headers` ship with the build.
4. In Google Search Console, add the property `https://martinmato.com` and put the HTML-tag value in `PUBLIC_GOOGLE_SITE_VERIFICATION`. Bing Webmaster can use the same sitemap: `https://martinmato.com/sitemap-index.xml`.

`npm run lighthouse` checks the built site. GitHub runs the same check on every push to `main`.

## What's here

```
.cursor/rules/design-system.mdc   Rules Cursor applies to every request (always on)
design-system/
  README.md                       Brand book: voice, colour, type, spacing, layout, page patterns. Start here.
  tokens.json                     All tokens, light and dark (source)
  tokens.css                      Generated from tokens.json: CSS variables + .type-* classes. Import once.
  fonts.css + fonts/              Self-hosted Source Serif 4, Instrument Sans, Space Mono (imported by tokens.css)
  components/
    README.md                     Index of the 15 components
    index.d.ts                    Props of every component
    <Name>/README.md              Guidelines for each component
    <Name>/example.html           Usage example
  reference/
    bundle.js, bundle.css         Working React implementation, to port from (not to ship)
  assets/
    icons/*.svg                   The eight icons (currentColor)
    logo/martin-mato-logo.svg     The mark
    photos/*.jpg                  Portraits and Kaizen booth photos (see pages/README.md)
  pages/
    README.md                     How to read the page designs
    *.dc.html                     Approved designs: home, post, about, archive, contact
```

## Working with Cursor

Open this folder in Cursor. The rule in `.cursor/rules/` is always applied, so every request already knows to read the brand book, use the tokens and follow the page patterns.

A good first prompt once the Astro project exists:

> Read design-system/README.md and design-system/components/README.md. Import design-system/tokens.css globally, then build Header and Footer as Astro components, porting the markup and classes from design-system/reference/bundle.js and bundle.css. Match design-system/pages/home.dc.html.

Then one component at a time, then one page at a time.

## Where the design lives

The design system is maintained as a Claude design system artifact ("Martin's Web") and the pages as Claude Design canvases. Until the site is built, change the design there first and re-export it into `design-system/`. `tokens.css` is regenerated from `tokens.json`; never edit it by hand.
