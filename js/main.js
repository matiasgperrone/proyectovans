const productos = [
	{
		id: "zapatillas01",
		titulo: "Zapatillas 01",
		imagen: "./img/zapatillas/zapatillas01.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 26600
	},
	{
		id: "zapatillas02",
		titulo: "Zapatillas 02",
		imagen: "./img/zapatillas/zapatillas02.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 26600
	},
    {
		id: "zapatillas03",
		titulo: "Zapatillas 03",
		imagen: "./img/zapatillas/zapatillas03.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 20300
	},
    {
		id: "zapatillas04",
		titulo: "Zapatillas 04",
		imagen: "./img/zapatillas/zapatillas04.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 16000
	},
    {
		id: "zapatillas05",
		titulo: "Zapatillas 05",
		imagen: "./img/zapatillas/zapatillas05.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 16000
	},
    {
		id: "zapatillas06",
		titulo: "Zapatillas 06",
		imagen: "./img/zapatillas/zapatillas06.jpg",
		categoria: {
			nombre: "Zapatillas",
			id: "zapatillas",
				},
		precio: 26600
	},
    {
		id: "remera01",
		titulo: "Remera 01",
		imagen: "./img/Remeras/remera01.jpg",
		categoria: {
			nombre: "Remeras",
			id: "remeras",
				},
		precio: 9300
	},
    {
		id: "remera02",
		titulo: "Remera 02",
		imagen: "./img/Remeras/remera02.jpg",
		categoria: {
			nombre: "Remeras",
			id: "remeras",
				},
		precio: 9300
	},
    {
		id: "remera03",
		titulo: "Remera 03",
		imagen: "./img/Remeras/remera03.jpg",
		categoria: {
			nombre: "Remeras",
			id: "remeras",
				},
		precio: 7800
	},
    {
		id: "bermuda01",
		titulo: "bermuda01",
		imagen: "./img/bermudas/bermuda01.jpg",
		categoria: {
			nombre: "Bermudas",
			id: "bermudas",
				},
		precio: 15200
	},
    {
		id: "bermuda02",
		titulo: "bermuda02",
		imagen: "./img/bermudas/bermuda02.jpg",
		categoria: {
			nombre: "Bermudas",
			id: "bermudas",
				},
		precio: 15200
	},
    {
		id: "buzo01",
		titulo: "Buzo 01",
		imagen: "./img/buzos/buzo01.jpg",
		categoria: {
			nombre: "Buzos",
			id: "buzos",
				},
		precio: 25200
	},
    {
		id: "buzo02",
		titulo: "Buzo 02",
		imagen: "./img/buzos/buzo02.jpg",
		categoria: {
			nombre: "Buzos",
			id: "buzos",
				},
		precio: 21200
	},
    {
		id: "buzo03",
		titulo: "Buzo 03",
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

function cargarProductos() {
	productos.forEach(producto => {
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
						<button class="card-body text-center card-link botones-comprar" id="${producto.id}">COMPRAR</button>
					`;
					contenedorProductos.append(div);
})
};

cargarProductos();