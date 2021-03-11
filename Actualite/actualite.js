

//Creation des cards
function createCardActu(id, titre, date, texte, img) {
    var cardActu = `<div class="widget single-news my-5 " id="cardActu${id}" onclick="showActuText('cardActu${id}')">
                        <div class="image">
                            <img src="Images/Actualites/${img}">
                            <span class="gradient"></span>
                        </div>
                        <div>
                            <p class="text-actualite">${texte}</p>
                        </div>
                        <div class="details">
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
function showActuText(cardId) {
    if($(`#${cardId} p`).css("display") == "none") {
        $(`#${cardId} p`).css("display","block")
        $(`#${cardId} .details`).css("display","none")
        $(`#${cardId} .gradient`).css("background-color", "rgb(0, 0, 0, 0.7)")
        
    } else {
        $(`#${cardId} p`).css("display","none")
        $(`#${cardId} .details`).css("display","block")
        $(`#${cardId} .gradient`).css("background-color", "transparent")
    }

}




