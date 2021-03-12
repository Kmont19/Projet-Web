

<?php

include("../ADMIN_PHP/FONCTIONS PHP/Fonctions_Gest_InputUser.php");
include("../ADMIN_PHP/FONCTIONS PHP/connexion.php");
include("../ADMIN_PHP/FONCTIONS PHP/Regex.php");


$titreEvenmt = "";
$lieuEvenmt = "";
$dateEvenmt = "";
$hrDebutEvenmt = "";
$texteEvenmt = "";

$dossierTlcg = "";
$dossier_cible = "";
$TelOk = "";
$fichierImgType = "";
$urlPhoto ="";




if (($_SERVER["REQUEST_METHOD"] == "POST")
    &&!( $_POST["action"]=="listeEvenmtTous") 
        &&!( $_POST["action"]=="infoEvenement") 
            &&!( $_POST["action"]=="infoActif")){

    

    $RETOUR_ENTRE = array();

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["titreEvenement"]), $regex_StringTousCaracteres_OUI, "string");
    $titreEvenmt = $RETOUR_ENTRE["Valeur"];

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["lieuEvenmt"]), $regex_StringTousCaracteres_OUI, "string");
    $lieuEvenmt = $RETOUR_ENTRE["Valeur"];

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["dateEvenement"]), $regex_StringTousCaracteres_OUI, "string");
    $dateEvenmt = $RETOUR_ENTRE["Valeur"];
    
    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["hrDebutEvenmt"]), $regex_StringTousCaracteres_OUI, "string");
    $hrDebutEvenmt = $RETOUR_ENTRE["Valeur"];
    
    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["texteEvenement"]), $regex_StringTousCaracteres_OUI, "string");
    $texteEvenmt = $RETOUR_ENTRE["Valeur"];

}






//echo var_dump($_POST);

