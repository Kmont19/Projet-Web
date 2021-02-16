


function GenererCarteEvenement(){

    let ctncarte = document.getElementById("cntEvenmt");
    let carteEvenmt = document.createElement("div");
    let imgEvenmt = document.createElement("img");
    let corpCarte = document.createElement("div");
    let titreCarte = document.createElement("h4");
    let texteCarte = document.createElement("p");
    let divBtn = document.createElement("div")
    let btnLien = document.createElement("a");
    let dateBold = "";

    carteEvenmt.setAttribute('class', 'card');
    imgEvenmt.setAttribute('class', 'card-img imgCarteEvenmt');
    imgEvenmt.setAttribute('src', '../Images/imgActu.jpg');
    imgEvenmt.setAttribute('alt', 'Image de l\'Évènement');
    corpCarte.setAttribute('class', 'card-body corpCarteEvenmt');
    titreCarte.setAttribute('class', 'card-title');
    texteCarte.setAttribute('class', 'card-text texteCarteEvenmt');
    btnLien.setAttribute('href', '#');
    btnLien.setAttribute('class', 'btn btn-primary stretched-link');
    btnLien.setAttribute('data-toggle', 'modal');
    btnLien.setAttribute('data-target', '#modaleActu');
   
   
    titreCarte.innerHTML = "Nouveau serveur";
    dateBold = "28 Janvier 2021";
    btnLien.innerHTML = "Plus";


   corpCarte.appendChild(titreCarte);
   //texteCarte.appendChild(dateBold);
   texteCarte.innerHTML = dateBold.bold() +  "- Le département d\'informatique viens d'acquérir un tout nouveau serveur super puissant qui va permettre au cégep de devenir le principal hébergeur web de la région, on est big maintenant.";
   corpCarte.appendChild(texteCarte);
    
    divBtn.appendChild(btnLien);
    corpCarte.appendChild(divBtn);

    carteEvenmt.appendChild(imgEvenmt);
    carteEvenmt.appendChild(corpCarte);

    ctncarte.appendChild(carteEvenmt);

}



function GenererEvenmt(){

    for(var x=0; x<=10; x++){
        GenererCarteEvenement();
    }

}






