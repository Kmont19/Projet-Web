$(document).ready(function() {
    getActualitesAccueil();
})


//Creation des cards
function createCardActu(id, titre, date, img) {
    var cardActu = `<div class="col-sm-4">
                        <div class="widget single-news">
                            <div class="image">
                                <img src="Images/Actualites/${img}">
                                <span class="gradient"></span>
                            </div>
                            <div id="details${id}" class="details">
                                <div class="category"><a href="actualite.html">Actualités</a></div>
                                <h3><a href="actualite.html"</a>${titre}</h3>
                                <time>${date}</time>
                            </div>
                        </div>
                    </div>`
    return cardActu
}


function getActualitesAccueil() {
    $.ajax({
        url: "PHP/Actualite/getActualitesAccueil.php",
        method: "GET",
        dataType: "json",
        data: "getActualitesAccueil",
        success: function(result) {
            result.forEach(function(actualite) {
                var cardActu = createCardActu(actualite.idActualite, actualite.titreActu, actualite.dateActu, actualite.photoActu);
                $('#cntActu').prepend(cardActu);
            })
        },
        error: function(xhr, status, error) {
            console.log(status, error)
        },
        complete: function(xhr, status) {
        
        }
    })
}