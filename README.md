# Path blog starter (11ty + TypeScript)

Minimal blog generator with:

- Eleventy for static site generation
- Markdown posts
- Core pages (`about`, `events`, `newsletter`)
- Responsive light/dark theme
- Tags and categories archives
- GitHub Pages deployment workflow
- TypeScript helper script for creating posts

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
npm run dev
```

Local site runs with live reload at `http://localhost:8080`.

## Project structure

- `src/index.njk` - homepage
- `src/pages/about.md` - About page
- `src/pages/events.md` - Events page
- `src/pages/newsletter.md` - Newsletter page (ConvertKit form)
- `src/posts/*.md` - blog posts in Markdown
- `src/tags/` - tags index + tag archive pages
- `src/categories/` - categories index + category archive pages
- `src/_includes/layouts/*.njk` - page/post layouts
- `public/styles.css` - theme styles
- `public/theme-toggle.js` - dark/light mode toggle
- `scripts/new-post.ts` - TypeScript post generator

## Writing posts

Create a new post file with front matter:

```bash
npm run new:post -- "A New Essay"
```

Then edit the generated file in `src/posts/`.

Taxonomy format in front matter:

```yaml
tags:
  - post
  - category:essays
  - tag:walking
  - tag:notebook
```

- `post` puts the file into the main post collection.
- `category:*` values power `/categories/...` pages.
- `tag:*` values power `/tags/...` pages.

## Newsletter (ConvertKit)

Set your ConvertKit form ID in `src/_data/site.js`:

```js
newsletter: {
  provider: "ConvertKit",
  formId: "YOUR_FORM_ID"
}
```

The newsletter page posts to `https://app.convertkit.com/forms/<FORM_ID>/subscriptions`.

## Build

```bash
npm run build
```

Static output is written to `_site/`.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Ensure your default branch is `main`.
3. In GitHub, go to Settings > Pages and set source to **GitHub Actions**.
4. Push to `main` and the workflow in `.github/workflows/deploy.yml` will deploy automatically.

For your site (`https://o-kolich.github.io/path/`), the workflow sets `PATH_PREFIX` automatically.

## Customize

- Update site identity in `src/_data/site.js`.
- Adjust colors and typography in `public/styles.css`.
