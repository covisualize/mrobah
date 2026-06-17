# Mr Obah's Journal

Personal journal site with themed entries, a built-in writing studio, and an OpenClaw-friendly publish handoff.

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
