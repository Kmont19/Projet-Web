

<?php
include("../ADMINISTRATION/ADMIN_PHP/FONCTIONS PHP/Fonctions_Gest_InputUser.php");
include("../ADMINISTRATION/ADMIN_PHP/FONCTIONS PHP/connexion.php");
include("../ADMINISTRATION/ADMIN_PHP/FONCTIONS PHP/Regex.php");





    if ( $_POST["action"]=="infoEvenmtTous"){
      
    try{
        $PDO1 ="";
        $PDO1 = CONNEXION_BD();    
        $PDO1->beginTransaction();   
        $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $resultReq = array();

        $reqEvenement = "SELECT idEvenement,
                                titreEvenement,
                                dateEvenement,
                                texteEvenement,
                                photoEvenement 
                        FROM `evenement`
                        WHERE actif = 1;";

        $execReq = $PDO1->query($reqEvenement);
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


    if ( $_POST["action"]=="infoModale"){
      
        try{
            $PDO1 ="";
            $PDO1 = CONNEXION_BD();    
            $PDO1->beginTransaction();   
            $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
            $resultReq = array();
            $reqEvenement = "SELECT idEvenement,
                                    titreEvenement,
                                    dateEvenement,
                                    texteEvenement,
                                    photoEvenement 
                            FROM `evenement`
                            WHERE idEvenement = ". $_POST["idEvenmtMdl"] . ";";
    
            $execReq = $PDO1->query($reqEvenement);
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