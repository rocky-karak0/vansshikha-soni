#!/usr/bin/env node
/* Static page generator for Vansshikha Soni Nail Atelier.
   Prerenders /services, /services/<slug> (x23), /about, /gallery, /contact, /booking and 404.html as
   real, crawlable HTML. Pages are assembled from the shared shell markers in index.html
   (@shell:assets/nav/footer/tail), js/service-data.js (single source of truth for the menu) and
   build/content.js (original page copy). Also regenerates sitemap.xml.
   Usage: node build.js */
const fs = require('fs');
const path = require('path');
const { CATS, RAW, EXAMPLE } = require('./js/service-data.js');
const { CONTENT, PAGES, GENERAL_AFTERCARE, sharedFaqs } = require('./build/content.js');

const ORIGIN = 'https://vansshikhasoni.com';
const ROOT = __dirname;
const SRC = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const { ITEMS, IMG } = new Function(fs.readFileSync(path.join(ROOT, 'js/assets.js'), 'utf8') + '\nreturn {ITEMS,IMG};')();

/* ===== services (same mapping as js/app.js) ===== */
const SERV = RAW.map(([c, slug, name, m, r, about, ideal, before, hl, care, ph], i) => ({
  id: 'svc-' + String(i + 1).padStart(2, '0'), c, slug, name, m, r, about, ideal, before,
  hl: hl.split('|'), care, ph, i
}));
SERV.forEach(s => { if (!s.ph && EXAMPLE[s.slug]) { s.ph = EXAMPLE[s.slug]; s.ex = true; } });
CATS.forEach(c => { c.items = SERV.filter(s => s.c == c.i); });

/* ===== portfolio items (same construction as js/app.js) ===== */
const NAMES = { Gold: ['Gilded Line', 'Aurum Edge', 'Gold Leaf', 'Chrome Rim', 'Liquid Gold'], Florals: ['Bloom', 'Petal Study', 'Garden Set', 'Pearl Flower'], 'Deep Reds': ['Garnet', 'Wine Cat-Eye', 'Ruby Gloss', 'Velvet Red'], 'Ombré': ['Blush Fade', 'Rose Gradient', 'Sunset Fade', 'Berry Tip'], French: ['Quiet French', 'Noir Tip', 'Minimal Nude', 'Clean Line'], Playful: ['Citrus Stripe', 'Colour Play', 'Sea Shell', 'Little Joys'] };
const cnt = {};
const IT = ITEMS.map(([id, c, w, h], i) => { cnt[c] = (cnt[c] || 0); const t = NAMES[c][cnt[c]++ % NAMES[c].length]; return { id, c, w, h, t, i }; });

/* ===== helpers (mirrors js/app.js) ===== */
const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const inr = n => '₹' + n.toLocaleString('en-IN');
const waLink = msg => 'https://wa.me/917838913373?text=' + encodeURIComponent(msg);
const waMsg = (s, o, d, tm) => 'Hello VANSSHIKHA SONI Nail Atelier!\n\nI would like to enquire about booking:\n\nService: ' + s.name + (o ? '\nPrice Option: ' + o : '') + (d ? '\nPreferred Date: ' + d : '') + (tm ? '\nPreferred Time: ' + tm : '') + '\n\nPlease confirm availability and final pricing.';
const pic = (s, alt, eager) => s.ph
  ? '<img ' + (eager ? 'fetchpriority="high" decoding="async" ' : '') + 'src="' + IMG[s.ph] + '" alt="' + (alt ? esc(s.name) + (s.ex ? ': example finish from the atelier portfolio' : ', from the atelier portfolio') : '') + '" ' + (eager ? '' : 'loading="lazy"') + '>'
  : '<div class="ph" role="img" aria-label="' + esc(s.name) + '"><span class="gold-text">VS</span><small>' + CATS[s.c].name + '</small></div>';
const priceTag = s => '<div class="pp"><span>M<b>' + inr(s.m) + '</b></span><span>R<b>' + inr(s.r) + '</b></span></div>';
const card = (s, i = 0) => `<article class="sc tilt" style="--i:${i}"><a class="sci" href="/services/${s.slug}" tabindex="-1" aria-hidden="true">${pic(s, false)}</a><div class="scb"><div class="eyebrow">${CATS[s.c].name}</div><h3><a href="/services/${s.slug}">${esc(s.name)}</a></h3><p>${esc(s.about)}</p>${priceTag(s)}<div class="acts"><a class="btn ghost" href="/services/${s.slug}">View Details</a><a class="btn" target="_blank" rel="noopener" href="${waLink(waMsg(s))}">Book on WhatsApp</a></div></div></article>`;

