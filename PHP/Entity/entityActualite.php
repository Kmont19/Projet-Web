<?php

    require_once(__DIR__.'/../Connexion/connexion.php');

    class EntityActualite
    {
        private $connexion;

        /**
         * EntityActualite constructor
         */
        public function __construct()
        {
            $class = new Connexion();
            $this->connexion = $class->getConnexion();
        }

        public function getActualites()
        {
            try {
                $stmt = $this->connexion->prepare("SELECT * FROM actualite");
                $stmt->execute();
                $actualites = $stmt->fetchAll();
                return $actualites;
            } catch (PDOException $e) {
                echo "Échec lors de la connexion à la base de données: " . $e->getMessage();
            }
        }

        public function getActualite($recherche)
        {
            try {
                $stmt = $this->connexion->prepare("SELECT * FROM actualite WHERE titreActu LIKE %:recherche%");
                $stmt->execute(['recherche' => $recherche]);
                $actualites = $stmt->fetchAll();
                return $actualites;
            } catch (PDOException $e) {
                echo "Échec lors de la connexion à la base de données: " . $e->getMessage();
            }
        }
    }
    