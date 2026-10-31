/* Tangga — service worker: menyimpan aplikasi di perangkat supaya bisa dibuka tanpa sinyal.
   Ganti VERSI setiap kali file aplikasi berubah agar HP murid mengambil versi baru. */
const VERSI = 'tangga-2026-10-31-2';
const FILES = [
  './', 'index.html', 'styles.css', 'manifest.webmanifest',
  'content.js', 'content2.js', 'core.js', 'ui.js', 'play.js', 'ai.js', 'native.js', 'app.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png',
  'fonts/plus-jakarta-sans-latin-400-normal.woff2', 'fonts/plus-jakarta-sans-latin-500-normal.woff2',
  'fonts/plus-jakarta-sans-latin-600-normal.woff2', 'fonts/plus-jakarta-sans-latin-700-normal.woff2',
  'fonts/plus-jakarta-sans-latin-800-normal.woff2', 'fonts/plus-jakarta-sans-latin-400-italic.woff2',
  'fonts/kalam-latin-400-normal.woff2', 'fonts/kalam-latin-700-normal.woff2',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSI)
      .then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('tangga-') && k !== VERSI).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    /* Halaman: pakai salinan di perangkat, ambil dari jaringan bila belum ada. */
    e.respondWith(caches.match('index.html').then((m) => m || fetch(req)));
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((m) => m || fetch(req).then((res) => {
      if (res && res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(VERSI).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});
