/*
 * Umami custom events. Pages announce what happened with DOM events; this file forwards them to Umami.
 * Umami itself (visitors, time on page, referrers, countries, devices) needs no code beyond its script tag.
 * Nothing is sent when Umami is not loaded (local dev, blockers).
 */
type Payload = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Payload) => void };
  }
}

const track = (event: string, data?: Payload) => {
  try {
    window.umami?.track(event, data);
  } catch {
    /* analytics must never break the page */
  }
};

const slug = () => location.pathname.replace(/^\/|\/$/g, "") || "home";

/* Reading depth on posts: 25, 50, 75 and 100%, each once per visit to the page */
const reached = new Set<number>();
document.addEventListener("post:progress", (event) => {
  const progress = (event as CustomEvent<{ progress: number }>).detail.progress;
  [25, 50, 75, 100].forEach((mark) => {
    if (progress >= mark && !reached.has(mark)) {
      reached.add(mark);
      track("read", { post: slug(), percent: mark });
    }
  });
});

document.addEventListener("post:share", () => track("share", { post: slug() }));
document.addEventListener("post:reply-open", () => track("reply-open", { post: slug() }));
document.addEventListener("post:reply-sent", () => track("reply-sent", { post: slug() }));
document.addEventListener("newsletter:subscribed", () => track("subscribe", { page: slug() }));
document.addEventListener("contact:sent", (event) => {
  const form = (event as CustomEvent<{ form?: string }>).detail?.form ?? "contact";
  track("contact-sent", { form, page: slug() });
});
