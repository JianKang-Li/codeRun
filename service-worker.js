// 创建一个简单的缓存策略
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  './index.html',
  // './css/index.css',
  // './js/index.js',
  './favicon.ico',
  './manifest.json',
  './img/Ljk.png'
];

// 缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 使用缓存的资源
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有响应，直接返回缓存
        if (response) {
          return response;
        }
        // 如果缓存中没有响应，直接返回fetch请求
        return fetch(event.request);
      })
  );
});
