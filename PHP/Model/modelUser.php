<?php

    require_once(__DIR__.'/../Connexion/connexion.php');

    class ModelUser
    {
        private $connexion;

        /**
         * ModelUser constructor
         */
        public function __construct()
        {
            $class = new Connexion();
            $this->connexion = $class->getConnexion();
            $this->connexion->query("SET lc_time_names = 'fr_FR'");
        }

        public function verifUser($user)
        {
            try {
                $stmt = $this->connexion->prepare("SELECT * FROM utilisateur WHERE nomUtilisateur =:userName AND motDePasse =:pwd");
                $stmt->bindParam(':userName', $user["userName"]);
                $stmt->bindParam(':pwd', $user["pwd"]);
                $stmt->execute();
                $user = $stmt->fetch();

                if(getType($user) == "array") {
                    return true;
                } else {
                    return false;
                }
                
            } catch (PDOException $e) {
                echo "Échec lors de la connexion à la base de données: " . $e->getMessage();
            }
            
        }
    }