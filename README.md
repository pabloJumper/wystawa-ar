# Wystawa AR — prace studenckie

Strona z wystawą AR (MindAR + A-Frame), hostowana za darmo na GitHub Pages.

```
wystawa-ar/
├─ index.html        lista prac + kody QR do wydruku
├─ ar.html           podgląd AR (ar.html?p=<id>)
├─ kalibracja.html   sprawdzenie skali: model nałożony na znacznik, widok z góry
├─ kompiluj.html     zamiana obrazka znacznika na plik .mind
├─ prace.json        lista prac i ich ustawienia
├─ wspolne.js        przeliczanie skali (wspólne dla AR i kalibracji)
└─ prace/<id>/       model.glb, znacznik.png, znacznik.mind
```

## Jak działa skala (najważniejsze)

MindAR mierzy scenę w **szerokościach znacznika**: szerokość obrazka znacznika = 1,
środek obrazka = (0, 0, 0), oś Z wychodzi z kartki. Dlatego wystarczy jedna liczba:

> **`szerokoscZnacznika`** — ile jednostek modelu (np. metrów) obejmuje szerokość obrazka znacznika.

Model jest skalowany o `1 / szerokoscZnacznika`, więc rzut modelu w AR pokrywa się z rysunkiem
**przy każdym rozmiarze wydruku**. Rozmiar wydruku = skala makiety:
znacznik 4,2 m wydrukowany na 42 cm → model w AR w skali 1:10.

`srodekZnacznika: [X, Y]` — współrzędne środka obrazka w rzucie Rhino (domyślnie 0, 0).
`obrot` — obrót modelu w planie, w stopniach (zwykle 0).

## Przygotowanie nowej pracy (Rhino)

1. Model ustaw tak, by środek rzutu był w (0, 0) — albo wpisz inny środek w `srodekZnacznika`.
2. Znacznik: widok **Top, rzut równoległy (Parallel)**, kadr kwadratowy o znanym wymiarze
   (np. narysuj prostokąt 6 × 6 m wokół środka i wyrenderuj/wyeksportuj dokładnie ten obszar).
   Ten wymiar wpisz jako `szerokoscZnacznika`.
3. Eksport modelu: **File → Export → .glb** (metry). Pilnuj rozmiaru: telefon na wystawie
   musi go pobrać — cel to poniżej ~15 MB.
4. Utwórz folder `prace/<id>/`, wrzuć `model.glb` i `znacznik.png`.
5. Otwórz `kompiluj.html`, wybierz `znacznik.png`, zapisz pobrany plik jako `prace/<id>/znacznik.mind`.
6. Dopisz pracę w `prace.json`.
7. Sprawdź na stronie *Kalibracja skali*: półprzezroczysty model musi dokładnie przykrywać rysunek.

Dobry znacznik = dużo kontrastowych detali (linie, faktury, napisy) na całej powierzchni.
Duże puste białe pola słabo się śledzą — warto dodać ramkę, siatkę osi, opis pracy.

## Publikacja na GitHub Pages (pierwszy raz)

Model ma ~38 MB, a przez przeglądarkę GitHub przyjmuje pliki do 25 MB — dlatego najprościej
użyć programu **GitHub Desktop** (limit 100 MB na plik).

1. Załóż konto na github.com i zainstaluj GitHub Desktop (desktop.github.com), zaloguj się.
2. Skopiuj folder `wystawa-ar` w wygodne miejsce (np. na Pulpit, poza folder mind-ar-js).
3. GitHub Desktop → **File → Add local repository** → wskaż folder `wystawa-ar`
   → „create a repository” → **Create repository**.
4. **Publish repository** → odznacz „Keep this code private” → Publish.
5. Na github.com w repozytorium: **Settings → Pages → Source: Deploy from a branch →
   Branch: main, folder: / (root) → Save**.
6. Po 1–2 minutach strona działa pod adresem `https://<login>.github.io/wystawa-ar/`.
7. Każda zmiana: GitHub Desktop → wpisz opis → **Commit to main** → **Push origin**.

Kamera w telefonie działa tylko przez HTTPS — GitHub Pages to zapewnia.
Kody QR na stronie głównej generują się z aktualnego adresu, więc drukuj je z wersji opublikowanej.

## Test lokalny

Strony nie działają po dwukliku (file://) — potrzebny jest lokalny serwer, np. rozszerzenie
„Live Server” w VS Code. Kamera lokalnie działa tylko na tym samym komputerze (localhost).
