# orgonatar – Református OrgonaTár

Református énekek orgonakíséreteinek böngészője (2021-es énekeskönyv): kották
MusicXML-ből (a [Verovio](https://www.verovio.org) rajzolja őket), énekszövegek,
liturgikus listák és lejátszó nézet istentisztelethez.

**Használati útmutató képekkel:** [docs/](docs/README.md) (első lépések, kottakönyvek, könyvtár, szövegpanel, listák,
lejátszó, megosztás, beállítások, gyakori kérdések, az adatok karbantartása).

A korábbi, OpenSheetMusicDisplay-jel (OSMD) rajzoló változat az `osmd` ágon van meg.

## Fájlok

| Fájl | Szerep |
| --- | --- |
| `index.html` | Éles változat, az előfordított `app.min.js`-t tölti be. |
| `dev.html` | Fejlesztői változat: a böngésző fordítja az `app.js`-t (Babel), így szerkesztés után nem kell buildelni. Lassabban indul. |
| `app.js` | A forráskód (React 18, JSX). |
| `app.min.js` | Generált fájl (`npm run build`), kézzel ne szerkeszd. |
| `style.css` | Stílusok. |
| `orgonatar-logo.svg` | A program logója (eredeti rajz); a Névjegy oldalon az `app.js` `Logo` komponense ugyanezt rajzolja, a téma színével. |
| `docs/` | Használati útmutató (Markdown), a képernyőképek a `docs/kepek/` mappában (WebP). |
| `icons/` | A böngészőfül és a kezdőképernyő ikonja: a logó vastagabb vonalú változatai (`favicon.svg`, sötét böngészőben világos vonallal; `apple-touch-icon.png`, `icon-192.png`). Ha a logó változik, ezeket is újra kell készíteni. |

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
- `libs/fflate/`: a listák kódjának tömörítése (fflate 0.8.2, MIT; csak a `deflateSync` és az `inflateSync`,
  `libs/fflate/README.md`). Az oldal a program előtt tölti be.
- `libs/qr/`: a listák megosztásához a QR-kód rajzolása (qrcode-generator 2.0.4, MIT) és olvasása (jsQR 1.4.0,
  Apache-2.0; csak ha a böngészőnek nincs saját felismerője), a licencekkel (`libs/qr/README.md`). Igény szerint
  töltődnek be; a service worker előre elmenti őket, így internet nélkül is működnek.
- `fonts/`: a feliratok, az énekszövegek, valamint az énekszámok és az oldalcímek betűtípusai
  (SIL Open Font License, `fonts/README.md`).
- `data/enek.json`: az énekek.
- `data/kottakonyvek.json`: a kottakönyvek listája (csak a mappák).
- `data/<mappa>/index.json`: egy kottakönyv adatai és kottái; mellette a kottafájlok
  (MusicXML: `.xml`, `.musicxml`, `.mxl`; MEI: `.mei`; vagy kép: `.png`, `.jpg`, `.svg`).
- `sw.js`: service worker az offline működéshez (lásd lent).

### Adatformátum (amit a kód használ)

- `enek.json`: `[{ "number": "42", "title": "…", "keywords": ["zsoltár", "bizalom"], "scoreId": "42", "bible": "", "textAuthor": "", …, "description": "", "verses": [["1. versszak 1. sora", "2. sora", …], ["2. versszak 1. sora", …]] }]`
  - `verses`: a versszakok sorrendben; mindegyik versszak az éneksorok tömbje (egy elem = egy éneksor, a szám
    nélkül, a versszak számát a program adja). A fájlban versszakonként egy sor, így kézzel is jól javítható.
    Refrén: egy `"Refr."` sor, utána a refrén sorai (dőlt betűvel jelennek meg). Szöveg nélküli ének: `"verses": []`.
  - A program a régi formát is elfogadja: `"lyrics"` egyetlen szövegként, a versszakok között üres sorral
    (`\n\n`), a sorok között egy sortöréssel (`\n`), a versszak elején a számával (`1. `).
  - **Az ének adatai** (nem kötelezők; a fájlban minden énekben megvannak, a `scoreId` utáni sorban). Az
    énekeskönyv „szöveg / fordítás / dallam” sorát követik, a nevek és az évszámok külön mezőben. A szövegpanel
    Megjegyzések lapján, a Leírás részben jelennek meg címkézett sorokban (`dl`); az üres mezők kimaradnak. A program
    a `hymnInfo` függvényben olvassa be őket.
    - Kitöltve mind a 667 énekre: a szerzők, évszámok, igehelyek, kiemelt versek és megjegyzések a Református
      Énekeskönyv (RÉ21, 2025-ös utánnyomás) PDF-jéből, a források a függelék gyűjteményi listájából, a leírások a
      Digitális Református Énekeskönyv (enekeskonyv.reformatus.hu) adatlapjairól (503 énekhez van). Eltérésnél a
      nyomtatott könyv adata került be. A forrásokat a Névjegy oldal is megnevezi.
    - `bible` → *Igehely*: a kapcsolódó igehely, szöveg vagy szövegek tömbje (`"Zsolt 42; Zsolt 43"`,
      `["Zsolt 42", "Zsolt 43"]`; a tömb elemei pontosvesszővel kerülnek egy sorba).
    - `textAuthor`, `textYear` → *Szöveg*: a szöveg szerzője vagy eredete, és az évszáma.
    - `translator`, `translationYear` → *Fordítás*.
    - `melodyAuthor`, `melodyYear` → *Dallam*: a dallam szerzője vagy eredete (pl. „G. Franc, Genf”), és az évszáma.
    - `source` → *Forrás*: a forrás kottagyűjtemény(ek) rövid neve, ahogy az énekeskönyv függeléke hivatkozik rájuk
      („Debrecen, 1560; Kolozsvár, 1744”), időrendben.
    - `highlightedVerses` → *Kiemelt versek*: a zsoltároknál az énekeskönyv kiemelt versszakai („1., 4., 6.”).
    - A név és az évszám vesszővel kerül egy sorba („C. Marot, 1539”). Az évszám szöveg vagy szám is lehet; ha csak
      az évszám van meg, csak az látszik.
  - `description` (nem kötelező): további leírás, az adatsorok alatt (a betöltött adatokban: az ének alcíme, az
    énekeskönyv megjegyzései, majd a Digitális Református Énekeskönyv ismertetői; a fájlban bekezdésenként egy sor). A sortörések ugyanúgy, mint a versszakoknál:
    bekezdések tömbje, egy bekezdés a sorai tömbje, pl. `"description": [["Első sor.", "Második sor."], ["Második
    bekezdés."]]`. Egyszerűbb esetben lehet egyetlen szöveg is (`"Első sor\nMásodik sor"`, új bekezdés: üres sor,
    `\n\n`), vagy sorok tömbje (`["Első sor", "Második sor", "", "Új bekezdés"]`, új bekezdés: üres sor).
  - `keywords`: 1–3 kulcsszó a könyvtár kártyáin és kulcsszavas szűrőjében (szabadon bővíthető, új kulcsszó is
    írható; a szűrő magától felveszi). Az első az énekeskönyv témaköre a számtartomány szerint (pl. 401–423:
    „karácsony”, 651–668: „reggel”); a többit (pl. „bizalom”, „bűnbánat”, „dicséret”) a program az énekszövegből
    javasolta: ezeket érdemes átnézni, és ahol kell, javítani.
- `kottakonyvek.json`: `[{ "folder": "enekeskonyv2021", "builtin": true }, { "folder": "genfi" }]`.
  A sorrend a Kottakönyvek oldal sorrendje. A `"builtin": true` könyv beépített: mindig
  elérhető, és magától mentődik a készülékre. A többit a felhasználó töltheti le.
- `<mappa>/index.json`: egy könyv: `id`, `title`, `author`, `description`, `copyright`,
  `cover` (borítókép, nem kötelező, lásd lent), `active` (`false` = alapból elrejtve), `scores` és `preludes`. A letét és az előjáték
  `scoreId` mezője (ennek hiányában az `id`) köti a kottát az énekhez (`enek.json` → `scoreId`).
  További mezők: `name`, `xmlUrl`, `voiceCount`, `composer`, `year`.
  - Az `xmlUrl` a könyv mappájához képest értendő: `"165fm-3k-2017.svg"`, másik könyv
    mappájából `"../genfi/001-bm-3k-2010.mxl"`. A régi `data/...` és `/data/...` alak is működik.
  - A könyv `id`-je ne változzon: a listák ehhez kötik a kiválasztott változatot.
  - `cover`: a borítókép fájlja, az `xmlUrl`-hez hasonlóan a könyv mappájához képest: `"cover": "borito.jpg"`
    (a kép a `data/<mappa>/borito.jpg`), vagy almappából `"kepek/borito.jpg"`. JPEG, PNG, WebP vagy SVG; elég
    kb. 400–600 képpont magas, 100 kB alatti kép. A letöltött könyvvel együtt a készülékre kerül. Ha nincs megadva,
    vagy nem tölthető be, a program a könyv címéből rajzol borítót (lásd: Kottakönyvek oldal).
  - A szerző (`author`) végére került vesszőt a kártya nem mutatja; a `"-"` (ismeretlen) szerző nem jelenik meg.

### Új könyv, új kották

1. Új könyvhöz új mappa a `data/` alatt (pl. `data/kk59/`), benne az `index.json` és a kottafájlok.
2. A mappa neve a `data/kottakonyvek.json`-ba: `{ "folder": "kk59" }`.
3. Borítókép (nem kötelező): a képfájl a könyv mappájába, a neve az `index.json`-ba: `"cover": "borito.jpg"`.

Ha egy meglévő könyvbe kerül új kotta, elég a fájlt feltölteni és az `index.json`-t bővíteni.
A letöltött könyvnél a Kottakönyvek oldalon megjelenik a „Frissítés” gomb, a beépített könyv
magától frissül. A program az `index.json` változásából veszi észre a frissítést. Ha egy kottát (vagy a borítóképet)
ugyanazzal a fájlnévvel cserélsz le, az `index.json`-ban is változtass valamit, például a
könyv `"version"` mezőjét (`"version": "2026-10-01"`). Frissítéskor a lecserélt fájl is letöltődik.

## Oldalmenü, telefonon menügomb

- Az oldalmenü a jobb vagy a bal szélen van (Beállítások → Oldalmenü helye).
- **Telefonon, álló helyzetben** (legfeljebb 640 képpont széles, álló ablakban) az oldalmenü rejtve van, így a lapok a
  teljes szélességet kapják. A főoldalak (Könyvtár, Listák, Kottakönyvek, Beállítások, Névjegy) fejlécében a
  **menügomb** (☰) húzza elő, azon az oldalon, ahol az oldalmenü lenne; a gombok mellett a nevük is látszik.
  - Bezárul: menüpontra vagy a háttérre koppintva, Escape-pel, a vissza gombbal, és ha a kijelző elfordul.
  - Nyitáskor a fókusz a menü aktív pontjára kerül, Escape után vissza a menügombra.
  - A részletes oldalakon (ének, lista szerkesztője, lejátszó) nincs menügomb, ott a vissza gomb van.
  - A feltétel az `app.js` `MENU_DRAWER_QUERY`-je és a `style.css` megfelelő `@media` szabálya (a kettőnek egyeznie kell).

## Névjegy

- **Használati útmutató:** link a [docs/](docs/README.md) útmutatóra a GitHubon (`GUIDE_URL`), új lapon.
- **Hiba bejelentése:** új levél a `feedback@zseli.hu` címre (`FEEDBACK_EMAIL`), „OrgonaTár hibabejelentő” tárggyal.
  A levél elején üres hely a leírásnak, a végén a hiba kereséséhez hasznos adatok: böngésző (user agent), ablakméret,
  böngészőben vagy a kezdőképernyőről nyílt-e meg, és a program címe. Küldés előtt mind átírható. A cím szövegként is
  ott van, ha a készüléken nincs levelezőprogram.

## Beállítások

Széles kijelzőn (pl. fekvő 10"-es tableten) két oszlopban: balra a Megjelenés, jobbra a Kottanézet és lejátszó, alatta
a Kottagrafika; keskenyebb kijelzőn egymás alatt. A Beállítások gombot újra megnyomva a program oda lép vissza,
ahonnan a beállításokba jöttél. A lenyíló menük mindenhol a program saját stílusában jelennek meg (nem a böngészőéi).

- **Megjelenés:** színséma, háttér, betűtípusok, az oldalmenü helye.
  - Színséma: lásd lent („Színsémák és háttér”).
  - Háttér: **egyszínű** (alapértelmezett), **átmenet** (nagyon enyhe, sugaras: belül kissé sötétebb, vagy a szélek
    felé sötétebb), **textúra** (a világos felületeken enyhe papírszemcse, a türkiz oldalsávon, fejléceken és
    gombokon bőrkötés-szemcse).
  - Betűtípus (a feliratok és az énekszövegek betűi): **Figtree** (alapértelmezett), Nunito Sans, Onest, DM Sans,
    Atkinson Hyperlegible Next. Lenyíló menü: lenyitva mindegyik a saját mintaszövegével látszik.
  - Énekszámok és oldalcímek (talpas betű, a régi korálkönyvek mintájára): **Old Standard TT** (alapértelmezett,
    a régi korálkönyvhöz legközelebbi), DM Serif Text (vaskosabb), Libre Bodoni. Ezzel jelennek meg az
    énekszámok (könyvtár, ének fejléce, lejátszó, listák, énekválasztó) és a főoldalak címe. Lenyíló menü,
    mintákkal.
  - Mind a programmal csomagolt, szabad (SIL OFL) betűtípus (`fonts/`); a választás után a többi törölhető
    (`fonts/README.md`).
- **Kottanézet és lejátszó:** szövegpanel, kotta szélessége, óra a lejátszóban. (Az oldalsó szövegpanel szélessége nem
  beállítás: alapméretben a kottanézet 15%-a, legalább 200 px, és énekenként a panel fogantyújával állítható, lásd lent.)
- **Adatok mentése és megosztása** (`DataSection`): a felhasználó adatainak mentése fájlba és visszatöltése (biztonsági
  mentés, átvitel másik eszközre).
  - Ujjrendek és jelek: a darabszámok (letét, jelölt hang), **Mentés fájlba** (`orgonatar-ujjrendek-<dátum>.json`:
    `{ "type": "orgonatar-ujjrendek", "version": 1, "saved", "blocks": { "<letét>": { "hymn", "name" } },
    "fingerings": <az orgonista_fingerings tartalma> }`; a `blocks` csak az importálás előnézetéhez kell), **Importálás**
    (az ujjrend importálásának ablaka, lásd lent).
  - Liturgikus listák: **Mentés fájlba** (`orgonatar-listak-<dátum>.json`: `{ "type": "orgonatar-listak", "version": 1,
    "saved", "playlists": [{ "id", "name", "items": [{ "hymnNumber", "variationId", "preludeId", "verses" }] }] }`),
    **Betöltés fájlból**: előnézet; az ugyanilyen nevű és tartalmú listák kimaradnak, a többi a meglévők mellé kerül. A
    lista azonosítója (a létrehozás ideje, ez adja a Listák oldal sorrendjét) megmarad, ha szabad; az énekek új
    tételazonosítót kapnak.
- **Kottagrafika:** a kotta rajzolata. Kottafont: **Leipzig** (tömöttebb, alapértelmezett) vagy
  **Bravura** (szellősebb); mindkettőt ugyanazon a mintakottán mutatja (választógombokkal). A minták a lap
  megjelenése után rajzolódnak ki, így a lap tableten is azonnal megnyílik, és a böngészőben megmaradnak
  (`orgonista_font_samples_*`), így később már nem kell újra kirajzolni őket. Az új kottagrafikai
  beállítások is ide kerülnek (`app.js`: `SettingsView`, „Kottagrafika” szakasz). A Verovio többi
  beépített fontja (Gootville, Leland, Petaluma) a `SCORE_FONTS` listával kapcsolható be.

## Színsémák és háttér

Színséma (a választóban színmintával): **Pergamen** (alapértelmezett), Papirusz, Sötét papirusz, Törtfehér.

- A Pergamen színei a `style.css` elején, a `--pergamen-*` változókban vannak; a színek
  szerepét (kártya, keret, kiemelés stb.) a `.theme-pergamen` blokk rendeli hozzájuk.
- A `:root` `--col-*` értékei a Papirusz téma színei. A háttér, a szöveg, az oldalsáv és
  az akcentus színét témánként az `app.js` (`THEMES`) állítja be.
- A háttér (`BACKGROUNDS`) az `.app-root` `bg-*` osztálya; a megvalósítás a `style.css` „Háttér” részében. Az
  átmenetek sugaras színátmenetek a háttérszínen; a textúrák SVG-zajból (feTurbulence) készült, kis képek
  (`--tex-paper-grain`, `--tex-paper-cloud`, `--tex-leather`). A papírszemcse szorzó, a bőrszemcse lágy fény
  keveréssel kerül a felületre, így a színt mindig a színséma adja.

## Tárolás

A listák, a beállítások, a szövegpanel énekenkénti elrendezése, az énekekhez írt megjegyzések és regisztrációk,
a letétek értékelése, az énekek transzponálása és az ujjrendek a böngésző localStorage-ában vannak (`orgonista_playlists`,
`orgonista_settings`, `orgonista_lyrics_layouts`, `orgonista_hymn_notes`, `orgonista_score_ratings`,
`orgonista_transpositions`, `orgonista_fingerings`; a kottafont-minták rajza:
`orgonista_font_samples_*`), a letöltött kottakönyvek a böngésző Cache Storage tárolójában
(`orgonatar-konyv:<mappa>:…`). Mindez eszközönként külön tárolódik.

## Kottakönyvek oldal

- A könyvek kártyái nagyobb kijelzőn több oszlopban állnak. Egy kártya legalább 440 képpont széles, így kb. 1000
  képpont széles ablaktól 2 oszlop fér el (pl. fekvő tableten, 1024–1280 képpont, és a legtöbb laptopon), kb. 1460-tól 3
  (pl. 1600 és 1920 képpont; a lista legfeljebb 1520 képpont széles). Állított tableten és telefonon 1 oszlop marad.
  Egy sorban a kártyák egyforma magasak, a letöltés gombjai egy vonalban vannak.
- A kártya bal felén a könyv adatai (cím, kapcsoló, a letétek és előjátékok száma, szerző, leírás, letöltés), a jobb
  felén a borító. A borítókép (`cover`, lásd fent) teljes egészében látszik, mögötte ugyanaz a kép elmosva, halványan
  tölti ki a helyet. Borítókép nélkül a program bőrkötéses borítót rajzol: aranyozott keret, a cím, a „ - ” utáni
  rész alcímként, és a cím végén zárójelben álló évszám (pl. „Korálkönyv - Genfi zsoltárok (2010)”). A kötés színe a
  könyv mappájának nevéből adódik, így könyvenként más, de mindig ugyanaz.
- Telefonon a borító kis kép a kártya jobb felső sarkában, a szöveg körbefolyja.

## Kottakönyvek letöltése, offline működés

- **Letöltés:** a Kottakönyvek oldalon a beépített könyv mindig elérhető. A többit a „Letöltés”
  gomb menti a készülékre (a kottákat és a borítóképet), és csak a letöltött könyvek kottái jelennek meg. A letöltés
  megszakítható, a letöltött könyv törölhető.
- **Internet nélkül:** a letöltött könyvek és maga az oldal is működik (`sw.js`, service
  worker). Ha a hálózat nem válaszol (pl. van WiFi, de nincs internet), néhány másodperc
  után a mentett változat jön. Az első megnyitáskor az oldal a kottarajzolót is letölti
  (tömörítve kb. 2,4 MB), ez is a készüléken marad.
- **Frissítés:** ha a szerveren megváltozik egy letöltött könyv `index.json`-ja, a kártyán
  „Frissítés” gomb jelenik meg. Ilyenkor csak az új és a megváltozott fájlok töltődnek le.
  A szerveren hiányzó fájlokat a letöltés kihagyja, és a kártyán jelzi a hiányzó kották számát (a hiányzó borítóképet
  nem számolja, helyette a rajzolt borító látszik). Ha ezek
  később felkerülnek, a program a következő megnyitáskor magától letölti őket (csak ezeket).
- **iPad, iPhone:** a Safari törölheti a weboldalak tárolt adatait (a letöltött könyveket, a
  listákat és az énekekhez írt megjegyzéseket is), ha az oldalt kb. egy hétig nem nyitod meg. Megbízhatóbb, ha az oldalt a
  Megosztás → „Főképernyőhöz adás” menüvel a kezdőképernyőre teszed, és onnan indítod. Az
  így indított oldal külön tárolót kap, ott újra le kell tölteni a könyveket.
- Az offline működéshez https kell (GitHub Pages), vagy helyben a `localhost` cím. Ha az oldalt
  https nélkül nyitod meg (pl. helyi hálózaton, IP-címmel), nincs letöltés: ilyenkor minden könyv
  a szerverről, internettel használható.

## Könyvtár

- Az énekkártyákon balra az énekszám és a kezdősor, jobbra zárva a letétek és az előjátékok száma (a letöltött,
  bekapcsolt könyvekből), alatta dőlt betűvel az ének kulcsszavai. Keskeny kijelzőn (telefonon) ezek a kezdősor
  alá kerülnek.
- A kereső mellett kulcsszavas szűrő: pl. „karácsony” választásával csak a karácsonyi énekek látszanak (a menüben
  a kulcsszavak mellett az énekek száma). Egy kártya kulcsszavára koppintva is erre szűr (újra koppintva megszűnik).
  A kereső a kulcsszavakban is keres. Új keresésnél vagy szűrésnél a lista az elejére ugrik.
- A szövegmezők (kereső, énekválasztó, listanév) jobb szélén **X** törli a beírt szöveget; a könyvtár keresőjében az
  Escape is. Az X nem ad fókuszt a mezőnek, így tableten nem ugrik fel tőle a billentyűzet.
- A kártyák 50-es csoportokban kerülnek a lapra: az első csoport azonnal, a többi görgetés nélkül, a háttérben (kb.
  egy másodperc alatt), alacsony prioritással, hogy közben a görgetés és a gépelés ne akadjon. A még ki nem rajzolt
  kártyák helye előre le van foglalva (a kártyák mért átlagmagasságával), így a görgetősáv mérete nem ugrál. A
  képernyőn kívüli csoportokat a böngésző nem rendezi el és nem festi ki (`content-visibility: auto`), és egy új
  csoport nem számoltatja újra a többit. (A teljes lista egyszerre felépítve tableten közel egy másodpercig
  foglalta le a programot.)

## Listák

- **Sorrend:** a Listák oldalon (és a Hozzáadás ablak „Cél lista” választójában) a legújabb lista áll elöl. A listák a
  létrehozásuk (importálásuk) sorrendjében tárolódnak, a program fordított sorrendben mutatja őket. A Hozzáadás ablakban
  a cél lista alapból a legújabb.
- **Nézetek:** a fejléc jobb oldalán nézetváltó (csempék / lista, `PLAYLIST_VIEWS`); a választás a beállításokban
  (`playlistView`, alapból `tiles`) megmarad. Lista nélkül a váltó nem látszik.
  - **Csempék** (alapértelmezett): a lista énekei a csempén, alul az Indítás gomb.
  - **Lista:** soronként, a könyvtár énekkártyáinak mintájára: a lista neve (az elején álló `ÉÉÉÉ-HH-NN` dátum talpas
    betűvel, mint az énekszám), jobbra egy sorban a Megosztás, Szerkesztés, Törlés és az Indítás (telefonon csak ikon).
    A lista tartalma itt nem látszik; a sorra koppintva a szerkesztő nyílik meg.
- A lista kártyáján az énekek száma (talpas betűvel, jobbra zárt oszlopban), utána a kiválasztott versszakok
  tömören (egymást követők intervallumként, a többi felsorolva: `1-5`, `1,4`, `1-3,5`), majd a kezdősor, egy
  alapvonalon. A szerkesztőben is így: „Versszakok: 1-3,5”.
- **Átnevezés:** a lista szerkesztőjében a név melletti ceruzával (a dátumgomb itt is működik).
- **Az énekek szerkesztése:** a lista szerkesztőjében az ének melletti ceruzával, vagy az énekre koppintva: a
  versszakok, a letét és az előjáték módosítható (a Hozzáadás ablaka, „Ének szerkesztése” címmel, a mostani
  beállításokkal). Ha a választott letét vagy előjáték ezen az eszközön nem érhető el (pl. egy importált listánál nincs
  letöltve a könyve), az ablak jelzi, és megmarad, amíg mást nem választunk; az előjáték az „Előjáték nélkül” gombbal
  elhagyható. Húzás után, és a fogantyúra kattintva nem nyílik meg.
- A lista szerkesztőjében az énekek húzással rendezhetők át, egérrel és érintéssel is. Érintéssel a bal oldali
  fogantyúnál (⋮⋮) kell megfogni (máshol a lista görgethető); húzás közben a többi ének félrehúzódik, a képernyő
  széléhez érve a lista magától görget.
- Új lista neve: a mező előtti naptár gombbal dátum (ÉÉÉÉ-HH-NN, pl. a szertartás napja) kerül a név elejére,
  utána tovább lehet írni (pl. `2026-10-04 Úrvacsorás istentisztelet`). Újabb dátum választásakor a név elején
  álló dátum cserélődik, a többi marad. A Hozzáadás ablak „+ Új lista…” mezőjében is így működik.
- Az Új lista és a Hozzáadás ablak nem középen, hanem a képernyő felső harmadában nyílik meg, hogy a tablet
  képernyő-billentyűzete ne takarja el az alját.

### Megosztás és importálás

- **Megosztás** (a lista kártyáján vagy a szerkesztő fejlécében): a lista neve és tartalma egyetlen, tömörített
  karakterláncban (a lista kódja, pl. `OT28AzIZPo4uvSXW…`), mellette QR-kód. A kódhoz: **Másolás** (vágólapra),
  **E-mail** (a levélben az énekek listája versszakokkal és a megnyitó link), **Mentés** (`<a lista neve>.txt`: a
  lista, a link és a kód), és ha a készülék tudja (telefon, tablet), **Küldés…** más alkalmazással (pl. üzenetben).
- A QR-kódban a **megosztási link** van (`…/orgonatar/#import=<kód>`): egy másik eszköz kamerájával lefotózva
  megnyílik a program az importálással. Koppintásra a QR-kód az egész képernyőt kitölti (hosszú listánál így
  biztosabban olvasható); Escape vagy koppintás zárja.
- **Importálás** (Listák → Importálás): a kód vagy a link beillesztése (szöveg közepéből, több sorra tördelve is
  felismeri), **Fájl megnyitása** (a mentett `.txt`, vagy fénykép, képernyőkép a QR-kódról), vagy **Kamera** (a
  hátlapi kamerával beolvassa a QR-kódot). Előnézetben látszanak az énekek; a név átírható. Az importált lista
  új listaként kerül a többi mellé, és megnyílik a szerkesztőben.
  - Az énekeskönyvben nem található ének kimarad (az előnézet jelzi). Ha a választott letét vagy előjáték ezen az
    eszközön nem érhető el (pl. nincs letöltve a könyve), az előnézet szól; a lista megjegyzi a választást, a
    könyv letöltése után már az jelenik meg (addig a legjobbra értékelt elérhető letét, előjáték nélkül).
  - A kamerához https kell (GitHub Pages) és a kamera engedélyezése. iPaden, iPhone-on a kezdőképernyőre tett
    program külön tárolót kap: oda a programon belül, a Kamera gombbal (vagy a kód beillesztésével) érdemes
    importálni, mert a telefon kamerájából megnyitott link a Safariban nyílik meg.
- **A kód formátuma:** `OT2` és utána csak betűk és számjegyek (0–9, A–Z, a–z), így a levelezők linkfelismerője
  nem vág le belőle, és dupla kattintással egyben kijelölhető. Belül:
  - a lista szövegként: `<név>` RS `<ének>` RS `<ének>` …, egy ének `<énekszám>` US `<letét>` US `<előjáték>` US
    `<versszakok>` (RS = 0x1E, US = 0x1F; a versszakok 1-től számozva, tömören, pl. `1-3,5`; a végéről az üres mezők
    elmaradnak);
  - ez UTF-8-ban, DEFLATE-tel tömörítve (`libs/fflate/`), elé a szöveg CRC-32-jének alsó 24 bitje (3 bájt): a sérült
    vagy csonka kódot így gyakorlatilag mindig felismeri (kb. 16 millióból egy eset csúszhatna át), és nem ad belőle
    hibás listát;
  - a bájtok 62-es számrendszerben: 5 bájtonként 7 jel (a végén 1–4 bájt 2, 3, 5, 6 jellel).

  Egy 6 énekes lista kódja kb. 200, egy 20 énekesé kb. 270 jel. A linkben és a QR-kódban ugyanez a kód van. A
  korábbi, olvasható kódokat (`OT1:<énekek száma>:<név>;…`) és linkjeiket is elfogadja.
- A megosztási link a program futása közben a címsorba írva is működik: az importálás ablaka nyílik meg, a program
  ott marad, ahol volt (a link előzmény-bejegyzését a program visszavonja). Az ujjrend linkje (`#ujjrend=`) ugyanígy.

## A letétek értékelése

- Az ének oldalán a kotta beállításainak panelén (a jobb alsó sarokban lebegő gomb, lásd lent) 1–5 csillag: a látott
  letét értékelése. Egy csillagra koppintva annyi csillag; ugyanarra újra koppintva törlődik. Billentyűzettel (a
  csoport egy gombja kap fókuszt) a nyilak állítják, a Delete törli; egérrel fölé állva előnézet. A lejátszó paneljén
  nincs, hogy az istentisztelet alatt egy véletlen koppintás ne értékeljen.
- Csak ezen a készüléken tárolódik (`orgonista_score_ratings`, a letét azonosítójával: `{ "fazekas_kottak_165": 5 }`;
  a letét azonosítója a könyv `id`-je és a kotta `id`-je, ugyanaz, amit a listák is tárolnak).
- **A letétek sorrendje** (`rankVariations`): elöl a jobbra értékeltek; az egyformán értékeltek és az értékeletlenek
  a könyvek sorrendjében (`data/kottakonyvek.json`), de a beépített könyv(ek) kottái hátrébb. Ebben a sorrendben
  állnak a letétválasztóban (az ének oldalán és a Hozzáadás ablakában, az értékeltek mellett a csillagaikkal), és az
  első a letét alapértelmezése:
  - az ének megnyitásakor;
  - hozzáadáskor a lista szerkesztőjéből (az ének oldaláról az ott látott letét kerül a listára);
  - ha egy lista letétje ezen az eszközön nem érhető el (pl. importált lista, nincs letöltve a könyve).
  A lejátszó fejléce is ezt a letétet írja ki, ha a listán tárolt nem érhető el.

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
- **A kotta beállításai** (FAB): a kottaterület jobb alsó sarkában lebegő kerek gomb (`.score-fab`) nyitja a
  panelt; a kotta alatt nincs külön sáv, a kotta a terület aljáig ér. A panel a gombbal, Esc-pel vagy mellé
  koppintva zárul; a gomb és a panel nem lapoz. Sorai: **Nagyítás**, **Hangnem**, **Ujjrend** (ujjrend, pedál- és
  játékmódjelek; a Verovióval rajzolt kottánál) és az ének oldalán **Értékelés**. A letét éve és szólamszáma már nem
  látszik a kotta alatt (a lejátszó fejlécében igen).
  A lejátszóban a gomb nyugalomban csak egy halvány, körvonalas kör, mert ott a kotta gyakran a gomb alá is ér.
- A Nagyítás −/+ gombja a legnagyobb méretet állítja 10%-os lépésekben, a felirat a ténylegesen látott méretet
  mutatja. A + nem használható, ha a kotta nagyobban már nem férne ki (képes kottánál: ha elérte a
  teljes szélességet).
- **Transzponálás:** a Hangnem −/+ gombja félhangonként, legfeljebb ±6 félhanggal transzponál.
  - Az énekszámhoz tárolódik (`orgonista_transpositions`, pl. `{ "165": -2 }`; 0-nál törlődik). Az ének minden
    letétjére és előjátékára érvényes, az ének oldalán és a lejátszóban is; a lejátszóban állítva is ide kerül.
  - A Verovio `transpose` opciója végzi, betöltéskor. Félhangszám helyett hangközt kap (pl. `+m2`, `-M2`), mert a
    félhangszámnál bővített prímet választana (F-dúr +1 → Fisz-dúr). A program a kotta előjegyzéséből kiszámolja a
    lehetséges célhangnemeket, és a legkevesebb előjegyzésűt választja (C-dúr +1 → Desz-dúr, nem Cisz-dúr); egyenlő
    számnál a tiszta, kis vagy nagy hangközt, végül fölfelé a keresztes, lefelé a bés hangnemet.
  - A képként tárolt kotta (PNG, JPG) nem transzponálható: a gombok tiltva, a panel ezt kiírja.
  - A transzponált kotta is a fenti módon igazodik a helyhez (az igazító a transzponálás értékét is figyeli).
- **Ujjrend, pedál, játékmód:** a panel Ujjrend sorában **Szerkesztés** / **Kész** és **Megosztás**.
  - A jeleket a Verovio rajzolja: a program a betöltött MEI-be írja őket (`withMarks`), és újratölti. Így a kotta
    részei: a nagyítással méreteződnek, a sortöréssel a hangjukkal mennek, és a Verovio rendezi el őket.
    - Ujjrend: `<fing startid="#hang" staff="n" place="…">`, a legfelső sornál `above`, a többinél `below`.
    - Pedál: `<fing>` a `∧` (lábhegy) és `∪` (sarok) jelekkel; a jobb lábé `above`, a bal lábé `below`.
    - Staccato, tenuto, akcentus, marcato: a hang `<artic artic="stacc ten …">` eleme (a staccato és a tenuto együtt a
      portato). Kétszólamú sorban `place` a szólam szerint, különben a Verovio dönt.
    - Korona: `<fermata>`; levegővétel: `<breath ho="3">` (a hang után); cezúra: `<caesura>`.
    - A felső és az alsó szólamot ütemenként a hangok átlagos magassága dönti el (`rank`), nem a MEI `layer`
      sorszáma: a Fazekas-kottákban pl. az alsó sorban az 1. szólam a basszus. A korona és a levegővétel a felső
      szólamnál fölé, az alsónál (és az egyszólamú alsó soroknál) alá kerül.
    - A `<fing>`-ek ütemenként a `</measure>` elé kerülnek, a hangmagasság szerint emelkedő sorrendben (közös hangnál a
      felső szólamé később), így az egy időben szóló hangok számai közül felül mindig a magasabb hangé áll.
  - A hang azonosítója a kotta szerkezete szerint: `ütem.sor.szólam.sorszám` (az ütem a sorrendje szerint 0-tól, a sor és
    a szólam a MEI `n`-je, a sorszám a hang helye a szólamban; `meiNoteIndex`). A Verovio `xml:id`-je MusicXML-nél
    minden betöltéskor más, ez viszont állandó, és a transzponálás sem változtat rajta.
  - Szerkesztéskor a hangok (`g.note`) `data-fkey` jelet kapnak. Koppintásra a legközelebbi hangfej választódik ki (az
    egymást fedő hangfejeknél az újabb koppintás a következőt). A kiválasztott hang `fing-selected` osztályt kap.
  - Mellette nyílik a billentyűzet (`.fing-pad`), a kijelző (`MarksPreview`) alatt három sorral:
    - Ujj: 1–5, „–” (ujjcsere vagy lábváltás: az utoljára írt ujjra vagy lábra vonatkozik), ⌫.
    - Pedál: ∧ és ∪, J (jobb) és B (bal) lábra.
    - Játékmód: kapcsolók (`aria-pressed`).

    Legfeljebb négy ujj és lábanként három pedáljel írható. A meglévő ujjrendet és pedáljelet az első gombnyomás
    felülírja. Billentyűzettel: 1–5, `-`, Backspace; a játékmód betűi S, T, A, M, K, L, C; Enter, Delete, Esc.
  - A kotta fölötti sáv (`.fing-bar`) a kotta helyét csökkenti (a kotta újra kifér), így nem takar ki hangot.
    Szerkesztés közben a kotta szélére koppintás nem lapoz, nyitott billentyűzetnél a pedál sem.
  - Tárolás: `orgonista_fingerings` = `{ "<letét vagy előjáték azonosítója>": { "<hangnem>": { "<hang>": "<jelek>" } } }`.
    - `"0"`–`"11"`: az ujjrend és a pedál, pl. `"3 J∧∪"`, `"1–2 B∪"`. A hangnem a transzponálás félhangszáma 12-es
      maradékkal (`fingerClass`), így letétenként 12 ujjrend lehet, és a +6 és a −6 közös.
    - `"a"`: a játékmód jelei, minden hangnemben ugyanazok, pl. `"stacc ten ferm"`.
    - A jelek szóközzel elválasztva, mindig ugyanabban a sorrendben (`parseMarks`, `keyMarksText`, `playMarksText`).
      Importáláskor a program ellenőrzi és sorba rendezi őket (`canonMarks`).
    - Változáskor `orgonatar-fingerings-changed` esemény megy ki, erre a nyitott kották és a Beállítások frissülnek.
  - Megosztás: a látott előjáték és letét ujjrendje és pedáljelei az aktuális hangnemben, és a játékmód jelei,
    ugyanabban az ablakban, mint a listáé (`ShareCodeModal`).
    - A kód: `OU1` + base62(CRC-32 alsó 24 bitje + DEFLATE(szöveg)), mint az OT2-nél.
    - A szöveg letétenként és hangnemenként egy rekord (RS-sel elválasztva): `énekszám US letét US hangnem US
      hang=jelek;…` (hangnem: 0–11 vagy `a`).
    - A link: `…#ujjrend=<kód>`.
    - Importálás: `ImportFingeringModal` (kód, link, fájl, QR-kép, kamera, előnézet). Letétenként és hangnemenként
      felülír (a játékmódnál a letét összes játékmódjelét), a többit megtartja (`mergeFingerings`).
  - Képként tárolt kottába nem írható jel.
- A szövegpanel a kotta mellett vagy alatt lehet (a panel jobb felső sarkának gombjai). Kotta nélküli énekeknél is látszik;
  szöveg nélküli énekeknél csak akkor, ha van leírása, megjegyzése vagy regisztrációja.
  - Két lapja van: **Szöveg** és **Megjegyzések**. A fülek lent a panel eszköztárának sorában balra (a fogantyú
    középen, a gombok jobbra), oldalt a gombok fölött vannak (telefonon lent is külön sorban). A választott fül a
    program futása alatt minden éneknél ugyanaz (pl. a lejátszóban lapozva is a Megjegyzések lap marad); a program
    újraindításakor a Szöveg lap jelenik meg. A panel méretét alapméretben a szöveg adja, a Megjegyzések lap ugyanezt
    a területet tölti ki (és görgethető), így fülváltáskor a kotta nem mozdul.
  - **Megjegyzések** lap: lent egymás mellett (ha elfér), oldalt egymás alatt:
    - **Leírás:** az ének adatai (igehely, szöveg, fordítás, dallam, forrás) és a további leírás az `enek.json`-ból
      (lásd fent); csak olvasható. Ha egyik sincs megadva: „Ehhez az énekhez még nincs leírás.”
    - **Megjegyzés:** koppintásra szerkeszthető szöveg (pl. tempó, az előjáték hossza).
    - **Regisztráció:** négy mező: 3. manuál, 2. manuál, 1. manuál, pedál; koppintásra szerkeszthető (a megérintett
      sor kapja a fókuszt; az Enter a következő mezőre lép, az utolsóban ment).
    - A szerkesztő a képernyő **tetején** nyílik meg, és a látható terület méretéhez igazodik (`visualViewport`), így
      tableten, telefonon a képernyő-billentyűzet nem takarja el a szöveget. Mentés: a Mentés gombbal, Ctrl+Enterrel
      vagy a háttérre koppintva; Mégse vagy Escape: a változás elvész. Szerkesztés közben a lapozópedál nem lapoz.
    - A megjegyzés és a regisztráció énekenként, **csak ezen a készüléken** tárolódik (`orgonista_hymn_notes`); a
      lejátszóban is az adott énekhez tartozó jelenik meg. Ha egy énekhez van megjegyzés vagy regisztráció, a
      Megjegyzések fülön pötty jelzi.
  - A T− / T+ a Megjegyzések lap betűméretét is állítja; az oszlopos / folyó szöveg nézetváltó csak a Szöveg lapon van.
  - Oldalt: a versszakok és bennük a sorok egymás alatt; a hosszú sor behúzással törik a következő sorba.
  - Lent, egymás mellett (alapértelmezett): a versszakok oszlopokban, a sorok egymás alatt, törés nélkül: egy
    versszak oszlopa olyan széles, mint a leghosszabb sora (ha nem fér ki minden versszak, oldalra görgethető).
    A refrén külön oszlop az első versszak mellett (dőlt betűvel), így a versszakok oszlopa rövidebb; a lejátszóban
    akkor is látszik, ha az 1. versszak nincs a kiválasztottak között.
  - Lent, egymás alatt („Folyó szöveg” gomb): a versszakok egymás alatt, a soraik folyó szövegként egymás után.
    A panel legfeljebb a kottanézet 30%-át foglalja el, a többi versszak görgethető.
  - Ha a panelen jobbra (oszlopok) vagy lejjebb (folyó szöveg) még van szöveg, a szélén árnyék jelzi.
  - A panel eszköztárán a nézetváltó gombok előtt **T− / T+**: kisebb, nagyobb betű (80–200%).
  - **Átméretezés:** lent az eszköztár közepén, oldalt az eszköztár bal szélén lévő fogantyút húzva (egérrel vagy
    ujjal). Dupla koppintás a fogantyún: vissza az alapméretre.
  - A panel helyét (lent/oldalt), nézetét, méretét és betűméretét a program **énekenként megjegyzi**
    (`orgonista_lyrics_layouts`): legközelebb – a könyvtárban és a lejátszóban is – ugyanígy jelenik meg. A méret a
    kottanézet magasságának, ill. szélességének hányadaként tárolódik, így más méretű kijelzőn is arányos. Amit egy
    énekhez még nem állítottak be, az az alapértelmezés szerint jelenik meg.
- A lejátszó fejlécében balra a lista sorszáma (pl. `1/4`), utána az énekszám és a cím, majd a változat adatai
  (a dőlt utolsó betű sem vágódik le); jobbra az óra.
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
  - A lenyíló menük zárt állapotban nem reagálnak a nyilakra, így a pedál akkor is lapoz, ha egy menü gombján van a
    fókusz (a menü Enterrel vagy szóközzel nyílik).
