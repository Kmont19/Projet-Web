

let idCarsl = "";
let CarslActif= "";
$(document).ready(function () {
    $("#menu").load("menu.html")
    $("#footer").load("footer.html")
    AjoutCarrousel();
    ModifierCarrousel();
    SupprimerCarrousel();
    AffichageListeCarrousel();
    //IdActuTableau();
    RemplirFormCarrousel();
    ValidationChamps();
    AnnulerCarsl()
});

//TODO: VALIDATIONS DES ENTRÉES
function AjoutCarrousel(){

    $("#btnAjoutCarslEvnt").unbind().click(function (e) {    
       e.preventDefault();

      
        let form_data = new FormData();
        let fichierImage = $('#imageCarslEvnt').prop('files')[0];
        form_data.append('imageCarslEvnt', fichierImage);
        form_data.append('action', 'Ajouter');
        form_data.append('titreCarrousel', $("#titreCarslEvnt").val());
        form_data.append('texteCarrousel', $("#texteCarslEvnt").val());

        if(ValidationCarsl()==true){
            $.ajax({
                url: 'ADMINISTRATION/ADMIN_PHP/carrouselEvenmt_admin.php',
                method: 'POST',
                async: true,
                dataType: "json", 
                contentType: false,
                processData: false,
                data: form_data,               
                success: function (result, statusTxt, xhr) {
        
                },
                error: function(xhr, status, error) {
            
                },
                complete: function(xhr, status) {
                
                }
            });
            AffichageListeCarrousel();
        }
    });
    
}

//TODO: VALIDATIONS DES ENTRÉES
function ModifierCarrousel(){
    
    $("#btnModifCarslEvnt").unbind().click(function (e) {    
       e.preventDefault();

       let form_data = new FormData();
       let fichierImage = $('#imageCarslEvnt').prop('files')[0];
       form_data.append('imageCarslEvnt', fichierImage);

       form_data.append('action', 'Modifier');
       form_data.append('idCarsl', idCarsl);
       form_data.append('titreCarrousel', $("#titreCarslEvnt").val());
       form_data.append('texteCarrousel', $("#texteCarslEvnt").val());

        //BUG: PROBLÈME AVEC LA MODIFICATION DES IMAGES.

       if(ValidationCarsl()==true){
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/carrouselEvenmt_admin.php',
            method: 'POST',
            async: true,
            dataType: "json", 
            contentType: false,
            processData: false,
            data: form_data,               
            success: function (result, statusTxt, xhr) {

            },
            error: function(xhr, status, error) {
         
            },
            complete: function(xhr, status) {
            
            }
        });
        AffichageListeCarrousel();
    }
       
    });
    
}

function SupprimerCarrousel(){

    let objActif= "";
    $("#btnSupprimerCarslEvnt").unbind().click(function (e) {    
       e.preventDefault();
    
    $.ajax({
        url: 'ADMINISTRATION/ADMIN_PHP/carrouselEvenmt_admin.php',
        method: 'POST',
        async: true,
        data: { action: "infoActif",
                idCarsl: idCarsl},
        dataType: 'text',        
        success: function(result, status, xhr) {
            requete = JSON.parse(result);    
            if(requete[0].actif==0){
                objActif = "react";
            }else if(requete[0].actif==1){
                objActif = "sup";        
            }

            let form_data = new FormData();
            form_data.append('action', 'Supprimer');
            form_data.append('idCarsl', idCarsl);
            form_data.append('actif', objActif);
    
            $.ajax({
                url: 'ADMINISTRATION/ADMIN_PHP/carrouselEvenmt_admin.php',
                method: 'POST',
                async: true,
                dataType: "json", 
                contentType: false,
                processData: false,
                data: form_data,               
                success: function (result, statusTxt, xhr) {
                    AffichageListeCarrousel();
                },
                error: function(xhr, status, error) {            
                },
                complete: function(xhr, status) {                
                }
            });           
        },
        error: function(xhr, status, error) {
        },
        complete: function(xhr, status) {       
        }     
    });

    });
   
}




