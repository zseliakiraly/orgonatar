# Android-alkalmazás

Az alkalmazás ugyanazt a programot futtatja, mint a weboldal (`app.js`), a [Capacitor](https://capacitorjs.com)
keretrendszerrel csomagolva. A különbség:

- A beállítások, a listák, az ujjrendek és a letöltött kottakönyvek az **alkalmazás saját tárhelyére** kerülnek
  (nem a böngésző localStorage-ába és Cache Storage-ába). Ha az alkalmazást törlik, ezek is törlődnek: a listákat
  előtte érdemes elmenteni (Beállítások → Adatok → Mentés fájlba).
- A kották a szerverről jönnek, a **PHP API-n** keresztül (`api/`), ugyanúgy, mint a weboldalon: az énekeskönyv
  magától letöltődik, a többi könyv kérésre. Internet nélkül a letöltött könyvek és a legutóbb letöltött énekadatok
  használhatók.
- A program fájljai (a kottarajzolóval együtt) az alkalmazásban vannak, ezért gyorsan és internet nélkül is indul.
- A „Mentés fájlba” a rendszer megosztás ablakát nyitja meg (mentés a Fájlok közé, a Drive-ra, vagy küldés).
- A megosztási linkek a weboldalra mutatnak (`ORGONATAR_PUBLIC_URL`).

## Az APK elkészítése

A `.github/workflows/android.yml` munkafolyamat minden `main` ágra feltöltéskor elkészíti az APK-t:
Actions fül → **Android-alkalmazás** → a futás oldalán az **Artifacts** alatt (`orgonatar-apk`). Kiadáshoz
címkét kell feltölteni (`git tag v1.0 && git push origin v1.0`): ekkor az APK a **Releases** oldalra is felkerül,
onnan egy linkkel megosztható.

### Egyszeri beállítás (Settings → Secrets and variables → Actions)

**Variables** (a szerver címe; https kell):

| Név | Példa | Jelentés |
| --- | --- | --- |
| `ORGONATAR_SERVER` | `https://orgonatar.hu/` | A webes program címe. Alapból a GitHub Pages-en lévő változat. |
| `ORGONATAR_API` | `https://orgonatar.hu/api/` | A PHP API címe. Üresen a fájlok közvetlenül a szerverről jönnek (ehhez a szervernek CORS-fejlécet kell küldenie; a GitHub Pages küld). |
| `ORGONATAR_PUBLIC_URL` | `https://orgonatar.hu/` | A megosztási linkek címe (alapból az `ORGONATAR_SERVER`). |

**Secrets** (az aláíró kulcs). Az Android csak akkor engedi az új változatot a régi helyére telepíteni, ha
ugyanazzal a kulccsal van aláírva. Kulcs nélkül fejlesztői (debug) APK készül, amelyet minden futás más kulccsal
ír alá: kipróbálni jó, de frissítés előtt a régit le kell törölni (vele a listákat és a letöltött könyveket is).

1. Kulcs készítése (egyszer, a saját gépen; a `keytool` a Java része):
   ```sh
   keytool -genkeypair -v -keystore orgonatar.jks -alias orgonatar -keyalg RSA -keysize 4096 -validity 36500
   base64 -w0 orgonatar.jks > orgonatar.jks.txt
   ```
2. A titkok:
   - `ORGONATAR_KEYSTORE_BASE64`: az `orgonatar.jks.txt` tartalma
   - `ORGONATAR_KEYSTORE_PASSWORD`: a kulcstár jelszava
   - `ORGONATAR_KEY_ALIAS`: `orgonatar`
   - `ORGONATAR_KEY_PASSWORD`: a kulcs jelszava (ha nem adtál meg külön, ugyanaz, mint a kulcstáré)
3. Az `orgonatar.jks`-t és a jelszavakat őrizd meg biztos helyen (ne a repóban): ha elvész, a meglévő
   telepítéseket nem lehet frissíteni, csak törlés után újratelepíteni.

## Telepítés a telefonra

1. A telefonon nyisd meg az APK linkjét (Releases oldal), és töltsd le.
2. Az Android rákérdez, hogy a böngésző telepíthet-e alkalmazást („Ismeretlen alkalmazások telepítése”): engedélyezd.
3. Frissítéskor ugyanígy: az új APK a régi helyére települ, az adatok megmaradnak.

## Helyi fordítás (nem kötelező)

Android Studio (vagy Android SDK és Java 21) kell hozzá.

```sh
npm install
ORGONATAR_SERVER=https://orgonatar.hu/ ORGONATAR_API=https://orgonatar.hu/api/ npm run android:sync
cd android && ./gradlew assembleDebug    # vagy: npx cap open android (Android Studio)
```

Az `npm run android:sync` lefordítja az `app.js`-t, összegyűjti a program fájljait a `www/` mappába
(`scripts/build-www.mjs`, itt kerül bele a szerver címe a `config.js`-be és a Capacitor kezelője a `native.js`-be),
majd átmásolja őket az `android/` projektbe.

## Fájlok

| Fájl | Szerep |
| --- | --- |
| `capacitor.config.json` | Az alkalmazás azonosítója (`hu.zseli.orgonatar`) és neve. |
| `native/bridge.js` | A készülék tárhelyének és a megosztásnak a kezelője (Capacitor Filesystem, Share); `www/native.js` lesz belőle. |
| `scripts/build-www.mjs` | A `www/` mappa összeállítása. |
| `scripts/android-icons.sh` | Az ikonok és az indítókép a logóból (`icons/favicon.svg`); ha a logó változik, újra kell futtatni. |
| `android/` | Az Android-projekt (a Capacitor sablonjából). Az `app/build.gradle`-ben az aláírás és a verziószám. |
