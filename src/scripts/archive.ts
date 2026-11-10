document.querySelectorAll<HTMLFormElement>("[data-archive]").forEach((form) => {
  const search = form.querySelector<HTMLInputElement>("[data-archive-search]");
  const year = form.querySelector<HTMLSelectElement>("[data-archive-year]");
  const month = form.querySelector<HTMLSelectElement>("[data-archive-month]");
  const chips = [...form.querySelectorAll<HTMLButtonElement>(".mw-chip--toggle")];
  const items = [...form.querySelectorAll<HTMLElement>("[data-archive-item]")];
  const groups = [...form.querySelectorAll<HTMLElement>(".archive-year")];
  const count = form.querySelector<HTMLElement>("[data-count]");
  const empty = form.querySelector<HTMLElement>("[data-empty]");
  let topic = "All";

  function apply() {
    const query = search?.value.trim().toLowerCase() ?? "";
    let visible = 0;
    items.forEach((item) => {
      const topicMatch = topic === "All" || item.dataset.topic === topic;
      const yearMatch = !year || year.value === "All" || item.dataset.year === year.value;
      const monthMatch = !month || month.value === "All" || item.dataset.month === month.value;
      const textMatch = !query || (item.dataset.search ?? "").includes(query);
      const show = topicMatch && yearMatch && monthMatch && textMatch;
      item.hidden = !show;
      if (show) visible += 1;
    });
    groups.forEach((group) => {
      const any = [...group.querySelectorAll<HTMLElement>("[data-archive-item]")].some((item) => !item.hidden);
      group.hidden = !any;
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
    chip.addEventListener("click", () => {
      topic = chip.dataset.topic ?? "All";
      apply();
    });
  });
  search?.addEventListener("input", apply);
  year?.addEventListener("change", apply);
  month?.addEventListener("change", apply);
  form.addEventListener("submit", (event) => event.preventDefault());
});
