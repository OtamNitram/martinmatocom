const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.querySelectorAll<HTMLFormElement>("[data-contact]").forEach((form) => {
  const error = form.querySelector<HTMLElement>("[data-contact-error]");
  const closed = form.querySelector<HTMLElement>("[data-contact-closed]");
  const done = form.parentElement?.querySelector<HTMLElement>("[data-contact-done]");
  const thanks = form.parentElement?.querySelector<HTMLElement>("[data-contact-thanks]");
  const address = form.parentElement?.querySelector<HTMLElement>("[data-contact-address]");
  const reset = form.parentElement?.querySelector<HTMLButtonElement>("[data-contact-reset]");

  form.addEventListener("submit", (event) => {
    const data = new FormData(form);
    if (String(data.get("company") ?? "").trim() !== "") {
      event.preventDefault();
      return;
    }
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const valid = name !== "" && emailPattern.test(email) && message !== "";
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
      fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then((response) => {
          if (!response.ok) throw new Error("contact failed");
          form.hidden = true;
          if (done) done.hidden = false;
          const first = name.split(" ")[0] || "there";
          if (thanks) thanks.textContent = `Thanks, ${first}.`;
          if (address) address.textContent = `Your message is on its way. I’ll get back to you at ${email}.`;
        })
        .catch(() => {
          if (error) {
            error.hidden = false;
            error.textContent = "That didn't go through. Try sending it again.";
          }
        });
    }
  });

  reset?.addEventListener("click", () => {
    form.hidden = false;
    form.reset();
    if (done) done.hidden = true;
    if (error) error.hidden = true;
    form.querySelector<HTMLInputElement>("#contact-name")?.focus();
  });
});
