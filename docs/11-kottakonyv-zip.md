# Saját kottakönyv: a zip-fájl formátuma

[← Tartalom](README.md)

A Kottakönyvek oldalon a **Kottakönyv importálása** gomb egy zip-fájlból vesz fel új könyvet. A könyv csak arra a
készülékre kerül, ahol importálták (a szerverre nem), és ott ugyanúgy működik, mint egy letöltött könyv: internet
nélkül is, a kapcsolóval elrejthető, a **Törlés** gombbal eltávolítható. Másik eszközre a zip-fájl átküldésével és
ott újbóli importálásával vihető át.

A zip-fájlt a legegyszerűbb a **Kottakönyv-készítővel** összeállítani (a kezdőoldalon, `orgonatar.martone.hu/kottakonyv-keszito.html`;
a Kottakönyvek oldalról is elérhető): ott a könyv adatait egy űrlapon kell kitölteni, a kottafájlokat behúzni, és a lap
elkészíti a zipet. A korábban elkészített zip ott meg is nyitható, javítható, bővíthető. Ez a leírás a formátumot
mutatja be (pl. ha kézzel készül a zip).

## A zip tartalma

```
konyv.zip
├── index.json          a könyv adatai (kötelező)
├── borito.jpg          borítókép (nem kötelező)
├── 042-3k.mxl          kottafájlok
└── kottak/
    └── 042-elo.mei     (almappában is lehetnek)
```

- Az `index.json` a zip gyökerében legyen. Ha a zipben minden egyetlen mappában van (pl. a mappát tömörítették:
  `Konyvem/index.json`, `Konyvem/042-3k.mxl`), az is jó.
- A kottafájlok és a borítókép útvonala az `index.json`-ban ugyanaz, mint a zipben, az `index.json`-hoz képest
  (`"042-3k.mxl"`, `"kottak/042-elo.mei"`). A kis- és nagybetű számít.
- A zipben lévő, de az `index.json`-ban nem szereplő fájlok kimaradnak.
- Kottafájl: MusicXML (`.xml`, `.musicxml`, `.mxl`), MEI (`.mei`) vagy kép (`.png`, `.jpg`, `.svg`).
- Borítókép: JPEG, PNG, WebP vagy SVG; elég kb. 400–600 képpont magas, 100 kB alatti kép.
- A zip legfeljebb 300 MB lehet. A tömörítés módja mindegy (tárolt vagy DEFLATE).

## Az `index.json`

Ugyanaz a formátum, mint a szerveren lévő könyveké (`data/<mappa>/index.json`, lásd
[Az adatok karbantartása](10-karbantartas.md#egy-könyv-datamappaindexjson)). UTF-8 kódolású JSON.

```json
{
  "id": "kovacs-letetek",
  "title": "Kovács Péter letétei (2026)",
  "author": "Kovács Péter",
  "copyright": "Saját kották",
  "description": "Letétek és előjátékok a vasárnapi istentiszteletekhez.",
  "version": "2026-10-11",
  "cover": "borito.jpg",
  "scores": [
    { "id": "42", "composer": "Kovács Péter", "voiceCount": 3, "year": "2026", "xmlUrl": "042-3k.mxl" },
    { "id": "42", "name": "Könnyített", "composer": "Kovács Péter", "voiceCount": 2, "year": "2026", "xmlUrl": "042-2k.mxl" },
    { "id": "165", "composer": "Kovács Péter", "voiceCount": 4, "year": "2025", "xmlUrl": "165-4k.mei" }
  ],
  "preludes": [
    { "id": "42", "composer": "Kovács Péter", "year": "2026", "xmlUrl": "kottak/042-elo.mei" }
  ]
}
```

A könyv mezői:

| Mező | Kötelező | Jelentése |
| --- | --- | --- |
| `id` | ajánlott | A könyv azonosítója. Hiányában a cím. Utólag **ne változzon**: a listák és a letétek értékelése ehhez kötődik, és ebből ismeri fel a program, ha ugyanazt a könyvet újra importálják (ilyenkor a régi példány lecserélődik). Nem egyezhet a szerveren lévő könyvek azonosítójával (pl. `enekeskonyv2021`, `genfi`). Érdemes egyedi, ékezet nélküli szót választani (`kovacs-letetek`). |
| `title` | igen | A könyv címe. A végén zárójelben álló évszám és a ` - ` utáni alcím a rajzolt borítón külön jelenik meg. |
| `author` | nem | Szerző (az ismeretlen szerző `" - "`: nem jelenik meg). |
| `description` | nem | Leírás (a kártyán és az adatlapon; az adatlapon a sortörés `\n` megmarad). |
| `copyright` | nem | Jogi megjegyzés, forrás (az adatlapon). |
| `cover` | nem | A borítókép útvonala a zipben. Hiányában a program rajzol borítót. |
| `version` | nem | Szabadon írható (pl. dátum), a program nem használja; a generátor ebbe írhatja a készítés idejét. |
| `active` | nem | `false`: a könyv alapból el van rejtve. |
| `scores` | igen* | A letétek. |
| `preludes` | igen* | Az előjátékok. |

\* Legalább egy kotta (letét vagy előjáték) kell; az üres lista elhagyható.

A letétek és az előjátékok mezői:

| Mező | Kötelező | Jelentése |
| --- | --- | --- |
| `id` | igen | A kotta azonosítója (szövegként: `"42"`): az énekeskönyvben (`data/enek.json`) az ének `scoreId`-je, ez köti a kottát az énekhez. A legtöbb éneknél ez maga az énekszám, de néhánynál más (pl. a 60. énekhez `"108"`); ha több ének ugyanazt a `scoreId`-t használja, a kotta mindegyiknél megjelenik. A Kottakönyv-készítő az énekszámból magától kiszámolja. Egy énekhez több letét is tartozhat (ugyanazzal az `id`-vel). |
| `scoreId` | nem | Ha megvan, ez köt az `id` helyett (ugyanúgy, mint fent). |
| `xmlUrl` | igen | A kottafájl útvonala a zipben. |
| `name` | nem | A változat neve a választóban (hiányában a könyv címe). |
| `composer` | nem | Szerző (hiányában a könyv szerzője). |
| `voiceCount` | nem | A szólamok száma (letétnél). |
| `year` | nem | Évszám. |

## Importáláskor

- A program megmutatja a könyv címét, a letétek és az előjátékok számát, és figyelmeztet, ha egy kottafájl hiányzik
  a zipből (a többi ettől importálható, a hiányzó nem jelenik meg).
- Ha a könyv azonosítója (`id`) egy szerveren lévő könyvével egyezik, nem importálható.
- Ha ugyanezt a könyvet már importálták, a gomb **Csere**: a régi példány helyére az új kerül.
- A könyv a böngésző tárolójába kerül, mint a letöltött könyvek (`orgonatar-konyv:sajat-…`), az Android-alkalmazásban
  az alkalmazás tárhelyére. A böngészőben ehhez https kell (vagy `localhost`).

## A program oldaláról

- Kicsomagolás: `libs/fflate/` (`unzipSync`); a Kottakönyv-készítő ugyanebből a fájlból a `zipSync`-kel tömörít.
- `app.js`: `readBookZip` (a zip ellenőrzése és beolvasása), `saveImportedBook` (mentés a készülékre),
  `BookImportModal` (az importálás ablaka). Az importált könyv mappája `sajat-<az id egyszerűsítve>-<ellenőrzőösszeg>`,
  a letöltés adatlapján `"imported": true`.

---

[← Az adatok karbantartása](10-karbantartas.md) · [Tartalom](README.md)
