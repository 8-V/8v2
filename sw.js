importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
);

workbox.precaching.precacheAndRoute(['/', '/index.js', '/app.css']);

workbox.routing.registerRoute(
  /(unpkg,gstatic)\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'cors assets',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 365 * 24 * 60 * 60,
        // 1 year
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /restdb\.io/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'db',
  }),
);

workbox.routing.registerRoute(
  /^\/.*$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'local',
  }),
);

self.addEventListener('push', evt => {
  console.log('[sw] Push:', evt);

  let {title, body, icon, tag} = evt;

  evt.waitUntil(self.registration.showNotification(title, {body, icon, tag}));
});

self.addEventListener('notificationclick', evt => {
  console.log('[sw] Notification click:', evt.notification.tag);

  evt.notification.close();

  evt.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(clist => {
        let client = clist.filter(c => c.url === '/' && 'focus' in c)[0];

        if (client) return client.focus();
        else if (clients.openWindow) clients.openWindow('/');
      }),
  );
});
