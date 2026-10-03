# Az adatok karbantartása

[← Tartalom](README.md)

Ez a fejezet a webhely gazdájának szól: hogyan kerül fel új kottakönyv, kotta, borítókép vagy énekleírás. Az adatok
a GitHub-tároló `data/` mappájában vannak, és a GitHub weboldalán is szerkeszthetők:
- **Add file → Upload files:** fájlok feltöltése egy mappába;
- a ceruza ikon: egy fájl szerkesztése.

A `main` ágra mentett változás kb. egy perc múlva a weboldalon is megjelenik (a „Weboldal közzététele” munkafolyamat
teszi közzé). A technikai részletek a fő [README](../README.md)-ben vannak.

## A könyvek listája: `data/kottakonyvek.json`

```json
[
  { "folder": "enekeskonyv2021", "builtin": true },
  { "folder": "fazekas" },
  { "folder": "genfi" }
]
```

- A sorrend a Kottakönyvek oldal sorrendje.
- A `"builtin": true` könyv a beépített: mindig elérhető, és magától mentődik a készülékekre.
- A többi könyvet a felhasználók töltik le.

## Egy könyv: `data/<mappa>/index.json`

Minden könyvnek saját mappája van. Benne van az `index.json`, a kottafájlok és a borítókép.

```json
{
  "id": "fazekas_kottak",
  "title": "Fazekas Márton letétei",
  "author": "Fazekas Márton",
  "copyright": "Fazekas Márton saját kották",
  "description": "Saját letéteim, egy része Parola Csaba segítségével készült.",
  "cover": "borito.jpg",
  "scores": [
    { "id": "165", "composer": "Fazekas Márton", "voiceCount": 4, "year": "2017", "xmlUrl": "165fm-4k-2017.mei" }
  ],
  "preludes": [
    { "id": "165", "composer": "Fazekas Márton", "year": "2017", "xmlUrl": "165fm-e-2017.mei" }
  ]
}
```

A könyv mezői:
- `id`: a könyv azonosítója. **Ne változzon**, mert a listák ehhez kötik a kiválasztott letétet.
- `title`, `author`, `description`, `copyright`: a könyv adatai a kártyán.
  - A cím végén zárójelben álló évszám (pl. `(2010)`) a rajzolt borítón külön jelenik meg.
  - A ` - ` utáni rész a rajzolt borítón alcím lesz.
  - Az ismeretlen szerző írható `" - "`-ként: ilyenkor nem jelenik meg.
- `cover` (nem kötelező): a borítókép, lásd lent.
- `active: false` (nem kötelező): a könyv alapból el van rejtve (a felhasználó bekapcsolhatja).

A letétek (`scores`) és az előjátékok (`preludes`) mezői:
- `id`: az **énekszám**. Ez köti a kottát az énekhez. (Ha az énekeskönyvben az énekhez más `scoreId` tartozik, azt
  kell ide írni.)
- `xmlUrl`: a kottafájl a könyv mappájához képest, pl. `"165fm-4k-2017.mei"`. Másik könyv mappájából:
  `"../genfi/001-bm-3k-2010.mxl"`.
- `composer`, `voiceCount` (szólamok száma), `year`, `name`: a választóban és a lejátszó fejlécében megjelenő adatok.

A kottafájl lehet:
- MusicXML: `.xml`, `.musicxml`, `.mxl` (tömörített);
- MEI: `.mei`;
- kép: `.png`, `.jpg`, `.svg` (szkennelt vagy exportált kotta).

A MusicXML és a MEI kottákat a program a kijelzőhöz igazítva rajzolja ki.

### Új könyv

1. Töltsd fel a kottafájlokat egy új mappába, pl. `data/ujkonyv/`. (A GitHubon a „Create new file” mezőbe írt
   `data/ujkonyv/index.json` útvonal létre is hozza a mappát.)
2. Írd meg a mappába az `index.json`-t (lásd fent).
3. Vedd fel a mappát a `data/kottakonyvek.json`-ba: `{ "folder": "ujkonyv" }`.

### Új kották egy meglévő könyvbe

Töltsd fel a fájlokat a könyv mappájába, és bővítsd az `index.json`-t.
- Akik már letöltötték a könyvet, a kártyán a **Frissítés** gombot látják; a beépített könyv magától frissül.
- A program az `index.json` változásából veszi észre a frissítést. Ha egy kottát vagy borítóképet **ugyanazzal a
  fájlnévvel** cserélsz le, az `index.json`-ban is változtass valamit, pl. a könyv `"version"` mezőjét
  (`"version": "2026-10-01"`).

### Borítókép

- A képfájl a könyv mappájába kerül, a neve az `index.json`-ba: `"cover": "borito.jpg"`.
- JPEG, PNG, WebP vagy SVG lehet. Elég kb. 400–600 képpont magas, 100 kB alatti kép.
- A kép álló vagy fekvő is lehet: mindig egészében látszik.
- A borítókép a könyvvel együtt letöltődik.
- Ha nincs megadva, vagy nem tölthető be, a program a könyv címéből rajzol borítót.

## Az énekek: `data/enek.json`

Egy ének a fájlban (versszakonként egy sor, így kézzel is jól javítható):

```json
{ "number": "42", "title": "Mint a szép híves patakra", "keywords": ["zsoltár", "bizalom"], "scoreId": "42", "verses": [
   ["1. versszak 1. sora", "1. versszak 2. sora", "…"],
   ["2. versszak 1. sora", "…"]
] },
```

- `verses`: a versszakok, mindegyik a sorai tömbje (a versszak számát a program írja ki). Refrén: egy `"Refr."` sor,
  utána a refrén sorai.
- `keywords`: 1–3 kulcsszó a Könyvtár kártyáihoz és a kulcsszavas szűrőhöz. Új kulcsszó is írható, a szűrő magától
  felveszi.
- `description` (nem kötelező): az ének himnológiai leírása, a szövegpanel Megjegyzések lapján jelenik meg. Bekezdések
  tömbje, egy bekezdés a sorai tömbje:

  ```json
  "description": [["Szöveg: …", "Dallam: …"], ["Második bekezdés."]]
  ```

  Egyetlen szövegként is megadható: `"Szöveg: …\nDallam: …"`.

## Ha valami nem jelenik meg

- **Hibás JSON:** egy hiányzó vessző vagy idézőjel elég, és a fájl nem olvasható.
  - Egy könyvnél a kártyán „Nem érhető el: hibás index.json (…)” áll, mellette a hiba helye.
  - Mentés előtt érdemes ellenőrizni a fájlt egy JSON-ellenőrzővel (pl. <https://jsonlint.com>).
  - Gyakori hiba: hiányzik a vessző két elem között, vagy vessző áll az utolsó elem után.
- **„N kotta hiányzik a szerverről”:** az `index.json` olyan fájlra hivatkozik, amely nincs a mappában. Ellenőrizd a
  fájlnevet: a kis- és nagybetű is számít.

---

[← Gyakori kérdések](09-gyik.md) · [Tartalom](README.md)
