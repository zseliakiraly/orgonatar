# Betűtípusok

A felület, az énekszövegek, valamint az énekszámok és az oldalcímek betűtípusai a programmal együtt vannak
csomagolva (internet nélkül is működnek). Mind a SIL Open Font License 1.1 alatt állnak (`OFL.txt` az egyes
mappákban), szabadon felhasználhatók és terjeszthetők.

## Feliratok és énekszövegek (sans serif)

| Mappa | Betűtípus | Forrás |
| --- | --- | --- |
| `figtree` | Figtree (alapértelmezett) | <https://github.com/erikdkennedy/figtree> |
| `nunito-sans` | Nunito Sans | <https://github.com/Fonthausen/NunitoSans> |
| `onest` | Onest | <https://github.com/simpals/onest> |
| `dm-sans` | DM Sans | <https://github.com/googlefonts/dm-fonts> |
| `atkinson-hyperlegible-next` | Atkinson Hyperlegible Next | <https://github.com/googlefonts/atkinson-hyperlegible-next> |

Változó vastagságú (wght) WOFF2 fájlok.

## Énekszámok és oldalcímek (talpas, a régi korálkönyvek mintájára)

| Mappa | Betűtípus | Forrás |
| --- | --- | --- |
| `old-standard-tt` | Old Standard TT (alapértelmezett) | <https://github.com/google/fonts/tree/main/ofl/oldstandardtt> |
| `dm-serif-text` | DM Serif Text | <https://github.com/googlefonts/dm-fonts> |
| `libre-bodoni` | Libre Bodoni | <https://github.com/googlefonts/Libre-Bodoni> |

Csak a félkövér változatuk van meg (az Old Standard TT-ből és a Libre Bodoniból a 700-as, a DM Serif Textnek
csak egy, eleve vaskos változata van), mert csak az énekszámokhoz és a címekhez kellenek.

## Közös

A fájlok a [Fontsource](https://fontsource.org) `@fontsource/<név>` és `@fontsource-variable/<név>` csomagjaiból
(5.3) valók, két részben: `latin` (alap betűk) és `latin-ext` (többek közt az ő, ű). A böngésző csak azt a
részt tölti le, amelyik betűi előfordulnak.

Ha a választás után csak egy-egy betűtípus marad, a többi mappa törölhető; ekkor az `app.js`-ben a `UI_FONTS`
vagy a `SERIF_FONTS` listából és a `style.css` elején a `@font-face` szabályok közül is ki kell venni. Az
alapértelmezett betűtípusok fájljait a `sw.js` (`APP_FILES`) előre elmenti az internet nélküli használathoz;
ha az alapértelmezett változik, ott is át kell írni.