function AffichageListeCarrousel(){
    EffacerTableau();
    var requete = new Array();
    var elmntCarsl;  
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/carrouselEvenmt_admin.php',
            method: 'POST',
            async: true,
            data: { action: "listeCarrousel" },
            dataType: 'text',        
            success: function(result, status, xhr) {
                requete = JSON.parse(result);                               
                let tableCarsl = document.getElementById("corpsTabEvenement");

                for (x in requete) {
                    elmntCarsl = requete[x];
                    let lgnTab = document.createElement("tr");
                    let colTitre = document.createElement("td");
                    let colTexte = document.createElement("td");
                  
                    let idLgn = "idCarsl_" + elmntCarsl.id_Evenmt_carrousel;
                    lgnTab.setAttribute("id", idLgn);
                    lgnTab.setAttribute("class", "lgnTblCarsl");
                    lgnTab.setAttribute("data-toggle", "modal");
                    lgnTab.setAttribute("data-target", "#adminFormCarslEvnt");
                    colTitre.innerHTML = elmntCarsl.titre_carrousel;
                    colTexte.innerHTML = elmntCarsl.texte_carrousel;
                                  
                    lgnTab.appendChild(colTitre);
                    lgnTab.appendChild(colTexte);
                    
                    if(elmntCarsl.actif==0){
                        lgnTab.setAttribute("style", "background-color:  #d9534f ;");
                    }
                    tableCarsl.appendChild(lgnTab);                   
                }              
            },
            error: function(xhr, status, error) {
                alert(error);
            },         
        });


}



//TODO: FONCTIONS DE RECHERCHES
function AffichageActu_Titre(){
    EffacerTableau();
    var reqActu = new Array();
    var actualite;  
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/carrouselEvenmt_admin.php',
            method: 'POST',
            async: true,
            data: { action: "listeActuTitre" },
            dataType: 'text',        
            success: function(result, status, xhr) {
                reqActu = JSON.parse(result);                               
                let tableActu = document.getElementById("corpsTabActu");

                for (x in reqActu) {
                    actualite = reqActu[x];
                    let lgnTab = document.createElement("tr");
                    let colTitre = document.createElement("td");
                    let colDate = document.createElement("td");
                    let colAutre = document.createElement("td");
                    let idLgn = "idActu_" + actualite.idActualite;
                    lgnTab.setAttribute("id", idLgn);
                    lgnTab.setAttribute("class", "lgnTblActu");
                    lgnTab.setAttribute("data-toggle", "modal");
                    lgnTab.setAttribute("data-target", "#adminFormActu");
                    colTitre.innerHTML = actualite.titreActu;
                    colDate.innerHTML = actualite.dateActu;
                    colAutre.innerHTML = "Autre";                  
                    lgnTab.appendChild(colTitre);
                    lgnTab.appendChild(colDate);
                    lgnTab.appendChild(colAutre);
                    tableActu.appendChild(lgnTab);                   
                }              
            },
            error: function(xhr, status, error) {
                alert("Erreur");
            },         
        });


}


function EffacerTableau(){
    $("#corpsTabEvenement").empty();
    
}

function RemplirFormCarrousel(){

    $(document).on("click", ".lgnTblCarsl", function() {
        idCarsl =  $(this).attr("id");
        idCarsl = idCarsl.slice(idCarsl.indexOf("_") + 1, idCarsl.length);
        Annuler();

        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/carrouselEvenmt_admin.php',
            method: 'POST',
            async: true,
            data: { action: "infoCarrousel" ,
                    idCarsl: idCarsl},
            dataType: 'text',        
            success: function(result, status, xhr) {
                requete = JSON.parse(result);

                $("#titreActu").val(requete[0].titreCarrousel);
                $("#dateActu").val(requete[0].texteCarrousel);
             /*   var strUrl = reqActu[0].photoActu;
                    strUrl = strUrl.replace(String.fromCharCode(92),String.fromCharCode(92,92));                 
                $("#lgnTblActu").text(strUrl.slice(strUrl.lastIndexOf("/") + 1, strUrl.length));*/
                if(requete[0].actif==0){
                    $("#btnSupprimerCarslEvnt").css("background-color", " #f0ad4e ");
                    $("#btnSupprimerCarslEvnt").css("color", "black ");
                    $("#btnSupprimerCarslEvnt").text("Réactiver");
                    CarslActif = false;
                }else{
                    $("#btnSupprimerCarslEvnt").css("background-color", " #d9534f  ");
                    $("#btnSupprimerCarslEvnt").css("color", "white ");
                    $("#btnSupprimerCarslEvnt").text("Supprimer");
                    CarslActif = true;
                }
            },
            error: function(xhr, status, error) {
                alert("Erreur");
            },
            complete: function(xhr, status) {
            
            }     
        });
        $("#btnAjoutCarslEvnt").hide();
        $("#btnModifCarslEvnt").show();
        $("#btnSupprimerCarslEvnt").show();
       
    });
}


