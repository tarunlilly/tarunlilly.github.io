/* Offline cache for the Japan 2026 planner.
   Bump CACHE when you upload a new index.html, or the old one keeps being served. */
const PREFIX = "japan-2026-workspace-" + self.registration.scope;
const CACHE = PREFIX + "-v4";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest",
                "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const scope = new URL(self.registration.scope);
  if (e.request.method !== "GET" || url.origin !== scope.origin ||
      !url.pathname.startsWith(scope.pathname) ||
      !ASSETS.some(asset => new URL(asset, scope).pathname === url.pathname)) return;
  e.respondWith(
    caches.open(CACHE).then(cache => cache.match(e.request).then(hit => {
      const live = fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          cache.put(e.request, copy);
        }
        return res;
      }).catch(() => hit);
      return live.then(response => response || hit || Response.error());
    }))
  );
});
