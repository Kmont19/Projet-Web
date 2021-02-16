<?php

function GestionErreursSanitization($post, $regex, $type){

    $RETOUR_ENTRE = array();
    $ErrVide = false;
    $ErrFormat = false;
    $err = false;
    $Valeur_DB = "";


    if (empty($post)) {
        $ErrVide = true;
        } else {          
       if (!preg_match($regex, $post)) {
            $ErrFormat = true; 
        }else{
            $Valeur_DB = test_input($post);
        }
        }
        
    
    
        if($ErrVide == false && $ErrFormat == false){

        switch($type){


            case "string":  
            $Valeur_DB = filter_var($Valeur_DB, FILTER_SANITIZE_STRING);
            $Valeur_DB = trim($Valeur_DB);
            break;
            case "integer":
            $Valeur_DB = filter_var($Valeur_DB, FILTER_SANITIZE_NUMBER_INT);
            $Valeur_DB = trim($Valeur_DB);
            break;
            case "decimal":
            $Valeur_DB = str_replace(",", ".", $Valeur_DB);
            $Valeur_DB = filter_var($Valeur_DB, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            $Valeur_DB = trim($Valeur_DB);
            break;
            case "email":
            $Valeur_DB = filter_var($Valeur_DB, FILTER_SANITIZE_EMAIL);
            $Valeur_DB = trim($Valeur_DB);
            break;
            case "url":
            $Valeur_DB = filter_var($Valeur_DB, FILTER_SANITIZE_URL);
            $Valeur_DB = trim($Valeur_DB);
            break;
            case "telephone":
            $Valeur_DB = filter_var($Valeur_DB, FILTER_SANITIZE_STRING);
            $Valeur_DB = trim($Valeur_DB);
            $Valeur_DB = FormatTelephone($Valeur_DB);
            break;
            case "codePostal":
            $Valeur_DB = filter_var($Valeur_DB, FILTER_SANITIZE_STRING);
            $Valeur_DB = trim($Valeur_DB);
            $Valeur_DB = FormatCodePostal($Valeur_DB);
            break;
            case "texte":
            $Valeur_DB = filter_var($Valeur_DB, FILTER_SANITIZE_STRING);
            $Valeur_DB = trim($Valeur_DB);
            break;
            case "password":
            $Valeur_DB = filter_var($Valeur_DB, FILTER_SANITIZE_STRING);
            $Valeur_DB = trim($Valeur_DB);
            break;
      }

       

     }else{
       $Valeur_DB =  "Null";
        $RETOUR_ENTRE["errVide"] = $ErrVide;
        $RETOUR_ENTRE["errFormat"] = $ErrFormat;
        $RETOUR_ENTRE["Valeur"] = $Valeur_DB;
        return $RETOUR_ENTRE;

        
    }

    $RETOUR_ENTRE["errVide"] = $ErrVide;
    $RETOUR_ENTRE["errFormat"] = $ErrFormat;
    $RETOUR_ENTRE["Valeur"] = $Valeur_DB;

    return $RETOUR_ENTRE;

}



function FormatTelephone($noTel){

    $noTel = str_replace(" ", "", $noTel);
    $noTel = str_replace("-", "", $noTel);
    $noTel = str_replace("(", "", $noTel);
    $noTel = str_replace(")", "", $noTel);

    return $noTel;
}

function FormatCodePostal($codePostal){

    $codePostal = strtoupper($codePostal);
    $codePostal = str_replace(" ", "", $codePostal);

    return $codePostal;
}


function test_input($data){
    $data = trim($data);
    $data = stripcslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function ComparaisonMotdePasse($MDP_1, $MDP_2){

if( strcmp($MDP_1, $MDP_2) == 0){
    return true;  
}else{
    return false;
    
}


}















?>