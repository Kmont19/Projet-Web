function GenererCarteActu(){

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
    imgActu.setAttribute('src', 'Images/imgActu.jpg');
    imgActu.setAttribute('alt', 'Image de l\'actualité');
    corpCarte.setAttribute('class', 'card-body');
    titreCarte.setAttribute('class', 'card-title');
    texteCarte.setAttribute('class', 'card-text m-0');
    btnLien.setAttribute('href', '#');
    btnLien.setAttribute('class', 'btn stretched-link');
    btnLien.setAttribute('data-toggle', 'modal');
    btnLien.setAttribute('data-target', '#modaleActu');
   
   
    titreCarte.innerHTML = "Nouveau serveur";
    dateBold = "28 Janvier 2021";
    btnLien.innerHTML = "Plus";


   corpCarte.appendChild(titreCarte);
   //texteCarte.appendChild(dateBold);
   texteCarte.innerHTML = dateBold.bold() +  "- Le département d\'informatique viens d'acquérir un tout nouveau serveur super puissant qui va permettre au cégep de devenir le principal hébergeur web de la région, on est big maintenant.";
   corpCarte.appendChild(texteCarte);
    
    corpCarte.appendChild(btnLien);

    carteActu.appendChild(imgActu);
    carteActu.appendChild(corpCarte);

    ctncarte.appendChild(carteActu);

}



function GenererActu(){

    for(var x=0; x<=10; x++){
        GenererCarteActu();
    }

}






