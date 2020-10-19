import { URL_BACKEND } from "./variables.js";
const URL_RESOURCE = "pokemon";

const carouselContainer = document.getElementById("carousel-container");
const carousel = document.getElementById("carousel");

// GENERADOR DE NUMEROS ALEATORIOS SIN REPETIR (ID POKEMON)
const arregloSinRepetir = (cantidad) => {
  let arreglo = [];
  let listo = false;
  let cont = 0;

  while (!listo) {
    // Retorna un entero aleatorio entre min (incluido) y max (excluido)
    // Math.floor(Math.random() * (max - min)) + min
    // listaremos solo hasta el pokemon 649, pues el resto tiene imagenes con calidad baja
    const aleatorio = Math.floor(Math.random() * (650 - 1) + 1);
    const rpta = arreglo.find((n) => n === aleatorio);
    if (!rpta) {
      arreglo.push(aleatorio);
      cont++;
    }
    if (arreglo.length === cantidad) listo = true;
  }
  return arreglo;
};

// DIBUJAR CAROUSEL
const dibujarCarousel = (arreglo) => {
  let divFalso = new DocumentFragment();
  // carouselContainer.innerHTML = "";

  arreglo.forEach((elemento) => {
    let carouselCell = document.createElement("div");
    let carouselCellImage = document.createElement("img");

    carouselCell.classList.add("carousel-cell");

    carouselCellImage.classList.add("carousel-cell-image");
    carouselCellImage.setAttribute(
      "data-flickity-lazyload",
      elemento.sprites.other.dream_world.front_default
    );

    carouselCell.appendChild(carouselCellImage);
    divFalso.appendChild(carouselCell);
  });

  carousel.appendChild(divFalso);

  // CONFIGURAMOS EL ATRIBUTO PROPIO DE LA FLICKITY
  let elem = document.querySelector(".carousel");
  let flkty = new Flickity(elem, {
    // options
    fullscreen: true,
    lazyLoad: 1,
  });
};

// OBTENEMOS TODO EL OBJETO POKEMON
const getPokemonAleatorio = () => {
  let fetchs = [];
  let jsons = [];
  // generamos un arreglo de 10 numeros aleatorios no repetidos
  return new Promise((resolve, reject) => {
    arregloSinRepetir(15).forEach((elemento) => {
      let peticion = fetch(`${URL_BACKEND}${URL_RESOURCE}/${elemento}`);
      fetchs.push(peticion);
    });
    Promise.all(fetchs).then((peticiones) => {
      peticiones.forEach((pet) => {
        jsons.push(pet.json());
      });
      Promise.all(jsons).then((rptas) => {
        resolve(rptas);
      });
    });
  });
};

// FUNCION PRINCIPAL
getPokemonAleatorio().then((rptas) => {
  console.log(rptas);
  console.log(rptas.length);
  dibujarCarousel(rptas);
});