/* ===== shell extraction ===== */
function slice(a, b) {
  const i = SRC.indexOf(a), j = SRC.indexOf(b);
  if (i < 0 || j < 0 || j < i) throw new Error('shell marker missing: ' + a);
  return SRC.slice(SRC.indexOf('\n', i) + 1, j).trimEnd();
}
const ASSETS = slice('<!-- @shell:assets:start -->', '<!-- @shell:assets:end -->');
const NAV_HOME = slice('<!-- @shell:nav:start -->', '<!-- @shell:nav:end -->');
const FOOT_HOME = slice('<!-- @shell:footer:start -->', '<!-- @shell:footer:end -->');
const TAIL = slice('<!-- @shell:tail:start -->', '<!-- @shell:tail:end -->');

const NAV_SUB = NAV_HOME
  .replace('href="#top"', 'href="/"')
  .replace('href="#story"', 'href="/about"')
  .replace('href="#founder"', 'href="/about"')
  .replace('href="#portfolio"', 'href="/gallery"')
  .replace('href="#faq"', 'href="/#faq"')
  .replace('href="#book" class="btn mag"', 'href="/booking" class="btn mag"');
const FOOT_SUB = FOOT_HOME
  .replace('href="#book"', 'href="/booking"')
  .replace('href="#nail-guide"', 'href="/#nail-guide"')
  .replace('<div><button type="button" class="rp" id="replay">↻ Replay intro</button></div>', '');

