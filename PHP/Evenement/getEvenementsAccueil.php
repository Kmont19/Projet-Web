<?php

require_once(__DIR__.'/../Entity/entityEvenement.php');
$entityEvenement = new EntityEvenement();

if(isset($_GET["getEvenementsAccueil"])) {
    echo json_encode($entityEvenement->getEvenementsAccueil());
}