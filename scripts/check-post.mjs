/* Checks a post before it goes out.

     npm run check-post -- <slug>            the markdown: front matter, photo, typography
     npm run check-post -- <slug> --built    also what `npm run build` put in dist/

   Exits 1 on errors, so it can gate a release. A draft only gets warnings for what a published post
   must have; once `draft: false`, those become errors. */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const slug = args.find((arg) => !arg.startsWith("--"));
const checkBuilt = args.includes("--built");
if (!slug) {
  console.error("Usage: npm run check-post -- <slug> [--built]");
  process.exit(1);
}

const SITE = "https://martinmato.com";
const file = path.join("src", "content", "posts", `${slug}.md`);
const errors = [];
const warnings = [];
const notes = [];

if (!fs.existsSync(file)) {
  console.error(`${file} does not exist.`);
  process.exit(1);
}

/* The front matter is flat, so it is read line by line. astro.config.mjs and the share cards read
   `draft`, `date`, `updated` and `image` with a regex, which is why those must stay unquoted. */
const text = fs.readFileSync(file, "utf8");
const split = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
if (!split) {
  console.error(`${file} has no front matter between two "---" lines.`);
  process.exit(1);
}
const raw = {};
const data = {};
for (const line of split[1].split("\n")) {
  if (!line.trim() || line.startsWith("#")) continue;
  const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
  if (!kv) {
    warnings.push(`front matter line "${line.slice(0, 40)}…" is not "key: value" (keep each field on one line)`);
    continue;
  }
  const [, key, rest] = kv;
  const quoted = rest.match(/^"((?:[^"\\]|\\.)*)"/);
  raw[key] = quoted ? quoted[0] : rest.replace(/\s+#.*$/, "").trim();
  data[key] = quoted ? JSON.parse(quoted[0]) : raw[key] === "true" ? true : raw[key] === "false" ? false : raw[key];
}
const body = split[2];
const publishing = data.draft === false;
const need = (message) => (publishing ? errors : warnings).push(message);

const topics = [...(fs.readFileSync("src/content.config.ts", "utf8").match(/const topics = \[([^\]]*)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]);

/* Front matter */
if (!data.title) errors.push("title is empty");
else if (!/[.?!]$/.test(data.title)) warnings.push(`title "${data.title}" does not end with a period, like the other titles`);

if (!data.description) errors.push("description is empty");
else if (data.description.length > 160) errors.push(`description is ${data.description.length} characters; the build fails above 160`);
else if (data.description.length < 70) warnings.push(`description is only ${data.description.length} characters; search shows about 120–160`);

for (const key of ["date", "updated"]) {
  if (!raw[key]) continue;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw[key])) errors.push(`${key} must be written unquoted as YYYY-MM-DD (found ${raw[key]})`);
}
if (data.updated && data.date && data.updated < data.date) warnings.push("updated is earlier than date");
if (!data.date) errors.push("date is missing");

if (!topics.includes(data.topic)) errors.push(`topic "${data.topic}" is not one of: ${topics.join(", ")}`);
if (!data.highlight) need("highlight is empty (the catch phrase on the home, About and Keep reading)");
if (!data.closingQuestion) need("closingQuestion is empty");
else if (!data.closingQuestion.trim().endsWith("?")) warnings.push("closingQuestion does not end with a question mark");

