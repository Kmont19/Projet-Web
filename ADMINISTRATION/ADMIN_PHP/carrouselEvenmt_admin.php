

<?php

include("../ADMIN_PHP/FONCTIONS PHP/Fonctions_Gest_InputUser.php");
include("../ADMIN_PHP/FONCTIONS PHP/connexion.php");
include("../ADMIN_PHP/FONCTIONS PHP/Regex.php");


$titreCarrousel = "";
$texteCarrousel = "";

$dossierTlcg = "";
$dossier_cible = "";
$TelOk = "";
$fichierImgType = "";
$urlPhoto ="";

if (($_SERVER["REQUEST_METHOD"] == "POST")
    &&!( $_POST["action"]=="listeCarrousel") 
        &&!( $_POST["action"]=="infoCarrousel") 
            &&!( $_POST["action"]=="infoActif")){

    

    $RETOUR_ENTRE = array();

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["titreCarrousel"]), $regex_StringTousCaracteres_OUI, "string");
    $titreCarrousel = $RETOUR_ENTRE["Valeur"];

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["texteCarrousel"]), $regex_StringTousCaracteres_OUI, "string");
    $texteCarrousel = $RETOUR_ENTRE["Valeur"];


}


if(!( $_POST["action"]=="listeCarrousel") &&!( $_POST["action"]=="infoCarrousel") &&!( $_POST["action"]=="infoActif")){

    if(!empty($imageActu)){
    if($_FILES['imageCarslEvnt']['tmp_name'] == "" || $_FILES['imageCarslEvnt']['size'] == 0){
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

            $reqInsert = $PDO1->prepare("INSERT INTO `evenement_carrousel`(titre_carrousel,
                                                                            texte_carrousel,
                                                                            photoCarrousel
                                                                                                                                                       )
                                                                    VALUES (:titre_carrousel,
                                                                            :texte_carrousel,
                                                                            :photoCarrousel                                                                           
                                                                           );");

            $reqInsert->bindParam(":titre_carrousel", $titreCarrousel);
            $reqInsert->bindParam(":texte_carrousel", $texteCarrousel);  
            $reqInsert->bindParam(":photoCarrousel", $urlPhoto);         
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

      //  echo "action Modifier";

        try{
            $PDO1 ="";
            $PDO1 = CONNEXION_BD();    
            $PDO1->beginTransaction();   
            $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $reqInsert = $PDO1->prepare("UPDATE `evenement_carrousel` SET titre_carrousel = :titre_carrousel,
                                                                        texte_carrousel = :texte_carrousel,
                                                                        photoCarrousel = :photoCarrousel
                                                                                                                     
                                    WHERE id_Evenmt_carrousel = ". $_POST["idCarsl"] . " ; "
                                );

            $reqInsert->bindParam(":titre_carrousel", $titreCarrousel);
            $reqInsert->bindParam(":texte_carrousel", $texteCarrousel);
            $reqInsert->bindParam(":photoCarrousel", $urlPhoto);        
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
    
                $reqInsert = $PDO1->prepare("UPDATE `evenement_carrousel` SET actif = :actif                                              
                                        WHERE id_Evenmt_carrousel = ". $_POST["idCarsl"] . " ; "
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

        if ( $_POST["action"]=="listeCarrousel"){

            // echo "action ReqListe";
         
             try{
                 $PDO1 ="";
                 $PDO1 = CONNEXION_BD();    
                 $PDO1->beginTransaction();   
                 $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         
                 $resultReq = array();
         
                 $reqActualite = "SELECT id_Evenmt_carrousel,
                                         titre_carrousel,
                                         texte_carrousel,
                                         actif
                                 FROM `evenement_carrousel`;";
         
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

      if ( $_POST["action"]=="infoCarrousel"){
      
        //  echo "infoActif";
          try{
              $PDO1 ="";
              $PDO1 = CONNEXION_BD();    
              $PDO1->beginTransaction();   
              $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      
              $resultReq = array();
      
              $reqActualite = " SELECT  titre_carrousel,
                                        texte_carrousel,
                                        photoCarrousel,
                                        actif
                                FROM `evenement_carrousel`
                                WHERE id_Evenmt_carrousel = ". $_POST["idCarsl"] . ";";
      
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
                           FROM `evenement_carrousel`
                           WHERE id_Evenmt_carrousel = ". $_POST["idCarsl"] . ";";
    
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

   
    $dossier_cible = basename($_FILES["imageCarslEvnt"]["name"]);
    $TelOk = 1;
    $fichierImgType = strtolower(pathinfo($dossier_cible, PATHINFO_EXTENSION));


   
        if(isset($_POST["submit"])){
            $verifier = getimagesize($_FILES["imageCarslEvnt"]["tmp_name"]);      
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

        if($_FILES["imageCarslEvnt"]["size"] > 5000000){
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
                if(move_uploaded_file($_FILES["imageCarslEvnt"]["tmp_name"], $dossier_cible)){
                    echo " fichier " . basename($_FILES["imageCarslEvnt"]["name"]) . "téléversé avec succès.";
                }
                    else{
                        echo "Erreur, échec du téléversement.";
                    }
        }

        return $dossier_cible;
        
}




    
   

?>