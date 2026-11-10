import { readFile } from "node:fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import { getPosts } from "../../lib/posts";
import { site } from "../../lib/site";

interface Card {
  kicker: string;
  title: string;
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return [
    {
      params: { slug: "site" },
      props: { kicker: "Talking Dev", title: "Stories about leading teams, without the armor" } satisfies Card,
    },
    ...posts.map((post) => ({
      params: { slug: post.id },
      props: { kicker: post.data.topic, title: post.data.title } satisfies Card,
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const card = props as Card;
  const font = await readFile(new URL("../../../design-system/fonts/source-serif-4-latin-opsz-normal.woff2", import.meta.url));
  const portrait = await readFile(new URL("../../../design-system/assets/photos/portrait-headshot.jpg", import.meta.url));
  const portraitUri = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#013345",
          color: "#fafafa",
          padding: "64px",
          alignItems: "flex-end",
        },
        children: [
          {
            type: "img",
            props: {
              src: portraitUri,
              width: 280,
              height: 350,
              style: { objectFit: "cover", marginRight: "48px" },
            },
          },
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column", flex: 1 },
              children: [
                { type: "div", props: { style: { fontSize: "28px", color: "#97cfcc" }, children: card.kicker } },
                {
                  type: "div",
                  props: {
                    style: { fontSize: "64px", fontWeight: 700, lineHeight: 1.1, marginTop: "16px" },
                    children: card.title,
                  },
                },
                { type: "div", props: { style: { fontSize: "32px", marginTop: "28px", color: "#3d9c9a" }, children: site.name } },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Source Serif 4", data: font, weight: 700, style: "normal" }],
    },
  );

  const png = new Resvg(svg).render().asPng();
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
