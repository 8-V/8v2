/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "8v.webp",
    "revision": "14aa7d37373cb28df896d61dea060e59"
  },
  {
    "url": "app.css",
    "revision": "194782a37d213efcfe0a642544d2cd5f"
  },
  {
    "url": "contact.html",
    "revision": "ddfdcc18b81870c8f063a3767dd438e3"
  },
  {
    "url": "favicon.ico",
    "revision": "6536a273c2648b4d610a1331670ed44f"
  },
  {
    "url": "food.html",
    "revision": "2c480f1183395be993af242512be581b"
  },
  {
    "url": "food.js",
    "revision": "55b03fb7c4bace360e8a1c888058a955"
  },
  {
    "url": "icons/icon.hdpi.png",
    "revision": "d0ba9d6765aa7ba3b76b6515d3fb804e"
  },
  {
    "url": "icons/icon.mdpi.png",
    "revision": "ead2c7bd9136f19ba3ba60bb9b5368b8"
  },
  {
    "url": "icons/icon.xhdpi.png",
    "revision": "9a719499eceb2e4dfac22379dfa5baec"
  },
  {
    "url": "icons/icon.xxhdpi.png",
    "revision": "23f18472f8826a08e030e6bd9a58e456"
  },
  {
    "url": "icons/icon.xxxhdpi.png",
    "revision": "639f0602fcb355aaade6ad1c3d6e5d83"
  },
  {
    "url": "icons/splash.png",
    "revision": "c415327ebb92faf7b11c97e1ffef8a7f"
  },
  {
    "url": "index.html",
    "revision": "ea859a82efe68f69a7c94091e50a295f"
  },
  {
    "url": "index.js",
    "revision": "0a5ea8168d2ff9f3f3ac79b908a8851b"
  },
  {
    "url": "manifest.json",
    "revision": "af2a7303ba825dd35dadac63ee7b6b3c"
  },
  {
    "url": "one.html",
    "revision": "99bf4d1edc2518e557ae4391a4701963"
  },
  {
    "url": "one.js",
    "revision": "6a5d7214768ca3b18402ef9381f37683"
  },
  {
    "url": "package.json",
    "revision": "237f91aedab9b0369f3f46fb17b93f1f"
  },
  {
    "url": "rz.html",
    "revision": "ce08315df8884605c4e732fb8542061f"
  },
  {
    "url": "rz.js",
    "revision": "90c71b867454423f71b1bc6a7d42863f"
  },
  {
    "url": "sw.js",
    "revision": "ea2b57fec3f50b3d347ff2b71d8e73e5"
  },
  {
    "url": "two.html",
    "revision": "1918e6f75a68a535bd42784bb3de3074"
  },
  {
    "url": "two.js",
    "revision": "92f1f5db0b2d15a51540846377ec6cdc"
  },
  {
    "url": "util/init.js",
    "revision": "adb0d71f100cd919233712568b67a3b9"
  },
  {
    "url": "workbox-config.js",
    "revision": "0e8bf313c3106ab5d0294b6b741b0448"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
