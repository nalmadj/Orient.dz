-- ============================================================
-- PHARMAWAY - BASE DE DONNÉES MÉDICALE COMPLÈTE
-- Chatbot médical : médecins, horaires, symptômes, spécialistes
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
-- SUPPRESSION DES TABLES (ordre inverse des dépendances)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS symptome_specialite;
DROP TABLE IF EXISTS symptomes;
DROP TABLE IF EXISTS categories_symptomes;
DROP TABLE IF EXISTS horaires_travail;
DROP TABLE IF EXISTS medecins;
DROP TABLE IF EXISTS specialites;

-- ============================================================
-- TABLE : specialites
-- ============================================================
CREATE TABLE specialites (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nom             VARCHAR(100) NOT NULL,
    description     TEXT,
    urgence_defaut  TINYINT DEFAULT 1  -- 1=non urgent, 2=semi, 3=urgent, 4=urgence
);

-- ============================================================
-- TABLE : medecins
-- ============================================================
CREATE TABLE medecins (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nom             VARCHAR(80)  NOT NULL,
    prenom          VARCHAR(80)  NOT NULL,
    specialite_id   INT          NOT NULL,
    telephone       VARCHAR(20),
    telephone2      VARCHAR(20),
    email           VARCHAR(120),
    adresse         VARCHAR(200),
    ville           VARCHAR(80),
    wilaya          VARCHAR(80),
    code_postal     VARCHAR(10),
    latitude        DECIMAL(9,6),
    longitude       DECIMAL(9,6),
    secteur         ENUM('public','prive','les_deux') DEFAULT 'prive',
    honoraires      VARCHAR(50),
    langues         VARCHAR(100) DEFAULT 'Arabe, Français',
    disponible      BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (specialite_id) REFERENCES specialites(id)
);

-- ============================================================
-- TABLE : horaires_travail
-- ============================================================
CREATE TABLE horaires_travail (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    medecin_id  INT NOT NULL,
    jour        ENUM('Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche') NOT NULL,
    heure_debut TIME,
    heure_fin   TIME,
    est_ouvert  BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (medecin_id) REFERENCES medecins(id)
);

-- ============================================================
-- TABLE : categories_symptomes
-- ============================================================
CREATE TABLE categories_symptomes (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nom         VARCHAR(100) NOT NULL,
    icone       VARCHAR(50),
    description TEXT
);

-- ============================================================
-- TABLE : symptomes
-- ============================================================
CREATE TABLE symptomes (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    categorie_id    INT NOT NULL,
    nom             VARCHAR(150) NOT NULL,
    description     TEXT,
    urgence         TINYINT DEFAULT 1  COMMENT '1=peut attendre, 2=dans la semaine, 3=sous 48h, 4=urgences',
    mots_cles       TEXT               COMMENT 'mots-clés pour la recherche chatbot',
    conseil_chatbot TEXT               COMMENT 'message affiché par le chatbot',
    FOREIGN KEY (categorie_id) REFERENCES categories_symptomes(id)
);

-- ============================================================
-- TABLE : symptome_specialite
-- ============================================================
CREATE TABLE symptome_specialite (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    symptome_id     INT NOT NULL,
    specialite_id   INT NOT NULL,
    priorite        TINYINT DEFAULT 1  COMMENT '1=premier recours, 2=second recours',
    note            VARCHAR(255),
    FOREIGN KEY (symptome_id) REFERENCES symptomes(id),
    FOREIGN KEY (specialite_id) REFERENCES specialites(id)
);

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- DONNÉES : SPÉCIALITÉS MÉDICALES (25)
-- ============================================================
INSERT INTO specialites (id, nom, description, urgence_defaut) VALUES
(1,  'Médecine générale',             'Médecin de premier recours, traite toutes pathologies courantes',          2),
(2,  'Cardiologie',                   'Maladies du cœur et des vaisseaux sanguins',                               3),
(3,  'Dermatologie',                  'Maladies de la peau, des cheveux et des ongles',                           1),
(4,  'Gastro-entérologie',            'Maladies du tube digestif, foie, pancréas',                                2),
(5,  'Neurologie',                    'Maladies du système nerveux central et périphérique',                      3),
(6,  'Ophtalmologie',                 'Maladies des yeux et de la vision',                                        2),
(7,  'Oto-rhino-laryngologie (ORL)',  'Maladies des oreilles, nez et gorge',                                      2),
(8,  'Orthopédie et traumatologie',   'Maladies des os, articulations, muscles et ligaments',                     2),
(9,  'Pédiatrie',                     'Médecine de l\'enfant de 0 à 16 ans',                                      2),
(10, 'Psychiatrie',                   'Troubles mentaux et comportementaux',                                      2),
(11, 'Pneumologie',                   'Maladies des poumons et des voies respiratoires',                          3),
(12, 'Urologie',                      'Maladies du système urinaire et appareil génital masculin',                2),
(13, 'Gynécologie-Obstétrique',       'Santé de la femme, grossesse et accouchement',                             2),
(14, 'Endocrinologie et diabétologie','Maladies hormonales, diabète, thyroïde',                                   2),
(15, 'Rhumatologie',                  'Maladies articulaires, rhumatismes, maladies auto-immunes',                2),
(16, 'Hématologie',                   'Maladies du sang et de la moelle osseuse',                                 3),
(17, 'Oncologie',                     'Cancers et tumeurs malignes',                                              3),
(18, 'Néphrologie',                   'Maladies des reins',                                                       3),
(19, 'Infectiologie',                 'Maladies infectieuses bactériennes, virales, parasitaires',                2),
(20, 'Chirurgie générale',            'Interventions chirurgicales abdominales et générales',                     3),
(21, 'Stomatologie et chirurgie dentaire','Maladies des dents, gencives et bouche',                              2),
(22, 'Médecine interne',              'Maladies complexes multi-systémiques',                                     2),
(23, 'Allergologie et immunologie',   'Allergies, asthme, maladies immunitaires',                                 2),
(24, 'Médecine du sport',             'Traumatismes sportifs, médecine préventive du sportif',                    1),
(25, 'Gériatrie',                     'Médecine des personnes âgées',                                            2);
