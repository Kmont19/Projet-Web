<?php

class Connexion
{
    private $connexion;
    public function __construct()
    {
        try {
            $this->connexion = new PDO(
                "mysql:host=206.167.140.56;dbname=h2021_420626ri_gr01_équipe_5;port=3306,charset=utf8","1647207","1647207");
            $this->connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo $e;
        }
    }

    /**
     * @return PDO
     */
    public function getConnexion(): PDO
    {
        return $this->connexion;
    }
}