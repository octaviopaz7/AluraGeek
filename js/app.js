//CARGA DE BASE DE DATOS
async function cargarDB() {
  const conexion = await fetch("http://localhost:3001/productos");
  const conexionConvertida = conexion.json();
  return conexionConvertida;
}

//ENVIAR NUEVO PRODUCTO A LA BASE DE DATOS
async function enviarProducto(nombre, precio, imagen) {
  const listaDeProductos = await fetch("http://localhost:3001/productos");
  const productos = await listaDeProductos.json();

   // Encontrar el máximo ID actual
   let ultimoId = 0; 
   productos.forEach(producto => { 
     const idNumero = parseInt(producto.id); // Extraemos el ID de cada producto
     if (idNumero > ultimoId) { // Comparamos el ID actual con el valor almacenado en ultimoId
       ultimoId = idNumero;
     }
   });
   // Determinar el próximo ID disponible
   const nuevoId =  ultimoId + 1;

  const conexion = await fetch("http://localhost:3001/productos",{
    method:"POST",
    headers: {"Content-type":"application/json"},
    body:JSON.stringify({
      id: nuevoId.toString(),
      nombre:nombre,
      precio:precio,
      imagen:imagen
    })
  })

  const conexionConvertida = conexion.json();
  if (!conexion.ok) {
    throw new Error("Ha ocurrido un error al enviar el producto");
  }
  return conexionConvertida;
}


export const conexionAPI = {
  cargarDB,
  enviarProducto,
}


// COMANDO PARA INICIAR EL SERVIDOR ---->>>>  npx json-server --watch db.json --port 3001





