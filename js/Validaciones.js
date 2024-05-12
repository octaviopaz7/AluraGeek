//VALIDACIONES DEL FORMULARIO 
export function validarNombre(nombre) {
  return nombre.length >= 3 && nombre.length <= 30;
}
export function validarPrecio(precio) {
  return precio >= 0;
}

export function validarImagen(imagen) {
  return /^https?:\/\/.*\.(jpe?g|png|gif)$/i.test(imagen);
}


//LIMPIAR CAMPOS DE FORMULARIO
function limpiarCampos(evento) {
  evento.preventDefault();
  // Limpiar los valores de los campos del formulario
  document.querySelector("[data-imagen]").value = "";
  document.querySelector("[data-nombre]").value = "";
  document.querySelector("[data-precio]").value = "";

  // Limpiar mensajes de error anteriores en el SPAN
  const errores = document.querySelectorAll(".mensajeError");
  errores.forEach(error => error.textContent = "");
}
const limpiarFormulario = document.querySelector("[data-limpiar]");
limpiarFormulario.addEventListener("click", evento => limpiarCampos(evento));