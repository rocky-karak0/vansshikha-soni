# Vansshikha Soni · Nail Atelier

Luxury nail studio website: editorial homepage, services mega menu with 23 service pages, portfolio gallery, studio photos, and WhatsApp appointment requests.

Plain HTML, CSS and JavaScript. **No build step to preview or deploy, and no npm install needed.** Run `npm run build` after editing the shared shell or generated page content.

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

`vercel.json` already adds cache and basic security headers. Services and other pages have their own clean URLs such as `/services/classic`.

## Project structure
```
index.html          homepage and shared page shell
css/style.css       base layout, components, and intro animation
css/editorial.css   burgundy design system, shared components and homepage artwork
css/booking.css     reservation desk, visit ticket and service booking calls to action
js/app.js           shared menus, catalog, portfolio and studio interactions
js/experience.js    reservation desk and photo reveals
js/assets.js        image paths and shared portfolio titles
build.js            regenerates standalone pages from the shared shell and data
images/             portfolio, studio, testimonials, brand (logo, founder photo)
vercel.json         Vercel headers
.vscode/            editor settings and recommended extensions
```

## Things you will edit most
- **WhatsApp booking number:** `CFG.whatsapp` in `js/app.js` (digits with country code, e.g. `'91XXXXXXXXXX'`). All in-page booking buttons open `wa.me/<number>?text=...` with the full appointment details pre-filled.
- **Social and contact links:** edit the shared `footer-links` in `index.html` and run `npm run build`.
- **Service names, text and prices:** the `RAW` list in `js/service-data.js` (columns: category index, slug, name, M, R, about, ideal, before, highlights, care, photo id). M and R are shown exactly as on the menu.
- **Service photos without a verified match:** the `EXAMPLE` list in `js/service-data.js` (service slug to photo id).
- **Studio photos:** `STUDIO` list in `js/app.js` and `ST` in `js/assets.js`.
- **Testimonials:** `TESTI` list in `js/app.js`. Add `name`, `rating` or `quote` only when you have approved real reviews.
- **Studio address:** shared privately after booking confirmation. Edit the footer copy in `index.html` and run `npm run build` to update all pages.
- **Homepage:** `index.html` and `css/editorial.css` define the floating lacquer swatch, Signature Looks and service illustrations. The homepage-only triptych in `js/home-intro.js` runs for 1.2 seconds once per session if its photo is ready and reduced motion is off.
- **Booking:** the homepage and `/booking` share the appointment section marked `@component:appointment` in `index.html`. Links can preselect a `service` slug or a portfolio `look` ID. Preferred dates and times are requests; the studio confirms on WhatsApp.
- **Footer artwork:** `images/brand/atelier-seal-frame.svg` frames the atelier logo. The footer is shared from `index.html`; run `npm run build` to sync the generated pages.

## Service routes
`/services` lists all services, `/services/classic` is an individual service, and `/services?c=nail-extension` filters the list. Old `#/services` links still redirect.

## Adding a portfolio photo
Copy the file to `images/portfolio/`, add its path to `IMG` and an entry to `ITEMS` in `js/assets.js`, then run `npm run build`. Keep photos around 1000px wide (WebP or JPG).

## Notes
- Fonts load from Google Fonts. Everything else is local.
- Browser testing so far: Chromium. Please also check Safari (iPhone/iPad), Firefox and Samsung Internet before launch.