if(!( $_POST["action"]=="listeEvenmtTous") &&!( $_POST["action"]=="infoEvenement") &&!( $_POST["action"]=="infoActif")){


    if($_FILES['imageEvenement']['tmp_name'] == "" || $_FILES['imageEvenement']['size'] == 0){
        $urlPhoto = "NULL";
    }
    else{
        $urlPhoto = TelechargerPhoto();
    }
  
    if ( $_POST["action"]=="Ajouter"){

        echo "action Ajouter";
        try{
            $PDO1 ="";
            $PDO1 = CONNEXION_BD();    
            $PDO1->beginTransaction();   
            $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $reqInsert = $PDO1->prepare("INSERT INTO evenement(titreEvenement,
                                                                lieuEvenement,
                                                                dateEvenement,                                                              
                                                                heureEvenement,
                                                                texteEvenement,
                                                                photoEvenement
                                                                )
                                                        VALUES (:titreEvenement,
                                                                :lieuEvenement,
                                                                :dateEvenement,
                                                                :heureEvenement,
                                                                :texteEvenement,
                                                                :photoEvenement
                                                                )");


            $reqInsert->bindParam(":titreEvenement", $titreEvenmt);
            $reqInsert->bindParam(":lieuEvenement", $lieuEvenmt);
            $reqInsert->bindParam(":dateEvenement", $dateEvenmt);
            $reqInsert->bindParam(":heureEvenement", $hrDebutEvenmt);
            $reqInsert->bindParam(":texteEvenement", $texteEvenmt);
            $reqInsert->bindParam(":photoEvenement", $urlPhoto);
            $reqInsert->execute();

             echo "ok, fin insert";                                                   

        }
        catch(PDOException $e){
            $PDO1->rollBack();
            echo '<br><br><b>ERREUR!!!<br>Échec insertion.<br></b>';
            echo $e->getMessage();
            echo '<br><br><br><br>';
        }
        $PDO1->commit();
        $PDO1=null;

    }


    if ( $_POST["action"]=="Modifier"){

      //  echo "action Modifier";

        try{
            $PDO1 ="";
            $PDO1 = CONNEXION_BD();    
            $PDO1->beginTransaction();   
            $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $reqInsert = $PDO1->prepare("UPDATE evenement SET titreEvenement = :titreEvenement,
                                                                    lieuEvenement = :lieuEvenement,
                                                                    dateEvenement = :dateEvenement,
                                                                    heureEvenement = :heureEvenement,
                                                                    texteEvenement= :texteEvenement,
                                                                    photoEvenement = :photoEvenement                                                      
                                    WHERE idEvenement = ". $_POST["idEvnmt"]);

            $reqInsert->bindParam(":titreEvenement", $titreEvenmt);
            $reqInsert->bindParam(":lieuEvenement", $lieuEvenmt);
            $reqInsert->bindParam(":dateEvenement", $dateEvenmt);
            $reqInsert->bindParam(":heureEvenement", $hrDebutEvenmt);
            $reqInsert->bindParam(":texteEvenement", $texteEvenmt);
            $reqInsert->bindParam(":photoEvenement", $urlPhoto);
            $reqInsert->execute();



        }
        catch(PDOException $e){
            $PDO1->rollBack();
            echo '<br><br><b>ERREUR!!!<br>Échec insertion.<br></b>';
            echo $e->getMessage();
            echo '<br><br><br><br>';
        }
        $PDO1->commit();
        $PDO1=null;

    }

    if ( $_POST["action"]=="Supprimer"){

      //  echo "action Supprimmer";

        try{
            $PDO1 ="";
            $PDO1 = CONNEXION_BD();    
            $PDO1->beginTransaction();   
            $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $reqInsert = $PDO1->prepare("UPDATE evenement SET actif = :actif                                              
                                    WHERE idEvenement = ". $_POST["idEvnmt"]);

            if($_POST["actif"]=="sup"){                    
                $supprimer = 0;
            }elseif ($_POST["actif"]=="react") {
                $supprimer = 1;
            }
            $reqInsert->bindParam(":actif", $supprimer);
            $reqInsert->execute();



        }
        catch(PDOException $e){
            $PDO1->rollBack();
            echo '<br><br><b>ERREUR!!!<br>Échec insertion.<br></b>';
            echo $e->getMessage();
            echo '<br><br><br><br>';
        }
        $PDO1->commit();
        $PDO1=null;

    }


   


}
    else{


        if ( $_POST["action"]=="listeEvenmtTous"){

            // echo "action listeEvenmtTous";
         
             try{
                $PDO1 ="";
                $PDO1 = CONNEXION_BD();    
                $PDO1->beginTransaction();   
                $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
                $resultReq = array();
        
                $reqActualite = "SELECT idEvenement,
                                        titreEvenement,
                                        dateEvenement,
                                        heureEvenement, 
                                        actif
                                FROM evenement";
        
                $execReq = $PDO1->query($reqActualite);
                $resultReq = $execReq->fetchAll(PDO::FETCH_ASSOC);
                 
                $objResult = json_encode($resultReq);              
                echo $objResult;
         
         
             }
             catch(Exception $e){
                 echo '<br><br><b>ERREUR!!!<br>Échec lecture des données.<br></b>';
                 echo $e->getMessage();
                 echo '<br><br><br><br>';
                 }
                 $PDO1->commit();
                 $PDO1=null;
         }




         if ( $_POST["action"]=="listeEvenmtTitre"){

            // echo "action ReqListe";
         
             try{
                 $PDO1 ="";
                 $PDO1 = CONNEXION_BD();    
                 $PDO1->beginTransaction();   
                 $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         
                 $resultReq = array();
         
                 $reqActualite = "SELECT idEvenement,
                                         titreEvenement,
                                         dateEvenement
                                 FROM evenement";
         
                 $execReq = $PDO1->query($reqActualite);
                 $resultReq = $execReq->fetchAll(PDO::FETCH_ASSOC);
                 
                 $objResult = json_encode($resultReq);
                 
                 echo $objResult;
         
         
             }
             catch(Exception $e){
                 echo '<br><br><b>ERREUR!!!<br>Échec lecture des données.<br></b>';
                 echo $e->getMessage();
                 echo '<br><br><br><br>';
                 }
                 $PDO1->commit();
                 $PDO1=null;
         }

         if ( $_POST["action"]=="infoEvenement"){
       
             try{
                 $PDO1 ="";
                 $PDO1 = CONNEXION_BD();    
                 $PDO1->beginTransaction();   
                 $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         
                 $resultReq = array();
         
                 $reqActualite = "SELECT idEvenement,
                                        titreEvenement,
                                        lieuEvenement,
                                        dateEvenement,                                                              
                                        heureEvenement,
                                        texteEvenement,
                                        photoEvenement
                                FROM evenement
                                WHERE idEvenement = ". $_POST["idEvnmt"];
         
                 $execReq = $PDO1->query($reqActualite);
                 $resultReq = $execReq->fetchAll(PDO::FETCH_ASSOC);
                 
                 $objResult = json_encode($resultReq);
                 
                 echo $objResult;
         
         
             }
             catch(Exception $e){
                 echo '<br><br><b>ERREUR!!!<br>Échec lecture des données.<br></b>';
                 echo $e->getMessage();
                 echo '<br><br><br><br>';
                 }
                 $PDO1->commit();
                 $PDO1=null;
         }

         if ( $_POST["action"]=="infoActif"){
      
          //  echo "infoActif";
            try{
                $PDO1 ="";
                $PDO1 = CONNEXION_BD();    
                $PDO1->beginTransaction();   
                $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
                $resultReq = array();
        
                $reqActualite = "SELECT actif
                               FROM evenement
                               WHERE idEvenement = ". $_POST["idEvnmt"];
        
                $execReq = $PDO1->query($reqActualite);
                $resultReq = $execReq->fetchAll(PDO::FETCH_ASSOC);
                
                $objResult = json_encode($resultReq);
                
                echo $objResult;
        
        
            }
            catch(Exception $e){
                echo '<br><br><b>ERREUR!!!<br>Échec lecture des données.<br></b>';
                echo $e->getMessage();
                echo '<br><br><br><br>';
                }
                $PDO1->commit();
                $PDO1=null;
        }
}


  




    function TelechargerPhoto(){

        echo var_dump($_FILES);

      
        $dossier_cible = basename($_FILES["imageEvenement"]["name"]);
        $TelOk = 1;
        $fichierImgType = strtolower(pathinfo($dossier_cible, PATHINFO_EXTENSION));
    
    
       
            if(isset($_POST["submit"])){
                $verifier = getimagesize($_FILES["imageEvenement"]["tmp_name"]);      
                if($verifier !== false){
                    echo "Ce fichier est une image - " . $verifier["mime"] . ".";
                    $TelOk = 1;}
                    else{
                        echo "Ce fichier n'est pas une image.";
                        $TelOk = 0;
                    }
                }
    
            if(file_exists($dossier_cible)){
                echo "Cette image existe déja.";
                $TelOk = 0;
            }
    
            if($_FILES["imageEvenement"]["size"] > 5000000){
                echo "Ce fichier image est trop volumineux.";
                $TelOk = 0;
            }
    
            if($fichierImgType != "jpg" && $fichierImgType != "png" && $fichierImgType != "jpeg" 
                    && $fichierImgType != "gif" && $fichierImgType != "bmp"){
                        echo "Ce type de format n'est pas pris en charge.";
                        $TelOk = 0;
            }
    
            if($TelOk == 0){
                echo "Le fichier n'a pas été téléchargé";
            }
                else{
                    if(move_uploaded_file($_FILES["imageEvenement"]["tmp_name"], $dossier_cible)){
                        echo " fichier " . basename($_FILES["imageEvenement"]["name"]) . "téléversé avec succès.";
                    }
                        else{
                            echo "Erreur, échec du téléversement.";
                        }
            }
    
            return $dossier_cible;
            
    }
   

?>