document.querySelectorAll(".nav-links a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const section = document.getElementById(link.hash.slice(1));
    if (!section) return;
    section.tabIndex = -1;
    section.focus({ preventScroll: true });
  });
});
