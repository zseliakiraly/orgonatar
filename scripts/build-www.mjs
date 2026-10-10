// Az Android-alkalmazás fájljai a www/ mappába (ezt másolja a Capacitor az alkalmazásba: npx cap sync android).
// Előtte az app.min.js-t le kell fordítani (npm run build; az npm run android:sync mindkettőt elvégzi).
//
// A szerver címe környezeti változóban adható meg (a GitHub Actions a repó változóiból veszi):
//   ORGONATAR_SERVER      a webes program címe, ahonnan a kották jönnek (alapból a GitHub Pages-en lévő változat)
//   ORGONATAR_API         a PHP API címe (pl. https://orgonatar.hu/api/); ha üres, a fájlok közvetlenül jönnek
//                         a szerverről (ehhez a szervernek CORS-fejlécet kell küldenie, a GitHub Pages küld)
//   ORGONATAR_PUBLIC_URL  a megosztási linkek címe (alapból az ORGONATAR_SERVER)
import { build } from 'esbuild';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'www');
const withSlash = (url) => (url && !url.endsWith('/') ? `${url}/` : url || '');

const server = withSlash(process.env.ORGONATAR_SERVER || 'https://zseliakiraly.github.io/orgonatar/');
const api = process.env.ORGONATAR_API || '';
const publicUrl = withSlash(process.env.ORGONATAR_PUBLIC_URL || server);
for (const [name, url] of [['ORGONATAR_SERVER', server], ['ORGONATAR_API', api], ['ORGONATAR_PUBLIC_URL', publicUrl]]) {
    if (url && !/^https:\/\//.test(url)) throw new Error(`${name}: https:// címet kell megadni (${url})`);
}

if (!existsSync(join(root, 'app.min.js'))) throw new Error('Nincs app.min.js: előbb npm run build');

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'data'), { recursive: true });
for (const item of ['app.min.js', 'style.css', 'orgonatar-logo.svg', 'libs', 'fonts', 'icons', 'data/enek.json', 'data/kottakonyvek.json']) {
    cpSync(join(root, item), join(out, item), { recursive: true });
}
rmSync(join(out, 'libs', 'babel.js'), { force: true }); // csak a dev.html-hez kell

// A beépített könyvek ("builtin": true a kottakonyvek.json-ban) az alkalmazás része: internet nélkül, az első
// indítástól megvannak. A szerveren lévő újabb változatot az alkalmazás magától letölti (csak ha az index.json változott).
// Az útvonalak feloldása ugyanaz, mint az app.js resolveBookUrl függvényében.
const resolveBookUrl = (url, folder) => {
    if (typeof url !== 'string' || !url || /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(url)) return null;
    const rooted = url.replace(/^\.?\//, '');
    if (rooted.startsWith('data/')) return rooted;
    const parts = ['data', folder];
    for (const segment of url.split('/')) {
        if (segment === '..') parts.pop();
        else if (segment && segment !== '.') parts.push(segment);
    }
    return parts.join('/');
};
const bundled = {};
const catalog = JSON.parse(readFileSync(join(root, 'data', 'kottakonyvek.json'), 'utf8'));
for (const { folder } of catalog.filter(entry => entry && entry.builtin === true)) {
    const indexPath = `data/${folder}/index.json`;
    const book = JSON.parse(readFileSync(join(root, indexPath), 'utf8'));
    const urls = new Set();
    const add = (item) => { const url = item && resolveBookUrl(item.xmlUrl, folder); if (url) urls.add(url); };
    (book.scores || []).forEach(score => { add(score); (score.preludes || []).forEach(add); });
    (book.preludes || []).forEach(add);
    if (typeof book.cover === 'string' && book.cover.trim()) add({ xmlUrl: book.cover.trim() });
    const files = [], missing = [];
    let bytes = 0;
    for (const url of urls) {
        if (!existsSync(join(root, url))) { missing.push(url); continue; }
        mkdirSync(dirname(join(out, url)), { recursive: true });
        cpSync(join(root, url), join(out, url));
        bytes += statSync(join(root, url)).size;
        files.push(url);
    }
    cpSync(join(root, indexPath), join(out, indexPath));
    bundled[folder] = { files, missing, bytes };
    console.log(`Beépített könyv: ${folder} (${files.length} fájl${missing.length ? `, ${missing.length} hiányzik` : ''})`);
}

// Az index.html a webes változaté, a program előtt a beállításokkal és a készülék kezelőivel
const html = readFileSync(join(root, 'index.html'), 'utf8');
const marker = '<script src="app.min.js"></script>';
if (!html.includes(marker)) throw new Error(`Az index.html-ben nincs meg: ${marker}`);
writeFileSync(join(out, 'index.html'), html.replace(marker, `<script src="config.js"></script>\n    <script src="native.js"></script>\n    ${marker}`));
writeFileSync(join(out, 'config.js'), `window.ORGONATAR_CONFIG = ${JSON.stringify({ server, api, publicUrl, bundled }, null, 1)};\n`);

await build({ entryPoints: [join(root, 'native', 'bridge.js')], bundle: true, minify: true, format: 'iife', target: 'es2019', outfile: join(out, 'native.js') });
console.log(`www/ kész (szerver: ${server}${api ? `, API: ${api}` : ''})`);
