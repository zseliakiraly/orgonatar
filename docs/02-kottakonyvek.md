# Kottakönyvek

[← Tartalom](README.md)

A kották kottakönyvekben vannak. Egy könyv egy gyűjtemény, pl. egy korálkönyv vagy egy szerző letétei. A Könyvtárban és
a lejátszóban csak a **letöltött** (és bekapcsolt) könyvek kottái jelennek meg, ezért először itt töltsd le, amire
szükséged van.

![A Kottakönyvek oldal](kepek/konyvek.webp)

1. **Beépített könyv:** mindig elérhető, és magától a készülékre mentődik, le sem kell tölteni.
2. **Kapcsoló:** elrejti a könyv kottáit. Akkor hasznos, ha egy könyvből nem szeretnél választani. A könyv a készüléken
   marad, és visszakapcsolva a kottái újra megjelennek. Az elrejtett könyv kártyája halvány.
3. **Letöltött könyv:**
   - a kártyán a letöltés napja és a mérete látszik;
   - a **Törlés** gombbal eltávolítható a készülékről (a program előtte megerősítést kér).
4. **Letöltés:** a könyv kottái és a borítóképe a készülékre kerülnek.
   - Letöltés közben a kártya mutatja, hány fájl van már meg.
   - A **Mégse** megszakítja a letöltést.
5. **Borító:** a könyv borítóképe. Ahol nincs kép, a program a könyv címéből rajzol egyet.

Nagyobb kijelzőn a kártyák két-három oszlopban állnak, telefonon egymás alatt. Telefonon a borító kis kép a kártya jobb
felső sarkában.

## A könyv adatlapja

A kártyára (vagy a könyv címére) koppintva megnyílik a könyv adatlapja: nagy borító, a cím, a szerző, a leírás és a
kották száma, alatta énekszám szerint felsorolva a **letétek** és az **előjátékok**. Ha a könyvben egy énekhez több
kotta is van, az énekszám után zárójelben a darabszám áll, pl. „42 (2)”. A le nem töltött könyvek adatlapja is
megnyitható, így letöltés előtt látszik, mi van bennük.

## Saját kottakönyv importálása

A **Kottakönyv importálása** gombbal (a kártyák fölött) zip-fájlból vehetsz fel új könyvet, pl. a saját letéteidet.

1. **Zip-fájl kiválasztása:** a zipben a könyv adatai (`index.json`) és a kottafájlok vannak. Ilyen zipet a
   **Kottakönyv-készítő** (a gomb az importálás mellett) állít össze: kitöltöd a könyv adatait, behúzod a kottákat, és
   letölti a zipet; egy korábbi zip ott javítható, bővíthető is (a formátum:
   [Saját kottakönyv: a zip-fájl formátuma](11-kottakonyv-zip.md)).
2. Az ablak megmutatja a könyv címét, a letétek és az előjátékok számát, és szól, ha egy kotta hiányzik a zipből.
3. **Importálás:** a könyv a többi könyv után, **Saját** jelöléssel jelenik meg, és a letöltött könyvekhez hasonlóan
   internet nélkül is használható.

- A könyv csak erre a készülékre kerül. Másik eszközön ugyanezzel a zip-fájllal importálható.
- Ha ugyanazt a könyvet (azonos azonosítóval) újra importálod, a gomb **Csere** lesz: a régi példány helyére az új
  kerül, így a könyv javított, bővített változata is felvehető.
- A **Törlés** gomb eltávolítja a készülékről; visszatenni újbóli importálással lehet.
- Importálni csak akkor lehet, ha a program a megszokott, `https://` kezdetű címén van megnyitva.

## Frissítés

Ha egy letöltött könyvbe új kották kerülnek a szerveren, a kártyán megjelenik az **Új kották érhetők el** felirat és a
**Frissítés** gomb. Frissítéskor csak az új és a megváltozott fájlok töltődnek le. A beépített könyv magától frissül.

Ha a kártyán **„N kotta hiányzik a szerverről”** áll, a könyv néhány kottafájlja még nincs fent a szerveren. A többi
kotta ettől használható. Ha a hiányzók később felkerülnek, a program a következő megnyitáskor magától letölti őket.

## Internet nélkül

- A letöltött könyvek kottái és maga a program internet nélkül is működnek.
- Internet nélkül:
  - az oldal tetején figyelmeztetés jelzi, hogy nincs kapcsolat;
  - a le nem töltött könyvek kártyáján „Nem érhető el: nincs internetkapcsolat” áll.
- Érdemes az istentisztelet előtt interneten megnyitni a programot. Ilyenkor a beépített könyv magától frissül, a
  többinél pedig a kártya jelzi, ha frissítés érhető el.
- Letölteni csak akkor lehet, ha a programot a megszokott, `https://` kezdetű címén nyitod meg. Ha helyi hálózaton,
  IP-címmel nyitod meg, nincs letöltés: ilyenkor minden kotta internettel, a szerverről jön.

---

[← Első lépések](01-elso-lepesek.md) · [Tovább: Könyvtár és az ének oldala →](03-konyvtar.md)
