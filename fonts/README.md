# Betűtípusok

A felület és az énekszövegek betűtípusai a programmal együtt vannak csomagolva (internet nélkül is
működnek). Mind a SIL Open Font License 1.1 alatt állnak (`OFL.txt` az egyes mappákban), szabadon
felhasználhatók és terjeszthetők.

| Mappa | Betűtípus | Forrás |
| --- | --- | --- |
| `figtree` | Figtree (alapértelmezett) | <https://github.com/erikdkennedy/figtree> |
| `nunito-sans` | Nunito Sans | <https://github.com/Fonthausen/NunitoSans> |
| `onest` | Onest | <https://github.com/simpals/onest> |
| `dm-sans` | DM Sans | <https://github.com/googlefonts/dm-fonts> |
| `atkinson-hyperlegible-next` | Atkinson Hyperlegible Next | <https://github.com/googlefonts/atkinson-hyperlegible-next> |

A fájlok a [Fontsource](https://fontsource.org) `@fontsource-variable/<név>` csomagjaiból (5.3) valók: változó
vastagságú (wght) WOFF2, két részben: `latin` (alap betűk) és `latin-ext` (többek közt az ő, ű). A böngésző
csak azt a részt tölti le, amelyik betűi előfordulnak.

Ha a választás után csak egy betűtípus marad, a többi mappa törölhető; ekkor az `app.js`-ben a `UI_FONTS`
listából és a `style.css` elején a `@font-face` szabályok közül is ki kell venni.
