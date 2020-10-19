import { URL_BACKEND } from "./variables.js";
const URL_RESOURCE = "pokemon";

let limit = "20";

const cargando = document.getElementById("cargando");

const selectListado = document.getElementById("selectListado");
const listadoPokemon = document.getElementById("listado-pokemon");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

// SELECT LISTADO
const setPaginacion = (limit) => {
  getListadoPokemon(
    `${URL_BACKEND}${URL_RESOURCE}?offset=0&limit=${limit}`
  ).then((resultado) => {
    dibujarListadoPokemon(resultado);
  });
};

selectListado.onchange = (e) => {
  let op = selectListado.options[selectListado.selectedIndex].value;
  setPaginacion(op);
};

// DIBUJAR LISTADO POKEMON
const dibujarListadoPokemon = (arreglo) => {
  //borramos los cards de polemones
  listadoPokemon.innerHTML = "";

  //botones
  btnAnterior.onclick = () => {
    if (arreglo.previous === null) {
      return;
    }
    getListadoPokemon(arreglo.previous).then((resultado) => {
      dibujarListadoPokemon(resultado);
    });
  };

  btnSiguiente.onclick = () => {
    if (arreglo.next === null) {
      return;
    }
    getListadoPokemon(arreglo.next).then((resultado) => {
      dibujarListadoPokemon(resultado);
    });
  };

  /**
   * REALIZAMOS UNA PROMESA PARA OBTENER LAS RUTAS DE LAS IMAGENES,
   * MIENTRAS EJECUTAMOS EL FOREACH
   */

  let divFalso = new DocumentFragment();
  let fetchs = [];
  let jsons = [];

  let miPromesa = new Promise((resolve, reject) => {
    arreglo.results.forEach((element) => {
      let peticion = fetch(element.url);
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

  miPromesa.then((rpta) => {
    // EN ESTE PUNTO YA TENEMOS LA DATA QUE DEBEMOS DE MOSTRAR EN LA PAGINA

    rpta.forEach((data) => {
      let listadoContenedorCard = document.createElement("div");
      let listadoCard = document.createElement("div");
      let listadoCardFigure = document.createElement("div");
      let listadoCardImagen = document.createElement("img");
      let listadoCardBody = document.createElement("div");
      let listadoNombrePokemon = document.createElement("p");

      if (data.sprites.other.dream_world.front_default === null) {
        if (data.sprites.other["official-artwork"].front_default === null) {
          if (data.sprites.front_default === null) {
            listadoCardImagen.src = "../img/Pokeball girando.gif";
          } else {
            listadoCardImagen.src = data.sprites.front_default;
          }
        } else {
          listadoCardImagen.src =
            data.sprites.other["official-artwork"].front_default;
        }
      } else {
        listadoCardImagen.src = data.sprites.other.dream_world.front_default;
      }

      listadoNombrePokemon.innerText = data.name;
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
        "border-0",
        "listado-card"
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
      divFalso.appendChild(listadoContenedorCard);
    });
    listadoPokemon.appendChild(divFalso);
    cargando.setAttribute("hidden", true);
  });
};

// GET LISTADO POKEMON
const getListadoPokemon = (enlace) => {
  cargando.removeAttribute("hidden");

  return new Promise((resolve, reject) => {
    fetch(enlace).then((peticion) => {
      peticion.json().then((data) => {
        resolve(data);
      });
    });
  });
};

getListadoPokemon(`${URL_BACKEND}${URL_RESOURCE}?offset=0&limit=${limit}`).then(
  (resultado) => {
    console.log(resultado.results);
    console.log(resultado);
    dibujarListadoPokemon(resultado);
    
  }
);
