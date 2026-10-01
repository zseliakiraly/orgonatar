const { useState, useEffect, useLayoutEffect, useMemo, useRef, useCallback } = React;

// --- UTILS & ICONS ---
const IconBase = ({ size = 24, className = "", children, onClick, onMouseDown, style }) => (
    <svg onClick={onClick} onMouseDown={onMouseDown} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={`${className} ${onClick ? 'clickable' : ''}`}>
        {children}
    </svg>
);

const Icons = {
    Music: (props) => <IconBase {...props}><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></IconBase>,
    ListMusic: (props) => <IconBase {...props}><path d="M21 15V6"></path><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path><path d="M12 12H3"></path><path d="M16 6H3"></path><path d="M12 18H3"></path></IconBase>,
    Search: (props) => <IconBase {...props}><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></IconBase>,
    Plus: (props) => <IconBase {...props}><path d="M5 12h14"></path><path d="M12 5v14"></path></IconBase>,
    ChevronLeft: (props) => <IconBase {...props}><path d="m15 18-6-6 6-6"></path></IconBase>,
    ChevronRight: (props) => <IconBase {...props}><path d="m9 18 6-6-6-6"></path></IconBase>,
    Trash2: (props) => <IconBase {...props}><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></IconBase>,
    Play: (props) => <IconBase {...props}><polygon points="5 3 19 12 5 21 5 3"></polygon></IconBase>,
    Settings: (props) => <IconBase {...props}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></IconBase>,
    Book: (props) => <IconBase {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></IconBase>,
    Info: (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="16" y2="12"></line><line x1="12" x2="12.01" y1="8" y2="8"></line></IconBase>,
    Edit: (props) => <IconBase {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></IconBase>,
    GripVertical: (props) => <IconBase {...props}><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></IconBase>,
    CheckSquare: (props) => <IconBase {...props}><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></IconBase>,
    Square: (props) => <IconBase {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></IconBase>,
    X: (props) => <IconBase {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></IconBase>,
    ChevronDown: (props) => <IconBase {...props}><path d="m6 9 6 6 6-6"/></IconBase>,
    Eye: (props) => <IconBase {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></IconBase>,
    EyeOff: (props) => <IconBase {...props}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></IconBase>,
    LayoutBottom: (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="15" y2="15" /></IconBase>,
    LayoutSidebar: (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="15" x2="15" y1="3" y2="21" /></IconBase>,
    Columns: (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="12" x2="12" y1="3" y2="21" /></IconBase>,
    List: (props) => <IconBase {...props}><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></IconBase>,
    ListOrdered: (props) => <IconBase {...props}><line x1="10" x2="21" y1="6" y2="6"></line><line x1="10" x2="21" y1="12" y2="12"></line><line x1="10" x2="21" y1="18" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></IconBase>,
    Maximize: (props) => <IconBase {...props}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></IconBase>,
    // Saját ikon a gyors megnyitáshoz: számbillentyűzet (3×3 gomb és a 0)
    Dialpad: (props) => <IconBase {...props}>
        {[6, 12, 18].map(x => [4.5, 10, 15.5].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.9" fill="currentColor" stroke="none" />))}
        <circle cx="12" cy="21" r="1.9" fill="currentColor" stroke="none" />
    </IconBase>,
    Calendar: (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></IconBase>,
    Backspace: (props) => <IconBase {...props}><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/></IconBase>,
};

// Az ének versszakai soronként (enek.json: "verses": [["1. versszak 1. sora", "2. sora", …], [2. versszak], …]).
// A régi formátumot is elfogadja: "lyrics" egyetlen szövegként, a versszakok között üres sorral, elején a számukkal.
const hymnVerses = (hymn) => {
    const clean = (lines) => lines.filter(l => typeof l === 'string' && l.trim()).map(l => l.trim());
    if (Array.isArray(hymn.verses)) return hymn.verses.filter(Array.isArray).map(clean);
    if (typeof hymn.lyrics !== 'string' || !hymn.lyrics.trim()) return [];
    return hymn.lyrics.trim().split(/\n\s*\n/).map(v => clean(v.replace(/^\d+\.\s*/, '').split('\n')));
};

// Egy versszak saját sorai és a refrénje (a "Refr." sor utáni sorok; a további versszakoknál rendszerint csak a rövidítése)
const splitRefrain = (lines) => {
    const i = lines.findIndex(l => l.startsWith('Refr.'));
    if (i < 0) return { body: lines, refrain: null };
    const first = lines[i].slice(5).trim();
    return { body: lines.slice(0, i), refrain: (first ? [first] : []).concat(lines.slice(i + 1)) };
};

// A versszakok a megjelenítéshez: sorszám (0-tól, a listák ezt tárolják), felirat ("1."), sorok (saját + refrén)
const verseList = (hymn) => (hymn.verses || []).map((lines, index) => ({ index, label: `${index + 1}.`, lines, ...splitRefrain(lines) }));

// A szövegpanel tartalma: a kiválasztott versszakok (üres választás = mind) és az ének teljes refrénje
// (a leghosszabb, rendszerint az 1. versszak után álló; akkor is, ha az 1. versszak nincs kiválasztva)
const lyricsOf = (hymn, selected = []) => {
    const all = verseList(hymn);
    const refrain = all.reduce((best, v) => v.refrain && v.refrain.length > (best ? best.length : 0) ? v.refrain : best, null);
    return { verses: selected.length ? all.filter(v => selected.includes(v.index)) : all, refrain };
};

// --- TÁROLÁS (localStorage) ---
const STORAGE_KEYS = { playlists: 'orgonista_playlists', settings: 'orgonista_settings' };

const SETTINGS_VERSION = 2;

// Kottafontok (a Verovio beépített SMuFL-betűkészletei közül); az első az alapértelmezett
const SCORE_FONTS = [
    { id: 'Leipzig', hint: 'tömöttebb' },
    { id: 'Bravura', hint: 'szellősebb' }
];

// A feliratok és az énekszövegek betűtípusai (fonts/ mappa, a programmal csomagolva); az első az alapértelmezett
const UI_FONTS = [
    { id: 'figtree', family: 'Figtree', hint: 'kiegyensúlyozott, barátságos' },
    { id: 'nunito-sans', family: 'Nunito Sans', hint: 'lágy, nyitott' },
    { id: 'onest', family: 'Onest', hint: 'tágas, nagyobb kisbetűk' },
    { id: 'dm-sans', family: 'DM Sans', hint: 'geometrikus' },
    { id: 'atkinson', family: 'Atkinson Hyperlegible Next', hint: 'a legjobban olvasható betűformák' }
];
const uiFontStack = (id) => `'${(UI_FONTS.find(f => f.id === id) || UI_FONTS[0]).family}', var(--font-fallback)`;

// Az énekszámok és az oldalcímek talpas betűtípusai, a régi korálkönyvek mintájára (fonts/ mappa); az első az alapértelmezett
const SERIF_FONTS = [
    { id: 'old-standard', family: 'Old Standard TT', hint: 'a régi korálkönyvhöz legközelebbi' },
    { id: 'dm-serif', family: 'DM Serif Text', hint: 'vaskosabb, messziről is jól olvasható' },
    { id: 'libre-bodoni', family: 'Libre Bodoni', hint: 'klasszikus Bodoni' }
];
const serifFontStack = (id) => `'${(SERIF_FONTS.find(f => f.id === id) || SERIF_FONTS[0]).family}', var(--font-serif-fallback)`;

const DEFAULT_SETTINGS = { theme: 'pergamen', uiFont: UI_FONTS[0].id, serifFont: SERIF_FONTS[0].id, showLyrics: true, showClock: true, sidebarSide: 'right', lyricsWidth: '15%', scoreMaxWidth: '100%', scoreFont: SCORE_FONTS[0].id, bookActive: {}, skipFullscreenPrompt: false, settingsVersion: SETTINGS_VERSION };

const loadJSON = (key, fallback) => {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value ?? fallback;
    } catch (e) {
        return fallback;
    }
};

const saveJSON = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.error("Mentési hiba:", e); }
};

const loadSettings = () => {
    const stored = loadJSON(STORAGE_KEYS.settings, {});
    const settings = { ...DEFAULT_SETTINGS, ...(typeof stored === 'object' ? stored : {}) };
    if (!settings.bookActive || typeof settings.bookActive !== 'object') settings.bookActive = {};
    if (!SCORE_FONTS.some(f => f.id === settings.scoreFont)) settings.scoreFont = DEFAULT_SETTINGS.scoreFont;
    if (!UI_FONTS.some(f => f.id === settings.uiFont)) settings.uiFont = DEFAULT_SETTINGS.uiFont;
    if (!SERIF_FONTS.some(f => f.id === settings.serifFont)) settings.serifFont = DEFAULT_SETTINGS.serifFont;
    // 2. verzió: a Pergamen lett az alapértelmezett téma. A korábbi alapértéket ("papyrus"), amelyet az oldal
    // magától elmentett, egyszer átállítjuk (addig Pergament nem is lehetett választani).
    if ((stored.settingsVersion || 1) < 2 && settings.theme === 'papyrus') settings.theme = 'pergamen';
    settings.settingsVersion = SETTINGS_VERSION;
    return settings;
};

// Az azonosítók a JSON-ban lehetnek számok vagy szövegek is, ezért mindig szövegként hasonlítunk
const sameId = (a, b) => a != null && b != null && String(a) === String(b);

const newItemId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

// A listaelem csak az énekszámot tárolja, a címet/szöveget mindig a friss enek.json-ból vesszük.
// A régi formátumú elemeket ({ hymn: {...} }) is átalakítja.
const normalizePlaylists = (raw) => (Array.isArray(raw) ? raw : [])
    .filter(pl => pl && pl.id != null)
    .map(pl => ({
        ...pl,
        name: pl.name || 'Névtelen lista',
        items: (Array.isArray(pl.items) ? pl.items : [])
            .map(item => ({
                id: item.id || newItemId(),
                hymnNumber: String(item.hymnNumber ?? item.hymn?.number ?? ''),
                variationId: item.variationId ?? null,
                preludeId: item.preludeId ?? null,
                verses: Array.isArray(item.verses) ? item.verses : []
            }))
            .filter(item => item.hymnNumber)
    }));

// Kottakönyv állapota: a felhasználó beállítása, ennek hiányában a JSON "active" mezője
const isBookActive = (book, bookActive) => {
    const key = String(book.id);
    return Object.prototype.hasOwnProperty.call(bookActive, key) ? bookActive[key] : book.active !== false;
};

// --- KOTTAKÖNYVEK ---
// A könyvek listája (data/kottakonyvek.json) csak a mappákat sorolja fel, pl.
//   [{ "folder": "enekeskonyv2021", "builtin": true }, { "folder": "genfi" }]
// Minden könyv a saját mappájában van: data/<mappa>/index.json (a könyv adatai és kottái), mellette a kottafájlok.
// A beépített könyv mindig elérhető (és magától mentődik a készülékre); a többit a Kottakönyvek oldalon lehet
// letölteni, és csak a letöltött könyvek kottái jelennek meg.
const CATALOG_URL = 'data/kottakonyvek.json';
const bookIndexUrl = (folder) => `data/${folder}/index.json`;

const normalizeCatalog = (data) => {
    const seen = new Set();
    return (Array.isArray(data) ? data : [])
        .map(entry => typeof entry === 'string' ? { folder: entry } : entry)
        .filter(entry => {
            const folder = entry && entry.folder;
            const valid = typeof folder === 'string' && folder !== '' && folder !== '.' && folder !== '..' && !/[\/\\]/.test(folder);
            if (!valid) console.warn('Hibás bejegyzés a kottakonyvek.json-ban:', entry);
            if (!valid || seen.has(folder)) return false;
            seen.add(folder);
            return true;
        })
        .map(entry => ({ folder: entry.folder, builtin: entry.builtin === true }));
};

// Egy könyv index.json-ja: { id, title, author, description, copyright, scores: [...], preludes: [...] }
const normalizeBook = (data, folder) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('az index.json nem egy kottakönyv leírása');
    return {
        ...data,
        id: String(data.id ?? folder),
        folder,
        scores: Array.isArray(data.scores) ? data.scores : [],
        preludes: Array.isArray(data.preludes) ? data.preludes : []
    };
};

// A kottafájl útvonala a könyv mappájához képest értendő ("165fm-3k-2017.svg", "../genfi/001-bm-3k-2010.mxl").
// A régi, az oldal gyökeréhez képest megadott alak ("/data/genfi/…", "./data/genfi/…") és a teljes cím (https://…)
// is használható. (Perjellel kezdődő útvonal alútvonalon, pl. …github.io/orgonatar/, a webhely gyökerére mutatna.)
const resolveBookUrl = (url, folder) => {
    if (typeof url !== 'string' || !url) return url;
    if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(url)) return url;
    const rooted = url.replace(/^\.?\//, '');
    if (rooted.startsWith('data/')) return rooted;
    const parts = ['data', folder];
    for (const segment of url.split('/')) {
        if (segment === '..') parts.pop();
        else if (segment && segment !== '.') parts.push(segment);
    }
    return parts.join('/');
};

// A könyv összes kottafájlja (ezeket kell letölteni)
const bookFiles = (book) => {
    const urls = new Set();
    const add = (item) => { if (item && item.xmlUrl) urls.add(resolveBookUrl(item.xmlUrl, book.folder)); };
    book.scores.forEach(score => { add(score); if (Array.isArray(score.preludes)) score.preludes.forEach(add); });
    book.preludes.forEach(add);
    return [...urls];
};

// Két index.json tartalma ugyanaz-e (a szóközök, sortörések nem számítanak)
const sameBookText = (a, b) => {
    try { return JSON.stringify(JSON.parse(a)) === JSON.stringify(JSON.parse(b)); } catch (e) { return a === b; }
};

// --- LETÖLTÖTT KOTTAKÖNYVEK (a böngésző Cache Storage tárolójában) ---
// Minden letöltés külön tárba kerül ("orgonatar-konyv:<mappa>:<időbélyeg>"); utolsóként a letöltés adatlapja.
// Ha az adatlap hiányzik, a letöltés félbemaradt, és a tárat töröljük. Így egy megszakadt frissítés sem rontja
// el a korábban letöltött könyvet. A tárból a service worker (sw.js) szolgálja ki a kottákat internet nélkül is.
const BOOK_CACHE_PREFIX = 'orgonatar-konyv:';
const DOWNLOAD_HEADER = 'X-Letoltes';   // az ilyen kérést a service worker mindig a hálózatra engedi
const DOWNLOAD_CONCURRENCY = 4;
const REMOTE_TIMEOUT = 10000;           // ms; rossz hálózaton se várjunk a végtelenségig
const NO_CONNECTION = 'nincs internetkapcsolat';
const OFFLINE_SUPPORTED = typeof window.caches !== 'undefined' && window.isSecureContext === true;
const downloadInfoUrl = (folder) => `data/${folder}/.letoltes.json`;
const bookCachePrefix = (folder) => `${BOOK_CACHE_PREFIX}${folder}:`;

const isSameOrigin = (url) => { try { return new URL(url, location.href).origin === location.origin; } catch (e) { return false; } };

// Csak a tároláshoz szükséges fejlécek (a tömörítés fejléceit nem visszük át a már kicsomagolt tartalomhoz)
const keepHeaders = (headers) => {
    const kept = new Headers();
    ['Content-Type', 'ETag', 'Last-Modified'].forEach(name => { const value = headers.get(name); if (value) kept.set(name, value); });
    return kept;
};

// Hálózati kérés időkorláttal, a service worker megkerülésével (a friss, szerveren lévő változat kell)
const fetchFromServer = (url, options = {}) => {
    const controller = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; controller.abort(); }, REMOTE_TIMEOUT);
    if (options.signal) options.signal.addEventListener('abort', () => controller.abort());
    const headers = isSameOrigin(url) ? { [DOWNLOAD_HEADER]: '1', ...(options.headers || {}) } : (options.headers || {});
    return fetch(url, { ...options, headers, signal: controller.signal })
        .catch(err => { throw timedOut ? new Error('a szerver nem válaszolt időben') : err; })
        .finally(() => clearTimeout(timer));
};

// A könyv szerveren lévő változata: { text, index }
const fetchRemoteBook = async (folder) => {
    const res = await fetchFromServer(bookIndexUrl(folder), { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status === 404 ? 'az index.json nem található' : `HTTP ${res.status}`);
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch (err) { throw new Error(`hibás index.json (${err.message})`); }
    return { text, index: normalizeBook(data, folder) };
};

// A készülékre letöltött könyvek: { [mappa]: { cacheName, text, index, date, files, bytes, missing } }
const readDownloadedBooks = async () => {
    if (!OFFLINE_SUPPORTED) return {};
    const result = {};
    for (const name of await caches.keys()) {
        if (!name.startsWith(BOOK_CACHE_PREFIX)) continue;
        const rest = name.slice(BOOK_CACHE_PREFIX.length);
        const folder = rest.slice(0, rest.lastIndexOf(':'));
        try {
            const cache = await caches.open(name);
            const infoRes = await cache.match(downloadInfoUrl(folder));
            const indexRes = infoRes && await cache.match(bookIndexUrl(folder));
            if (!infoRes || !indexRes) throw new Error('félbemaradt letöltés');
            const info = await infoRes.json();
            const text = await indexRes.text();
            const book = { cacheName: name, text, index: normalizeBook(JSON.parse(text), folder), ...info };
            const previous = result[folder];
            if (previous && previous.cacheName > name) { await caches.delete(name); continue; } // régebbi letöltés
            if (previous) await caches.delete(previous.cacheName);
            result[folder] = book;
        } catch (err) {
            await caches.delete(name);
        }
    }
    return result;
};

// Feldolgozás néhány párhuzamos szálon. A megszakítás (signal) vagy az első hiba mindegyik szálat leállítja;
// a feldolgozó a közös leállító jelet kapja.
const runPool = async (items, worker, signal) => {
    const stop = new AbortController();
    if (signal) {
        if (signal.aborted) stop.abort();
        signal.addEventListener('abort', () => stop.abort());
    }
    const queue = items.slice();
    await Promise.all(Array.from({ length: Math.min(DOWNLOAD_CONCURRENCY, queue.length) }, async () => {
        try {
            while (queue.length) {
                if (stop.signal.aborted) throw new DOMException('A letöltés megszakítva', 'AbortError');
                await worker(queue.shift(), stop.signal);
            }
        } catch (err) {
            stop.abort();
            throw err;
        }
    }));
};

// Egy kottafájl letöltése a tárba. old: a korábbi letöltés példánya; ha van, feltételes kéréssel ellenőrizzük
// (304 = változatlan, átvesszük). Eredmény: a tárolt bájtok száma, vagy null, ha a fájl nincs a szerveren.
const fetchIntoCache = async (cache, url, old, signal) => {
    const headers = {};
    if (old && old.headers.get('ETag')) headers['If-None-Match'] = old.headers.get('ETag');
    if (old && old.headers.get('Last-Modified')) headers['If-Modified-Since'] = old.headers.get('Last-Modified');
    let res;
    try {
        res = await fetchFromServer(url, { cache: 'no-store', headers, signal });
    } catch (err) {
        if (signal.aborted || isSameOrigin(url)) throw err;
        return null; // más webhely fájlja, amelyet a böngésző nem enged elmenteni
    }
    const source = res.status === 304 && old ? old : res.ok ? res : null;
    if (!source) {
        if (res.status === 404 || res.status === 410) return null;
        throw new Error(`${url}: HTTP ${res.status}`);
    }
    const blob = await source.blob();
    await cache.put(url, new Response(blob, { headers: keepHeaders(source.headers) }));
    return blob.size;
};

// Könyv letöltése vagy frissítése új tárba. Frissítéskor a korábbi letöltés változatlan fájljait átvesszük, így csak
// az új és a megváltozott kották jönnek le. A szerveren hiányzó fájlokat kihagyjuk (a letöltés adatlapja
// felsorolja őket); hálózati hibánál a letöltés megszakad.
const downloadBook = async ({ folder, remote, previous, onProgress, signal }) => {
    const cacheName = `${bookCachePrefix(folder)}${Date.now()}`;
    const cache = await caches.open(cacheName);
    const oldCache = previous ? await caches.open(previous.cacheName) : null;
    const files = bookFiles(remote.index);
    const missing = [];
    let done = 0, bytes = 0;
    try {
        await runPool(files, async (url, stop) => {
            const size = await fetchIntoCache(cache, url, oldCache && await oldCache.match(url), stop);
            if (size === null) missing.push(url); else bytes += size;
            onProgress(++done, files.length);
        }, signal);
        const info = { date: new Date().toISOString(), files: files.length, bytes, missing };
        await cache.put(bookIndexUrl(folder), new Response(remote.text, { headers: { 'Content-Type': 'application/json' } }));
        await cache.put(downloadInfoUrl(folder), new Response(JSON.stringify(info), { headers: { 'Content-Type': 'application/json' } }));
        for (const name of await caches.keys()) if (name.startsWith(bookCachePrefix(folder)) && name !== cacheName) await caches.delete(name);
        return { cacheName, text: remote.text, index: remote.index, ...info };
    } catch (err) {
        await caches.delete(cacheName);
        throw err;
    }
};

// A letöltéskor hiányzó fájlok pótlása, ha azóta felkerültek a szerverre (csak ezeket kérjük le újra)
const retryMissingFiles = async ({ folder, local, signal }) => {
    const cache = await caches.open(local.cacheName);
    const missing = [];
    let bytes = local.bytes, added = 0;
    await runPool(local.missing, async (url, stop) => {
        const size = await fetchIntoCache(cache, url, null, stop);
        if (size === null) missing.push(url); else { bytes += size; added++; }
    }, signal);
    if (!added) return local;
    const info = { date: new Date().toISOString(), files: local.files, bytes, missing };
    await cache.put(downloadInfoUrl(folder), new Response(JSON.stringify(info), { headers: { 'Content-Type': 'application/json' } }));
    return { ...local, ...info };
};

const deleteDownloadedBook = async (folder) => {
    for (const name of await caches.keys()) if (name.startsWith(bookCachePrefix(folder))) await caches.delete(name);
};

const formatBytes = (bytes) => bytes >= 1048576
    ? `${(bytes / 1048576).toLocaleString('hu-HU', { maximumFractionDigits: 1 })} MB`
    : `${bytes > 0 ? Math.max(1, Math.round(bytes / 1024)) : 0} kB`;

// A kotta lehet MusicXML (.xml, .musicxml, .mxl) vagy MEI (.mei), ezeket a Verovio rajzolja; vagy kép (szkennelt/exportált kotta)
const IMAGE_FILE = /\.(png|jpe?g|gif|webp|svg)([?#].*)?$/i;
const isImageUrl = (url) => IMAGE_FILE.test(url || '');

// --- TELJES KÉPERNYŐ ---
// iPhone-on nincs Fullscreen API (ott a hívás hibát dobott), régebbi iPadeken csak webkit előtaggal
const FULLSCREEN_SUPPORTED = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
const isFullscreen = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
const toggleFullScreen = () => {
    const el = document.documentElement;
    try {
        const action = isFullscreen()
            ? (document.exitFullscreen || document.webkitExitFullscreen).call(document)
            : (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
        Promise.resolve(action).catch(err => console.error(err));
    } catch (err) {
        console.error(err);
    }
};

// --- KERESÉS ---
// Kisbetűs, ékezet nélküli alak az összehasonlításhoz ("eros var" = "Erős vár")
const normalizeText = (text) => String(text ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Az ének kulcsszavai (enek.json: "keywords"), pl. ["karácsony", "dicséret"]
const hymnKeywords = (hymn) => Array.isArray(hymn.keywords)
    ? hymn.keywords.filter(k => typeof k === 'string' && k.trim()).map(k => k.trim())
    : [];

// Az ékezet nélküli címet, kulcsszavakat és szöveget egyszer számoljuk ki, nem minden billentyűleütésnél
const buildSearchIndex = (hymns) => hymns.map(h => ({
    hymn: h,
    number: String(h.number),
    title: normalizeText(h.title),
    keywords: normalizeText(hymnKeywords(h).join(' | ')),
    lyrics: normalizeText((h.verses || []).map(v => v.join(' ')).join(' '))
}));

// Csak számjegyek: az énekszám elejére keres (a pontos egyezés kerül előre), a szövegben nem.
// Egyébként ékezet nélkül keres a számban, a címben, a kulcsszavakban és a szövegben; a címbeli találatok kerülnek előre.
const searchHymns = (index, query) => {
    const q = query.trim();
    if (!q) return index.map(e => e.hymn);
    if (/^\d+$/.test(q)) {
        return index
            .filter(e => e.number.startsWith(q))
            .sort((a, b) => (b.number === q) - (a.number === q))
            .map(e => e.hymn);
    }
    const nq = normalizeText(q);
    return index
        .filter(e => normalizeText(e.number).startsWith(nq) || e.title.includes(nq) || e.keywords.includes(nq) || e.lyrics.includes(nq))
        .sort((a, b) => b.title.includes(nq) - a.title.includes(nq))
        .map(e => e.hymn);
};

// --- KOMPONENSEK ---

const NavigationSidebar = ({ activeTab, onTabChange, menuSide, toggleFullScreen }) => (
    <div className={`sidebar ${menuSide}`}>
        <div className="sidebar-group">
            <button onClick={() => onTabChange('library')} className={`nav-btn ${activeTab === 'library' ? 'active' : ''}`} title="Könyvtár"><Icons.ListMusic size={26} /></button>
            <button onClick={() => onTabChange('playlists')} className={`nav-btn ${activeTab === 'playlists' || activeTab === 'playlist_editor' ? 'active' : ''}`} title="Listák"><Icons.ListOrdered size={26} /></button>
            <button onClick={() => onTabChange('scorebooks')} className={`nav-btn ${activeTab === 'scorebooks' ? 'active' : ''}`} title="Kottakönyvek"><Icons.Book size={26} /></button>

        </div>
        <div className="sidebar-group">
            {toggleFullScreen && <button onClick={toggleFullScreen} className="nav-btn" title="Teljes képernyő"><Icons.Maximize size={24} /></button>}
            <button onClick={() => onTabChange('settings')} className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`} title="Beállítások"><Icons.Settings size={24} /></button>
            <button onClick={() => onTabChange('about')} className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`} title="Névjegy"><Icons.Info size={24} /></button>
        </div>
    </div>
);

const Modal = ({ title, onClose, children, footer, maxWidth }) => (
    <div className="modal-overlay">
        <div className="modal-box" style={{maxWidth: maxWidth || '500px'}}>
            <div className="modal-header" style={{padding: '0.75rem 1rem'}}>
                <h3 className="text-lg font-bold text-galaxy">{title}</h3>
                <button onClick={onClose}><Icons.X size={20} className="text-gray-500 hover:text-black"/></button>
            </div>
            <div className="modal-body" style={{padding:'1rem'}}>{children}</div>
            {footer && <div className="modal-footer" style={{padding:'0.75rem 1rem'}}>{footer}</div>}
        </div>
    </div>
);

const AlertModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
    return (
        <Modal title="Figyelmeztetés" onClose={onClose} footer={<button onClick={onClose} className="btn btn-primary">Rendben</button>}>
            <p className="text-ink text-center">{message}</p>
        </Modal>
    );
};

const FullscreenModal = ({ isOpen, onClose, onConfirm }) => {
    const [dontAsk, setDontAsk] = useState(false);
    if (!isOpen) return null;
    return (
        <Modal title="Teljes képernyő" onClose={() => onClose(dontAsk)} footer={
            <>
                <button onClick={() => onClose(dontAsk)} className="btn">Mégse</button>
                <button onClick={() => onConfirm(dontAsk)} className="btn btn-primary">Teljes képernyő</button>
            </>
        }>
            <p className="text-ink">A jobb élmény érdekében javasoljuk a teljes képernyős mód használatát.</p>
            <label className="text-sm text-gray-500" style={{display:'flex', alignItems:'center', gap:'0.5rem', marginTop:'0.75rem', cursor:'pointer'}}>
                <input type="checkbox" checked={dontAsk} onChange={e => setDontAsk(e.target.checked)} />
                Ne kérdezze újra
            </label>
        </Modal>
    );
};

// Érintőképernyős eszköz (tablet, telefon): itt nem adunk automatikusan fókuszt a keresőmezőnek, mert a képernyő-
// billentyűzet (fekvő tableten) a fél képernyőt eltakarná; számot a nagygombos számbillentyűzettel lehet beírni.
const TOUCH_DEVICE = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
const KEYPAD_MAX_DIGITS = 4;

// Énekválasztó: bal oldalon kereső és találati lista, jobb oldalon nagygombos számbillentyűzet. A billentyűzet a
// keresőbe ír, de nem adja rá a fókuszt. Fizikai billentyűzeten is működik: számok, Backspace, Enter, Escape.
const HymnSelectorModal = ({ isOpen, onClose, onSelect, hymnBook, title = 'Ének választása', action = 'kiválasztása', ItemIcon = Icons.Plus }) => {
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);
    const latestRef = useRef({});
    useEffect(() => {
        if (!isOpen) return;
        setSearch('');
        if (!TOUCH_DEVICE) setTimeout(() => inputRef.current?.focus(), 100);
    }, [isOpen]);
    const searchIndex = useMemo(() => buildSearchIndex(hymnBook || []), [hymnBook]);
    const filtered = useMemo(() => searchHymns(searchIndex, search), [searchIndex, search]);
    const number = /^\d+$/.test(search.trim()) ? search.trim() : '';
    const exact = number ? filtered.find(h => String(h.number) === number) || null : null;

    // Számjegy a billentyűzetről: ha a keresőben szöveg volt, új számot kezd
    const pressDigit = (digit) => setSearch(s => {
        const current = /^\d+$/.test(s.trim()) ? s.trim() : '';
        return current.length >= KEYPAD_MAX_DIGITS ? current : current + digit;
    });
    const backspace = () => setSearch(s => s.slice(0, -1));
    // Enter: pontos számegyezés, ennek hiányában az első találat
    const confirm = () => {
        const { exact, filtered } = latestRef.current;
        const hymn = exact || (filtered && filtered[0]);
        if (hymn) onSelect(hymn);
    };
    latestRef.current = { exact, filtered, onClose, pressDigit, backspace, confirm };

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            const actions = latestRef.current;
            if (e.key === 'Escape') { e.preventDefault(); actions.onClose(); return; }
            if (e.target === inputRef.current || e.altKey || e.ctrlKey || e.metaKey) return; // a keresőmezőben a böngésző kezeli
            if (/^\d$/.test(e.key)) { e.preventDefault(); actions.pressDigit(e.key); }
            else if (e.key === 'Backspace') { e.preventDefault(); actions.backspace(); }
            else if (e.key === 'Enter' && !(e.target.closest && e.target.closest('button'))) { e.preventDefault(); actions.confirm(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    if (!isOpen) return null;
    // a billentyűzet gombjai ne vegyék el a fókuszt (így a képernyő-billentyűzet sem ugrik fel, és az Enter sem nyom rájuk)
    const keepFocus = (e) => e.preventDefault();

    return (
        <Modal title={title} onClose={onClose} footer={null} maxWidth="820px">
            <div className="hymn-picker">
                <div className="hymn-picker-search">
                    <div className="hymn-selector-search">
                        <Icons.Search className="search-icon" size={18}/>
                        <input ref={inputRef} type="text" className="input search" placeholder="Keresés számra, címre vagy szövegre..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') confirm(); }} />
                    </div>
                    <div className="hymn-picker-results">
                        <div className="hymn-selector-list">
                            {filtered.map(h => (
                                <button key={h.number} onClick={() => onSelect(h)} className="hymn-selector-item">
                                    <div><span className="hymn-selector-item-hymn-number hymn-number">{h.number}</span><span className="hymn-selector-item-hymn-title">{h.title}</span></div>
                                    <ItemIcon size={18} className="icon-plus"/>
                                </button>
                            ))}
                            {filtered.length === 0 && <div className="hymn-selector-empty">Nincs találat</div>}
                        </div>
                    </div>
                </div>

                <div className="hymn-keypad">
                    <div className="hymn-keypad-label">Énekszám</div>
                    <div className="hymn-keypad-display hymn-number">{number || ' '}</div>
                    <div className={`hymn-keypad-hint ${number && !exact ? 'not-found' : ''}`}>
                        {exact ? exact.title : number ? 'Nincs ilyen számú ének' : ' '}
                    </div>
                    <div className="hymn-keypad-grid">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
                            <button key={d} onMouseDown={keepFocus} onClick={() => pressDigit(d)}>{d}</button>
                        ))}
                        <button className="hymn-keypad-clear" onMouseDown={keepFocus} onClick={() => setSearch('')}>Törlés</button>
                        <button onMouseDown={keepFocus} onClick={() => pressDigit('0')}>0</button>
                        <button onMouseDown={keepFocus} onClick={backspace} title="Utolsó számjegy törlése" aria-label="Utolsó számjegy törlése"><Icons.Backspace size={24}/></button>
                    </div>
                    <button className="btn btn-primary hymn-keypad-open" onMouseDown={keepFocus} onClick={() => exact && onSelect(exact)} disabled={!exact}>
                        {exact ? `${exact.number}. ének ${action}` : 'Írd be az énekszámot'} <Icons.ChevronRight size={18}/>
                    </button>
                </div>
            </div>
        </Modal>
    );
};

// Listanév mező, előtte dátumválasztó gombbal: a választott nap (ÉÉÉÉ-HH-NN, pl. a szertartás napja) a név elejére
// kerül (a név elején álló korábbi dátumot lecseréli), a név többi része megmarad, és utána tovább lehet írni.
const ListNameInput = ({ value, onChange, onEnter, inputRef, placeholder, style }) => {
    const dateRef = useRef(null);
    const ownRef = useRef(null);
    const textRef = inputRef || ownRef;
    const openPicker = () => {
        const picker = dateRef.current;
        try { picker.showPicker(); } catch (e) { picker.focus(); picker.click(); } // régebbi böngészők
    };
    const pickDate = (e) => {
        const date = e.target.value;
        e.target.value = ''; // így ugyanazt a napot újra választva is beíródik
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
        const rest = value.replace(/^\s*\d{4}-\d{2}-\d{2}\s*/, '');
        const next = `${date} ${rest}`;
        onChange(next);
        requestAnimationFrame(() => { const t = textRef.current; if (t) { t.focus(); t.setSelectionRange(next.length, next.length); } });
    };
    return (
        <div className="list-name-field" style={style}>
            <button type="button" className="list-name-date" onClick={openPicker} title="Dátum a név elejére (pl. a szertartás napja)" aria-label="Dátum választása">
                <Icons.Calendar size={20}/>
            </button>
            <input ref={dateRef} type="date" className="list-name-date-input" tabIndex={-1} aria-hidden="true" onChange={pickDate} />
            <input ref={textRef} type="text" className="input" placeholder={placeholder} value={value}
                onChange={e => onChange(e.target.value)} onKeyDown={e => e.key === 'Enter' && onEnter && onEnter()} />
        </div>
    );
};

const CreatePlaylistModal = ({ isOpen, onClose, onConfirm }) => {
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    useEffect(() => { if(isOpen) { setName(''); setTimeout(() => inputRef.current?.focus(), 100); } }, [isOpen]);
    if (!isOpen) return null;
    const confirm = () => { if (name.trim()) onConfirm(name.trim()); };

    return (
        <Modal title="Új lista létrehozása" onClose={onClose} footer={
            <>
                <button onClick={onClose} className="btn">Mégse</button>
                <button onClick={confirm} disabled={!name.trim()} className="btn btn-primary">Létrehozás</button>
            </>
        }>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Lista neve</label>
                <ListNameInput inputRef={inputRef} placeholder="pl. 2026-10-04 Vasárnapi istentisztelet" value={name} onChange={setName} onEnter={confirm} />
            </div>
        </Modal>
    );
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if(!isOpen) return null;
    return (
        <Modal title={title || "Törlés"} onClose={onClose} footer={
            <>
                <button onClick={onClose} className="btn">Mégse</button>
                <button onClick={onConfirm} className="btn btn-danger-solid">Törlés</button>
            </>
        }>
            <p className="text-ink">{message}</p>
        </Modal>
    );
};

const CustomSelect = ({ items, currentId, onChange, labelKey = "name", subLabelKey = "composer", placeholder = "Nincs kiválasztva", emptyText = "Nincs adat", width="180px" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [alignRight, setAlignRight] = useState(false);
    const dropdownRef = useRef(null);
    const currentItem = items && items.find(v => v.id === currentId);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { setIsOpen(false); }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isEmpty = !items || items.length === 0;

    const toggleOpen = () => {
        if (isEmpty) return;
        if (!isOpen && dropdownRef.current) {
            // A menü jobbra nyílik; ha ott nem férne el (pl. telefonon), a gomb jobb széléhez igazítjuk
            const rect = dropdownRef.current.getBoundingClientRect();
            setAlignRight(rect.left + Math.max(rect.width, 240) > window.innerWidth - 8);
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="custom-select" ref={dropdownRef} style={{'--select-min-width': width}}>
            <button onClick={toggleOpen} className={`input custom-select-btn ${isEmpty ? 'empty' : ''}`}>
                <span className="truncate">{isEmpty ? emptyText : (currentItem ? currentItem[labelKey] : placeholder)}</span>
                <Icons.ChevronDown size={16} style={{opacity:0.5, flexShrink:0}}/>
            </button>
            
            {isOpen && !isEmpty && (
                <div className="custom-select-menu" style={alignRight ? {right:0} : {left:0}}>
                    <div onClick={() => { onChange(null); setIsOpen(false); }} className="custom-select-option placeholder hover:bg-gray-100">
                        {placeholder}
                    </div>
                    {items.map(v => (
                        <div key={v.id} onClick={() => { onChange(v.id); setIsOpen(false); }} className={`custom-select-option hover:bg-gray-100 ${currentId === v.id ? 'selected' : ''}`}>
                            <div className="custom-select-option-label">{v[labelKey]}</div>
                            <div className="custom-select-option-sub">{v[subLabelKey]}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const NEW_PLAYLIST = '__new__';

// Csak nyitott állapotban csatoljuk, ezért a kezdőértékeket egyszer, a megnyitáskor számoljuk ki
const AddToPlaylistModal = ({ onClose, onConfirm, playlists, initialVariationId, initialPreludeId, hymn, variations, preludes, lockPlaylistId }) => {
    const parsedVerses = useMemo(() => verseList(hymn), [hymn]);
    const [targetId, setTargetId] = useState(() => lockPlaylistId ?? (playlists.length > 0 ? playlists[0].id : NEW_PLAYLIST));
    const [newName, setNewName] = useState('');
    const [selectedVariationId, setSelectedVariationId] = useState(() => variations.some(v => v.id === initialVariationId) ? initialVariationId : (variations.length > 0 ? variations[0].id : null));
    const [selectedPreludeId, setSelectedPreludeId] = useState(() => preludes.some(p => p.id === initialPreludeId) ? initialPreludeId : null);
    const [selectedVerses, setSelectedVerses] = useState(() => parsedVerses.map(v => v.index));
    const newNameRef = useRef(null);

    const isNewList = targetId === NEW_PLAYLIST;
    const canSave = isNewList ? newName.trim().length > 0 : targetId != null;

    // Ha még nincs lista, vagy az "Új lista" opciót választották, a névmező kapja a fókuszt
    useEffect(() => { if (isNewList && newNameRef.current) newNameRef.current.focus(); }, [isNewList]);

    const toggleVerse = (index) => { if (selectedVerses.includes(index)) setSelectedVerses(selectedVerses.filter(i => i !== index)); else setSelectedVerses([...selectedVerses, index].sort((a, b) => a - b)); };
    const handleConfirm = () => {
        if (!canSave) return;
        onConfirm({
            playlistId: isNewList ? null : targetId,
            newPlaylistName: isNewList ? newName.trim() : null,
            variationId: selectedVariationId,
            preludeId: selectedPreludeId,
            verses: selectedVerses
        });
    };
    const handleTargetChange = (value) => {
        if (value === NEW_PLAYLIST) { setTargetId(NEW_PLAYLIST); return; }
        const pl = playlists.find(p => String(p.id) === value);
        setTargetId(pl ? pl.id : null);
    };

    return (
        <Modal title="Hozzáadás" onClose={onClose} maxWidth="600px" footer={
            <>
                <button onClick={onClose} className="btn">Mégse</button>
                <button onClick={handleConfirm} disabled={!canSave} className="btn btn-primary">Mentés</button>
            </>
        }>
            <div className="text-center pb-2 border-b border-gray-200 mb-4">
                <div className="hymn-number text-accent text-2xl">{hymn.number}</div>
                <div className="font-bold text-galaxy">{hymn.title}</div>
            </div>
            
            <div className="flex flex-col gap-4">
                {lockPlaylistId == null && (
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cél lista</label>
                        {playlists.length > 0 && (
                            <select className="input" value={isNewList ? NEW_PLAYLIST : String(targetId)} onChange={(e) => handleTargetChange(e.target.value)}>
                                {playlists.map(pl => <option key={pl.id} value={String(pl.id)}>{pl.name}</option>)}
                                <option value={NEW_PLAYLIST}>+ Új lista…</option>
                            </select>
                        )}
                        {isNewList && (
                            <ListNameInput inputRef={newNameRef} style={playlists.length > 0 ? {marginTop:'0.5rem'} : undefined}
                                placeholder="Új lista neve, pl. 2026-10-04 Vasárnapi istentisztelet" value={newName}
                                onChange={setNewName} onEnter={handleConfirm} />
                        )}
                    </div>
                )}
                
                <div style={{display:'flex', gap:'1rem'}}>
                    <div style={{flex:1, minWidth:0}}>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Előjáték</label>
                        <CustomSelect items={preludes} currentId={selectedPreludeId} onChange={setSelectedPreludeId} placeholder="Nincs kiválasztva" emptyText="Nincs előjáték" width="100%" />
                    </div>
                    <div style={{flex:1, minWidth:0}}>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Változat</label>
                        <CustomSelect items={variations} currentId={selectedVariationId} onChange={setSelectedVariationId} placeholder="Változat választása" width="100%" />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-end mb-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase">Versszakok</label>
                        <button onClick={() => setSelectedVerses(selectedVerses.length === parsedVerses.length ? [] : parsedVerses.map(v => v.index))} className="text-xs text-accent hover:underline">
                            {selectedVerses.length === parsedVerses.length ? "Egyik sem" : "Mind"}
                        </button>
                    </div>
                    <div style={{maxHeight:'150px', overflowY:'auto', border:'1px solid var(--col-border, #ddd)', borderRadius:'4px'}}>
                        {parsedVerses.map(verse => (
                            <div key={verse.index} onClick={() => toggleVerse(verse.index)} className={`verse-item ${selectedVerses.includes(verse.index) ? 'selected' : ''}`}>
                                <div className="text-accent">{selectedVerses.includes(verse.index) ? <Icons.CheckSquare size={20} /> : <Icons.Square size={20} />}</div>
                                <div className="verse-item-text"><div className="font-bold text-galaxy text-sm">{verse.label}</div><div className="verse-item-preview text-xs text-gray-500">{verse.lines.slice(0, 2).join(' / ')}</div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

// A beállítások oldal egy szakasza (cím + kártyák)
const SettingsSection = ({ title, children }) => (
    <section className="settings-section">
        <h2 className="settings-section-title">{title}</h2>
        {children}
    </section>
);

// Mintakotta a kottafont kiválasztásához: két ütem, négy szólam (G-dúr, plagális zárlat)
const FONT_SAMPLE_MEI = `<?xml version="1.0" encoding="UTF-8"?>
<mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.1">
<meiHead><fileDesc><titleStmt><title>Minta</title></titleStmt><pubStmt/></fileDesc></meiHead>
<music><body><mdiv><score>
<scoreDef keysig="1s" meter.count="4" meter.unit="4"><staffGrp symbol="brace" bar.thru="true">
<staffDef n="1" lines="5" clef.shape="G" clef.line="2"/><staffDef n="2" lines="5" clef.shape="F" clef.line="4"/>
</staffGrp></scoreDef>
<section>
<measure n="1">
<staff n="1"><layer n="1"><note pname="b" oct="4" dur="4" stem.dir="up"/><beam><note pname="c" oct="5" dur="8" stem.dir="up"/><note pname="b" oct="4" dur="8" stem.dir="up"/></beam><note pname="a" oct="4" dur="4" stem.dir="up"/><note pname="g" oct="4" dur="4" stem.dir="up"/></layer>
<layer n="2"><note pname="g" oct="4" dur="4" stem.dir="down"/><note pname="g" oct="4" dur="4" stem.dir="down"/><note pname="f" oct="4" accid.ges="s" dur="4" stem.dir="down"/><note pname="g" oct="4" dur="4" stem.dir="down"/></layer></staff>
<staff n="2"><layer n="1"><note pname="d" oct="4" dur="4" stem.dir="up"/><note pname="e" oct="4" dur="4" stem.dir="up"/><note pname="d" oct="4" dur="4" stem.dir="up"/><note pname="b" oct="3" dur="4" stem.dir="up"/></layer>
<layer n="2"><note pname="g" oct="2" dur="4" stem.dir="down"/><note pname="c" oct="3" dur="4" stem.dir="down"/><note pname="d" oct="3" dur="4" stem.dir="down"/><note pname="g" oct="2" dur="4" stem.dir="down"/></layer></staff>
</measure>
<measure n="2" right="end">
<staff n="1"><layer n="1"><note xml:id="s1" pname="g" oct="4" dur="2" stem.dir="up"/><note xml:id="s2" pname="g" oct="4" dur="2" stem.dir="up"/></layer>
<layer n="2"><note pname="e" oct="4" dur="2" stem.dir="down"/><note pname="d" oct="4" dur="2" stem.dir="down"/></layer></staff>
<staff n="2"><layer n="1"><note pname="c" oct="4" dur="2" stem.dir="up"/><note pname="b" oct="3" dur="2" stem.dir="up"/></layer>
<layer n="2"><note pname="c" oct="3" dur="2" stem.dir="down"/><note xml:id="b2" pname="g" oct="2" dur="2" stem.dir="down"/></layer></staff>
<tie startid="#s1" endid="#s2"/><fermata staff="1" startid="#s2" place="above"/><fermata staff="2" startid="#b2" place="below"/>
</measure>
</section></score></mdiv></body></music></mei>`;

const fontSamples = new Map(); // kottafont → a mintakotta SVG-je (egyszer rajzoljuk ki)
const renderFontSample = (vrv, font) => {
    if (!fontSamples.has(font)) {
        const tk = new vrv.toolkit();
        try {
            tk.setOptions({ ...VEROVIO_OPTIONS, breaks: 'none', adjustPageWidth: true, font });
            tk.loadData(FONT_SAMPLE_MEI);
            fontSamples.set(font, tk.renderToSVG(1));
        } finally {
            tk.destroy();
        }
    }
    return fontSamples.get(font);
};

const FontSample = ({ font }) => {
    const ref = useRef(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        let active = true;
        loadVerovio()
            .then(vrv => { if (active && ref.current) ref.current.innerHTML = renderFontSample(vrv, font); })
            .catch(err => { console.info(err.message); if (active) setFailed(true); });
        return () => { active = false; };
    }, [font]);
    if (failed) return <div className="font-sample font-sample-missing">A minta most nem jeleníthető meg</div>;
    return <div ref={ref} className="font-sample" aria-hidden="true"></div>;
};

const SettingsView = ({ settings, onUpdateSettings }) => (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
        <div className="header centered">
             <h1 className="header-title main page-title">Beállítások</h1>
        </div>
        
        <div className="main-content" style={{padding:'2rem', overflowY:'auto'}}>
            <div className="settings-page">

                <SettingsSection title="Megjelenés">
                    <div className="card card-row">
                        <div className="card-decoration"></div>
                        <div className="setting-label">
                            <div className="font-bold text-ink">Háttér téma</div>
                            <div className="text-xs text-gray-500">Válassz megjelenítési módot</div>
                        </div>
                        <select className="input" style={{width:'auto', minWidth:'150px'}} value={settings.theme} onChange={(e) => onUpdateSettings({...settings, theme: e.target.value})}>
                            <option value="pergamen">Pergamen</option>
                            <option value="papyrus">Papirusz</option>
                            <option value="dark-papyrus">Sötét papirusz</option>
                            <option value="white">Törtfehér</option>
                        </select>
                    </div>

                    <div className="card card-stack">
                        <div className="card-decoration"></div>
                        <div className="setting-label">
                            <div className="font-bold text-ink">Betűtípus</div>
                            <div className="text-xs text-gray-500">A feliratok és az énekszövegek betűi</div>
                        </div>
                        <div className="font-choices" role="radiogroup" aria-label="Betűtípus">
                            {UI_FONTS.map(font => (
                                <button key={font.id} type="button" role="radio" aria-checked={settings.uiFont === font.id}
                                    className={`font-choice${settings.uiFont === font.id ? ' selected' : ''}`}
                                    onClick={() => onUpdateSettings({...settings, uiFont: font.id})}>
                                    <span className="ui-font-sample" style={{fontFamily: uiFontStack(font.id)}}>
                                        <span className="ui-font-sample-title">42 Mint a szép, híves patakra</span>
                                        <span className="ui-font-sample-text">Aki nem jár hitlenek tanácsán, és meg nem áll a bűnösök útján…</span>
                                    </span>
                                    <span className="font-choice-label">
                                        <span className="font-choice-text">
                                            <span className="font-choice-name">{font.family}</span> <span className="font-choice-hint">{font.hint}</span>
                                        </span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card card-stack">
                        <div className="card-decoration"></div>
                        <div className="setting-label">
                            <div className="font-bold text-ink">Énekszámok és oldalcímek</div>
                            <div className="text-xs text-gray-500">Talpas betű, a régi korálkönyvek mintájára</div>
                        </div>
                        <div className="font-choices" role="radiogroup" aria-label="Énekszámok és oldalcímek betűtípusa">
                            {SERIF_FONTS.map(font => (
                                <button key={font.id} type="button" role="radio" aria-checked={settings.serifFont === font.id}
                                    className={`font-choice${settings.serifFont === font.id ? ' selected' : ''}`}
                                    onClick={() => onUpdateSettings({...settings, serifFont: font.id})}>
                                    <span className="serif-font-sample" style={{fontFamily: serifFontStack(font.id)}}>
                                        <span className="serif-font-sample-number">489</span>
                                        <span className="serif-font-sample-title">Református Kottagyűjtemény</span>
                                    </span>
                                    <span className="font-choice-label">
                                        <span className="font-choice-text">
                                            <span className="font-choice-name">{font.family}</span> <span className="font-choice-hint">{font.hint}</span>
                                        </span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card card-row">
                        <div className="card-decoration"></div>
                        <div className="setting-label">
                             <div className="font-bold text-ink">Oldalmenü helye</div>
                             <div className="text-xs text-gray-500">Bal vagy jobb oldalon legyen a menü</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                             <button onClick={() => onUpdateSettings({...settings, sidebarSide: 'left'})} className={`btn ${settings.sidebarSide === 'left' ? 'btn-primary' : 'btn-ghost'}`}>Bal</button>
                             <button onClick={() => onUpdateSettings({...settings, sidebarSide: 'right'})} className={`btn ${settings.sidebarSide === 'right' ? 'btn-primary' : 'btn-ghost'}`}>Jobb</button>
                        </div>
                    </div>
                </SettingsSection>

                <SettingsSection title="Kottanézet és lejátszó">
                    <div className="card card-row">
                        <div className="card-decoration"></div>
                        <div className="setting-label">
                            <div className="font-bold text-ink">Szövegpanel megjelenítése</div>
                            <div className="text-xs text-gray-500">Kotta mellett a szöveg láthatósága</div>
                        </div>
                        <button onClick={() => onUpdateSettings({...settings, showLyrics: !settings.showLyrics})} className="btn-ghost" style={{color: settings.showLyrics ? 'var(--col-accent-text)' : 'var(--col-ink-muted, #999)'}}>
                            {settings.showLyrics ? <Icons.Eye size={24}/> : <Icons.EyeOff size={24}/>}
                        </button>
                    </div>

                    <div className="card card-row">
                        <div className="card-decoration"></div>
                        <div className="setting-label">
                            <div className="font-bold text-ink">Oldalsáv szélessége</div>
                            <div className="text-xs text-gray-500">Ha oldalt van a szöveg</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                             <button onClick={() => onUpdateSettings({...settings, lyricsWidth: '15%'})} className={`btn ${settings.lyricsWidth === '15%' ? 'btn-primary' : 'btn-ghost'}`}>15%</button>
                             <button onClick={() => onUpdateSettings({...settings, lyricsWidth: '20%'})} className={`btn ${settings.lyricsWidth === '20%' ? 'btn-primary' : 'btn-ghost'}`}>20%</button>
                             <button onClick={() => onUpdateSettings({...settings, lyricsWidth: '25%'})} className={`btn ${settings.lyricsWidth === '25%' ? 'btn-primary' : 'btn-ghost'}`}>25%</button>
                             <button onClick={() => onUpdateSettings({...settings, lyricsWidth: '30%'})} className={`btn ${settings.lyricsWidth === '30%' ? 'btn-primary' : 'btn-ghost'}`}>30%</button>
                        </div>
                    </div>

                    <div className="card card-row">
                        <div className="card-decoration"></div>
                        <div className="setting-label">
                            <div className="font-bold text-ink">Kotta szélessége</div>
                            <div className="text-xs text-gray-500">Maximális szélesség</div>
                        </div>
                        <select className="input" style={{width:'auto', minWidth:'150px'}} value={settings.scoreMaxWidth || '80%'} onChange={(e) => onUpdateSettings({...settings, scoreMaxWidth: e.target.value})}>
                            <option value="100%">100%</option>
                            <option value="90%">90%</option>
                            <option value="80%">80%</option>
                            <option value="70%">70%</option>
                            <option value="60%">60%</option>
                            <option value="50%">50%</option>
                        </select>
                    </div>

                    <div className="card card-row">
                        <div className="card-decoration"></div>
                        <div className="setting-label">
                            <div className="font-bold text-ink">Óra a lejátszóban</div>
                            <div className="text-xs text-gray-500">A lejátszó jobb felső sarkában</div>
                        </div>
                        <button onClick={() => onUpdateSettings({...settings, showClock: !settings.showClock})} className="btn-ghost" title={settings.showClock ? 'Óra elrejtése' : 'Óra megjelenítése'} style={{color: settings.showClock ? 'var(--col-accent-text)' : 'var(--col-ink-muted, #999)'}}>
                            {settings.showClock ? <Icons.Eye size={24}/> : <Icons.EyeOff size={24}/>}
                        </button>
                    </div>
                </SettingsSection>

                {/* A kotta rajzolatának beállításai (Verovio); ide kerülnek a további kottagrafikai beállítások is */}
                <SettingsSection title="Kottagrafika">
                    <div className="card card-stack">
                        <div className="card-decoration"></div>
                        <div className="setting-label">
                            <div className="font-bold text-ink">Kottafont</div>
                            <div className="text-xs text-gray-500">A hangjegyek, kulcsok és jelek rajzolata</div>
                        </div>
                        <div className="font-choices" role="radiogroup" aria-label="Kottafont">
                            {SCORE_FONTS.map(font => (
                                <button key={font.id} type="button" role="radio" aria-checked={settings.scoreFont === font.id}
                                    className={`font-choice${settings.scoreFont === font.id ? ' selected' : ''}`}
                                    onClick={() => onUpdateSettings({...settings, scoreFont: font.id})}>
                                    <FontSample font={font.id} />
                                    <span className="font-choice-label">
                                        <span className="font-choice-text">
                                            <span className="font-choice-name">{font.id}</span> <span className="font-choice-hint">{font.hint}</span>
                                        </span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </SettingsSection>

            </div>
        </div>
    </div>
);

// --- VEROVIO KOTTARAJZOLÓ ---
// A kottákat (MusicXML, MEI) a Verovio rajzolja: libs/verovio/ (LGPL-3.0, lásd az ottani README-t). A motor nagy
// (WebAssembly, tömörítve kb. 2,4 MB), ezért a program indulásakor a háttérben betöltődik.
const VEROVIO_URL = 'libs/verovio/verovio-toolkit-wasm.js';
const VEROVIO_VERSION = '6.3.0'; // a libs/verovio-ban lévő változat (a Névjegy forráskód-linkjéhez)
const VEROVIO_INIT_TIMEOUT = 60000; // ms; ha letöltés után ennyi idő alatt sem indul el (pl. kevés a memória), hibát jelzünk

let verovioPromise = null;
const loadVerovio = () => {
    if (verovioPromise) return verovioPromise;
    const promise = new Promise((resolve, reject) => {
        if (typeof WebAssembly !== 'object') {
            throw new Error('Ez a böngésző nem tudja megjeleníteni a kottákat (nem támogatja a WebAssemblyt).');
        }
        const notStarted = new Error('A kottarajzoló (Verovio) nem indult el. Töltsd újra az oldalt.');
        const script = document.createElement('script');
        script.src = VEROVIO_URL;
        script.onload = () => {
            const vrv = window.verovio;
            if (!vrv || !vrv.module || !vrv.toolkit) { reject(notStarted); return; }
            // A WebAssembly-rész ekkor még fordul: a kész jelzés biztosan csak ezután jön
            const timer = setTimeout(() => reject(notStarted), VEROVIO_INIT_TIMEOUT);
            vrv.module.onRuntimeInitialized = () => { clearTimeout(timer); resolve(vrv); };
        };
        script.onerror = () => {
            script.remove();
            reject(new Error('A kottarajzoló (Verovio) nem tölthető le. Ellenőrizd az internetkapcsolatot, és nyisd meg újra a kottát.'));
        };
        document.head.appendChild(script);
    });
    // Sikertelen betöltés után (pl. nem volt internet) a következő kotta újra megpróbálja
    promise.catch(() => { if (verovioPromise === promise) verovioPromise = null; });
    verovioPromise = promise;
    return promise;
};

// A Verovio oldalmérete a saját egységében értendő (scale: 100 mellett 1 egység = 1 px, a vonalköz 18 egység).
// 100%-os nagyításnál a vonalköz 10 px, mint korábban az OSMD-nél: egy egység 10/18 px. A nagyítást az oldal
// szélessége adja: a kirajzolt SVG-t a program a hasáb szélességére méretezi, így bármilyen nagyítás beállítható.
const VEROVIO_PX_PER_UNIT = 10 / 18;
const VEROVIO_MIN_PAGE_WIDTH = 100; // a Verovio ennél keskenyebb oldalt nem fogad el

const VEROVIO_OPTIONS = {
    scale: 100,
    pageWidth: 2100,            // kezdőérték; kirajzoláskor a hasáb szélességéből és a nagyításból számoljuk
    pageHeight: 60000,          // a legnagyobb megengedett: az egész kotta egy oldalra kerül
    adjustPageHeight: true,     // az oldal olyan magas, mint a kotta
    breaks: 'auto',             // a sortörés a szélességhez igazodik (a fájlba írt törések helyett)
    header: 'none',             // cím, szerző stb. nélkül
    footer: 'none',
    pageMarginTop: 0,           // a Verovio a kotta fölött és alatt magától is hagy egy kis helyet
    pageMarginBottom: 0,
    pageMarginLeft: 30,         // a kapcsos zárójel a sor elé nyúlik
    pageMarginRight: 10,
    svgViewBox: true,           // méretezhető SVG
    svgFormatRaw: true          // tömörebb SVG
};

// Kotta betöltése a Verovióba: tömörített MusicXML (.mxl, zip) vagy szöveg (MusicXML, MEI; a formátumot a Verovio
// ismeri fel). A hangszernevet (pl. „Zongora”, „Organ”) a Verovio a sorok elé írná, és nincs rá kapcsoló: a beolvasott
// kottát MEI-be alakítjuk, a neveket (label, labelAbbr) kivesszük, és újratöltjük.
// Az eredményt (MEI) megjegyezzük: ugyanazt a kottát újra megnyitva (pl. visszalapozáskor) ebből töltjük be, ami
// sokkal gyorsabb. A kulcsban a fájl tartalma is benne van, így a lecserélt fájl újra beolvasódik.
// Betöltéskor nem tördelünk (breaks: 'none'; így többszörösen gyorsabb): a sorokat a kirajzolás tördeli a hasábhoz.
const PART_NAME_ELEMENT = /<(label|labelAbbr)(\s[^>]*[^/>])?>[\s\S]*?<\/\1>/g;
const SCORE_CACHE_SIZE = 20;
const scoreCache = new Map(); // fájl címe + tartalma → MEI (a legrégebben használt az első)

const scoreKey = (url, bytes) => {
    let hash = 0x811c9dc5; // FNV-1a
    for (let i = 0; i < bytes.length; i++) hash = Math.imul(hash ^ bytes[i], 0x01000193);
    return `${url}|${bytes.length}|${(hash >>> 0).toString(36)}`;
};

const loadScore = (tk, url, buffer) => {
    tk.setOptions({ breaks: 'none' });
    const bytes = new Uint8Array(buffer);
    const key = scoreKey(url, bytes);
    const cached = scoreCache.get(key);
    if (cached !== undefined) {
        scoreCache.delete(key);
        scoreCache.set(key, cached);
        return tk.loadData(cached);
    }
    let loaded;
    if (bytes[0] === 0x50 && bytes[1] === 0x4B) loaded = tk.loadZipDataBuffer(buffer);
    else {
        const encoding = bytes[0] === 0xFF && bytes[1] === 0xFE ? 'utf-16le' : bytes[0] === 0xFE && bytes[1] === 0xFF ? 'utf-16be' : 'utf-8';
        loaded = tk.loadData(new TextDecoder(encoding).decode(bytes));
    }
    if (!loaded) return false;
    const mei = tk.getMEI();
    const stripped = mei.replace(PART_NAME_ELEMENT, '');
    if (stripped !== mei && !tk.loadData(stripped)) return false;
    scoreCache.set(key, stripped);
    if (scoreCache.size > SCORE_CACHE_SIZE) scoreCache.delete(scoreCache.keys().next().value);
    return true;
};

// A kottablokkok (MusicXML: VerovioViewer, kép: ScoreImage) nem maguk választják meg a méretüket: bejelentkeznek
// a ScoreViewernél (page.register), jelzik, ha változott az állapotuk (page.notify), és a ScoreViewer abban a
// méretben rajzoltatja ki őket, amelyben az egész oldal kifér. Egy blokk leírója:
//   layoutKey()   ami a tördelést meghatározza (fájl, kottafont): ugyanerre ugyanaz a jó méret
//   state()       'loading' | 'ready' | 'error'
//   layout(zoom)  kirajzolás az adott nagyításban
//   shrink(s)     a kirajzolt kotta arányos kicsinyítése (s < 1), újratördelés nélkül
//   height()      a kirajzolt kotta magassága (px)
//   maxZoom       ennél nagyobb nagyításnak nincs hatása (képnél 1 = teljes szélesség); kottánál nincs ilyen

const VerovioViewer = ({ fileUrl, font, page }) => {
    const containerRef = useRef(null);
    const toolkitRef = useRef(null);        // saját Verovio-példány (az előjátéknak és a kottának külön)
    const stateRef = useRef('loading');
    const laidOutRef = useRef(null);        // { pageWidth, font }: így van tördelve a kotta a Verovióban
    const renderedRef = useRef(null);       // { pageWidth, font }: így van kirajzolva
    const fileUrlRef = useRef(fileUrl);
    const fontRef = useRef(font);
    const loadIdRef = useRef(0);
    const loadQueueRef = useRef(Promise.resolve());
    const [error, setError] = useState(null);
    fileUrlRef.current = fileUrl;
    fontRef.current = font;

    const fail = (message) => {
        stateRef.current = 'error';
        renderedRef.current = null;
        if (containerRef.current) containerRef.current.style.display = 'none';
        setError(message);
        page.notify();
    };

    // Az SVG a hasáb szélességére méretezve (s < 1: arányosan kisebb, középen). Ha egy ütem szélesebb, mint a hely
    // (nagyon keskeny kijelző, nagy nagyítás), a Verovio jobbra kilógna az oldalról: ilyenkor annyival kisebb, hogy
    // a kilógó résszel együtt kiférjen.
    const shrink = (s) => {
        const container = containerRef.current;
        if (!container) return;
        const width = container.clientWidth;
        for (const svg of container.children) {
            const box = svg.viewBox && svg.viewBox.baseVal;
            if (!box || !box.width) continue;
            const w = width * s / (parseFloat(svg.dataset.overflow) || 1);
            svg.style.width = `${w}px`;
            svg.style.height = `${w * box.height / box.width}px`;
            svg.style.marginLeft = `${width * (1 - s) / 2}px`;
        }
    };

    // 1. Bejelentkezés a ScoreViewernél: egyszer, a komponens teljes élettartamára
    useLayoutEffect(() => {
        const unregister = page.register({
            layoutKey: () => `${fileUrlRef.current}|${fontRef.current}`,
            state: () => stateRef.current,
            layout: (zoom) => {
                const container = containerRef.current, tk = toolkitRef.current;
                if (stateRef.current !== 'ready' || !tk || !container) return;
                container.style.display = '';
                const pageWidth = Math.max(VEROVIO_MIN_PAGE_WIDTH, Math.round(container.clientWidth / (zoom * VEROVIO_PX_PER_UNIT)));
                const font = fontRef.current;
                const rendered = renderedRef.current;
                if (!rendered || rendered.pageWidth !== pageWidth || rendered.font !== font) {
                    try {
                        const laidOut = laidOutRef.current;
                        if (!laidOut || laidOut.pageWidth !== pageWidth || laidOut.font !== font) {
                            tk.setOptions({ breaks: VEROVIO_OPTIONS.breaks, pageWidth, font });
                            tk.redoLayout();
                            laidOutRef.current = { pageWidth, font };
                        }
                        let svg = '';
                        for (let n = 1; n <= tk.getPageCount(); n++) svg += tk.renderToSVG(n);
                        container.innerHTML = svg;
                        for (const el of container.children) {
                            const box = el.viewBox && el.viewBox.baseVal;
                            let right = 0;
                            try { const b = el.getBBox(); right = b.x + b.width; } catch (err) { /* nincs kirajzolva */ }
                            el.dataset.overflow = box && box.width && right > box.width ? String(right / box.width) : '1';
                        }
                        renderedRef.current = { pageWidth, font };
                    } catch (err) {
                        console.error('Kotta rajzolási hiba:', err);
                        fail(`Hiba történt a kotta rajzolásakor: ${err.message}`);
                        return;
                    }
                }
                shrink(1);
            },
            shrink,
            height: () => (stateRef.current === 'ready' && containerRef.current) ? containerRef.current.offsetHeight : 0
        });
        return () => {
            unregister();
            loadIdRef.current++; // a még futó betöltés eredményét eldobjuk
            // a Verovio-példány a WebAssembly memóriájában van: fel kell szabadítani (a futó betöltés után)
            loadQueueRef.current.then(() => {
                if (toolkitRef.current) toolkitRef.current.destroy();
                toolkitRef.current = null;
            });
        };
    }, []);

    // 2. Fájl betöltése. A betöltések sorban futnak, és csak a legutolsó kérés számít, így gyors lapozásnál
    //    sem kerülhet a képernyőre egy korábbi ének kottája. Kirajzolni betöltés után a ScoreViewer fogja.
    useLayoutEffect(() => {
        const loadId = ++loadIdRef.current;
        const current = () => loadId === loadIdRef.current;
        stateRef.current = 'loading';
        renderedRef.current = null;
        setError(null);
        containerRef.current.style.display = 'none'; // az előző ének kottája ne maradjon kint
        containerRef.current.innerHTML = '';
        page.notify();

        loadQueueRef.current = loadQueueRef.current
            .then(async () => {
                if (!current()) return; // közben újabb kérés jött
                let vrv;
                try {
                    vrv = await loadVerovio();
                } catch (err) {
                    if (current()) fail(err.message);
                    return;
                }
                const response = await fetch(fileUrl);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const buffer = await response.arrayBuffer();
                if (!current()) return;
                if (!toolkitRef.current) {
                    toolkitRef.current = new vrv.toolkit();
                    toolkitRef.current.setOptions({ ...VEROVIO_OPTIONS, font: fontRef.current });
                }
                const tk = toolkitRef.current;
                laidOutRef.current = null; // betöltve, de még nincs tördelve: a kirajzolás tördeli
                if (!loadScore(tk, fileUrl, buffer)) throw new Error('a fájl nem olvasható');
                stateRef.current = 'ready';
                page.notify();
            })
            .catch(err => {
                if (current()) fail(`A kotta nem tölthető be (${fileUrl}): ${err.message}`);
            });
    }, [fileUrl]);

    // Másik kottafont: újratördelés (a ScoreViewer újra megkeresi a kiférő méretet)
    useEffect(() => {
        if (stateRef.current === 'ready') page.notify();
    }, [font]);

    return (
        <div className="verovio-viewer">
            {error && <div className="score-missing">⚠️ {error}</div>}
            <div ref={containerRef} className="verovio-container"></div>
        </div>
    );
};

// Képként tárolt kotta (PNG, JPG, SVG): legfeljebb a teljes szélességben, és amekkora kifér.
// Másik képhez új példány tartozik (key), így az állapota mindig tiszta.
const ScoreImage = ({ src, alt, page }) => {
    const imgRef = useRef(null);
    const stateRef = useRef('loading');
    const widthRef = useRef(1);
    const [failed, setFailed] = useState(false);

    const settle = (state) => {
        if (stateRef.current !== 'loading') return;
        stateRef.current = state;
        if (state === 'error') setFailed(true);
        page.notify();
    };

    useLayoutEffect(() => {
        const setWidth = (fraction) => { if (imgRef.current) imgRef.current.style.width = `${fraction * 100}%`; };
        return page.register({
            layoutKey: () => src,
            state: () => stateRef.current,
            maxZoom: 1,
            layout: (zoom) => { widthRef.current = Math.min(1, zoom); setWidth(widthRef.current); },
            shrink: (s) => setWidth(widthRef.current * Math.min(1, s)),
            height: () => (stateRef.current === 'ready' && imgRef.current) ? imgRef.current.offsetHeight : 0
        });
    }, []);

    if (failed) return <div className="score-missing">⚠️ A kotta nem tölthető be ({src})</div>;
    return (
        <div className="score-image-wrap">
            <img ref={imgRef} src={src} alt={alt} className="score-image" onLoad={() => settle('ready')} onError={() => settle('error')} />
        </div>
    );
};

// --- KOTTAOLDAL ILLESZTÉSE ---
// Az oldal (előjáték + kotta) mindig egészben látszik, görgetés nincs. Ha a beállított nagyításban nem férne ki,
// kisebb nagyítással újratördeljük (kisebb hangjegyek: több ütem fér egy sorba, kevesebb sor lesz). Egy tördelés
// nagy kottánál lassú (tabletten akár 1 s is lehet), ezért becsléssel keresünk, kevés próbával; ha az utolsó
// próba sem fér ki, a kottát arányosan kicsinyítjük (shrink), így biztosan kifér.
const FIT_MIN_ZOOM = 0.2;
const FIT_MAX_TRIES = 5;      // legfeljebb ennyi próbatördelés
const FIT_TIME_BUDGET = 300;  // ms; ennyi után már nem finomítunk

// measure(zoom): kirajzol az adott nagyításban, és visszaadja a teljes tartalom (total) és ezen belül a kották
// (scalable) magasságát. Eredmény: { zoom, scale }, ahol scale < 1 a kotta arányos kicsinyítése.
const findFittingZoom = (maxZoom, avail, measure) => {
    const start = performance.now();
    const roomFor = (m) => Math.max(avail - (m.total - m.scalable), 1); // a kottáknak jutó hely (a feliratok nem változnak)
    let lo = null;   // a legnagyobb kiférő próba
    let hi = null;   // a legkisebb ki nem férő próba
    let last = null;
    let zoom = maxZoom;
    for (let tries = 0; tries < FIT_MAX_TRIES; tries++) {
        last = measure(zoom);
        if (last.total <= avail) lo = last; else hi = last;
        if (!hi || last.scalable <= 0) break; // kifér (vagy nincs mit kicsinyíteni)
        let next;
        if (!lo) {
            // Még semmi sem fért ki. Tördelt kottánál a magasság nagyjából a nagyítás négyzetével arányos,
            // ezért először így becslünk; ha így sem fér ki, egyenes arányban kicsinyítünk, az már elég.
            const ratio = roomFor(hi) / hi.scalable;
            next = hi.zoom * (tries === 0 ? Math.sqrt(ratio) : ratio);
        } else {
            if (performance.now() - start > FIT_TIME_BUDGET) break;
            // lo kifér, hi nem: köztük keresünk (felezve, de legfeljebb addig, amíg lo sorai kitöltik a helyet)
            const fill = lo.zoom * roomFor(lo) / lo.scalable;
            next = Math.min(fill, (lo.zoom + hi.zoom) / 2);
            if (next < lo.zoom * 1.02) break; // nem érdemes tovább finomítani
        }
        next = Math.max(FIT_MIN_ZOOM, Math.round(next * 1000) / 1000);
        if (next >= hi.zoom || (lo && next <= lo.zoom)) break;
        zoom = next;
    }
    if (last.total <= avail || last.scalable <= 0) return { zoom: last.zoom, scale: 1 };
    // Az utolsó próba nem fért ki: a legjobb kiférőt rajzoljuk vissza, vagy ha az nem nagyobb érdemben,
    // az utolsót kicsinyítjük arányosan.
    const scale = roomFor(last) / last.scalable;
    if (lo && lo.zoom > last.zoom * scale * 1.03) {
        measure(lo.zoom);
        return { zoom: lo.zoom, scale: 1 };
    }
    return { zoom: last.zoom, scale };
};

const FIT_CACHE_SIZE = 200;

// Az oldal kirajzolása a kiférő méretben. blocks: a betöltött kottablokkok. Eredmény: { zoom, scale, cap }.
// Visszalapozáskor (ugyanazok a kották, ugyanakkora hely) a korábbi eredményt használjuk, nem keresünk újra.
const fitPage = (pageEl, content, blocks, maxZoom, cache) => {
    const style = getComputedStyle(pageEl);
    const avail = Math.floor(pageEl.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom));
    if (avail <= 0 || content.clientWidth < 50) return null; // nem látszik, vagy nincs hol rajzolni
    const measure = (zoom) => {
        blocks.forEach(b => b.layout(zoom));
        return { zoom, total: content.offsetHeight, scalable: blocks.reduce((sum, b) => sum + b.height(), 0) };
    };
    // Ha csak kép van az oldalon, a teljes szélességnél (100%) nagyobbra nem nagyítunk
    const cap = blocks.length ? Math.max(...blocks.map(b => b.maxZoom || Infinity)) : maxZoom;
    const limit = Math.min(maxZoom, cap);
    const key = [...blocks.map(b => b.layoutKey()), pageEl.clientWidth, avail, limit].join('|');
    let fit = cache.get(key);
    if (fit) {
        const m = measure(fit.zoom);
        if (m.total - m.scalable * (1 - fit.scale) > avail + 1) fit = null;
    }
    if (!fit) {
        fit = { ...findFittingZoom(limit, avail, measure), cap };
        cache.set(key, fit);
        if (cache.size > FIT_CACHE_SIZE) cache.delete(cache.keys().next().value);
    }
    blocks.forEach(b => b.shrink(fit.scale));
    return fit;
};

const PAGE_FORWARD_KEYS = ['PageDown', 'ArrowDown', 'ArrowRight'];
const PAGE_BACK_KEYS = ['PageUp', 'ArrowUp', 'ArrowLeft'];

// Lapozó hotspotok a lejátszóban: a kottaterület bal és jobb szélső sávja (15%, keskeny kijelzőn legalább 48 px).
// Nem teszünk átlátszó réteget a kotta fölé: a kottaterületre koppintás helyét nézzük.
const HOTSPOT_RATIO = 0.15;
const HOTSPOT_MIN_PX = 48;
const hotspotAt = (el, clientX) => {
    const rect = el.getBoundingClientRect();
    const zone = Math.max(rect.width * HOTSPOT_RATIO, HOTSPOT_MIN_PX);
    const x = clientX - rect.left;
    if (x < zone) return 'prev';
    if (x > rect.width - zone) return 'next';
    return null;
};

// A +/− gombbal beállítható legnagyobb méret határai (a ténylegeset az illesztés adja)
const ZOOM_MIN = 0.4;
const ZOOM_MAX = 2.5;

// Egy versszak a szövegpanelen; a refrén dőlt betűs. Három nézet:
//  - side: oldalt, a sorok egymás alatt, a hosszú sor behúzással törik; a versszak alatt a refrénje (vagy rövidítése);
//  - columns: lent, egymás mellett, a sorok törés nélkül (az oszlop olyan széles, mint a leghosszabb sora);
//    itt csak a versszak saját sorai, a teljes refrén külön oszlop (LyricsRefrain);
//  - block: lent, egymás alatt, a sorok folyó szövegként, a refrén külön bekezdésben.
const LyricsVerse = ({ verse, mode }) => {
    if (mode === 'block') return (
        <div className="lyrics-verse block">
            <p className="lyrics-paragraph"><span className="lyrics-verse-label">{verse.label}</span> {verse.body.join(' ')}</p>
            {verse.refrain && (
                <p className="lyrics-paragraph lyrics-refrain"><span className="lyrics-refrain-label">Refr.</span> {verse.refrain.join(' ')}</p>
            )}
        </div>
    );
    const refrain = mode === 'side' && verse.refrain;
    return (
        <div className={`lyrics-verse ${mode}`}>
            <span className="lyrics-verse-label">{verse.label}</span>
            <div className="lyrics-verse-lines">
                {verse.body.map((line, i) => <div key={i} className="lyrics-line">{line}</div>)}
                {refrain && <div className="lyrics-line lyrics-refrain-label">Refr.</div>}
                {refrain && refrain.map((line, i) => <div key={`r${i}`} className="lyrics-line lyrics-refrain">{line}</div>)}
            </div>
        </div>
    );
};

// Az ének refrénje külön oszlopban (lent, egymás mellett nézetben, az első versszak mellett)
const LyricsRefrain = ({ lines }) => (
    <div className="lyrics-verse columns refrain">
        <span className="lyrics-verse-label lyrics-refrain-label">Refr.</span>
        <div className="lyrics-verse-lines">
            {lines.map((line, i) => <div key={i} className="lyrics-line lyrics-refrain">{line}</div>)}
        </div>
    </div>
);

const ScoreViewer = ({ score, variationId, preludeId, lyrics, showLyrics, lyricsWidth, scoreMaxWidth, scoreFont, onNext, onPrev }) => {
    const [textPosition, setTextPosition] = useState('bottom');
    const [textLayout, setTextLayout] = useState('columns');
    const [zoom, setZoom] = useState(1.0);     // a beállított legnagyobb méret
    const [fit, setFit] = useState(null);      // a ténylegesen használt méret: { zoom, scale, cap }
    const [loading, setLoading] = useState(false);
    const [fitRequest, setFitRequest] = useState(0);
    const pageRef = useRef(null);
    const contentRef = useRef(null);
    const blocksRef = useRef(new Set());
    const fitCacheRef = useRef(new Map());
    const fittedSizeRef = useRef('');
    const navRef = useRef({});
    navRef.current = { onNext, onPrev };

    // A kottablokkok ezen keresztül jelentkeznek be, és ezzel jelzik, ha változott az állapotuk
    const [page] = useState(() => ({
        register: (block) => {
            blocksRef.current.add(block);
            return () => { blocksRef.current.delete(block); setFitRequest(n => n + 1); };
        },
        notify: () => setFitRequest(n => n + 1)
    }));

    const variations = (score && score.variations) || [];
    const variation = variations.find(v => v.id === variationId) || variations[0] || null;
    const prelude = (score && score.preludes && score.preludes.find(p => p.id === preludeId)) || null;
    const hasContent = !!(variation || prelude);
    const pageKey = [prelude && prelude.xmlUrl, variation && variation.xmlUrl].join('|');

    // Kirajzolás a kiférő méretben, amint minden kotta betöltődött (vagy hibára futott). Layout effect: a böngésző
    // csak a végeredményt festi ki, a próbatördelések nem villannak fel.
    useLayoutEffect(() => {
        const pageEl = pageRef.current, content = contentRef.current;
        if (!pageEl || !content) return;
        const blocks = [...blocksRef.current];
        const isLoading = blocks.some(b => b.state() === 'loading');
        setLoading(isLoading);
        content.style.visibility = isLoading ? 'hidden' : ''; // félig betöltött oldal ne látsszon
        if (isLoading) return;
        const result = fitPage(pageEl, content, blocks.filter(b => b.state() === 'ready'), zoom, fitCacheRef.current);
        if (!result) return;
        fittedSizeRef.current = `${pageEl.clientWidth}x${pageEl.clientHeight}`;
        setFit(result);
    }, [fitRequest, zoom, scoreMaxWidth, pageKey, hasContent, textPosition]);

    // Ablakméret, tablet elforgatása, szövegpanel áthelyezése: újraillesztés (kis késleltetéssel,
    // hogy átméretezés közben ne tördeljünk feleslegesen)
    useEffect(() => {
        const pageEl = pageRef.current;
        if (!pageEl) return;
        let timer = null;
        const observer = new ResizeObserver(() => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (`${pageEl.clientWidth}x${pageEl.clientHeight}` !== fittedSizeRef.current) setFitRequest(n => n + 1);
            }, 150);
        });
        observer.observe(pageEl);
        return () => { observer.disconnect(); clearTimeout(timer); };
    }, [hasContent]);

    // Lapozás billentyűzettel vagy Bluetooth lapozópedállal (ezek nyíl- vagy PageUp/PageDown billentyűt küldenek).
    // Mindig egész oldalt (éneket) lapoz; a lenyomva tartott billentyű ismétlése nem lapoz tovább.
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.defaultPrevented || e.repeat || e.altKey || e.ctrlKey || e.metaKey) return;
            if (document.querySelector('.modal-overlay')) return;
            if (e.target.closest && e.target.closest('input, select, textarea, [contenteditable="true"]')) return;
            const { onNext, onPrev } = navRef.current;
            const turn = PAGE_FORWARD_KEYS.includes(e.key) ? onNext : PAGE_BACK_KEYS.includes(e.key) ? onPrev : null;
            if (!turn) return;
            e.preventDefault();
            turn();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Koppintás a kottaterület bal/jobb szélére: előző / következő ének
    const handlePaneClick = (e) => {
        const { onNext, onPrev } = navRef.current;
        if (!onNext && !onPrev) return;
        if (e.target.closest('button, a, input, select, textarea')) return; // pl. a zoom gombjai
        const selection = window.getSelection && window.getSelection();
        if (selection && !selection.isCollapsed && e.currentTarget.contains(selection.anchorNode)) return; // kijelölés ne lapozzon
        const spot = hotspotAt(e.currentTarget, e.clientX);
        if (spot === 'prev' && onPrev) onPrev();
        else if (spot === 'next' && onNext) onNext();
    };

    // Egérrel a lapozó sáv fölött nyíl alakú kurzor jelzi, merre lapoz
    const handlePaneMouseMove = (e) => {
        const { onNext, onPrev } = navRef.current;
        const spot = (onNext || onPrev) ? hotspotAt(e.currentTarget, e.clientX) : null;
        const cursor = spot === 'prev' && onPrev ? 'w-resize' : spot === 'next' && onNext ? 'e-resize' : '';
        if (e.currentTarget.style.cursor !== cursor) e.currentTarget.style.cursor = cursor;
    };

    const isSide = textPosition === 'right';
    const lyricsMode = isSide ? 'side' : textLayout === 'columns' ? 'columns' : 'block';
    const { verses, refrain } = lyrics;
    // Szövegpanel (oldalt vagy lent); kotta nélkül is látszik, szöveg nélkül elmarad. Lent folyó szövegként legfeljebb
    // a kottanézet 30%-át foglalja el (a többi görgethető), hogy a kottától ne vegye el a helyet.
    const lyricsPanel = showLyrics && verses.length > 0 && (
        <div style={{
            width: isSide ? lyricsWidth : '100%', 
            minWidth: isSide ? '200px' : '100%', 
            height: isSide ? '100%' : 'auto',
            minHeight: isSide ? '100%' : '150px',
            maxHeight: isSide ? '100%' : lyricsMode === 'block' ? '30%' : '50%',
            display:'flex', 
            flexDirection:'column', 
            borderLeft: isSide ? '1px solid var(--col-border, #ddd)' : 'none', 
            borderTop: !isSide ? '1px solid var(--col-border, #ddd)' : 'none',
            backgroundColor:'var(--col-papyrus)', 
            zIndex:20, 
            boxShadow: isSide ? '-5px 0 15px rgba(0,0,0,0.1)' : '0 -5px 15px rgba(0,0,0,0.1)'
        }}>
            {/* Toolbar */}
            <div style={{display:'flex', justifyContent:'flex-end', padding:'4px', borderBottom:'1px dashed var(--col-border, #eee)', gap:'4px'}}>
                 <button onClick={() => setTextPosition(textPosition === 'right' ? 'bottom' : 'right')} className="btn-ghost p-1" title={textPosition === 'right' ? "Lentre tesz" : "Oldalra tesz"}>
                     {textPosition === 'right' ? <Icons.LayoutBottom size={16}/> : <Icons.LayoutSidebar size={16}/>}
                 </button>
                 {textPosition === 'bottom' && (
                     <button onClick={() => setTextLayout(textLayout === 'block' ? 'columns' : 'block')} className="btn-ghost p-1" title={textLayout === 'block' ? "Oszlopos nézet" : "Folyó szöveg"}>
                         {textLayout === 'block' ? <Icons.Columns size={16}/> : <Icons.List size={16}/>}
                     </button>
                 )}
            </div>
            <div className={`lyrics-scroll ${lyricsMode}`} style={{
                flex: 1, 
                overflowY: 'auto',
                overflowX: lyricsMode === 'columns' ? 'auto' : 'hidden',
                padding: '1rem'
            }}>
                {lyricsMode === 'columns' ? (
                    <div className="lyrics-columns">
                        {verses.map((v, i) => (
                            <React.Fragment key={v.index}>
                                <LyricsVerse verse={v} mode="columns" />
                                {i === 0 && refrain && <LyricsRefrain lines={refrain} />}
                            </React.Fragment>
                        ))}
                    </div>
                ) : verses.map(v => <LyricsVerse key={v.index} verse={v} mode={lyricsMode} />)}
            </div>
        </div>
    );

    if (!hasContent) return (
        <div style={{display:'flex', height:'100%', flexDirection: isSide ? 'row' : 'column'}}>
            <div className="score-empty">
                <Icons.Music size={64}/>
                <p>Nincs elérhető kotta</p>
                <p className="text-sm">További kottákat a Kottakönyvek oldalon tölthetsz le.</p>
            </div>
            {lyricsPanel}
        </div>
    );

    // A kijelzett méret a ténylegesen látott; a gombok ehhez képest lépnek 10%-ot, és a legnagyobb méretet állítják
    const shownZoom = fit ? fit.zoom * fit.scale : zoom;
    const fitLimited = shownZoom < zoom - 0.005; // a beállított méretben nem férne ki
    const atMax = fitLimited || zoom >= ZOOM_MAX || (fit && shownZoom >= fit.cap - 0.005); // (kép: teljes szélesség)
    const zoomOut = () => setZoom(Math.max(ZOOM_MIN, Math.ceil(Math.round(shownZoom * 1000) / 100 - 1) / 10));
    const zoomIn = () => setZoom(Math.min(ZOOM_MAX, Math.floor(Math.round(shownZoom * 1000) / 100 + 1) / 10));

    return (
        <div style={{display:'flex', height:'100%', flexDirection: isSide ? 'row' : 'column'}}>
            {/* Kotta rész: nem görgethető, az előjáték és a kotta mindig egészben látszik */}
            <div className="score-pane" onClick={handlePaneClick} onMouseMove={handlePaneMouseMove}>
                <div ref={pageRef} className="score-page">
                    <div ref={contentRef} className="score-page-content">

                        {/* Előjáték */}
                        {prelude && (
                            <div className="score-block prelude-block" style={{maxWidth: scoreMaxWidth || '100%'}}>
                                <div className="prelude-label">Előjáték: {prelude.name}</div>
                                {prelude.xmlUrl ? (isImageUrl(prelude.xmlUrl)
                                    ? <ScoreImage key={prelude.xmlUrl} src={prelude.xmlUrl} alt={`Előjáték: ${prelude.name}`} page={page} />
                                    : <VerovioViewer fileUrl={prelude.xmlUrl} font={scoreFont} page={page} />
                                ) : (
                                    <div className="score-missing">Előjáték kotta helye</div>
                                )}
                            </div>
                        )}

                        {/* Fő Kotta / Variáció */}
                        {variation && (variation.xmlUrl ? (
                            <div className="score-block" style={{maxWidth: scoreMaxWidth || '100%'}}>
                                {isImageUrl(variation.xmlUrl)
                                    ? <ScoreImage key={variation.xmlUrl} src={variation.xmlUrl} alt={variation.name || 'Kotta'} page={page} />
                                    : <VerovioViewer fileUrl={variation.xmlUrl} font={scoreFont} page={page} />}
                            </div>
                        ) : (
                            <div className="score-placeholder">
                                <Icons.Music size={80} className="text-ink"/>
                                <p className="mt-4">Kotta helye</p>
                            </div>
                        ))}
                    </div>
                    {loading && <div className="score-loading">⏳ Kotta betöltése...</div>}
                </div>

                {/* Alsó sáv: zoom és a letét adatai, külön helyen, hogy ne takarják a kottát */}
                <div className="score-footer">
                    <div className="zoom-bar">
                        <button onClick={zoomOut} disabled={shownZoom <= ZOOM_MIN + 0.001} title="Kicsinyítés">-</button>
                        <span title={fitLimited ? 'Ennél nagyobban nem fér ki a kotta' : undefined}>{Math.round(shownZoom * 100)}%</span>
                        <button onClick={zoomIn} disabled={atMax} title="Nagyítás">+</button>
                    </div>
                    {variation && (
                        <div className="score-info">
                            {variation.year} {variation.voiceCount && ` • ${variation.voiceCount} szólam`}
                        </div>
                    )}
                </div>
            </div>

            {lyricsPanel}
        </div>
    );
};

// Óra a lejátszó fejlécében (óra:perc). Percváltáskor frissül; ha a tablet alvásból ébred, rögtön.
// Külön komponens, hogy percenként csak az óra rajzolódjon újra, ne az egész lejátszó.
const PlayerClock = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        let timer = null;
        const schedule = () => { timer = setTimeout(tick, 60000 - Date.now() % 60000 + 50); };
        const tick = () => { setNow(new Date()); schedule(); };
        const onVisible = () => { if (!document.hidden) { clearTimeout(timer); tick(); } };
        schedule();
        document.addEventListener('visibilitychange', onVisible);
        return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', onVisible); };
    }, []);
    return <div className="player-clock" title="Pontos idő">{now.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })}</div>;
};

// --- KOTTAKÖNYVEK OLDAL ---
// Egy könyv kártyája: a beépített mindig elérhető, a többit le lehet tölteni, frissíteni és törölni.
const ScorebookCard = ({ book, download, active, onToggle, onDownload, onCancel, onDelete }) => {
    const data = book.remote ? book.remote.index : book.local ? book.local.index : null;
    const title = (data && data.title) || book.folder;
    const usable = book.builtin || !OFFLINE_SUPPORTED ? !!data : !!book.local;
    const progress = download && download.total != null ? download : null;
    const failed = download && download.error;
    const hasUpdate = !!(book.local && book.remote && !sameBookText(book.local.text, book.remote.text));
    const serverProblem = book.remoteError && book.remoteError !== NO_CONNECTION ? book.remoteError : null;
    const local = book.local;
    const savedText = local && [
        `${formatBytes(local.bytes)}`,
        local.missing && local.missing.length ? `${local.missing.length} kotta hiányzik a szerverről` : null
    ].filter(Boolean).join(' • ');

    let status = null, actions = null;
    if (progress) {
        status = `${book.builtin ? 'Mentés a készülékre' : 'Letöltés'}: ${progress.done} / ${progress.total}`;
        if (!book.builtin) actions = <button onClick={() => onCancel(book.folder)} className="btn btn-ghost">Mégse</button>;
    } else if (book.builtin) {
        if (local) status = `Internet nélkül is elérhető • ${savedText}`;
        else if (!OFFLINE_SUPPORTED) status = 'Csak internettel érhető el (ez a böngésző nem tud menteni)';
        else if (!data) status = `Nem érhető el: ${book.remoteError || 'betöltés...'}`;
        else if (!failed) status = 'Mentés a készülékre...';
        if (failed && data) actions = <button onClick={() => onDownload(book.folder)} className="btn btn-ghost">Újra</button>;
    } else if (!OFFLINE_SUPPORTED) {
        status = data ? 'Csak internettel érhető el (ez a böngésző nem tud menteni)' : `Nem érhető el: ${book.remoteError || 'betöltés...'}`;
    } else if (book.orphan) {
        status = 'Ez a könyv már nem szerepel a kottakönyvek listájában.';
        actions = <button onClick={() => onDelete({ folder: book.folder, title })} className="btn btn-ghost btn-danger">Törlés</button>;
    } else if (local) {
        status = `Letöltve ${new Date(local.date).toLocaleDateString('hu-HU')} • ${savedText}`;
        actions = <>
            {hasUpdate && <button onClick={() => onDownload(book.folder)} className="btn btn-primary" title="Új vagy megváltozott kották vannak a szerveren">Frissítés</button>}
            <button onClick={() => onDelete({ folder: book.folder, title })} className="btn btn-ghost btn-danger">Törlés</button>
        </>;
    } else if (data) {
        status = `${bookFiles(data).length} fájl`;
        actions = <button onClick={() => onDownload(book.folder)} className="btn btn-primary">Letöltés</button>;
    } else {
        status = `Nem érhető el: ${book.remoteError || 'betöltés...'}`;
    }

    return (
        <div className={`card list-item scorebook-item ${usable && !active ? 'inactive' : ''}`} data-folder={book.folder}>
            <div className="card-decoration"></div>
            <div className="scorebook-content">
                <div className="scorebook-header">
                    <h3 className="font-bold text-ink scorebook-title">
                        {title}
                        {book.builtin && <span className="scorebook-badge">Beépített</span>}
                    </h3>
                    {usable && (
                        <label className="toggle-switch scorebook-toggle" title={active ? 'Elrejtés' : 'Megjelenítés'}>
                            <input type="checkbox" checked={active} onChange={() => onToggle(data || local.index)} />
                            <span className="slider"></span>
                        </label>
                    )}
                </div>

                {data && (
                    <div className="scorebook-details">
                        <div>{data.scores.length} db letét, {data.preludes.length} db előjáték</div>
                        {data.author && <strong>{data.author}</strong>}
                    </div>
                )}
                {data && data.description && <div className="scorebook-description">{data.description}</div>}

                <div className="scorebook-status">
                    {status && <span>{status}</span>}
                    {hasUpdate && !progress && !book.builtin && <span className="scorebook-update">Új kották érhetők el</span>}
                    {actions}
                </div>
                {progress && (
                    <div className="scorebook-progress"><div style={{width: `${progress.total ? Math.round(progress.done / progress.total * 100) : 0}%`}}></div></div>
                )}
                {failed && <div className="scorebook-warning">{book.builtin ? 'A mentés' : 'A letöltés'} nem sikerült: {failed}</div>}
                {serverProblem && data && <div className="scorebook-warning">A szerveren lévő index.json nem használható: {serverProblem}</div>}
            </div>
        </div>
    );
};

const ScorebooksView = ({ books, downloads, bookActive, online, onToggle, onDownload, onCancel, onDelete }) => (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
        <div className="header centered">
            <h1 className="header-title main page-title">Kottakönyvek</h1>
        </div>

        <div className="main-content" style={{padding:'1rem', overflowY:'auto'}}>
            <p className="text-center scorebook-intro">
                A beépített könyv mindig elérhető. A többi könyvet letöltheted: a kottái a készülékre kerülnek,
                így internet nélkül is használhatók. A kapcsolóval elrejtheted azokat a könyveket, amiknek a kottáit nem szeretnéd látni.
            </p>
            {!online && <p className="text-center scorebook-notice">Nincs internetkapcsolat: csak a készüléken lévő könyvek érhetők el.</p>}
            {!OFFLINE_SUPPORTED && <p className="text-center scorebook-notice">Ez a böngésző itt nem tudja a könyveket a készülékre menteni (ehhez https kell), ezért minden könyv internettel, a szerverről használható.</p>}

            {/* ÜRES ÁLLAPOT KEZELÉSE */}
            {books.length === 0 && (
                <div className="card list-item scorebook-empty">
                    <div className="card-decoration" style={{ backgroundColor: 'var(--col-red)' }}></div>
                    <div className="text-center">
                        <h3 className="font-bold">Még nincsenek kottakönyvek betöltve!</h3>
                        <p className="text-sm">Ellenőrizd a data/kottakonyvek.json fájlt.</p>
                    </div>
                </div>
            )}

            <div className="scorebook-list">
                {books.map(book => {
                    const data = book.remote ? book.remote.index : book.local ? book.local.index : null;
                    return (
                        <ScorebookCard key={book.folder} book={book} download={downloads[book.folder]}
                            active={data ? isBookActive(data, bookActive) : true}
                            onToggle={onToggle} onDownload={onDownload} onCancel={onCancel} onDelete={onDelete} />
                    );
                })}
            </div>
        </div>
    </div>
);

const PlaylistEditor = ({ playlist, onRemoveItem, onAddItem, onPlay, onReorder, getScoreInfo }) => {
    const [dragItem, setDragItem] = useState(null);
    const [dragOverItem, setDragOverItem] = useState(null);
    const handleDragStart = (e, index) => { setDragItem(index); e.dataTransfer.effectAllowed = "move"; };
    const handleDragEnter = (e, index) => { setDragOverItem(index); };
    const handleDragEnd = () => { if (dragItem !== null && dragOverItem !== null && dragItem !== dragOverItem) { onReorder(dragItem, dragOverItem); } setDragItem(null); setDragOverItem(null); };

    if (!playlist) return null;
    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
            <div className="header">
                 <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                    <button onClick={() => window.history.back()} style={{color: 'var(--col-papyrus)'}}><Icons.ChevronLeft size={24}/></button>
                 </div>
                 <div style={{flex:2, display:'flex', justifyContent:'center'}}>
                    <h1 className="header-title main">{playlist.name}</h1>
                 </div>
                 <div style={{flex:1, display:'flex', justifyContent:'flex-end'}}>
                    <button onClick={() => onPlay(playlist)} className="btn btn-success"><Icons.Play size={20} /> Lejátszás</button>
                 </div>
            </div>
            
            <div className="main-content" style={{padding:'2rem', overflowY:'auto'}}>
                {playlist.items.length === 0 ? (
                    <div className="playlist-editor-empty">
                        <Icons.ListMusic size={64} className="icon"/>
                        <p>Üres lista</p>
                        <button onClick={onAddItem} className="text-accent font-bold hover:underline mt-2">Adj hozzá egy éneket!</button>
                    </div>
                ) : (
                    <div style={{maxWidth:'1000px', width:'100%', margin:'0 auto', display:'flex', flexDirection:'column', gap:'10px'}}>
                         {playlist.items.map((item, idx) => {
                             const isDragging = idx === dragItem;
                             const isDragOver = idx === dragOverItem;
                             const { variationName, preludeName } = getScoreInfo(item.hymn.scoreId, item.variationId, item.preludeId);
                             
                             return (
                                <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, idx)} onDragEnter={(e) => handleDragEnter(e, idx)} onDragEnd={handleDragEnd} onDragOver={(e) => e.preventDefault()} 
                                     className="playlist-editor-item"
                                     style={{opacity: isDragging ? 0.5 : 1, borderTop: isDragOver && !isDragging ? '2px solid var(--col-accent)' : '1px solid var(--col-border, #ddd)'}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                                        <div style={{cursor:'move', color:'var(--col-border-dark, #ccc)'}}><Icons.GripVertical size={20} /></div>
                                        <div style={{fontWeight:'bold', color:'var(--col-ink-muted, #6b7280)', width:'20px'}}>{idx + 1}.</div>
                                        <div>
                                            <div><span className="hymn-number text-accent">{item.hymn.number}</span> <span className="font-bold text-ink">{item.hymn.title}</span></div>
                                            <div style={{fontSize:'12px', color:'var(--col-ink-muted, #666)', marginTop:'2px'}}>
                                                {preludeName ? <span className="text-accent">Előjáték: {preludeName} + </span> : ''}
                                                Változat: {variationName} • {item.verses.length} versszak
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemoveItem(item.id)} className="btn-danger"><Icons.Trash2 size={20} /></button>
                                </div>
                             );
                         })}
                    </div>
                )}
                <div style={{textAlign:'center', marginTop:'2rem'}}>
                    <button onClick={onAddItem} className="btn playlist-editor-add-btn"><Icons.Plus size={20}/> Új ének hozzáadása</button>
                </div>
            </div>
        </div>
    );
};



// --- FŐ ALKALMAZÁS ---
function OrganistApp() {
    // NAVIGÁCIÓS ÁLLAPOT: csak azonosítók, az objektumokat mindig a friss adatokból számoljuk
    const [activeTab, setActiveTab] = useState('library');
    const [selectedHymnNumber, setSelectedHymnNumber] = useState(null);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [playingPlaylistId, setPlayingPlaylistId] = useState(null);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [keywordFilter, setKeywordFilter] = useState('');   // a könyvtár kulcsszavas szűrője ('' = minden ének)

    // Selection States
    const [currentVariationId, setCurrentVariationId] = useState(null);
    const [currentPreludeId, setCurrentPreludeId] = useState(null);

    // STORAGE STATE (induláskor a localStorage-ból töltjük)
    const [playlists, setPlaylists] = useState(() => normalizePlaylists(loadJSON(STORAGE_KEYS.playlists, [])));
    const [settings, setSettings] = useState(loadSettings);

    // DATA STATE
    const [hymnBook, setHymnBook] = useState([]);
    const [loading, setLoading] = useState(true);

    // KOTTAKÖNYVEK: a lista könyvei, mindegyiknél a szerveren lévő (remote) és a készülékre letöltött (local) változat
    const [books, setBooks] = useState([]);          // [{ folder, builtin, orphan, remote, remoteError, local }]
    const [downloads, setDownloads] = useState({});  // { [mappa]: { done, total } (folyamatban) | { error } }
    const [bookToDelete, setBookToDelete] = useState(null);
    const [online, setOnline] = useState(navigator.onLine);
    const booksRef = useRef(books);
    booksRef.current = books;
    const downloadControllersRef = useRef({});
    const fillControllersRef = useRef({});   // háttérben futó pótlások (hiányzó kották)
    const autoSyncedRef = useRef(new Set());

    // MODAL STATES
    const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isHymnSelectorOpen, setIsHymnSelectorOpen] = useState(false);
    const [isQuickOpenOpen, setIsQuickOpenOpen] = useState(false);
    const [targetPlaylistId, setTargetPlaylistId] = useState(null);
    const [pendingHymnToAdd, setPendingHymnToAdd] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [playlistToDelete, setPlaylistToDelete] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(() => FULLSCREEN_SUPPORTED && !isFullscreen() && !settings.skipFullscreenPrompt);

    // A könyvek szerveren lévő változata. A háttérben töltődik: indulásnál nem várunk rá, így rossz hálózaton
    // (vagy internet nélkül) is azonnal használható a program a készüléken lévő könyvekkel.
    const refreshRemoteBooks = useCallback((entries) => {
        entries.filter(entry => !entry.orphan).forEach(({ folder }) => {
            fetchRemoteBook(folder)
                .then(remote => setBooks(bs => bs.map(b => b.folder === folder ? { ...b, remote, remoteError: null } : b)))
                .catch(err => {
                    const remoteError = err instanceof TypeError ? NO_CONNECTION : err.message;
                    if (remoteError !== NO_CONNECTION) console.error(`Kottakönyv (${folder}):`, err);
                    setBooks(bs => bs.map(b => b.folder === folder ? { ...b, remoteError } : b));
                });
        });
    }, []);

    // LOAD DATA & PERSISTENCE
    useEffect(() => {
        setLoading(true);
        const errors = [];
        // no-cache: a böngésző mindig rákérdez a szerverre, de változatlan fájlnál nem tölti le újra (304)
        const loadJSONFile = (url) => fetch(url, { cache: 'no-cache' })
            .then(res => {
                if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
                return res.json();
            })
            .then(data => Array.isArray(data) ? data : [])
            .catch(err => {
                console.error("Adatbetöltési hiba:", err);
                errors.push(err.message);
                return [];
            });

        Promise.all([loadJSONFile('./data/enek.json'), loadJSONFile(CATALOG_URL), readDownloadedBooks().catch(() => ({}))])
            .then(([hymns, catalog, downloaded]) => {
                const entries = normalizeCatalog(catalog).map(entry => ({ ...entry, orphan: false, remote: null, remoteError: null, local: downloaded[entry.folder] || null }));
                // A listából azóta kikerült, de letöltött könyv is megmarad (törölni a felhasználó tudja)
                Object.keys(downloaded).filter(folder => !entries.some(e => e.folder === folder))
                    .forEach(folder => entries.push({ folder, builtin: false, orphan: true, remote: null, remoteError: null, local: downloaded[folder] }));
                setHymnBook(hymns.map(h => ({ ...h, verses: hymnVerses(h) })));
                setBooks(entries);
                if (errors.length) setAlertMessage(`Hiba az adatfájlok betöltésekor: ${errors.join(', ')}`);
                setLoading(false);
                refreshRemoteBooks(entries);
            });
    }, [refreshRemoteBooks]);

    // Internetkapcsolat: ha visszajön, újra megnézzük a szerveren lévő könyveket (frissítések, letölthetőség)
    useEffect(() => {
        const update = () => {
            setOnline(navigator.onLine);
            if (navigator.onLine) refreshRemoteBooks(booksRef.current);
        };
        window.addEventListener('online', update);
        window.addEventListener('offline', update);
        return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
    }, [refreshRemoteBooks]);

    // Könyv letöltése (vagy frissítése) a készülékre
    const startDownload = (folder) => {
        const book = booksRef.current.find(b => b.folder === folder);
        if (!OFFLINE_SUPPORTED || !book || !book.remote || downloadControllersRef.current[folder]) return;
        stopFillingMissing(folder);
        const controller = new AbortController();
        downloadControllersRef.current[folder] = controller;
        setDownloads(d => ({ ...d, [folder]: { done: 0, total: bookFiles(book.remote.index).length } }));
        // a böngésző ne törölje magától a letöltött könyveket, ha fogy a hely
        if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
        const withoutFolder = (d) => { const rest = { ...d }; delete rest[folder]; return rest; };
        downloadBook({
            folder, remote: book.remote, previous: book.local, signal: controller.signal,
            onProgress: (done, total) => setDownloads(d => d[folder] ? { ...d, [folder]: { done, total } } : d)
        })
            .then(local => {
                autoSyncedRef.current.add(missingFilesKey(folder, local.cacheName)); // most derült ki, mi hiányzik
                setBooks(bs => bs.map(b => b.folder === folder ? { ...b, local } : b));
                setDownloads(withoutFolder);
            })
            .catch(err => {
                if (controller.signal.aborted) { setDownloads(withoutFolder); return; }
                console.error(`Letöltési hiba (${folder}):`, err);
                const error = err instanceof TypeError ? NO_CONNECTION
                    : err && err.name === 'QuotaExceededError' ? 'nincs elég szabad hely a készüléken' : err.message;
                setDownloads(d => ({ ...d, [folder]: { error } }));
            })
            .finally(() => { delete downloadControllersRef.current[folder]; });
    };

    // A letöltéskor hiányzó kották pótlása a háttérben, ha azóta felkerültek a szerverre
    const fillMissingFiles = (folder) => {
        const book = booksRef.current.find(b => b.folder === folder);
        if (!book || !book.local || downloadControllersRef.current[folder] || fillControllersRef.current[folder]) return;
        const controller = new AbortController();
        fillControllersRef.current[folder] = controller;
        retryMissingFiles({ folder, local: book.local, signal: controller.signal })
            .then(local => {
                if (controller.signal.aborted || local === book.local) return;
                // csak ha közben nem törölték vagy töltötték le újra
                setBooks(bs => bs.map(b => b.folder === folder && b.local && b.local.cacheName === local.cacheName ? { ...b, local } : b));
            })
            .catch(err => { if (!controller.signal.aborted) console.info(`Hiányzó kották pótlása (${folder}):`, err.message); })
            .finally(() => { if (fillControllersRef.current[folder] === controller) delete fillControllersRef.current[folder]; });
    };

    const missingFilesKey = (folder, cacheName) => `${folder}\nhiányzó\n${cacheName}`;

    const stopFillingMissing = (folder) => {
        const controller = fillControllersRef.current[folder];
        if (controller) { controller.abort(); delete fillControllersRef.current[folder]; }
    };

    const cancelDownload = (folder) => {
        const controller = downloadControllersRef.current[folder];
        if (controller) controller.abort();
    };

    const confirmDeleteBook = () => {
        if (!bookToDelete) return;
        const { folder } = bookToDelete;
        setBookToDelete(null);
        stopFillingMissing(folder);
        deleteDownloadedBook(folder)
            .then(() => setBooks(bs => bs.filter(b => !(b.folder === folder && b.orphan)).map(b => b.folder === folder ? { ...b, local: null } : b)))
            .catch(err => setAlertMessage(`A könyv törlése nem sikerült: ${err.message}`));
    };

    // A beépített könyv magától mentődik a készülékre, és frissül, ha a szerveren változott.
    // Egy változatot csak egyszer próbálunk (hiba után a Kottakönyvek oldalon lehet újrapróbálni).
    useEffect(() => {
        if (!OFFLINE_SUPPORTED) return;
        books.forEach(book => {
            if (!book.builtin || !book.remote || downloads[book.folder]) return;
            if (book.local && sameBookText(book.local.text, book.remote.text)) return;
            const key = `${book.folder}\n${book.remote.text}`;
            if (autoSyncedRef.current.has(key)) return;
            autoSyncedRef.current.add(key);
            startDownload(book.folder);
        });
        // Letöltött könyvekben a letöltéskor hiányzó kották: ha azóta felkerültek a szerverre, pótoljuk (a program
        // minden megnyitásakor egyszer próbáljuk). Ha az index.json is változott, ezt a frissítés intézi.
        books.forEach(book => {
            const local = book.local;
            if (!local || !book.remote || !local.missing || !local.missing.length || downloads[book.folder]) return;
            if (!sameBookText(local.text, book.remote.text)) return;
            const key = missingFilesKey(book.folder, local.cacheName);
            if (autoSyncedRef.current.has(key)) return;
            autoSyncedRef.current.add(key);
            fillMissingFiles(book.folder);
        });
    }, [books, downloads]);

    // NAVIGÁCIÓ: minden nézetváltás egy history-bejegyzés, a vissza gomb ezt állítja vissza.
    // A bejegyzés csak azonosítókat tárol, ezért a kezelőnek nincs szüksége a friss adatokra.
    const applyNavState = useCallback((state) => {
        const s = state || {};
        setActiveTab(s.activeTab || 'library');
        setSelectedHymnNumber(s.selectedHymnNumber ?? null);
        setSelectedPlaylistId(s.selectedPlaylistId ?? null);
        setPlayingPlaylistId(s.playingPlaylistId ?? null);
        setPlayerIndex(s.playerIndex || 0);
    }, []);

    const navigate = (state) => {
        window.history.pushState(state, '');
        applyNavState(state);
    };

    useEffect(() => {
        // Újratöltéskor a böngésző megőrzi a history.state-et, így ugyanoda térünk vissza
        if (window.history.state && window.history.state.activeTab) applyNavState(window.history.state);
        else window.history.replaceState({ activeTab: 'library' }, '');

        const handlePopState = (event) => applyNavState(event.state);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [applyNavState]);

    const goToPlayerIndex = (index) => {
        setPlayerIndex(index);
        window.history.replaceState({ ...window.history.state, playerIndex: index }, '');
    };

    // A kottakönyvek ki-/bekapcsolását a beállításokban tároljuk, így újratöltés után is megmarad
    const toggleBookActive = (book) => {
        setSettings(prev => ({
            ...prev,
            bookActive: { ...prev.bookActive, [String(book.id)]: !isBookActive(book, prev.bookActive) }
        }));
    };

    // A kották forrása: a beépített könyv (a szerveren lévő, ennek hiányában a mentett változat) és a letöltött
    // könyvek (a letöltött változat, hogy a kották és a leírásuk összetartozzon). Ha a böngésző nem tud menteni
    // (pl. http-n, IP-címmel megnyitva), minden könyv a szerverről, internettel használható, mint régen.
    // Ha a könyvek tartalma nem változott, a korábbi tömb marad, így a kottanézet sem számol feleslegesen újra.
    const scorebooksRef = useRef([]);
    const scorebooks = useMemo(() => {
        const next = books
            .map(b => b.builtin || !OFFLINE_SUPPORTED ? (b.remote ? b.remote.index : b.local && b.local.index) : b.local && b.local.index)
            .filter(Boolean);
        const prev = scorebooksRef.current;
        if (next.length === prev.length && next.every((b, i) => b === prev[i])) return prev;
        scorebooksRef.current = next;
        return next;
    }, [books]);

    const activeScores = useMemo(() => {
        const grouped = {};
        // Egy könyvben ugyanahhoz az énekhez több letét is tartozhat azonos "id"-vel (pl. két változat a 7. zsoltárhoz);
        // az azonosítókat egyedivé tesszük, különben a második változat nem választható ki.
        const usedIds = new Set();
        const uniqueId = (base) => {
            let id = base;
            for (let n = 2; usedIds.has(id); n++) id = `${base}_${n}`;
            usedIds.add(id);
            return id;
        };

        // Csak azokat a könyveket nézzük, amik nincsenek kikapcsolva
        scorebooks.filter(b => isBookActive(b, settings.bookActive)).forEach(book => {
            (book.scores || []).forEach(score => {
                const linkId = (score.scoreId || score.hymnId || score.id || "").toString();
                if (!linkId) return;
                
                if (!grouped[linkId]) {
                    grouped[linkId] = {
                        id: linkId,
                        variations: [],
                        preludes: [] 
                    };
                }
                
                const composerName = score.composer || book.author || '';
                const details = `${composerName} ${score.voiceCount ? `• ${score.voiceCount} szólam` : ''} ${score.year ? `• ${score.year}` : ''}`.trim();

                const variation = {
                    id: uniqueId(`${book.id}_${score.id}`),
                    name: score.name || book.title,
                    xmlUrl: resolveBookUrl(score.xmlUrl, book.folder),
                    voiceCount: score.voiceCount,
                    composer: details,
                    year: score.year || book.year
                };
                
                if (score.type === 'prelude') {
                    grouped[linkId].preludes.push(variation);
                } else {
                    grouped[linkId].variations.push(variation);
                }
                
                if (score.preludes && Array.isArray(score.preludes)) {
                     grouped[linkId].preludes.push(...score.preludes.map(p => ({
                         ...p,
                         id: uniqueId(`${book.id}_${score.id}_pre_${p.id}`),
                         xmlUrl: resolveBookUrl(p.xmlUrl, book.folder),
                         composer: p.composer || details
                     })));
                }
            });

            (book.preludes || []).forEach(prelude => {
                const linkId = (prelude.scoreId || prelude.hymnId || prelude.id || "").toString();
                if (!linkId) return;

                if (!grouped[linkId]) {
                    grouped[linkId] = {
                        id: linkId,
                        variations: [],
                        preludes: []
                    };
                }

                const composerName = prelude.composer || book.author || '';
                const details = `${composerName} ${prelude.year ? `• ${prelude.year}` : ''}`.trim();

                const preludeItem = {
                    id: uniqueId(`${book.id}_pre_${prelude.id}`),
                    name: prelude.name || book.title,
                    xmlUrl: resolveBookUrl(prelude.xmlUrl, book.folder),
                    composer: details,
                    year: prelude.year || book.year
                };

                grouped[linkId].preludes.push(preludeItem);
            });
        });
        
        return Object.values(grouped);
    }, [scorebooks, settings.bookActive]);

    // Save persistence (a kezdőállapot már a tárolt adat, így nem írunk felül semmit)
    useEffect(() => { saveJSON(STORAGE_KEYS.playlists, playlists); }, [playlists]);
    useEffect(() => { saveJSON(STORAGE_KEYS.settings, settings); }, [settings]);

    // Származtatott adatok
    const hymnByNumber = useMemo(() => new Map(hymnBook.map(h => [String(h.number), h])), [hymnBook]);
    const selectedHymn = selectedHymnNumber != null ? hymnByNumber.get(String(selectedHymnNumber)) || null : null;

    const resolveItem = (item) => ({
        ...item,
        hymn: hymnByNumber.get(String(item.hymnNumber)) || { number: item.hymnNumber, title: 'Ismeretlen ének', verses: [], scoreId: null }
    });

    const selectedPlaylist = useMemo(() => {
        const pl = playlists.find(p => sameId(p.id, selectedPlaylistId));
        return pl ? { ...pl, items: pl.items.map(resolveItem) } : null;
    }, [playlists, selectedPlaylistId, hymnByNumber]);

    const playerQueue = useMemo(() => {
        const pl = playlists.find(p => sameId(p.id, playingPlaylistId));
        return pl ? pl.items.map(resolveItem) : [];
    }, [playlists, playingPlaylistId, hymnByNumber]);
    const currentPlayerIndex = Math.min(playerIndex, Math.max(playerQueue.length - 1, 0));
    const playerItem = playerQueue[currentPlayerIndex] || null;

    // Ha egy nézethez hiányzik az adat (pl. törölt lista), üres képernyő helyett a listákra esünk vissza
    let view = activeTab;
    if (view === 'playlist_editor' && !selectedPlaylist) view = 'playlists';
    if (view === 'player' && playerQueue.length === 0) view = 'playlists';

    // Apply Themes
    // A Pergamen színei a style.css-ben vannak (--pergamen-*), a további szerepeit a .theme-pergamen osztály adja
    const themeColors = {
        'pergamen': { bg: 'var(--pergamen-bg)', text: 'var(--pergamen-ink)', sidebar: 'var(--pergamen-teal-dark)', accent: 'var(--pergamen-gold)', accentText: 'var(--pergamen-gold-text)' },
        'papyrus': { bg: '#FDF6E3', text: '#2a2a2a', sidebar: '#002B36', accent: '#B58900', accentText: '#8a6800' },
        'dark-papyrus': { bg: '#d4cebc', text: '#1a1a1a', sidebar: '#001e26', accent: '#8a6800', accentText: '#6b5000' },
        'white': { bg: '#f9fafb', text: '#111827', sidebar: '#1f2937', accent: '#2563eb', accentText: '#2563eb' }
    };
    const themeName = themeColors[settings.theme] ? settings.theme : 'pergamen';
    const currentTheme = themeColors[themeName];

    // A betöltő képernyő és a böngésző „túlgörgetett” széle is a téma színét kapja
    useEffect(() => { document.body.style.backgroundColor = currentTheme.sidebar; }, [currentTheme.sidebar]);
    useEffect(() => { document.documentElement.style.setProperty('--font-ui', uiFontStack(settings.uiFont)); }, [settings.uiFont]);
    useEffect(() => { document.documentElement.style.setProperty('--font-serif', serifFontStack(settings.serifFont)); }, [settings.serifFont]);

    // Énekváltáskor az első változat, előjáték nélkül. Ha csak a könyvek változtak (pl. letöltés a háttérben),
    // a választás megmarad, amíg létezik.
    const lastHymnNumberRef = useRef(null);
    useEffect(() => {
        if (!selectedHymn) return;
        const score = getScoreById(selectedHymn.scoreId);
        const variations = score ? score.variations : [];
        const preludes = score ? score.preludes : [];
        const hymnChanged = lastHymnNumberRef.current !== selectedHymn.number;
        lastHymnNumberRef.current = selectedHymn.number;
        setCurrentVariationId(prev => !hymnChanged && variations.some(v => v.id === prev) ? prev : (variations.length > 0 ? variations[0].id : null));
        setCurrentPreludeId(prev => !hymnChanged && preludes.some(p => p.id === prev) ? prev : null);
    }, [selectedHymn, activeScores]);

    const getScoreById = (scoreId) => {
        if (!scoreId) return null;
        return activeScores.find(s => s.id.toString() === scoreId.toString()) || null;
    };
    const getScoreInfo = (scoreId, varId, preId) => {
        const score = getScoreById(scoreId);
        if(!score) return { variationName: '?', variationComposer: '?', preludeName: null };
        const variation = score.variations ? score.variations.find(v => v.id === varId) : null;
        const prelude = score.preludes ? score.preludes.find(p => p.id === preId) : null;
        return { 
            variationName: variation ? variation.name : '?', 
            variationComposer: variation?.composer,
            preludeName: prelude ? prelude.name : null
        };
    }
    
    const searchIndex = useMemo(() => buildSearchIndex(hymnBook), [hymnBook]);
    const filteredHymns = useMemo(() => {
        const found = searchHymns(searchIndex, searchQuery);
        return keywordFilter ? found.filter(h => hymnKeywords(h).includes(keywordFilter)) : found;
    }, [searchIndex, searchQuery, keywordFilter]);
    // A szűrő kulcsszavai ábécérendben, az énekek számával
    const keywordOptions = useMemo(() => {
        const counts = new Map();
        hymnBook.forEach(h => hymnKeywords(h).forEach(k => counts.set(k, (counts.get(k) || 0) + 1)));
        return [...counts].sort((a, b) => a[0].localeCompare(b[0], 'hu'));
    }, [hymnBook]);
    // Énekenként a letétek és az előjátékok száma (a használható, bekapcsolt könyvekből)
    const scoreCounts = useMemo(() => {
        const counts = new Map();
        activeScores.forEach(s => counts.set(String(s.id), { variations: (s.variations || []).length, preludes: (s.preludes || []).length }));
        return counts;
    }, [activeScores]);

    const closeFullscreenModal = (dontAsk) => {
        setIsFullscreenModalOpen(false);
        if (dontAsk) setSettings(prev => ({ ...prev, skipFullscreenPrompt: true }));
    };

    // Handlers (minden módosítás csak a playlists állapotot írja, a nézetek ebből számolnak)
    const handleCreatePlaylist = (name) => {
        setPlaylists(prev => [...prev, { id: Date.now(), name, items: [] }]);
        setIsCreateListModalOpen(false);
    };

    const handleAddToPlaylist = ({ playlistId, newPlaylistName, variationId, preludeId, verses }) => {
        const hymn = pendingHymnToAdd || selectedHymn;
        if (!hymn) return;
        const item = { id: newItemId(), hymnNumber: String(hymn.number), variationId, preludeId, verses };
        if (newPlaylistName) setPlaylists(prev => [...prev, { id: Date.now(), name: newPlaylistName, items: [item] }]);
        else setPlaylists(prev => prev.map(p => sameId(p.id, playlistId) ? { ...p, items: [...p.items, item] } : p));
        setIsAddModalOpen(false);
        setPendingHymnToAdd(null);
    };

    const confirmDeleteItem = () => {
        if (!itemToDelete) return;
        const { playlistId, itemId } = itemToDelete;
        setPlaylists(prev => prev.map(p => sameId(p.id, playlistId) ? { ...p, items: p.items.filter(it => it.id !== itemId) } : p));
        setItemToDelete(null);
    };

    const confirmDeletePlaylist = () => { if (!playlistToDelete) return; setPlaylists(prev => prev.filter(p => !sameId(p.id, playlistToDelete.id))); setPlaylistToDelete(null); }
    const handleRemoveItemRequest = (playlistId, itemId) => { setItemToDelete({ playlistId, itemId }); };
    const handleRemovePlaylistRequest = (playlist) => { setPlaylistToDelete(playlist); }
    const handleReorderPlaylist = (fromIndex, toIndex) => {
        setPlaylists(prev => prev.map(p => {
            if (!sameId(p.id, selectedPlaylistId)) return p;
            const items = [...p.items];
            const [movedItem] = items.splice(fromIndex, 1);
            items.splice(toIndex, 0, movedItem);
            return { ...p, items };
        }));
    };

    const startPlaylist = (pl) => {
        if(!pl.items.length) { setAlertMessage("Ez a lista üres, nem lehet elindítani."); return; }
        navigate({ activeTab: 'player', playingPlaylistId: pl.id, playerIndex: 0 });
    };

    const openPlaylistEditor = (pl) => navigate({ activeTab: 'playlist_editor', selectedPlaylistId: pl.id });
    const handleAddHymnToEditor = () => { setIsHymnSelectorOpen(true); };
    // Gyors megnyitás a lejátszóból: az ének oldala nyílik meg; a vissza gomb a lejátszóba visz, ugyanoda
    const handleQuickOpen = (hymn) => {
        setIsQuickOpenOpen(false);
        navigate({ activeTab: 'library', selectedHymnNumber: hymn.number });
    };
    const handleHymnSelected = (hymn) => {
        setIsHymnSelectorOpen(false);
        setPendingHymnToAdd(hymn);
        setTargetPlaylistId(selectedPlaylistId);
        setTimeout(() => setIsAddModalOpen(true), 100);
    };

    if (loading) return <div className="loading-screen" style={{backgroundColor: currentTheme.sidebar}}>Betöltés...</div>;
    
    // --- RENDER ---
    return (
        <div className={`app-root theme-${themeName}`} style={{ '--col-papyrus': currentTheme.bg, '--col-ink': currentTheme.text, '--col-galaxy-blue': currentTheme.sidebar, '--col-accent': currentTheme.accent, '--col-accent-text': currentTheme.accentText }}>
            <NavigationSidebar
                activeTab={view}
                onTabChange={(t) => navigate({ activeTab: t })}
                menuSide={settings.sidebarSide}
                toggleFullScreen={FULLSCREEN_SUPPORTED ? toggleFullScreen : null} 
            />
            
            <div className="main-content">
                {/* Modals */}
                <AlertModal isOpen={!!alertMessage} onClose={() => setAlertMessage(null)} message={alertMessage} />
                <FullscreenModal 
                    isOpen={isFullscreenModalOpen} 
                    onClose={closeFullscreenModal} 
                    onConfirm={(dontAsk) => {
                        toggleFullScreen();
                        closeFullscreenModal(dontAsk);
                    }} 
                />
                <CreatePlaylistModal isOpen={isCreateListModalOpen} onClose={() => setIsCreateListModalOpen(false)} onConfirm={handleCreatePlaylist} />
                <HymnSelectorModal isOpen={isHymnSelectorOpen} onClose={() => setIsHymnSelectorOpen(false)} onSelect={handleHymnSelected} hymnBook={hymnBook} />
                <HymnSelectorModal isOpen={isQuickOpenOpen} onClose={() => setIsQuickOpenOpen(false)} onSelect={handleQuickOpen} hymnBook={hymnBook} title="Gyors megnyitás" action="megnyitása" ItemIcon={Icons.ChevronRight} />
                <DeleteConfirmModal isOpen={!!itemToDelete} onClose={() => setItemToDelete(null)} onConfirm={confirmDeleteItem} title="Ének törlése" message="Biztosan el szeretnéd távolítani ezt az éneket a listáról?" />
                <DeleteConfirmModal isOpen={!!playlistToDelete} onClose={() => setPlaylistToDelete(null)} onConfirm={confirmDeletePlaylist} title="Lista törlése" message={`Biztosan törölni szeretnéd a(z) "${playlistToDelete?.name}" listát?`} />
                <DeleteConfirmModal isOpen={!!bookToDelete} onClose={() => setBookToDelete(null)} onConfirm={confirmDeleteBook} title="Letöltött könyv törlése" message={`A(z) „${bookToDelete?.title}” kottái törlődnek erről a készülékről, és addig nem jelennek meg, amíg újra le nem töltöd.`} />
                
                {isAddModalOpen && (pendingHymnToAdd || selectedHymn) && (
                    <AddToPlaylistModal 
                        onClose={() => setIsAddModalOpen(false)} 
                        onConfirm={handleAddToPlaylist} 
                        playlists={playlists}
                        initialVariationId={pendingHymnToAdd ? null : currentVariationId}
                        initialPreludeId={pendingHymnToAdd ? null : currentPreludeId}
                        lockPlaylistId={targetPlaylistId} 
                        hymn={pendingHymnToAdd || selectedHymn} 
                        variations={getScoreById((pendingHymnToAdd || selectedHymn).scoreId)?.variations || []}
                        preludes={getScoreById((pendingHymnToAdd || selectedHymn).scoreId)?.preludes || []}
                    />
                )}

                {/* Content Views */}
                {view === 'settings' && <SettingsView settings={settings} onUpdateSettings={setSettings} />}

                {view === 'about' && (
                    <div className="about-view">
                        <div className="icon-container"><Icons.Music size={40}/></div>
                        <h1 className="page-title text-3xl text-galaxy mb-2">Református Kottagyűjtemény</h1>
                        <p className="text-accent uppercase font-bold tracking-widest mb-8">Fazekas Márton</p>
                         <div className="content-box">
                            <p>Református énekek orgonakíséretei, a 2021-es énekeskönyvhöz igazítva. Több korálkönyvből válogattam, elsősorban saját használatra - így számos kíséret kimaradt, például a "művészi" B letétek a genfi korálkönyvből.</p>
                        </div>
                        <p className="about-credits">
                            A kottákat a <a href="https://www.verovio.org" target="_blank" rel="noopener noreferrer">Verovio</a> rajzolja
                            (LGPL-3.0 licenc, <a href={`https://github.com/rism-digital/verovio/tree/version-${VEROVIO_VERSION}`} target="_blank" rel="noopener noreferrer">forráskód</a>).
                        </p>
                    </div>
                )}

                {view === 'playlist_editor' && <PlaylistEditor playlist={selectedPlaylist} onRemoveItem={(itemId) => handleRemoveItemRequest(selectedPlaylist.id, itemId)} onAddItem={handleAddHymnToEditor} onPlay={startPlaylist} onReorder={handleReorderPlaylist} getScoreInfo={getScoreInfo} />}

                {view === 'library' && (selectedHymn ? (
                    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                        <div className="header hymn-header">
                            {/* Left: Number + Title */}
                            <div className="hymn-header-title">
                                <button onClick={() => window.history.back()} className="header-back" title="Vissza"><Icons.ChevronLeft size={24}/></button>
                                <div className="hymn-header-text">
                                    <h2 className="hymn-number text-2xl text-accent">{selectedHymn.number}</h2>
                                    <h3 className="font-bold text-lg truncate">{selectedHymn.title}</h3>
                                </div>
                            </div>
                            
                            {/* Right: Selectors */}
                            <div className="hymn-header-actions">
                                {(() => { 
                                    const score = getScoreById(selectedHymn.scoreId); 
                                    if(!score) return null;
                                    return (
                                        <>
                                            <CustomSelect items={score.preludes} currentId={currentPreludeId} onChange={setCurrentPreludeId} placeholder="Előjáték választása" emptyText="Nincs előjáték" width="160px" />
                                            <CustomSelect items={score.variations} currentId={currentVariationId} onChange={setCurrentVariationId} placeholder="Változat választása" width="180px" />
                                            <button onClick={() => { setTargetPlaylistId(null); setPendingHymnToAdd(null); setIsAddModalOpen(true); }} className="btn btn-primary" title="Hozzáadás listához"><Icons.Plus size={20} /></button>
                                        </>
                                    ); 
                                })()}
                            </div>
                        </div>
                        <div style={{flex:1, overflow:'hidden'}}>
                            <ScoreViewer score={getScoreById(selectedHymn.scoreId)} variationId={currentVariationId} preludeId={currentPreludeId} lyrics={lyricsOf(selectedHymn)} showLyrics={settings.showLyrics} lyricsWidth={settings.lyricsWidth} scoreMaxWidth={settings.scoreMaxWidth} scoreFont={settings.scoreFont}/>
                        </div>
                    </div>
                ) : (
                    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                        <div className="header centered">
                            <h1 className="header-title main page-title">Református Kottagyűjtemény</h1>
                        </div>
                        <div className="library-toolbar">
                            <div className="library-search">
                                <Icons.Search className="library-search-icon" size={20}/>
                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && filteredHymns.length > 0) navigate({ activeTab: 'library', selectedHymnNumber: filteredHymns[0].number }); }} placeholder="Keresés számra, címre vagy szövegre..." className="input"/>
                            </div>
                            <select className={`input library-keyword${keywordFilter ? ' active' : ''}`} value={keywordFilter} onChange={(e) => setKeywordFilter(e.target.value)} aria-label="Szűrés kulcsszóra">
                                <option value="">Minden kulcsszó</option>
                                {keywordOptions.map(([keyword, count]) => <option key={keyword} value={keyword}>{keyword} ({count})</option>)}
                            </select>
                        </div>
                        <div style={{flex:1, overflowY:'auto', padding:'1rem'}}>
                            {(keywordFilter || searchQuery.trim()) && (
                                <div className="library-result-count">
                                    {filteredHymns.length} ének
                                    {keywordFilter && <button type="button" className="btn-ghost library-clear" onClick={() => setKeywordFilter('')}>Szűrés törlése</button>}
                                </div>
                            )}
                            {filteredHymns.map(h => {
                                const counts = scoreCounts.get(String(h.scoreId ?? h.number)) || { variations: 0, preludes: 0 };
                                return (
                                    <div key={h.number} onClick={() => navigate({ activeTab: 'library', selectedHymnNumber: h.number })} className="card list-item hymn-card">
                                        <div className="card-decoration"></div>
                                        <div className="hymn-card-head">
                                            <span className="hymn-card-number hymn-number text-accent">{h.number}</span>
                                            <span className="hymn-card-title text-ink">{h.title}</span>
                                        </div>
                                        {/* jobbra zárva: a kották száma, alatta a kulcsszavak (koppintásra szűrnek) */}
                                        <div className="hymn-card-meta">
                                            {counts.variations || counts.preludes
                                                ? <span className="hymn-card-counts">{counts.variations} letét · {counts.preludes} előjáték</span>
                                                : <span className="hymn-card-counts none">nincs kotta</span>}
                                            <span className="hymn-card-keywords">
                                                {hymnKeywords(h).map((keyword, i) => (
                                                    <React.Fragment key={keyword}>
                                                        {i > 0 && ', '}
                                                        <button type="button" className={`keyword-link${keyword === keywordFilter ? ' active' : ''}`}
                                                            title={keyword === keywordFilter ? 'Szűrés törlése' : `Szűrés: ${keyword}`}
                                                            onClick={(e) => { e.stopPropagation(); setKeywordFilter(keyword === keywordFilter ? '' : keyword); }}>
                                                            {keyword}
                                                        </button>
                                                    </React.Fragment>
                                                ))}
                                            </span>
                                        </div>
                                        <Icons.ChevronRight className="hymn-card-chevron"/>
                                    </div>
                                );
                            })}
                            {filteredHymns.length === 0 && <p className="library-empty">Nincs a keresésnek megfelelő ének.</p>}
                        </div>
                    </div>
                ))}

                {view === 'playlists' && (
                    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                        <div className="header">
                            <div style={{flex:1}}></div>
                            <h1 className="header-title main page-title">Liturgikus listák</h1>
                            <div style={{flex:1, display:'flex', justifyContent:'flex-end'}}>
                                <button onClick={() => setIsCreateListModalOpen(true)} className="btn btn-primary"><Icons.Plus size={20}/> Új lista</button>
                            </div>
                        </div>
                        {playlists.length === 0 ? (
                            <div className="playlist-editor-empty">
                                <Icons.ListMusic size={64} className="icon"/>
                                <p>Még nincsenek listák</p>
                                <button onClick={() => setIsCreateListModalOpen(true)} className="text-accent font-bold hover:underline mt-2">Hozz létre egyet!</button>
                            </div>
                        ) : (
                            <div className="playlist-grid">
                                {playlists.map(pl => (
                                    <div key={pl.id} onClick={() => openPlaylistEditor(pl)} className="card clickable">
                                        <div className="card-decoration"></div>
                                        <div className="playlist-card-header">
                                            <h3 className="font-bold text-galaxy">{pl.name}</h3>
                                            <div className="flex gap-2">
                                                <button onClick={(e) => { e.stopPropagation(); openPlaylistEditor(pl); }} className="btn-ghost" title="Szerkesztés"><Icons.Edit size={18}/></button>
                                                <button onClick={(e) => { e.stopPropagation(); handleRemovePlaylistRequest(pl); }} className="btn-danger" title="Törlés"><Icons.Trash2 size={18}/></button>
                                            </div>
                                        </div>
                                        <div style={{flex:1, overflowY:'auto', padding:'0.5rem'}}>
                                            {pl.items.map(resolveItem).map((it, idx) => (<div key={it.id} className="playlist-card-item"><span className="text-accent font-bold">{idx+1}.</span><span className="hymn-number">{it.hymn.number}</span> <span>{it.hymn.title}</span></div>))}
                                        </div>
                                        <div style={{padding:'1rem', borderTop:'1px solid var(--col-border, #ddd)'}}>
                                            <button onClick={(e) => { e.stopPropagation(); startPlaylist(pl); }} className="btn playlist-card-start-btn"><Icons.Play /> INDÍTÁS</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {view === 'scorebooks' && (
                    <ScorebooksView books={books} downloads={downloads} bookActive={settings.bookActive} online={online}
                        onToggle={toggleBookActive} onDownload={startDownload} onCancel={cancelDownload} onDelete={setBookToDelete} />
                )}

                
                {view === 'player' && playerItem && (
                    <div className="player-view">
                        <div className="header">
                            <div style={{display:'flex', alignItems:'center', gap:'12px', flex:1, minWidth:0}}>
                                <button onClick={() => window.history.back()} className="btn-ghost" style={{color:'var(--col-ink)', padding:0}}><Icons.ChevronLeft size={24} /></button>
                                <div className="player-heading">
                                    {/* sorszám, énekszám és cím egy sorban (a cím szükség esetén rövidül); a változat adatai
                                        keskeny kijelzőn a második sorba kerülnek */}
                                    <div className="player-heading-main">
                                        <span className="player-position" title="Hányadik ének a listában">{currentPlayerIndex+1}/{playerQueue.length}</span>
                                        <span className="player-position-sep">–</span>
                                        <h2 className="hymn-number text-2xl text-accent">{playerItem.hymn.number}</h2>
                                        <h3 className="font-bold text-lg truncate">{playerItem.hymn.title}</h3>
                                    </div>
                                    {/* A változat adatai (szükség esetén rövidülnek) */}
                                    {(() => {
                                        const { variationName, variationComposer, preludeName } = getScoreInfo(playerItem.hymn.scoreId, playerItem.variationId, playerItem.preludeId);
                                        return <div className="player-heading-info text-xs opacity-70 border-l border-gray-500 pl-3 ml-2">
                                            {preludeName && <><span className="font-bold text-accent">[{preludeName}]</span>{' '}</>}
                                            <span>{variationName}</span>
                                            <span style={{fontStyle:'italic'}}> - {variationComposer}</span>
                                        </div>;
                                    })()}
                                </div>
                            </div>

                            <div className="player-header-actions">
                                <button className="player-quick-open" onClick={() => setIsQuickOpenOpen(true)} title="Gyors megnyitás énekszám alapján" aria-label="Gyors megnyitás"><Icons.Dialpad size={24}/></button>
                                {settings.showClock && <PlayerClock />}
                            </div>
                        </div>

                        <div style={{flex:1, overflow:'hidden', position:'relative'}}>
                            <ScoreViewer
                                score={getScoreById(playerItem.hymn.scoreId)}
                                variationId={playerItem.variationId}
                                preludeId={playerItem.preludeId}
                                lyrics={lyricsOf(playerItem.hymn, playerItem.verses)}
                                showLyrics={settings.showLyrics}
                                lyricsWidth={settings.lyricsWidth}
                                scoreMaxWidth={settings.scoreMaxWidth}
                                scoreFont={settings.scoreFont}
                                onNext={currentPlayerIndex < playerQueue.length - 1 ? () => goToPlayerIndex(currentPlayerIndex + 1) : null}
                                onPrev={currentPlayerIndex > 0 ? () => goToPlayerIndex(currentPlayerIndex - 1) : null}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// A kottarajzoló betöltése rögtön indul (a háttérben), hogy az első kotta megnyitásakor már kész legyen
loadVerovio().catch(err => console.info(err.message));

// Offline működés: a service worker (sw.js) az oldalt és a letöltött kottákat internet nélkül is kiszolgálja.
// Az oldal betöltése után indul: az első látogatáskor a fájlokat (köztük a nagy kottarajzolót) így a böngésző már
// letöltött példányából menti, nem tölti le újra.
if ('serviceWorker' in navigator && window.isSecureContext) {
    const registerServiceWorker = () => navigator.serviceWorker.register('sw.js')
        .catch(err => console.info('A service worker nem indult el:', err.message));
    if (document.readyState === 'complete') registerServiceWorker();
    else window.addEventListener('load', registerServiceWorker);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<OrganistApp />);
