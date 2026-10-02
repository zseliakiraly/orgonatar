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
    Share: (props) => <IconBase {...props}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></IconBase>,
    Import: (props) => <IconBase {...props}><path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/></IconBase>,
    Copy: (props) => <IconBase {...props}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></IconBase>,
    Mail: (props) => <IconBase {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></IconBase>,
    Download: (props) => <IconBase {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></IconBase>,
    Send: (props) => <IconBase {...props}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></IconBase>,
    Camera: (props) => <IconBase {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></IconBase>,
    File: (props) => <IconBase {...props}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></IconBase>,
    Check: (props) => <IconBase {...props}><polyline points="20 6 9 17 4 12"/></IconBase>,
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

// A kiválasztott versszakok tömören, 1-től számozva: az egymást követők intervallumként, a többi felsorolva
// ([0,1,2,4] → "1-3,5"; [0,3] → "1,4"); és vissza ("1-3,5" → [0,1,2,4], a hibás részeket kihagyja)
const formatVerses = (indices) => {
    const nums = [...new Set((indices || []).filter(i => Number.isInteger(i) && i >= 0))].sort((a, b) => a - b).map(i => i + 1);
    const parts = [];
    for (let i = 0; i < nums.length; i++) {
        let j = i;
        while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) j++;
        parts.push(j > i ? `${nums[i]}-${nums[j]}` : String(nums[i]));
        i = j;
    }
    return parts.join(',');
};
const MAX_VERSE = 200;
const parseVerses = (text) => {
    const out = new Set();
    for (const [, a, b] of String(text || '').matchAll(/(\d+)(?:-(\d+))?/g)) {
        const from = +a, to = b ? +b : +a;
        if (from < 1 || to < from || to > MAX_VERSE) continue;
        for (let n = from; n <= to; n++) out.add(n - 1);
    }
    return [...out].sort((x, y) => x - y);
};

// --- TÁROLÁS (localStorage) ---
const STORAGE_KEYS = { playlists: 'orgonista_playlists', settings: 'orgonista_settings', lyricsLayouts: 'orgonista_lyrics_layouts' };

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

// Színsémák: háttér, szöveg, oldalsáv, akcentus. A Pergamen színei a style.css-ben vannak (--pergamen-*), a további
// szerepeit a .theme-pergamen osztály adja; az első az alapértelmezett.
const THEMES = [
    { id: 'pergamen', name: 'Pergamen', bg: 'var(--pergamen-bg)', text: 'var(--pergamen-ink)', sidebar: 'var(--pergamen-teal-dark)', accent: 'var(--pergamen-gold)', accentText: 'var(--pergamen-gold-text)' },
    { id: 'papyrus', name: 'Papirusz', bg: '#FDF6E3', text: '#2a2a2a', sidebar: '#002B36', accent: '#B58900', accentText: '#8a6800' },
    { id: 'dark-papyrus', name: 'Sötét papirusz', bg: '#d4cebc', text: '#1a1a1a', sidebar: '#001e26', accent: '#8a6800', accentText: '#6b5000' },
    { id: 'white', name: 'Törtfehér', bg: '#f9fafb', text: '#111827', sidebar: '#1f2937', accent: '#2563eb', accentText: '#2563eb' }
];
// Háttér: egyszínű, nagyon enyhe átmenet (belül vagy a szélek felé sötétebb), textúra (a világos felületeken papír,
// a türkiz oldalsávon, fejlécen és gombokon bőrkötés). Az .app-root bg-* osztálya; a megvalósítás a style.css-ben.
const BACKGROUNDS = [
    { id: 'plain', name: 'Egyszínű' },
    { id: 'center', name: 'Átmenet – közép', hint: 'belül kissé sötétebb' },
    { id: 'edges', name: 'Átmenet – szélek', hint: 'a szélek felé sötétebb' },
    { id: 'texture', name: 'Textúra', hint: 'papír, a türkiz elemeken bőrkötés' }
];
const SCORE_WIDTHS = ['100%', '90%', '80%', '70%', '60%', '50%'].map(w => ({ id: w, name: w }));

const DEFAULT_SETTINGS = { theme: 'pergamen', background: 'plain', uiFont: UI_FONTS[0].id, serifFont: SERIF_FONTS[0].id, showLyrics: true, showClock: true, sidebarSide: 'right', lyricsWidth: '15%', scoreMaxWidth: '100%', scoreFont: SCORE_FONTS[0].id, bookActive: {}, skipFullscreenPrompt: false, settingsVersion: SETTINGS_VERSION };

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
    if (!BACKGROUNDS.some(b => b.id === settings.background)) settings.background = DEFAULT_SETTINGS.background;
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

// A program logója (orgonatar-logo.svg: három orgonasíp és három kottakönyv a polcon), a téma színével (currentColor).
// A kis méretű változatok (böngészőfül, kezdőképernyő) vastagabb vonallal az icons/ mappában vannak.
const LogoBookLines = () => (
    <><path d="m 156.99252,53.753505 h 9.42806"/><path d="m 156.99252,57.243044 h 9.42806"/><path d="m 156.99252,60.732583 h 9.42806"/></>
);
const Logo = ({ className = '' }) => (
    <svg className={className} viewBox="-2 -2 138.83 117.19" role="img" aria-label="Református OrgonaTár logója">
        <g fill="none" stroke="currentColor" strokeWidth="1.25">
            <path d="M 11.665256,96.89102 V 26.891019 h 15 V 96.89102 m 0,0 -7.74406,13.71858 -7.25594,-13.71858"/>
            <path d="M 26.665256,96.89102 V 15.330814 h 15.13162 V 96.89102 m 0,0 -7.41596,13.94826 -7.71566,-13.94826"/>
            <path d="M 41.796876,96.89102 V 1.6203879 h 14.75924 V 96.89102 m 0,0 -6.96932,13.94826 -7.78992,-13.94826"/>
            <g strokeWidth="3"><path d="m 16.157066,96.79998 h 6.01639"/><path d="m 31.162686,96.79998 h 6.01638"/><path d="m 46.288676,96.79998 h 6.01639"/></g>
            <g transform="translate(0,1.0844793)">
                <rect x="59.014545" y="13.173469" width="18.714531" height="96.014175" rx="1.4971626"/>
                <g transform="translate(-93.334744,-33.10883)" strokeWidth="1.8"><LogoBookLines/></g>
            </g>
            <g transform="translate(-1.6267189,0.94891939)">
                <rect x="79.430588" y="26.740086" width="19.591698" height="82.574493" rx="1.5673356"/>
                <g transform="matrix(1.3045127,0,0,1,-121.72181,-19.011521)" strokeWidth="1.35"><LogoBookLines/></g>
            </g>
            <g transform="translate(-3.8644401,0.81335948)">
                <rect x="97.204147" y="47.691582" width="16.321545" height="72.106903" rx="1.3057234" strokeLinecap="round" strokeLinejoin="round"
                    transform="matrix(0.99537042,-0.09611313,0.0952079,0.99545741,0,0)"/>
                <g transform="rotate(-5.4418803,58.771014,590.97334)" strokeWidth="1.95"><LogoBookLines/></g>
            </g>
            <line x1="1.348415" y1="111.84411" x2="133.47885" y2="111.84411" strokeWidth="3"/>
        </g>
    </svg>
);

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

// placement="upper": a felső harmadban (nem középen), hogy a tablet képernyő-billentyűzete ne takarja ki az alját
const Modal = ({ title, onClose, children, footer, maxWidth, placement }) => (
    <div className={`modal-overlay${placement === 'upper' ? ' upper' : ''}`}>
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
                        <ClearableInput inputRef={inputRef} type="text" className="input search" placeholder="Keresés számra, címre vagy szövegre..." value={search} onClear={() => setSearch('')} onChange={e => setSearch(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') confirm(); }} />
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

// Szövegmező a jobb szélén törlőgombbal (X), ha van benne szöveg. A gomb nem veszi el a fókuszt: ha a mezőben
// gépeltek (nyitva a képernyő-billentyűzet), a fókusz ott marad; ha nem, a billentyűzet nem ugrik fel tőle.
const ClearableInput = ({ value, onClear, inputRef, ...props }) => (
    <span className="clearable">
        <input ref={inputRef} value={value} {...props} />
        {value && (
            <button type="button" className="input-clear" onMouseDown={e => e.preventDefault()} onClick={onClear}
                title="Törlés" aria-label="Szöveg törlése">
                <Icons.X size={18}/>
            </button>
        )}
    </span>
);

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
            <ClearableInput inputRef={textRef} type="text" className="input" placeholder={placeholder} value={value} onClear={() => onChange('')}
                onChange={e => onChange(e.target.value)} onKeyDown={e => e.key === 'Enter' && onEnter && onEnter()} />
        </div>
    );
};

// A lista nevének megadása: új lista vagy átnevezés. A név elé naptárral dátum tehető, a mező X-szel törölhető.
const PlaylistNameModal = ({ isOpen, title, initialName = '', confirmLabel, onClose, onConfirm }) => {
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
        if (!isOpen) return;
        setName(initialName);
        const timer = setTimeout(() => {
            const el = inputRef.current;
            if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
        }, 100);
        return () => clearTimeout(timer);
    }, [isOpen]);
    if (!isOpen) return null;
    const confirm = () => { if (name.trim()) onConfirm(name.trim()); };

    return (
        <Modal title={title} onClose={onClose} placement="upper" footer={
            <>
                <button onClick={onClose} className="btn">Mégse</button>
                <button onClick={confirm} disabled={!name.trim()} className="btn btn-primary">{confirmLabel}</button>
            </>
        }>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Lista neve</label>
                <ListNameInput inputRef={inputRef} placeholder="pl. 2026-10-04 Vasárnapi istentisztelet" value={name} onChange={setName} onEnter={confirm} />
            </div>
        </Modal>
    );
};
const CreatePlaylistModal = (props) => <PlaylistNameModal {...props} title="Új lista létrehozása" confirmLabel="Létrehozás" />;

// --- LISTÁK MEGOSZTÁSA ÉS IMPORTÁLÁSA ---
// Egy lista egyetlen, szóköz nélküli karakterláncban (kód): OT1:<énekek száma>:<név>;<ének>;<ének>…, ahol egy ének
// <énekszám>:<letét>:<előjáték>:<versszakok> (a végéről az üres mezők elmaradnak), pl.
// OT1:2:2026-10-04+Vasárnapi+istentisztelet;42:gk_s42::1-3,5;90. A névben és az azonosítókban a betűk (az ékezetesek
// is), a számjegyek és a - _ . ~ , jelek maradnak, a szóköz „+”, minden más %XX (UTF-8; így bennük nem lehet „:” és
// „;”), a versszakok tömören („1-3,5”). Ugyanez a kód van a megosztási linkben (…#import=<kód>, csupa ASCII-jellel) és
// a QR-kódban is: a telefon kamerája a linket felismeri, és megnyitja vele a programot az importálással.
const LIST_CODE_MAX_ITEMS = 300;
const LIST_CODE_CHARS = /^[\p{L}\p{M}\p{N}\-_.~,+%:;]*/u; // a kód karakterei (minden más a kódon kívül van)
const encodeCodeField = (v) => Array.from(v == null ? '' : String(v), c => c === ' ' ? '+'
    : /[\p{L}\p{M}\p{N}\-_.~,]/u.test(c) ? c
    : Array.from(new TextEncoder().encode(c), b => `%${b.toString(16).toUpperCase().padStart(2, '0')}`).join('')).join('');
const decodeCodeField = (v) => { try { return decodeURIComponent(v.replace(/\+/g, ' ')); } catch (e) { return v; } };
const encodeListCode = (playlist) => {
    const items = playlist.items.map(it => {
        const fields = [encodeCodeField(it.hymnNumber), encodeCodeField(it.variationId), encodeCodeField(it.preludeId), formatVerses(it.verses)];
        while (fields.length > 1 && !fields[fields.length - 1]) fields.pop();
        return fields.join(':');
    });
    return [`OT1:${items.length}:${encodeCodeField(playlist.name)}`, ...items].join(';');
};
const parseListCode = (code) => {
    const parts = code.split(';');
    const head = parts[0].match(/^OT1:(\d+):(.*)$/);
    if (!head) return null;
    const count = +head[1];
    if (count > LIST_CODE_MAX_ITEMS || parts.length < count + 1) return null; // hiányos kód
    const items = [];
    for (let i = 1; i <= count; i++) {
        const [num = '', variation = '', prelude = '', verses = ''] = parts[i].split(':');
        if (!num) return null;
        items.push({ hymnNumber: decodeCodeField(num), variationId: decodeCodeField(variation) || null, preludeId: decodeCodeField(prelude) || null,
            verses: parseVerses((verses.match(/^[\d,-]*/) || [''])[0]) });
    }
    return { name: decodeCodeField(head[2]).trim().slice(0, 200), items };
};
// A kód kikeresése bármilyen szövegből (beillesztett kód vagy link, a mentett fájl, e-mail). Először egyben keressük
// (a link is kódolva érkezhet: OT1%3A…); ha a kód több sorra tördelődött, a szóközök és sortörések nélkül.
const decodeListCode = (text) => {
    const s = String(text || '');
    for (const [found] of s.matchAll(/OT1(?::|%3[Aa])\S*/g)) {
        let code = found;
        if (!code.startsWith('OT1:')) { try { code = decodeURIComponent(code); } catch (e) { continue; } }
        const list = parseListCode(code.match(LIST_CODE_CHARS)[0].replace(/[.,:;]+$/, ''));
        if (list) return list;
    }
    const at = s.indexOf('OT1:');
    return at < 0 ? null : parseListCode(s.slice(at).replace(/\s+/g, '').match(LIST_CODE_CHARS)[0]);
};
// a link csupa ASCII-jellel (az ékezetes betűk %XX-ként), hogy minden levelező és QR-olvasó egyben kezelje
const shareLinkOf = (code) => `${window.location.origin}${window.location.pathname}#import=${code.replace(/[^\x00-\x7F]/gu, c => encodeURIComponent(c))}`;
// Az e-mailbe és az üzenetbe: olvasható lista és a link; a mentett fájlba a kód is
const shareTextOf = (name, rows, link, code) => [
    `Református OrgonaTár – liturgikus lista: ${name}`,
    '',
    ...rows.map(r => `  ${r.number}${r.verses ? ` (${r.verses})` : ''}  ${r.title}`),
    '',
    'Megnyitás az OrgonaTárban:',
    link,
    '',
    ...(code
        ? ['Vagy a programban: Listák → Importálás, és ott illeszd be ezt a kódot (vagy a fenti linket), illetve nyisd meg ezt a fájlt:', code]
        : ['Vagy a programban: Listák → Importálás, és ott illeszd be a fenti linket.']),
    ''
].join('\n');
const safeFileName = (name) => (name.replace(/[\\/:*?"<>|\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim() || 'lista').slice(0, 80);

// Külső könyvtárak igény szerint (libs/qr): QR-kód rajzolása és – ha a böngésző nem ismeri fel magától – olvasása
const scriptPromises = new Map();
const loadScript = (src) => {
    if (!scriptPromises.has(src)) {
        scriptPromises.set(src, new Promise((resolve, reject) => {
            const el = document.createElement('script');
            el.src = src; el.async = true;
            el.onload = resolve;
            el.onerror = () => { scriptPromises.delete(src); reject(new Error(`Nem sikerült betölteni: ${src}`)); };
            document.head.appendChild(el);
        }));
    }
    return scriptPromises.get(src);
};
const loadQrGenerator = () => (window.qrcode ? Promise.resolve(window.qrcode) : loadScript('libs/qr/qrcode.min.js').then(() => window.qrcode));
const loadQrReader = () => (window.jsQR ? Promise.resolve(window.jsQR) : loadScript('libs/qr/jsQR.min.js').then(() => window.jsQR));
// A böngésző saját QR-felismerője (pl. androidos Chrome), ha van
const nativeQrDetector = async () => {
    try {
        if ('BarcodeDetector' in window && (await window.BarcodeDetector.getSupportedFormats()).includes('qr_code')) {
            return new window.BarcodeDetector({ formats: ['qr_code'] });
        }
    } catch (e) { /* nincs vagy nem működik: jsQR */ }
    return null;
};
// QR-kód felismerése egy képből (a kamera képkockájából vagy egy fényképből); a talált szöveg vagy null. A jsQR-nek
// a kép legfeljebb maxSize képpontosra kicsinyítve megy (a kamera képkockáinál a sebesség miatt).
const readQrFromSource = async (source, width, height, detector, canvas, maxSize = 1000) => {
    if (detector) {
        const codes = await detector.detect(source);
        return codes.length ? codes[0].rawValue : null;
    }
    const jsQR = await loadQrReader();
    const scale = Math.min(1, maxSize / Math.max(width, height));
    const w = Math.max(1, Math.round(width * scale)), h = Math.max(1, Math.round(height * scale));
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(source, 0, 0, w, h);
    const found = jsQR(ctx.getImageData(0, 0, w, h).data, w, h);
    return found ? found.data : null;
};
// Fénykép vagy képernyőkép: ha kicsinyítve nem található benne a QR-kód (pl. kicsi a képen), nagyobb felbontásban is
const readQrFromImage = async (img) => {
    const detector = await nativeQrDetector();
    const canvas = document.createElement('canvas');
    const found = await readQrFromSource(img, img.width, img.height, detector, canvas);
    if (found || detector || Math.max(img.width, img.height) <= 1000) return found;
    return readQrFromSource(img, img.width, img.height, null, canvas, 2400);
};

// QR-kód SVG-ben: fekete modulok fehér alapon, 4 modulnyi csendes zónával (így olvasható a legbiztosabban)
const QrCode = ({ text, className = '' }) => {
    const [qr, setQr] = useState(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        let active = true;
        loadQrGenerator().then(qrcode => {
            if (!active) return;
            const code = qrcode(0, 'M');
            code.addData(text);
            code.make();
            const n = code.getModuleCount();
            let d = '';
            for (let r = 0; r < n; r++) {
                for (let c = 0; c < n; c++) {
                    if (!code.isDark(r, c)) continue;
                    let len = 1;
                    while (c + len < n && code.isDark(r, c + len)) len++;
                    d += `M${c + 4} ${r + 4}h${len}v1h-${len}z`;
                    c += len - 1;
                }
            }
            setQr({ size: n + 8, d });
        }).catch(() => { if (active) setFailed(true); });
        return () => { active = false; };
    }, [text]);
    if (failed) return <div className={`qr-code qr-missing ${className}`}>A QR-kód most nem jeleníthető meg</div>;
    if (!qr) return <div className={`qr-code ${className}`} aria-busy="true" />;
    return (
        <svg className={`qr-code ${className}`} viewBox={`0 0 ${qr.size} ${qr.size}`} shapeRendering="crispEdges" role="img" aria-label="A lista QR-kódja">
            <rect width={qr.size} height={qr.size} fill="#fff"/>
            <path d={qr.d} fill="#000"/>
        </svg>
    );
};

// Kamera élőképe, amelyen a program QR-kódot keres (a hátlapi kamerával, ha van). A talált szöveget az onResult
// kapja; ha az false-t ad vissza (nem lista kódja), keres tovább.
const QrScanner = ({ onResult, onError }) => {
    const videoRef = useRef(null);
    const callbacks = useRef({});
    callbacks.current = { onResult, onError };
    useEffect(() => {
        let stream = null, stopped = false, timer = null;
        const canvas = document.createElement('canvas');
        (async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
                if (stopped) return;
                const video = videoRef.current;
                video.srcObject = stream;
                await video.play();
                const detector = await nativeQrDetector();
                if (!detector) await loadQrReader();
                const tick = async () => {
                    if (stopped) return;
                    let text = null;
                    try {
                        if (video.readyState >= 2 && video.videoWidth) text = await readQrFromSource(video, video.videoWidth, video.videoHeight, detector, canvas);
                    } catch (e) { /* egy képkocka hibája nem baj */ }
                    if (stopped) return;
                    if (text && callbacks.current.onResult(text) !== false) return;
                    timer = setTimeout(tick, 200);
                };
                tick();
            } catch (err) {
                if (!stopped) callbacks.current.onError(err);
            }
        })();
        return () => {
            stopped = true;
            clearTimeout(timer);
            if (stream) stream.getTracks().forEach(t => t.stop());
        };
    }, []);
    return <video ref={videoRef} className="qr-video" playsInline muted />;
};

// Megosztás: a lista kódja, QR-kódja (a megosztási linkkel), másolás, e-mail, mentés fájlba (és ha a készülék
// tudja: küldés más alkalmazással)
const ShareListModal = ({ playlist, rows, onClose }) => {
    const code = useMemo(() => encodeListCode(playlist), [playlist]);
    const link = shareLinkOf(code);
    const message = shareTextOf(playlist.name, rows, link);
    const [copied, setCopied] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const codeRef = useRef(null);
    useEffect(() => { if (!copied) return; const t = setTimeout(() => setCopied(false), 2000); return () => clearTimeout(t); }, [copied]);
    useEffect(() => {
        if (!zoomed) return;
        const onKey = (e) => { if (e.key === 'Escape') setZoomed(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [zoomed]);
    const copy = async () => {
        try { await navigator.clipboard.writeText(code); setCopied(true); return; } catch (e) { /* régebbi böngésző */ }
        const el = codeRef.current;
        el.focus(); el.select();
        try { if (document.execCommand('copy')) setCopied(true); } catch (e) { /* marad kijelölve, kézzel másolható */ }
    };
    const save = () => {
        const url = URL.createObjectURL(new Blob([shareTextOf(playlist.name, rows, link, code)], { type: 'text/plain;charset=utf-8' }));
        const a = document.createElement('a');
        a.href = url; a.download = `${safeFileName(playlist.name)}.txt`;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
    const subject = `OrgonaTár lista: ${playlist.name}`;
    const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    const canShare = typeof navigator.share === 'function';
    const sendOther = () => { navigator.share({ title: subject, text: message }).catch(() => {}); };

    return (
        <Modal title="Lista megosztása" onClose={onClose} maxWidth="760px" footer={<button onClick={onClose} className="btn">Bezárás</button>}>
            <div className="share-list">
                <div className="share-qr">
                    <button type="button" className="share-qr-btn" onClick={() => setZoomed(true)} title="Nagyítás" aria-label="A QR-kód nagyítása"><QrCode text={link} /></button>
                    <p className="share-hint">Egy másik eszköz kamerájával lefotózva megnyílik az importálás. Koppints rá a nagyításhoz.</p>
                </div>
                <div className="share-main">
                    <div className="share-name">{playlist.name}</div>
                    <div className="share-count">{playlist.items.length} ének</div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="share-code">A lista kódja</label>
                    <textarea id="share-code" ref={codeRef} className="input share-code" readOnly value={code} rows={4} onFocus={e => e.target.select()} />
                    <div className="share-actions">
                        <button onClick={copy} className="btn btn-primary">{copied ? <><Icons.Check size={18}/> Kimásolva</> : <><Icons.Copy size={18}/> Másolás</>}</button>
                        <a href={mailto} className="btn btn-outline"><Icons.Mail size={18}/> E-mail</a>
                        <button onClick={save} className="btn btn-outline"><Icons.Download size={18}/> Mentés</button>
                        {canShare && <button onClick={sendOther} className="btn btn-outline"><Icons.Send size={18}/> Küldés…</button>}
                    </div>
                    <p className="share-hint">Importálás egy másik eszközön: Listák → Importálás, és ott illeszd be a kódot, nyisd meg
                        a mentett fájlt, vagy olvasd be a QR-kódot a kamerával.</p>
                </div>
            </div>
            {zoomed && (
                <div className="qr-zoom" onClick={() => setZoomed(false)} role="dialog" aria-label="A lista QR-kódja nagyítva">
                    <QrCode text={link} />
                    <p>{playlist.name} – koppints a bezáráshoz</p>
                </div>
            )}
        </Modal>
    );
};

// Importálás: kód vagy link beillesztése, fájl megnyitása (a mentett szövegfájl vagy a QR-kódról készült kép), vagy
// a QR-kód beolvasása a kamerával. Előnézet után új listaként kerül a többi mellé.
const CAMERA_SUPPORTED = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.isSecureContext);
const ImportListModal = ({ initialText = '', hymnByNumber, scoresAvailable, onClose, onImport }) => {
    const [text, setText] = useState(initialText);
    const [name, setName] = useState(null);       // a felhasználó által átírt név (null: a kódban lévő)
    const [scanning, setScanning] = useState(false);
    const [message, setMessage] = useState(null); // { kind: 'error' | 'info', text }
    const fileRef = useRef(null);
    const decoded = useMemo(() => decodeListCode(text), [text]);
    const known = decoded ? decoded.items.filter(it => hymnByNumber.has(String(it.hymnNumber))) : [];
    const unknown = decoded ? decoded.items.filter(it => !hymnByNumber.has(String(it.hymnNumber))) : [];
    const missingScores = known.filter(it => !scoresAvailable(it)).length;
    const finalName = (name ?? (decoded ? decoded.name : '')).trim();
    const canImport = !!decoded && known.length > 0 && finalName.length > 0;

    // a kamera talált egy QR-kódot: ha egy lista kódja, kész; ha nem, keres tovább
    const accept = (value) => {
        if (!decodeListCode(value)) {
            const notList = 'Ez a QR-kód nem OrgonaTár lista.';
            setMessage(m => (m && m.text === notList ? m : { kind: 'error', text: notList }));
            return false;
        }
        setText(value); setName(null); setScanning(false);
        setMessage({ kind: 'info', text: 'A QR-kód beolvasva.' });
        return true;
    };
    const openFile = async (e) => {
        const file = e.target.files && e.target.files[0];
        e.target.value = '';
        if (!file) return;
        setMessage(null);
        try {
            if (file.type.startsWith('image/')) {
                // QR-kódról készült kép (fénykép, képernyőkép)
                const value = await readQrFromImage(await createImageBitmap(file));
                if (value && decodeListCode(value)) { setText(value); setName(null); }
                else setMessage({ kind: 'error', text: 'A képen nem található OrgonaTár lista QR-kódja.' });
            } else {
                const content = await file.text();
                if (decodeListCode(content)) { setText(content); setName(null); }
                else setMessage({ kind: 'error', text: 'A fájlban nem található OrgonaTár lista kódja.' });
            }
        } catch (err) {
            setMessage({ kind: 'error', text: 'A fájlt nem sikerült beolvasni.' });
        }
    };
    const cameraError = (err) => {
        setScanning(false);
        const reason = err && err.name;
        setMessage({ kind: 'error', text: reason === 'NotAllowedError' || reason === 'SecurityError'
            ? 'A kamera használata nincs engedélyezve. Engedélyezd a böngésző beállításaiban, vagy fotózd le a QR-kódot, és nyisd meg a képet.'
            : reason === 'NotFoundError' || reason === 'OverconstrainedError' ? 'Ezen az eszközön nem található kamera.'
            : 'A kamerát nem sikerült elindítani.' });
    };
    const doImport = () => { if (canImport) onImport(finalName, known); };

    return (
        <Modal title="Lista importálása" onClose={onClose} maxWidth="640px" placement="upper" footer={
            <>
                <button onClick={onClose} className="btn">Mégse</button>
                <button onClick={doImport} disabled={!canImport} className="btn btn-primary">Importálás</button>
            </>
        }>
            <div className="import-list">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1" htmlFor="import-code">Kód vagy link</label>
                <textarea id="import-code" className="input import-code" rows={3} value={text} placeholder="Illeszd be a lista kódját (OT1:…) vagy a megosztási linket"
                    onChange={e => { setText(e.target.value); setName(null); setMessage(null); }} />
                <div className="import-actions">
                    <button onClick={() => fileRef.current.click()} className="btn btn-outline"><Icons.File size={18}/> Fájl megnyitása</button>
                    {CAMERA_SUPPORTED && (
                        <button onClick={() => { setMessage(null); setScanning(!scanning); }} className={`btn ${scanning ? 'btn-primary' : 'btn-outline'}`}>
                            <Icons.Camera size={18}/> {scanning ? 'Kamera leállítása' : 'Kamera'}
                        </button>
                    )}
                    <input ref={fileRef} type="file" accept=".txt,text/plain,image/*" className="import-file-input" onChange={openFile} tabIndex={-1} aria-hidden="true" />
                </div>
                {scanning && (
                    <div className="import-camera">
                        <QrScanner onResult={accept} onError={cameraError} />
                        <p className="share-hint">Tartsd a QR-kódot a keretbe.</p>
                    </div>
                )}
                {message && <p className={`import-message ${message.kind}`}>{message.text}</p>}
                {text.trim() && !decoded && !message && <p className="import-message error">Ebben nem található OrgonaTár lista kódja.</p>}
                {decoded && (
                    <div className="import-preview">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">A lista neve</label>
                        <ListNameInput placeholder="A lista neve" value={name ?? decoded.name} onChange={setName} onEnter={doImport} />
                        <div className="import-items">
                            {known.map((it, i) => {
                                const hymn = hymnByNumber.get(String(it.hymnNumber));
                                const verses = formatVerses(it.verses);
                                return (
                                    <div key={i} className="playlist-card-item">
                                        <span className="hymn-number text-accent">{hymn.number}</span>
                                        {verses && <span className="playlist-card-item-verses">{verses}</span>}
                                        <span className="playlist-card-item-title">{hymn.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                        {unknown.length > 0 && <p className="import-message error">Nem található az énekeskönyvben, kimarad: {unknown.map(it => it.hymnNumber).join(', ')}</p>}
                        {missingScores > 0 && <p className="import-message info">{missingScores} éneknél a választott letét vagy előjáték ezen az eszközön nem
                            érhető el (pl. nincs letöltve vagy ki van kapcsolva a könyve). Addig a hiányzó letét helyett az első elérhető jelenik meg, a hiányzó
                            előjáték pedig elmarad.</p>}
                    </div>
                )}
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

// Saját stílusú lenyíló választó (a böngésző <select>-je helyett, hogy mindenhol a program témáját kövesse).
// A menü portállal a .app-root-ba kerül, fix pozícióval a gomb alá (ha ott nincs elég hely, fölé): így a kártyák és
// ablakok overflow-ja nem vágja le, a téma színváltozói pedig érvényesek rá.
// Billentyűzet: Enter/szóköz (vagy Alt+le) nyitja; nyitva a nyilak, Home/End, betűk léptetnek, Enter választ, Escape
// bezár. Zárva a nyilakat nem kezeli, hogy a lapozópedál (nyíl billentyűk) akkor is lapozzon, ha a gombon a fókusz.
// allowEmpty: az első sor a placeholder (null-t választ). renderOption/renderValue: egyedi tartalom a menüben/gombon.
let customSelectSeq = 0;
const CustomSelect = ({ items, currentId, onChange, labelKey = "name", subLabelKey = "composer", placeholder = "Nincs kiválasztva",
        emptyText = "Nincs adat", width = "180px", allowEmpty = true, renderOption, renderValue, ariaLabel, className = '',
        menuClassName = '', menuMinWidth = 240, menuMaxHeight = 320 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuStyle, setMenuStyle] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const wrapRef = useRef(null), btnRef = useRef(null), menuRef = useRef(null), typeRef = useRef({ text: '', time: 0 });
    const idRef = useRef(null);
    if (idRef.current === null) idRef.current = `custom-select-${++customSelectSeq}`;
    const list = items || [];
    const isEmpty = list.length === 0;
    const options = allowEmpty ? [{ id: null, placeholder: true }, ...list] : list;
    const currentItem = list.find(v => v.id === currentId);

    // A menü helye: a gomb alatt, ha ott elfér (vagy ott több a hely), különben fölötte; vízszintesen a gomb bal
    // széléhez igazítva, ha jobbra nem férne el, a jobb széléhez
    const place = useCallback(() => {
        const btn = btnRef.current, menu = menuRef.current;
        if (!btn || !menu) return;
        const r = btn.getBoundingClientRect(), vw = window.innerWidth, vh = window.innerHeight, margin = 8;
        const width = Math.min(Math.max(r.width, menuMinWidth), vw - 2 * margin);
        const left = r.left + width <= vw - margin ? r.left : Math.max(margin, r.right - width);
        const below = vh - r.bottom - margin - 4, above = r.top - margin - 4;
        const wanted = Math.min(menuMaxHeight, menu.scrollHeight);
        setMenuStyle(below >= wanted || below >= above
            ? { left, width, top: r.bottom + 4, maxHeight: Math.min(menuMaxHeight, below) }
            : { left, width, bottom: vh - r.top + 4, maxHeight: Math.min(menuMaxHeight, above) });
    }, [menuMinWidth, menuMaxHeight]);

    useLayoutEffect(() => { if (isOpen) place(); else setMenuStyle(null); }, [isOpen, place]);

    // Nyitva: kattintás/koppintás máshová bezárja; ha a gombot tartalmazó terület (vagy a lap) görget, bezárul;
    // átméretezéskor újra igazodik
    useEffect(() => {
        if (!isOpen) return;
        const inside = (t) => (wrapRef.current && wrapRef.current.contains(t)) || (menuRef.current && menuRef.current.contains(t));
        const onPointerDown = (e) => { if (!inside(e.target)) setIsOpen(false); };
        const onScroll = (e) => { if (e.target.contains && btnRef.current && e.target.contains(btnRef.current)) setIsOpen(false); };
        document.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('scroll', onScroll, true);
        window.addEventListener('resize', place);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('scroll', onScroll, true);
            window.removeEventListener('resize', place);
        };
    }, [isOpen, place]);

    // A kiemelt sor mindig látszódjon a menüben (csak a menüt görgetjük, a lapot nem)
    useLayoutEffect(() => {
        const menu = menuRef.current;
        const el = menu && activeIndex >= 0 ? menu.children[activeIndex] : null;
        if (!el) return;
        if (el.offsetTop < menu.scrollTop) menu.scrollTop = el.offsetTop;
        else if (el.offsetTop + el.offsetHeight > menu.scrollTop + menu.clientHeight) menu.scrollTop = el.offsetTop + el.offsetHeight - menu.clientHeight;
    }, [activeIndex, menuStyle]);

    const open = () => {
        if (isEmpty) return;
        setActiveIndex(Math.max(0, options.findIndex(o => o.placeholder ? currentItem == null : o.id === currentId)));
        setIsOpen(true);
    };
    const choose = (option) => {
        setIsOpen(false);
        const id = option.placeholder ? null : option.id;
        if (id !== (currentItem ? currentId : null)) onChange(id);
    };
    const handleKeyDown = (e) => {
        if (isEmpty || e.ctrlKey || e.metaKey) return;
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || (e.altKey && e.key === 'ArrowDown')) { e.preventDefault(); open(); }
            return;
        }
        const last = options.length - 1;
        const move = { ArrowDown: Math.min(last, activeIndex + 1), ArrowUp: Math.max(0, activeIndex - 1), Home: 0, End: last, PageDown: Math.min(last, activeIndex + 8), PageUp: Math.max(0, activeIndex - 8) };
        if (e.key in move) { e.preventDefault(); setActiveIndex(move[e.key]); }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (activeIndex >= 0) choose(options[activeIndex]); }
        else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }
        else if (e.key === 'Tab') setIsOpen(false);
        else if (e.key.length === 1 && !e.altKey) {
            // gépelés: a beírt betűkkel kezdődő első sorra ugrik
            const now = Date.now(), t = typeRef.current;
            t.text = (now - t.time < 800 ? t.text : '') + e.key.toLocaleLowerCase('hu'); t.time = now;
            const idx = options.findIndex(o => !o.placeholder && String(o[labelKey]).toLocaleLowerCase('hu').startsWith(t.text));
            if (idx >= 0) setActiveIndex(idx);
        }
    };

    const portalTarget = isOpen && wrapRef.current ? (wrapRef.current.closest('.app-root') || document.body) : null;
    return (
        <div className={`custom-select ${className}`} ref={wrapRef} style={{'--select-min-width': width}}>
            <button ref={btnRef} type="button" onClick={() => (isOpen ? setIsOpen(false) : open())} onKeyDown={handleKeyDown}
                className={`input custom-select-btn ${isEmpty ? 'empty' : ''}`} aria-label={ariaLabel}
                role="combobox" aria-haspopup="listbox" aria-expanded={isOpen} aria-controls={isOpen ? `${idRef.current}-menu` : undefined}
                aria-activedescendant={isOpen && activeIndex >= 0 ? `${idRef.current}-${activeIndex}` : undefined}>
                <span className="custom-select-value truncate">
                    {isEmpty ? emptyText : currentItem ? (renderValue ? renderValue(currentItem) : currentItem[labelKey]) : placeholder}
                </span>
                <Icons.ChevronDown size={16} style={{opacity:0.5, flexShrink:0}}/>
            </button>

            {portalTarget && ReactDOM.createPortal(
                <div ref={menuRef} id={`${idRef.current}-menu`} role="listbox" aria-label={ariaLabel} className={`custom-select-menu ${menuClassName}`}
                    style={menuStyle || { visibility: 'hidden', left: 0, top: 0 }}
                    onMouseDown={e => e.preventDefault() /* a fókusz maradjon a gombon */}>
                    {options.map((o, i) => {
                        const selected = o.placeholder ? currentItem == null : o.id === currentId;
                        return (
                            <div key={o.placeholder ? '__placeholder__' : o.id} id={`${idRef.current}-${i}`} role="option" aria-selected={selected}
                                onClick={() => choose(o)} onMouseMove={() => i !== activeIndex && setActiveIndex(i)}
                                className={`custom-select-option${o.placeholder ? ' placeholder' : ''}${selected ? ' selected' : ''}${i === activeIndex ? ' active' : ''}`}>
                                {o.placeholder ? placeholder : renderOption ? renderOption(o) : (<>
                                    <div className="custom-select-option-label">{o[labelKey]}</div>
                                    {o[subLabelKey] && <div className="custom-select-option-sub">{o[subLabelKey]}</div>}
                                </>)}
                            </div>
                        );
                    })}
                </div>, portalTarget)}
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
    // A cél lista választója: a listák (az énekek számával), a végén az új lista
    const targetOptions = useMemo(() => playlists.map(pl => ({ id: pl.id, name: pl.name, count: `${pl.items.length} ének` }))
        .concat([{ id: NEW_PLAYLIST, name: '+ Új lista…' }]), [playlists]);

    return (
        <Modal title="Hozzáadás" onClose={onClose} maxWidth="600px" placement="upper" footer={
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
                            <CustomSelect items={targetOptions} currentId={targetId} onChange={setTargetId} allowEmpty={false}
                                subLabelKey="count" width="100%" ariaLabel="Cél lista" className="target-list-select" />
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

// A mintakották SVG-je: a memóriában és a localStorage-ban is (a Verovio és a minta változatához kötve), így a
// Beállítások lapon csak a legelső megnyitáskor kell kirajzolni őket (az tableten több száz ms).
// A mintakotta vagy a rajzolás beállításainak változásakor a FONT_SAMPLE_VERSION-t növelni kell.
const FONT_SAMPLE_VERSION = 1;
const FONT_SAMPLE_PREFIX = 'orgonista_font_samples_';
const fontSamples = new Map(); // kottafont → a mintakotta SVG-je
const fontSampleKey = () => `${FONT_SAMPLE_PREFIX}${VEROVIO_VERSION}_${FONT_SAMPLE_VERSION}`;
const storedFontSample = (font) => {
    if (!fontSamples.has(font)) {
        const svg = loadJSON(fontSampleKey(), {})[font];
        if (typeof svg === 'string' && svg.startsWith('<svg')) fontSamples.set(font, svg);
    }
    return fontSamples.get(font) || null;
};
const renderFontSample = (vrv, font) => {
    if (storedFontSample(font)) return fontSamples.get(font);
    const tk = new vrv.toolkit();
    try {
        tk.setOptions({ ...VEROVIO_OPTIONS, breaks: 'none', adjustPageWidth: true, font });
        tk.loadData(FONT_SAMPLE_MEI);
        fontSamples.set(font, tk.renderToSVG(1));
    } finally {
        tk.destroy();
    }
    try {
        // a régebbi változatok mentett mintái törlődnek
        Object.keys(localStorage).filter(k => k.startsWith(FONT_SAMPLE_PREFIX) && k !== fontSampleKey()).forEach(k => localStorage.removeItem(k));
        saveJSON(fontSampleKey(), Object.fromEntries(fontSamples));
    } catch (e) { /* a minta mentése nem fontos */ }
    return fontSamples.get(font);
};

const FontSample = ({ font }) => {
    const ref = useRef(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        const stored = storedFontSample(font);
        if (stored) { if (ref.current) ref.current.innerHTML = stored; return; }
        // A minta rajzolása (Verovio) tableten több száz ms: a Beállítások lap előbb megjelenik (a következő képkocka
        // után rajzolunk), a minták utána, egyenként
        let active = true, timer = null, frame = null;
        loadVerovio()
            .then(vrv => new Promise(resolve => {
                frame = requestAnimationFrame(() => { timer = setTimeout(() => resolve(vrv), 30 + SCORE_FONTS.findIndex(f => f.id === font) * 60); });
            }))
            .then(vrv => { if (active && ref.current) ref.current.innerHTML = renderFontSample(vrv, font); })
            .catch(err => { console.info(err.message); if (active) setFailed(true); });
        return () => { active = false; clearTimeout(timer); cancelAnimationFrame(frame); };
    }, [font]);
    if (failed) return <div className="font-sample font-sample-missing">A minta most nem jeleníthető meg</div>;
    return <div ref={ref} className="font-sample" aria-hidden="true"></div>;
};

const SettingsRow = ({ title, hint, children }) => (
    <div className="card card-row">
        <div className="card-decoration"></div>
        <div className="setting-label">
            <div className="font-bold text-ink">{title}</div>
            {hint && <div className="text-xs text-gray-500">{hint}</div>}
        </div>
        {children}
    </div>
);

// Színminta a színséma-választóban: oldalsáv, háttér és akcentus
const ThemeSwatch = ({ theme }) => (
    <span className="theme-swatch" aria-hidden="true" style={{'--swatch-bg': theme.bg, '--swatch-side': theme.sidebar, '--swatch-accent': theme.accent}} />
);
const themeLabel = (theme) => <span className="swatch-label"><ThemeSwatch theme={theme} />{theme.name}</span>;

// A betűtípus-választók menüjében minden betűtípus a saját mintájával látszik
const uiFontOption = (font) => (
    <span className="font-option">
        <span className="ui-font-sample" style={{fontFamily: uiFontStack(font.id)}}>
            <span className="ui-font-sample-title">42 Mint a szép, híves patakra</span>
            <span className="ui-font-sample-text">Aki nem jár hitlenek tanácsán, és meg nem áll a bűnösök útján…</span>
        </span>
        <span className="font-option-name"><span className="font-choice-name">{font.family}</span> <span className="font-choice-hint">{font.hint}</span></span>
    </span>
);
const serifFontOption = (font) => (
    <span className="font-option">
        <span className="serif-font-sample" style={{fontFamily: serifFontStack(font.id)}}>
            <span className="serif-font-sample-number">489</span>
            <span className="serif-font-sample-title">Református OrgonaTár</span>
        </span>
        <span className="font-option-name"><span className="font-choice-name">{font.family}</span> <span className="font-choice-hint">{font.hint}</span></span>
    </span>
);

const SettingsView = ({ settings, onUpdateSettings }) => {
    const set = (patch) => onUpdateSettings({ ...settings, ...patch });
    return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
        <div className="header centered">
             <h1 className="header-title main page-title">Beállítások</h1>
        </div>

        <div className="main-content" style={{padding:'2rem', overflowY:'auto'}}>
            {/* Széles kijelzőn (pl. fekvő tableten) két oszlop: balra a Megjelenés, jobbra a kottanézet és a kottagrafika */}
            <div className="settings-page">
              <div className="settings-column">
                <SettingsSection title="Megjelenés">
                    <SettingsRow title="Színséma" hint="Az oldal színei">
                        <CustomSelect items={THEMES} currentId={settings.theme} onChange={(theme) => set({ theme })} allowEmpty={false}
                            width="190px" menuMinWidth={0} ariaLabel="Színséma" renderOption={themeLabel} renderValue={themeLabel} />
                    </SettingsRow>

                    <SettingsRow title="Háttér" hint="Egyszínű, enyhe átmenet vagy textúra">
                        <CustomSelect items={BACKGROUNDS} currentId={settings.background} onChange={(background) => set({ background })} allowEmpty={false}
                            subLabelKey="hint" width="190px" ariaLabel="Háttér" />
                    </SettingsRow>

                    <SettingsRow title="Betűtípus" hint="A feliratok és az énekszövegek betűi">
                        <CustomSelect items={UI_FONTS} currentId={settings.uiFont} onChange={(uiFont) => set({ uiFont })} allowEmpty={false}
                            labelKey="family" width="230px" menuMinWidth={360} menuMaxHeight={560} menuClassName="font-select-menu" ariaLabel="Betűtípus"
                            renderOption={uiFontOption} renderValue={(f) => <span style={{fontFamily: uiFontStack(f.id)}}>{f.family}</span>} />
                    </SettingsRow>

                    <SettingsRow title="Énekszámok és oldalcímek" hint="Talpas betű, a régi korálkönyvek mintájára">
                        <CustomSelect items={SERIF_FONTS} currentId={settings.serifFont} onChange={(serifFont) => set({ serifFont })} allowEmpty={false}
                            labelKey="family" width="230px" menuMinWidth={360} menuMaxHeight={560} menuClassName="font-select-menu"
                            ariaLabel="Énekszámok és oldalcímek betűtípusa" renderOption={serifFontOption}
                            renderValue={(f) => <span className="serif-font-value" style={{fontFamily: serifFontStack(f.id)}}>{f.family}</span>} />
                    </SettingsRow>

                    <SettingsRow title="Oldalmenü helye" hint="Bal vagy jobb oldalon legyen a menü">
                        <div className="flex flex-wrap gap-2">
                             <button onClick={() => set({ sidebarSide: 'left' })} className={`btn ${settings.sidebarSide === 'left' ? 'btn-primary' : 'btn-ghost'}`}>Bal</button>
                             <button onClick={() => set({ sidebarSide: 'right' })} className={`btn ${settings.sidebarSide === 'right' ? 'btn-primary' : 'btn-ghost'}`}>Jobb</button>
                        </div>
                    </SettingsRow>
                </SettingsSection>
              </div>

              <div className="settings-column">
                <SettingsSection title="Kottanézet és lejátszó">
                    <SettingsRow title="Szövegpanel megjelenítése" hint="Kotta mellett a szöveg láthatósága">
                        <button onClick={() => set({ showLyrics: !settings.showLyrics })} className="btn-ghost" style={{color: settings.showLyrics ? 'var(--col-accent-text)' : 'var(--col-ink-muted, #999)'}}>
                            {settings.showLyrics ? <Icons.Eye size={24}/> : <Icons.EyeOff size={24}/>}
                        </button>
                    </SettingsRow>

                    <SettingsRow title="Oldalsáv szélessége" hint="Ha oldalt van a szöveg (alapméret; énekenként a panelen át is méretezhető)">
                        <div className="flex flex-wrap gap-2">
                            {['15%', '20%', '25%', '30%'].map(w => (
                                <button key={w} onClick={() => set({ lyricsWidth: w })} className={`btn ${settings.lyricsWidth === w ? 'btn-primary' : 'btn-ghost'}`}>{w}</button>
                            ))}
                        </div>
                    </SettingsRow>

                    <SettingsRow title="Kotta szélessége" hint="Maximális szélesség">
                        <CustomSelect items={SCORE_WIDTHS} currentId={settings.scoreMaxWidth || '80%'} onChange={(scoreMaxWidth) => set({ scoreMaxWidth })}
                            allowEmpty={false} width="110px" menuMinWidth={0} ariaLabel="Kotta szélessége" />
                    </SettingsRow>

                    <SettingsRow title="Óra a lejátszóban" hint="A lejátszó jobb felső sarkában">
                        <button onClick={() => set({ showClock: !settings.showClock })} className="btn-ghost" title={settings.showClock ? 'Óra elrejtése' : 'Óra megjelenítése'} style={{color: settings.showClock ? 'var(--col-accent-text)' : 'var(--col-ink-muted, #999)'}}>
                            {settings.showClock ? <Icons.Eye size={24}/> : <Icons.EyeOff size={24}/>}
                        </button>
                    </SettingsRow>
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
                                    onClick={() => set({ scoreFont: font.id })}>
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
    </div>
    );
};

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

// --- A szövegpanel elrendezése énekenként ---
// Énekszámonként megjegyezzük, amit a szövegpanelen állítottak: a helyét (lent/oldalt), a nézetét (oszlopok/folyó
// szöveg), a méretét (a kottanézet magasságának, ill. szélességének hányada; null: alapméret) és a betűméretét.
// Csak az alapértéktől eltérő mezők kerülnek a tárolóba.
const LYRICS_LAYOUT_DEFAULT = { position: 'bottom', layout: 'columns', height: null, width: null, fontScale: 1 };
const LYRICS_FONT_SCALES = [0.8, 0.9, 1, 1.1, 1.25, 1.4, 1.6, 1.8, 2];
const loadLyricsLayouts = () => {
    const all = loadJSON(STORAGE_KEYS.lyricsLayouts, {});
    return all && typeof all === 'object' && !Array.isArray(all) ? all : {};
};
const lyricsLayoutOf = (hymnNumber) => {
    const saved = hymnNumber != null ? loadLyricsLayouts()[hymnNumber] : null;
    const layout = { ...LYRICS_LAYOUT_DEFAULT, ...(saved && typeof saved === 'object' ? saved : {}) };
    if (!['bottom', 'right'].includes(layout.position)) layout.position = LYRICS_LAYOUT_DEFAULT.position;
    if (!['columns', 'block'].includes(layout.layout)) layout.layout = LYRICS_LAYOUT_DEFAULT.layout;
    const fraction = (v) => (typeof v === 'number' && v > 0.02 && v < 0.98 ? v : null);
    layout.height = fraction(layout.height);
    layout.width = fraction(layout.width);
    if (!LYRICS_FONT_SCALES.includes(layout.fontScale)) layout.fontScale = LYRICS_LAYOUT_DEFAULT.fontScale;
    return layout;
};
const saveLyricsLayout = (hymnNumber, layout) => {
    if (hymnNumber == null) return;
    const all = loadLyricsLayouts();
    const changed = Object.keys(LYRICS_LAYOUT_DEFAULT).filter(k => layout[k] !== LYRICS_LAYOUT_DEFAULT[k]);
    if (changed.length) all[hymnNumber] = Object.fromEntries(changed.map(k => [k, layout[k]]));
    else delete all[hymnNumber];
    saveJSON(STORAGE_KEYS.lyricsLayouts, all);
};
// Átméretezés: a legkisebb méret px-ben, a legnagyobb a kottanézet hányadában (lent a magasság, oldalt a szélesség)
const LYRICS_RESIZE_LIMITS = { bottom: { min: 64, max: 0.85 }, side: { min: 150, max: 0.7 } };

const ScoreViewer = ({ score, variationId, preludeId, lyrics, showLyrics, lyricsWidth, scoreMaxWidth, scoreFont, hymnNumber, onNext, onPrev }) => {
    // A szövegpanel elrendezése az aktuális énekhez; ének váltásakor (pl. a lejátszóban lapozva) annak a mentett
    // elrendezése töltődik be
    let [lyricsLayout, setLyricsLayout] = useState(() => ({ hymn: hymnNumber, ...lyricsLayoutOf(hymnNumber) }));
    if (lyricsLayout.hymn !== hymnNumber) {
        lyricsLayout = { hymn: hymnNumber, ...lyricsLayoutOf(hymnNumber) };
        setLyricsLayout(lyricsLayout);
    }
    const lyricsLayoutRef = useRef(lyricsLayout);
    lyricsLayoutRef.current = lyricsLayout;
    const updateLyricsLayout = (patch) => {
        const next = { ...lyricsLayoutRef.current, ...patch };
        lyricsLayoutRef.current = next;
        setLyricsLayout(next);
        saveLyricsLayout(next.hymn, next);
    };
    const rootRef = useRef(null);
    const panelRef = useRef(null);
    const lastTapRef = useRef(0);
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
    }, [fitRequest, zoom, scoreMaxWidth, pageKey, hasContent, lyricsLayout.position]);

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

    const isSide = lyricsLayout.position === 'right';
    const lyricsMode = isSide ? 'side' : lyricsLayout.layout === 'columns' ? 'columns' : 'block';
    const { verses, refrain } = lyrics;
    const fontStep = LYRICS_FONT_SCALES.indexOf(lyricsLayout.fontScale);
    const changeFont = (delta) => {
        const step = Math.min(LYRICS_FONT_SCALES.length - 1, Math.max(0, fontStep + delta));
        updateLyricsLayout({ fontScale: LYRICS_FONT_SCALES[step] });
    };

    // A panel átméretezése a fogantyúval (lent függőlegesen, oldalt vízszintesen). Húzás közben csak a DOM-ot
    // állítjuk (CSS változó), felengedéskor mentjük a kottanézethez viszonyított hányadot; a kotta a méretváltozás
    // után igazodik (ResizeObserver). Dupla koppintás vagy dupla kattintás: vissza az alapméretre.
    const startResize = (e) => {
        if (e.button !== 0) return;
        const panel = panelRef.current, root = rootRef.current;
        if (!panel || !root) return;
        e.preventDefault();
        const handle = e.currentTarget, side = isSide;
        handle.setPointerCapture(e.pointerId);
        const total = side ? root.clientWidth : root.clientHeight;
        const limits = LYRICS_RESIZE_LIMITS[side ? 'side' : 'bottom'];
        const startPos = side ? e.clientX : e.clientY;
        const startSize = side ? panel.offsetWidth : panel.offsetHeight;
        let size = startSize, moved = false;
        const move = (ev) => {
            const delta = (side ? ev.clientX : ev.clientY) - startPos;
            if (Math.abs(delta) > 3) moved = true;
            if (!moved) return;
            size = Math.round(Math.min(total * limits.max, Math.max(limits.min, startSize - delta)));
            panel.style.setProperty('--drag-size', `${size}px`);
            panel.classList.add('resizing');
        };
        const end = () => {
            handle.removeEventListener('pointermove', move);
            handle.removeEventListener('pointerup', end);
            handle.removeEventListener('pointercancel', end);
            if (moved) {
                const fraction = Math.round(size / total * 1000) / 1000;
                ReactDOM.flushSync(() => updateLyricsLayout(side ? { width: fraction } : { height: fraction }));
                lastTapRef.current = 0;
            } else {
                // koppintás: a második gyors koppintás visszaállítja az alapméretet
                const now = Date.now();
                if (now - lastTapRef.current < 400) { updateLyricsLayout(side ? { width: null } : { height: null }); lastTapRef.current = 0; }
                else lastTapRef.current = now;
            }
            panel.classList.remove('resizing');
            panel.style.removeProperty('--drag-size');
        };
        handle.addEventListener('pointermove', move);
        handle.addEventListener('pointerup', end);
        handle.addEventListener('pointercancel', end);
    };

    // Szövegpanel (oldalt vagy lent); kotta nélkül is látszik, szöveg nélkül elmarad. Alapméretben lent folyó
    // szövegként legfeljebb a kottanézet 30%-át, oszlopokban 50%-át foglalja el (a többi görgethető); ha a fogantyúval
    // átméretezték, a beállított méretben.
    const panelSize = isSide ? lyricsLayout.width : lyricsLayout.height;
    const panelStyle = { '--lyrics-scale': lyricsLayout.fontScale };
    if (isSide) Object.assign(panelStyle, panelSize ? { width: `${panelSize * 100}%`, minWidth: 0 } : { width: lyricsWidth, minWidth: '200px' });
    else Object.assign(panelStyle, panelSize ? { height: `${panelSize * 100}%`, minHeight: 0, maxHeight: 'none' }
        : { height: 'auto', minHeight: '150px', maxHeight: lyricsMode === 'block' ? '30%' : '50%' });
    const resizeHandle = (
        <div className="lyrics-resize" onPointerDown={startResize} role="separator" aria-orientation={isSide ? 'vertical' : 'horizontal'}
            aria-label="Szövegpanel átméretezése" title="Húzd a szövegpanel átméretezéséhez (dupla koppintás: alapméret)" />
    );
    const lyricsPanel = showLyrics && verses.length > 0 && (
        <div ref={panelRef} className={`lyrics-panel ${isSide ? 'side' : 'bottom'}`} style={panelStyle}>
            <div className="lyrics-toolbar">
                {isSide ? resizeHandle : <><span />{resizeHandle}</>}
                <div className="lyrics-toolbar-buttons">
                    <button onClick={() => changeFont(-1)} disabled={fontStep <= 0} className="lyrics-tool lyrics-font-btn" title="Kisebb betű" aria-label="Kisebb betű">
                        <span className="lyrics-font-t small">T</span>−
                    </button>
                    <button onClick={() => changeFont(1)} disabled={fontStep >= LYRICS_FONT_SCALES.length - 1} className="lyrics-tool lyrics-font-btn" title="Nagyobb betű" aria-label="Nagyobb betű">
                        <span className="lyrics-font-t">T</span>+
                    </button>
                    <span className="lyrics-tool-sep" />
                    <button onClick={() => updateLyricsLayout({ position: isSide ? 'bottom' : 'right' })} className="lyrics-tool" title={isSide ? "Lentre tesz" : "Oldalra tesz"}>
                        {isSide ? <Icons.LayoutBottom size={18}/> : <Icons.LayoutSidebar size={18}/>}
                    </button>
                    {!isSide && (
                        <button onClick={() => updateLyricsLayout({ layout: lyricsLayout.layout === 'block' ? 'columns' : 'block' })} className="lyrics-tool" title={lyricsLayout.layout === 'block' ? "Oszlopos nézet" : "Folyó szöveg"}>
                            {lyricsLayout.layout === 'block' ? <Icons.Columns size={18}/> : <Icons.List size={18}/>}
                        </button>
                    )}
                </div>
            </div>
            <div className={`lyrics-scroll ${lyricsMode}`} style={{ overflowX: lyricsMode === 'columns' ? 'auto' : 'hidden' }}>
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
        <div ref={rootRef} style={{display:'flex', height:'100%', flexDirection: isSide ? 'row' : 'column'}}>
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
        <div ref={rootRef} style={{display:'flex', height:'100%', flexDirection: isSide ? 'row' : 'column'}}>
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

// --- KÖNYVTÁR: ÉNEKKÁRTYÁK ---
// Egy ének kártyája: szám és cím, jobbra a kották száma és a kulcsszavak (koppintásra szűrnek). Memo: csak akkor
// rajzolódik újra, ha a saját adatai (vagy a kulcsszó-szűrő) változnak.
const NO_SCORES = { variations: 0, preludes: 0 };
const HymnCard = React.memo(({ hymn, counts, keywordFilter, onOpen, onKeyword }) => (
    <div onClick={() => onOpen(hymn.number)} className="card list-item hymn-card">
        <div className="card-decoration"></div>
        <div className="hymn-card-head">
            <span className="hymn-card-number hymn-number text-accent">{hymn.number}</span>
            <span className="hymn-card-title text-ink">{hymn.title}</span>
        </div>
        {/* jobbra zárva: a kották száma, alatta a kulcsszavak (koppintásra szűrnek) */}
        <div className="hymn-card-meta">
            {counts.variations || counts.preludes
                ? <span className="hymn-card-counts">{counts.variations} letét · {counts.preludes} előjáték</span>
                : <span className="hymn-card-counts none">nincs kotta</span>}
            <span className="hymn-card-keywords">
                {hymnKeywords(hymn).map((keyword, i) => (
                    <React.Fragment key={keyword}>
                        {i > 0 && ', '}
                        <button type="button" className={`keyword-link${keyword === keywordFilter ? ' active' : ''}`}
                            title={keyword === keywordFilter ? 'Szűrés törlése' : `Szűrés: ${keyword}`}
                            onClick={(e) => { e.stopPropagation(); onKeyword(keyword); }}>
                            {keyword}
                        </button>
                    </React.Fragment>
                ))}
            </span>
        </div>
        <Icons.ChevronRight className="hymn-card-chevron"/>
    </div>
));

// A kártyák kirajzolása: az első csoport (LIBRARY_GROUP kártya, bőven kitölti a képernyőt) azonnal, a többi a háttérben,
// csoportonként, alacsony prioritással (startTransition: közben a görgetés és a gépelés elsőbbséget kap). A csoportok
// elrendezése egymástól független (content-visibility: auto): a képernyőn kívüli csoportokat a böngésző nem rendezi
// el és nem festi ki, és egy új csoport sem számoltatja újra a többit. A még ki nem rajzolt kártyák helyét a már
// kirajzoltak átlagos magasságából előre lefoglaljuk, így a görgetősáv mérete nem ugrál. Ha valaki gyorsan a lista
// végére görget, a következő csoport azonnal jön.
// (A teljes, több száz kártyás lista egyszerre felépítve tableten közel egy másodpercig foglalná le a programot.)
const LIBRARY_GROUP = 50;
const HymnGroup = React.memo(({ hymns, start, slot, scoreCounts, keywordFilter, onOpen, onKeyword }) => {
    const items = hymns.slice(start, start + LIBRARY_GROUP);
    return (
        <div className="hymn-group" style={{containIntrinsicSize: `auto ${Math.round(items.length * slot)}px`}}>
            {items.map(h => (
                <HymnCard key={h.number} hymn={h} counts={scoreCounts.get(String(h.scoreId ?? h.number)) || NO_SCORES}
                    keywordFilter={keywordFilter} onOpen={onOpen} onKeyword={onKeyword} />
            ))}
        </div>
    );
});
const HymnList = ({ hymns, scoreCounts, keywordFilter, onOpen, onKeyword }) => {
    const [shown, setShown] = useState({ hymns, groups: 1 });
    let groups = shown.groups;
    if (shown.hymns !== hymns) { groups = 1; setShown({ hymns, groups }); } // új találati lista: elölről
    const total = Math.ceil(hymns.length / LIBRARY_GROUP);
    const visible = Math.min(hymns.length, groups * LIBRARY_GROUP);
    const [slot, setSlot] = useState(70);  // egy kártya helye a listában (magasság + térköz), px
    const [resized, setResized] = useState(0);
    const topRef = useRef(null);
    const pendingRef = useRef(null);
    const more = useCallback(() => setShown(prev => (prev.hymns === hymns ? { hymns, groups: prev.groups + 1 } : prev)), [hymns]);

    // új keresés vagy szűrés: a lista elejére (a legjobb találatokhoz) görgetünk
    useLayoutEffect(() => {
        const scroller = topRef.current && topRef.current.closest('.library-scroll');
        if (scroller) scroller.scrollTop = 0;
    }, [hymns]);
    // a következő csoport a háttérben
    useEffect(() => {
        if (groups >= total) return;
        const timer = setTimeout(() => React.startTransition(more), 16);
        return () => clearTimeout(timer);
    }, [groups, total, more]);
    // ha a lefoglalt (még üres) rész a látható terület közelébe ér, azonnal jön a következő csoport
    useEffect(() => {
        const el = pendingRef.current;
        if (!el) return;
        const observer = new IntersectionObserver((entries) => { if (entries.some(e => e.isIntersecting)) more(); },
            { root: el.closest('.library-scroll'), rootMargin: '0px 0px 400px 0px' });
        observer.observe(el);
        return () => observer.disconnect();
    }, [groups, hymns, more]);
    // egy kártya átlagos helye az első (látható, tehát elrendezett) csoportból; a kijelző szélességétől függ, ezért
    // elforgatáskor, átméretezéskor újramérjük
    useLayoutEffect(() => {
        const group = topRef.current && topRef.current.nextElementSibling;
        const cards = group && group.classList.contains('hymn-group') ? group.children : null;
        if (!cards || cards.length < 2) return;
        const avg = (cards[cards.length - 1].getBoundingClientRect().top - cards[0].getBoundingClientRect().top) / (cards.length - 1);
        if (avg > 0 && Math.abs(avg - slot) > 0.5) setSlot(avg);
    }, [hymns, resized]);
    useEffect(() => {
        const onResize = () => setResized(n => n + 1);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <>
            <div ref={topRef} hidden />
            {Array.from({ length: Math.min(groups, total) }, (_, i) => (
                <HymnGroup key={i} hymns={hymns} start={i * LIBRARY_GROUP} slot={slot} scoreCounts={scoreCounts}
                    keywordFilter={keywordFilter} onOpen={onOpen} onKeyword={onKeyword} />
            ))}
            {visible < hymns.length && <div ref={pendingRef} className="library-pending" style={{height: `${Math.round((hymns.length - visible) * slot)}px`}} aria-hidden="true" />}
        </>
    );
};

// Átrendezés húzással, egérrel és érintéssel is (Pointer Events; a HTML5 drag&drop érintőképernyőn nem működik).
// Érintéssel a fogantyúnál kell megfogni (máshol a lista görgethető), egérrel az elem bárhol megfogható. Húzás közben
// az elem követi az ujjat, a többi félrehúzódik; a görgethető terület szélén a lista magától görget.
const DRAG_START_DISTANCE = 5;   // px; ennyi elmozdulás után indul a húzás
const DRAG_SCROLL_EDGE = 60;     // px; a görgethető terület ilyen közel lévő szélén görget
const DRAG_SCROLL_SPEED = 14;    // px képkockánként, a szélén

const PlaylistEditor = ({ playlist, onRemoveItem, onAddItem, onPlay, onReorder, onRename, onShare, getScoreInfo }) => {
    const [drag, setDrag] = useState(null);   // { from, to, dy, shift } a kirajzoláshoz
    const dragRef = useRef(null);
    const listRef = useRef(null);
    const scrollRef = useRef(null);

    const updateDrag = () => {
        const d = dragRef.current, scroller = scrollRef.current;
        if (!d || !scroller) return;
        const dy = d.lastY - d.startY + scroller.scrollTop - d.startScroll;
        const center = d.mids[d.from] + dy;
        const to = d.mids.filter((mid, i) => i !== d.from && mid < center).length;
        d.to = to;
        setDrag({ from: d.from, to, dy, shift: d.shift });
    };
    const autoScroll = () => {
        const d = dragRef.current, scroller = scrollRef.current;
        if (!d || !scroller) return;
        const r = scroller.getBoundingClientRect();
        const speed = d.lastY < r.top + DRAG_SCROLL_EDGE ? -DRAG_SCROLL_SPEED * (1 - Math.max(0, d.lastY - r.top) / DRAG_SCROLL_EDGE)
            : d.lastY > r.bottom - DRAG_SCROLL_EDGE ? DRAG_SCROLL_SPEED * (1 - Math.max(0, r.bottom - d.lastY) / DRAG_SCROLL_EDGE) : 0;
        if (speed) {
            const before = scroller.scrollTop;
            scroller.scrollTop += speed;
            if (scroller.scrollTop !== before) updateDrag();
        }
        d.frame = requestAnimationFrame(autoScroll);
    };
    const handlePointerDown = (e, index) => {
        if (dragRef.current || (e.pointerType === 'mouse' && e.button !== 0) || e.target.closest('button')) return;
        if (e.pointerType !== 'mouse' && !e.target.closest('.playlist-editor-grip')) return; // érintés: csak a fogantyúval
        e.preventDefault();
        const items = [...listRef.current.children];
        const rects = items.map(el => el.getBoundingClientRect());
        const gap = rects.length > 1 ? rects[1].top - rects[0].bottom : 0;
        dragRef.current = {
            from: index, to: index, pointerId: e.pointerId, startY: e.clientY, lastY: e.clientY, active: false,
            startScroll: scrollRef.current.scrollTop, mids: rects.map(r => r.top + r.height / 2), shift: rects[index].height + gap, frame: null
        };
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const handlePointerMove = (e) => {
        const d = dragRef.current;
        if (!d || e.pointerId !== d.pointerId) return;
        d.lastY = e.clientY;
        if (!d.active) {
            if (Math.abs(e.clientY - d.startY) < DRAG_START_DISTANCE) return;
            d.active = true;
            d.frame = requestAnimationFrame(autoScroll);
        }
        updateDrag();
    };
    const handlePointerEnd = (e) => {
        const d = dragRef.current;
        if (!d || e.pointerId !== d.pointerId) return;
        cancelAnimationFrame(d.frame);
        dragRef.current = null;
        if (d.active && e.type === 'pointerup' && d.to !== d.from) onReorder(d.from, d.to);
        setDrag(null);
    };
    useEffect(() => () => { if (dragRef.current) cancelAnimationFrame(dragRef.current.frame); }, []);
    // a húzott elem az egérrel/ujjal mozog, a többi a helyére húzódik
    const itemOffset = (idx) => {
        if (!drag) return 0;
        if (idx === drag.from) return drag.dy;
        if (drag.from < drag.to && idx > drag.from && idx <= drag.to) return -drag.shift;
        if (drag.to < drag.from && idx >= drag.to && idx < drag.from) return drag.shift;
        return 0;
    };

    if (!playlist) return null;
    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
            <div className="header">
                 <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                    <button onClick={() => window.history.back()} style={{color: 'var(--col-papyrus)'}}><Icons.ChevronLeft size={24}/></button>
                 </div>
                 <div className="playlist-editor-title">
                    <h1 className="header-title main">{playlist.name}</h1>
                    <button onClick={onRename} className="header-icon-btn" title="Átnevezés" aria-label="Lista átnevezése"><Icons.Edit size={18}/></button>
                 </div>
                 <div className="header-actions">
                    <button onClick={onShare} className="header-icon-btn" title="Megosztás" aria-label="Lista megosztása"><Icons.Share size={20}/></button>
                    <button onClick={() => onPlay(playlist)} className="btn btn-success" aria-label="Lejátszás"><Icons.Play size={20} /><span className="btn-label">Lejátszás</span></button>
                 </div>
            </div>
            
            <div ref={scrollRef} className="main-content" style={{padding:'2rem', overflowY:'auto'}}>
                {playlist.items.length === 0 ? (
                    <div className="playlist-editor-empty">
                        <Icons.ListMusic size={64} className="icon"/>
                        <p>Üres lista</p>
                        <button onClick={onAddItem} className="text-accent font-bold hover:underline mt-2">Adj hozzá egy éneket!</button>
                    </div>
                ) : (
                    <div ref={listRef} className={`playlist-editor-list${drag ? ' reordering' : ''}`}>
                         {playlist.items.map((item, idx) => {
                             const { variationName, preludeName } = getScoreInfo(item.hymn.scoreId, item.variationId, item.preludeId);
                             const offset = itemOffset(idx);
                             return (
                                <div key={item.id} className={`playlist-editor-item${drag && idx === drag.from ? ' dragging' : ''}`}
                                     style={offset ? { transform: `translateY(${offset}px)` } : undefined}
                                     onPointerDown={(e) => handlePointerDown(e, idx)} onPointerMove={handlePointerMove}
                                     onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd}>
                                    <div style={{display:'flex', alignItems:'center', gap:'0.75rem', minWidth:0}}>
                                        <div className="playlist-editor-grip" title="Húzd az átrendezéshez"><Icons.GripVertical size={20} /></div>
                                        <div style={{fontWeight:'bold', color:'var(--col-ink-muted, #6b7280)', width:'20px', flex:'none'}}>{idx + 1}.</div>
                                        <div style={{minWidth:0}}>
                                            <div><span className="hymn-number text-accent">{item.hymn.number}</span> <span className="font-bold text-ink">{item.hymn.title}</span></div>
                                            <div style={{fontSize:'12px', color:'var(--col-ink-muted, #666)', marginTop:'2px'}}>
                                                {preludeName ? <span className="text-accent">Előjáték: {preludeName} + </span> : ''}
                                                Változat: {variationName}{item.verses.length > 0 && <> • Versszakok: {formatVerses(item.verses)}</>}
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
    const [renamingPlaylistId, setRenamingPlaylistId] = useState(null);
    const [sharingPlaylistId, setSharingPlaylistId] = useState(null);
    const [importText, setImportText] = useState(null); // az importálás ablaka a kezdő szöveggel (null: zárva)
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

    // A depth a programon belüli előzmények száma: ha nagyobb nullánál, a history.back() a program előző lapjára visz
    const navigate = (state) => {
        const next = { ...state, depth: ((window.history.state && window.history.state.depth) || 0) + 1 };
        window.history.pushState(next, '');
        applyNavState(next);
    };
    // A könyvtár kártyáinak kezelői; állandók, hogy a kártyák (HymnCard, memo) feleslegesen ne rajzolódjanak újra
    const openHymnCard = useCallback((number) => navigate({ activeTab: 'library', selectedHymnNumber: number }), []);
    const toggleKeywordFilter = useCallback((keyword) => setKeywordFilter(prev => (prev === keyword ? '' : keyword)), []);
    // Oldalmenü: a Beállítások gomb a beállításokban újra megnyomva oda lép vissza, ahonnan jöttünk
    const handleTabChange = (tab) => {
        if (tab === 'settings' && activeTab === 'settings') {
            if ((window.history.state && window.history.state.depth) > 0) window.history.back();
            else navigate({ activeTab: 'library' });
            return;
        }
        navigate({ activeTab: tab });
    };

    useEffect(() => {
        // Újratöltéskor a böngésző megőrzi a history.state-et, így ugyanoda térünk vissza
        if (window.history.state && window.history.state.activeTab) applyNavState(window.history.state);
        else window.history.replaceState({ activeTab: 'library' }, '');

        const handlePopState = (event) => applyNavState(event.state);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [applyNavState]);

    // Megosztási link (…#import=<kód>, pl. a QR-kódból): az énekek betöltése után az importálás ablaka nyílik meg vele.
    // A kód lekerül a címsorból, így újratöltéskor nem nyílik meg újra.
    useEffect(() => {
        if (loading) return;
        const openFromHash = () => {
            const hash = window.location.hash;
            if (!hash.startsWith('#import=')) return;
            // a mezőbe a kód olvasható alakja kerül (a böngésző a linkben az ékezetes betűket %XX-ként adja)
            const text = hash.slice('#import='.length);
            const list = decodeListCode(text);
            setImportText(list ? encodeListCode(list) : text);
            window.history.replaceState(window.history.state || { activeTab: 'library' }, '', window.location.pathname + window.location.search);
        };
        openFromHash();
        window.addEventListener('hashchange', openFromHash);
        return () => window.removeEventListener('hashchange', openFromHash);
    }, [loading]);

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

    // Színséma (THEMES); a további szerepeket a .theme-* osztály adja
    const currentTheme = THEMES.find(t => t.id === settings.theme) || THEMES[0];
    const themeName = currentTheme.id;

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
        return [...counts].sort((a, b) => a[0].localeCompare(b[0], 'hu')).map(([name, count]) => ({ id: name, name, count }));
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
    const renamingPlaylist = playlists.find(p => sameId(p.id, renamingPlaylistId)) || null;
    const handleRenamePlaylist = (name) => {
        setPlaylists(prev => prev.map(p => sameId(p.id, renamingPlaylistId) ? { ...p, name } : p));
        setRenamingPlaylistId(null);
    };

    // Megosztás és importálás
    const sharingPlaylist = playlists.find(p => sameId(p.id, sharingPlaylistId)) || null;
    const shareRows = (pl) => pl.items.map(resolveItem).map(it => ({ number: it.hymn.number, verses: formatVerses(it.verses), title: it.hymn.title }));
    // Megvan-e ezen az eszközön a kódban szereplő letét és előjáték (be van-e kapcsolva, le van-e töltve a könyvük)
    const scoresAvailable = (item) => {
        const hymn = hymnByNumber.get(String(item.hymnNumber));
        const score = hymn && getScoreById(hymn.scoreId);
        return (!item.variationId || !!(score && score.variations.some(v => v.id === item.variationId)))
            && (!item.preludeId || !!(score && score.preludes.some(p => p.id === item.preludeId)));
    };
    const handleImportPlaylist = (name, items) => {
        const playlist = { id: Date.now(), name, items: items.map(it => ({ id: newItemId(), hymnNumber: String(it.hymnNumber), variationId: it.variationId, preludeId: it.preludeId, verses: it.verses })) };
        setPlaylists(prev => [...prev, playlist]);
        setImportText(null);
        openPlaylistEditor(playlist);
    };
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
        <div className={`app-root theme-${themeName} bg-${settings.background}`} style={{ '--col-papyrus': currentTheme.bg, '--col-ink': currentTheme.text, '--col-galaxy-blue': currentTheme.sidebar, '--col-accent': currentTheme.accent, '--col-accent-text': currentTheme.accentText }}>
            <NavigationSidebar
                activeTab={view}
                onTabChange={handleTabChange}
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
                <PlaylistNameModal isOpen={!!renamingPlaylist} title="Lista átnevezése" confirmLabel="Mentés" initialName={renamingPlaylist ? renamingPlaylist.name : ''}
                    onClose={() => setRenamingPlaylistId(null)} onConfirm={handleRenamePlaylist} />
                {sharingPlaylist && <ShareListModal playlist={sharingPlaylist} rows={shareRows(sharingPlaylist)} onClose={() => setSharingPlaylistId(null)} />}
                {importText !== null && (
                    <ImportListModal key={importText} initialText={importText} hymnByNumber={hymnByNumber} scoresAvailable={scoresAvailable}
                        onClose={() => setImportText(null)} onImport={handleImportPlaylist} />
                )}
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
                        <Logo className="about-logo" />
                        <h1 className="page-title text-3xl text-galaxy mb-2">Református OrgonaTár</h1>
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

                {view === 'playlist_editor' && <PlaylistEditor playlist={selectedPlaylist} onRemoveItem={(itemId) => handleRemoveItemRequest(selectedPlaylist.id, itemId)} onAddItem={handleAddHymnToEditor} onPlay={startPlaylist} onReorder={handleReorderPlaylist}
                    onRename={() => setRenamingPlaylistId(selectedPlaylist.id)} onShare={() => setSharingPlaylistId(selectedPlaylist.id)} getScoreInfo={getScoreInfo} />}

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
                            <ScoreViewer score={getScoreById(selectedHymn.scoreId)} variationId={currentVariationId} preludeId={currentPreludeId} hymnNumber={selectedHymn.number} lyrics={lyricsOf(selectedHymn)} showLyrics={settings.showLyrics} lyricsWidth={settings.lyricsWidth} scoreMaxWidth={settings.scoreMaxWidth} scoreFont={settings.scoreFont}/>
                        </div>
                    </div>
                ) : (
                    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                        <div className="header centered">
                            <h1 className="header-title main page-title">Református OrgonaTár</h1>
                        </div>
                        <div className="library-toolbar">
                            <div className="library-search">
                                <Icons.Search className="library-search-icon" size={20}/>
                                <ClearableInput type="text" value={searchQuery} onClear={() => setSearchQuery('')} onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && filteredHymns.length > 0) navigate({ activeTab: 'library', selectedHymnNumber: filteredHymns[0].number });
                                        else if (e.key === 'Escape' && searchQuery) { e.preventDefault(); setSearchQuery(''); }
                                    }}
                                    placeholder="Keresés számra, címre vagy szövegre..." className="input"/>
                            </div>
                            <CustomSelect items={keywordOptions} currentId={keywordFilter || null} onChange={(k) => setKeywordFilter(k || '')}
                                placeholder="Minden kulcsszó" width="190px" menuMaxHeight={420} ariaLabel="Szűrés kulcsszóra"
                                className={`library-keyword${keywordFilter ? ' active' : ''}`}
                                renderOption={(k) => <span className="keyword-option"><span className="keyword-option-name">{k.name}</span><span className="keyword-option-count">{k.count}</span></span>} />
                        </div>
                        <div className="library-scroll" style={{flex:1, overflowY:'auto', padding:'1rem'}}>
                            {(keywordFilter || searchQuery.trim()) && (
                                <div className="library-result-count">
                                    {filteredHymns.length} ének
                                    {keywordFilter && <button type="button" className="btn-ghost library-clear" onClick={() => setKeywordFilter('')}>Szűrés törlése</button>}
                                </div>
                            )}
                            <HymnList hymns={filteredHymns} scoreCounts={scoreCounts} keywordFilter={keywordFilter} onOpen={openHymnCard} onKeyword={toggleKeywordFilter} />
                            {filteredHymns.length === 0 && <p className="library-empty">Nincs a keresésnek megfelelő ének.</p>}
                        </div>
                    </div>
                ))}

                {view === 'playlists' && (
                    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                        <div className="header">
                            <div style={{flex:1}}></div>
                            <h1 className="header-title main page-title">Liturgikus listák</h1>
                            <div className="header-actions">
                                <button onClick={() => setImportText('')} className="btn btn-on-dark" title="Lista importálása (kód, link, fájl vagy QR-kód)" aria-label="Lista importálása">
                                    <Icons.Import size={20}/><span className="btn-label">Importálás</span>
                                </button>
                                <button onClick={() => setIsCreateListModalOpen(true)} className="btn btn-primary" aria-label="Új lista"><Icons.Plus size={20}/><span className="btn-label">Új lista</span></button>
                            </div>
                        </div>
                        {playlists.length === 0 ? (
                            <div className="playlist-editor-empty">
                                <Icons.ListMusic size={64} className="icon"/>
                                <p>Még nincsenek listák</p>
                                <button onClick={() => setIsCreateListModalOpen(true)} className="text-accent font-bold hover:underline mt-2">Hozz létre egyet!</button>
                                <p className="playlist-empty-import">vagy <button onClick={() => setImportText('')} className="text-accent font-bold hover:underline">importálj</button> egy megosztott listát</p>
                            </div>
                        ) : (
                            <div className="playlist-grid">
                                {playlists.map(pl => (
                                    <div key={pl.id} onClick={() => openPlaylistEditor(pl)} className="card clickable">
                                        <div className="card-decoration"></div>
                                        <div className="playlist-card-header">
                                            <h3 className="font-bold text-galaxy">{pl.name}</h3>
                                            <div className="flex gap-2">
                                                <button onClick={(e) => { e.stopPropagation(); setSharingPlaylistId(pl.id); }} className="btn-ghost" title="Megosztás" aria-label="Lista megosztása"><Icons.Share size={18}/></button>
                                                <button onClick={(e) => { e.stopPropagation(); openPlaylistEditor(pl); }} className="btn-ghost" title="Szerkesztés"><Icons.Edit size={18}/></button>
                                                <button onClick={(e) => { e.stopPropagation(); handleRemovePlaylistRequest(pl); }} className="btn-danger" title="Törlés"><Icons.Trash2 size={18}/></button>
                                            </div>
                                        </div>
                                        <div style={{flex:1, overflowY:'auto', padding:'0.5rem'}}>
                                            {pl.items.map(resolveItem).map(it => {
                                                const verses = formatVerses(it.verses);
                                                return (
                                                    <div key={it.id} className="playlist-card-item">
                                                        <span className="hymn-number text-accent">{it.hymn.number}</span>
                                                        {verses && <span className="playlist-card-item-verses" title="Versszakok">{verses}</span>}
                                                        <span className="playlist-card-item-title">{it.hymn.title}</span>
                                                    </div>
                                                );
                                            })}
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
                                hymnNumber={playerItem.hymn.number}
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