/* ===== page shell ===== */
const IMG_ABS = ORIGIN + '/images/brand/circle.webp';
function head(o) {
  const canon = ORIGIN + (o.path === '/' ? '/' : o.path);
  const robots = o.robots || 'index, follow, max-image-preview:large, max-snippet:-1';
  const ld = (o.ld || []).map(j => '<script type="application/ld+json">' + JSON.stringify(j) + '</script>').join('\n');
  const desc = esc(o.desc);
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#080709" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#260B16">
<meta name="color-scheme" content="dark">
<title>${o.title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="${robots}">
<meta name="googlebot" content="${robots}">
<link rel="canonical" href="${canon}">
<link rel="alternate" hreflang="en" href="${canon}">
<link rel="alternate" hreflang="x-default" href="${canon}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Vansshikha Soni Nail Atelier">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${o.ogTitle || o.title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${IMG_ABS}">
<meta property="og:image:alt" content="VS Nail Atelier — Vansshikha Soni luxury nail art logo">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${o.ogTitle || o.title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${IMG_ABS}">
<link rel="icon" href="/images/brand/circle.webp" type="image/webp">
<link rel="apple-touch-icon" href="/images/brand/logo.jpg">
${ASSETS}
${ld}
</head>
<body data-page="${o.page}">
<div id="intro" role="dialog" aria-modal="true" aria-label="Opening animation"></div>
${o.nav}
${o.main}
${o.footer}

${TAIL}

<script src="/vendor/gsap.min.js"></script>
<script src="/vendor/ScrollTrigger.min.js"></script>
<script src="/js/service-data.js"></script>
<script src="/js/assets.js"></script>
<script src="/js/app.js"></script>
</body></html>
`;
}

const written = [];
function writePage(relPath, o) {
  const html = head({ nav: NAV_SUB, footer: FOOT_SUB, ...o });
  const file = relPath === '/' ? 'index.html' : relPath.replace(/^\//, '') + '/index.html';
  const full = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, 'utf8');
  written.push(file);
}

/* ===== /services/<slug> ===== */
function servicePage(s) {
  const c = CATS[s.c], ct = CONTENT[s.slug] || {}, flip = s.i % 2 ? ' flip' : '';
  const rel = [...c.items.filter(x => x !== s), ...SERV.slice(s.i + 1), ...SERV].filter((x, i, a) => x !== s && a.indexOf(x) === i).slice(0, 3);
  const rings = '<svg viewBox="0 0 400 400" aria-hidden="true">' + [40, 80, 120, 160, 195].map(r => `<circle cx="200" cy="200" r="${r}"/>`).join('') + '</svg>';
  const intro = ct.intro || s.about;
  const procedure = (ct.procedure || []).map(x => `<li>${esc(x)}</li>`).join('');
  const care = s.care ? esc(s.care) : GENERAL_AFTERCARE;
  const faqs = [...(ct.faqs || []), ...sharedFaqs(s.name, 'Rates for ' + s.name + ' are listed at M ' + inr(s.m) + ' / R ' + inr(s.r) + ' on the official menu.')];
  const faqHtml = faqs.map((f, i) => `<div class="faq-item rvx"><h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="sfa${i + 1}" id="sfq${i + 1}">${esc(f.q)}<span class="faq-ico" aria-hidden="true">+</span></button></h3><div class="faq-a" id="sfa${i + 1}" role="region" aria-labelledby="sfq${i + 1}"><p>${f.a}</p></div></div>`).join('\n');

  const main = `<main id="views">
<article class="sd" style="--tint:${c.tint}"><section class="sdh"><div class="sbg" aria-hidden="true">${rings}</div><div class="wrap sdg${flip}"><div class="sdt"><div class="crumb" role="navigation" aria-label="Breadcrumb"><a href="/services">All Services</a> / <a href="/services?c=${c.slug}">${c.name}</a></div><div class="eyebrow">${c.name}</div><h1>${esc(s.name)}</h1><p class="lead">${esc(s.about)}</p><div class="pr2"><span>M<b>${inr(s.m)}</b></span><span>R<b>${inr(s.r)}</b></span></div><div class="acts" style="max-width:420px"><button type="button" class="btn mag" data-go="sbk">Book Appointment</button><a class="btn ghost mag" href="/services">← All Services</a></div></div><figure class="sdi tilt"><span class="no2">${String(s.i + 1).padStart(2, '0')} / 23</span><div class="fr">${pic(s, true, true)}</div>${s.ph ? `<figcaption>${s.ex ? 'Example from the atelier portfolio' : 'From the atelier portfolio'}</figcaption>` : ''}</figure></div></section>
 <section class="sdc"><div class="wrap sdl${flip}"><div class="sdm">
  <section class="rvx"><h2>About this <em>service</em></h2><p>${esc(intro)}</p></section>
  <section class="rvx"><h2>What the service <em>involves</em></h2><p>${esc(s.before)}</p></section>
  ${procedure ? `<section class="rvx"><h2>How the appointment <em>works</em></h2><ul class="kf">${procedure}</ul></section>` : ''}
  <section class="rvx"><h2>Suitable looks</h2><p>${esc(s.ideal)}</p></section>
  <section class="rvx"><h2>Key <em>features</em></h2><ul class="kf">${s.hl.map(x => `<li>${esc(x)}</li>`).join('')}<li>Listed under ${c.name.replace(/(^|\s)\S/g, m => m.toUpperCase())}</li></ul></section>
  <section class="rvx" style="border:0"><h2>Care &amp; <em>maintenance</em></h2><p>${care}</p></section>
 </div>
 <aside class="pcard rvx tilt"><div class="eyebrow">Official rates</div><div class="prow"><div><span>M</span><b>${inr(s.m)}</b></div><div><span>R</span><b>${inr(s.r)}</b></div></div><p class="small">${s.slug === 'extension-removal' ? 'Shown in the original menu order. ' : ''}${/per-finger/.test(s.slug) ? 'Priced per finger. ' : ''}M and R are shown exactly as on the official menu; their meaning is being confirmed by the studio. Final pricing is confirmed on WhatsApp.</p><button type="button" class="btn mag" data-go="sbk">Book Appointment</button></aside></div></section>
 <section class="seo-faq" id="faq" aria-labelledby="faq-title"><div class="wrap">
  <div class="head center"><div class="eyebrow">Questions</div><h2 class="rvx" id="faq-title">Frequently <em>Asked</em></h2><p class="rvx">Everything you need to know before booking ${esc(s.name)}.</p></div>
  <div class="faq-list" id="faq-list">${faqHtml}</div>
 </div></section>
 <section class="sbk" id="sbk" data-svc="${s.slug}"><div class="wrap"><div class="pnl2 rvx"><div><div class="eyebrow">Book on WhatsApp</div><h2>Enquire about <em>${esc(s.name)}</em></h2><p>This opens WhatsApp with a ready message. It is an enquiry only; your slot and final price are confirmed by the studio.</p></div><div class="bf"><fieldset><legend>Price option (optional)</legend><div class="opts"><button type="button" class="opt" aria-pressed="false" data-o="M">M<small>${inr(s.m)}</small></button><button type="button" class="opt" aria-pressed="false" data-o="R">R<small>${inr(s.r)}</small></button></div></fieldset><div class="two"><div><label class="lb2" for="bd">Preferred date (optional)</label><input type="date" id="bd"></div><div><label class="lb2" for="bt">Preferred time (optional)</label><input type="time" id="bt"></div></div><a class="btn mag" id="bwa" target="_blank" rel="noopener">Book on WhatsApp</a></div></div></div></section>
 <section class="rel"><div class="wrap"><h2 class="rvx">Related <em>services</em></h2><div class="sg">${rel.map((x, i) => card(x, i)).join('')}</div><div class="back2"><a class="btn ghost mag" href="/services">← Back to All Services</a></div></div></section></article>
</main>`;

  const title = esc(s.name) + ' — ' + esc(c.name) + ' | Vansshikha Soni Nail Atelier';
  const desc = s.about + ' Listed at M ' + inr(s.m) + ' / R ' + inr(s.r) + ' exactly as on the official menu — final pricing confirmed on WhatsApp. Book ' + s.name + ' at Vansshikha Soni Nail Atelier.';
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Service', name: s.name, description: s.about + ' ' + intro, serviceType: c.name, url: ORIGIN + '/services/' + s.slug, image: ORIGIN + (s.ph ? IMG[s.ph] : '/images/brand/circle.webp'), provider: { '@id': ORIGIN + '/#salon' }, areaServed: { '@type': 'Country', name: 'India' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' }, { '@type': 'ListItem', position: 2, name: 'All Services', item: ORIGIN + '/services' }, { '@type': 'ListItem', position: 3, name: c.name, item: ORIGIN + '/services?c=' + c.slug }, { '@type': 'ListItem', position: 4, name: s.name, item: ORIGIN + '/services/' + s.slug }] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  ];
  writePage('/services/' + s.slug, { page: 'service', path: '/services/' + s.slug, title, ogTitle: esc(s.name) + ' | Vansshikha Soni Nail Atelier', desc, main, ld });
}

/* ===== /services ===== */
function servicesPage() {
  const sections = CATS.map(c => `<section class="sec" id="cat-${c.slug}"><div class="sh"><h2>${c.name}</h2><span>${c.items.length} ${c.items.length > 1 ? 'services' : 'service'}</span></div><div class="sg">${c.items.map((s, i) => card(s, i)).join('')}</div></section>`).join('\n');
  const faqs = [
    { q: 'What nail services do you offer?', a: 'We offer 23 professional nail services across 8 categories: classic & French application, advance gel sets (cat-eye, marble, glitter, ombre, chrome), custom nail art, gel & acrylic extensions, overlays, refills, mini manicures and safe removal.' },
    { q: 'How much do nail services cost?', a: 'Every service on this page shows its official menu rate as M and R, exactly as listed on the studio menu. M and R labels are shown as on the official menu; their meaning is being confirmed by the studio. Final pricing is confirmed on WhatsApp before your appointment.' },
    { q: 'How do I book an appointment?', a: 'Use the booking form on our website to pick a service, preferred date and time — then send the request on WhatsApp. Vansshikha personally confirms availability. Nothing is booked until you receive a confirmation reply. Walk-ins are subject to availability.' },
    { q: 'Do you take custom nail art requests?', a: 'Yes. Bring a reference photo or describe your idea — gold linework, chrome, florals, 3D accents or minimalist designs. Per-finger nail art starts from ₹30. Complex designs may need a separate quote after consultation. Send your inspiration on WhatsApp before your visit.' }
  ];
  const faqHtml = faqs.map((f, i) => `<div class="faq-item rvx"><h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="fa${i + 1}" id="fq${i + 1}">${f.q}<span class="faq-ico" aria-hidden="true">+</span></button></h3><div class="faq-a" id="fa${i + 1}" role="region" aria-labelledby="fq${i + 1}"><p>${f.a}</p></div></div>`).join('\n');
  const main = `<main id="views">
<section class="sph"><div class="wrap"><div class="eyebrow">The Menu</div><h1>All <em>Services</em></h1><p>Eight categories and 23 services with the official rates. M and R labels are shown exactly as on the menu. Every service has its own page with details, aftercare and booking.</p></div></section>
<div class="wrap" style="padding-top:10px;padding-bottom:90px">
<div class="tb"><label class="sr" for="sq">Search services</label><input id="sq" type="search" placeholder="Search all 23 services…" autocomplete="off"><div class="chips" id="sch" role="group" aria-label="Filter by category"></div></div>
<p class="sr" id="scnt" aria-live="polite"></p>
<div id="sl">
${sections}
</div>
<p class="empty" id="empty" hidden>No services match your search.</p>
<p class="note">M and R labels are shown as on the official menu; their meaning is being confirmed by the studio. Final pricing is confirmed on WhatsApp.</p>
<p style="margin-top:2.4rem;text-align:center"><a class="btn mag" href="/booking">Book an Appointment →</a></p>
</div>
<section class="seo-faq" id="faq" aria-labelledby="faq-title"><div class="wrap">
<div class="head center"><div class="eyebrow">Questions</div><h2 class="rvx" id="faq-title">Frequently <em>Asked</em></h2><p class="rvx">Everything you need to know before booking your appointment at Vansshikha Soni Nail Atelier.</p></div>
<div class="faq-list" id="faq-list">${faqHtml}</div>
</div></section>
</main>`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Nail Services', numberOfItems: SERV.length, itemListElement: SERV.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: ORIGIN + '/services/' + s.slug })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' }, { '@type': 'ListItem', position: 2, name: 'All Services', item: ORIGIN + '/services' }] }
  ];
  writePage('/services', { page: 'services', path: '/services', title: PAGES.services.title, desc: PAGES.services.desc, main, ld });
}

/* ===== /gallery ===== */
function galleryPage() {
  const cats = [...new Set(IT.map(i => i.c))];
  const unit = cats.map(c => `<span>${c}</span><span>✦</span>`).join('');
  const tiles = IT.map(it => `<button class="tile tilt" data-i="${it.i}" data-c="${it.c}" aria-label="Open ${it.t}"><img src="${IMG[it.id]}" width="${it.w}" height="${it.h}" alt="${it.t}, ${it.c} nail art" loading="lazy"><span class="no">${String(it.i + 1).padStart(2, '0')}</span><span class="cap"><b>${it.t}</b>${it.c}</span></button>`).join('');
  const main = `<main id="views">
<section class="sph"><div class="wrap"><div class="eyebrow">Portfolio</div><h1>Real work, <em>real hands</em></h1><p>Every image is genuine atelier work by Vansshikha Soni. Tap a look to enlarge it, or send it straight to the booking request.</p></div></section>
<section id="portfolio" style="background:linear-gradient(var(--ink),var(--wine) 120%);padding-bottom:90px"><div class="wrap">
<div class="mq" aria-hidden="true"><div id="mq">${unit}${unit}${unit}${unit}</div></div>
<div class="chips" id="chips" role="group" aria-label="Filter portfolio"></div>
<div class="mason" id="mason">${tiles}</div>
<p class="note" style="margin-top:2.4rem">All photography is the atelier's own work.</p>
<p style="margin-top:2.4rem;text-align:center"><a class="btn mag" href="/booking">Book an Appointment →</a></p>
</div></section>
</main>`;
  const ld = [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' }, { '@type': 'ListItem', position: 2, name: 'Portfolio', item: ORIGIN + '/gallery' }] }];
  writePage('/gallery', { page: 'gallery', path: '/gallery', title: PAGES.gallery.title, desc: PAGES.gallery.desc, main, ld });
}

/* ===== /about ===== */
function aboutPage() {
  const main = `<main id="views">
<section class="sph"><div class="wrap"><div class="eyebrow">Our Story</div><h1>${PAGES.about.h1}</h1><p>Where beauty meets artistry — and every nail tells a story.</p></div></section>
<section class="ourstory" id="story"><div class="wrap os">
<p class="big rvx">At VANSSHIKHA SONI – NAIL ATELIER, we believe that nail artistry is more than just beauty — it's a form of self-expression.</p>
<p class="rvx">Our atelier is inspired by a passion for creativity, timeless elegance, and the little details that make every design special.</p>
<p class="rvx">From delicate, minimalist nails to bold, statement-making creations, we celebrate individuality through thoughtfully crafted nail designs.</p>
<p class="rvx">Our vision is to create a space where beauty meets artistry, where every detail matters, and where every client feels confident expressing their unique style.</p>
<p class="rvx">Because we believe beautiful nails aren't just an accessory — they're a reflection of you.</p>
<div class="tag gold-text rvx">Where Every Nail Tells a Story.</div>
</div></section>
<section class="founder" id="founder"><div class="wrap fd"><div class="arch"><div class="in"><img id="fimg" src="${IMG.founder}" alt="Vansshikha Soni, founder of Vansshikha Soni Nail Atelier" width="732" height="1300" loading="lazy" decoding="async"></div></div>
<div><div class="eyebrow rvx">Meet the Founder</div><h2 class="rvx">The Vision Behind <em>the Art</em></h2><h3 class="rvx" style="font-size:1.9rem;letter-spacing:.14em;margin-top:1.4rem">VANSSHIKHA SONI</h3><div class="role rvx">Founder | Nail Artistry &amp; Luxury Beauty</div>
<p class="rvx">At VANSSHIKHA SONI – NAIL ATELIER, beauty is celebrated through creativity, elegance, and attention to detail.</p>
<p class="rvx">With a vision to make nail artistry a reflection of personal style, Vansshikha Soni brings an appreciation for refined aesthetics and beautiful design to the heart of the brand.</p>
<p class="rvx">From timeless elegance to bold, expressive nail designs, the atelier is inspired by the belief that every detail matters and every individual deserves a look that feels uniquely their own.</p>
<blockquote class="quote rvx">“Elegance is in the details, and every nail tells a story.”</blockquote>
<a href="/services" class="btn ghost mag rvx">Explore the Services →</a></div></div></section>
<section class="seo-why" id="why-us" aria-labelledby="why-title"><div class="wrap">
<div class="head center"><div class="eyebrow rvx">Why Choose Us</div><h2 class="rvx" id="why-title">The <em>Vansshikha Soni</em> Difference</h2><p class="rvx">Hand-finished luxury nail artistry — where precision, hygiene and personal style meet.</p></div>
<div class="why-grid">
<article class="why-card rvx"><div class="why-ico" aria-hidden="true">✦</div><h3>Hand-Finished Art</h3><p>Every set is painted by Vansshikha Soni herself — gold linework, chrome, florals, ombre and quiet minimalism, one set at a time. No rushed factory finishes.</p></article>
<article class="why-card rvx"><div class="why-ico" aria-hidden="true">✧</div><h3>Hygiene-First Studio</h3><p>Single-use files where needed, hospital-grade sanitisation and carefully prepared tools. Your nail health comes before any trend.</p></article>
<article class="why-card rvx"><div class="why-ico" aria-hidden="true">◆</div><h3>Official Transparent Rates</h3><p>All 23 services list official menu rates clearly — from ₹30 nail art per finger to full gel extensions. No hidden charges after you sit down.</p></article>
<article class="why-card rvx"><div class="why-ico" aria-hidden="true">❖</div><h3>Custom Design Consultation</h3><p>Bring a reference, a mood board or just a colour. Every look is designed around your nail shape, lifestyle and personal aesthetic.</p></article>
</div>
<div class="why-cta rvx"><a href="/booking" class="btn mag">Book Your Appointment →</a><a href="/services" class="btn ghost mag">Explore All Services</a></div>
</div></section>
</main>`;
  const ld = [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' }, { '@type': 'ListItem', position: 2, name: 'About', item: ORIGIN + '/about' }] }];
  writePage('/about', { page: 'about', path: '/about', title: PAGES.about.title, desc: PAGES.about.desc, main, ld });
}

/* ===== /contact ===== */
function contactPage() {
  const main = `<main id="views">
<section class="sph"><div class="wrap"><div class="eyebrow">Contact</div><h1>${PAGES.contact.h1}</h1><p>Appointments are requested through the website or WhatsApp. The full studio address is shared privately on booking confirmation.</p></div></section>
<section class="seo-why" aria-labelledby="contact-title"><div class="wrap">
<div class="head center"><div class="eyebrow rvx">Reach Us</div><h2 class="rvx" id="contact-title">Ways to <em>get in touch</em></h2><p class="rvx">Message us on WhatsApp for appointments, directions or a studio tour — or send a request through the booking form.</p></div>
<div class="why-grid">
<article class="why-card rvx"><div class="why-ico" aria-hidden="true">✆</div><h3>WhatsApp</h3><p>Fastest for appointment requests, design references and directions. <a href="https://wa.me/917838913373" target="_blank" rel="noopener">+91 78389 13373</a></p></article>
<article class="why-card rvx"><div class="why-ico" aria-hidden="true">✉</div><h3>Email</h3><p>For longer enquiries and collaborations. <a href="mailto:VANSSHIKHASONI@gmail.com">VANSSHIKHASONI@gmail.com</a></p></article>
<article class="why-card rvx"><div class="why-ico" aria-hidden="true">◎</div><h3>Instagram</h3><p>See the latest atelier work and behind-the-scenes moments. <a href="https://www.instagram.com/vs_nail_atelier_luxury_artist/" target="_blank" rel="noopener">@vs_nail_atelier_luxury_artist</a></p></article>
<article class="why-card rvx"><div class="why-ico" aria-hidden="true">✦</div><h3>Studio Address</h3><p>Our luxury nail atelier is based in India. The full studio address is shared privately on booking confirmation.</p></article>
</div>
<div class="why-cta rvx"><a href="/booking" class="btn mag">Book an Appointment →</a><a href="https://wa.me/917838913373" target="_blank" rel="noopener" class="btn ghost mag">Chat on WhatsApp</a></div>
</div></section>
<section class="seo-faq" id="faq" aria-labelledby="faq-title"><div class="wrap">
<div class="head center"><div class="eyebrow rvx">Questions</div><h2 class="rvx" id="faq-title">Before you <em>visit</em></h2></div>
<div class="faq-list" id="faq-list">
<div class="faq-item rvx"><h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="ca1" id="cq1">Where is Vansshikha Soni Nail Atelier located?<span class="faq-ico" aria-hidden="true">+</span></button></h3><div class="faq-a" id="ca1" role="region" aria-labelledby="cq1"><p>Our luxury nail atelier is based in India. The full studio address is shared privately on booking confirmation. For appointments, directions or a studio tour, message us directly on WhatsApp at +91 78389 13373.</p></div></div>
<div class="faq-item rvx"><h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="ca2" id="cq2">How do I book an appointment?<span class="faq-ico" aria-hidden="true">+</span></button></h3><div class="faq-a" id="ca2" role="region" aria-labelledby="cq2"><p>Use the <a href="/booking">booking form</a> to pick a service, preferred date and time — then send the request on WhatsApp. Vansshikha personally confirms availability. Nothing is booked until you receive a confirmation reply. Walk-ins are subject to availability.</p></div></div>
<div class="faq-item rvx"><h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="ca3" id="cq3">What is your cancellation or rescheduling policy?<span class="faq-ico" aria-hidden="true">+</span></button></h3><div class="faq-a" id="ca3" role="region" aria-labelledby="cq3"><p>Please message us on WhatsApp at least 24 hours before your appointment if you need to reschedule. Same-day cancellations may affect future booking priority. We understand life happens — just communicate early so we can offer the slot to another client.</p></div></div>
</div>
</div></section>
</main>`;
  const ld = [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' }, { '@type': 'ListItem', position: 2, name: 'Contact', item: ORIGIN + '/contact' }] }];
  writePage('/contact', { page: 'contact', path: '/contact', title: PAGES.contact.title, desc: PAGES.contact.desc, main, ld });
}

/* ===== /booking ===== */
function bookingPage() {
  const main = `<main id="views">
<section class="sph"><div class="wrap"><div class="eyebrow">Appointment Request</div><h1>${PAGES.booking.h1}</h1><p>Choose a service and a preferred date, then send the request on WhatsApp. It is a request only; Vansshikha confirms availability personally.</p></div></section>
<section class="book" id="book"><div class="wrap bk"><div><div class="eyebrow">How it works</div><h2 class="rvx">Three steps to <em>your set</em></h2><p class="rvx" style="margin:1.2rem 0;color:rgba(246,238,230,.75)">Pick a service, choose a preferred date and share your details. We reply on WhatsApp to confirm your slot and final pricing.</p><svg viewBox="0 0 300 120" width="100%" style="max-width:300px;opacity:.7" aria-hidden="true"><path d="M0 100C60 100 60 20 120 20S180 100 240 100 300 40 300 40" fill="none" stroke="#D7B77A" stroke-width="1" class="dv2"/></svg></div>
<div class="panel"><div class="steps" id="steps"><i></i><i></i><i></i><i></i></div><div class="lookchip" id="lookchip"><img alt=""><div><div class="eyebrow" style="font-size:.6rem">Selected look</div><span id="lookname"></span></div><button type="button" id="lookx" aria-label="Remove selected look">REMOVE</button></div>
<div class="stp on" data-s="0"><h3>Choose a service</h3><div class="fld" style="margin-top:1.4rem"><select id="ssel" aria-label="Service" style="width:100%;background:#120a0e;color:var(--ivory);border:0;border-bottom:1px solid rgba(215,183,122,.5);padding:.9rem 0;font:inherit;font-size:1.1rem;outline:0"></select></div><p class="err" id="e0" role="alert"></p><div class="nav2"><span></span><button class="btn" data-next>Next →</button></div></div>
<div class="stp" data-s="1"><h3>Preferred date</h3><div class="cal" id="cal"></div><div class="times" id="times"></div><p class="err" id="e1" role="alert"></p><div class="nav2"><button class="btn ghost" data-prev>← Back</button><button class="btn" data-next>Next →</button></div></div>
<div class="stp" data-s="2"><h3>Your details</h3><div class="fld"><input id="nm" placeholder=" " autocomplete="name"><label for="nm">Your name</label></div><div class="fld"><textarea id="nt" rows="3" placeholder=" "></textarea><label for="nt">Notes or design inspiration (optional)</label></div><p class="err" id="e2" role="alert"></p><div class="nav2"><button class="btn ghost" data-prev>← Back</button><button class="btn" data-next>Review →</button></div></div>
<div class="stp" data-s="3"><h3>Request ready</h3><ul class="sum" id="sum"></ul><p class="warn">Not confirmed yet. Nothing is booked until Vansshikha replies to confirm a slot.</p><div class="nav2"><button class="btn ghost" data-prev>← Edit</button><a class="btn mag" id="wa" target="_blank" rel="noopener">Send on WhatsApp</a></div></div></div></div></section>
<section class="seo-faq" id="faq" aria-labelledby="faq-title"><div class="wrap">
<div class="head center"><div class="eyebrow rvx">Questions</div><h2 class="rvx" id="faq-title">Booking <em>essentials</em></h2></div>
<div class="faq-list" id="faq-list">
<div class="faq-item rvx"><h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="ba1" id="bq1">How do I book an appointment?<span class="faq-ico" aria-hidden="true">+</span></button></h3><div class="faq-a" id="ba1" role="region" aria-labelledby="bq1"><p>Use the booking form above to pick a service, preferred date and time — then send the request on WhatsApp. Vansshikha personally confirms availability. Nothing is booked until you receive a confirmation reply. Walk-ins are subject to availability.</p></div></div>
<div class="faq-item rvx"><h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="ba2" id="bq2">Where is Vansshikha Soni Nail Atelier located?<span class="faq-ico" aria-hidden="true">+</span></button></h3><div class="faq-a" id="ba2" role="region" aria-labelledby="bq2"><p>Our luxury nail atelier is based in India. The full studio address is shared privately on booking confirmation. For appointments, directions or a studio tour, message us directly on WhatsApp at +91 78389 13373.</p></div></div>
<div class="faq-item rvx"><h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="ba3" id="bq3">What is your cancellation or rescheduling policy?<span class="faq-ico" aria-hidden="true">+</span></button></h3><div class="faq-a" id="ba3" role="region" aria-labelledby="bq3"><p>Please message us on WhatsApp at least 24 hours before your appointment if you need to reschedule. Same-day cancellations may affect future booking priority. We understand life happens — just communicate early so we can offer the slot to another client.</p></div></div>
</div>
</div></section>
</main>`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' }, { '@type': 'ListItem', position: 2, name: 'Book', item: ORIGIN + '/booking' }] },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Book a Nail Appointment at Vansshikha Soni Nail Atelier', description: 'Simple steps to book luxury nail art, gel extensions or a manicure appointment online via WhatsApp.', totalTime: 'PT5M', step: [{ '@type': 'HowToStep', name: 'Choose a service', text: 'Browse 23 nail services across 8 categories and select the service that matches your desired look.' }, { '@type': 'HowToStep', name: 'Pick a preferred date', text: 'Open the booking form, choose your preferred date and time slot from the calendar.' }, { '@type': 'HowToStep', name: 'Share your details', text: 'Enter your name and any design notes or inspiration so Vansshikha can prepare for your visit.' }, { '@type': 'HowToStep', name: 'Send the request on WhatsApp', text: 'Review your summary and send the appointment request on WhatsApp. Vansshikha personally confirms availability — nothing is booked until you receive a confirmation reply.' }] }
  ];
  writePage('/booking', { page: 'booking', path: '/booking', title: PAGES.booking.title, desc: PAGES.booking.desc, main, ld });
}

/* ===== 404 ===== */
function notFoundPage() {
  const main = `<main id="views">
<section class="sph"><div class="wrap"><div class="eyebrow">404</div><h1>${PAGES.notfound.h1}</h1><p>The page you are looking for may have moved. Try the full service menu, browse the portfolio, or book an appointment.</p>
<p style="margin-top:2rem"><a class="btn mag" href="/services">Browse Services →</a> &nbsp; <a class="btn ghost mag" href="/gallery">View Portfolio</a> &nbsp; <a class="btn ghost mag" href="/">Home</a></p></div></section>
</main>`;
  const html = head({ page: '404', path: '/404', title: PAGES.notfound.title, desc: PAGES.notfound.desc, robots: 'noindex, follow', main, ld: [] });
  fs.writeFileSync(path.join(ROOT, '404.html'), html, 'utf8');
  written.push('404.html');
}

/* ===== sitemap + robots ===== */
const ROUTES = [
  { p: '/', pr: '1.0', fr: 'weekly' },
  { p: '/services', pr: '0.9', fr: 'weekly' },
  ...SERV.map(s => ({ p: '/services/' + s.slug, pr: '0.8', fr: 'monthly' })),
  { p: '/gallery', pr: '0.8', fr: 'weekly' },
  { p: '/about', pr: '0.7', fr: 'monthly' },
  { p: '/contact', pr: '0.7', fr: 'monthly' },
  { p: '/booking', pr: '0.8', fr: 'weekly' }
];
function sitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = ROUTES.map(r => `<url><loc>${ORIGIN}${r.p}</loc><lastmod>${lastmod}</lastmod><changefreq>${r.fr}</changefreq><priority>${r.pr}</priority></url>`).join('\n');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + body + '\n</urlset>\n', 'utf8');
}
function robots() {
  fs.writeFileSync(path.join(ROOT, 'robots.txt'),
    'User-agent: *\nAllow: /\nDisallow: /js/\nDisallow: /vendor/\n\nUser-agent: GPTBot\nDisallow: /\n\nSitemap: ' + ORIGIN + '/sitemap.xml\n', 'utf8');
}

/* ===== run ===== */
SERV.forEach(servicePage);
servicesPage();
galleryPage();
aboutPage();
contactPage();
bookingPage();
notFoundPage();
sitemap();
robots();
console.log('Built ' + written.length + ' pages + sitemap.xml + robots.txt');
console.log(written.join('\n'));
