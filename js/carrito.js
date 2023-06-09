//*** JAVASCRIPT DEL CARRITO ***/

// LLAMANDO ELEMENTOS DEL LOCAL STORAGE Y DECLARANDO VARIABLES O CONST PARA TRAER ELEMENTOS DEL DOM

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

let nuevoNumeroCarritoLS = localStorage.getItem("nuevo-numero-carrito");

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoOpciones = document.querySelector("#carrito-opciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const nuevoNumeroCarrito = document.querySelector("#numero-carrito");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-opciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-opciones-comprar");

// FUNCION PARA LA CARGA DE PRODUCTOS EN EL HTML CARRITO

function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoOpciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                            <div class="carrito-producto-nombre">
                                <small>Producto</small>
                                <h3>"${producto.titulo}"</h3>
                            </div>
                            <div class="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carrito-producto-precio">
                                <small>Precio</small>
                                <p>$${producto.precio}</p>
                            </div>
                            <div class="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>$${producto.precio * producto.cantidad}</p>
                            </div>
                            <button id="${producto.id}" class="carrito-producto-eliminar"><i class="bi bi-trash3-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
    })} else{
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoOpciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    calcularTotal();
}

cargarProductosCarrito();

// FUNCION PARA ACTUALIZAR EL SPAN DEL CARRITO EN HTML CARRITO

function actualizarNuevoNumeroCarrito() {

    if(nuevoNumeroCarritoLS){
        let calculoNumeroNuevo = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        nuevoNumeroCarrito.innerText = calculoNumeroNuevo;
    } else {
        nuevoNumeroCarrito.innerText = 0;
    }    
}
actualizarNuevoNumeroCarrito();

// DECLARANDO FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO

function actualizarBotonesEliminar() {
	botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
	
	botonesEliminar.forEach(boton => {
		boton.addEventListener("click", eliminarDelCarrito);
		});
}

function eliminarDelCarrito(e) {

    Toastify({
		text: "Producto eliminado",
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
	const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

	productosEnCarrito.splice(index, 1);
	cargarProductosCarrito();


    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    actualizarNuevoNumeroCarrito();
}

// FUNCION PARA VACIAR EL CARRITO

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    Swal.fire({
        title: '¿Deseas vaciar el carrito?',
        icon: 'question',
        html: 'Se eliminarán todos tus productos',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor: 'red',
        confirmButtonText:'Si',
        cancelButtonText:'No',
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
            actualizarNuevoNumeroCarrito();

            Swal.fire({
                icon: 'success',
                title: 'Tu carrito fue vaciado',
                showConfirmButton: false,
                timer: 1500
              })

        } 
    })

}

// FUNCION PARA CALCULAR EL TOTAL A GASTAR 


function calcularTotal() {
	const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

// FUNCION PARA COMPRAR

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    Swal.fire({
        title: '¿Deseas finalizar tu compra?',
        icon: 'question',
        html: 'No podrás seguir agregando productos al carrito',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor: 'red',
        confirmButtonText:'Si',
        cancelButtonText:'No',
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoOpciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");
            actualizarNuevoNumeroCarrito();
        
            Swal.fire({
                icon: 'success',
                title: 'Tu compra fue realizada con éxito',
                showConfirmButton: false,
                timer: 1500
              })
        }         
    })
}

