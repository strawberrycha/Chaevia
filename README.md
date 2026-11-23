# Chaevia

[Live site](https://strawberrycha.github.io/Chaevia/)

Chaevia is Charlene Mae Adille’s portfolio for OJT and job applications. It features her projects, data analytics skills, leadership, experience, and certificates.

Built with plain HTML, CSS, and JavaScript. Accessibility targets WCAG 2.2 AA.

## Screenshot

_Screenshot to be added after deployment._

## Folder structure

```text
Chaevia/
├── index.html
├── achievements.html
├── career-compass.html
├── 404.html
├── assets/
│   ├── css/         Design tokens, base styles, and components
│   ├── data/        Achievements and certificates data scripts
│   ├── img/         Responsive portraits and strawberry favicon
│   └── js/          Theme, navigation, and achievement filters
├── robots.txt
├── sitemap.xml
└── README.md
```

The local 4K portrait in `assets/img/source/` is excluded from Git. The page uses `assets/img/cha.jpg` and `assets/img/cha-1200.jpg`.

## Run locally

Open `index.html` directly in a browser. To preview over HTTP, run `python -m http.server 8000` from the project directory and open `http://localhost:8000/`.

## Deploy to GitHub Pages

1. Push the project files to the `main` branch of the `Chaevia` repository.
2. In **Settings → Pages**, select **Deploy from a branch**, then choose `main` and `/ (root)`. Select **Save**.
3. When deployment finishes, open the live site and check the home page, achievement filters, and a missing URL.

[GitHub Pages publishing source setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

GitHub Pages project sites sit under a subdirectory. Crawlers look for `robots.txt` at the origin root, so the project-level copy does not control crawling for the origin. The sitemap can be submitted directly.
