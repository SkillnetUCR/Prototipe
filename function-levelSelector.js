sessionStorage.setItem('vidas', 3);



function levelPermission() {
    for (var i = 2; i <= 3; i++) {
        if (sessionStorage.getItem("isla-" + i) == "desbloqueada") {
            console.log("La isla-" + i + " esta desbloqueada");
            document.getElementById("isla-" + i).innerHTML = "<img class='img' src='images/" + i + "-desbloqueada.png'></img>";

        } else {
            console.log("<img class='img' src='images/" + i + "-bloqueada.png'></img> en isla-" + i);
            document.getElementById("isla-" + i).innerHTML = "<img class='img' src='images/" + i + "-bloqueada.png'></img>";
        }
    }
}

function redirectionIsla2() {

    if (sessionStorage.getItem("isla-2") == "desbloqueada") {

        window.location.href = "9.19.html";

    } else {
        alerta("La isla 2 esta bloqueada", "Completa antes la etapa 1", "info", "");
    }
}

function redirectionIsla3() {

    if (sessionStorage.getItem("isla-3") == "desbloqueada") {

        window.location.href = "9.24.html";

    } else {
        alerta("La isla 3 esta bloqueada", "Completa antes la etapa 2", "info", "");
    }
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


