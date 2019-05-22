self.addEventListener('install', self.skipWaiting);

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
);

const precache = [
  '/app.css',
  '/8v.webp',
  '/contact.html',
  '/food.html',
  '/food.js',
  '/one.html',
  '/one.js',
  '/rz.html',
  '/rz.js',
  '/two.html',
  '/two.js',
];

const cors = [
  'https://unpkg.com/jquery-mobile@1.4.1/dist/jquery.mobile.min.js',
  'https://unpkg.com/jquery@2.1.4/dist/jquery.min.js',
  'https://unpkg.com/jquery-mobile@1.4/dist/jquery.mobile.min.css',
  'https://malsup.github.io/min/jquery.blockUI.min.js',
];

workbox.precaching.precacheAndRoute(precache);

workbox.routing.registerRoute(
  /workbox/,
  new workbox.strategies.StaleWhileRevalidate({cacheName: 'workbox'}),
);

workbox.routing.registerRoute(
  i => i.url in cors,
  new workbox.strategies.StaleWhileRevalidate({cacheName: 'cors'}),
);

workbox.routing.registerRoute(
  /^https:\/\/homework-63c7\.restdb\.io\/rest\//,
  new workbox.strategies.NetworkFirst({cacheName: 'db'}),
);

self.addEventListener('push', evt => {
  console.log('[sw] push');

  let body = (tag = title = evt.data.text());

  let icon = '/icons/icon.hdpi.png';

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
