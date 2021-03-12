

let idLiens = "";
let liensActif= "";
$(document).ready(function () {
    $("#menu").load("menu.html")
    $("#footer").load("footer.html")
    AjoutLiens();
    ModifierLiens();
    SupprimerLiens();
    AffichageListeLiens();
    //IdActuTableau();
    RemplirFormLiens();
    ValidationChamps();
    Annuler();
});

//TODO: VALIDATIONS DES ENTRÉES
function AjoutLiens(){

    $("#btnAjoutLiens").unbind().click(function (e) {    
       e.preventDefault();

      
        let form_data = new FormData();
        form_data.append('action', 'Ajouter');
        form_data.append('texteLiens', $("#texteLiens").val());
        form_data.append('urlLiens', $("#urlLiens").val());

       // if(ValidationActu()==true){
            $.ajax({
                url: 'ADMINISTRATION/ADMIN_PHP/liens_admin.php',
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
            AffichageListeLiens();
       // }
    });
    
}



//TODO: VALIDATIONS DES ENTRÉES
function ModifierLiens(){
    
    $("#btnModifLiens").unbind().click(function (e) {    
       e.preventDefault();

        let form_data = new FormData();
        form_data.append('action', 'Modifier');
        form_data.append('idLiens', idLiens);
        form_data.append('texteLiens', $("#texteLiens").val());
        form_data.append('urlLiens', $("#urlLiens").val());

        //BUG: PROBLÈME AVEC LA MODIFICATION DES IMAGES.

    //    if(ValidationActu()==true){
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/liens_admin.php',
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
        AffichageListeLiens();
   // }
       
    });
    
}

function SupprimerLiens(){

    let objActif= "";
    $("#btnSupprimerLiens").unbind().click(function (e) {    
       e.preventDefault();
    
    $.ajax({
        url: 'ADMINISTRATION/ADMIN_PHP/liens_admin.php',
        method: 'POST',
        async: true,
        data: { action: "infoActif",
                idLiens: idLiens},
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
            form_data.append('idLiens', idLiens);
            form_data.append('actif', objActif);
    
            $.ajax({
                url: 'ADMINISTRATION/ADMIN_PHP/liens_admin.php',
                method: 'POST',
                async: true,
                dataType: "json", 
                contentType: false,
                processData: false,
                data: form_data,               
                success: function (result, statusTxt, xhr) {
                    AffichageListeLiens();
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




function AffichageListeLiens(){
    EffacerTableau();
    var requete = new Array();
    var elmntLiens;  
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/liens_admin.php',
            method: 'POST',
            async: true,
            data: { action: "listeLiens" },
            dataType: 'text',        
            success: function(result, status, xhr) {
                requete = JSON.parse(result);                               
                let tableLiens = document.getElementById("corpsTabEvenement");

                for (x in requete) {
                    elmntLiens = requete[x];
                    let lgnTab = document.createElement("tr");
                    let colTitre = document.createElement("td");
                    let colTexte = document.createElement("td");
                  
                    let idLgn = "idLiens_" + elmntLiens.id_lien;
                    lgnTab.setAttribute("id", idLgn);
                    lgnTab.setAttribute("class", "lgnTblLiens");
                    lgnTab.setAttribute("data-toggle", "modal");
                    lgnTab.setAttribute("data-target", "#adminFormLiens");
                    colTitre.innerHTML = elmntLiens.texte_lien;
                    colTexte.innerHTML = elmntLiens.url_lien;
                                  
                    lgnTab.appendChild(colTitre);
                    lgnTab.appendChild(colTexte);
                    
                    if(elmntLiens.actif==0){
                        lgnTab.setAttribute("style", "background-color:  #d9534f ;");
                    }
                    tableLiens.appendChild(lgnTab);                   
                }              
            },
            error: function(xhr, status, error) {
                alert("Erreur");
            },         
        });


}



//TODO: FONCTIONS DE RECHERCHES
function AffichageActu_Titre(){
    EffacerTableau();
    var reqActu = new Array();
    var actualite;  
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/liens_admin.php',
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
                    lgnTab.setAttribute("class", "lgnTbl");
                    lgnTab.setAttribute("data-toggle", "modal");
                    lgnTab.setAttribute("data-target", "#adminFormLiens");
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

function RemplirFormLiens(){

    $(document).on("click", ".lgnTblLiens", function() {
        idLiens =  $(this).attr("id");
        idLiens = idLiens.slice(idLiens.indexOf("_") + 1, idLiens.length);
        

        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/liens_admin.php',
            method: 'POST',
            async: true,
            data: { action: "infoLien" ,
                    idLiens: idLiens},
            dataType: 'text',        
            success: function(result, status, xhr) {
                requete = JSON.parse(result);

                $("#texteLiens").val(requete[0].texte_lien);
                $("#urlLiens").val(requete[0].url_lien);
                if(requete[0].actif==0){
                    $("#btnSupprimerLiens").css("background-color", " #f0ad4e ");
                    $("#btnSupprimerLiens").css("color", "black ");
                    $("#btnSupprimerLiens").text("Réactiver");
                    liensActif = false;
                }else{
                    $("#btnSupprimerLiens").css("background-color", " #d9534f  ");
                    $("#btnSupprimerLiens").css("color", "white ");
                    $("#btnSupprimerLiens").text("Supprimer");
                    liensActif = true;
                }
            },
            error: function(xhr, status, error) {
                alert("Erreur");
            },
            complete: function(xhr, status) {
            
            }     
        });
        $("#btnAjoutLiens").hide();
        $("#btnModifLiens").show();
        $("#btnSupprimerLiens").show();
       
    });
}


function ModaleAjout(){
    
    $("#btnAjoutLiens").hide();
    $("#btnSupprimerLiens").hide();
    $("#btnAjoutLiens").show();
    ViderChampsFrm();

}

function ViderChampsFrm(){
    $("#texteLiens").val("");
    $("#urlLiens").val("");             
    $("#lgnTblLiens").text("");
}

function Annuler(){
   
    $("#btnAnnulerLiens").click(function (e) { 
        e.preventDefault();
        ViderChampsFrm();

        $("#lblTitre").remove();
        $("#lblTexte").remove();
        $("#lblDate").remove();

        $("#texteLiens").css("border-color", "initial");
        $("#urlLiens").css("border-color", "initial");
       
    
    });
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



function ValidationLiens(){

    let texteValide = false;
    let urlValide = false;


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


    var texteLien =   $("#texteLiens").val();
       var lblvalidTexte = document.createElement("p");
       lblvalidTitre.setAttribute("id", "lblTitre");
        if(regex_Vide_OUI.test(texteLien)==true){
            lblvalidTexte.setAttribute("class", "lblNonValid");
            lblvalidTexte.innerHTML = "Vous devez entrer un texte de lien";
            $("#texteLiens").css("border-color", "red");
            texteValide = false;
        }else{
            if(regex_StringTousCaracteres_OUI.test(texteLien)==false){       
                lblvalidTexte.setAttribute("class", "lblNonValid");
                lblvalidTexte.innerHTML = "Titre non-valide ";
                $("#texteLiens").css("border-color", "red");
                texteValide = false;
            }else{           
                lblvalidTexte.setAttribute("class", "lblValid");
                lblvalidTexte.innerHTML = "Titre valide";
                $("#texteLiens").css("border-color", "green");
                texteValide = true;
            }
        }
            $(lblvalidTexte).insertAfter("#divTitreActu");



            var urlLien =   $("#urlLiens").val();      
            var lblvalidUrl = document.createElement("p");
            lblvalidTexte.setAttribute("id", "lblTexte");
             if(regex_Vide_OUI.test(urlLien)==true){
                lblvalidUrl.setAttribute("class", "lblNonValid");
                lblvalidUrl.innerHTML = "Vous devez entrer un texte";
                $("#urlLiens").css("border-color", "red");
                urlValide = false;
             }else{
                 if(regex_StringTousCaracteres_OUI.test(urlLien)==false){       
                    lblvalidUrl.setAttribute("class", "lblNonValid");
                    lblvalidUrl.innerHTML = "Texte non-valide ";
                    $("#urlLiens").css("border-color", "red");
                    urlValide = false;
                 }else{           
                    lblvalidUrl.setAttribute("class", "lblValid");
                    lblvalidUrl.innerHTML = "Texte valide";
                    $("#urlLiens").css("border-color", "green");
                    urlValide = true;
                 }
             }
                 $(lblvalidUrl).insertAfter("#divTexteActu");

        if((texteValide==true)&&(urlValide==true)){
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

    $("#texteLiens").focus(function (e) { 
        e.preventDefault();
        $("#lblTexte").remove();
        $("#texteLiens").css("border-color", "initial");
    });
    $("#urlLiens").focus(function (e) { 
        e.preventDefault();
        $("#lblUrl").remove();
        $("#urlLiens").css("border-color", "initial")
    });
   
   $("#texteLiens").blur(function (e) { 
       e.preventDefault();
       var texteLien =   $("#texteLiens").val();
       var lblvalidTexte = document.createElement("p");
       lblvalidTitre.setAttribute("id", "lblTexte");
        if(regex_Vide_OUI.test(texteLien)==true){
            lblvalidTexte.setAttribute("class", "lblNonValid");
            lblvalidTexte.innerHTML = "Vous devez entrer un texte de lien";
            $("#texteLiens").css("border-color", "red");
            texteValide = false;
        }else{
            if(regex_StringTousCaracteres_OUI.test(texteLien)==false){       
                lblvalidTexte.setAttribute("class", "lblNonValid");
                lblvalidTexte.innerHTML = "Titre non-valide ";
                $("#texteLiens").css("border-color", "red");
                texteValide = false;
            }else{           
                lblvalidTexte.setAttribute("class", "lblValid");
                lblvalidTexte.innerHTML = "Titre valide";
                $("#texteLiens").css("border-color", "green");
                texteValide = true;
            }
        }
            $(lblvalidTexte).insertAfter("#divTitreActu");
   });
       

   $("#urlLiens").blur(function (e) { 
    e.preventDefault();
    var urlLien =   $("#urlLiens").val();      
            var lblvalidUrl = document.createElement("p");
            lblvalidTexte.setAttribute("id", "lblUrl");
             if(regex_Vide_OUI.test(urlLien)==true){
                lblvalidUrl.setAttribute("class", "lblNonValid");
                lblvalidUrl.innerHTML = "Vous devez entrer un texte";
                $("#urlLiens").css("border-color", "red");
                urlValide = false;
             }else{
                 if(regex_StringTousCaracteres_OUI.test(urlLien)==false){       
                    lblvalidUrl.setAttribute("class", "lblNonValid");
                    lblvalidUrl.innerHTML = "Texte non-valide ";
                    $("#urlLiens").css("border-color", "red");
                    urlValide = false;
                 }else{           
                    lblvalidUrl.setAttribute("class", "lblValid");
                    lblvalidUrl.innerHTML = "Texte valide";
                    $("#urlLiens").css("border-color", "green");
                    urlValide = true;
                 }
             }
                 $(lblvalidUrl).insertAfter("#divTexteActu");
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
