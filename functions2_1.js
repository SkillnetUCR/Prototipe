const orden = [
    {
        dispositivo: "crossover", ayuda: "Se utilizan normalmente para conectar entre si dos equipos del mismo tipo."
    },
    {
        dispositivo: "puntoapunto", ayuda: "Se utilizan normalmente para conectar entre sí dos equipos distintos dentro de una red de área local"
    },
    { dispositivo: "serial", ayuda: "Se utilizan normalmente para conectar entre sí dos routers ubicados en diferentes LAN." },
    { dispositivo: "consola", ayuda: "Se utilizan normalmente para conectar entre sí un router con una PC." }
];

const devices = [
    {
        llegada: "laptop.jpeg", salida: "router.jpg"
    },
    {
        llegada: "router.jpg", salida: "laptop.jpeg"
    },
    { llegada: "router.jpg", salida: "router.jpg" },
    { llegada: "laptop.jpeg", salida: "laptop.jpeg" }
];

//Variable para medir el progreso

let pasos = 4;
const respuesta = document.getElementById("respuesta2_2");
let evaluar = 0;


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
    loadDevice();

    const button = document.getElementById("button-devices");

    button.textContent = capitalizeFirstLetter(orden[evaluar].dispositivo)//Hace mayuscula la primer letra

    document.getElementById("instruccion").innerText =
        "Selecciona el " +
        orden[evaluar].dispositivo +
        " y arrastralo al recuadro de arriba";
}



function loadDevice() {
    const salidaDiv = document.querySelector('#salida');
    const llegadaDiv = document.querySelector('#llegada');

    if (salidaDiv.lastChild) {

        salidaDiv.removeChild(salidaDiv.lastChild);
        llegadaDiv.removeChild(llegadaDiv.lastChild);
    }

    // Crear un elemento img
    const imgL = document.createElement('img');
    const imgS = document.createElement('img');

    console.log(devices[evaluar].llegada + '.jpg');

    console.log(devices[evaluar].salida + '.jpg');

    imgL.src = 'images/etapa2-1/' + devices[evaluar].llegada;
    imgL.id = devices[evaluar].llegada;
    imgL.classList.add("imagen-contenida");
    llegadaDiv.appendChild(imgL);

    imgS.src = 'images/etapa2-1/' + devices[evaluar].salida;
    imgS.classList.add("imagen-contenida");
    imgS.id = devices[evaluar].salida;
    salidaDiv.appendChild(imgS);
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

    location.reload();
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
        timer: 1800,
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
    const imgs = document.querySelectorAll('.img-device');
    instruccion.classList.toggle("invisible");

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


    window.location.href = "9.22.html";


}




