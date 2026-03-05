const CACHE = 'quiz-v1';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './firebase-config.js',
  './favicon.svg',
  './data/adminsistemas.json',
  './data/clouddevops.json',
  './data/secdevops.json',
  './data/herramientasdevops.json',
  './data/automatizacion.json',
  './data/scripts.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