function ModaleAjout(){
    
    $("#btnModifCarslEvnt").hide();
    $("#btnSupprimerCarslEvnt").hide();
    $("#btnAjoutCarslEvnt").show();
    ViderChampsFrm();

}

function ViderChampsFrm(){
    $("#titreCarslEvnt").val("");
    $("#texteCarslEvnt").val("");             
    $("#lgnTblCarsl").text("");
}

function AnnulerCarsl(){
   
    $("#btnAnnulerCarslEvnt").click(function (e) { 
        e.preventDefault();
        Annuler();   
    });
    $("#BtnModalAjoutCarslEvnt").click(function (e) { 
        e.preventDefault();
        Annuler();   
    });
    
}


function Annuler(){
   

        ViderChampsFrm();

        $("#lblTitre").remove();
        $("#lblTexte").remove();

        $("#titreCarslEvnt").css("border-color", "initial");
        $("#texteCarslEvnt").css("border-color", "initial");
        $("#divTitreActu").css("margin-bottom", "1rem");
        $("#divTexteActu").css("margin-bottom", "1rem");
    
    
}

/*
function IdActuTableau(){

    let idActu = "";
    $(".lgnTblActu").hover(function () {

         idActu =  $(this).attr("id");
            alert("hover");
        }, function () {
            // out
        }
    );

}*/



