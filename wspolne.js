// Wspólne funkcje dla ar.html i podglad.html

export async function wczytajPrace() {
  const r = await fetch('prace.json', { cache: 'no-cache' });
  if (!r.ok) throw new Error('Nie można wczytać prace.json');
  return r.json();
}

export function znajdzPrace(dane, id) {
  return dane.prace.find((p) => p.id === id) || dane.prace[0];
}

/*
  SKALA — najważniejsza część dla wystawy architektonicznej.

  MindAR mierzy wszystko w "szerokościach znacznika":
    - szerokość obrazka znacznika = 1 jednostka sceny (niezależnie od rozmiaru wydruku),
    - środek obrazka = punkt (0, 0, 0),
    - oś X w prawo, oś Y w górę obrazka, oś Z prostopadle do kartki (do widza).

  Jeśli więc obrazek znacznika przedstawia rzut z góry o szerokości W jednostek modelu
  (np. W = 4.2 m), to model trzeba przeskalować o 1/W — wtedy rzut w AR pokrywa się
  z wydrukiem przy KAŻDYM rozmiarze wydruku (wydruk 42 cm => model w skali 1:10).

  Model .glb (eksport z Rhino) ma oś Y w górę, a rzut Rhino (X, Y) = glTF (x, -z).
  Obrót 90° wokół X przenosi oś "w górę" modelu na oś Z znacznika.
*/
export function transformacjaModelu(praca) {
  const W = praca.szerokoscZnacznika;
  const [cx, cy] = praca.srodekZnacznika || [0, 0];
  const s = 1 / W;
  return {
    pozycja: `${-cx * s} ${-cy * s} 0`,
    obrot: '90 0 0',
    skala: `${s} ${s} ${s}`,
    obrotPlanu: `0 0 ${praca.obrot || 0}`,
  };
}

export function htmlModelu(praca, extra = '') {
  const t = transformacjaModelu(praca);
  return `
    <a-entity rotation="${t.obrotPlanu}">
      <a-entity gltf-model="url(${praca.model})"
                position="${t.pozycja}" rotation="${t.obrot}" scale="${t.skala}" ${extra}></a-entity>
    </a-entity>`;
}

// Dekoder Draco — pozwala wczytać modele .glb skompresowane przy eksporcie (np. Rhino 8 → glTF → Draco).
// Zwykłe, nieskompresowane modele działają bez zmian.
export const DEKODERY = 'gltf-model="dracoDecoderPath: https://www.gstatic.com/draco/versioned/decoders/1.5.6/"';

export const SWIATLA = `
  <a-entity light="type: hemisphere; color: #ffffff; groundColor: #8a7f70; intensity: 1.2"></a-entity>
  <a-entity light="type: directional; intensity: 1.6" position="0.6 -0.8 1.5"></a-entity>`;
