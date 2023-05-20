let equipoBMX = [];

fetch("../js/bmx.json")
 .then( response => response.json())
 .then (data => {
    equipoBMX = data;
    cargarEquipo(equipoBMX);
})


let divEquipo = document.querySelector("#equipo-bmx");

function cargarEquipo(equipo) {
    equipoBMX.forEach(integrante => {
        const div = document.createElement("div");
        div.classList.add("nombres-equipo");
        div.innerHTML = `<ul class="ul-bmx">
        <li class="li-bmx-principal">${integrante.nombre} ${integrante.apellido}</li>
        <li class="li-bmx-secundario">${integrante.edad} años</li>
        <li class="li-bmx-secundario">${integrante.nacionalidad}</li>
    </ul>`


        divEquipo.append(div);
    })
}