function ValidationCarsl(){

    let titreValide = false;
    let texteValide = false;
    let entreeValide = false;
    

    var regex_Vide_OUI = /((^([\s\t\0]?)$){1})/;
    var regex_String_Unique_OUI = /((^[A-Z a-z - ' \ áÁàÀâÂäÄéÉèÈëËêÊíÍîÎïÏóÓôÔòÒöÖúÚùÙûÛüÜçÇ\\s\-]+$){1})/;
    var regex_Numerique_Int_OUI = /((^[0-9]+$){1})/;
    var regex_Date_Int_OUI = /(^([0-9]+)([-\/]?)([0-9]+)([-\/]?)([0-9]+)$){1}/;
    var regex_Numerique_Decimal_OUI = /(^(([0-9]+)([,.]?)([0-9]+)){1}$)/;
    var $regex_CodePostal_OUI = /((^([a-zA-z]{1})([0-9]{1})([a-zA-z]{1})([ ]*)([0-9]{1})([a-zA-z]{1})([0-9]{1})$){1})/;
    var regex_Telephone_OUI = /((^([(]*)(([0-9]{3}){1})([)]*)([ -]*)(([0-9]{3}){1})([ -]*)(([0-9]{4}){1})$){1})/;
    var regex_Courriel_OUI = /(^(.+)(@)((.+)([\.]{1})(.+))+$)/;
    var regex_MotDePasse_OUI = /((^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#!\"$%?&*()_+|=\/*]).{8,}$))/;
    var regex_StringTousCaracteres_OUI = /((^[A-Z a-z 0-9 |(){}\[\]±@£¢­<>#!%?$&*-+\/=,.;:´`'\"«»°_\ áÁàÀâÂäÄéÉèÈëËêÊíÍîÎïÏóÓôÔòÒöÖúÚùÙûÛüÜçÇ\\s\-]+$){1})/;


    var titreCarsl =   $("#titreCarslEvnt").val();
        if(regex_Vide_OUI.test(titreCarsl)==true){
            titreValide = false;
        }else{
            if(regex_StringTousCaracteres_OUI.test(texteCarsl)==false){       
                titreValide = false;
            }else{           
                titreValide = true;
            }
        }

            var texteCarsl =   $("#texteCarslEvnt").val();                
             if(regex_Vide_OUI.test(texteCarsl)==true){
                texteValide = false;
             }else{
                 if(regex_StringTousCaracteres_OUI.test(texteCarsl)==false){       
                    texteValide = false;
                 }else{           
                    texteValide = true;
                 }
             }

        if((titreValide==true)&&(texteValide==true)){
            entreeValide = true;
        }
 
        return entreeValide;
}

function ValidationChamps(){

    var regex_Vide_OUI = /((^([\s\t\0]?)$){1})/;
    var regex_String_Unique_OUI = /((^[A-Z a-z - ' \ áÁàÀâÂäÄéÉèÈëËêÊíÍîÎïÏóÓôÔòÒöÖúÚùÙûÛüÜçÇ\\s\-]+$){1})/;
    var regex_Numerique_Int_OUI = /((^[0-9]+$){1})/;
    var regex_Date_Int_OUI = /(^([0-9]+)([-\/]?)([0-9]+)([-\/]?)([0-9]+)$){1}/;
    var regex_Numerique_Decimal_OUI = /(^(([0-9]+)([,.]?)([0-9]+)){1}$)/;
    var $regex_CodePostal_OUI = /((^([a-zA-z]{1})([0-9]{1})([a-zA-z]{1})([ ]*)([0-9]{1})([a-zA-z]{1})([0-9]{1})$){1})/;
    var regex_Telephone_OUI = /((^([(]*)(([0-9]{3}){1})([)]*)([ -]*)(([0-9]{3}){1})([ -]*)(([0-9]{4}){1})$){1})/;
    var regex_Courriel_OUI = /(^(.+)(@)((.+)([\.]{1})(.+))+$)/;
    var regex_MotDePasse_OUI = /((^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#!\"$%?&*()_+|=\/*]).{8,}$))/;
    var regex_StringTousCaracteres_OUI = /((^[A-Z a-z 0-9 |(){}\[\]±@£¢­<>#!%?$&*-+\/=,.;:´`'\"«»°_\ áÁàÀâÂäÄéÉèÈëËêÊíÍîÎïÏóÓôÔòÒöÖúÚùÙûÛüÜçÇ\\s\-]+$){1})/;

    $("#titreCarslEvnt").focus(function (e) { 
        e.preventDefault();
        $("#lblTitre").remove();
        $("#titreCarslEvnt").css("border-color", "initial");
        $("#divTitreActu").css("margin-bottom", "1rem");
    });
    $("#texteCarslEvnt").focus(function (e) { 
        e.preventDefault();
        $("#lblTexte").remove();
        $("#texteCarslEvnt").css("border-color", "initial");
        $("#divTexteActu").css("margin-bottom", "1rem");
    });
    

   $("#titreCarslEvnt").blur(function (e) { 
       e.preventDefault();
       var titreCarsl =   $("#titreCarslEvnt").val();
       var lblvalidTitre = document.createElement("p");
       lblvalidTitre.setAttribute("id", "lblTitre");
        if(regex_Vide_OUI.test(titreCarsl)==true){
            lblvalidTitre.setAttribute("class", "lblNonValid");
            lblvalidTitre.innerHTML = "Vous devez entrer un titre";
            $("#titreCarslEvnt").css("border-color", "red");
        }else{
            if(regex_StringTousCaracteres_OUI.test(titreCarsl)==false){       
                lblvalidTitre.setAttribute("class", "lblNonValid");
                lblvalidTitre.innerHTML = "Titre non-valide ";
                $("#titreCarslEvnt").css("border-color", "red");
            }else{           
                lblvalidTitre.setAttribute("class", "lblValid");
                lblvalidTitre.innerHTML = "Titre valide";
                $("#titreCarslEvnt").css("border-color", "green");
            }
        }
            $(lblvalidTitre).insertAfter("#divTitreActu");
            $("#divTitreActu").css("margin-bottom", "0rem");
           

   });
       

   $("#texteCarslEvnt").blur(function (e) { 
    e.preventDefault();
    var texteCarsl =   $("#texteCarslEvnt").val();      
            var lblvalidTexte = document.createElement("p");
            lblvalidTexte.setAttribute("id", "lblTexte");
             if(regex_Vide_OUI.test(texteCarsl)==true){
                lblvalidTexte.setAttribute("class", "lblNonValid");
                lblvalidTexte.innerHTML = "Vous devez entrer un texte";
                $("#texteCarslEvnt").css("border-color", "red");
             }else{
                 if(regex_StringTousCaracteres_OUI.test(texteCarsl)==false){       
                    lblvalidTexte.setAttribute("class", "lblNonValid");
                    lblvalidTexte.innerHTML = "Texte non-valide ";
                    $("#texteCarslEvnt").css("border-color", "red");
                 }else{           
                    lblvalidTexte.setAttribute("class", "lblValid");
                    lblvalidTexte.innerHTML = "Valide";
                    $("#texteCarslEvnt").css("border-color", "green");
                 }
             }
                 $(lblvalidTexte).insertAfter("#divTexteActu");
                 $("#divTexteActu").css("margin-bottom", "0rem");
    });


   

}



/*
function TypeRequete(){


    if(($("#dpdTypeRequete").val()=="titre")&&()){
        AffichageActu_Titre();
    }
    else{
        AffichageActu_Tous();
    }


}*/
