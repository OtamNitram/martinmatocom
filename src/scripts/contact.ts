/* Contact forms (About band and Contact page): validate, post to Formspree, show the thank-you. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.querySelectorAll<HTMLElement>("[data-contact-root]").forEach((root) => {
  const form = root.querySelector<HTMLFormElement>("[data-contact]");
  if (!form) return;
  const perField = form.dataset.variant === "page";
  const error = form.querySelector<HTMLElement>("[data-contact-error]");
  const closed = form.querySelector<HTMLElement>("[data-contact-closed]");
  const done = root.querySelector<HTMLElement>("[data-contact-done]");
  const thanks = root.querySelector<HTMLElement>("[data-contact-thanks]");
  const address = root.querySelector<HTMLElement>("[data-contact-address]");
  const reset = root.querySelector<HTMLButtonElement>("[data-contact-reset]");
  const fieldErrors = [...form.querySelectorAll<HTMLElement>("[data-error-for]")];
  const combinedText = error?.textContent?.trim() ?? "";

  const field = (name: string) => form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`);

  const showErrors = (invalid: Record<string, boolean>) => {
    ["name", "email", "message"].forEach((name) => {
      field(name)?.setAttribute("aria-invalid", invalid[name] ? "true" : "false");
    });
    if (perField) {
      fieldErrors.forEach((p) => (p.hidden = !invalid[p.dataset.errorFor ?? ""]));
    } else if (error) {
      error.textContent = combinedText;
      error.hidden = !Object.values(invalid).some(Boolean);
    }
  };

  const fill = (template: string | undefined, values: Record<string, string>) =>
    (template ?? "").replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (String(data.get("_gotcha") ?? "").trim() !== "") return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const invalid = { name: name === "", email: !emailPattern.test(email), message: message.length < 3 };

    showErrors(invalid);
    if (closed) closed.hidden = true;
    if (perField && error) error.hidden = true;

    const firstInvalid = (["name", "email", "message"] as const).find((key) => invalid[key]);
    if (firstInvalid) {
      field(firstInvalid)?.focus();
      return;
    }
    if (form.dataset.ready !== "true") {
      if (closed) closed.hidden = false;
      return;
    }

    fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then((response) => {
        if (!response.ok) throw new Error("contact failed");
        const values = { first: name.split(/\s+/)[0] || "there", email };
        if (thanks) thanks.textContent = fill(done?.dataset.thanks, values);
        if (address) address.textContent = fill(done?.dataset.address, values);
        form.hidden = true;
        if (done) done.hidden = false;
        document.dispatchEvent(new CustomEvent("contact:sent", { detail: { form: perField ? "contact-page" : "about-band" } }));
      })
      .catch(() => {
        if (error) {
          error.textContent = "That didn’t go through. Try sending it again.";
          error.hidden = false;
        }
      });
  });

  reset?.addEventListener("click", () => {
    form.reset();
    showErrors({});
    form.hidden = false;
    if (done) done.hidden = true;
    field("name")?.focus();
  });
});
