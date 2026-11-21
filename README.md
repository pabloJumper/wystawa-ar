# Wystawa AR — instrukcja dla studentów

Twój model 3D pojawi się w rozszerzonej rzeczywistości (AR) na wydrukowanym znaczniku.
Zwiedzający skanuje kod QR telefonem, kieruje aparat na znacznik i widzi model stojący
dokładnie na rysunku: w tej samej skali i położeniu.

Strona wystawy: **https://pablojumper.github.io/wystawa-ar/**

---

## Co musisz oddać

Folder nazwany swoim nazwiskiem i tytułem pracy, bez polskich znaków i spacji
(np. `kowalski-pawilon`), a w nim:

| Plik | Co to jest |
|---|---|
| `model.glb` | model 3D, **maks. 15 MB** |
| `znacznik.png` | rzut z góry modelu, kwadrat, ok. 2000 × 2000 px |
| `opis.txt` | dane pracy (wzór niżej) |

Wzór `opis.txt`:

```
Tytuł: Pawilon nad wodą
Autor: Jan Kowalski
Opis: Jedno-dwa zdania o projekcie.
Szerokość znacznika: 6 m
```

---

## Krok 1. Ustaw model w Rhino

1. Jednostki pliku: **metry** (`Units` → Meters).
2. Przesuń model tak, aby **środek rzutu był w punkcie 0,0**, a **parter na wysokości Z = 0**.
3. Narysuj wokół modelu **kwadrat** o okrągłym wymiarze (np. 6 × 6 m), ze środkiem w 0,0.
   Model musi się zmieścić w kwadracie. Zapisz ten wymiar — to **szerokość znacznika**.

> Dlaczego to ważne: telefon dopasowuje model do znacznika właśnie według tego kwadratu.
> Jeśli wymiar się nie zgadza, model w AR będzie za duży albo za mały.

## Krok 2. Przygotuj znacznik (`znacznik.png`)

1. Widok **Top**, rzut **równoległy (Parallel)**. Nie używaj perspektywy.
2. Zapisz obraz dokładnie z obszaru kwadratu z kroku 1, np. przez `ViewCaptureToFile`
   po wcześniejszym `Zoom` → `Window` na kwadrat albo przez render obszaru.
   Obraz ma być kwadratowy, ok. 2000 × 2000 px.
3. Góra obrazka = oś Y w Rhino (północ rysunku). Nie obracaj obrazka.

**Dobry znacznik ma dużo kontrastowych szczegółów na całej powierzchni:** linie, faktury,
cienie, osie, opisy. Telefon śledzi właśnie te detale. Duże puste białe pola działają słabo —
dodaj tło, siatkę, otoczenie lub tytuł pracy w wolnych miejscach kwadratu.

## Krok 3. Wyeksportuj model (`model.glb`)

1. Zaznacz model (bez pomocniczego kwadratu) → `File` → `Export Selected` → format **.glb**.
2. Sprawdź rozmiar pliku: **maks. 15 MB**. Telefon zwiedzającego pobiera go przez internet.
   Jeśli plik jest większy:
   - uprość siatki (`ReduceMesh`) albo zmniejsz gęstość siatki przy eksporcie,
   - usuń niewidoczne elementy (wnętrza, śruby, detale niewidoczne z daleka),
   - zmniejsz tekstury do 2048 px lub mniej.
3. Nie przesuwaj ani nie skaluj modelu po narysowaniu kwadratu z kroku 1.

## Krok 4. Oddaj pracę

Wyślij folder (np. jako `.zip`) prowadzącemu. Twoja praca pojawi się na stronie wystawy.

## Krok 5. Sprawdź swoją pracę na stronie

1. Na stronie wystawy przy swojej pracy kliknij **Kalibracja skali** (na komputerze).
   Półprzezroczysty model musi **dokładnie przykrywać rysunek** znacznika.
   Przycisk **Perspektywa** pokazuje model z boku.
2. Wydrukuj `znacznik.png`, otwórz stronę na telefonie, kliknij **Otwórz AR**,
   zezwól na dostęp do aparatu i skieruj go na wydruk.

Rozmiar wydruku nie zmienia dopasowania, tylko skalę makiety:
znacznik 6 m wydrukowany na 30 cm daje model w skali 1:20.

### Coś nie działa?

| Problem | Przyczyna |
|---|---|
| Model za duży / za mały | Podana szerokość znacznika nie zgadza się z kwadratem z kroku 1 |
| Model przesunięty | Środek kwadratu nie był w punkcie 0,0 albo obraz nie obejmował dokładnie kwadratu |
| Model obrócony | Obraz wykonany w innym widoku niż Top albo obrócony po zapisaniu |
| Model „pływa” / znika | Za mało szczegółów na znaczniku, słabe światło albo błyszczący papier |
| Długo się wczytuje | Za duży `model.glb` |

---

## Dla prowadzącego: dodanie pracy na stronę

1. Utwórz folder `prace/<nazwa>/` i wrzuć `model.glb` oraz `znacznik.png`.
2. Otwórz `kompiluj.html` na stronie wystawy, wybierz `znacznik.png`
   i zapisz pobrany plik jako `prace/<nazwa>/znacznik.mind`.
3. Dopisz pracę w `prace.json`. `szerokoscZnacznika` to wymiar kwadratu w metrach.
   `srodekZnacznika` i `obrot` zostaw jako `[0, 0]` i `0`.
4. Wyślij zmiany:
   ```
   git add -A
   git commit -m "Dodano prace <nazwa>"
   git push
   ```
5. Po około minucie sprawdź **Kalibrację skali** dla nowej pracy.
