# QR-kód (listák megosztása és importálása)

A listák megosztásakor a program QR-kódot rajzol, importáláskor a kamerával vagy egy képből olvassa be.

## qrcode-generator (QR-kód rajzolása)

- Fájl: `qrcode.min.js`, a [qrcode-generator](https://www.npmjs.com/package/qrcode-generator) npm-csomag 2.0.4-es
  változatának `dist/qrcode.js` fájlja, tömörítve (esbuild `--minify`), egyébként változatlanul.
- Licenc: MIT. Szerző: Kazuhiko Arase. Forráskód: <https://github.com/kazuhikoarase/qrcode-generator>

```
Copyright (c) 2009 Kazuhiko Arase

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

A „QR Code” a DENSO WAVE INCORPORATED bejegyzett védjegye.

## jsQR (QR-kód felismerése)

- Fájl: `jsQR.min.js`, a [jsqr](https://www.npmjs.com/package/jsqr) npm-csomag 1.4.0-s változatának `dist/jsQR.js`
  fájlja, tömörítve (esbuild `--minify`), egyébként változatlanul.
- Licenc: Apache License 2.0 (`LICENSE-jsQR`). Szerző: Cosmo Wolfe és a jsQR közreműködői.
  Forráskód: <https://github.com/cozmo/jsQR>
- Csak akkor töltődik be, ha a böngészőnek nincs beépített QR-felismerője (`BarcodeDetector`; az androidos
  Chrome-ban van, így ott nem kell).
