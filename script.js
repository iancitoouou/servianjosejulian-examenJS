const cotxes = [
    {
        id: 1,
        nom: "Bugatti Chiron Super Sport 300+",
        potencia: 1500,
        motor: "8.0 litres W16",
        foto: "images/bugatti.jpg"
    },
    {
        id: 2,
        nom: "Koenigsegg Jesko",
        potencia: 1600,
        motor: "V8 de 5.0 litres",
        foto: "images/jesko.jpg"
    },
    {
        id: 3,
        nom: "Hennessey Venom F5",
        potencia: 1800,
        motor: "V8 de 6.6 litres",
        foto: "images/venom.jpg"
    },
    {
        id: 4,
        nom: "Rimac C_Two",
        potencia: 1900,
        motor: "Elèctric",
        foto: "images/rimac.jpg"
    },
    {
        id: 5,
        nom: "Lamborghini Sian",
        potencia: 800,
        motor: "V12 híbrid",
        foto: "images/sian.jpg"
    }
];

const targetes = document.querySelector("#targetes");
const cotxe1 = document.querySelector("#cotxe1");
const cotxe2 = document.querySelector("#cotxe2");
const comparar = document.querySelector("#comparar");
const cercar = document.querySelector("#cercar");

// Generar las tarjetas y las opciones del selector
for (let i = 0; i < cotxes.length; i++) {
    targetes.innerHTML += `
        <article class="targeta">
            <img src="${cotxes[i].foto}" alt="${cotxes[i].nom}">
            <div class="info">
                <h3>${cotxes[i].nom}</h3>
                <p>Potència: ${cotxes[i].potencia} CV</p>
                <p>Motor: ${cotxes[i].motor}</p>
            </div>
        </article>
    `;

    cotxe1.innerHTML += `<option value="${cotxes[i].id}">${cotxes[i].nom}</option>`;
    cotxe2.innerHTML += `<option value="${cotxes[i].id}">${cotxes[i].nom}</option>`;
}

// Comparar los dos coches
comparar.addEventListener("click", function () {
    const error = document.querySelector("#errorComparacio");
    error.innerHTML = "";

    //Si el valor seleccionado es nulo poner que se seleccionen los dos coches
    if (cotxe1.value === "" || cotxe2.value === "") {
        error.innerHTML = "Has de seleccionar els dos cotxes.";
        return;
    }

    //Si el valor seleccionado del primer select es igual al del segundo select poner que no se puede comparar un coche consigo mismo
    if (cotxe1.value === cotxe2.value) {
        error.innerHTML = "No pots comparar un cotxe amb si mateix.";
        return;
    }

    //creo dos variables que me ayudarán 
    let cotxeA;
    let cotxeB;

    // recorrer todos los cotches para verificar los values
    for (let i = 0; i < cotxes.length; i++) {
        
        //Si cotxe es igual al value del primer select hacer que cotxeA sea igual al del array en esa iteracion
        if (cotxes[i].id == cotxe1.value) {
            cotxeA = cotxes[i];
        }

        //Si cotxe es igual al value del segundo select hacer que CotxeB sea igual al del array de esa iteracion
        if (cotxes[i].id == cotxe2.value) {
            cotxeB = cotxes[i];
        }
    }

    //Pinto en el DOM con los datos de cotxeA y cotxeB que definimos en lo anterior 

    document.querySelector("#nomCotxe1").innerHTML = cotxeA.nom;
    document.querySelector("#nomCotxe2").innerHTML = cotxeB.nom;
    document.querySelector("#potencia1").innerHTML = cotxeA.potencia + " CV";
    document.querySelector("#potencia2").innerHTML = cotxeB.potencia + " CV";
    document.querySelector("#motor1").innerHTML = cotxeA.motor;
    document.querySelector("#motor2").innerHTML = cotxeB.motor;
});

// Buscar coches segun la potencia

cercar.addEventListener("click", function () {
    //Cojo cositas del DOM
    const campPotencia = document.querySelector("#potencia");
    const potencia = Number(campPotencia.value); //Cojo el numero de el campo de Potencia 
    const error = document.querySelector("#errorCerca"); 
    const resultats = document.querySelector("#resultats");

    //Error y resultados empiezan vacíos
    error.innerHTML = "";
    resultats.innerHTML = "";

    //Si la potencia introducida en el campo value es igual a nada o el numero introducido IsNan (Not a number) o Potencia es menor que 0 Introducir un error 
    if (campPotencia.value === "" || Number.isNaN(potencia) || potencia < 0) {
        error.innerHTML = "Introdueix una potència vàlida (zero o superior).";
        return;
    }

    //Array de encontrados
    let trobats = [];

    //Recorremos el array de coches
    for (let i = 0; i < cotxes.length; i++) {
        // Si en la iteracion la potencia es mayor que potencia introducida en el input del DOM, hago un push del coche en el array creado anteriormente

        if (cotxes[i].potencia > potencia) {
            trobats.push(cotxes[i]);
        }
    }

    //Guardo la hora con las funciones getHours(); y getMinutes(); de una variable con new Date();
    const ara = new Date();
    let hores = ara.getHours();
    let minuts = ara.getMinutes();

    //Si la hora es menor de 10, poner un zero a la izquierda para que este en formato 00:00

    if (hores < 10) {
        hores = "0" + hores;
    }

    //Si los minutos son menos que 10, poner tambien un zero a la izquierda
    if (minuts < 10) {
        minuts = "0" + minuts;
    }

    //Guardo la hora y minutos en la variable Hora
    let hora = hores + ":" + minuts;

    //Hago un innerHTML en Resultats del DOM
    resultats.innerHTML = "<p>Cerca feta a les " + hora + "</p>";

    //Si los coches encontrados son 0 hacer innerhtml de que no se ha encontrado nada
    if (trobats.length === 0) {
        resultats.innerHTML += "<p>No s’han trobat cotxes</p>";
    } else {
        resultats.innerHTML += "<ul>";
        
        //Pintar los coches encontrados con el nombre y la potencia
        for (let i = 0; i < trobats.length; i++) {
            resultats.innerHTML += "<li>" + trobats[i].nom + " - " + trobats[i].potencia + " CV</li>";
        }

        resultats.innerHTML += "</ul>";
    }
});
