# Vansshikha Soni · Nail Atelier

Luxury nail studio website: 4-second cinematic intro, services mega menu with 23 service pages, portfolio gallery, studio section, testimonials carousel, WhatsApp booking, and a floating social dock (Instagram, WhatsApp, Email).

Plain HTML, CSS and JavaScript. **No build step, no npm install needed.**

## 1. Run in VS Code
1. Open this folder in VS Code (File > Open Folder).
2. Install the recommended extensions when VS Code asks (Live Server, Prettier).
3. Right-click `index.html` and choose **Open with Live Server** (http://127.0.0.1:5500).

Without Live Server: `npm start` (needs Node.js) or `python3 -m http.server 5500` inside this folder.
Do not double-click `index.html`; use a local server so images and scripts load.

## 2. Push to GitHub
Create an empty repository on github.com first (no README), then in the VS Code terminal:

```bash
git init
git add .
git commit -m "Vansshikha Soni Nail Atelier website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 3. Host on Vercel
1. Sign in at vercel.com with GitHub and click **Add New > Project**.
2. Import the repository.
3. Settings: **Framework Preset: Other**, **Build Command: leave empty**, **Output Directory: leave empty** (or `.`), **Install Command: leave empty**.
4. Click **Deploy**. Every `git push` to `main` redeploys automatically.
5. Optional: Project > Settings > Domains to attach your own domain.

`vercel.json` already adds cache and basic security headers. Page "routes" are hash-based (`/#/services/classic`), so no rewrites are needed.

## Project structure
```
index.html          page markup (all sections)
css/style.css       all styles (design tokens are the :root variables at the top)
js/app.js           site logic: services data, portfolio, booking, intro, animations, social dock
js/assets.js        image paths + portfolio list (ITEMS, IMG, ST, TS)
vendor/             GSAP, ScrollTrigger, Three.js r128 (local copies, work offline)
images/             portfolio, studio, testimonials, brand (logo, founder photo)
vercel.json         Vercel headers
.vscode/            editor settings and recommended extensions
```

## Things you will edit most
- **WhatsApp booking number:** `CFG.whatsapp` in `js/app.js` (digits with country code, e.g. `'91XXXXXXXXXX'`). While it is empty, in-page booking buttons open `wa.me/?text=...` so the visitor picks the contact. The floating WhatsApp icon and footer link use the fixed message link in `index.html`.
- **Social and contact links:** search `dock-ig`, `dock-wa`, `dock-em` in `index.html` (floating dock) and `class="fl"` (footer).
- **Service names, text and prices:** the `RAW` list in `js/app.js` (columns: category index, slug, name, M, R, about, ideal, before, highlights, care, photo id). M and R are shown exactly as on the menu.
- **Service photos without a verified match:** the `EXAMPLE` list in `js/app.js` (service slug to photo id).
- **Studio photos:** `STUDIO` list in `js/app.js` and `ST` in `js/assets.js`.
- **Testimonials:** `TESTI` list in `js/app.js`. Add `name`, `rating` or `quote` only when you have approved real reviews.
- **Studio address:** search `Studio address: PENDING` in `index.html`.
- **Intro:** `playIntro` in `js/app.js`. It runs for 4 seconds on every full page load; "Replay intro" is in the footer. Reduced-motion visitors get a short fade.

## Routes (hash based)
`#/services` all services, `#/services/classic` one service page, `#/services?c=nail-extension` filtered by category.

## Adding a portfolio photo
Copy the file to `images/portfolio/`, add its path to `IMG` and an entry to `ITEMS` in `js/assets.js`. Keep photos around 1000px wide (WebP or JPG).

## Notes
- Fonts load from Google Fonts. Everything else is local.
- Browser testing so far: Chromium. Please also check Safari (iPhone/iPad), Firefox and Samsung Internet before launch.
