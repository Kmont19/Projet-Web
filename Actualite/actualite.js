let infoActu="";
let actualite="";
$(document).ready(function () {
    /*Remplirmodale();
    requeteFicheActu();*/
    getListeActu();
});

function Gen_CtnActualite(infoActu){

    let ctncarte = document.getElementById("cntActu");
    let carteActu = document.createElement("div");
    let imgActu = document.createElement("img");
    let corpCarte = document.createElement("div");
    let titreCarte = document.createElement("h4");
    let texteCarte = document.createElement("p");
    let btnLien = document.createElement("a");
    let dateBold = "";

    carteActu.setAttribute('class', 'card');
    imgActu.setAttribute('class', 'card-img-top');
    imgActu.setAttribute('src', infoActu["photoActu"]);
    imgActu.setAttribute('alt', 'Image de l\'actualité');
    corpCarte.setAttribute('class', 'card-body');
    titreCarte.setAttribute('class', 'card-title');
    texteCarte.setAttribute('class', 'card-text m-0');
    btnLien.setAttribute('href', '#');
    btnLien.setAttribute('class', 'btn stretched-link');
    btnLien.setAttribute('data-toggle', 'modal');
    btnLien.setAttribute('data-target', '#modaleActu');


    var idLien = "idActu_" + infoActu["idActualite"];
    btnLien.setAttribute('id', idLien);
   
   
    titreCarte.innerHTML = infoActu["titreActu"];
    var dateAct = new Date(infoActu["dateActu"]);
    dateAct = dateAct.toLocaleString("fr-CA", { dateStyle: 'medium' });
    dateBold = dateAct;
    btnLien.innerHTML = "Plus";


   corpCarte.appendChild(titreCarte);
   //texteCarte.appendChild(dateBold);
   texteCarte.innerHTML = dateBold.bold() +  " - " +  infoActu["texteActu"];
   corpCarte.appendChild(texteCarte);
    
    corpCarte.appendChild(btnLien);

    carteActu.appendChild(imgActu);
    carteActu.appendChild(corpCarte);
    ctncarte.appendChild(carteActu);

}

function GenererCarteActu(actualite) {   
    var ficheActu;
    ficheActu = Gen_CtnActualite(actualite); 

    //var affichageActualite = document.getElementById("cntActu");
    //affichageActualite.append(ficheActu);

   
}



function requeteFicheActu(){

    let ReqActualite = new Array();
    $.ajax({
        url: 'Actualite/actualite.php',
        method: 'POST',
        async: true,
        data: { action: "infoActuTous" },
        dataType: 'text',        
        success: function(result, status, xhr) {
            console.log(result)
            ReqActualite = result;
            for (x in ReqActualite) {
                actualite = ReqActualite[x];
                GenererCarteActu(actualite);
               
            }

        },
        error: function(xhr, status, error) {
        },
        complete: function(xhr, status) {       
        }     
    });



}



function remplirModale(){

    $(document).on("click", ".btnActuModale", function() {
        idActuMdl =  $(this).attr("id");
        idActuMdl = idActuMdl.slice(idActuMdl.indexOf("_") + 1, idActuMdl.length);
        
        $.ajax({
            url: 'Actualite/actualite.php',
            method: 'POST',
            async: true,
            data: { action: "infoModale",
                    idActuMdl:  idActuMdl},
            dataType: 'text',        
            success: function(result, status, xhr) {
                ReqActualite = JSON.parse(result);

                $("#imgModal").attr("src", ReqActualite[0].photoActu);
                $("#titreModaleActu").text(ReqActualite[0].titreActu);
                var dateAct = new Date(ReqActualite[0].dateActu);
                dateAct = dateAct.toLocaleString("fr-CA", { dateStyle: 'long' });
                $("#dateModaleActu").text(dateAct);
                $("#texteModaleActu").text(ReqActualite[0].texteActu);
            },
            error: function(xhr, status, error) {
            },
            complete: function(xhr, status) {       
            }     
        });

      
       
    });
  
}

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

/*
 function RetirerFichesVoitures(){
             var affichageVoiture = document.getElementById("ctnContenu_Page");
             while (affichageVoiture.firstChild) {
                 affichageVoiture.removeChild(affichageVoiture.lastChild);
               }
         }
         
*/






