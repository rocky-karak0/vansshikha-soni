#!/usr/bin/env node
/* Vercel-like local preview server:
   - clean URLs (/services/classic -> services/classic/index.html)
   - directory index.html resolution
   - 404.html for unknown paths
   Usage: node scripts/serve-local.js [port]   (default 4173) */
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const PORT = +process.argv[2] || 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2'
};

function resolve(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const abs = path.join(ROOT, p);
  if (!abs.startsWith(ROOT)) return null;
  const tries = [];
  if (path.extname(abs)) tries.push(abs);
  else { tries.push(abs + '.html', path.join(abs, 'index.html')); }
  for (const t of tries) {
    try { if (fs.statSync(t).isFile()) return t; } catch (e) { /* next */ }
  }
  return null;
}

http.createServer((req, res) => {
  let file = resolve(req.url);
  if (!file) file = path.join(ROOT, '404.html');
  const code = file.endsWith('404.html') && !req.url.startsWith('/404') ? 404 : 200;
  const ext = path.extname(file).toLowerCase();
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(500); res.end('Server error'); return; }
    res.writeHead(code, { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(buf);
  });
}).listen(PORT, () => console.log('Local preview: http://localhost:' + PORT + '/'));
