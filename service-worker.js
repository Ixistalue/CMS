const CACHE_NAME = "pwa-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/tasks.html",
  "/dashboard.html",
  "/css/main.css",
  "/css/style.css",
  "/js/main.js",
  "/js/students.js",
  "/assets/icon-192x192.png",
  "/assets/icon-512x512.png",
  "/assets/user_icon.jpg",
  "/assets/edit32.png",
  "/assets/bin.png",
  "/assets/alarm.png",
  "/assets/bell-sound.mp3"
];

// Встановлення Service Worker та кешування файлів
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Перехоплення запитів і завантаження з кешу
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Оновлення Service Worker і видалення старого кешу
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});
