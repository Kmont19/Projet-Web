<?php

require_once(__DIR__.'/../Entity/entityActualite.php');
$entityActualite = new EntityActualite();

if(isset($_GET["getActualitesAccueil"])) {
    echo json_encode($entityActualite->getActualitesAccueil());
}