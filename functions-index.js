var carouselContainer = document.querySelector('.carousel-container');
var prevButton = document.querySelector('.prev-button');
var nextButton = document.querySelector('.next-button');
var currentIndex = 0;

function showPrevItem() {
    if (currentIndex === 0) {
        currentIndex = carouselContainer.children.length - 1;
    } else {
        currentIndex--;
    }
    carouselContainer.style.transform = `translateX(-${currentIndex * 33.3333}%)`;
}

function showNextItem() {
    if (currentIndex === carouselContainer.children.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    carouselContainer.style.transform = `translateX(-${currentIndex * 33.3333}%)`;
}

prevButton.addEventListener('click', showPrevItem);
nextButton.addEventListener('click', showNextItem);


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


function showVideoGuia() {

    const video = document.getElementById("videoGUIA-container");
    const iframe = document.getElementById("iframeVideoGUIA");

    video.classList.toggle("invisible");
    iframe.classList.toggle("invisible");


    const prevButn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const carousel = document.getElementById("carousel");
    const carouselContent = document.getElementById("carousel-container");

    prevButn.classList.toggle("invisible");
    carousel.classList.toggle("invisible");
    nextBtn.classList.toggle("invisible");
    carouselContent.classList.toggle("invisible");

    if (video.classList.contains("invisible")) {
        alerta(
            "El video se oculto!",
            "Para invertir el cambio, presione el boton nuevamente.",
            "success",
            ''
        );
    } else {
        alerta(
            "El video se cargo!",
            "Para invertir el cambio, presione el boton nuevamente.",
            "success",
            ''
        );
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

