// =====================================================================
//  USTAWIENIA AR — zmieniaj tylko wartości po prawej stronie.
//  Po zmianie: git add -A  →  git commit -m "..."  →  git push
//
//  Do testów na telefonie bez zmiany pliku można dopisać do adresu:
//    ar.html?p=tygrys&cf=0.0001&beta=100&kamera=1080
//  Wartości z adresu mają pierwszeństwo przed tymi poniżej.
// =====================================================================

window.USTAWIENIA_AR = {

  // ---------- KAMERA ----------
  // Rozdzielczość obrazu z kamery: 480, 720 albo 1080.
  // Wyższa = ostrzejszy obraz, ale wolniejsze śledzenie na słabszych telefonach.
  kamera: 720,

  // Ciągły autofokus (true / false).
  autofokus: true,

  // ---------- WYGŁADZANIE RUCHU MODELU ----------
  // cf — wygładzanie, gdy telefon stoi.
  //   Mniejsze = mniej drgań, ale model wolniej "dopływa" na miejsce.
  //   Domyślnie w MindAR: 0.001   Przykłady: 0.0003, 0.0001
  cf: 0.001,

  // beta — przyspieszanie reakcji przy ruchu telefonu.
  //   Większa = mniejsze opóźnienie, ale przepuszcza drgania.
  //   Domyślnie w MindAR: 1000    Przykłady: 100, 10
  beta: 1000,

  // ---------- POJAWIANIE SIĘ / ZNIKANIE MODELU ----------
  // Ile kolejnych klatek znacznik musi być widoczny, zanim pojawi się model.
  //   Domyślnie w MindAR: 5
  klatkiDoPokazania: 5,

  // Ile kolejnych klatek bez znacznika, zanim model zniknie.
  //   Większa wartość = model nie miga przy chwilowej utracie znacznika.
  //   Domyślnie w MindAR: 5
  klatkiDoUkrycia: 5,
};
