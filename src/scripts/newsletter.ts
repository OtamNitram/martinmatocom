const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.querySelectorAll<HTMLFormElement>("[data-newsletter]").forEach((form) => {
  const error = form.querySelector<HTMLElement>("[data-newsletter-error]");
  const closed = form.querySelector<HTMLElement>("[data-newsletter-closed]");
  const done = form.parentElement?.querySelector<HTMLElement>("[data-newsletter-done]");
  const address = form.parentElement?.querySelector<HTMLElement>("[data-newsletter-address]");
  const reset = form.parentElement?.querySelector<HTMLButtonElement>("[data-newsletter-reset]");
  const input = form.querySelector<HTMLInputElement>("input[type=email]");

  form.addEventListener("submit", (event) => {
    const value = input?.value.trim() ?? "";
    const valid = emailPattern.test(value);
    if (error) error.hidden = valid;
    if (closed) closed.hidden = true;
    if (!valid) {
      event.preventDefault();
      return;
    }
    if (form.dataset.ready !== "true") {
      event.preventDefault();
      if (closed) closed.hidden = false;
      return;
    }
    if (form.dataset.mode === "fetch") {
      event.preventDefault();
      const body = new FormData(form);
      fetch(form.action, { method: "POST", body, headers: { Accept: "application/json" } })
        .then((response) => {
          if (!response.ok) throw new Error("subscribe failed");
          form.hidden = true;
          if (done) done.hidden = false;
          if (address) address.textContent = `The next story will reach you at ${value}.`;
        })
        .catch(() => {
          if (error) {
            error.hidden = false;
            error.textContent = "That didn't go through. Try the address again.";
          }
        });
    }
  });

  reset?.addEventListener("click", () => {
    form.hidden = false;
    form.reset();
    if (done) done.hidden = true;
    if (error) error.hidden = true;
    input?.focus();
  });
});
