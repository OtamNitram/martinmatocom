/* Post page: reading progress, the chapter you are in, the floating tracker, sharing and replying. */
const root = document.querySelector<HTMLElement>("[data-post]");

if (root) {
  const doc = document.documentElement;
  const minutes = Number(root.dataset.minutes ?? "1");
  const url = root.dataset.url ?? location.href;
  const title = root.dataset.title ?? document.title;
  const prose = document.getElementById("prose");
  const chapters = [...(prose?.querySelectorAll<HTMLHeadingElement>("h2[id]") ?? [])];
  const total = chapters.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  /* ----- Toast ----- */
  const toastEl = document.querySelector<HTMLElement>("[data-toast]");
  let toastTimer = 0;
  const toast = (message: string) => {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => (toastEl.hidden = true), 2200);
  };

  const copy = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(message);
    } catch {
      toast("Couldn’t copy. The link is in the address bar.");
    }
  };

  /* ----- Chapters: a copy-link button on each, and "Back to contents" before the last one ----- */
  const linkIcon =
    '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';

  chapters.forEach((heading) => {
    const label = heading.textContent?.trim() ?? "";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "c-anchor";
    button.setAttribute("aria-label", `Copy link to “${label}”`);
    button.innerHTML = linkIcon;
    button.addEventListener("click", () => {
      history.replaceState(null, "", `#${heading.id}`);
      copy(`${url}#${heading.id}`, `Link to “${label}” copied`);
    });
    heading.append(button);
  });

  if (total >= 3 && document.getElementById("c-toc")) {
    const back = document.createElement("a");
    back.className = "c-back";
    back.href = "#c-toc";
    back.textContent = "↑ Back to contents";
    chapters[total - 1].before(back);
  }

  /* ----- Progress, current chapter, tracker ----- */
  const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]")];
  const leftMeta = document.querySelector<HTMLElement>("[data-left-meta]");
  const bar = document.querySelector<HTMLElement>("[data-bar]");
  const fade = document.querySelector<HTMLElement>("[data-fade]");
  const barWhere = document.querySelector<HTMLElement>("[data-bar-where]");
  const barTitle = document.querySelector<HTMLElement>("[data-bar-title]");
  const barMe = document.querySelector<HTMLAnchorElement>("[data-bar-me]");
  const end = document.getElementById("c-end");
  const dialogs = [...document.querySelectorAll<HTMLDialogElement>("dialog.sheet")];

  let lastY = window.scrollY;
  let direction: "up" | "down" = "down";
  let lastSection = -1;
  let queued = false;

  const update = () => {
    queued = false;
    const y = window.scrollY;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const progress = Math.min(100, Math.max(0, Math.round((y / max) * 100)));
    if (y > lastY + 4) direction = "down";
    else if (y < lastY - 4) direction = "up";
    lastY = y;

    doc.style.setProperty("--read", `${progress}%`);

    let section = 0;
    chapters.forEach((heading, index) => {
      if (heading.getBoundingClientRect().top < window.innerHeight * 0.45) section = index;
    });

    if (section !== lastSection && total) {
      lastSection = section;
      tocLinks.forEach((link, index) => {
        link.classList.toggle("on", index === section);
        if (index === section) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
      const label = chapters[section].textContent?.trim() ?? "";
      if (barTitle) barTitle.textContent = label;
      barMe?.setAttribute("aria-label", `Martín Mato. Go to contents. You are in part ${pad(section + 1)}: ${label}`);
    }

    if (barWhere) {
      barWhere.textContent = total ? `Martín · ${pad(section + 1)} / ${pad(total)} · ${progress}%` : `Martín · ${progress}% read`;
    }
    if (leftMeta) {
      const left = Math.max(1, Math.round((minutes * (100 - progress)) / 100));
      leftMeta.textContent = progress >= 97 ? "You reached the end." : `${progress}% read · about ${left} min left`;
    }

    const phone = window.innerWidth < 768;
    const atEnd = !!end && end.getBoundingClientRect().top < window.innerHeight * 0.9;
    const dialogOpen = dialogs.some((dialog) => dialog.open);
    /* On a phone the tracker follows the reading gesture: finger up (page scrolling down) brings it in; scrolling back up tucks it away. */
    const show = y > 360 && !atEnd && !dialogOpen && (!phone || direction === "down");
    bar?.classList.toggle("hide", !show);
    fade?.classList.toggle("hide", !show);
    if (bar) bar.inert = !show;

    document.dispatchEvent(new CustomEvent("post:progress", { detail: { progress } }));
  };

  const queue = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  update();

  /* ----- Sheets ----- */
  const shareSheet = document.getElementById("share-sheet") as HTMLDialogElement | null;
  const replySheet = document.getElementById("reply-sheet") as HTMLDialogElement | null;

  const open = (dialog: HTMLDialogElement | null) => {
    if (!dialog) return;
    dialog.showModal();
    queue();
  };

  dialogs.forEach((dialog) => {
    dialog.addEventListener("close", queue);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.querySelectorAll("[data-close-sheet]").forEach((button) => button.addEventListener("click", () => dialog.close()));
  });

  /* Share: the phone's own menu when there is one, else our sheet */
  const share = () => {
    document.dispatchEvent(new CustomEvent("post:share"));
    const data = { title, url };
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
        navigator.share(data).catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === "AbortError")) open(shareSheet);
        });
        return;
      }
    } catch {
      /* fall through to the sheet */
    }
    open(shareSheet);
  };

  document.querySelectorAll("[data-open-share]").forEach((button) => button.addEventListener("click", share));

  const copyButton = shareSheet?.querySelector<HTMLButtonElement>("[data-copy-link]");
  const copyLabel = shareSheet?.querySelector<HTMLElement>("[data-copy-label]");
  copyButton?.addEventListener("click", async () => {
    await copy(url, "Link copied");
    if (copyLabel) {
      copyLabel.textContent = "Copied";
      window.setTimeout(() => (copyLabel.textContent = "Copy link"), 2200);
    }
  });

  /* Reply: a private note, to the same inbox as the contact form */
  const form = replySheet?.querySelector<HTMLFormElement>("[data-reply-form]");
  const error = replySheet?.querySelector<HTMLElement>("[data-reply-error]");
  const done = replySheet?.querySelector<HTMLElement>("[data-reply-done]");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const defaultError = error?.textContent ?? "";

  document.querySelectorAll("[data-open-reply]").forEach((button) =>
    button.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("post:reply-open"));
      if (error) error.hidden = true;
      open(replySheet);
      form?.querySelector<HTMLTextAreaElement>("textarea")?.focus();
    }),
  );

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const message = String(data.get("message") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!error) return;
    error.textContent = defaultError;
    if (message.length < 3 || !emailPattern.test(email)) {
      error.hidden = false;
      return;
    }
    if (form.dataset.ready !== "true") {
      error.textContent = "Replies aren’t open yet. Write to me on LinkedIn meanwhile.";
      error.hidden = false;
      return;
    }
    fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then((response) => {
        if (!response.ok) throw new Error("reply failed");
        form.hidden = true;
        if (done) {
          done.textContent = `Thank you. I’ll answer at ${email}.`;
          done.hidden = false;
        }
        document.dispatchEvent(new CustomEvent("post:reply-sent"));
      })
      .catch(() => {
        error.textContent = "That didn’t go through. Try sending it again.";
        error.hidden = false;
      });
  });
}
