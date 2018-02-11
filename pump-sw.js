// v0.1

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pump').then(cache => {
      return cache.addAll([
        '',
        '/manifest.json',
        '/index.html',
        '/assets/style.css',
        '/assets/logo_144.png',
        '/assets/logo_256.png',
        '/assets/logo_512.png'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
