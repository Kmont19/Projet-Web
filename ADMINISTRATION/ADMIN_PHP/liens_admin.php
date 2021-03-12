

<?php

include("../ADMIN_PHP/FONCTIONS PHP/Fonctions_Gest_InputUser.php");
include("../ADMIN_PHP/FONCTIONS PHP/connexion.php");
include("../ADMIN_PHP/FONCTIONS PHP/Regex.php");


$texteLien = "";
$urlLien = "";



if (($_SERVER["REQUEST_METHOD"] == "POST")
    &&!( $_POST["action"]=="listeLiens") 
        &&!( $_POST["action"]=="infoLien") 
            &&!( $_POST["action"]=="infoActif")){

    

    $RETOUR_ENTRE = array();

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["texteLiens"]), $regex_StringTousCaracteres_OUI, "string");
    $texteLien = $RETOUR_ENTRE["Valeur"];

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["urlLiens"]), $regex_StringTousCaracteres_OUI, "string");
    $urlLien = $RETOUR_ENTRE["Valeur"];


}


if(!( $_POST["action"]=="listeLiens") &&!( $_POST["action"]=="infoLien") &&!( $_POST["action"]=="infoActif")){

   
    if ( $_POST["action"]=="Ajouter"){

       // echo "action Ajouter";
        try{
            $PDO1 ="";
            $PDO1 = CONNEXION_BD();    
            $PDO1->beginTransaction();   
            $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $reqInsert = $PDO1->prepare("INSERT INTO `liens`(texte_lien,
                                                            url_lien                                                                 )
                                                    VALUES (:texte_lien,
                                                            :url_lien                                                                         
                                                            );");

            $reqInsert->bindParam(":texte_lien", $texteLien);
            $reqInsert->bindParam(":url_lien", $urlLien);                 
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

            $reqInsert = $PDO1->prepare("UPDATE `liens` SET texte_lien = :texte_lien,
                                                                        url_lien = :url_lien                                                                                                                    
                                    WHERE id_lien = ". $_POST["idLiens"] . " ; "
                                );

            $reqInsert->bindParam(":texte_lien", $texteLien);
            $reqInsert->bindParam(":url_lien", $urlLien);            
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
    
                $reqInsert = $PDO1->prepare("UPDATE `liens` SET actif = :actif                                              
                                            WHERE id_lien = ". $_POST["idLiens"] . " ; "
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

        if ( $_POST["action"]=="listeLiens"){

            // echo "action ReqListe";
         
             try{
                 $PDO1 ="";
                 $PDO1 = CONNEXION_BD();    
                 $PDO1->beginTransaction();   
                 $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         
                 $resultReq = array();
         
                 $reqActualite = "SELECT id_lien,
                                         texte_lien,
                                         url_lien,
                                         actif
                                 FROM `liens`;";
         
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

      if ( $_POST["action"]=="infoLien"){
      
        //  echo "infoActif";
          try{
              $PDO1 ="";
              $PDO1 = CONNEXION_BD();    
              $PDO1->beginTransaction();   
              $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      
              $resultReq = array();
      
              $reqActualite = " SELECT  texte_lien,
                                        url_lien,
                                        actif
                                FROM `liens`
                                WHERE id_lien = ". $_POST["idLiens"] . ";";
      
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
                                FROM `liens`
                                WHERE id_lien = ". $_POST["idLiens"] . ";";
            
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







    
   

?>