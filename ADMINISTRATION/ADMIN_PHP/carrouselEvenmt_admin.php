

<?php

include("../ADMIN_PHP/FONCTIONS PHP/Fonctions_Gest_InputUser.php");
include("../ADMIN_PHP/FONCTIONS PHP/connexion.php");
include("../ADMIN_PHP/FONCTIONS PHP/Regex.php");


$evenememt = "";
$premier = "";


if (($_SERVER["REQUEST_METHOD"] == "POST")
    &&!( $_POST["action"]=="titreEvenement") 
        &&!( $_POST["action"]=="lieuEvenmt") 
            &&!( $_POST["action"]=="infoActif")){

    

    $RETOUR_ENTRE = array();

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["evenememt"]), $regex_StringTousCaracteres_OUI, "string");
    $evenememt = $RETOUR_ENTRE["Valeur"];

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["premier"]), $regex_StringTousCaracteres_OUI, "string");
    $premier = $RETOUR_ENTRE["Valeur"];


}




    if ( $_POST["action"]=="Ajouter"){

        echo "action Ajouter";
        try{
            $PDO1 ="";
            $PDO1 = CONNEXION_BD();    
            $PDO1->beginTransaction();   
            $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $reqInsert = $PDO1->prepare("INSERT INTO `evenement_carrousel`(id_evenement,
                                                                            premier,
                                                                                                                                                       )
                                                                    VALUES (:id_evenement,
                                                                            :premier,                                                                           
                                                                           );");

            $reqInsert->bindParam(":id_evenement", $evenememt);
            $reqInsert->bindParam(":premier", $premier);         
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

            $reqInsert = $PDO1->prepare("UPDATE `evenement_carrousel` SET id_evenement = :id_evenement,
                                                                    premier = :premier,
                                                                                                                     
                                    WHERE idEvenement = ". $_POST["idEvnmt"] . " ; "
                                );

            $reqInsert->bindParam(":id_evenement", $evenememt);
            $reqInsert->bindParam(":premier", $premier);
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

   
   


   


        if ( $_POST["action"]=="listeEvenmtTous"){

            // echo "action ReqListe";
         
             try{
                 $PDO1 ="";
                 $PDO1 = CONNEXION_BD();    
                 $PDO1->beginTransaction();   
                 $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         
                 $resultReq = array();
         
                 $reqActualite = "SELECT idEvenement,
                                         titreEvenement,
                                         dateEvenement, 
                                         actif
                                 FROM `evenement`;";
         
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




        
         if ( $_POST["action"]=="infoEvenmtCarrousel"){
       
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
                                        heureDebutEvenmt,
                                        heureFinEvenmt,                                                              
                                        texteEvenement,
                                        photoEvenement
                                FROM `evenement`
                                WHERE idEvenement = ". $_POST["idEvnmt"] . ";";
         
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

        


  




    
   

?>