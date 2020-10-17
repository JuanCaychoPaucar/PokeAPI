let limit = "20";
const URL_BACKEND = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=`;

const cargando = document.getElementById("cargando");

const selectListado = document.getElementById("selectListado");
const listadoPokemon = document.getElementById("listado-pokemon");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

// SELECT LISTADO
const setPaginacion = (limit) => {
  getListadoPokemon(URL_BACKEND + limit);
};

selectListado.onchange = (e) => {
  let op = selectListado.options[selectListado.selectedIndex].value;
  setPaginacion(op);
};

// GET IMAGEN DEL POKEMON
// const getImagenPokemon = (url) => {
//   return fetch(url).then((peticion) => {
//     peticion.json().then((data) => {
//       data.sprites.other.dream_world.front_default;
//     });
//   });
// };

// DIBUJAR LISTADO POKEMON
const dibujarListadoPokemon = (arreglo) => {
  //borramos los cards de polemones
  listadoPokemon.innerHTML = "";

  //botones
  btnAnterior.onclick = () => {
    if (arreglo.previous === null) {
      return;
    }
    getListadoPokemon(arreglo.previous);
  };

  btnSiguiente.onclick = () => {
    if (arreglo.next === null) {
      return;
    }
    getListadoPokemon(arreglo.next);
  };

  /**
   * REALIZAMOS UNA PROMESA PARA OBTENER LAS RUTAS DE LAS IMAGENES,
   * MIENTRAS EJECUTAMOS EL FOREACH
   */

  arreglo.results.forEach((element) => {
    fetch(element.url).then((peticion) => {
      peticion.json().then((data) => {
        // data.sprites.other.dream_world.front_default;

        let listadoContenedorCard = document.createElement("div");
        let listadoCard = document.createElement("div");
        let listadoCardFigure = document.createElement("div");
        let listadoCardImagen = document.createElement("img");
        let listadoCardBody = document.createElement("div");
        let listadoNombrePokemon = document.createElement("p");

        listadoCardImagen.src = data.sprites.other.dream_world.front_default;
        listadoNombrePokemon.innerText = element.name;
        listadoContenedorCard.classList.add(
          "col-lg-3",
          "col-md-4",
          "col-sm-6",
          "col-10",
          "mb-4"
        );
        listadoCard.classList.add(
          "card",
          "shadow-sm",
          "bg-white",
          "rounded",
          "border-0"
        );
        listadoCardFigure.classList.add("a");
        listadoCardImagen.classList.add("card-img-top", "p-3");
        listadoCardBody.classList.add("card-body");
        listadoNombrePokemon.classList.add(
          "card-text",
          "text-center",
          "font-weight-bold",
          "lista-nombre"
        );
        listadoContenedorCard.appendChild(listadoCard);
        listadoCard.appendChild(listadoCardFigure);
        listadoCardFigure.appendChild(listadoCardImagen);
        listadoCard.appendChild(listadoCardBody);
        listadoCardBody.appendChild(listadoNombrePokemon);
        listadoPokemon.appendChild(listadoContenedorCard);
      });
    });
  });
};

// GET LISTADO POKEMON
const getListadoPokemon = (enlace) => {
  cargando.removeAttribute("hidden");

  fetch(enlace).then((peticion) => {
    peticion.json().then((data) => {
      console.log(data.results);
      dibujarListadoPokemon(data);
      cargando.setAttribute("hidden",true);
    });
  });
  
};

getListadoPokemon(URL_BACKEND + limit);

// window.addEventListener("load", function (event) {
//   console.log("'Todos los recursos terminaron de cargar!");
// });