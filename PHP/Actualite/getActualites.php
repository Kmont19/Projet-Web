<?php

require_once(__DIR__.'/../Entity/entityActualite.php');
$entityActualite = new EntityActualite();

if(isset($_GET["getActualites"])) {
    echo json_encode($entityActualite->getActualites());
}