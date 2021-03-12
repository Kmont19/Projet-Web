
let idEvenmt = "";
let EvenmtActif= "";
$(document).ready(function () {
    $("#menu").load("menu.html")
    $("#footer").load("footer.html")
    AjoutEvenememt();
    ModifierEvenememt();
    SupprimerEvenememt();
    AffichageEvenmt_Tous();
    RemplirFormEvnmt();
    ValidationChamps();
    Annuler();
  //  AffichageEvenmt_Titre();
   
   // PopoverLigne();

   
});


//TODO: VALIDATIONS DES ENTRÉES
function AjoutEvenememt(){

    $("#btnAjoutEvenement").unbind().click(function (e) {    
       e.preventDefault();

       let form_data = new FormData();
       let fichierImage = $('#imageEvenement').prop('files')[0];
       form_data.append('imageEvenement', fichierImage);


       form_data.append('action', 'Ajouter');
       form_data.append('titreEvenement', $("#titreEvenement").val());
       form_data.append('lieuEvenmt', $("#LieuEvenement").val());
       form_data.append('dateEvenement', $("#dateEvenement").val());
       form_data.append('hrDebutEvenmt', $("#hrDebutEvenement").val());
       form_data.append('texteEvenement', $("#texteEvenement").val());

       if(ValidationEvenemt()==true){
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/evenement_admin.php',
            method: 'POST',
            async: true,
            dataType: "json", 
            contentType: false,
            processData: false,
            data: form_data,               
            success: function (result, statusTxt, xhr) {
      
      
                ViderChampsFrm();
            },
            error: function(xhr, status, error) {
         
            },
            complete: function(xhr, status) {
            
            }
        });
        AffichageEvenmt_Tous();
        }
    });

}


function ModifierEvenememt(){

    $("#btnModifEvenement").unbind().click(function (e) {    
       e.preventDefault();

       let form_data = new FormData();
       let fichierImage = $('#imageEvenement').prop('files')[0];
       form_data.append('imageEvenement', fichierImage);

        //BUG: PROBLÈME AVEC LA MODIFICATION DES IMAGES.

       form_data.append('action', 'Modifier');
       form_data.append('idEvnmt', idEvenmt);
       form_data.append('titreEvenement', $("#titreEvenement").val());
       form_data.append('lieuEvenmt', $("#LieuEvenement").val());
       form_data.append('dateEvenement', $("#dateEvenement").val());
       form_data.append('hrDebutEvenmt', $("#hrDebutEvenement").val());
       form_data.append('texteEvenement', $("#texteEvenement").val());

       
       if(ValidationEvenemt()==true){
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/evenement_admin.php',
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
        AffichageEvenmt_Tous();
        }
    });

}

