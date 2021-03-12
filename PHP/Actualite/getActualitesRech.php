<?php

require_once(__DIR__.'/../Entity/entityActualite.php');
$entityActualite = new EntityActualite();

if(isset($_GET["recherche"])) {
    echo json_encode($entityActualite->getActualite($_GET["recherche"]));
}