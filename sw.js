/* Caisse Chlorophylle Night – fonctionnement hors ligne.
   Avec réseau : dernière version publiée (gardée en cache). Sans réseau : version en cache. */
// Préfixe propre à CETTE caisse : plusieurs caisses partagent l'adresse <compte>.github.io.
var PREFIX = 'caisse-chlorophylle-';
var CACHE = PREFIX + 'v21';
// catalogue.json est publié par l'app Admin : il n'est pas pré-chargé (il est mis en cache à la première lecture)
var FILES = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES.map(function (f) { return new Request(f, { cache: 'no-store' }); })); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf(PREFIX) === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(new Promise(function (resolve) {
    var done = false;
    function fromCache() {
      if (done) return; done = true;
      caches.open(CACHE).then(function (c) {
        return c.match(e.request, { ignoreSearch: true }).then(function (r) { return r || c.match('./index.html'); });
      }).then(resolve);
    }
    var timer = setTimeout(fromCache, 3000);
    // no-store : jamais la copie du cache HTTP du navigateur (GitHub Pages la garde 10 min), toujours la version publiée
    fetch(e.request.url, { cache: 'no-store', credentials: 'same-origin' }).then(function (res) {
      if (res && res.ok) { var copy = res.clone(), u = new URL(e.request.url); caches.open(CACHE).then(function (c) { c.put(u.origin + u.pathname, copy); }); }
      clearTimeout(timer);
      if (!done) { done = true; resolve(res); }
    }).catch(function () { clearTimeout(timer); fromCache(); });
  }));
});
