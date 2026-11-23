/* Home "Latest stories": filter the list by topic, keep the count line and the empty state in step. */
const root = document.querySelector<HTMLElement>("[data-stories]");

if (root) {
  const chips = [...root.querySelectorAll<HTMLButtonElement>(".chip-f")];
  const posts = [...root.querySelectorAll<HTMLElement>(".home-post")];
  const thread = root.querySelector<HTMLElement>("[data-thread]");
  const empty = root.querySelector<HTMLElement>("[data-empty]");
  const count = root.querySelector<HTMLElement>("[data-count]");
  const showAll = root.querySelector<HTMLButtonElement>("[data-show-all]");

  const countText = (topic: string, label: string, visible: number) => {
    if (topic === "all") return visible === 1 ? "Showing 1 story" : `Showing all ${visible} stories`;
    if (visible === 0) return `No stories about ${label} yet`;
    return `Showing ${visible} ${visible === 1 ? "story" : "stories"} about ${label}`;
  };

  const apply = (topic: string, label: string) => {
    let visible = 0;
    posts.forEach((post) => {
      const show = topic === "all" || post.dataset.topic === topic;
      post.hidden = !show;
      if (show) visible += 1;
    });
    chips.forEach((chip) => chip.setAttribute("aria-pressed", chip.dataset.topic === topic ? "true" : "false"));
    if (thread) thread.hidden = visible === 0;
    if (empty) empty.hidden = visible > 0;
    if (count) count.textContent = countText(topic, label, visible);
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => apply(chip.dataset.topic ?? "all", chip.dataset.label ?? ""));
  });

  showAll?.addEventListener("click", () => apply("all", "All"));
}
