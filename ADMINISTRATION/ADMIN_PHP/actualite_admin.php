

<?php

include("../ADMIN_PHP/FONCTIONS PHP/Fonctions_Gest_InputUser.php");
include("../ADMIN_PHP/FONCTIONS PHP/connexion.php");
include("../ADMIN_PHP/FONCTIONS PHP/Regex.php");


$titreActu = "";
$dateActu = "";
$texteActu = "";

$dossierTlcg = "";
$dossier_cible = "";
$TelOk = "";
$fichierImgType = "";
$urlPhoto ="";



if (($_SERVER["REQUEST_METHOD"] == "POST") 
    &&!( $_POST["action"]=="listeActuTous") 
        &&!( $_POST["action"]=="infoActualite") 
            &&!( $_POST["action"]=="infoActif")){

    

    $RETOUR_ENTRE = array();

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["titreActu"]), $regex_StringTousCaracteres_OUI, "string");
    $titreActu = $RETOUR_ENTRE["Valeur"];

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["dateActu"]), $regex_StringTousCaracteres_OUI, "string");
    $dateActu = $RETOUR_ENTRE["Valeur"];
    
    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["texteActu"]), $regex_StringTousCaracteres_OUI, "string");
    $texteActu = $RETOUR_ENTRE["Valeur"];

}


/*echo var_dump($_POST);
echo var_dump($_FILES);*/

if(!( $_POST["action"]=="listeActuTous") &&!( $_POST["action"]=="infoActualite") &&!( $_POST["action"]=="infoActif")){

    if(!empty($imageActu)){

    if($_FILES['imageActu']['tmp_name'] == "" || $_FILES['imageActu']['size'] == 0){
        $urlPhoto = "NULL";
    }
    else{
        $urlPhoto = TelechargerPhoto();
    }
    }


    if ( $_POST["action"]=="Ajouter"){

       // echo "action Ajouter";
        try{
            $PDO1 ="";
            $PDO1 = CONNEXION_BD();    
            $PDO1->beginTransaction();   
            $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $reqInsert = $PDO1->prepare("INSERT INTO `actualite`(titreActu,
                                                                dateActu,
                                                                texteActu,
                                                                photoActu
                                                                )
                                                        VALUES (:titreActu,
                                                                :dateActu,
                                                                :texteActu,
                                                                :photoActu
                                                                );");


            $reqInsert->bindParam(":titreActu", $titreActu);
            $reqInsert->bindParam(":dateActu", $dateActu);
            $reqInsert->bindParam(":texteActu", $texteActu);
            $reqInsert->bindParam(":photoActu", $urlPhoto);
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


    if ( $_POST["action"]=="Modifier"){

      // echo "action Modifier";

        try{
            $PDO1 ="";
            $PDO1 = CONNEXION_BD();    
            $PDO1->beginTransaction();   
            $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $reqInsert = $PDO1->prepare("UPDATE `actualite` SET titreActu = :titreActu,
                                                                    dateActu = :dateActu,
                                                                    texteActu= :texteActu,
                                                                    photoActu = :photoActu                                                      
                                        WHERE idActualite = ". $_POST["idActu"] . ";"
                                );

            $reqInsert->bindParam(":titreActu", $titreActu);
            $reqInsert->bindParam(":dateActu", $dateActu);
            $reqInsert->bindParam(":texteActu", $texteActu);
            $reqInsert->bindParam(":photoActu", $urlPhoto);
              $reqInsert->execute();

         echo var_dump($_POST);
         echo var_dump($_FILES);
            echo $urlPhoto;

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

            $reqInsert = $PDO1->prepare("UPDATE `actualite` SET actif = :actif                                              
                                     WHERE idActualite = ". $_POST["idActu"] . ";"
                                );

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


        if ( $_POST["action"]=="listeActuTous"){

            // echo "action ReqListe";
         
             try{
                 $PDO1 ="";
                 $PDO1 = CONNEXION_BD();    
                 $PDO1->beginTransaction();   
                 $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         
                 $resultReq = array();
         
                 $reqActualite = "SELECT idActualite,
                                         titreActu,
                                         dateActu, 
                                         actif
                                 FROM `actualite`;";
         
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




         if ( $_POST["action"]=="listeActuTitre"){

            // echo "action ReqListe";
         
             try{
                 $PDO1 ="";
                 $PDO1 = CONNEXION_BD();    
                 $PDO1->beginTransaction();   
                 $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         
                 $resultReq = array();
         
                 $reqActualite = "SELECT idActualite,
                                         titreActu,
                                         dateActu
                                 FROM `actualite`;";
         
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


         if ( $_POST["action"]=="infoActualite"){
      
            try{
                $PDO1 ="";
                $PDO1 = CONNEXION_BD();    
                $PDO1->beginTransaction();   
                $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
                $resultReq = array();
        
                $reqActualite = "SELECT idActualite,
                                       titreActu,
                                       dateActu,
                                       texteActu,
                                       photoActu, 
                                       actif
                               FROM `actualite`
                               WHERE idActualite = ". $_POST["idActu"] . ";";
        
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
      
            try{
                $PDO1 ="";
                $PDO1 = CONNEXION_BD();    
                $PDO1->beginTransaction();   
                $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
                $resultReq = array();
        
                $reqActualite = "SELECT actif
                               FROM `actualite`
                               WHERE idActualite = ". $_POST["idActu"] . ";";
        
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


        $dossierTlcg = "Images/Actualites/";
        $dossier_cible = $dossierTlcg . basename($_FILES["imageActu"]["name"]);
        $TelOk = 1;
        $fichierImgType = strtolower(pathinfo($dossier_cible, PATHINFO_EXTENSION));
    
       /* echo var_dump($_FILES);
        echo  $dossier_cible;*/
       
            if(isset($_POST["submit"])){
                $verifier = getimagesize($_FILES["imageActu"]["tmp_name"]);      
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
    
            if($_FILES["imageActu"]["size"] > 5000000){
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
                    if(move_uploaded_file($_FILES["imageActu"]["tmp_name"], $dossier_cible)){
                        echo " fichier " . basename($_FILES["imageActu"]["name"]) . "téléversé avec succès.";
                    }
                        else{
                            echo "Erreur, échec du téléversement.";
                        }
            }
    
            return $dossier_cible;
            
    }
            
   
?>