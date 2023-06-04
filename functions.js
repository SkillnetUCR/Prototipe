//Datos

//Sumar en java

const ayuda_nivel_2 = {
    primera:
        "Obtener la primera ip utilizable es muy sencillo, solo tienes que sumarle un 1 al octeto en que se esta trabajando en el id de red.",
    ultima: "Para obtener la última ip utilizable solo debes tomar el id de red, sumarle el salto de red al octeto que se esta trabajando y restarle un 1 al último octeto.",
    broadcast:

        "El BROADCAST se obtiene al tomar el id de red y sumarle el salto al octeto que se esta trabajando.",
    clasea: "La red Clase A inicia con un indentificador comprendido entre 0 y 127.",
    claseb: "La red Clase B inicia con un indentificador comprendido entre 128 y 191.",
    clasec: "La red Clase C inicia con un indentificador comprendido entre 192 y 223.",
    salto: "Puedes obtener el SALTO elevando el número 2 a la cantidad de bits que se encuentran hacia la derecha del slash y en el mismo octeto y al resultado restarle 1.",
    hosts: "Puedes obtener la cantidad de HOSTS elevando el número 2 a la cantidad de bits que se encuentran hacia la derecha del slash.",
};

//Orden de evaluación
const orden = [
    { salto: "salto", titulo: "Salto de red" },
    { broadcast: "broadcast", titulo: "Broadcast" },
    { primera: "primera", titulo: "Primer ip utilizable" },
    { ultima: "ultima", titulo: "Último ip utilizable" },
    { hosts: "hosts", titulo: "Cantidad de hosts" },
    {
        clasea: "clasea",
        claseb: "claseb",
        clasec: "clasec",
        titulo: "Clase de red",
    },
];


//Variable para medir el progreso
let nivel_actual = 1;
let progreso = 0;
let pasos = Object.keys(ayuda_nivel_2).length - 2;

//Obtener datos de la red dada
let id_red = document.getElementById("id_red").textContent;
let slash = id_red.substring(id_red.length - 2);
let hosts = 2 ** (32 - slash);
let salto = 2 ** (32 - slash) - 1;

while (salto > 255) {
    salto = salto - 255;
}

//Se obtiene el componente con la respuesta correcta.
//evaluar es el Indice para el recorrido de evaluacion del objeto orden[]{}
const respuesta = document.getElementById("respuesta");
let evaluar = 0;

function evaluarSiguiente() {
    setTimeout(() => {
        if (evaluar < 5) {
            evaluar++;
        }

        if (evaluar == 5) {
            if (slash > 9 && slash < 16) {
                respuesta.setAttribute("name", orden[evaluar].clasea);
            }
            if (slash > 15 && slash < 24) {
                respuesta.setAttribute("name", orden[evaluar].claseb);
            } else {
                respuesta.setAttribute("name", orden[evaluar].clasec);
            }
        } else {
            if (evaluar == 1) {
                respuesta.setAttribute("name", orden[evaluar].broadcast);
            }
            if (evaluar == 2) {
                respuesta.setAttribute("name", orden[evaluar].primera);
            }
            if (evaluar == 3) {
                respuesta.setAttribute("name", orden[evaluar].ultima);
            }
            if (evaluar == 4) {
                respuesta.setAttribute("name", orden[evaluar].hosts);
            }
        }

        respuesta.innerText = orden[evaluar].titulo;
        document.getElementById("evaluando").innerText = orden[evaluar].titulo;
        document.getElementById("instruccion").innerText =
            "Selecciona " +
            orden[evaluar].titulo +
            " y arrastralo al recuadro de arriba";
    }, 1800);
}

/* draggable element */
const items = document.querySelectorAll(".item");

items.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
});

function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => {
        e.target.classList.add("hide");
    }, 0);
}

/* drop targets */
let boxes = document.querySelectorAll(".box");

for (let i = 1; i < boxes.length; i++) {
    boxes[i].addEventListener("dragenter", dragEnter);
    boxes[i].addEventListener("dragover", dragOver);
    boxes[i].addEventListener("dragleave", dragLeave);
    boxes[i].addEventListener("drop", drop);
}

function deleteBox(e) {
    let boxes = document.querySelectorAll(".box");

    for (let i = 1; i < boxes.length; i++) {
        if (boxes[i].children.length == 0) {
            boxes[i].remove();
            setTimeout(() => {
                e.target.classList.remove("correctAnswer");
            }, 1800);
            e.target.classList.add("correctAnswer");
        }
    }
}

function rollBackBox(e) {
    const backBox = document.getElementById("respuesta").lastChild;
    let boxes = document.querySelectorAll(".box");

    for (let i = 1; i < boxes.length; i++) {
        if (boxes[i].children.length == 0) {
            setTimeout(() => {
                boxes[i].appendChild(backBox);
                e.target.classList.remove("incorrectAnswer");
            }, 1800);
            e.target.classList.add("incorrectAnswer");
        }
    }
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add("drag-over");
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add("drag-over");
}

function dragLeave(e) {
    e.target.classList.remove("drag-over");
}

function drop(e) {
    e.target.classList.remove("drag-over");

    // get the draggable element
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove("hide");

    //Verificar Respuesta
    if (respuesta.children.length == 1) {
        const opcion_seleccionada = respuesta.lastChild.getAttribute("name");
        const respuestaCorrecta = respuesta.getAttribute("name");

        if (respuestaCorrecta == opcion_seleccionada) {
            //alerta en update()
            deleteBox(e);
            evaluarSiguiente(respuestaCorrecta);
            update(++progreso);
        } else {
            alerta(
                "Respuesta incorrecta!",
                "¡No te desanimes, sigue intentandolo!<br>" +
                ayuda_nivel_2[respuesta.getAttribute("name")],
                "error",
                "red",
                ''
            );
            rollBackBox(e);
        }
    }
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

function update(currentActive) {
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
        document.getElementById('nivel_completado').classList.remove('hide');
        document.getElementById("options").classList.add('hide');
        document.getElementById("drop-targets").classList.add('hide');
        document.getElementById("container_2").classList.add('hide');
    } else {
        alerta(
            "Respuesta correcta!",
            "¡Sigue así, vas muy bien!",
            "success",
            ""
        );
    }
}


function siguienteNivel() {
    $('#main_container').remove();
    document.getElementById('body').classList.add('oscurecer');

    // setTimeout( () => {
    //     ++nivel_actual;
    //     progreso = 0;
    //     if(nivel_actual == 1){pasos = Object.keys(ayuda_nivel_1).length - 2;}
    //     else if(nivel_actual == 2){pasos = Object.keys(ayuda_nivel_2).length - 2;}

    // }, 2000);

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