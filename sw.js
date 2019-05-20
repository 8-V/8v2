importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/latest/workbox-sw.js',
);

workbox.precaching.precacheAndRoute(['/', '/index.js', '/app.css']);

workbox.routing.registerRoute(
  /gstatic.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /\.webp$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // week
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /^.*$/,
  new workbox.strategies.StaleWhileRevalidate({cacheName: 'assets'}),
);
