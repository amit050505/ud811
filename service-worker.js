var cacheName = 'weatherPWA-v1';
var filesToCache = [
  '/ud811/',
  '/ud811/index.html',
  '/ud811/scripts/app.js',
  '/ud811/scripts/localforage-1.4.0.js',
  '/ud811/styles/ud811.css',
  '/ud811/images/clear.png',
  '/ud811/images/cloudy-scattered-showers.png',
  '/ud811/images/cloudy.png',
  '/ud811/images/fog.png',
  '/ud811/images/ic_add_white_24px.svg',
  '/ud811/images/ic_refresh_white_24px.svg',
  '/ud811/images/partly-cloudy.png',
  '/ud811/images/rain.png',
  '/ud811/images/scattered-showers.png',
  '/ud811/images/sleet.png',
  '/ud811/images/snow.png',
  '/ud811/images/thunderstorm.png',
  '/ud811/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
