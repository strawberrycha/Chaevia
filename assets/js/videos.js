(() => {
  const grid = document.querySelector("#video-cards");
  const template = document.querySelector("#video-card");
  const filters = [...document.querySelectorAll("#video-filters button")];
  const count = document.querySelector("#video-count");

  function videoCard(video) {
    const card = template.content.firstElementChild.cloneNode(true);
    card.id = video.id;
    card.querySelector("h3").textContent = video.title;
    card.querySelector(".video-duration").textContent = video.duration;

    const poster = card.querySelector(".video-poster");
    if (video.ratio === "9:16") poster.classList.add("video-poster-portrait");
    if (video.poster) {
      const image = document.createElement("img");
      image.src = video.poster;
      image.alt = `Poster for ${video.title}`;
      image.loading = "lazy";
      poster.prepend(image);
    }

    if (video.url) {
      const watch = card.querySelector(".video-watch");
      watch.href = video.url;
      watch.hidden = false;
      watch.setAttribute("aria-label", `Watch ${video.title}`);
      card.querySelector(".video-status").remove();
    }
    return card;
  }

  function render(category) {
    const videos = window.CHAEVIA_VIDEOS.filter((video) =>
      category === "all" || video.category === category
    );
    grid.replaceChildren(...videos.map(videoCard));
    count.textContent = `${videos.length} ${videos.length === 1 ? "video" : "videos"} shown.`;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((filter) => filter.setAttribute("aria-pressed", String(filter === button)));
      render(button.dataset.category);
    });
  });
  render("all");
})();
