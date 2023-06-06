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