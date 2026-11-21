# Wystawa AR — instrukcja dla studentów

Na wystawie wisi lub leży Twój **rzut charakterystyczny w skali 1:200** (np. rzut parteru).
Zwiedzający skanuje kod QR telefonem, kieruje aparat na rzut i widzi nad nim **model 3D budynku**
stojący dokładnie na rysunku: ściany modelu pokrywają się ze ścianami na rzucie.

Wydrukowany rzut jest jednocześnie **znacznikiem AR**: telefon rozpoznaje go po rysunku.

Strona wystawy: **https://pablojumper.github.io/wystawa-ar/**

---

## Co musisz oddać

Folder nazwany swoim nazwiskiem i tytułem pracy, bez polskich znaków i spacji
(np. `kowalski-pawilon`), a w nim:

| Plik | Co to jest |
|---|---|
| `model.glb` | model 3D budynku, **maks. 15 MB** |
| `znacznik.png` | rzut 1:200 dokładnie w obszarze kwadratu (krok 2), ok. 2000–3000 px |
| `opis.txt` | dane pracy (wzór niżej) |

Wzór `opis.txt`:

```
Tytuł: Pawilon nad wodą
Autor: Jan Kowalski
Opis: Jedno-dwa zdania o projekcie.
Szerokość znacznika: 60 m
```

---

## Krok 1. Kwadrat znacznika w modelu

1. Jednostki pliku: **metry**.
2. Ustaw model tak, by **poziom parteru był na Z = 0**. Rzut i model muszą mieć **te same współrzędne**:
   nie przesuwaj ani nie obracaj jednego względem drugiego.
3. Narysuj **kwadrat** ze **środkiem w punkcie 0,0**, o okrągłym boku, który zmieści rzut
   razem z otoczeniem i opisami. Bok kwadratu to **szerokość znacznika** — wpisz go do `opis.txt`.

Bok kwadratu dobierz do wydruku 1:200:

| Bok kwadratu | Wydruk 1:200 | Czy działa |
|---|---|---|
| 20 m | 10 cm | ✗ za mały — telefon słabo śledzi |
| 40 m | 20 cm | ✓ minimum |
| 60 m | 30 cm | ✓ dobrze (zalecane) |
| 80 m | 40 cm | ✓ dobrze |
| 100 m | 50 cm | ✓ bardzo dobrze |

Mały budynek? **Nie zmniejszaj kwadratu poniżej 40 m** — weź więcej otoczenia
(działka, chodniki, zieleń, sąsiednie budynki).

## Krok 2. Rzut = znacznik

Wszystko poniżej musi się znaleźć **wewnątrz kwadratu** z kroku 1:

- **rzut charakterystyczny** (np. parter) w widoku z góry, w swoim miejscu względem modelu,
- **podziałka liniowa** (np. 0–5–10 m) i napis **1:200**,
- **nazwa projektu**,
- **imię i nazwisko**,
- strzałka północy (zalecana).

Opisy umieść w wolnym miejscu kwadratu, np. w rogu, ale **nie na samym budynku**.

### Jak sprawić, żeby telefon dobrze rozpoznawał rzut

Telefon zamienia obraz na odcienie szarości i szuka w nim **kontrastowych detali**: narożników,
krzyżujących się linii, faktur. Duże puste białe pola nie dają mu nic do śledzenia.

- **Ściany przekrojone zaczernij** (poché) — mocny kontrast.
- **Wypełnij wnętrza:** meble, posadzki (różne w różnych pomieszczeniach), schody, opisy pomieszczeń.
- **Opracuj otoczenie:** nawierzchnie, trawa, drzewa z cieniami, chodniki, wymiarowanie.
- **Unikaj pustych pól** i dużych jednolitych plam, także w rogach kwadratu.
- Rysunek nie może wyglądać tak samo po obróceniu — rzuty budynków zwykle i tak są asymetryczne.

Kolor jest dozwolony, ale liczy się **różnica jasności**: dwa kolory o podobnej jasności
telefon widzi jako jedną plamę.

### Zapis do pliku `znacznik.png`

Plik musi obejmować **dokładnie kwadrat** — ani milimetra więcej, ani mniej:

- Rhino: `Print` → Destination: **Raster / Image** → View and Output Scale: **Window** →
  wskaż narożniki kwadratu z przyciąganiem **Osnap End** → rozmiar obrazu kwadratowy, np. 2500 × 2500 px.
- Inny program (ArchiCAD, Revit, AutoCAD, Illustrator): narysuj ten sam kwadrat w rysunku
  i wyeksportuj/przytnij obraz dokładnie do jego krawędzi. Sam kwadrat może zostać jako cienka ramka.

Sprawdź plik w kompilatorze na stronie wystawy (**Kompilator znaczników**, link na dole strony):
pokazuje zielone kropki w miejscach, które telefon rozpoznaje, i ocenę **dobry / średni / słaby**.
Oddaj znacznik z oceną **dobry**. Obszary bez kropek dopracuj detalem.

## Krok 3. Model (`model.glb`)

