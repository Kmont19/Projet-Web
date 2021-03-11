
let infoEvenmt="";
let evenement="";

$(document).ready(function () {
    getListeEvents();
    /*Remplirmodale();
    requeteFicheEvenmt();*/
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

//Creation des cards avec la photo à gauche
function createCardEventGauche(id, titre, date, heure, lieu, description, img) {
    var cardActu = `<div class="row align-items-center event-card no-gutters mb-5 w-100">
                        <div class="col-lg-5 col-sm-12">
                            <div class="event-image">
                                <img src="Images/Evenements/${img}" alt="">
                                <div class="events-date">
                                    <div class="font-size28">${date}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7 col-sm-12">
                            <div class="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                                <h5 class="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                                    <a class="text-theme-color">${titre}</a>
                                </h5>
                                <ul class="event-time margin-10px-bottom md-margin-5px-bottom">
                                    <li><i class="far fa-clock margin-10px-right"></i> ${heure} </li>
                                    <li><i class="fas fa-user margin-5px-right"></i> ${lieu}</li>
                                </ul>
                                <p>${description}</p>
                            </div>
                        </div>
                    </div>`
    return cardActu
}

function createCardEventDroite(id, titre, date, heure, lieu, description, img) {
    var cardActu = `<div class="row align-items-center event-card no-gutters mb-5 w-100">
                        <div class="col-lg-7 order-2 order-lg-1">
                            <div class="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                                <h5 class="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                                    <a class="text-theme-color">${titre}</a>
                                </h5>
                                <ul class="event-time margin-10px-bottom md-margin-5px-bottom">
                                    <li><i class="far fa-clock margin-10px-right"></i>  ${heure} </li>
                                    <li><i class="fas fa-user margin-5px-right"></i> ${lieu}</li>
                                </ul>
                                <p>${description}</p>
                            </div>
                        </div>
                        <div class="col-lg-5 order-1 order-lg-2">
                            <div class="event-image">
                                <img src="Images/Evenements/${img}" alt="">
                                <div class="events-date">
                                    <div class="font-size28">${date}</div>
                                </div>
                            </div>
                        </div>
                    </div>`
    return cardActu
}



//Avoir la liste d'événements
function getListeEvents() {
    var flag = true;
    var cardEvent;
    $.ajax({
        url: "PHP/Evenement/getEvenements.php",
        method: "GET",
        dataType: "json",
        data: "getEvenements",
        success: function(result) {
            result.forEach(function(event) {
                if(flag === true) {
                    cardEvent = createCardEventGauche(event.idEvenement, event.titreEvenement, event.dateEvenement, event.heure, event.lieuEvenement, event.texteEvenement, event.photoEvenement);
                    $('#eventContainer').append(cardEvent);
                    flag = false;
                } else {
                    cardEvent = createCardEventDroite(event.idEvenement, event.titreEvenement, event.dateEvenement, event.heure, event.lieuEvenement, event.texteEvenement, event.photoEvenement);
                    $('#eventContainer').append(cardEvent);
                    flag = true;
                }
            })
            
        }
    })
}
