const cacheName = 'meme'
const toCache = [
  '/',
  '/index.js',
  '/favicon.ico'
]
const toBackup = [
  'https://homework-63c7.restdb.io/rest/email_inbound'
]

// self.addEventListener('install', evt => {
//   console.log('[sw] install')
//   evt.waitUntil(
//     caches.open(cacheName)
//     .then(cache => cache.addAll(toCache))
//   )
// })

self.addEventListener('install', evt => {
  caches.open(cacheName).then(cache => cache.addAll(toCache))
  evt.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', evt => {
  console.log('[sw] activate')
  evt.waitUntil(
    caches.keys().then(keys => {
      Promise.all(
        keys
        .filter(key => cacheName != key)
        .map(key => {
          console.log('[sw] delete', key)
          caches.delete(key)
        })
      )
    })
  )
})

self.addEventListener('fetch', evt => {
  if (evt.request.url in toBackup)
    evt.respondWith(
      fetch(evt.request)
      .then(
        resp => {
          caches.open(cacheName)
            .then(
              cache => {
                cache.put(evt.request, resp.clone())
                return resp
              }
            )

        }
      )
    )
  else
    evt.respondWith(
      caches
      .match(evt.request)
      .then(
        resp => {
          return resp || fetch(evt.request).then(
            res => {
              return caches.open(cacheName).then(
                cache => {
                  cache.put(evt.request, res.clone())
                  return res
                }
              )
            }
          )
        }
      )
    )
})