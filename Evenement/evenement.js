
let infoEvenmt="";
let evenement="";

$(document).ready(function () {

    Remplirmodale();
    requeteFicheEvenmt();
});



function Gen_CtnEvenement(infoEvenmt){

    let ctncarte = document.getElementById("cntEvenmt");
    let carteEvenmt = document.createElement("div");
    let imgEvenmt = document.createElement("img");
    let corpCarte = document.createElement("div");
    let titreCarte = document.createElement("h4");
    let texteCarte = document.createElement("p");
    let divBtn = document.createElement("div")
    let btnLien = document.createElement("a");
    let dateBold = "";

    carteEvenmt.setAttribute('class', 'card mb-4 ml-3');
    imgEvenmt.setAttribute('class', 'card-img');
    imgEvenmt.setAttribute('src', infoEvenmt["photoEvenement"]);
    imgEvenmt.setAttribute('alt', 'Image de l\'Évènement');
    corpCarte.setAttribute('class', 'card-body');
    titreCarte.setAttribute('class', 'card-title mb-4');
    texteCarte.setAttribute('class', 'card-text');
    btnLien.setAttribute('href', '#');
    btnLien.setAttribute('class', 'btn stretched-link');
    btnLien.setAttribute('data-toggle', 'modal');
    btnLien.setAttribute('data-target', '#modaleEvenmt');
   
    var idLien = "idEvenmt_" + infoEvenmt["idEvenement"];
    btnLien.setAttribute('id', idLien);

    titreCarte.innerHTML = infoEvenmt["titreEvenement"];
    var dateEvenmt = new Date(infoEvenmt["dateEvenement"]);
    dateEvenmt = dateEvenmt.toLocaleString("fr-CA", { dateStyle: 'medium' });
    dateBold = dateEvenmt;
    btnLien.innerHTML = "Plus";


   corpCarte.appendChild(titreCarte);
   //texteCarte.appendChild(dateBold);
   texteCarte.innerHTML = dateBold.bold() +  " - " +  infoEvenmt["texteEvenement"];
   corpCarte.appendChild(texteCarte);
    
    divBtn.appendChild(btnLien);
    corpCarte.appendChild(divBtn);

    carteEvenmt.appendChild(imgEvenmt);
    carteEvenmt.appendChild(corpCarte);
    ctncarte.appendChild(carteEvenmt);

}


function GenererCarteEvenmt(evenement) {
    var ficheEvenmt;
    ficheEvenmt = Gen_CtnEvenement(evenement);   
   
}


function requeteFicheEvenmt(){

    let ReqEvenement = new Array();
    $.ajax({
        url: 'Evenement/evenement.php',
        method: 'POST',
        async: true,
        data: { action: "infoEvenmtTous" },
        dataType: 'text',        
        success: function(result, status, xhr) {
            ReqEvenement = JSON.parse(result);
            for (x in ReqEvenement) {
                evenement = ReqEvenement[x];
                GenererCarteEvenmt(evenement);
            }

        },
        error: function(xhr, status, error) {
        },
        complete: function(xhr, status) {       
        }     
    });



}



function Remplirmodale(){

    $(document).on("click", ".btnEvenmtModale", function() {
        idEvenmtMdl =  $(this).attr("id");
        idEvenmtMdl = idEvenmtMdl.slice(idEvenmtMdl.indexOf("_") + 1, idEvenmtMdl.length);
        
        $.ajax({
            url: 'Evenement/evenement.php',
            method: 'POST',
            async: true,
            data: { action: "infoModale",
                    idEvenmtMdl:  idEvenmtMdl},
            dataType: 'text',        
            success: function(result, status, xhr) {
                ReqEvenement = JSON.parse(result);

                $("#imgModalEvenmt").attr("src", ReqEvenement[0].photoEvenement);
                $("#titreModaleEvenmt").text(ReqEvenement[0].titreEvenement);
                var dateEvnmt = new Date(ReqEvenement[0].dateEvenement);
                dateEvnmt = dateEvnmt.toLocaleString("fr-CA", { dateStyle: 'long' });
                $("#dateModaleEvenmt").text(dateEvnmt);
                $("#texteModaleEvenmt").text(ReqEvenement[0].texteEvenement);
            },
            error: function(xhr, status, error) {
            },
            complete: function(xhr, status) {       
            }     
        });

      
       
    });
  
}

function RechercheEvenements(recherche){

    $(document).on("click", ".btnEvenmtModale", function() {
        idEvenmtMdl =  $(this).attr("id");
        idEvenmtMdl = idEvenmtMdl.slice(idEvenmtMdl.indexOf("_") + 1, idEvenmtMdl.length);
        
        $.ajax({
            url: 'Evenement/evenement.php',
            method: 'POST',
            async: true,
            data: { action: "rechercheModale",
                    recherche: recherche,
                    idEvenmtMdl:  idEvenmtMdl},
            dataType: 'text',        
            success: function(result, status, xhr) {
                ReqEvenement = JSON.parse(result);

                $("#imgModalEvenmt").attr("src", ReqEvenement[0].photoEvenement);
                $("#titreModaleEvenmt").text(ReqEvenement[0].titreEvenement);
                var dateEvnmt = new Date(ReqEvenement[0].dateEvenement);
                dateEvnmt = dateEvnmt.toLocaleString("fr-CA", { dateStyle: 'long' });
                $("#dateModaleEvenmt").text(dateEvnmt);
                $("#texteModaleEvenmt").text(ReqEvenement[0].texteEvenement);
            },
            error: function(xhr, status, error) {
            },
            complete: function(xhr, status) {       
            }     
        });

      
       
    });
  
}

function montest(){
    alert("OK");
}


