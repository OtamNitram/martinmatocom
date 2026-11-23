const root = document.documentElement;

/* Theme: light by default; dark only when the reader picks it. The choice is kept in localStorage. */
function isDark() {
  return root.getAttribute("data-theme") === "dark";
}

function paintTheme() {
  const label = isDark() ? "Switch to light mode" : "Switch to dark mode";
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  });
}

function setTheme(next: "dark" | "light") {
  if (next === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* private mode: the choice lasts for this page only */
  }
  paintTheme();
}

paintTheme();

document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("click", () => setTheme(isDark() ? "light" : "dark"));
});

/* Mobile menu: opens under the header; choosing a link, Escape or widening the window closes it. */
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

window.matchMedia("(min-width: 768px)").addEventListener("change", (query) => {
  if (query.matches) setMenu(false);
});
