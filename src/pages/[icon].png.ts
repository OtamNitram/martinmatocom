/* App icons rendered from public/favicon.svg: Apple touch icon (180) and the manifest icons (192, 512). */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";

const sizes: Record<string, number> = {
  "apple-touch-icon": 180,
  "icon-192": 192,
  "icon-512": 512,
};

export function getStaticPaths() {
  return Object.keys(sizes).map((icon) => ({ params: { icon } }));
}

export const GET: APIRoute = async ({ params }) => {
  const size = sizes[String(params.icon)];
  const svg = await readFile(path.resolve(process.cwd(), "public/favicon.svg"), "utf8");
  const png = new Resvg(svg, { fitTo: { mode: "width", value: size } }).render().asPng();
  return new Response(png, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  });
};
