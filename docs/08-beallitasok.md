# Beállítások

[← Tartalom](README.md)

Az oldalmenü fogaskerék gombja nyitja meg. Újra megnyomva oda visz vissza, ahonnan jöttél. A beállítások azonnal
érvényesek, és ezen a készüléken megmaradnak.

![A Beállítások oldal](kepek/beallitasok.webp)

## 1. Megjelenés

- **Színséma:** Pergamen (alapértelmezett), Papirusz, Sötét papirusz, Törtfehér.
- **Háttér:**
  - Egyszínű;
  - Átmenet – közép (belül kissé sötétebb);
  - Átmenet – szélek (a szélek felé sötétebb);
  - Textúra (papírszemcse, a türkiz elemeken bőrkötés; alapértelmezett).
- **Betűtípus:** a feliratok és az énekszövegek betűi (Figtree, Nunito Sans, Onest, DM Sans, Atkinson Hyperlegible
  Next). A menüben mindegyik a saját mintájával látszik.
- **Énekszámok és oldalcímek:** talpas betű, a régi korálkönyvek mintájára (Old Standard TT, DM Serif Text, Libre
  Bodoni).
- **Oldalmenü helye:** bal vagy jobb oldalon legyen a menü. Álló telefonon ezen az oldalon van a menügomb, és innen
  jön elő a menü (lásd: [Telefonon](01-elso-lepesek.md#telefonon)).

## 2. Kottanézet és lejátszó

- **Szövegpanel megjelenítése:** a szem ikonnal a kotta melletti szövegpanel elrejthető.
- **Kotta szélessége:** a kotta legnagyobb szélessége (100–50%), ha keskenyebb kottát szeretnél.
- **Képernyő ébren tartása:** bekapcsolva (alapértelmezés) a lejátszóban és az ének oldalán nem sötétül el a
  kijelző, akkor sem, ha sokáig nem érsz hozzá. A többi oldalon a készülék szokásos beállítása érvényes. Ha a böngésző
  nem tudja (pl. régebbi Safari), a kapcsolónak nincs hatása.
- **Óra a lejátszóban:** a pontos idő a lejátszó jobb felső sarkában.

Az oldalsó szövegpanel szélességét nem itt kell beállítani: a panel fogantyújával énekenként állítható (lásd:
[Szövegpanel](04-szovegpanel.md)).

## 3. Kottagrafika

- **Kottafont:** a hangjegyek, kulcsok és jelek rajzolata.
  - **Leipzig:** tömöttebb, alapértelmezett.
  - **Bravura:** szellősebb.
  - Mindkettő ugyanazon a mintakottán látszik, így könnyű összehasonlítani.

## 4. Adatok mentése és megosztása

Itt mentheted fájlba a saját adataidat, és itt töltheted vissza őket. Így biztonsági mentés készíthető, és az adatok
másik eszközre is átvihetők. A mentett fájl a böngésző adatainak törlése után is visszatölthető.

![Adatok mentése és megosztása: ujjrendek és jelek (1), liturgikus listák (2)](kepek/adatok-mentese.webp)

- **Minden adat:** teljes biztonsági mentés egy fájlban: a listák, az ujjrendek és jelek, a megjegyzések és
  regisztrációk, a letétek értékelése, a transzponálások, a szövegpanel énekenkénti elrendezése és a beállítások.
  - **Mentés fájlba:** `orgonatar-mentes-<dátum>.json`. Készülékcsere vagy az alkalmazás újratelepítése előtt ezt
    érdemes elmenteni.
  - **Visszatöltés:** előtte egy ablak mutatja, mi van a fájlban. A listák a meglévők mellé kerülnek (a már meglévők
    kimaradnak). A többi adatnál a mentésben szereplő énekek (letétek) adata felülírja az ezen az eszközön lévőt, a
    többi megmarad. A beállítások a mentésből jönnek. Utána a program újraindul.
- **Ujjrendek és jelek:** a sorban látszik, hány letéthez és összesen hány hanghoz van ujjrend, pedál- vagy
  játékmódjel ezen az eszközön.
  - **Mentés fájlba:** minden ujjrend és jel egy fájlba (`orgonatar-ujjrendek-<dátum>.json`).
  - **Importálás:** ujjrend betöltése kódból, linkből, fájlból (a mentett `.json` vagy a megosztott `.txt`) vagy
    QR-kódról (lásd: [Ujjrend megosztása](07-megosztas.md#ujjrend-megosztása)). Ugyanannak a letétnek ugyanabban a
    hangnemben lévő ujjrendjét az importált felváltja, a többi megmarad.
- **Liturgikus listák:**
  - **Mentés fájlba:** az összes lista egy fájlba (`orgonatar-listak-<dátum>.json`).
  - **Betöltés fájlból:** a mentett fájl listái a meglévők mellé kerülnek. Előtte egy ablak mutatja, melyik listák
    jönnek. Ami már megvan ezen az eszközön (ugyanilyen nevű és tartalmú lista), az kimarad, így ugyanaz a fájl
    többször is betölthető.

Egy-egy lista a Listák oldalon, egy ének ujjrendje a kotta beállításainak panelén osztható meg (lásd:
[Megosztás és importálás](07-megosztas.md)).

---

[← Megosztás és importálás](07-megosztas.md) · [Tovább: Gyakori kérdések →](09-gyik.md)
