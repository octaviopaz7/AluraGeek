import { conexionAPI } from "./app.js";
import { validarNombre,validarPrecio,validarImagen } from "./Validaciones.js";

//AGREGAR PRODUCTOS
const enviarFormulario = document.querySelector("[data-enviar]");
enviarFormulario.addEventListener("click", evento => agregarProducto(evento));

async function agregarProducto(evento) {
  evento.preventDefault();

  const imagen = document.querySelector("[data-imagen]").value;
  const nombre = document.querySelector("[data-nombre]").value;
  const precioString = document.querySelector("[data-precio]").value;
  const precio = parseInt(precioString);

   //VALIDACIONES
   let hayErrores = false;
   
   // Limpiar mensajes de error anteriores en el SPAN
    const msjErrores = document.querySelectorAll(".mensajeError");
    msjErrores.forEach(error => error.textContent = "");
  
  if (!validarNombre(nombre)) {  
    document.getElementById("errorNombre").textContent = "El nombre debe tener entre 3 y 30 caracteres";
    hayErrores = true;
  }

  if (!validarPrecio(precio)) {   
    document.getElementById("errorPrecio").textContent = "El precio no puede ser negativo";
    hayErrores = true;
  }
 
  if (!validarImagen(imagen)) {
    document.getElementById("errorImagen").textContent = "La URL de la imagen debe ser válida (jpg, jpeg, png o gif)";
    hayErrores = true;
  }

  // Si hay errores, detener el proceso de agregar el producto
  if (hayErrores) {
    return;
  }

  try {
    await conexionAPI.enviarProducto(nombre, precio, imagen);
    alert(`Producto "${nombre}" agregado con éxito`); 
  } catch (error) {
    console.log(error);
  }
}


//ELIMINAR PRODUCTOS
async function eliminarProducto(idProducto) {
  // Convertir el ID del producto a número
  idProducto = parseInt(idProducto);
  const url = `http://localhost:3001/productos/${idProducto}`;
  const conexion = await fetch (url, {
    method: "DELETE"
  });

  if (conexion.ok) {
    // Mostrar una alerta indicando que el producto ha sido eliminado
    alert("Producto eliminado correctamente.");
  } else {
    throw new Error(`No se pudo eliminar el producto con ID ${idProducto}`);
  }
}

// Función para asignar event listeners a los iconos de basura de las cards para poder borrarlas
const listaProductos = document.querySelector("[data-productos-lista]");

export function asignarEventListeners() {
  listaProductos.addEventListener("click", async (event) => {
    if (event.target.classList.contains("iconoBasura")) {
      const idProducto = event.target.dataset.id;
      try {
        await eliminarProducto(idProducto);
        // Eliminar la card del DOM
      } catch (error) {
        console.error(`Error al eliminar el producto con ID ${idProducto}:`, error);
      }
    }
  });
}







