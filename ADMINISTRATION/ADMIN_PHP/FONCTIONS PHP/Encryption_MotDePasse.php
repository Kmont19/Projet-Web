

<?php

//  FONCTION UTILISANT L'ALGORITHME DE HACHAGE PAR DÉFAULT
function HASH_MotDePasse_DEFAULT($MotDePasse)
{
    $HASH_MOT_DE_PASSE = "";
    $HASH_MOT_DE_PASSE = password_hash($MotDePasse,  PASSWORD_DEFAULT);

    return $HASH_MOT_DE_PASSE;
}

//  FONCTION UTILISANT L'ALGORITHME DE HACHAGE B_CRYPT AVEC COÛT PARAMÉTRABLE ==> Coût de 8;
function HASH_MotDePasse_BCRYPT_COST_8($MotDePasse)
{
    $HASH_MOT_DE_PASSE = "";
    $HASH_MOT_DE_PASSE = password_hash($MotDePasse,  PASSWORD_BCRYPT, ['cout' => 8]);

    return $HASH_MOT_DE_PASSE;
}

//  FONCTION UTILISANT L'ALGORITHME DE HACHAGE B_CRYPT AVEC COÛT PARAMÉTRABLE ==> Coût de 12;
function HASH_MotDePasse_BCRYPT_COST_12($MotDePasse)
{
    $HASH_MOT_DE_PASSE = "";
    $HASH_MOT_DE_PASSE = password_hash($MotDePasse,  PASSWORD_BCRYPT, ['cout' => 12]);

    return $HASH_MOT_DE_PASSE;
}


//  FONCTION UTILISANT L'ALGORITHME DE HACHAGE B_CRYPT AVEC COÛT PARAMÉTRABLE ==> Coût de 18;
function HASH_MotDePasse_BCRYPT_COST_18($MotDePasse)
{
    $HASH_MOT_DE_PASSE = "";
    $HASH_MOT_DE_PASSE = password_hash($MotDePasse,  PASSWORD_BCRYPT,  ['cout' => 18]);

    return $HASH_MOT_DE_PASSE;
}

//  RETOURNE DES INFORMATIONS SUR L'ALGORITHME UTILISÉ
function HASH_INFO($HASH_MDP)
{
    $INFO = array();
    $INFO = password_get_info($HASH_MDP);

    return $INFO;
}



//  VÉRIFICATIONS DES MOTS DE PASSE CONTRE UN HASH
function VERIFICATION_MOT_DE_PASSE($MDP, $HASH)
{
    $Valide = false;
    if (password_verify($MDP, $HASH)) {
        $Valide = true;
    } else {
        $Valide = false;
    }
    return $Valide;
}
/*  IMPORTANT: Utiliser toujours des guillemets simple ,('), pour les strings des mots de passe et des hashs.
               Sinon, des erreurs pourraient survenir
*/
































?>