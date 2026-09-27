// Offline működés (service worker). Az app.js regisztrálja.
//  - Az oldal fájljai (index.html, app.min.js, style.css, libs/, data/enek.json, data/kottakonyvek.json):
//    a hálózatról jönnek, ha az elérhető (így a frissítések rögtön megjelennek), és közben elmentjük őket.
//    Internet nélkül, vagy ha a hálózat nem válaszol időben, a mentett változat jön.
//  - A kottakönyvek fájljai (data/<mappa>/...): a készülékre letöltött könyvből, ha ott vannak, különben a hálózatról.
//    A könyvek letöltését és törlését az app.js végzi; a letöltés kérései (X-Letoltes fejléc) mindig a hálózatra mennek.
const APP_CACHE = 'orgonatar-app-v1';
const NETWORK_TIMEOUT = 4000; // ms: rossz (pl. templomi) hálózaton ennyi után a mentett változat jön
const SLOW_NETWORK_PAUSE = 30000; // ms: időtúllépés után ennyi ideig nem várunk a hálózatra, rögtön a mentett jön
const APP_FILES = ['./', 'index.html', 'app.min.js', 'style.css', 'libs/react.js', 'libs/react-dom.js',
    'libs/opensheetmusicdisplay.min.js', 'data/enek.json', 'data/kottakonyvek.json'];
const SCOPE_PATH = new URL(self.registration.scope).pathname;
const MATCH_OPTIONS = { ignoreSearch: true, ignoreVary: true };

self.addEventListener('install', (event) => {
    // Az oldal fájljait rögtön elmentjük, hogy az első látogatás után internet nélkül is induljon
    // (a böngésző épp letöltött példányait használva, nem töltjük le őket újra)
    event.waitUntil(caches.open(APP_CACHE)
        .then(cache => Promise.all(APP_FILES.map(url => cache.add(url).catch(() => {}))))
        .then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
    // A régebbi változatú mentett oldalfájlok törlése (a letöltött kottakönyvek maradnak)
    event.waitUntil(caches.keys()
        .then(names => Promise.all(names
            .filter(name => name.startsWith('orgonatar-app-') && name !== APP_CACHE)
            .map(name => caches.delete(name))))
        .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET' || request.headers.has('X-Letoltes')) return;
    const url = new URL(request.url);
    if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE_PATH)) return;
    const path = url.pathname.slice(SCOPE_PATH.length);
    if (/^data\/[^/]+\/./.test(path)) event.respondWith(fromDownloadedBook(request));
    else event.respondWith(networkFirst(event, request));
});

// Kottakönyv fájlja: a letöltött könyvből, ha ott van
const fromDownloadedBook = async (request) => (await caches.match(request, MATCH_OPTIONS)) || fetch(request);

// Az oldal fájljai: a hálózatról (és elmentjük), ennek hiányában vagy késésekor a mentett változat.
// Ha a hálózat nem válaszolt időben (pl. van WiFi, de nincs internet), egy ideig nem várunk rá újra: a többi fájl
// rögtön a mentett változatból jön, a hálózati kérés csak a háttérben frissít.
let slowNetworkUntil = 0;
const networkFirst = (event, request) => {
    const network = fetch(request).then(async (response) => {
        slowNetworkUntil = 0;
        if (response.ok) {
            try {
                const cache = await caches.open(APP_CACHE);
                await cache.put(request, response.clone());
            } catch (err) { /* pl. betelt a tárhely: a friss fájl ettől még megy az oldalnak */ }
        }
        return response;
    });
    event.waitUntil(network.catch(() => {}));
    // oldalbetöltésnél, ha épp ez a cím nincs elmentve, a mentett főoldal jön
    const saved = caches.match(request, MATCH_OPTIONS)
        .then(cached => cached || (request.mode === 'navigate' ? caches.match('./', MATCH_OPTIONS) : undefined));
    return saved.then(cached => {
        if (!cached) return network;
        if (Date.now() < slowNetworkUntil) return cached;
        return new Promise(resolve => {
            const timer = setTimeout(() => {
                slowNetworkUntil = Date.now() + SLOW_NETWORK_PAUSE;
                resolve(cached);
            }, NETWORK_TIMEOUT);
            network.then(response => { clearTimeout(timer); resolve(response); }, () => { clearTimeout(timer); resolve(cached); });
        });
    });
};
