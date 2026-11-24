// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://martinmato.com';

/** Last change of each post (updated, else date), read from the front matter, for the sitemap's <lastmod>. */
function postDates() {
  const dir = new URL('./src/content/posts/', import.meta.url);
  /** @type {Map<string, Date>} */
  const dates = new Map();
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue;
    const text = readFileSync(new URL(file, dir), 'utf8');
    const front = text.split('---')[1] ?? '';
    if (/^draft:\s*true/m.test(front)) continue;
    const pick = (key) => front.match(new RegExp(`^${key}:\\s*(\\S+)`, 'm'))?.[1];
    const value = pick('updated') ?? pick('date');
    if (value) dates.set(`${site}/${file.replace(/\.md$/, '')}`, new Date(value));
  }
  return dates;
}

const dates = postDates();
const newest = [...dates.values()].sort((a, b) => b.getTime() - a.getTime())[0];

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const url = item.url.replace(/\/$/, '') || site;
        const lastmod = dates.get(url) ?? (url === site || url === `${site}/` ? newest : undefined);
        return lastmod ? { ...item, lastmod: lastmod.toISOString() } : item;
      },
    }),
  ],
});
