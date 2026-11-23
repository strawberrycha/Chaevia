(() => {
  const achievements = window.CHAEVIA_ACHIEVEMENTS;
  const highlights = achievements.filter(({ star }) => star).length;
  document.querySelector("#tour-achievements").textContent =
    `${highlights} highlights across ${achievements.length} achievements.`;

  const projectCount = window.CHAEVIA_PROJECTS.length + document.querySelectorAll(".featured-project").length;
  document.querySelector("#tour-projects").textContent =
    `${projectCount} projects across web, mobile, and console.`;
})();
