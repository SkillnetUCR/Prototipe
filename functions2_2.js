const orden = [
    { dispositivo: "tester", ayuda: "Dispositivo portátil, normalmente de color amarillo.<br>Posee una entrada RJ45." },
    { dispositivo: "router", ayuda: "Dispositivo de Packet Tracer encargado de envíar información de Internet a dispositivos." },
    { dispositivo: "cable-UTP", ayuda: "Cable UTP es normalmente de color Azul, con cables de color rojo, verde, cafe y azul dentro del mismo." },
    { dispositivo: "laptop", ayuda: "Una laptop es una computadora portátil." },
    { dispositivo: "patch-panel", ayuda: "Es el elemento encargado de recibir todos los cables del cableado estructurado." },
    { dispositivo: "RJ45", ayuda: "Es una interfaz física comúnmente utilizada para conectar computadoras. <BR>Posee ocho pines o conexiones eléctricas." },
    { dispositivo: "rack", ayuda: "Es un soporte metálico destinado a alojar equipamiento electrónico." },
    { dispositivo: "ponchadora", ayuda: "Es una herramienta pequeña con una punta para colocar los cables UTP en un puerto RJ45 hembra." },
    { dispositivo: "prensadora", ayuda: "Es una herramienta pequeña con forma de alicate o pinza. " },
    { dispositivo: "cable-Coaxial", ayuda: "Es un cable que se compone de dos conductores que se orientan de forma coaxial y separados por una capa de aislamiento dieléctrico." }
];

//Variable para medir el progreso

let pasos = 10;
const respuesta = document.getElementById("respuesta2_2");
let evaluar = 0;
let vidas = 3;

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

function loadOrden() {
    addLives();
    const button = document.getElementById("button-devices");
    button.textContent = capitalizeFirstLetter(orden[evaluar].dispositivo)//Hace mayuscula la primer letra

    document.getElementById("instruccion").innerText =
        "Selecciona el " +
        orden[evaluar].dispositivo +
        " y arrastralo al recuadro de arriba";


}



/* Los eventos del item del dispositivo */
const items = document.querySelectorAll(".itemDevice");

items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
})

function dragStart(event) {

    event.dataTransfer.setData('text', event.target.id);
    event.dataTransfer.setData('image', event.target.src);
    event.dataTransfer.setData('origin', event.target.parentNode.id);
}

function dragEnd(event) {
    event.target.classList.remove('dragging');

}


/* drop targets */
let boxes = document.querySelectorAll(".box");

boxes[0].addEventListener('drop', drop);
boxes[0].addEventListener('dragover', dragOver);


function deleteBox(origin) {//Se encarga de eliminar el contenedor y limpiar el contenedor de respuesta

    let boxes = document.querySelectorAll(".box");
    let father = document.querySelector("#" + origin).parentNode.id;
    let newOrigin = document.querySelector("#respuesta2_2")


    for (let i = 0; i < boxes.length; i++) {

        if (boxes[i].id == father) {

            boxes[i].remove();//Con esto eliminamos la caja contenedora original
            const divPadre = document.getElementById('respuesta2_2');
            const primerHijo = divPadre.lastChild;

            primerHijo.style.width = 96 + "%";
            primerHijo.style.height = 96 + "%";


            newOrigin.classList.add("correctAnswer");
            newOrigin.classList.remove("normalRespuesta");

            setTimeout(() => {
                newOrigin.classList.remove("correctAnswer");
                newOrigin.classList.add("normalRespuesta");
                divPadre.removeChild(primerHijo);

            }, 1800);


            i == boxes.length;
        }
    }
}


function dragOver(event) {
    event.preventDefault();
}

// function dragEnter(event) {
//     event.target.classList.add('hovered');
//     //event.target.classList.add("drag-over");
// }

// function dragLeave(event) {
//     event.target.classList.remove("hovered");
// }


function drop(event) {
    event.target.classList.remove("drag-over");
    const id = event.dataTransfer.getData("text");
    // const image = event.dataTransfer.getData("image");
    const origin = event.dataTransfer.getData("origin");

    const draggable = document.getElementById(id);
    // add it to the drop target

    event.target.appendChild(draggable);



    if (orden[evaluar].dispositivo == id) {//es para evitar que cuando es erroneo realice el evento dos veces

        evaluar++;
        update(evaluar, origin);


    } else if (orden[evaluar].dispositivo != id) {//Si el Elemento no corresponde

        failAnswer(origin, draggable);

    }
}

function failAnswer(origin, draggable) {
    var boxDestiny = document.getElementById("respuesta2_2")
    boxDestiny.classList.remove("normalRespuesta");
    boxDestiny.classList.add("incorrectAnswer");

    alerta(
        "Respuesta incorrecta!",
        orden[evaluar].ayuda,
        "error",
        ''
    );
    setTimeout(() => {
        const originContainer = document.getElementById(origin);
        originContainer.appendChild(draggable);
        draggable.classList.remove('dragging');
        boxDestiny.classList.remove("incorrectAnswer");
        boxDestiny.classList.add("normalRespuesta");
    }, 1800);

    sessionStorage.setItem('vidas', (sessionStorage.getItem('vidas') - 1));

    addLives();

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

//Alertas de respuestas
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
        timer: 22800,
        timerProgressBar: "true",
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
}


//Cantidad de pasos/preguntas
let cantidad_preguntas = document.querySelector('.progress-container');
let concat = '<div class="progress" id="progress"> </div>';
getPasos();

function getPasos() {
    for (let i = 0; i < pasos; i++) {
        concat += '<div class="circle">' + (i + 1) + '</div>'
    }
    cantidad_preguntas.innerHTML = concat;
}


//Barra de progreso
const progress = document.getElementById("progress");
const stepCircles = document.querySelectorAll(".circle");
let currentActive = 1;

//NOTE CHANGE HERE TO 1-4
// update(0);

function update(currentActive, origin) {
    stepCircles.forEach((circle, i) => {
        if (i < currentActive) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    });

    const activeCircles = document.querySelectorAll(".active");
    progress.style.width =
        ((activeCircles.length - 1) / (stepCircles.length - 1)) * 99 + "%";

    if (currentActive == pasos) {
        document.getElementById('nivel_completado').classList.remove('invisible');
        document.getElementById("options").classList.add('invisible');
        document.getElementById("drop-targets").classList.add('invisible');
        document.getElementById("container_2").classList.add('invisible');
        document.getElementById("id_box_4").classList.add('invisible');
    } else {

        alerta(
            "Respuesta correcta!",
            "¡Sigue así, vas muy bien!",
            "success",
            ""
        );
        deleteBox(origin);
        loadOrden()



    }
}

function capitalizeFirstLetter(string) {//Hace mayuscula la primer letra
    string = string.replace(/-/g, " ");
    console.log(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
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


function siguienteNivel() {

    sessionStorage.setItem("isla-3", "desbloqueada");

    alerta(
        "La isla 3 fue desbloqueada!",
        "¡Felicitaciones, vas muy bien!",
        "success",
        ""
    );

    setTimeout(function () {
        window.location.href = "levelSelector.html";
    }, 3000); // 3000 milisegundos = 3 segundos
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