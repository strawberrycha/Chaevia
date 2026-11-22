(() => {
  const filters = document.querySelector("#achievement-filters");
  const buttons = [...filters.querySelectorAll("[data-category]")];
  const highlights = document.querySelector("#highlights-only");
  const timeline = document.querySelector("#achievement-timeline");
  const achievementStatus = document.querySelector("#achievement-status");
  const certificateList = document.querySelector("#certificate-list");
  const certificateStatus = document.querySelector("#certificate-status");
  let category = "all";

  async function readData(filename) {
    const response = await fetch(`assets/data/${filename}.json`);
    if (!response.ok) throw new Error(`Could not load ${filename}`);
    return response.json();
  }

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

  async function loadAchievements() {
    try {
      const achievements = await readData("achievements");

      function render() {
        const visible = achievements.filter(({ cat, star }) =>
          (category === "all" || cat === category) && (!highlights.checked || star)
        );
        timeline.replaceChildren(...visible.map(achievementItem));
        timeline.hidden = visible.length === 0;
        achievementStatus.textContent = visible.length === 0
          ? "No achievements match these filters."
          : `${visible.length} ${visible.length === 1 ? "achievement" : "achievements"} shown.`;
      }

      highlights.checked = true;
      highlights.addEventListener("change", render);
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

  async function loadCertificates() {
    try {
      const certificates = await readData("certificates");
      certificateList.replaceChildren(...certificates.map(({ title, issuer }) => {
        const item = document.createElement("li");
        item.className = "card";
        item.append(textElement("h3", title), textElement("p", issuer || "Online course"));
        return item;
      }));
    } catch {
      certificateStatus.textContent = "Certificates could not be loaded.";
    }
  }

  loadAchievements();
  loadCertificates();
})();
