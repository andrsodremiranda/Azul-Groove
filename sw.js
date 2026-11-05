// Service worker mínimo: necessário para o Chrome/Edge oferecerem a instalação.
const CACHE = 'azul-groove-v1';
const ASSETS = ['./chat.html', './aumentar-o-tamanho-d.png', './manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
// Rede primeiro; só usa o cache se estiver offline. Só mexe em GET da mesma origem.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(fetch(req).catch(() => caches.match(req)));
});
