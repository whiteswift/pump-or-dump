// v0.2

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pump').then(cache => {
      return cache.addAll([
        '',
        './manifest.json',
        './index.html',
        './style.css',
        './favicon.png'
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
    caches.match(event.request, {ignoreSearch: true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
