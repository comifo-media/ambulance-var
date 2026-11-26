// Service Worker: cache de l'app pour un usage hors ligne (chemins relatifs au dossier du sw.js)
const CACHE = 'ambulance-var-v.0.70.0';
const ASSETS = ['./', './index.html', './referentiel.html', './referentiel-data.js', './manifest.json', './icons/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Navigation : réseau d'abord, repli sur le cache si hors ligne (index.html ou referentiel.html)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          const key = url.pathname.endsWith('referentiel.html') ? './referentiel.html' : './index.html';
          caches.open(CACHE).then((c) => c.put(key, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html') || caches.match('./')))
    );
    return;
  }

  // Autres ressources : cache d'abord, puis réseau
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});
