$(document).ready(function() {
    getCarrouselEvents();
});

function createSlide(id, titre, texte, image, lien) {
    var slide = `<div class="carousel-item">
                    <img class="d-block img-fluid" src="Images/Carrousel/${image}" alt="Image slide">
                    <div class="carousel-caption d-flex align-items-center">
                        <div class="row d-flex">
                            <div class="col-8-md">
                                <h2>${titre}</h2>
                                <p>
                                    ${texte}
                                </p>
                                <button type="button" class="btn btn-lg" onclick="ouvrirLien(${lien})">Je m'inscris</button>
                            </div>
                            <div class="col-4-md">
                                <img class="d-block img-fluid img-affiche" src="Images/logo département informatique description.png">
                            </div>
                        </div>
                    </div>
                </div>`
}