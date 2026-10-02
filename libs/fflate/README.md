# fflate (tömörítés a listák kódjához)

A listák megosztási kódja a lista tömörített (DEFLATE) tartalma. A tömörítést és a kicsomagolást az
[fflate](https://github.com/101arrowz/fflate) végzi.

- Fájl: `fflate.min.js`: az [fflate](https://www.npmjs.com/package/fflate) npm-csomag 0.8.2-es változatából csak a
  `deflateSync` és az `inflateSync`, egy fájlba csomagolva (globális `fflate` objektum). Készítése:

  ```sh
  echo "export { deflateSync, inflateSync } from 'fflate';" > entry.js
  npx esbuild entry.js --bundle --minify --format=iife --global-name=fflate --target=es2015 --outfile=fflate.min.js
  ```

  (utána a fájl elejére került a licencsor). A kód egyébként változatlan.
- Licenc: MIT (`LICENSE`). Szerző: Arjun Barrett.
- Az `index.html` és a `dev.html` a program előtt tölti be; a service worker előre elmenti, így internet nélkül is
  működik.
