$(document).ready(function () {
    getListeActu();
});


//Creation des cards
function createCardActu(id, titre, date, texte, img) {
    var cardActu = `<div class="widget single-news my-5 " id="cardActu" onclick="showActuText('textActu${id}', 'details${id}')">
                        <div class="image">
                            <img src="Images/Actualites/${img}">
                            <span class="gradient"></span>
                        </div>
                        <div>
                            <p id="textActu${id}" class="text-actualite">${texte}</p>
                        </div>
                        <div id="details${id}" class="details">
                            <h3><a </a>${titre}</h3>
                            <time>${date}</time>
                        </div>
                    </div>`
    return cardActu
}

//Avoir la liste d'actualités
function getListeActu() {
    $.ajax({
        url: "PHP/Actualite/getActualites.php",
        method: "GET",
        dataType: "json",
        data: "getActualites",
        success: function(result) {
            result.forEach(function(actualite) {
                var cardActu = createCardActu(actualite.idActualite, actualite.titreActu, actualite.dateActu, actualite.texteActu, actualite.photoActu);
                $('#cntActu').append(cardActu);
            })
        }
    })
}

//Montrer la description de l'actualité dans la card
function showActuText(text, details) {
    if($(`#${text}`).css("display") == "none") {
        $(`#${text}`).css("display","block")
        $(`#${details}`).css("display","none")

    } else {
        $(`#${text}`).css("display","none")
        $(`#${details}`).css("display","block")
    }

}




