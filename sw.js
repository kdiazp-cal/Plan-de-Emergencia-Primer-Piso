
const CACHE = 'emergencia-primer-piso-v6';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './config.js',
  './manifest.webmanifest',
  './alerta.json',
  './assets/icon-512.png',
  './assets/primer_piso.png',
  './assets/mapa_emplazamiento.png',
  './assets/planos/sede_principal_piso1.png',
  './assets/planos/sede_principal_piso2.png',
  './assets/planos/sede_principal_piso3.png',
  './assets/planos/sede_principal_subterraneo.png',
  './assets/docs/Plan_de_Emergencia_Completo_Sede_Calama_2026.pdf'
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  ]));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
});
