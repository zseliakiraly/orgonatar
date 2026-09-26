# orgonatar – Református Kottagyűjtemény

Református énekek orgonakíséreteinek böngészője (2021-es énekeskönyv): kották
MusicXML-ből (OpenSheetMusicDisplay), énekszövegek, liturgikus listák és
lejátszó nézet istentisztelethez.

## Fájlok

| Fájl | Szerep |
| --- | --- |
| `index.html` | Éles változat, az előfordított `app.min.js`-t tölti be. |
| `dev.html` | Fejlesztői változat: a böngésző fordítja az `app.js`-t (Babel), így szerkesztés után nem kell buildelni. Lassabban indul. |
| `app.js` | A forráskód (React 18, JSX). |
| `app.min.js` | Generált fájl (`npm run build`), kézzel ne szerkeszd. |
| `style.css` | Stílusok. |

## Build

```sh
npm install
npm run build
```

A GitHub Pages-en közzétett oldalt a munkafolyamat automatikusan lefordítja (lásd lent).
Helyi kipróbáláskor az `app.js` módosítása után futtasd újra az `npm run build`-et,
vagy használd a `dev.html`-t, különben az `index.html` a régi változatot mutatja.

## Közzététel (GitHub Pages)

A `.github/workflows/pages.yml` munkafolyamat minden `main` ágra feltöltés után
lefordítja az `app.js`-t, és közzéteszi az oldalt. Egyszeri beállítás:

1. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Actions fül → **Weboldal közzététele** → **Run workflow**.

Az oldal címe: `https://zseliakiraly.github.io/orgonatar/`. Privát repóból a
GitHub Pages csak fizetős (Pro) előfizetéssel érhető el; ingyenes fiókkal a repót
nyilvánossá kell tenni.

## Adatok és könyvtárak

- `libs/`: `react.js` és `react-dom.js` (React 18 UMD build),
  `opensheetmusicdisplay.min.js`; a `babel.js` csak a `dev.html`-hez kell.
- `data/`: `enek.json`, `kottakonyvek.json` és a bennük hivatkozott kottafájlok
  (MusicXML: `.xml`, `.musicxml`, `.mxl`; vagy kép: `.png`, `.jpg`, `.svg`).

### Adatformátum (amit a kód használ)

- `enek.json`: `[{ "number": "42", "title": "…", "lyrics": "1. …\n…\n\n2. …", "scoreId": "42" }]`
  A versszakokat üres sor választja el, és mindegyik `1.`, `2.` … számmal kezdődik.
- `kottakonyvek.json`: kottakönyvek listája: `id`, `title`, `author`, `year`,
  `description`, `active` (`false` = alapból kikapcsolva), `scores` és `preludes`.
  A letét és az előjáték `scoreId` mezője (ennek hiányában az `id`) köti a kottát az
  énekhez (`enek.json` → `scoreId`). További mezők: `name`, `xmlUrl`, `voiceCount`,
  `composer`, `year`. Az `xmlUrl` az `index.html`-hez képest relatív útvonal
  (`data/...`); a `/data/...` alakot a program automatikusan relatívvá alakítja.

## Témák

A beállításokban választható: **Pergamen** (alapértelmezett), Papirusz, Sötét pergamen, Törtfehér.

- A Pergamen színei a `style.css` elején, a `--pergamen-*` változókban vannak; a színek
  szerepét (kártya, keret, kiemelés stb.) a `.theme-pergamen` blokk rendeli hozzájuk.
- A `:root` `--col-*` értékei a Papirusz téma színei. A háttér, a szöveg, az oldalsáv és
  az akcentus színét témánként az `app.js` (`themeColors`) állítja be.

## Tárolás

A listák és a beállítások a böngésző localStorage-ában vannak
(`orgonista_playlists`, `orgonista_settings`), tehát eszközönként külön.

## Lejátszó

- Lapozás: az előző/következő gombok a kotta két szélén.
- Billentyűzet vagy Bluetooth lapozópedál:
  - előre: PageDown, lefelé nyíl, jobbra nyíl;
  - hátra: PageUp, felfelé nyíl, balra nyíl.
- Hosszú kottánál előbb képernyőnyit görget, és csak a kotta végén lapoz a következő énekre.