if (data.linkedinUrl && !/^https:\/\/(www\.)?linkedin\.com\//.test(data.linkedinUrl)) warnings.push("linkedinUrl does not look like a LinkedIn link");
if (publishing && !data.linkedinUrl) notes.push("no linkedinUrl yet: after sharing it on LinkedIn, add it so the closing card says “Join the conversation”");
if (data.startHere && !["1", "2", "3"].includes(String(data.startHere))) errors.push("startHere must be 1, 2 or 3");

/* Photo */
if (data.image) {
  if (/^"/.test(raw.image) || /\s/.test(data.image)) errors.push("image must be unquoted and without spaces (the share card reads it with a regex)");
  const photo = path.resolve(path.dirname(file), data.image.replace(/^"|"$/g, ""));
  if (!fs.existsSync(photo)) errors.push(`image ${data.image} does not exist (looked for ${path.relative(".", photo)})`);
  else {
    const { width = 0, height = 0 } = await sharp(photo).metadata();
    const kb = Math.round(fs.statSync(photo).size / 1024);
    notes.push(`photo ${width}×${height}, ${kb} KB`);
    if (width < 721) warnings.push(`photo is ${width}px wide; the page shows it up to 721px`);
    if (Math.abs(width / height - 1.5) > 0.03) warnings.push(`photo is ${(width / height).toFixed(2)}:1; the page crops it to 3:2, so check what gets cut`);
    if (kb > 400) warnings.push(`photo weighs ${kb} KB; resize or recompress it`);
  }
  if (!data.imageAlt) need("imageAlt is empty: describe what the photo shows");
  else if (data.imageAlt.length < 12) warnings.push("imageAlt is very short");
} else if (data.imageAlt) warnings.push("imageAlt is set but image is not");

/* Body */
const prose = body.replace(/```[\s\S]*?```/g, "");
const words = prose.trim().split(/\s+/).filter(Boolean).length;
notes.push(`${words} words, about ${Math.max(1, Math.round(words / 200))} min read`);
if (words < 50 || /Write the story here|A chapter title/.test(body)) need("the body still has the template text or is almost empty");
if (/^# /m.test(prose)) errors.push('the body has a "# " heading; the title is already the h1, use "##" for chapters');
if (/^#{3,} /m.test(prose)) warnings.push('"###" headings are not styled; use "##" only');
const headings = [...prose.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim().toLowerCase());
if (new Set(headings).size !== headings.length) warnings.push("two chapters share the same title");
const plural = (count, one, many) => `${count} ${count === 1 ? one : many}`;
notes.push(headings.length ? `${plural(headings.length, "chapter", "chapters")} (table of contents and numbers)` : "no chapters: reads as one piece, no table of contents");
const straightApostrophes = (prose.match(/\w'\w/g) ?? []).length;
if (straightApostrophes) warnings.push(`${plural(straightApostrophes, "straight apostrophe", "straight apostrophes")}; the site uses ’ (e.g. don’t)`);
const straightQuotes = (prose.replace(/\]\([^)]*\)/g, "").match(/"/g) ?? []).length;
if (straightQuotes) warnings.push(`${plural(straightQuotes, "straight double quote", "straight double quotes")}; the site uses “ ”`);
const lastParagraph = prose.trim().split(/\n{2,}/).pop() ?? "";
if (data.closingQuestion && lastParagraph.includes(data.closingQuestion.trim())) warnings.push("the body ends with the closing question, which the page already prints after it");

/* What the build produced */
if (checkBuilt) {
  const page = [path.join("dist", slug, "index.html"), path.join("dist", `${slug}.html`)].find((candidate) => fs.existsSync(candidate));
  const read = (name) => (fs.existsSync(path.join("dist", name)) ? fs.readFileSync(path.join("dist", name), "utf8") : null);
  const feeds = { "sitemap-0.xml": `<loc>${SITE}/${slug}</loc>`, "rss.xml": `${SITE}/${slug}`, "llms.txt": `${SITE}/${slug}`, "llms-full.txt": `${SITE}/${slug}` };
  if (!fs.existsSync("dist")) errors.push("dist/ is missing: run `npm run build` first");
  else if (data.draft !== false) {
    const leaks = [page && "the page", ...Object.entries(feeds).filter(([name, needle]) => read(name)?.includes(needle)).map(([name]) => name)].filter(Boolean);
    if (leaks.length) errors.push(`a draft leaked into the build: ${leaks.join(", ")}`);
    else notes.push("draft: not in the build, as it should be");
  } else {
    if (!page) errors.push(`dist has no page for /${slug}; was it built after setting draft: false?`);
    else {
      const html = fs.readFileSync(page, "utf8");
      const must = [
        [`<link rel="canonical" href="${SITE}/${slug}">`, "canonical"],
        [`<meta property="og:image" content="${SITE}/og/${slug}.jpg">`, "og:image"],
        ['"@type":"BlogPosting"', "BlogPosting JSON-LD"],
        ['<meta property="article:published_time"', "article:published_time"],
      ];
      for (const [needle, label] of must) if (!html.includes(needle)) errors.push(`the built page is missing ${label}`);
    }
    const card = path.join("dist", "og", `${slug}.jpg`);
    if (!fs.existsSync(card)) errors.push(`dist/og/${slug}.jpg (the share card) was not generated`);
    else {
      const kb = Math.round(fs.statSync(card).size / 1024);
      notes.push(`share card ${kb} KB`);
      if (kb > 300) errors.push(`share card is ${kb} KB; WhatsApp skips previews over about 300 KB`);
    }
    for (const [name, needle] of Object.entries(feeds)) if (!read(name)?.includes(needle)) errors.push(`${name} does not list /${slug}`);
  }
}

const print = (mark, list) => list.forEach((item) => console.log(`${mark} ${item}`));
console.log(`${file}  (${data.draft === false ? "published" : "draft"})`);
print("  ✗", errors);
print("  !", warnings);
print("  ·", notes);
console.log(errors.length ? `\n${errors.length} error(s): fix them before publishing.` : warnings.length ? "\nNo errors; the warnings are worth a look." : "\nAll good.");
process.exit(errors.length ? 1 : 0);
