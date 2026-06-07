-- ============================================================
-- PHARMAWAY - BASE DE DONNÉES MÉDICALE ALGÉRIENNE
-- Version: 1.0 | Date: 2026-05-17
-- Encodage: UTF-8 | Moteur: InnoDB
-- ============================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS pharmaway
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE pharmaway;

-- ============================================================
-- 1. WILAYAS
-- ============================================================
CREATE TABLE IF NOT EXISTS wilayas (
    id        TINYINT UNSIGNED PRIMARY KEY,
    code      CHAR(2)      NOT NULL,
    nom       VARCHAR(80)  NOT NULL,
    nom_arabe VARCHAR(80)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 2. COMMUNES
-- ============================================================
CREATE TABLE IF NOT EXISTS communes (
    id         SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    wilaya_id  TINYINT UNSIGNED NOT NULL,
    nom        VARCHAR(100) NOT NULL,
    FOREIGN KEY (wilaya_id) REFERENCES wilayas(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 3. SPÉCIALITÉS MÉDICALES
-- ============================================================
CREATE TABLE IF NOT EXISTS specialites (
    id               SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nom              VARCHAR(100) NOT NULL,
    nom_arabe        VARCHAR(100),
    description      TEXT,
    urgence_possible BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 4. MÉDECINS
-- ============================================================
CREATE TABLE IF NOT EXISTS medecins (
    id              INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    civilite        ENUM('Dr','Pr') DEFAULT 'Dr',
    prenom          VARCHAR(60)  NOT NULL,
    nom             VARCHAR(60)  NOT NULL,
    specialite_id   SMALLINT UNSIGNED NOT NULL,
    commune_id      SMALLINT UNSIGNED NOT NULL,
    wilaya_id       TINYINT UNSIGNED  NOT NULL,
    adresse         VARCHAR(255),
    telephone       VARCHAR(20),
    telephone2      VARCHAR(20),
    email           VARCHAR(120),
    secteur         ENUM('public','prive','les_deux') DEFAULT 'prive',
    convention_cnas BOOLEAN DEFAULT FALSE,
    langue          VARCHAR(80)  DEFAULT 'Arabe, Français',
    actif           BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (specialite_id) REFERENCES specialites(id),
    FOREIGN KEY (commune_id)    REFERENCES communes(id),
    FOREIGN KEY (wilaya_id)     REFERENCES wilayas(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 5. HORAIRES DE TRAVAIL
-- ============================================================
CREATE TABLE IF NOT EXISTS horaires_travail (
    id          INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    medecin_id  INT UNSIGNED NOT NULL,
    jour        ENUM('Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche') NOT NULL,
    heure_debut TIME NOT NULL,
    heure_fin   TIME NOT NULL,
    type_seance ENUM('matin','apres-midi','journee') DEFAULT 'matin',
    FOREIGN KEY (medecin_id) REFERENCES medecins(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 6. CATÉGORIES DE SYMPTÔMES
-- ============================================================
CREATE TABLE IF NOT EXISTS categories_symptomes (
    id          SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nom         VARCHAR(100) NOT NULL,
    nom_arabe   VARCHAR(100),
    icone       VARCHAR(50),
    couleur     VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 7. SYMPTÔMES
-- ============================================================
CREATE TABLE IF NOT EXISTS symptomes (
    id              SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    categorie_id    SMALLINT UNSIGNED NOT NULL,
    nom             VARCHAR(150) NOT NULL,
    nom_arabe       VARCHAR(150),
    description     TEXT,
    niveau_urgence  ENUM('faible','modere','eleve','urgence') DEFAULT 'modere',
    mots_cles       TEXT,  -- pour recherche chatbot
    FOREIGN KEY (categorie_id) REFERENCES categories_symptomes(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 8. MAPPING SYMPTÔME → SPÉCIALITÉ (chatbot)
-- ============================================================
CREATE TABLE IF NOT EXISTS symptome_specialite (
    id             INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    symptome_id    SMALLINT UNSIGNED NOT NULL,
    specialite_id  SMALLINT UNSIGNED NOT NULL,
    priorite       TINYINT DEFAULT 1,  -- 1=premier recours, 2=second recours
    conseil_chatbot TEXT,
    FOREIGN KEY (symptome_id)   REFERENCES symptomes(id),
    FOREIGN KEY (specialite_id) REFERENCES specialites(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 9. LOGS CHATBOT (historique consultations)
-- ============================================================
CREATE TABLE IF NOT EXISTS chatbot_logs (
    id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    session_id      VARCHAR(100),
    symptome_id     SMALLINT UNSIGNED,
    specialite_id   SMALLINT UNSIGNED,
    medecin_id      INT UNSIGNED,
    wilaya_id       TINYINT UNSIGNED,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (symptome_id)   REFERENCES symptomes(id),
    FOREIGN KEY (specialite_id) REFERENCES specialites(id),
    FOREIGN KEY (medecin_id)    REFERENCES medecins(id),
    FOREIGN KEY (wilaya_id)     REFERENCES wilayas(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
