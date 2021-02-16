

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




if ($_SERVER["REQUEST_METHOD"] == "POST") {

    

    $RETOUR_ENTRE = array();

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["titreActu"]), $regex_StringTousCaracteres_OUI, "string");
    $titreActu = $RETOUR_ENTRE["Valeur"];

    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["dateActu"]), $regex_StringTousCaracteres_OUI, "string");
    $dateActu = $RETOUR_ENTRE["Valeur"];
    
    $RETOUR_ENTRE = GestionErreursSanitization(($_POST["texteActu"]), $regex_StringTousCaracteres_OUI, "string");
    $texteActu = $RETOUR_ENTRE["Valeur"];

}




if(!empty($titreActu) &&!empty($dateActu) &&!empty($texteActu)){

    try{
        $PDO1 ="";
        $PDO1 = CONNEXION_BD();    
        $PDO1->beginTransaction();   
        $PDO1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

/*
$reqInsert = $PDO1->prepare("INSERT INTO actualite (titreActu,
                                                    dateActu,
                                                    texteActu,
                                                   )
                                            VALUES (:titreActu,
                                                    :dateActu,
                                                    :texteActu,
                                                    )");

$reqInsert->bindParam(":titreActu", $titreActu);
$reqInsert->bindParam(":dateActu", $dateActu);
$reqInsert->bindParam(":texteActu", $texteActu);
$reqInsert->execute();
*/

echo var_dump($_SERVER);

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
    else{
        echo "doh!";
    }

        
            
            
        
        
       












































?>