1. Zaznacz model budynku (bez kwadratu i rysunku rzutu) → `File` → `Export Selected` → **.glb**.
2. W opcjach eksportu włącz **kompresję Draco** (Rhino 8) — plik będzie 5–10 razy mniejszy.
3. **Maks. 15 MB** — telefon zwiedzającego pobiera plik przez internet.
   Celuj w **do 150 tys. trójkątów** na cały budynek (sprawdzisz poleceniem `PolygonCount`).

### Jak zmniejszyć model

- **Siatkowanie przy eksporcie** (Detailed Controls): *Simple planes* włączone,
  *Maximum angle* 15–20°, *Density* 0, *Refine mesh* wyłączone.
  Płaskie ściany są tanie; drogie są krzywizny — walce, zaokrąglenia, okrągłe słupy.
- **Usuń, czego nie widać z zewnątrz:** wnętrza, instalacje, elementy schowane w ścianach,
  śruby i okucia. Okno = szyba + prosta rama.
- **Drzewa i ludzi rysuj na rzucie, nie w modelu** — to najwięksi „zjadacze” trójkątów.
- Gotowe siatki zmniejszysz poleceniem `ReduceMesh`.
- **Materiały jednolite (sam kolor)** nie zajmują prawie nic. Jeśli musisz mieć tekstury:
  **JPG, maks. 2048 px**. Jedna tekstura PNG 4096 px potrafi ważyć więcej niż cały budynek.

| Model | Trójkąty | Rozmiar bez Draco | Z Draco |
|---|---|---|---|
| Bryła, prosta forma | 5–30 tys. | < 2 MB | < 0,5 MB |
| Budynek z otworami, schodami | 50–150 tys. | 3–10 MB | 0,5–2 MB |
| Górna granica | ~200 tys. | ~15 MB | ~2–3 MB |

Nie przesuwaj ani nie skaluj modelu po narysowaniu kwadratu.

## Krok 4. Wydruk w skali 1:200

1. Bok wydruku = bok kwadratu / 200 (60 m → **30 cm**).
2. Drukuj w **rozmiarze rzeczywistym (100%)**, nigdy „dopasuj do strony”.
   Najprościej: `Print` w Rhino ze skalą 1:200 i tym samym oknem (narożniki kwadratu),
   albo ustaw w programie graficznym rozmiar wydruku obrazka na np. 30 × 30 cm.
3. **Sprawdź linijką** podziałkę lub bok kwadratu — drukarki potrafią zmniejszyć wydruk o kilka procent.
   (Dla AR to nie problem, ale wtedy rzut nie jest już w skali 1:200.)
4. Wydruk musi przedstawiać **ten sam rysunek, co `znacznik.png`**, w tym samym kadrze.
   Może być w wyższej rozdzielczości lub wektorowo (PDF), ale bez zmian w treści.
   Tytuł karty, marginesy, logo itp. dodawaj **poza kwadratem**.
5. Papier **matowy**, najlepiej naklejony na sztywną płytę (forex, kapa) — znacznik musi być płaski.
   Połysk i odbicia lamp przeszkadzają w rozpoznawaniu.

## Krok 5. Sprawdź swoją pracę na stronie

Po dodaniu pracy przez prowadzącego:

1. Na stronie wystawy przy swojej pracy kliknij **Kalibracja skali** (na komputerze).
   Półprzezroczysty model musi **dokładnie przykrywać ściany na rzucie**.
   Przycisk **Perspektywa** pokazuje model z boku.
2. Otwórz stronę na telefonie, kliknij **Otwórz AR**, zezwól na dostęp do aparatu
   i skieruj go na wydruk z odległości ok. 30–60 cm.

### Coś nie działa?

| Problem | Przyczyna |
|---|---|
| Model za duży / za mały | Podana szerokość znacznika nie zgadza się z bokiem kwadratu albo plik nie obejmuje dokładnie kwadratu |
| Model przesunięty | Środek kwadratu nie był w punkcie 0,0 albo rzut przesunięto względem modelu |
| Model obrócony | Rzut obrócony względem modelu albo obraz obrócony po zapisaniu |
| Model „pływa” / znika | Za mało detalu na rzucie (ocena „słaby”), słabe światło, błyszczący papier, pofalowana kartka |
| Telefon nie rozpoznaje wydruku | Wydruk różni się od `znacznik.png` (inny kadr, dorysowane elementy, inne kolory) |
| Długo się wczytuje | Za duży `model.glb` |

---

## Dla prowadzącego: dodanie pracy na stronę

1. Utwórz folder `prace/<nazwa>/` i wrzuć `model.glb` oraz `znacznik.png`.
2. Otwórz `kompiluj.html` na stronie wystawy, wybierz `znacznik.png`
   i zapisz pobrany plik jako `prace/<nazwa>/znacznik.mind`.
3. Dopisz pracę w `prace.json`: `szerokoscZnacznika` = bok kwadratu w metrach;
   `srodekZnacznika` i `obrot` zostaw jako `[0, 0]` i `0`.
4. Wyślij zmiany:
   ```
   git add -A
   git commit -m "Dodano prace <nazwa>"
   git push
   ```
5. Po około minucie sprawdź **Kalibrację skali** dla nowej pracy.
