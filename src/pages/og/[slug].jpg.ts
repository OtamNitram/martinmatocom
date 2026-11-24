/* Share cards (1200×630 JPEG): the site card, and one per post (with the post's photo when it has one).
   JPEG keeps them small enough for WhatsApp, which skips preview images over roughly 300 KB. */
import { readFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import type { APIRoute } from "astro";
import { getPosts } from "../../lib/posts";
import { site } from "../../lib/site";

interface Card {
  kicker: string;
  title: string;
  /** Absolute path to the post's photo, if any. */
  photo?: string;
}

/** The post's `image:` path from its front matter, resolved next to the markdown file. */
async function photoOf(filePath?: string) {
  if (!filePath) return undefined;
  const absolute = path.resolve(filePath);
  const text = await readFile(absolute, "utf8");
  const image = text.split("---")[1]?.match(/^image:\s*(\S+)/m)?.[1];
  return image ? path.resolve(path.dirname(absolute), image) : undefined;
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return [
    {
      params: { slug: "site" },
      props: { kicker: "Talking Dev", title: "What leading software teams keeps teaching me." } satisfies Card,
    },
    ...(await Promise.all(
      posts.map(async (post) => ({
        params: { slug: post.id },
        props: { kicker: post.data.topic, title: post.data.title, photo: await photoOf(post.filePath) } satisfies Card,
      })),
    )),
  ];
}

const dataUri = (bytes: Buffer) => `data:image/jpeg;base64,${bytes.toString("base64")}`;

export const GET: APIRoute = async ({ props }) => {
  const card = props as Card;
  const font = await readFile(new URL("../../../design-system/fonts/source-serif-4-latin-opsz-normal.woff2", import.meta.url));
  const lines = [
    { type: "div", props: { style: { fontSize: "28px", lineHeight: "36px", color: "#97cfcc" }, children: card.kicker } },
    { type: "div", props: { style: { fontSize: card.photo ? "56px" : "64px", fontWeight: 700, lineHeight: card.photo ? "62px" : "70px", marginTop: "16px" }, children: card.title } },
    { type: "div", props: { style: { fontSize: "32px", lineHeight: "40px", marginTop: "28px", color: "#3d9c9a" }, children: site.name } },
  ];

  /* With a photo: text on the left, the photo filling the right half. Without: the portrait, then the text. */
  const children = card.photo
    ? [
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", justifyContent: "flex-end", boxSizing: "border-box", width: "600px", height: "630px", padding: "64px" },
            children: lines,
          },
        },
        {
          type: "img",
          props: { src: dataUri(await readFile(card.photo)), width: 600, height: 630, style: { width: "600px", height: "630px", objectFit: "cover" } },
        },
      ]
    : [
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "flex-end", boxSizing: "border-box", width: "1200px", height: "630px", padding: "64px" },
            children: [
              {
                type: "img",
                props: {
                  src: dataUri(await readFile(new URL("../../../design-system/assets/photos/portrait-headshot.jpg", import.meta.url))),
                  width: 280,
                  height: 350,
                  style: { objectFit: "cover", marginRight: "48px" },
                },
              },
              { type: "div", props: { style: { display: "flex", flexDirection: "column", flex: 1 }, children: lines } },
            ],
          },
        },
      ];

  const svg = await satori(
    {
      type: "div",
      props: {
        style: { width: "1200px", height: "630px", display: "flex", background: "#013345", color: "#fafafa" },
        children,
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Source Serif 4", data: font, weight: 700, style: "normal" }],
    },
  );

  const png = new Resvg(svg).render().asPng();
  const jpeg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(jpeg, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
