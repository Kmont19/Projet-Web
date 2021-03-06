

let idActu = "";
let ActuActif= "";
$(document).ready(function () {
    $("#menu").load("menu.html")
    $("#footer").load("footer.html")
    AjoutActualite();
    ModifierActualite();
    SupprimerActualite();
    AffichageActu_Tous();
    IdActuTableau();
    RemplirFormActu();
    ValidationChamps();
    AnnulerEvent();
});

//TODO: VALIDATIONS DES ENTRÉES
function AjoutActualite(){

    $("#btnAjoutActu").unbind().click(function (e) {    
       e.preventDefault();

      
        let form_data = new FormData();
        let fichierImage = $('#imageActu').prop('files')[0];
        form_data.append('imageActu', fichierImage);
        form_data.append('action', 'Ajouter');
        form_data.append('titreActu', $("#titreActu").val());
        form_data.append('dateActu', $("#dateActu").val());
        form_data.append('texteActu', $("#texteActu").val());

        if(ValidationActu()==true){
            $.ajax({
                url: 'ADMINISTRATION/ADMIN_PHP/actualite_admin.php',
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
        AffichageActu_Tous();
        }
    });
    
}


//TODO: VALIDATIONS DES ENTRÉES
function ModifierActualite(){
    
    $("#btnModifActu").unbind().click(function (e) {    
       e.preventDefault();

       let form_data = new FormData();
       let fichierImage = $('#imageActu').prop('files')[0];
       form_data.append('imageActu', fichierImage);

       form_data.append('action', 'Modifier');
       form_data.append('idActu', idActu);
       form_data.append('titreActu', $("#titreActu").val());
       form_data.append('dateActu', $("#dateActu").val());
       form_data.append('texteActu', $("#texteActu").val());

        //BUG: PROBLÈME AVEC LA MODIFICATION DES IMAGES.

        if(ValidationActu()==true){
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/actualite_admin.php',
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
        AffichageActu_Tous();
    }
       
    });
    
}




function SupprimerActualite(){

    let objActif= "";
    $("#btnSupprimerActu").unbind().click(function (e) {    
       e.preventDefault();
    
    $.ajax({
        url: 'ADMINISTRATION/ADMIN_PHP/actualite_admin.php',
        method: 'POST',
        async: true,
        data: { action: "infoActif",
                idActu: idActu},
        dataType: 'text',        
        success: function(result, status, xhr) {
            reqActu = JSON.parse(result);    
            if(reqActu[0].actif==0){
                objActif = "react";
            }else if(reqActu[0].actif==1){
                objActif = "sup";        
            }

            let form_data = new FormData();
            form_data.append('action', 'Supprimer');
            form_data.append('idActu', idActu);
            form_data.append('actif', objActif);
    
            $.ajax({
                url: 'ADMINISTRATION/ADMIN_PHP/actualite_admin.php',
                method: 'POST',
                async: true,
                dataType: "json", 
                contentType: false,
                processData: false,
                data: form_data,               
                success: function (result, statusTxt, xhr) {
                    AffichageActu_Tous();
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




function AffichageActu_Tous(){
    EffacerTableau();
    var reqActu = new Array();
    var actualite;  
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/actualite_admin.php',
            method: 'POST',
            async: true,
            data: { action: "listeActuTous" },
            dataType: 'text',        
            success: function(result, status, xhr) {
                reqActu = JSON.parse(result);                               
                let tableActu = document.getElementById("corpsTabActu");

                for (x in reqActu) {
                    actualite = reqActu[x];
                    let lgnTab = document.createElement("tr");
                    let colTitre = document.createElement("td");
                    let colDate = document.createElement("td");
                    let idLgn = "idActu_" + actualite.idActualite;
                    lgnTab.setAttribute("id", idLgn);
                    lgnTab.setAttribute("class", "lgnTblActu");
                    lgnTab.setAttribute("data-toggle", "modal");
                    lgnTab.setAttribute("data-target", "#adminFormActu");
                    lgnTab.setAttribute("onclick", "Annuler()");
                    colTitre.innerHTML = actualite.titreActu;
                    colDate.innerHTML = actualite.dateActu;                
                    lgnTab.appendChild(colTitre);
                    lgnTab.appendChild(colDate);
                    if(actualite.actif==0){
                        lgnTab.setAttribute("style", "background-color:  #d9534f ;");
                    }
                    tableActu.appendChild(lgnTab);                   
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
            url: 'ADMINISTRATION/ADMIN_PHP/actualite_admin.php',
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
                    let idLgn = "idActu_" + actualite.idActualite;
                    lgnTab.setAttribute("id", idLgn);
                    lgnTab.setAttribute("class", "lgnTblActu");
                    lgnTab.setAttribute("data-toggle", "modal");
                    lgnTab.setAttribute("data-target", "#adminFormActu");
                    colTitre.innerHTML = actualite.titreActu;
                    colDate.innerHTML = actualite.dateActu;                
                    lgnTab.appendChild(colTitre);
                    lgnTab.appendChild(colDate);
                    tableActu.appendChild(lgnTab);                   
                }              
            },
            error: function(xhr, status, error) {
                alert("Erreur");
            },         
        });


}


function EffacerTableau(){
    $("#corpsTabActu").empty();
    
}

function RemplirFormActu(){

    $(document).on("click", ".lgnTblActu", function() {
        idActu =  $(this).attr("id");
        idActu = idActu.slice(idActu.indexOf("_") + 1, idActu.length);
        Annuler();

        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/actualite_admin.php',
            method: 'POST',
            async: true,
            data: { action: "infoActualite" ,
                    idActu: idActu},
            dataType: 'text',        
            success: function(result, status, xhr) {
                reqActu = JSON.parse(result);

                $("#titreActu").val(reqActu[0].titreActu);
                $("#dateActu").val(reqActu[0].dateActu);
                $("#texteActu").val(reqActu[0].texteActu);
                var strUrl = reqActu[0].photoActu;
                    strUrl = strUrl.replace(String.fromCharCode(92),String.fromCharCode(92,92));                
                $("#lblImgActu").text(strUrl.slice(strUrl.lastIndexOf("/") + 1, strUrl.length));
                if(reqActu[0].actif==0){
                    $("#btnSupprimerActu").css("background-color", " #f0ad4e ");
                    $("#btnSupprimerActu").css("color", "black ");
                    $("#btnSupprimerActu").text("Réactiver");
                    ActuActif = false;
                }else{
                    $("#btnSupprimerActu").css("background-color", " #d9534f  ");
                    $("#btnSupprimerActu").css("color", "white ");
                    $("#btnSupprimerActu").text("Supprimer");
                    ActuActif = true;
                }
            },
            error: function(xhr, status, error) {
                alert("Erreur");
            },
            complete: function(xhr, status) {
            
            }     
        });
        $("#btnAjoutActu").hide();
        $("#btnModifActu").show();
        $("#btnSupprimerActu").show();
       
    });
}


function ModaleAjout(){
    
    $("#btnModifActu").hide();
    $("#btnSupprimerActu").hide();
    $("#btnAjoutActu").show();
    ViderChampsFrm();
    Annuler();
}

function ViderChampsFrm(){
    $("#titreActu").val("");
    $("#dateActu").val("");
    $("#texteActu").val("");                 
    $("#lgnTblActu").text("");
}

function Annuler(){
   
        
        ViderChampsFrm();

        $("#lblTitre").remove();
        $("#lblTexte").remove();
        $("#lblDate").remove();

        $("#titreActu").css("border-color", "initial");
        $("#dateActu").css("border-color", "initial");
        $("#texteActu").css("border-color", "initial");
        $("#divTitreActu").css("margin-bottom", "1rem");
        $("#divTexteActu").css("margin-bottom", "1rem");
        $("#divDateActu").css("margin-bottom", "1rem");
    

    
}


function AnnulerEvent(){
   
    $("#btnAnnulerActu").click(function (e) { 
        e.preventDefault();
        Annuler();   
    });
    $("#BtnModalAjoutActu").click(function (e) { 
        e.preventDefault();
        Annuler();   
    });
    
}


function IdActuTableau(){

    let idActu = "";
    $(".lgnTblActu").hover(function () {

         idActu =  $(this).attr("id");
            alert("hover");
        }, function () {
            // out
        }
    );

}



function ValidationActu(){

    let titreValide = false;
    let dateValide = false;
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


    var titreActu =   $("#titreActu").val();    
        if(regex_Vide_OUI.test(titreActu)==true){
            titreValide = false;
        }else{
            if(regex_StringTousCaracteres_OUI.test(titreActu)==false){       
                titreValide = false;
            }else{           
                titreValide = true;
            }
        }

            var texteActu =   $("#texteActu").val();      
             if(regex_Vide_OUI.test(texteActu)==true){             
                texteValide = false;
             }else{
                 if(regex_StringTousCaracteres_OUI.test(texteActu)==false){                     
                    texteValide = false;
                 }else{           
                    texteValide = true;
                 }
             }

                 var dateActu =   $("#dateActu").val();    
                 if(regex_Vide_OUI.test(dateActu)==true){
                     dateValide = false;
                 }else{
                     if(regex_Date_Int_OUI.test(dateActu)==false){                      
                         dateValide = false;
                     }else{           
                         let dateJour = new Date();
                         let dateFuture = new Date("01 Jan 2070");
                         let dateUser = new Date(dateActu);
                         if((dateUser < dateJour) || (dateFuture < dateUser)){
                             dateValide = false;
                         }else{                         
                             dateValide = true;
                         }
                     }
                 }


        if((titreValide==true)&&(texteValide==true)&&(dateValide==true)){
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

    $("#titreActu").focus(function (e) { 
        e.preventDefault();
        $("#lblTitre").remove();
        $("#titreActu").css("border-color", "initial");
        $("#divTitreActu").css("margin-bottom", "1rem");
    });
    $("#texteActu").focus(function (e) { 
        e.preventDefault();
        $("#lblTexte").remove();
        $("#titreActu").css("border-color", "initial");
        $("#divTexteActu").css("margin-bottom", "1rem");
    });
    $("#dateActu").focus(function (e) { 
        e.preventDefault();
        $("#lblDate").remove();
        $("#titreActu").css("border-color", "initial");
        $("#divDateActu").css("margin-bottom", "1rem");
    });


   $("#titreActu").blur(function (e) { 
       e.preventDefault();
       var titreActu =   $("#titreActu").val();
       var lblvalidTitre = document.createElement("p");
       lblvalidTitre.setAttribute("id", "lblTitre");
        if(regex_Vide_OUI.test(titreActu)==true){
            lblvalidTitre.setAttribute("class", "lblNonValid");
            lblvalidTitre.innerHTML = "Vous devez entrer un titre";
            $("#titreActu").css("border-color", "red");
            $("#lblTitre").css("color", "red");
           
        }else{
            if(regex_StringTousCaracteres_OUI.test(titreActu)==false){       
                lblvalidTitre.setAttribute("class", "lblNonValid");
                lblvalidTitre.innerHTML = "Titre non-valide ";
                $("#titreActu").css("border-color", "red");
                $("#lblTitre").css("color", "red");
                
            }else{           
                lblvalidTitre.setAttribute("class", "lblValid");
                lblvalidTitre.innerHTML = "Titre valide";
                $("#titreActu").css("border-color", "green");
                $("#lblTitre").css("color", "green");
                
            }
        }
            $(lblvalidTitre).insertAfter("#divTitreActu");
            $("#divTitreActu").css("margin-bottom", "0rem");
   });
       

   $("#texteActu").blur(function (e) { 
    e.preventDefault();
    var texteActu =   $("#texteActu").val();      
    var lblvalidTexte = document.createElement("p");
    lblvalidTexte.setAttribute("id", "lblTexte");
     if(regex_Vide_OUI.test(texteActu)==true){
        lblvalidTexte.setAttribute("class", "lblNonValid");
        lblvalidTexte.innerHTML = "Vous devez entrer un texte";
        $("#texteActu").css("border-color", "red");
        $("#lblTexte").css("color", "red");
        
     }else{
         if(regex_StringTousCaracteres_OUI.test(texteActu)==false){       
            lblvalidTexte.setAttribute("class", "lblNonValid");
            lblvalidTexte.innerHTML = "Texte non-valide ";
            $("#texteActu").css("border-color", "red");
            $("#lblTexte").css("color", "red");
           
         }else{           
            lblvalidTexte.setAttribute("class", "lblValid");
            lblvalidTexte.innerHTML = "Texte valide";
            $("#texteActu").css("border-color", "green");
            $("#lblTexte").css("color", "green");
            
         }
     }
         $(lblvalidTexte).insertAfter("#divTexteActu");
         $("#divTexteActu").css("margin-bottom", "0rem");
    });


    $("#dateActu").blur(function (e) { 
        e.preventDefault();
        var dateActu =   $("#dateActu").val();    
        var lblvalidDate = document.createElement("p");
        lblvalidDate.setAttribute("id", "lblDate");
        if(regex_Vide_OUI.test(dateActu)==true){
            lblvalidDate.setAttribute("class", "lblNonValid");
            lblvalidDate.innerHTML = "Vous devez entrer une date";
            $("#dateActu").css("border-color", "red");
            $("#lblDate").css("color", "red");            
        }else{
            if(regex_Date_Int_OUI.test(dateActu)==false){       
                lblvalidDate.setAttribute("class", "lblNonValid");
                lblvalidDate.innerHTML = "Date non-valide ";
                $("#dateActu").css("border-color", "red");
                $("#lblDate").css("color", "red");
            }else{           
                let dateJour = new Date();
                let dateFuture = new Date("01 Jan 2070");
                let dateUser = new Date(dateActu);          
                if((dateUser < dateJour) || (dateFuture < dateUser)){
                    lblvalidDate.setAttribute("class", "lblNonValid");
                    lblvalidDate.innerHTML = "Date non-valide ";
                   
                }else{
                    lblvalidDate.setAttribute("class", "lblValid");
                    lblvalidDate.innerHTML = "Date valide";
                    $("#dateActu").css("border-color", "green");
                    $("#lblDate").css("color", "red");
                }
            }
        }
            $(lblvalidDate).insertAfter("#divDateActu");
            $("#divDateActu").css("margin-bottom", "0rem");
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
