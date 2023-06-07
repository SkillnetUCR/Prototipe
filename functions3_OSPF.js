
let numberQuestion = 4;
let evaluar = 0;
let pasos = 4;
var boolean = false;

var button = document.querySelector('.button-aceptar');

button.addEventListener('click', comprobarRespuesta);

const orden = [
    { respuesta: "ip ospf hello-interval 5" },
    { respuesta: "ip ospf dead-interval 20" },
    { respuesta: "ip ospf message-digest-key 1 md5 7 asecret" },
    { respuesta: "interface loopback 50" }]



function resetGame() {

    sessionStorage.setItem("vidas", 3);

    window.location.href = "levelSelector.html"

}

function correct(i) {
    alerta(
        "Respuesta correcta!",
        "¡Sigue así, faltan " + numberQuestion + " respuestas!",
        "success",
        ""
    );

    document.getElementById("correct").innerHTML += "<p class='countResult'>-" + orden[i].respuesta + "</p>";

    boolean = true;
}

function fail() {
    sessionStorage.setItem('vidas', (sessionStorage.getItem('vidas') - 1));

}

function siguienteNivel() {

    sessionStorage.setItem("finjuego", "desbloqueada");


    Swal.fire({
        title: "Has completado todo el juego!",
        html: "¡Felicitaciones!",
        icon: "success",
        iconColor: 'green',
        showConfirmButton: "true",
        confirmButtonText: "Aceptar",
        position: "center",
        toast: true,
        timer: 3000, // tiempo en milisegundos
        timerProgressBar: "true",
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    }).then(() => {
        window.location.href = "levelSelector.html";
    });

}

function comprobarRespuesta() {

    const respuesta = document.getElementById("respuesta").value;

    for (var i = 0; i < orden.length; i++) {

        if (respuesta == orden[i].respuesta) {

            numberQuestion = numberQuestion - 1;

            correct(i);

            orden[i].respuesta = "listo";
            //
        }
    }

    if (boolean == false) {

        fail();
    }

    loadOrden();

    boolean = false;

    if (numberQuestion == 0) {
        siguienteNivel();
    }

    if (sessionStorage.getItem('vidas') == 0) {

        //Hay que cambiar este aviso por un reset o continuar o mostrar el menu
        Swal.fire({
            title: "Sin vidas",
            html: "¡No te desanimes, sigue intentándolo!<br>",
            icon: "error",
            iconColor: 'red',
            showConfirmButton: "true",
            confirmButtonText: "Aceptar",
            position: "center",
            toast: true,
            timer: 5000, // tiempo en milisegundos
            timerProgressBar: "true",
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        }).then(() => {
            resetGame();
        });


    }




}


function resetGame() {

    sessionStorage.setItem("vidas", 3);

    window.location.href = "levelSelector.html"
}


function alerta(titulo, texto, icono, iconoColor, fondo) {
    Swal.fire({
        title: titulo,
        html: texto,
        icon: icono,
        iconColor: iconoColor,
        background: fondo,
        imageUrl: fondo,
        imageWidth: 100,
        imageHeight: 100,
        showConfirmButton: "true",
        confirmButtonText: "Aceptar",
        position: "top-end",
        toast: true,
        timer: 1800,
        timerProgressBar: "true",
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
}

function showInstruccion() {
    const instruccion = document.getElementById("instruccion");
    const video = document.getElementById("video1");
    const imgs = document.querySelectorAll('.img-device');
    instruccion.classList.toggle("invisible");
    video.classList.toggle("invisible");

    imgs.forEach(img => {
        img.classList.add('imgInstruccion');

    });

    setTimeout(() => {
        imgs.forEach(img => {
            img.classList.remove('imgInstruccion');
        });
    }, 1800);

}


function alertaConstruction() {
    Swal.fire({
        title: "No permitido.",
        html: "La página se encuentra en construcción.",
        icon: "error",
        imageWidth: 100,
        imageHeight: 100,
        position: "center",

    });
}



function loadOrden() {
    addLives();
    // const button = document.getElementById("button-devices");
    // button.textContent = capitalizeFirstLetter(orden[evaluar].dispositivo)//Hace mayuscula la primer letra

    document.getElementById("instruccion").innerText =
        "Los comandos adecuados para la actualizacion de paquetes en el protocolo OSPF son: (elegir " + numberQuestion + " de la lista)";

}


function addLives() {

    const livesDiv = document.querySelector('.lives');

    if (livesDiv.lastChild) {

        livesDiv.removeChild(livesDiv.lastChild);
    }
    // Crear un elemento img
    const img = document.createElement('img');

    // Asignar la ruta de la imagen
    img.src = 'images/' + sessionStorage.getItem('vidas') + '-vidas.png';

    img.id = "livesImg";

    // Agregar la imagen al div
    livesDiv.appendChild(img);


}