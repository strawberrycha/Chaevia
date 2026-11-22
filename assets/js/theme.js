(() => {
  const storageKey = "chaevia-theme";
  const root = document.documentElement;
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  let selection;
  let toggle;

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") selection = saved;
  } catch {
    // System preference remains available if storage is blocked.
  }

  function applyTheme() {
    const theme = selection ?? (preference.matches ? "dark" : "light");
    root.dataset.theme = theme;
    if (toggle) toggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  applyTheme();
  preference.addEventListener("change", applyTheme);

  function initializeToggle() {
    toggle = document.querySelector(".theme-toggle");
    applyTheme();
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      selection = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme();
      try {
        localStorage.setItem(storageKey, selection);
      } catch {
        // The choice still applies to this page.
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeToggle);
  } else {
    initializeToggle();
  }
})();
