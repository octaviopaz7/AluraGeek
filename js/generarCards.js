import { conexionAPI } from "./app.js";
import { asignarEventListeners } from "./crearEliminarCards.js";

const listaProductos = document.querySelector("[data-productos-lista]");

export function crearCard(imagen,nombre,precio,id) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${imagen}" class="imagenesCards">
    <div class="cardContenedorInfo">
      <p class="nombreCard">${nombre}</p>
      <div class="contenedorValue">
        <div class="precioCard">${precio}.00€</div>
        <img src="./imagenes/eliminar.png" class="iconoBasura" data-id=${id}>
      </div>
    </div>
  `;
  return card;
}

async function listarProductos(){
  try {
    const productosAPI = await conexionAPI.cargarDB();
    
    productosAPI.forEach(card => listaProductos.appendChild(crearCard(card.imagen,card.nombre,card.precio,card.id)));
     asignarEventListeners();
  } catch {
    lista.innerHTML=`<h2 class="mensaje__titulo">Ha ocurrido un problema con la conexion :( <h2>`;
  }
}

listarProductos();

