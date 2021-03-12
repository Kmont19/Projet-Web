let tableauEvenemnets = [];

$(document).ready(function () {
    getListeEvents();
});

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
                                <li><i class="material-icons margin-10px-right">schedule</i>${heure}</li>
                                <li><i class="material-icons margin-5px-right">event</i> ${lieu}</li>
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
                                <li><i class="material-icons margin-10px-right">schedule</i>${heure}</li>
                                <li><i class="material-icons margin-5px-right">event</i> ${lieu}</li>
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
    tableauEvenemnets = [];
    $.ajax({
        url: "PHP/Evenement/getEvenements.php",
        method: "GET",
        dataType: "json",
        data: "getEvenements",
        success: function(result) {
            result.forEach(function(event) {
                tableauEvenemnets.push(event);
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


function clearEvenements() {
    $("#eventContainer").empty();
}

function rechercheEv(recherche) {
    //clear list
    clearEvenements();
    //ma fonction
    tableauEvenemnets = [];
    var flag = true;
    var cardEvent;
    $.ajax({
        url: "PHP/Evenement/getEvenementsRech.php",
        method: "GET",
        dataType: "json",
        data: {
            recherche: recherche
        },
        success: function(result) {
            result.forEach(function(event) {
                tableauEvenemnets.push(event);
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

function sortByDate(a, b) {
    return a.dateEvenement.localeCompare(b.dateEvenement)
}

function sortByNom(a, b) {
    return a.titreEvenement.localeCompare(b.titreEvenement)
}

function trierEvenementsParDate() {
    var flag = true;
    var cardEvent;
    if(tableauEvenemnets.length > 0) {
        clearEvenements();
        document.getElementById("filtre-nom").classList.remove("active");
        document.getElementById("filtre-recent").classList.add("active");
        tableauEvenemnets.forEach(function(e){
            e.dateEvenement = e.dateEvenement.split(" ").reverse().join(" ");
        })
        tableauEvenemnets.sort(sortByDate)
        tableauEvenemnets.reverse();
        tableauEvenemnets.forEach(function(e){
            e.dateEvenement = e.dateEvenement.split(" ").reverse().join(" ");
        })
        tableauEvenemnets.forEach(function(event) {
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
}

function trierEvenementsParNom() {
    var flag = true;
    var cardEvent;
    if(tableauEvenemnets.length > 0) {
        clearEvenements();
        document.getElementById("filtre-recent").classList.remove("active");
        document.getElementById("filtre-nom").classList.add("active");
        tableauEvenemnets.sort(sortByNom)
        tableauEvenemnets.forEach(function(event) {
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
}