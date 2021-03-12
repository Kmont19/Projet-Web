<?php

require_once(__DIR__.'/../Model/modelUser.php');
$modelUser = new ModelUser();

if(isset($_POST["action"])) {
    echo json_encode($modelUser->verifUser($_POST["user"]));
}