const root = document.documentElement;

function isDark() {
  return root.getAttribute("data-theme") === "dark";
}

function paintTheme() {
  const dark = isDark();
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
    button.textContent = dark ? "Light" : "Dark";
    button.setAttribute("aria-pressed", dark ? "true" : "false");
  });
}

function setTheme(next: "dark" | "light") {
  if (next === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  localStorage.setItem("theme", next);
  paintTheme();
}

paintTheme();

document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(isDark() ? "light" : "dark");
  });
});

const menuButton = document.querySelector<HTMLButtonElement>("[data-menu-button]");
const menu = document.querySelector<HTMLElement>("[data-menu]");

function setMenu(open: boolean) {
  if (!menuButton || !menu) return;
  menuButton.setAttribute("aria-expanded", open ? "true" : "false");
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menu.hidden = !open;
}

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});
