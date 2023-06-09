//*** JAVASCRIPT DEL INDEX ***/

// TRAYENDO MIS PRODUCTOS DEL JSON MEDIANTE FETCH //

let productos = [];

fetch("./js/productos.json")
	.then( response => response.json())
	.then(data => {
		productos = data;
		cargarProductos(productos);
	})

// DECLARANDO VARIABLES Y CONSTANTES PARA ALOJAR LA INFORMACIÓN QUE TRAEMOS DEL DOM MEDIANTE ID O CLASS

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".botones-categorias");
const botonesPrecio = document.querySelectorAll(".botones-precio");
let botonesAgregar = document.querySelectorAll(".botones-agregar");
const numeroCarrito = document.querySelector("#numero-carrito");


// FUNCION PARA CARGA DE PRODUCTOS EN EL INDEX.

function cargarProductos(productosElegidos) {

	contenedorProductos.innerHTML = "";

	productosElegidos.forEach(producto => {
	const div = document.createElement("div");
	div.classList.add("card");
	div.classList.add("carta-producto");
	div.classList.add("img-producto");
	div.innerHTML = 
					`<img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
					<div class="card-body">
						<p class="card-text text-center">VANS</p>
					</div>
						<h5 class="card-title text-center">${producto.titulo}</h5>
						<ul class="list-group list-group-flush">
						<li class="list-group-item text-center">$${producto.precio}</li>
						</ul>
						<button class="card-body text-center card-link botones-agregar" id="${producto.id}">AGREGAR AL CARRITO</button>
						`;
					contenedorProductos.append(div);
})

					actualizarBotonesAgregar();
};



//*********VER ESTA FUNCION***** */
// FILTROS PARA MOSTRAR CIERTOS PRODUCTOS DEPENDIENDO CATEGORIA

botonesCategorias.forEach(boton => {
	boton.addEventListener("click", (e) => {

		if(e.currentTarget.id === "zapatillas" || e.currentTarget.id === "remeras" || e.currentTarget.id === "bermudas" || e.currentTarget.id === "buzos" || e.currentTarget.id === "overalls" ){
			const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
			cargarProductos(productosBoton);
		} else if(e.currentTarget.id === "hombre" || e.currentTarget.id === "mujer" || e.currentTarget.id === "unisex") {
			const productosBotonGenero = productos.filter(producto => producto.categoria.genero === e.currentTarget.id);
			cargarProductos(productosBotonGenero);
		}
		else if(e.currentTarget.id === "todos"){
			cargarProductos(productos);
		}
	})
})

botonesPrecio.forEach(botonPrecio => {
	botonPrecio.addEventListener("click", (e) => {

		if(e.currentTarget.id === "diez-mil"){
			const diezMil = productos.filter(producto => producto.precio < 10000);
			cargarProductos(diezMil);
		} else if (e.currentTarget.id === "veinte-mil"){
			const veinteMil = productos.filter(producto => producto.precio < 20000);
			cargarProductos(veinteMil);
		} else if (e.currentTarget.id === "treinta-mil"){
			const treintaMil = productos.filter(producto => producto.precio < 30000);
			cargarProductos(treintaMil);
		} 
})
})

// AGREGAR LOS PRODUCTOS AL CARRITO

function actualizarBotonesAgregar() {
	botonesAgregar = document.querySelectorAll(".botones-agregar");
	
	botonesAgregar.forEach(boton => {
		boton.addEventListener("click", agregarAlCarrito);
		});
}

// ACTUALIZANDO NUMERO DE PRODUCTOS EN CARRITO

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if(productosEnCarritoLS){
	productosEnCarrito = JSON.parse(productosEnCarritoLS);
	actualizarNumeroCarrito();
} else {
	productosEnCarrito = [];
}



function agregarAlCarrito(e) {

	Toastify({
		text: "Producto agregado",
		duration: 3000,
		close: false,
		gravity: "top", // `top` or `bottom`
		position: "right", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
		  background: "yellow",
		  color: "black",
		  borderRadius: "2rem",
		  fontSize: "1rem",
		},
		offset: {
			x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
			y: "6rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
		},
		onClick: function(){} // Callback after click
	  }).showToast();
	
	const idBoton = e.currentTarget.id;
	const productoAgregado = productos.find(producto => producto.id === idBoton);
	
	if(productosEnCarrito.some(producto => producto.id === idBoton)) {
		const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
		productosEnCarrito[index].cantidad++;
	} else {
		productoAgregado.cantidad = 1;
		productosEnCarrito.push(productoAgregado);
	}

	actualizarNumeroCarrito();

	localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// ACTUALIZAR EL SPAN DEL CARRITO

function actualizarNumeroCarrito() {
	let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
	numeroCarrito.innerText = nuevoNumeroCarrito;
	localStorage.setItem("nuevo-numero-carrito", JSON.stringify(nuevoNumeroCarrito));
}