function SupprimerEvenememt(){

   
    let objActif= "";
    $("#btnSupprimerEvenement").unbind().click(function (e) {    
       e.preventDefault();

       $.ajax({
        url: 'ADMINISTRATION/ADMIN_PHP/evenement_admin.php',
        method: 'POST',
        async: true,
        data: { action: "infoActif",
                idEvnmt: idEvenmt},
        dataType: 'text',        
        success: function(result, status, xhr) {
            reqEvenmt = JSON.parse(result);   
            if(reqEvenmt[0].actif==0){
                objActif = "react";
            }else if(reqEvenmt[0].actif==1){
                objActif = "sup";        
            }

            let form_data = new FormData();
            form_data.append('action', 'Supprimer');
            form_data.append('idEvnmt', idEvenmt);
            form_data.append('actif', objActif);
    
            $.ajax({
                url: 'ADMINISTRATION/ADMIN_PHP/evenement_admin.php',
                method: 'POST',
                async: true,
                dataType: "json", 
                contentType: false,
                processData: false,
                data: form_data,               
                success: function (result, statusTxt, xhr) {
                    AffichageEvenmt_Tous();
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


function AffichageEvenmt_Tous(){
   
    EffacerTableau();
    var reqEvenmt = new Array();
    var evenement;  
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/evenement_admin.php',
            method: 'POST',
            async: true,
            data: { action: "listeEvenmtTous" },
            dataType: 'text',        
            success: function(result, status, xhr) {
                 reqEvenmt = JSON.parse(result);                               
                let tableEvenmt = document.getElementById("corpsTabEvenement");
               
                for (x in reqEvenmt) {
                    evenement = reqEvenmt[x];
                    let lgnTab = document.createElement("tr");
                    let colTitre = document.createElement("td");
                    let colDate = document.createElement("td");
                    let colAutre = document.createElement("td");
                    let idLgn = "idEvenmt_" + evenement.idEvenement;
                    lgnTab.setAttribute("id", idLgn);
                    lgnTab.setAttribute("class", "lgnTblEvenmt");
                    lgnTab.setAttribute("data-toggle", "modal");
                    lgnTab.setAttribute("data-target", "#adminFormEvenement"); 
                    colTitre.innerHTML = evenement.titreEvenement;
                    colDate.innerHTML = evenement.dateEvenement;
                    colAutre.innerHTML = "Autre";                  
                    lgnTab.appendChild(colTitre);
                    lgnTab.appendChild(colDate);
                    lgnTab.appendChild(colAutre);
                    if(evenement.actif==0){
                        lgnTab.setAttribute("style", "background-color:  #d9534f ;");
                    }
                    tableEvenmt.appendChild(lgnTab);                   
                }             
            },
            error: function(xhr, status, error) {
               
            },
            complete: function(xhr, status) {
               
            }         
            
        });

}



//TODO: FONCTIONS DE RECHERCHES
function AffichageEvenmt_Titre(){

    EffacerTableau();
    var reqEvenmt = new Array();
    var evenement;  
        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/evenement_admin.php',
            method: 'POST',
            async: true,
            data: { action: "listeEvenmtTitre" },
            dataType: 'text',        
            success: function(result, status, xhr) {
                reqEvenmt = JSON.parse(result);                               
                let tableEvenmt = document.getElementById("corpsTabEvenement");

                for (x in reqEvenmt) {
                    evenement = reqEvenmt[x];
                    let lgnTab = document.createElement("tr");
                    let colTitre = document.createElement("td");
                    let colDate = document.createElement("td");
                    let colAutre = document.createElement("td");
                    let idLgn = "idEvenmt_" + evenement.idEvenement;
                    lgnTab.setAttribute("id", idLgn);
                    lgnTab.setAttribute("class", "lgnTblEvenmt");
                    lgnTab.setAttribute("data-toggle", "modal");
                    lgnTab.setAttribute("data-target", "#adminFormEvenement"); 
                    colTitre.innerHTML = evenement.titreEvenement;
                    colDate.innerHTML = evenement.dateActu;
                    colAutre.innerHTML = "Autre";                  
                    lgnTab.appendChild(colTitre);
                    lgnTab.appendChild(colDate);
                    lgnTab.appendChild(colAutre);
                    if(evenement.actif==0){
                        lgnTab.setAttribute("style", "background-color:  #d9534f ;");
                    }
                    tableEvenmt.appendChild(lgnTab);
                }             
            },
            error: function(xhr, status, error) {
                alert("Erreur");
            },
            complete: function(xhr, status) {
            
            }
                    
        });


}

function EffacerTableau(){
    $("#corpsTabEvenement").empty();
    
}

function RemplirFormEvnmt(){

    $(document).on("click", ".lgnTblEvenmt", function() {
        idEvenmt =  $(this).attr("id");
        idEvenmt = idEvenmt.slice(idEvenmt.indexOf("_") + 1, idEvenmt.length);
    //    ModaleAjout();

        $.ajax({
            url: 'ADMINISTRATION/ADMIN_PHP/evenement_admin.php',
            method: 'POST',
            async: true,
            data: { action: "infoEvenement" ,
                    idEvnmt: idEvenmt},
            dataType: 'text',        
            success: function(result, status, xhr) {
                reqEvenmt = JSON.parse(result);

                $("#titreEvenement").val(reqEvenmt[0].titreEvenement);
                $("#LieuEvenement").val(reqEvenmt[0].lieuEvenement);
                $("#dateEvenement").val(reqEvenmt[0].dateEvenement);
                $("#hrDebutEvenement").val(reqEvenmt[0].heureDebutEvenmt);
                $("#texteEvenement").val(reqEvenmt[0].texteEvenement);
               /* var strUrl = reqEvenmt[0].photoEvenement;
                    strUrl = strUrl.replace(String.fromCharCode(92),String.fromCharCode(92,92));                   
                $("#lblImgEvent").text(strUrl.slice(strUrl.lastIndexOf("/") + 1, strUrl.length));*/

                if(reqEvenmt[0].actif==0){
                    $("#btnSupprimerActu").css("background-color", " #f0ad4e ");
                    $("#btnSupprimerActu").css("color", "black ");
                    $("#btnSupprimerActu").text("Réactiver");
                    EvenmtActif = false;
                }else{
                    $("#btnSupprimerActu").css("background-color", " #d9534f  ");
                    $("#btnSupprimerActu").css("color", "white ");
                    $("#btnSupprimerActu").text("Supprimer");
                    EvenmtActif = true;
                }
              
            },
            error: function(xhr, status, error) {
                alert("Erreur");
            },
            complete: function(xhr, status) {
            
            }     
        });
        $("#btnAjoutEvenement").hide();
        $("#btnModifEvenement").show();
        $("#btnSupprimerEvenement").show();
    });
}

function ModaleAjout(){
    
    $("#btnModifEvenement").hide();
    $("#btnSupprimerEvenement").hide();
    $("#btnAjoutEvenement").show();
         ViderChampsFrm();
    
}

function ViderChampsFrm(){
    $("#titreEvenement").val("");
    $("#dateEvenement").val("");
    $("#texteEvenement").val("");                 
    $("#lblImgEvent").text("");
    $("#LieuEvenement").val("");
    $("#hrDebutEvenement").val("");                 

}

function Annuler(){
   
    $("#btnAnnulerEvenement").click(function (e) { 
        e.preventDefault();
        ViderChampsFrm();

        $("#lblTitre").remove();
        $("#lblLieu").remove();
        $("#lblTexte").remove();
        $("#lblDate").remove();
        $("#lblhrFin").remove();

        $("#titreEvenement").css("border-color", "initial");
        $("#LieuEvenement").css("border-color", "initial");
        $("#dateEvenement").css("border-color", "initial");
        $("#texteEvenement").css("border-color", "initial");
        $("#hrDebutEvenement").css("border-color", "initial");
    
    });
}

function PopoverLigne(){

    
  /*  $(".lgnTblEvenmt").hover(function () {

       // idEvenmt =  $(this).attr("id");
            alert("hover");
        }, function () {
            alert("hover");
        }
    );*/
       // return idEvenmt;

      
   
    
}


function IdEvenmtTableau(){

    let idEvenmt = "";
    $(".lgnTblEvenmt").hover(function () {

        idEvenmt =  $(this).attr("id");
            alert("hover");
        }, function () {
            // out
        }
    );

}

function ValidationEvenemt(){

    let titreValide = false;
    let lieuValide = false;
    let dateValide = false;
    let hrDebutValide = false;
    let hrFinValide = false;
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


            var titreEvenmt =   $("#titreEvenement").val();
            var lblvalidTitre = document.createElement("p");
            lblvalidTitre.setAttribute("id", "lblTitre");
                if(regex_Vide_OUI.test(titreEvenmt)==true){
                    lblvalidTitre.setAttribute("class", "lblNonValid");
                    lblvalidTitre.innerHTML = "Vous devez entrer un titre";
                    $("#titreEvenement").css("border-color", "red");
                    titreValide = false;
                }else{
                    if(regex_StringTousCaracteres_OUI.test(titreEvenmt)==false){       
                        lblvalidTitre.setAttribute("class", "lblNonValid");
                        lblvalidTitre.innerHTML = "Titre non-valide ";
                        $("#titreEvenement").css("border-color", "red");
                        titreValide = false;
                    }else{           
                        lblvalidTitre.setAttribute("class", "lblValid");
                        lblvalidTitre.innerHTML = "Titre valide";
                        $("#titreEvenement").css("border-color", "green");
                        titreValide = true;
                    }
                }
                    $(lblvalidTitre).insertAfter("#divTitreEvent");


            var lieuEvenmt =   $("#LieuEvenement").val();
            var lblvalidLieu = document.createElement("p");
            lblvalidLieu.setAttribute("id", "lblLieu");
             if(regex_Vide_OUI.test(lieuEvenmt)==true){
                lblvalidLieu.setAttribute("class", "lblNonValid");
                lblvalidLieu.innerHTML = "Vous devez entrer un lieu";
                 $("#LieuEvenement").css("border-color", "red");
                 lieuValide = false;
             }else{
                 if(regex_StringTousCaracteres_OUI.test(lieuEvenmt)==false){       
                    lblvalidLieu.setAttribute("class", "lblNonValid");
                    lblvalidLieu.innerHTML = "Titre non-valide ";
                     $("#LieuEvenement").css("border-color", "red");
                     lieuValide = false;
                 }else{           
                    lblvalidLieu.setAttribute("class", "lblValid");
                    lblvalidLieu.innerHTML = "Titre valide";
                     $("#LieuEvenement").css("border-color", "green");
                     lieuValide = true;
                 }
             }
                 $(lblvalidLieu).insertAfter("#divLieuEvent");



            var texteEvenmt =   $("#texteEvenement").val();      
            var lblvalidTexte = document.createElement("p");
            lblvalidTexte.setAttribute("id", "lblTexte");
             if(regex_Vide_OUI.test(texteEvenmt)==true){
                lblvalidTexte.setAttribute("class", "lblNonValid");
                lblvalidTexte.innerHTML = "Vous devez entrer un texte";
                $("#texteEvenement").css("border-color", "red");
                texteValide = false;
             }else{
                 if(regex_StringTousCaracteres_OUI.test(texteEvenmt)==false){       
                    lblvalidTexte.setAttribute("class", "lblNonValid");
                    lblvalidTexte.innerHTML = "Texte non-valide ";
                    $("#texteEvenement").css("border-color", "red");
                    texteValide = false;
                 }else{           
                    lblvalidTexte.setAttribute("class", "lblValid");
                    lblvalidTexte.innerHTML = "Texte valide";
                    $("#texteEvenement").css("border-color", "green");
                    texteValide = true;
                 }
             }
                 $(lblvalidTexte).insertAfter("#divTexteEvent");


            var dateEvenmt =   $("#dateEvenement").val();    
            var lblvalidDate = document.createElement("p");
            lblvalidDate.setAttribute("id", "lblDate");
            if(regex_Vide_OUI.test(dateEvenmt)==true){
                lblvalidDate.setAttribute("class", "lblNonValid");
                lblvalidDate.innerHTML = "Vous devez entrer une date";
                $("#dateEvenement").css("border-color", "red");
                dateValide = false;
            }else{
                if(regex_Date_Int_OUI.test(dateEvenmt)==false){       
                    lblvalidDate.setAttribute("class", "lblNonValid");
                    lblvalidDate.innerHTML = "Date non-valide ";
                    $("#dateEvenement").css("border-color", "red");
                    dateValide = false;
                }else{           
    
                    let dateJour = new Date();
                    let dateFuture = new Date("01 Jan 2070");
                    let dateUser = new Date(dateEvenmt);
                
                    if((dateUser < dateJour) || (dateFuture < dateUser)){
                        lblvalidDate.setAttribute("class", "lblNonValid");
                        lblvalidDate.innerHTML = "Date non-valide ";
                        dateValide = false;
                    }else{
                        lblvalidDate.setAttribute("class", "lblValid");
                        lblvalidDate.innerHTML = "Date valide";
                        $("#dateEvenement").css("border-color", "green");
                        dateValide = true;
                    }
                }
            }
                $(lblvalidDate).insertAfter("#divDateEvent");


                     

            var hrDebutEvenmt =   $("#hrDebutEvenement").val();
            var lblvalidhrDebut = document.createElement("p");
            lblvalidhrDebut.setAttribute("id", "lblhrDebut");
            if(regex_Vide_OUI.test(hrDebutEvenmt)==true){
            lblvalidhrDebut.setAttribute("class", "lblNonValid");
            lblvalidhrDebut.innerHTML = "Vous devez entrer une heure de début";
                $("#hrDebutEvenement").css("border-color", "red");
                hrDebutValide = false;
            }else{
                if(regex_StringTousCaracteres_OUI.test(hrDebutEvenmt)==false){       
                lblvalidhrDebut.setAttribute("class", "lblNonValid");
                lblvalidhrDebut.innerHTML = "Titre non-valide ";
                    $("#hrDebutEvenement").css("border-color", "red");
                    hrDebutValide = false;
                }else{           
                lblvalidhrDebut.setAttribute("class", "lblValid");
                lblvalidhrDebut.innerHTML = "Titre valide";
                    $("#hrDebutEvenement").css("border-color", "green");
                    hrDebutValide = true;
                }
            }
                    $(lblvalidhrDebut).insertAfter("#divDateEvent");



           

        if((titreValide==true)
            &&(lieuValide==true)
                &&(texteValide==true)
                    &&(dateValide==true)
                        &&(hrDebutValide==true)){
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

    $("#titreEvenement").focus(function (e) { 
        e.preventDefault();
        $("#lblTitre").remove();
        $("#titreEvenement").css("border-color", "initial")
    });
    $("#LieuEvenement").focus(function (e) { 
        e.preventDefault();
        $("#lblLieu").remove();
        $("#LieuEvenement").css("border-color", "initial")
    });
    $("#texteEvenement").focus(function (e) { 
        e.preventDefault();
        $("#lblTexte").remove();
    });
    $("#dateEvenement").focus(function (e) { 
        e.preventDefault();
        $("#lblDate").remove();
    });
    $("#hrDebutEvenement").focus(function (e) { 
        e.preventDefault();
        $("#lblhrDebut").remove();
    });
   


   $("#titreEvenement").blur(function (e) { 
    e.preventDefault();
    var titreEvenmt =   $("#titreEvenement").val();
    var lblvalidTitre = document.createElement("p");
    lblvalidTitre.setAttribute("id", "lblTitre");
    if(regex_Vide_OUI.test(titreEvenmt)==true){
        lblvalidTitre.setAttribute("class", "lblNonValid");
        lblvalidTitre.innerHTML = "Vous devez entrer un titre";
        $("#titreEvenement").css("border-color", "red");
        
    }else{
        if(regex_StringTousCaracteres_OUI.test(titreEvenmt)==false){       
            lblvalidTitre.setAttribute("class", "lblNonValid");
            lblvalidTitre.innerHTML = "Titre non-valide ";
            $("#titreEvenement").css("border-color", "red");
            
        }else{           
            lblvalidTitre.setAttribute("class", "lblValid");
            lblvalidTitre.innerHTML = "Titre valide";
            $("#titreEvenement").css("border-color", "green");
            
        }
    }
        $(lblvalidTitre).insertAfter("#divTitreEvent");
   });

   $("#LieuEvenement").blur(function (e) { 
    e.preventDefault();
    var lieuEvenmt =   $("#LieuEvenement").val();
    var lblvalidLieu = document.createElement("p");
    lblvalidLieu.setAttribute("id", "lblLieu");
     if(regex_Vide_OUI.test(lieuEvenmt)==true){
        lblvalidLieu.setAttribute("class", "lblNonValid");
        lblvalidLieu.innerHTML = "Vous devez entrer un lieu";
         $("#LieuEvenement").css("border-color", "red");
         lieuValide = false;
     }else{
         if(regex_StringTousCaracteres_OUI.test(lieuEvenmt)==false){       
            lblvalidLieu.setAttribute("class", "lblNonValid");
            lblvalidLieu.innerHTML = "Titre non-valide ";
             $("#LieuEvenement").css("border-color", "red");
             lieuValide = false;
         }else{           
            lblvalidLieu.setAttribute("class", "lblValid");
            lblvalidLieu.innerHTML = "Titre valide";
             $("#LieuEvenement").css("border-color", "green");
             lieuValide = true;
         }
     }
         $(lblvalidLieu).insertAfter("#divLieuEvent");
    });
       

   $("#texteEvenement").blur(function (e) { 
    e.preventDefault();
    var texteEvenmt =   $("#texteEvenement").val();      
    var lblvalidTexte = document.createElement("p");
    lblvalidTexte.setAttribute("id", "lblTexte");
     if(regex_Vide_OUI.test(texteEvenmt)==true){
        lblvalidTexte.setAttribute("class", "lblNonValid");
        lblvalidTexte.innerHTML = "Vous devez entrer un texte";
        $("#texteEvenement").css("border-color", "red");
        
     }else{
         if(regex_StringTousCaracteres_OUI.test(texteEvenmt)==false){       
            lblvalidTexte.setAttribute("class", "lblNonValid");
            lblvalidTexte.innerHTML = "Texte non-valide ";
            $("#texteEvenement").css("border-color", "red");
           
         }else{           
            lblvalidTexte.setAttribute("class", "lblValid");
            lblvalidTexte.innerHTML = "Texte valide";
            $("#texteEvenement").css("border-color", "green");
            
         }
    }
         $(lblvalidTexte).insertAfter("#divTexteEvent");
    });


    $("#dateEvenement").blur(function (e) { 
    e.preventDefault();
    var dateEvenmt =   $("#dateEvenement").val();    
    var lblvalidDate = document.createElement("p");
    lblvalidDate.setAttribute("id", "lblDate");
    if(regex_Vide_OUI.test(dateEvenmt)==true){
        lblvalidDate.setAttribute("class", "lblNonValid");
        lblvalidDate.innerHTML = "Vous devez entrer une date";
        $("#dateEvenement").css("border-color", "red");
        
    }else{
        if(regex_Date_Int_OUI.test(dateEvenmt)==false){       
            lblvalidDate.setAttribute("class", "lblNonValid");
            lblvalidDate.innerHTML = "Date non-valide ";
            $("#dateEvenement").css("border-color", "red");
            
        }else{           

            let dateJour = new Date();
            let dateFuture = new Date("01 Jan 2070");
            let dateUser = new Date(dateEvenmt);
        
            if((dateUser < dateJour) || (dateFuture < dateUser)){
                lblvalidDate.setAttribute("class", "lblNonValid");
                lblvalidDate.innerHTML = "Date non-valide ";
                
            }else{
                lblvalidDate.setAttribute("class", "lblValid");
                lblvalidDate.innerHTML = "Date valide";
                $("#dateEvenement").css("border-color", "green");
                
            }
        }
    }
        $(lblvalidDate).insertAfter("#divDateEvent");
    });


    $("#hrDebutEvenement").blur(function (e) { 
    e.preventDefault();
    var hrDebutEvenmt =   $("#hrDebutEvenement").val();
    var lblvalidhrDebut = document.createElement("p");
    lblvalidhrDebut.setAttribute("id", "lblhrDebut");
    if(regex_Vide_OUI.test(hrDebutEvenmt)==true){
    lblvalidhrDebut.setAttribute("class", "lblNonValid");
    lblvalidhrDebut.innerHTML = "Vous devez entrer un lieu";
        $("#hrDebutEvenement").css("border-color", "red");
        hrDebutValide = false;
    }else{
        if(regex_StringTousCaracteres_OUI.test(hrDebutEvenmt)==false){       
        lblvalidhrDebut.setAttribute("class", "lblNonValid");
        lblvalidhrDebut.innerHTML = "Titre non-valide ";
            $("#hrDebutEvenement").css("border-color", "red");
            hrDebutValide = false;
        }else{           
        lblvalidhrDebut.setAttribute("class", "lblValid");
        lblvalidhrDebut.innerHTML = "Titre valide";
            $("#hrDebutEvenement").css("border-color", "green");
            hrDebutValide = true;
        }
    }
        $(lblvalidhrDebut).insertAfter("#divDateEvent");

});


   




}