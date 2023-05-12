const productos = [
	{
		id: "zapatillas01",
		titulo: "Zapatillas U OLD SKOOL Grey",
		imagen: "./img/zapatillas/zapatillas01.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 26600
	},
	{
		id: "zapatillas02",
		titulo: "Zapatillas U OLD SKOOL White",
		imagen: "./img/zapatillas/zapatillas02.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 26600
	},
    {
		id: "zapatillas03",
		titulo: "Zapatillas U ERA Black",
		imagen: "./img/zapatillas/zapatillas03.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 20300
	},
    {
		id: "zapatillas04",
		titulo: "Zapatillas U AUTHENTIC Pink",
		imagen: "./img/zapatillas/zapatillas04.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 16000
	},
    {
		id: "zapatillas05",
		titulo: "Zapatillas U AUTHENTIC Orange",
		imagen: "./img/zapatillas/zapatillas05.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 16000
	},
    {
		id: "zapatillas06",
		titulo: "Zapatillas U OLD SKOOL Yellow",
		imagen: "./img/zapatillas/zapatillas06.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 26600
	},
    {
		id: "remera01",
		titulo: "Remera Vans Classic Black",
		imagen: "./img/Remeras/remera01.jpg",
		categoria: {
			nombre: "Remeras",
			id: "remeras",
				},
		precio: 9300
	},
    {
		id: "remera02",
		titulo: "Remera Full Patch Black",
		imagen: "./img/Remeras/remera02.jpg",
		categoria: {
			nombre: "Remeras",
			id: "remeras",
				},
		precio: 9300
	},
    {
		id: "remera03",
		titulo: "Remera Core Basic Tee Grey",
		imagen: "./img/Remeras/remera03.jpg",
		categoria: {
			nombre: "Remeras",
			id: "remeras",
				},
		precio: 7800
	},
    {
		id: "bermuda01",
		titulo: "Short Vans Classic Black",
		imagen: "./img/bermudas/bermuda01.jpg",
		categoria: {
			nombre: "Bermudas",
			id: "bermudas",
				},
		precio: 15200
	},
    {
		id: "bermuda02",
		titulo: "Short Vans Classic Grey",
		imagen: "./img/bermudas/bermuda02.jpg",
		categoria: {
			nombre: "Bermudas",
			id: "bermudas",
				},
		precio: 15200
	},
    {
		id: "buzo01",
		titulo: "Buzo OTW Po II Black",
		imagen: "./img/buzos/buzo01.jpg",
		categoria: {
			nombre: "Buzos",
			id: "buzos",
				},
		precio: 25200
	},
    {
		id: "buzo02",
		titulo: "Buzo Classic Po II Hoodie French Terry Grey",
		imagen: "./img/buzos/buzo02.jpg",
		categoria: {
			nombre: "Buzos",
			id: "buzos",
				},
		precio: 21200
	},
    {
		id: "buzo03",
		titulo: "Buzo Classic V II Hoodie French Terry Pink",
		imagen: "./img/buzos/buzo03.jpg",
		categoria: {
			nombre: "Buzos",
			id: "buzos",
				},
		precio: 23800
	},
    {
		id: "overalls",
		titulo: "Overalls",
		imagen: "./img/overalls/overalls.jpg",
		categoria: {
			nombre: "Overalls",
			id: "overalls",
				},
		precio: 39900
	},
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".botones-categorias");
let botonesAgregar = document.querySelectorAll(".botones-agregar");
const numeroCarrito = document.querySelector("#numero-carrito");




function cargarProductos(productosElegidos) {

	contenedorProductos.innerHTML = "";

	productosElegidos.forEach(producto => {
	const div = document.createElement("div");
	div.classList.add("card");
	div.classList.add("carta-producto");
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
					console.log(botonesAgregar);
};

cargarProductos(productos);



botonesCategorias.forEach(boton => {
	boton.addEventListener("click", (e) => {

		if(e.currentTarget.id != "todos"){
			const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
			cargarProductos(productosBoton);
		} else {
			cargarProductos(productos);
		}


	})

})

function actualizarBotonesAgregar() {
	botonesAgregar = document.querySelectorAll(".botones-agregar");
	
	botonesAgregar.forEach(boton => {
		boton.addEventListener("click", agregarAlCarrito);
		});
}

const productosEnCarrito = [];

function agregarAlCarrito(e) {

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

function actualizarNumeroCarrito() {
	let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
	numeroCarrito.innerText = nuevoNumeroCarrito;
}