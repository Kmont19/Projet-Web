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
            $this->connexion->query("SET lc_time_names = 'fr_FR'");
        }

        public function getActualites()
        {
            try {
                $stmt = $this->connexion->prepare("SELECT idActualite, titreActu, DATE_FORMAT(dateActu, '%d %M %Y') as dateActu, texteActu, photoActu , actif FROM actualite WHERE actif = 1 ORDER BY dateActu DESC");
                $stmt->execute();
                $actualites = $stmt->fetchAll();
                return $actualites;
            } catch (PDOException $e) {
                echo "Échec lors de la connexion à la base de données: " . $e->getMessage();
            }
        }

        public function getActualitesAccueil()
        {
            try {
                $stmt = $this->connexion->prepare("SELECT idActualite, titreActu, DATE_FORMAT(dateActu, '%d %M %Y') as dateActu, texteActu, photoActu, actif FROM actualite WHERE actif = 1 ORDER BY dateActu DESC LIMIT 3");
                $stmt->execute();
                $actualites = $stmt->fetchAll();
                return $actualites;
            } catch (PDOException $e) {
                echo "Échec lors de la connexion à la base de données: " . $e->getMessage();
            }
        }

        public function getActualitesRecherche($recherche)
        {
            try {
                $variable = "%".$recherche."%";
                $stmt = $this->connexion->prepare("SELECT * FROM actualite WHERE titreActu LIKE :recherche AND actif = 1");
                $stmt->execute(['recherche' => $variable]);
                $actualites = $stmt->fetchAll();
                return $actualites;
            } catch (PDOException $e) {
                echo "Échec lors de la connexion à la base de données: " . $e->getMessage();
            }
        }
    }
    