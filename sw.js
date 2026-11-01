// Service worker do Azul Groove: rede primeiro, cache só como reserva se estiver offline
const C = 'azul-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(['chat.html', 'aumentar-o-tamanho-d.png'])).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { if (res.status === 200) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); } return res; }).catch(() => caches.match(r)));
});
