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

Az `app.js` módosítása után élesítés előtt futtasd újra az `npm run build`-et,
különben az `index.html` a régi változatot mutatja.

## A repóban nem szereplő mappák

- `libs/`: `react.js` és `react-dom.js` (React 18 UMD build),
  `opensheetmusicdisplay.min.js`; a `babel.js` csak a `dev.html`-hez kell.
- `data/`: `enek.json`, `kottakonyvek.json` és a bennük hivatkozott MusicXML fájlok.

### Adatformátum (amit a kód használ)

- `enek.json`: `[{ "number": "42", "title": "…", "lyrics": "1. …\n…\n\n2. …", "scoreId": "42" }]`
  A versszakokat üres sor választja el, és mindegyik `1.`, `2.` … számmal kezdődik.
- `kottakonyvek.json`: kottakönyvek listája: `id`, `title`, `author`, `year`,
  `description`, `active` (`false` = alapból kikapcsolva), `scores` és `preludes`.
  A letét és az előjáték `scoreId` mezője köti az éneket (`enek.json` → `scoreId`)
  a kottához. További mezők: `name`, `xmlUrl`, `voiceCount`, `composer`, `year`.

## Tárolás

A listák és a beállítások a böngésző localStorage-ában vannak
(`orgonista_playlists`, `orgonista_settings`), tehát eszközönként külön.

## Lejátszó

- Lapozás: az előző/következő gombok a kotta két szélén.
- Billentyűzet vagy Bluetooth lapozópedál:
  - előre: PageDown, lefelé nyíl, jobbra nyíl;
  - hátra: PageUp, felfelé nyíl, balra nyíl.
- Hosszú kottánál előbb képernyőnyit görget, és csak a kotta végén lapoz a következő énekre.
