# MrObah

Personal journal site with themed entries, a built-in writing studio, and an OpenClaw-friendly publish handoff.

## Design (2026 redesign)

- Cozy & literary visual system: Fraunces display serif, Source Serif 4 body, cream paper palette with a terracotta accent.
- Light and dark mode: follows the visitor's system preference, with a manual toggle in the nav (persisted in localStorage).
- Single reading column (~68 characters per line) tuned for readability; WCAG AA contrast in both modes.
- The Writing Studio is intentionally not linked in the public nav — bookmark `studio.html` directly.

## Newsletter setup (one-time)

The signup forms are wired for [Buttondown](https://buttondown.com). Create a free
account, then set your username in `posts-data.js`:

```js
window.SITE_CONFIG = { buttondownUsername: "your-username" };
```

Until then, the form shows a friendly "not connected yet" note instead of submitting.

## Theme descriptions

Archive theme blurbs live in `window.THEME_DESCRIPTIONS` in `posts-data.js` — edit freely.

## Included pages

- `index.html` - homepage with search + theme filters
- `archive.html` - browse entries by theme
- `post.html` - single post page with local comments
- `studio.html` - writing studio with autosave, prompt deck, export, and publish JSON
- `about.html` - journal intent, publishing rhythm, and comment standards
- `404.html` - fallback page

## Data and behavior

- `posts-data.js` contains the entry dataset.
- `app.js` renders pages, handles search/filtering, comment storage, studio autosave, and publish payload generation.
- `styles.css` contains the shared visual system.
- `openclaw-manifest.json` defines the publishing contract for OpenClaw or any other repo-writing agent.

## Run locally (PowerShell)

```powershell
python -m http.server 4173 --directory "C:/Users/charl/blog-plan"
```

Open:

- [http://127.0.0.1:4173/index.html](http://127.0.0.1:4173/index.html)

## Publishing workflow

1. Draft the entry in `studio.html`.
2. Copy the generated publish JSON.
3. Have OpenClaw append the payload to `posts-data.js` using `openclaw-manifest.json`.
4. Commit, push, and deploy.
