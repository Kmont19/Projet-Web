

let infoActu="";
let actualite="";
$(document).ready(function () {

    Remplirmodale();
    requeteFicheActu();
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
    imgActu.setAttribute('class', 'card-img-top imgCarteActu');
    imgActu.setAttribute('src', infoActu["photoActu"]);
    imgActu.setAttribute('alt', 'Image de l\'actualité');
    corpCarte.setAttribute('class', 'card-body corpCarteActu');
    titreCarte.setAttribute('class', 'card-title');
    texteCarte.setAttribute('class', 'card-text texteCarteActu');
    btnLien.setAttribute('href', '#');
    btnLien.setAttribute('class', 'btn btn-primary stretched-link btnActuModale');
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
        url: '../Actualite/actualite.php',
        method: 'POST',
        async: true,
        data: { action: "infoActuTous" },
        dataType: 'text',        
        success: function(result, status, xhr) {
            ReqActualite = JSON.parse(result);
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



function Remplirmodale(){

    $(document).on("click", ".btnActuModale", function() {
        idActuMdl =  $(this).attr("id");
        idActuMdl = idActuMdl.slice(idActuMdl.indexOf("_") + 1, idActuMdl.length);
        
        $.ajax({
            url: '../Actualite/actualite.php',
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

/*
 function RetirerFichesVoitures(){
             var affichageVoiture = document.getElementById("ctnContenu_Page");
             while (affichageVoiture.firstChild) {
                 affichageVoiture.removeChild(affichageVoiture.lastChild);
               }
         }
         
*/






