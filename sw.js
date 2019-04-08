const cacheName = 'v1.0.2';
const toCache = ['/', '/index.js', '/favicon.ico'];
const toBackup = ['https://homework-63c7.restdb.io/rest/email_inbound'];

self.addEventListener('install', evt => {
  caches.open(cacheName).then(cache => cache.addAll(toCache));
  evt.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', evt => {
  console.log('[sw] activate');
  evt.waitUntil(
    caches.keys().then(keys => {
      Promise.all(
        keys
          .filter(key => cacheName != key)
          .map(key => {
            console.log('[sw] delete', key);
            caches.delete(key);
          })
      );
    })
  );
});

self.addEventListener('fetch', evt => {
  console.log('[sw] fetch', evt.request.url);
  if (toBackup.includes(evt.request.url)) {
    console.log('[sw] Backing up', evt.request.url);
    evt.respondWith(
      fetch(evt.request)
        .then(async resp => {
          cache = await caches.open(cacheName);
          cache.put(evt.request, resp.clone());
          return resp;
        })
        .catch(_ => caches.match(evt.request))
    );
  } else {
    evt.respondWith(
      caches.match(evt.request).then(resp => {
        return (
          resp ||
          fetch(evt.request).then(async res => {
            cache = await caches.open(cacheName);
            cache.put(evt.request, res.clone());
            return res;
          })
        );
      })
    );
  }
});
