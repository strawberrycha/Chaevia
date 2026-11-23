(() => {
  const grid = document.querySelector("#project-cards");
  const template = document.querySelector("#project-card");
  const count = document.querySelector("#project-count");
  const filters = [...document.querySelectorAll("#project-filters button")];

  function listItems(values) {
    return values.map((value) => {
      const item = document.createElement("li");
      item.textContent = value;
      return item;
    });
  }

  function projectCard(project) {
    const card = template.content.firstElementChild.cloneNode(true);
    card.id = project.id;
    card.querySelector("h3").textContent = project.title;
    card.querySelector(".project-description").textContent = project.description;
    card.querySelector(".chips").append(...listItems(project.tags));
    const features = card.querySelector(".project-features");
    if (project.features?.length) {
      features.hidden = false;
      features.append(...listItems(project.features));
    }

    const status = card.querySelector(".chip-status");
    if (project.status) {
      status.textContent = project.status;
      status.parentElement.hidden = false;
    }

    const media = card.querySelector(".project-media");
    if (project.screenshots.length) {
      media.classList.add("project-screenshots");
      if (project.screenshots.length > 1) {
        media.tabIndex = 0;
        media.setAttribute("role", "group");
        media.setAttribute("aria-label", `${project.title} screenshots`);
      }
      project.screenshots.forEach((src, index) => {
        const image = document.createElement("img");
        image.src = src;
        image.alt = `${project.title} screenshot ${index + 1}`;
        image.loading = "lazy";
        media.append(image);
      });
    } else {
      media.classList.add(`project-media-${project.category}`);
      const frame = document.createElement("span");
      frame.className = "project-frame";
      frame.setAttribute("aria-hidden", "true");
      if (project.category === "console") frame.textContent = "$ _";
      const label = document.createElement("span");
      label.textContent = "Screenshots coming soon";
      media.append(frame, label);
    }

    if (project.liveUrl) {
      const link = card.querySelector(".project-live");
      link.href = project.liveUrl;
      link.hidden = false;
      link.setAttribute("aria-label", `Live demo: ${project.title}`);
      card.querySelector("[aria-disabled]").remove();
    }
    return card;
  }

  function render(category) {
    const projects = window.CHAEVIA_PROJECTS.filter((project) =>
      category === "all" || project.category === category
    );
    grid.replaceChildren(...projects.map(projectCard));
    count.textContent = `${projects.length} ${projects.length === 1 ? "project" : "projects"} shown.`;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((filter) => filter.setAttribute("aria-pressed", String(filter === button)));
      render(button.dataset.category);
    });
  });
  render("all");
})();
