(() => {
  const filters = document.querySelector("#achievement-filters");
  const buttons = [...filters.querySelectorAll("[data-category]")];
  const search = document.querySelector("#achievement-search");
  const year = document.querySelector("#achievement-year");
  const highlights = document.querySelector("#highlights-only");
  const timeline = document.querySelector("#achievement-timeline");
  const achievementStatus = document.querySelector("#achievement-status");
  let category = "all";

  function textElement(tag, text, className = "") {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function achievementItem({ star, text, when }) {
    const item = document.createElement("li");
    const title = textElement("p", text);
    if (star) {
      item.classList.add("timeline-highlight");
      const icon = textElement("span", "★", "timeline-star");
      icon.setAttribute("aria-hidden", "true");
      title.prepend(icon, textElement("span", "Highlight: ", "visually-hidden"));
    }
    item.append(title);
    if (when) item.append(textElement("p", when, "record-date"));
    return item;
  }

  function achievementYears(value) {
    const years = [];
    for (const [, start, end] of value.matchAll(/\b((?:19|20)\d{2})(?:\s*[–-]\s*((?:19|20)\d{2}))?\b/g)) {
      for (let current = Number(start); current <= Number(end || start); current++) {
        years.push(String(current));
      }
    }
    return years;
  }

  function loadAchievements() {
    try {
      const achievements = window.CHAEVIA_ACHIEVEMENTS;

      if (year) {
        achievements.forEach((item) => {
          item.years = achievementYears(`${item.when} ${item.text}`);
        });
        const years = [...new Set(achievements.flatMap((item) => item.years))].sort().reverse();
        year.append(...years.map((value) => new Option(value, value)));
      }

      function render() {
        const query = search?.value.trim().toLowerCase() || "";
        const visible = achievements.filter(({ cat, star, text, when, years }) =>
          (category === "all" || cat === category) &&
          (!highlights?.checked || star) &&
          (!query || `${text} ${when}`.toLowerCase().includes(query)) &&
          (!year?.value || years.includes(year.value))
        );
        timeline.replaceChildren(...visible.map(achievementItem));
        timeline.hidden = visible.length === 0;
        achievementStatus.textContent = visible.length === 0
          ? "No achievements match these filters."
          : `${visible.length} ${visible.length === 1 ? "achievement" : "achievements"} shown.`;
      }

      if (highlights) {
        highlights.checked = true;
        highlights.addEventListener("change", render);
      }
      search?.addEventListener("input", render);
      year?.addEventListener("change", render);
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          category = button.dataset.category;
          buttons.forEach((option) => {
            option.setAttribute("aria-pressed", String(option === button));
          });
          render();
        });
      });
      filters.hidden = false;
      render();
    } catch {
      achievementStatus.textContent = "Achievements could not be loaded.";
    }
  }

  loadAchievements();
})();
