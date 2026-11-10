document.querySelectorAll<HTMLElement>("[data-filter]").forEach((root) => {
  const chips = [...root.querySelectorAll<HTMLButtonElement>(".mw-chip--toggle")];
  const cards = [...root.querySelectorAll<HTMLElement>("[data-post-list] > [data-topic]")];
  const count = root.querySelector<HTMLElement>("[data-count]");
  const empty = root.querySelector<HTMLElement>("[data-empty]");

  function apply(topic: string) {
    let visible = 0;
    cards.forEach((card) => {
      const show = topic === "All" || card.dataset.topic === topic;
      card.hidden = !show;
      if (show) visible += 1;
    });
    chips.forEach((chip) => {
      const selected = chip.dataset.topic === topic;
      chip.classList.toggle("mw-chip--selected", selected);
      chip.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    if (count) count.textContent = visible === 1 ? "1 post" : `${visible} posts`;
    if (empty) empty.hidden = visible !== 0;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => apply(chip.dataset.topic ?? "All"));
  });
});
