<?php           
function CONNEXION_BD(){
$utilisateur="root";
$passwword="root";
$connect = 'mysql:host=localhost;dbname=dept_info;charset=utf8';

try {
   $pdo = new PDO($connect, $utilisateur, $passwword);
   $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die();
    echo 'ERREUR!!!<br>Connexion impossible.';
    echo $e->getMessage();
}

return $pdo;
}
?>