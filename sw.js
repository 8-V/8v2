//importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')
self.addEventListener('fetch',evt => {evt.respondWith(fetch(evt.request))});
