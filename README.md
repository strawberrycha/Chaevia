# Chaevia

[Live site](https://strawberrycha.github.io/Chaevia/)

Chaevia is Charlene Mae Adille’s portfolio for OJT and job applications. It features her projects, data analytics skills, leadership, experience, and certificates.

Built with plain HTML, CSS, and JavaScript. Accessibility targets WCAG 2.2 AA.

## Screenshot

_Screenshot to be added after deployment._

## Folder structure

```text
Chaevia/
├── index.html         Home
├── about.html         Biography, education, and skills
├── projects.html      Filterable software projects
├── career-compass.html  Career Compass case study
├── videos.html        Video editing showcase
├── achievements.html  Leadership and achievements
├── experience.html    Experience and certificates
├── contact.html       Email and social links
├── 404.html           Custom error page
├── assets/
│   ├── css/         Design tokens, base styles, and components
│   ├── data/        Achievements, certificates, projects, and videos data scripts
│   ├── img/         Responsive portraits and strawberry favicon
│   └── js/          Theme, navigation, and achievement filters
├── robots.txt
├── sitemap.xml
└── README.md
```

The local 4K portrait in `assets/img/source/` is excluded from Git. The page uses `assets/img/cha.jpg` and `assets/img/cha-1200.jpg`.

## Run locally

Open `index.html` directly in a browser. To preview the GitHub Pages paths over HTTP, run `python -m http.server 8000` from the directory containing the `Chaevia` folder, then open `http://localhost:8000/Chaevia/`. The custom error page uses `/Chaevia/` as its base on HTTP. Testing missing URLs locally requires a server that serves `404.html` for missing paths.

## Projects and Videos

Projects features Career Compass and a filterable grid of web, mobile, and console projects. Cards show screenshots when available and link to live demos.

Videos showcases video editing and multimedia production. Filter the placeholder cards by category. Cards link to a video when its URL is available.

## How to add content

- Add project screenshots to `assets/img/projects/` and list their relative paths in the project's `screenshots` array in `assets/data/projects.js`.
- Set the project's `liveUrl` to its live demo URL.
- Add videos in `assets/data/videos.js`. Set `poster` to the poster image path and `url` to the video URL.
- Update achievements in `assets/data/achievements.js` and certificates in `assets/data/certificates.js`. The Home counts use the achievements and projects data.
- Project code links are excluded by design.

## Deploy to GitHub Pages

1. Push the project files to the `main` branch of the `Chaevia` repository.
2. In **Settings → Pages**, select **Deploy from a branch**, then choose `main` and `/ (root)`. Select **Save**.
3. When deployment finishes, open the live site and check the home page, achievement filters, and a missing URL.

[GitHub Pages publishing source setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

GitHub Pages project sites sit under a subdirectory. Crawlers look for `robots.txt` at the origin root, so the project-level copy does not control crawling for the origin. The sitemap can be submitted directly.
