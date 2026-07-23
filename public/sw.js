const CACHE_NAME = 'roasbodhi-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/about/',
  '/contact/',
  '/pricing/',
  '/favicon.svg',
  '/site.webmanifest'
];

// Install Event - Pre-cache critical static paths
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate Event - Clean up old cache versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch Event - Cache-first for static assets, network-first for HTML pages
self.addEventListener('fetch', (e) => {
  const requestUrl = new URL(e.request.url);

  // If HTML document request, use Network-First strategy
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          // Open cache and save fresh copy
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseCopy);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if network is offline
          return caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Offline fallback message response if completely uncached
            return new Response(
              '<h1>Namaste! You are currently offline.</h1><p>Please check your internet connection to access RoasBodhi™.</p>',
              {
                headers: { 'Content-Type': 'text/html' }
              }
            );
          });
        })
    );
    return;
  }

  // Cache-First strategy for static assets (images, fonts, stylesheets, scripts)
  const isAsset = 
    e.request.destination === 'style' ||
    e.request.destination === 'script' ||
    e.request.destination === 'image' ||
    e.request.destination === 'font';

  if (isAsset) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request).then((response) => {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseCopy);
          });
          return response;
        });
      })
    );
  }
});
