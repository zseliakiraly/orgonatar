# Android-alkalmazás

Az alkalmazás ugyanazt a programot futtatja, mint a weboldal (`app.js`), a [Capacitor](https://capacitorjs.com)
keretrendszerrel csomagolva. A különbség:

- A beállítások, a listák, az ujjrendek és a letöltött kottakönyvek az **alkalmazás saját tárhelyére** kerülnek
  (nem a böngésző localStorage-ába és Cache Storage-ába). Ha az alkalmazást törlik, ezek is törlődnek: a listákat
  előtte érdemes elmenteni (Beállítások → Adatok mentése → Minden adat → Mentés fájlba).
- A **beépített könyv** (az énekeskönyv, `"builtin": true` a `kottakonyvek.json`-ban) az APK része: internet nélküli
  telepítés után is megvan. Ha a szerveren változik az `index.json`-ja, az alkalmazás magától letölti az új változatot.
- A többi könyv kérésre töltődik le a szerverről, a **PHP API-n** keresztül (`api/`). Internet nélkül a beépített és a
  letöltött könyvek, valamint a legutóbb letöltött énekadatok használhatók.
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
| `ORGONATAR_SERVER` | `https://orgonatar.martone.hu/webkantor/` | A webes program címe (ez az alapérték is). |
| `ORGONATAR_API` | `https://orgonatar.martone.hu/webkantor/api/` | A PHP API címe (alapból a szerver címe + `api/`). |
| `ORGONATAR_PUBLIC_URL` | `https://orgonatar.martone.hu/webkantor/` | A megosztási linkek címe (alapból az `ORGONATAR_SERVER`). |

A változókat csak akkor kell beállítani, ha a program máshová költözik.

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

### Az APK a tárhelyen

A kezdőoldal linkje a tárhelyen lévő `orgonatar.apk`-ra mutat. Kiadáskor (címke) a munkafolyamat FTP-n tölti fel, ha
be vannak állítva a titkok:

1. cPanel → FTP Accounts → új fiók, a **Directory** az aldomain mappája (`orgonatar.martone.hu`), így a fiók csak oda ír.
2. GitHub titkok: `ORGONATAR_FTP_HOST` (pl. `ftp.martone.hu`), `ORGONATAR_FTP_USER` (a teljes név, pl.
   `apk@martone.hu`), `ORGONATAR_FTP_PASSWORD`. A feltöltés titkosított (FTPS).

FTP nélkül: a kiadás után az APK-t az Actions futás oldaláról (vagy a Releases oldalról) letöltve, `orgonatar.apk`
néven kell feltölteni az aldomain gyökerébe (cPanel → File Manager → Upload).

### Frissítésjelző

Kiadáskor (címke) a munkafolyamat az APK mellé egy `orgonatar-apk.json` fájlt is feltölt (változat, sorszám). Az
alkalmazás ezt a PHP API-n keresztül kérdezi le (`api/?apk`), legfeljebb 12 óránként, és ha a telepítettnél újabb
változat van (a sorszám, a `versionCode` szerint), felajánlja a letöltését. A lejátszó közben nem szól. A „Később”
után az adott változatról egy hétig nem szól újra; a Névjegy oldalon a **Frissítés keresése** gombbal bármikor
megnézhető. FTP nélkül az `orgonatar-apk.json`-t is kézzel kell feltölteni (a Releases oldalról) az APK mellé.

## Telepítés a telefonra

1. A telefonon nyisd meg a <https://orgonatar.martone.hu/> kezdőoldalt, és töltsd le az APK-t
   (`https://orgonatar.martone.hu/orgonatar.apk`).
2. Az Android rákérdez, hogy a böngésző telepíthet-e alkalmazást („Ismeretlen alkalmazások telepítése”): engedélyezd.
3. Frissítéskor ugyanígy: az új APK a régi helyére települ, az adatok megmaradnak.

## Helyi fordítás (nem kötelező)

Android Studio (vagy Android SDK és Java 21) kell hozzá.

```sh
npm install
npm run android:sync
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
