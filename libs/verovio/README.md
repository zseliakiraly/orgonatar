# Verovio (kottarajzoló)

A program a kottákat (MusicXML, MEI) a [Verovio](https://www.verovio.org) segítségével rajzolja ki.

- Fájl: `verovio-toolkit-wasm.js`, a [verovio](https://www.npmjs.com/package/verovio) npm-csomag 6.3.0-s
  változatának `dist/verovio-toolkit-wasm.js` fájlja, **változatlanul**.
- Licenc: GNU Lesser General Public License 3.0 vagy későbbi (`COPYING.LESSER`, amely a GNU GPL 3.0-ra
  épül: `COPYING`). Szerzők: Laurent Pugin és a Verovio közreműködői (RISM Digital Center).
- Forráskód: <https://github.com/rism-digital/verovio/tree/version-6.3.0>
- A Verovio a saját kódjától külön fájlban van, így bármikor lecserélhető egy másik (pl. saját fordítású)
  változatra.

## Kottafontok

A fájlba épített kottafontok (Leipzig, Bravura, Gootville, Leland, Petaluma) és a Liberation szövegfont
a SIL Open Font License 1.1 alatt állnak. A program ezek közül a Leipziget és a Bravurát használja:

- Leipzig: Etienne Darbellay, Jean-François Marti, Laurent Pugin és Klaus Rettinghaus; `OFL-Leipzig.txt`
- Bravura: Daniel Spreadbury, Steinberg Media Technologies GmbH; `OFL-Bravura.txt`

## Frissítés

1. `npm pack verovio@<változat>`, és a csomag `dist/verovio-toolkit-wasm.js` fájlját ide másolni.
2. Ebben a leírásban és az `app.js`-ben (`VEROVIO_VERSION`, a Névjegy forráskód-linkjéhez) a változatszámot átírni.
3. A `sw.js`-ben az `APP_CACHE` számát eggyel növelni, hogy a készülékek a régi példányt töröljék.
