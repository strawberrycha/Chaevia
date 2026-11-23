function initializeNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-navigation");
  const mobile = matchMedia("(max-width: 819px)");

  function setMenu(open, restoreFocus = false) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.hidden = mobile.matches && !open;
    if (restoreFocus) toggle.focus();
  }

  function updateLayout() {
    const focusInNav = nav.contains(document.activeElement);
    const focusOnToggle = document.activeElement === toggle;
    toggle.hidden = !mobile.matches;
    setMenu(false, mobile.matches && focusInNav);
    if (!mobile.matches && focusOnToggle) nav.querySelector("a").focus();
  }

  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") === "false"));
  nav.addEventListener("click", (event) => {
    if (mobile.matches && event.target.closest("a")) setMenu(false, true);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setMenu(false, true);
  });
  mobile.addEventListener("change", updateLayout);
  updateLayout();

  if (document.querySelector("base")) {
    document.querySelector(".skip").href = new URL("#content", location.href);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeNavigation);
} else {
  initializeNavigation();
}
