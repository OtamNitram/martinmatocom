import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new-post -- "title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const reserved = new Set(["about", "archive", "contact", "page", "rss.xml", "llms.txt", "og"]);
if (!slug || reserved.has(slug)) {
  console.error(`"${slug || title}" can't be a post address.`);
  process.exit(1);
}

const file = path.join("src", "content", "posts", `${slug}.md`);
if (fs.existsSync(file)) {
  console.error(`${file} already exists.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const body = `---
title: ${JSON.stringify(title)}
description: ""
date: ${today}
topic: Personal
closingQuestion: ""
draft: true
---

Write the story here. One paragraph is enough to start.

> The sentence the post turns on.
`;

fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, body);
console.log(file);
