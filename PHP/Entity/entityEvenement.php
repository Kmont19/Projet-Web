<?php

    require_once(__DIR__.'/../Connexion/connexion.php');

    class EntityEvenement
    {
        private $connexion;

        /**
         * EntityEvenement constructor
         */
        public function __construct()
        {
            $class = new Connexion();
            $this->connexion = $class->getConnexion();
        }

        public function getEvenements()
        {
            try {
                $stmt = $this->connexion->prepare("SELECT idEvenement, titreEvenement, DATE_FORMAT(dateEvenement, '%d %b %Y') as dateEvenement , DATE_FORMAT(heureEvenement, '%Hh%i') as heure, lieuEvenement, texteEvenement, photoEvenement  FROM evenement");
                $stmt->execute();
                $evenements = $stmt->fetchAll();
                return $evenements;
            } catch (PDOException $e) {
                echo "Échec lors de la connexion à la base de données: " . $e->getMessage();
            }
        }
    }