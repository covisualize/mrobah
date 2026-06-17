# Faded Film Notebook

Anonymous personal blog starter with a faded-film visual style, theme-based entries, and a built-in writing studio.

## Included pages

- `index.html` - homepage with search + theme filters
- `archive.html` - browse entries by theme
- `post.html` - single post page with local comments
- `studio.html` - private writing studio (autosave + prompt deck + export)
- `about.html` - boundaries, privacy notes, and comment standards
- `404.html` - fallback page

## Data and behavior

- `posts-data.js` contains the entry dataset.
- `app.js` renders pages, handles search/filtering, comment storage, and studio autosave.
- `styles.css` contains the shared visual system.

## Run locally (PowerShell)

```powershell
python -m http.server 4173 --directory "C:/Users/charl/blog-plan"
```

Open:

- [http://127.0.0.1:4173/index.html](http://127.0.0.1:4173/index.html)

## Publish checklist

1. Replace placeholder URLs in `sitemap.xml` with your real domain.
2. Keep `robots.txt` and `manifest.webmanifest` at the site root.
3. Add/replace posts in `posts-data.js`.
4. Verify no identifying details are present before publishing.
