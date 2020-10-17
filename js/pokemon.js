const miCarrusel = document.getElementById("miCarrusel");

/**
 * NUMEROS ALEATORIOS
 * aleatorio(inicio, fin)
 */
const aleatorio = (a, b) => {
    return Math.round(Math.random() * (b - a) + parseInt(a));
}

/**
 * CARROUSEL
 */
const flkty = new Flickity(miCarrusel, {
    // options
    // cellAlign: "left",
    // contain: true,
    groupCells: true,
});