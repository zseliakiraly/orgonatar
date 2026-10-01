# orgonatar – Református Kottagyűjtemény

Református énekek orgonakíséreteinek böngészője (2021-es énekeskönyv): kották
MusicXML-ből (a [Verovio](https://www.verovio.org) rajzolja őket), énekszövegek,
liturgikus listák és lejátszó nézet istentisztelethez.

A korábbi, OpenSheetMusicDisplay-jel (OSMD) rajzoló változat az `osmd` ágon van meg.

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

- `libs/`: `react.js` és `react-dom.js` (React 18 UMD build); a `babel.js` csak a `dev.html`-hez kell.
- `libs/verovio/`: a kottarajzoló (Verovio 6.3.0, LGPL-3.0), a licencek és a frissítés leírása
  (`libs/verovio/README.md`).
- `fonts/`: a feliratok, az énekszövegek, valamint az énekszámok és az oldalcímek betűtípusai
  (SIL Open Font License, `fonts/README.md`).
- `data/enek.json`: az énekek.
- `data/kottakonyvek.json`: a kottakönyvek listája (csak a mappák).
- `data/<mappa>/index.json`: egy kottakönyv adatai és kottái; mellette a kottafájlok
  (MusicXML: `.xml`, `.musicxml`, `.mxl`; MEI: `.mei`; vagy kép: `.png`, `.jpg`, `.svg`).
- `sw.js`: service worker az offline működéshez (lásd lent).

### Adatformátum (amit a kód használ)

- `enek.json`: `[{ "number": "42", "title": "…", "keywords": ["zsoltár", "bizalom"], "scoreId": "42", "verses": [["1. versszak 1. sora", "2. sora", …], ["2. versszak 1. sora", …]] }]`
  - `verses`: a versszakok sorrendben; mindegyik versszak az éneksorok tömbje (egy elem = egy éneksor, a szám
    nélkül, a versszak számát a program adja). A fájlban versszakonként egy sor, így kézzel is jól javítható.
    Refrén: egy `"Refr."` sor, utána a refrén sorai (dőlt betűvel jelennek meg). Szöveg nélküli ének: `"verses": []`.
  - A program a régi formát is elfogadja: `"lyrics"` egyetlen szövegként, a versszakok között üres sorral
    (`\n\n`), a sorok között egy sortöréssel (`\n`), a versszak elején a számával (`1. `).
  - `keywords`: 1–3 kulcsszó a könyvtár kártyáin és kulcsszavas szűrőjében (szabadon bővíthető, új kulcsszó is
    írható; a szűrő magától felveszi). Az első az énekeskönyv témaköre a számtartomány szerint (pl. 401–423:
    „karácsony”, 651–668: „reggel”); a többit (pl. „bizalom”, „bűnbánat”, „dicséret”) a program az énekszövegből
    javasolta: ezeket érdemes átnézni, és ahol kell, javítani.
- `kottakonyvek.json`: `[{ "folder": "enekeskonyv2021", "builtin": true }, { "folder": "genfi" }]`.
  A sorrend a Kottakönyvek oldal sorrendje. A `"builtin": true` könyv beépített: mindig
  elérhető, és magától mentődik a készülékre. A többit a felhasználó töltheti le.
- `<mappa>/index.json`: egy könyv: `id`, `title`, `author`, `description`, `copyright`,
  `active` (`false` = alapból elrejtve), `scores` és `preludes`. A letét és az előjáték
  `scoreId` mezője (ennek hiányában az `id`) köti a kottát az énekhez (`enek.json` → `scoreId`).
  További mezők: `name`, `xmlUrl`, `voiceCount`, `composer`, `year`.
  - Az `xmlUrl` a könyv mappájához képest értendő: `"165fm-3k-2017.svg"`, másik könyv
    mappájából `"../genfi/001-bm-3k-2010.mxl"`. A régi `data/...` és `/data/...` alak is működik.
  - A könyv `id`-je ne változzon: a listák ehhez kötik a kiválasztott változatot.

### Új könyv, új kották

1. Új könyvhöz új mappa a `data/` alatt (pl. `data/kk59/`), benne az `index.json` és a kottafájlok.
2. A mappa neve a `data/kottakonyvek.json`-ba: `{ "folder": "kk59" }`.

Ha egy meglévő könyvbe kerül új kotta, elég a fájlt feltölteni és az `index.json`-t bővíteni.
A letöltött könyvnél a Kottakönyvek oldalon megjelenik a „Frissítés” gomb, a beépített könyv
magától frissül. A program az `index.json` változásából veszi észre a frissítést. Ha egy kottát
ugyanazzal a fájlnévvel cserélsz le, az `index.json`-ban is változtass valamit, például a
könyv `"version"` mezőjét (`"version": "2026-10-01"`). Frissítéskor a lecserélt fájl is letöltődik.

## Beállítások

- **Megjelenés:** háttér téma, betűtípusok, az oldalmenü helye.
  - Betűtípus (a feliratok és az énekszövegek betűi, mintaszöveggel): **Figtree** (alapértelmezett), Nunito Sans,
    Onest, DM Sans, Atkinson Hyperlegible Next.
  - Énekszámok és oldalcímek (talpas betű, a régi korálkönyvek mintájára): **Old Standard TT** (alapértelmezett,
    a régi korálkönyvhöz legközelebbi), DM Serif Text (vaskosabb), Libre Bodoni. Ezzel jelennek meg az
    énekszámok (könyvtár, ének fejléce, lejátszó, listák, énekválasztó) és a főoldalak címe.
  - Mind a programmal csomagolt, szabad (SIL OFL) betűtípus (`fonts/`); a választás után a többi törölhető
    (`fonts/README.md`).
- **Kottanézet és lejátszó:** szövegpanel, oldalsáv és kotta szélessége, óra a lejátszóban.
- **Kottagrafika:** a kotta rajzolata. Kottafont: **Leipzig** (tömöttebb, alapértelmezett) vagy
  **Bravura** (szellősebb); mindkettőt ugyanazon a mintakottán mutatja. Az új kottagrafikai
  beállítások is ide kerülnek (`app.js`: `SettingsView`, „Kottagrafika” szakasz). A Verovio többi
  beépített fontja (Gootville, Leland, Petaluma) a `SCORE_FONTS` listával kapcsolható be.

## Témák

A beállításokban választható: **Pergamen** (alapértelmezett), Papirusz, Sötét papirusz, Törtfehér.

- A Pergamen színei a `style.css` elején, a `--pergamen-*` változókban vannak; a színek
  szerepét (kártya, keret, kiemelés stb.) a `.theme-pergamen` blokk rendeli hozzájuk.
- A `:root` `--col-*` értékei a Papirusz téma színei. A háttér, a szöveg, az oldalsáv és
  az akcentus színét témánként az `app.js` (`themeColors`) állítja be.

## Tárolás

A listák és a beállítások a böngésző localStorage-ában vannak
(`orgonista_playlists`, `orgonista_settings`), a letöltött kottakönyvek a böngésző
Cache Storage tárolójában (`orgonatar-konyv:<mappa>:…`). Mindez eszközönként külön tárolódik.

## Kottakönyvek letöltése, offline működés

- **Letöltés:** a Kottakönyvek oldalon a beépített könyv mindig elérhető. A többit a „Letöltés”
  gomb menti a készülékre, és csak a letöltött könyvek kottái jelennek meg. A letöltés
  megszakítható, a letöltött könyv törölhető.
- **Internet nélkül:** a letöltött könyvek és maga az oldal is működik (`sw.js`, service
  worker). Ha a hálózat nem válaszol (pl. van WiFi, de nincs internet), néhány másodperc
  után a mentett változat jön. Az első megnyitáskor az oldal a kottarajzolót is letölti
  (tömörítve kb. 2,4 MB), ez is a készüléken marad.
- **Frissítés:** ha a szerveren megváltozik egy letöltött könyv `index.json`-ja, a kártyán
  „Frissítés” gomb jelenik meg. Ilyenkor csak az új és a megváltozott fájlok töltődnek le.
  A szerveren hiányzó fájlokat a letöltés kihagyja, és a kártyán jelzi a számukat. Ha ezek
  később felkerülnek, a program a következő megnyitáskor magától letölti őket (csak ezeket).
- **iPad, iPhone:** a Safari törölheti a weboldalak tárolt adatait (a letöltött könyveket és a
  listákat is), ha az oldalt kb. egy hétig nem nyitod meg. Megbízhatóbb, ha az oldalt a
  Megosztás → „Főképernyőhöz adás” menüvel a kezdőképernyőre teszed, és onnan indítod. Az
  így indított oldal külön tárolót kap, ott újra le kell tölteni a könyveket.
- Az offline működéshez https kell (GitHub Pages), vagy helyben a `localhost` cím. Ha az oldalt
  https nélkül nyitod meg (pl. helyi hálózaton, IP-címmel), nincs letöltés: ilyenkor minden könyv
  a szerverről, internettel használható.

## Könyvtár

- Az énekkártyákon balra az énekszám és a kezdősor, jobbra zárva a letétek és az előjátékok száma (a letöltött,
  bekapcsolt könyvekből), alatta dőlt betűvel az ének kulcsszavai. Keskeny kijelzőn (telefonon) ezek a kezdősor
  alá kerülnek.
- A kereső mellett kulcsszavas szűrő: pl. „karácsony” választásával csak a karácsonyi énekek látszanak.
  Egy kártya kulcsszavára koppintva is erre szűr (újra koppintva megszűnik). A kereső a kulcsszavakban is keres.

## Kottanézet és lejátszó

- A kottákat (MusicXML, MEI) a Verovio rajzolja. A kotta címét, szerzőjét és a hangszer nevét
  (pl. „Zongora”) nem írja ki; a sortörést a hely szélességéhez igazítja, a fájlba írt sortöréseket
  nem veszi figyelembe.
- A kottaterület nem görgethető: az oldal (előjáték + kotta) mindig egészben látszik. Ha a beállított
  méretben nem férne ki, a program kisebb nagyítással újratördeli (több ütem kerül egy sorba), így a
  lehető legnagyobb, még kiférő méretben jelenik meg. Ablakméret-változáskor, a tablet elforgatásakor
  és a szövegpanel áthelyezésekor újra igazodik.
- Hosszú kottánál az első megjelenítés tovább tarthat, mert a program több méretet kipróbál;
  visszalapozáskor a megtalált méretet már megjegyezte.
- A +/− gomb a legnagyobb méretet állítja 10%-os lépésekben, a felirat a ténylegesen látott méretet
  mutatja. A + nem használható, ha a kotta nagyobban már nem férne ki (képes kottánál: ha elérte a
  teljes szélességet).
- A szövegpanel a kotta mellett vagy alatt lehet (a panel jobb felső sarkának gombjai). Kotta nélküli énekeknél is látszik;
  szöveg nélküli énekeknél nincs panel.
  - Oldalt: a versszakok és bennük a sorok egymás alatt; a hosszú sor behúzással törik a következő sorba.
  - Lent, egymás mellett (alapértelmezett): a versszakok oszlopokban, a sorok egymás alatt, törés nélkül: egy
    versszak oszlopa olyan széles, mint a leghosszabb sora (ha nem fér ki minden versszak, oldalra görgethető).
  - Lent, egymás alatt („Folyó szöveg” gomb): a versszakok egymás alatt, a soraik folyó szövegként egymás után.
- A lejátszó fejlécében balra a lista sorszáma (pl. `1/4`), utána az énekszám és a cím; jobbra az óra.
  Az óra a beállításokban kikapcsolható („Óra a lejátszóban”, alapból látszik).
- **Gyors megnyitás:** az óra melletti (számbillentyűzet ikonos) gomb énekválasztót nyit.
  - Balra a kereső és a találatok, jobbra nagygombos számbillentyűzet.
  - Tableten a kereső nem kap magától fókuszt, így nem ugrik fel a képernyő-billentyűzet. A keresőre
    koppintva szöveggel is lehet keresni.
  - A kiválasztott ének oldala nyílik meg; a vissza gomb a lejátszóba visz, ugyanoda.
  - Fizikai billentyűzeten is működik: számok, Backspace, Enter, Escape.
  - A lista szerkesztőjében az „Új ének hozzáadása” ugyanezt az ablakot nyitja.
- Lapozás a lejátszóban: koppintás a kottaterület bal vagy jobb szélére (a szélső 15%-ra) az előző /
  következő énekre lapoz.
- Billentyűzet vagy Bluetooth lapozópedál: mindig egész éneket lapoz.
  - előre: PageDown, lefelé nyíl, jobbra nyíl;
  - hátra: PageUp, felfelé nyíl, balra nyíl.
  - A lenyomva tartott billentyű (pedál) csak egyet lapoz.
