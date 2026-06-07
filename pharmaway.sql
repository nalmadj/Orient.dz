-- =====================================================================
-- PHARMAWAY - Base de données chatbot médical (Algérie)
-- SGBD : MySQL 8.0+ / MariaDB 10.5+
-- Langues : Français + العربية
-- =====================================================================
-- AVERTISSEMENT IMPORTANT
-- Les médecins insérés en fin de fichier sont des DONNÉES FICTIVES
-- d'exemple. Avant mise en production, remplacez-les par les vraies
-- données obtenues via :
--   - Conseil National de l'Ordre des Médecins d'Algérie (CNOM)
--   - Annuaire santé officiel du Ministère de la Santé
--   - Inscription directe des médecins sur la plateforme
-- Diffuser de faux numéros de médecins engage votre responsabilité.
-- =====================================================================

DROP DATABASE IF EXISTS pharmaway;
CREATE DATABASE pharmaway
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE pharmaway;

SET NAMES utf8mb4;
SET time_zone = '+01:00';

-- =====================================================================
-- 1. RÉFÉRENTIEL GÉOGRAPHIQUE
-- =====================================================================

CREATE TABLE wilayas (
  id            TINYINT UNSIGNED PRIMARY KEY,
  code          CHAR(2)        NOT NULL UNIQUE,
  nom_fr        VARCHAR(60)    NOT NULL,
  nom_ar        VARCHAR(60)    NOT NULL,
  chef_lieu_fr  VARCHAR(60)    NOT NULL
) ENGINE=InnoDB;

INSERT INTO wilayas (id, code, nom_fr, nom_ar, chef_lieu_fr) VALUES
( 1,'01','Adrar','أدرار','Adrar'),
( 2,'02','Chlef','الشلف','Chlef'),
( 3,'03','Laghouat','الأغواط','Laghouat'),
( 4,'04','Oum El Bouaghi','أم البواقي','Oum El Bouaghi'),
( 5,'05','Batna','باتنة','Batna'),
( 6,'06','Béjaïa','بجاية','Béjaïa'),
( 7,'07','Biskra','بسكرة','Biskra'),
( 8,'08','Béchar','بشار','Béchar'),
( 9,'09','Blida','البليدة','Blida'),
(10,'10','Bouira','البويرة','Bouira'),
(11,'11','Tamanrasset','تمنراست','Tamanrasset'),
(12,'12','Tébessa','تبسة','Tébessa'),
(13,'13','Tlemcen','تلمسان','Tlemcen'),
(14,'14','Tiaret','تيارت','Tiaret'),
(15,'15','Tizi Ouzou','تيزي وزو','Tizi Ouzou'),
(16,'16','Alger','الجزائر','Alger'),
(17,'17','Djelfa','الجلفة','Djelfa'),
(18,'18','Jijel','جيجل','Jijel'),
(19,'19','Sétif','سطيف','Sétif'),
(20,'20','Saïda','سعيدة','Saïda'),
(21,'21','Skikda','سكيكدة','Skikda'),
(22,'22','Sidi Bel Abbès','سيدي بلعباس','Sidi Bel Abbès'),
(23,'23','Annaba','عنابة','Annaba'),
(24,'24','Guelma','قالمة','Guelma'),
(25,'25','Constantine','قسنطينة','Constantine'),
(26,'26','Médéa','المدية','Médéa'),
(27,'27','Mostaganem','مستغانم','Mostaganem'),
(28,'28','M''Sila','المسيلة','M''Sila'),
(29,'29','Mascara','معسكر','Mascara'),
(30,'30','Ouargla','ورقلة','Ouargla'),
(31,'31','Oran','وهران','Oran'),
(32,'32','El Bayadh','البيض','El Bayadh'),
(33,'33','Illizi','إليزي','Illizi'),
(34,'34','Bordj Bou Arréridj','برج بوعريريج','Bordj Bou Arréridj'),
(35,'35','Boumerdès','بومرداس','Boumerdès'),
(36,'36','El Tarf','الطارف','El Tarf'),
(37,'37','Tindouf','تندوف','Tindouf'),
(38,'38','Tissemsilt','تيسمسيلت','Tissemsilt'),
(39,'39','El Oued','الوادي','El Oued'),
(40,'40','Khenchela','خنشلة','Khenchela'),
(41,'41','Souk Ahras','سوق أهراس','Souk Ahras'),
(42,'42','Tipaza','تيبازة','Tipaza'),
(43,'43','Mila','ميلة','Mila'),
(44,'44','Aïn Defla','عين الدفلى','Aïn Defla'),
(45,'45','Naâma','النعامة','Naâma'),
(46,'46','Aïn Témouchent','عين تموشنت','Aïn Témouchent'),
(47,'47','Ghardaïa','غرداية','Ghardaïa'),
(48,'48','Relizane','غليزان','Relizane'),
(49,'49','Timimoun','تيميمون','Timimoun'),
(50,'50','Bordj Badji Mokhtar','برج باجي مختار','Bordj Badji Mokhtar'),
(51,'51','Ouled Djellal','أولاد جلال','Ouled Djellal'),
(52,'52','Béni Abbès','بني عباس','Béni Abbès'),
(53,'53','In Salah','عين صالح','In Salah'),
(54,'54','In Guezzam','عين قزام','In Guezzam'),
(55,'55','Touggourt','تقرت','Touggourt'),
(56,'56','Djanet','جانت','Djanet'),
(57,'57','El M''Ghair','المغير','El M''Ghair'),
(58,'58','El Meniaa','المنيعة','El Meniaa');

CREATE TABLE communes (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  wilaya_id   TINYINT UNSIGNED NOT NULL,
  nom_fr      VARCHAR(80) NOT NULL,
  nom_ar      VARCHAR(80) NOT NULL,
  code_postal CHAR(5),
  INDEX idx_commune_wilaya (wilaya_id),
  FOREIGN KEY (wilaya_id) REFERENCES wilayas(id)
) ENGINE=InnoDB;

-- À compléter avec les ~1541 communes officielles APC.
-- Exemples Alger pour amorcer :
INSERT INTO communes (wilaya_id, nom_fr, nom_ar, code_postal) VALUES
(16,'Alger-Centre','الجزائر الوسطى','16000'),
(16,'Bab El Oued','باب الواد','16009'),
(16,'Hussein Dey','حسين داي','16040'),
(16,'El Harrach','الحراش','16011'),
(16,'Bir Mourad Raïs','بئر مراد رايس','16030'),
(16,'Hydra','حيدرة','16035'),
(16,'Kouba','القبة','16050'),
(16,'Bab Ezzouar','باب الزوار','16311'),
(16,'Chéraga','الشراقة','16002'),
(16,'Dély Ibrahim','دالي إبراهيم','16320'),
(31,'Oran','وهران','31000'),
(31,'Es Sénia','السانية','31100'),
(31,'Bir El Djir','بئر الجير','31130'),
(25,'Constantine','قسنطينة','25000'),
(25,'El Khroub','الخروب','25100'),
(23,'Annaba','عنابة','23000'),
(9 ,'Blida','البليدة','09000'),
(15,'Tizi Ouzou','تيزي وزو','15000'),
(6 ,'Béjaïa','بجاية','06000'),
(19,'Sétif','سطيف','19000');

-- =====================================================================
-- 2. SPÉCIALITÉS MÉDICALES
-- =====================================================================

CREATE TABLE specialites (
  id          SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code        VARCHAR(40)  NOT NULL UNIQUE,
  nom_fr      VARCHAR(100) NOT NULL,
  nom_ar      VARCHAR(100) NOT NULL,
  description_fr TEXT,
  description_ar TEXT,
  est_urgence BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE=InnoDB;

INSERT INTO specialites (code, nom_fr, nom_ar, description_fr, est_urgence) VALUES
('generaliste','Médecin généraliste','طبيب عام','Premier recours, diagnostic initial, suivi global du patient',FALSE),
('pediatrie','Pédiatrie','طب الأطفال','Santé de l''enfant de 0 à 15 ans',FALSE),
('cardiologie','Cardiologie','أمراض القلب','Cœur, vaisseaux, hypertension',FALSE),
('pneumologie','Pneumologie','أمراض الصدر','Poumons, bronches, asthme',FALSE),
('gastro','Gastro-entérologie','أمراض الجهاز الهضمي','Estomac, intestins, foie, pancréas',FALSE),
('hepato','Hépatologie','أمراض الكبد','Foie, voies biliaires',FALSE),
('endocrino','Endocrinologie / Diabétologie','الغدد الصماء والسكري','Hormones, diabète, thyroïde',FALSE),
('nephro','Néphrologie','أمراض الكلى','Reins, dialyse',FALSE),
('uro','Urologie','المسالك البولية','Voies urinaires, appareil génital masculin',FALSE),
('gyneco','Gynécologie-Obstétrique','أمراض النساء والتوليد','Santé féminine, grossesse, accouchement',FALSE),
('dermato','Dermatologie','الأمراض الجلدية','Peau, cheveux, ongles',FALSE),
('ophtalmo','Ophtalmologie','طب العيون','Yeux, vision',FALSE),
('orl','Oto-Rhino-Laryngologie (ORL)','أنف وأذن وحنجرة','Oreilles, nez, gorge',FALSE),
('stomato','Stomatologie','طب الفم','Bouche, lèvres, mâchoire',FALSE),
('dentiste','Chirurgien-dentiste','طبيب الأسنان','Dents et gencives',FALSE),
('neuro','Neurologie','طب الأعصاب','Cerveau, nerfs, moelle épinière',FALSE),
('neurochir','Neurochirurgie','جراحة الأعصاب','Chirurgie du système nerveux',FALSE),
('psy','Psychiatrie','الطب النفسي','Troubles mentaux et du comportement',FALSE),
('psycho','Psychologie clinique','علم النفس العيادي','Suivi psychothérapeutique',FALSE),
('rhumato','Rhumatologie','أمراض الروماتيزم','Articulations, os, muscles',FALSE),
('ortho','Orthopédie / Traumatologie','جراحة العظام','Os, fractures, ligaments',FALSE),
('chir_gen','Chirurgie générale','الجراحة العامة','Interventions chirurgicales générales',FALSE),
('chir_visc','Chirurgie viscérale','جراحة الأحشاء','Chirurgie abdominale',FALSE),
('chir_vasc','Chirurgie vasculaire','جراحة الأوعية','Veines et artères',FALSE),
('chir_card','Chirurgie cardiaque','جراحة القلب','Opérations cardiaques',FALSE),
('chir_plast','Chirurgie plastique et reconstructive','الجراحة التجميلية','Reconstruction et esthétique',FALSE),
('onco','Oncologie / Cancérologie','طب الأورام','Diagnostic et traitement des cancers',FALSE),
('hemato','Hématologie','أمراض الدم','Sang, moelle osseuse',FALSE),
('infectio','Infectiologie','الأمراض المعدية','Maladies infectieuses et tropicales',FALSE),
('allergo','Allergologie','الحساسية','Allergies respiratoires, alimentaires, cutanées',FALSE),
('immuno','Immunologie clinique','المناعة السريرية','Maladies auto-immunes',FALSE),
('geriatrie','Gériatrie','طب الشيخوخة','Santé de la personne âgée',FALSE),
('medphys','Médecine physique et réadaptation','الطب الفيزيائي وإعادة التأهيل','Rééducation fonctionnelle',FALSE),
('mednuc','Médecine nucléaire','الطب النووي','Imagerie isotopique, thérapie ciblée',FALSE),
('radio','Radiologie / Imagerie médicale','الأشعة','Échographie, scanner, IRM',FALSE),
('anapath','Anatomo-pathologie','علم التشريح المرضي','Analyse des prélèvements',FALSE),
('biologie','Biologie médicale','التحاليل الطبية','Analyses sanguines, microbiologie',FALSE),
('anesth','Anesthésie-Réanimation','التخدير والإنعاش','Anesthésie et soins intensifs',TRUE),
('urgences','Médecine d''urgence','طب الاستعجالات','Prise en charge urgente',TRUE),
('reanim','Réanimation médicale','الإنعاش الطبي','Soins critiques',TRUE),
('medtrav','Médecine du travail','طب العمل','Santé au travail',FALSE),
('medsport','Médecine du sport','طب الرياضة','Sportifs amateurs et professionnels',FALSE),
('nutrition','Nutrition / Diététique','التغذية','Alimentation et troubles nutritionnels',FALSE),
('addicto','Addictologie','علاج الإدمان','Tabac, alcool, drogues',FALSE),
('sexo','Sexologie','الطب الجنسي','Santé sexuelle',FALSE),
('odf','Orthodontie','تقويم الأسنان','Alignement dentaire',FALSE),
('audio','Audiologie','السمعيات','Audition, appareillage',FALSE),
('orthoptie','Orthoptie','تقويم البصر','Rééducation visuelle',FALSE),
('orthophonie','Orthophonie','تقويم النطق','Troubles du langage et de la parole',FALSE),
('kine','Kinésithérapie','العلاج الطبيعي','Rééducation motrice',FALSE),
('sagefemme','Sage-femme','القابلة','Suivi grossesse et accouchement normal',FALSE);

-- =====================================================================
-- 3. MÉDECINS
-- =====================================================================

CREATE TABLE medecins (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  num_ordre       VARCHAR(30)  UNIQUE COMMENT 'Numéro CNOM Algérie',
  civilite        ENUM('Dr','Pr','Dr.Pr') NOT NULL DEFAULT 'Dr',
  nom             VARCHAR(80)  NOT NULL,
  prenom          VARCHAR(80)  NOT NULL,
  genre           ENUM('H','F') DEFAULT NULL,
  specialite_id   SMALLINT UNSIGNED NOT NULL,
  est_conventionne BOOLEAN DEFAULT TRUE COMMENT 'Conventionné CNAS',
  secteur         ENUM('public','prive','militaire','mixte') NOT NULL DEFAULT 'prive',
  tarif_consultation_da DECIMAL(8,2) DEFAULT NULL,
  langues_parlees SET('francais','arabe','anglais','tamazight','espagnol') DEFAULT 'francais,arabe',

  -- Adresse
  wilaya_id       TINYINT UNSIGNED NOT NULL,
  commune_id      INT UNSIGNED,
  adresse_fr      VARCHAR(255) NOT NULL,
  adresse_ar      VARCHAR(255),
  latitude        DECIMAL(10,7),
  longitude       DECIMAL(10,7),

  -- Contact
  telephone_fixe  VARCHAR(20),
  telephone_mobile VARCHAR(20),
  whatsapp        VARCHAR(20),
  email           VARCHAR(120),
  site_web        VARCHAR(200),

  -- Statut plateforme
  accepte_rdv_en_ligne BOOLEAN DEFAULT FALSE,
  visite_domicile     BOOLEAN DEFAULT FALSE,
  teleconsultation    BOOLEAN DEFAULT FALSE,
  note_moyenne        DECIMAL(3,2) DEFAULT NULL,
  nb_avis             INT UNSIGNED DEFAULT 0,
  est_actif           BOOLEAN DEFAULT TRUE,
  date_inscription    DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (specialite_id) REFERENCES specialites(id),
  FOREIGN KEY (wilaya_id)     REFERENCES wilayas(id),
  FOREIGN KEY (commune_id)    REFERENCES communes(id),
  INDEX idx_med_specialite (specialite_id),
  INDEX idx_med_wilaya     (wilaya_id),
  INDEX idx_med_nom        (nom, prenom)
) ENGINE=InnoDB;

-- =====================================================================
-- 4. HORAIRES DE TRAVAIL
-- =====================================================================

CREATE TABLE horaires (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  medecin_id  INT UNSIGNED NOT NULL,
  jour        ENUM('samedi','dimanche','lundi','mardi','mercredi','jeudi','vendredi') NOT NULL,
  ouverture   TIME NOT NULL,
  fermeture   TIME NOT NULL,
  pause_debut TIME DEFAULT NULL,
  pause_fin   TIME DEFAULT NULL,
  sur_rdv     BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (medecin_id) REFERENCES medecins(id) ON DELETE CASCADE,
  INDEX idx_horaire_medecin (medecin_id, jour)
) ENGINE=InnoDB;

CREATE TABLE jours_feries (
  id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  date    DATE NOT NULL,
  nom_fr  VARCHAR(80) NOT NULL,
  nom_ar  VARCHAR(80) NOT NULL,
  UNIQUE KEY uk_jf_date (date)
) ENGINE=InnoDB;

INSERT INTO jours_feries (date, nom_fr, nom_ar) VALUES
('2026-01-01','Jour de l''An','رأس السنة الميلادية'),
('2026-01-12','Yennayer','يناير'),
('2026-05-01','Fête du Travail','عيد العمال'),
('2026-07-05','Fête de l''Indépendance','عيد الاستقلال'),
('2026-11-01','Fête de la Révolution','عيد الثورة');

-- =====================================================================
-- 5. CATÉGORIES DE SYMPTÔMES
-- =====================================================================

CREATE TABLE categories_symptomes (
  id      SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code    VARCHAR(40) NOT NULL UNIQUE,
  nom_fr  VARCHAR(80) NOT NULL,
  nom_ar  VARCHAR(80) NOT NULL,
  icone   VARCHAR(40)
) ENGINE=InnoDB;

INSERT INTO categories_symptomes (code, nom_fr, nom_ar, icone) VALUES
('general','Symptômes généraux','أعراض عامة','thermometer'),
('tete','Tête et neurologique','الرأس والأعصاب','brain'),
('oeil','Yeux','العيون','eye'),
('orl','ORL (nez, gorge, oreille)','أنف وأذن وحنجرة','ear'),
('dentaire','Bouche et dents','الفم والأسنان','tooth'),
('respiratoire','Respiratoire','الجهاز التنفسي','lungs'),
('cardio','Cardio-vasculaire','القلب والأوعية','heart'),
('digestif','Digestif','الجهاز الهضمي','stomach'),
('urinaire','Urinaire','الجهاز البولي','droplet'),
('genital_h','Génital masculin','الجهاز التناسلي الذكري','male'),
('genital_f','Génital féminin / Grossesse','الجهاز التناسلي الأنثوي','female'),
('peau','Peau','الجلد','skin'),
('musculo','Musculo-squelettique','العضلات والعظام','bone'),
('endocrino','Endocrinien / Métabolique','الغدد والاستقلاب','gland'),
('mental','Psychique','الصحة النفسية','mind'),
('enfant','Spécifique enfant','خاص بالطفل','baby'),
('urgence','Urgences vitales','حالات استعجالية','alert');

-- =====================================================================
-- 6. SYMPTÔMES
-- =====================================================================

CREATE TABLE symptomes (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code            VARCHAR(60) NOT NULL UNIQUE,
  categorie_id    SMALLINT UNSIGNED NOT NULL,
  nom_fr          VARCHAR(150) NOT NULL,
  nom_ar          VARCHAR(150) NOT NULL,
  description_fr  TEXT,
  description_ar  TEXT,
  mots_cles       TEXT COMMENT 'Synonymes/variantes pour la recherche du chatbot, séparés par virgule',
  gravite         ENUM('faible','moderee','elevee','urgence_vitale') NOT NULL DEFAULT 'moderee',
  age_min         TINYINT UNSIGNED DEFAULT 0,
  age_max         TINYINT UNSIGNED DEFAULT 120,
  genre_concerne  ENUM('tous','homme','femme') NOT NULL DEFAULT 'tous',
  conseil_general_fr TEXT,
  conseil_general_ar TEXT,
  FOREIGN KEY (categorie_id) REFERENCES categories_symptomes(id),
  INDEX idx_symp_cat (categorie_id),
  FULLTEXT idx_symp_search (nom_fr, mots_cles, description_fr)
) ENGINE=InnoDB;

-- =====================================================================
-- 7. MAPPING SYMPTÔME → SPÉCIALITÉ
-- Un symptôme peut orienter vers plusieurs spécialistes selon priorité
-- =====================================================================

CREATE TABLE symptome_specialite (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  symptome_id   INT UNSIGNED NOT NULL,
  specialite_id SMALLINT UNSIGNED NOT NULL,
  priorite      TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '1=premier recours, 2=si persistance, 3=si complication',
  condition_fr  VARCHAR(255) COMMENT 'Ex: "si fièvre > 39°C", "si > 7 jours"',
  condition_ar  VARCHAR(255),
  FOREIGN KEY (symptome_id)   REFERENCES symptomes(id) ON DELETE CASCADE,
  FOREIGN KEY (specialite_id) REFERENCES specialites(id),
  UNIQUE KEY uk_symp_spec (symptome_id, specialite_id, priorite)
) ENGINE=InnoDB;

-- =====================================================================
-- 8. SIGNES D'ALARME (red flags) qui transforment un symptôme en urgence
-- =====================================================================

CREATE TABLE drapeaux_rouges (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  symptome_id   INT UNSIGNED NOT NULL,
  signe_fr      VARCHAR(255) NOT NULL,
  signe_ar      VARCHAR(255) NOT NULL,
  action_fr     VARCHAR(255) NOT NULL DEFAULT 'Appeler immédiatement le 14 (SAMU) ou se rendre aux urgences',
  action_ar     VARCHAR(255) NOT NULL DEFAULT 'اتصل فورا بـ 14 أو توجه إلى الاستعجالات',
  FOREIGN KEY (symptome_id) REFERENCES symptomes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- 9. INSERTION DES SYMPTÔMES
-- =====================================================================

-- ------- Généraux -------
INSERT INTO symptomes (code,categorie_id,nom_fr,nom_ar,mots_cles,gravite,conseil_general_fr,conseil_general_ar) VALUES
('fievre',1,'Fièvre','حمى','température,chaud,frisson,hyperthermie,sokhouna','moderee','Hydratation, paracétamol selon poids, consulter si > 3 jours','اشرب الماء، خذ الباراسيتامول، استشر إذا تجاوزت 3 أيام'),
('fatigue',1,'Fatigue persistante','تعب مزمن','asthénie,épuisement,las,khamoul','faible','Repos, sommeil suffisant, bilan si > 2 semaines','الراحة والنوم الكافي، فحص إذا تجاوز أسبوعين'),
('perte_poids',1,'Perte de poids inexpliquée','فقدان الوزن غير المبرر','amaigrissement,maigreur','elevee','Consultation rapide pour bilan','استشارة سريعة لإجراء الفحوصات'),
('sueurs_nocturnes',1,'Sueurs nocturnes','تعرق ليلي','transpiration nuit','moderee','Bilan infectieux et endocrinien','فحص للعدوى والغدد'),
('malaise',1,'Malaise / lipothymie','إغماء خفيف','vertige,faiblesse,perte connaissance brève','elevee','S''allonger, surélever les jambes, consulter','استلق وارفع الساقين واستشر الطبيب'),
('frissons',1,'Frissons','رعشة','tremblement froid','moderee','Souvent associé à une infection','غالبا مرتبط بعدوى'),

-- ------- Tête / neuro -------
('cephalee',2,'Mal de tête','صداع','migraine,céphalée,sodaa','moderee','Repos, hydratation, antalgique simple','الراحة والإماهة ومسكن بسيط'),
('migraine',2,'Migraine','شقيقة','demi-tête,nausée lumière','moderee','Éviter lumière et bruit, traitement spécifique','تجنب الضوء والضجيج'),
('vertige',2,'Vertiges / sensation de tournis','دوار','dawkha,équilibre,étourdissement','moderee','Éviter mouvements brusques','تجنب الحركات المفاجئة'),
('convulsion',2,'Convulsions','تشنجات','crise,épilepsie','urgence_vitale','URGENCE - appeler le 14','حالة استعجال - اتصل بـ 14'),
('paralysie',2,'Paralysie / faiblesse d''un côté','شلل نصفي','hémiplégie,AVC,bouche tordue','urgence_vitale','URGENCE AVC - SAMU 14 immédiatement','جلطة دماغية - اتصل بـ 14 فورا'),
('trouble_parole',2,'Trouble soudain de la parole','اضطراب مفاجئ في الكلام','aphasie,dysarthrie,bouche tordue','urgence_vitale','URGENCE AVC - SAMU 14','جلطة دماغية - 14'),
('tremblements',2,'Tremblements','رعشة في اليدين','parkinson,main qui tremble','moderee','Bilan neurologique','فحص عصبي'),
('perte_memoire',2,'Troubles de la mémoire','اضطرابات الذاكرة','oubli,démence,alzheimer','moderee','Évaluation cognitive','تقييم إدراكي'),
('insomnie',2,'Insomnie','الأرق','sommeil,dormir,ne dors pas','faible','Hygiène de sommeil, éviter écrans','نظافة النوم وتجنب الشاشات'),
('engourdissement',2,'Engourdissement / fourmillements','تنميل','paresthésie,picotement','moderee','Bilan neurologique si persistant','فحص إذا استمر'),

-- ------- Yeux -------
('vision_floue',3,'Vision floue','رؤية ضبابية','flou,trouble vue','moderee','Consultation ophtalmologique','استشارة طبيب العيون'),
('oeil_rouge',3,'Œil rouge','احمرار العين','conjonctivite,inflammation oeil','moderee','Hygiène, ne pas frotter','نظافة وعدم الفرك'),
('douleur_oeil',3,'Douleur oculaire','ألم في العين','mal oeil','elevee','Consultation rapide','استشارة سريعة'),
('perte_vue_brutale',3,'Perte brutale de la vue','فقدان مفاجئ للبصر','aveugle soudain','urgence_vitale','URGENCE ophtalmologique','حالة استعجال'),
('larmoiement',3,'Larmoiement excessif','دمع زائد','yeux qui pleurent','faible','Vérifier allergies','تحقق من الحساسية'),
('diplopie',3,'Vision double','رؤية مزدوجة','deux images','elevee','Consultation urgente','استشارة عاجلة'),

-- ------- ORL -------
('mal_gorge',4,'Mal de gorge','التهاب الحلق','angine,gorge,gorja','faible','Boissons chaudes, miel','مشروبات دافئة وعسل'),
('toux',6,'Toux','سعال','toussotement,kahha','faible','Hydratation, sirop si besoin','الإماهة وشراب إذا لزم'),
('toux_sang',6,'Toux avec sang','سعال مع دم','hémoptysie,crachat sanglant','urgence_vitale','URGENCE','حالة استعجال'),
('nez_bouche',4,'Nez bouché / rhume','احتقان الأنف','rhinite,rhume,zoukam','faible','Lavage nasal sérum physiologique','غسل الأنف بالمصل الفيزيولوجي'),
('saignement_nez',4,'Saignement du nez','رعاف','épistaxis,nez qui saigne','moderee','Pencher tête en avant, comprimer','إمالة الرأس للأمام والضغط'),
('mal_oreille',4,'Douleur à l''oreille','ألم الأذن','otite,oreille','moderee','Consultation, ne rien introduire','استشارة وعدم إدخال أي شيء'),
('perte_audition',4,'Baisse de l''audition','نقص السمع','sourd,entendre mal','moderee','Bilan ORL et audiogramme','فحص أنف وأذن وحنجرة'),
('acouphenes',4,'Acouphènes / sifflements','طنين الأذن','bourdonnement oreille','moderee','Bilan ORL','فحص أنف وأذن'),
('voix_enrouée',4,'Voix enrouée','بحة في الصوت','dysphonie,enrouement','faible','Repos vocal, si > 3 semaines consulter','راحة الصوت، استشر إذا تجاوز 3 أسابيع'),
('vertige_rotatoire',4,'Vertige rotatoire','دوار دوراني','vertige ORL','moderee','Bilan ORL (vestibule)','فحص الأذن الداخلية'),

-- ------- Bouche / dents -------
('mal_dent',5,'Mal de dents','وجع الأسنان','carie,dent,denj','moderee','Antalgique, consultation dentaire','مسكن وزيارة طبيب الأسنان'),
('saignement_gencive',5,'Saignement des gencives','نزيف اللثة','gingivite','faible','Hygiène, brossage doux','نظافة الفم وفرشاة لينة'),
('aphtes',5,'Aphtes / ulcères buccaux','قرحة الفم','plaie bouche','faible','Bains de bouche, vitamines','مضمضات وفيتامينات'),
('mauvaise_haleine',5,'Mauvaise haleine','رائحة الفم الكريهة','halitose','faible','Hygiène, hydratation','نظافة الفم والإماهة'),
('abces_dentaire',5,'Abcès dentaire','خراج الأسنان','infection dent','elevee','Antibiotique et soin dentaire','مضاد حيوي وعلاج'),

-- ------- Respiratoire -------
('essoufflement',6,'Essoufflement / dyspnée','ضيق التنفس','manque air,souffle court','elevee','Consultation rapide','استشارة سريعة'),
('douleur_thoracique',7,'Douleur thoracique','ألم الصدر','poitrine,sader','urgence_vitale','URGENCE cardiaque possible - 14','احتمال أزمة قلبية - 14'),
('sifflement_respiratoire',6,'Sifflement respiratoire','صفير في التنفس','asthme,wheezing','moderee','Bilan asthme','فحص الربو'),
('crise_asthme',6,'Crise d''asthme','نوبة ربو','asthme aigu','urgence_vitale','Ventoline, urgences si pas d''amélioration','بخاخ، الاستعجالات إذا لم يتحسن'),
('expectorations',6,'Crachats / expectorations','بلغم','crachat,glaire','faible','Hydratation','الإماهة'),
('ronflement',6,'Ronflement / apnée du sommeil','شخير وانقطاع التنفس','sleep apnea','moderee','Polysomnographie','فحص نوم'),

-- ------- Cardio -------
('palpitations',7,'Palpitations','خفقان القلب','cœur rapide,tachycardie','moderee','ECG conseillé','تخطيط القلب'),
('htnsion',7,'Tension artérielle élevée','ارتفاع ضغط الدم','HTA,hypertension','elevee','Suivi cardiologique','متابعة عند طبيب القلب'),
('hypotension',7,'Tension basse','انخفاض ضغط الدم','tension faible','moderee','Hydratation, sel modéré','الإماهة والملح'),
('oedeme_jambes',7,'Œdème des jambes','تورم الساقين','jambes enflées','moderee','Bilan cardio/veineux','فحص القلب والأوردة'),
('douleur_mollet',7,'Douleur du mollet (suspicion phlébite)','ألم الساق','phlébite,TVP','elevee','Consultation urgente, ne pas masser','استشارة عاجلة وعدم التدليك'),

-- ------- Digestif -------
('douleur_abdo',8,'Douleur abdominale','ألم في البطن','mal ventre,karch','moderee','Selon localisation et intensité','حسب المكان والشدة'),
('nausees',8,'Nausées','غثيان','envie de vomir','faible','Hydratation, repas légers','إماهة ووجبات خفيفة'),
('vomissements',8,'Vomissements','تقيؤ','vomir','moderee','Hydratation orale fractionnée','إماهة فموية مجزأة'),
('diarrhee',8,'Diarrhée','إسهال','selles liquides','moderee','SRO, hydratation, consultation si > 3 jours','محلول الإماهة، استشارة إذا تجاوز 3 أيام'),
('constipation',8,'Constipation','إمساك','pas selles','faible','Fibres, hydratation, activité','ألياف وماء ونشاط'),
('sang_selles',8,'Sang dans les selles','دم في البراز','rectorragie,méléna','elevee','Consultation gastro rapide','استشارة هضمية سريعة'),
('brulures_estomac',8,'Brûlures d''estomac','حرقة المعدة','reflux,pyrosis','faible','Éviter épices, IPP si récidive','تجنب التوابل'),
('ballonnements',8,'Ballonnements','انتفاخ','gaz,ventre gonflé','faible','Régime adapté','نظام غذائي مناسب'),
('jaunisse',8,'Jaunisse (peau/yeux jaunes)','يرقان','ictère,safra','elevee','Bilan hépatique urgent','فحص الكبد عاجل'),
('perte_appetit',8,'Perte d''appétit','فقدان الشهية','anorexie','moderee','Si persistant, bilan','إذا استمر، فحص'),

-- ------- Urinaire -------
('brulure_miction',9,'Brûlure en urinant','حرقان البول','cystite,IU','moderee','Hydratation, ECBU, antibiotique si confirmé','إماهة وتحاليل وعلاج إذا لزم'),
('sang_urines',9,'Sang dans les urines','دم في البول','hématurie','elevee','Consultation urologique','استشارة المسالك البولية'),
('mictions_freq',9,'Envies fréquentes d''uriner','تكرر التبول','pollakiurie','moderee','Bilan urinaire','فحص بولي'),
('retention_urine',9,'Impossibilité d''uriner','انحباس البول','rétention aiguë','urgence_vitale','URGENCE','حالة استعجال'),
('douleur_lombaire',9,'Douleur lombaire (rein)','ألم الكلى','colique néphrétique,calcul rénal','elevee','Antalgique, consultation','مسكن واستشارة'),
('incontinence',9,'Incontinence urinaire','سلس البول','fuites urinaires','moderee','Bilan uro/gynécologique','فحص'),

-- ------- Génital homme -------
('douleur_testicule',10,'Douleur testiculaire','ألم الخصية','testicule,bourse','elevee','Consultation urgente (torsion?)','استشارة عاجلة'),
('trouble_erection',10,'Trouble de l''érection','ضعف الانتصاب','impuissance,DE','moderee','Bilan andrologique','فحص'),
('ecoulement_urethral',10,'Écoulement urétral','إفرازات','MST,IST','elevee','IST possible, consultation','احتمال عدوى منقولة جنسيا'),
('hypertrophie_prostate',10,'Difficultés urinaires homme âgé','صعوبات بولية','prostate,jet faible','moderee','Bilan urologique','فحص'),

-- ------- Gynéco -------
('retard_regles',11,'Retard de règles','تأخر الدورة','aménorrhée,grossesse','moderee','Test de grossesse','اختبار حمل'),
('saignement_anormal',11,'Saignements anormaux','نزيف غير طبيعي','métrorragie','elevee','Consultation gynécologique','استشارة'),
('douleur_regles',11,'Règles douloureuses','ألم الدورة','dysménorrhée','faible','Antalgique, bouillotte','مسكن'),
('pertes_anormales',11,'Pertes vaginales anormales','إفرازات مهبلية غير طبيعية','leucorrhée,mycose','moderee','Consultation','استشارة'),
('grossesse',11,'Suivi de grossesse','متابعة الحمل','enceinte,hamel','faible','Suivi mensuel','متابعة شهرية'),
('contractions_grossesse',11,'Contractions / saignement enceinte','تقلصات أو نزيف حامل','grossesse risque','urgence_vitale','URGENCE maternité','حالة استعجال'),
('bouffees_chaleur',11,'Bouffées de chaleur (ménopause)','هبات حر','ménopause','faible','THS si nécessaire','علاج إذا لزم'),
('mastodynie',11,'Douleur des seins','ألم الثدي','sein,mastite','moderee','Examen sénologique','فحص الثدي'),
('boule_sein',11,'Boule au sein','كتلة في الثدي','nodule sein','elevee','Consultation rapide','استشارة سريعة'),

-- ------- Peau -------
('eruption_cutanee',12,'Éruption cutanée','طفح جلدي','boutons,rash','moderee','Éviter grattage, consultation','تجنب الحك واستشارة'),
('demangeaisons',12,'Démangeaisons','حكة','prurit,hak','faible','Éviter savons agressifs','تجنب الصابون القوي'),
('urticaire',12,'Urticaire','شرى','plaques,allergie peau','moderee','Antihistaminique','مضاد للهيستامين'),
('acne',12,'Acné','حب الشباب','boutons visage','faible','Hygiène douce','نظافة لطيفة'),
('eczema',12,'Eczéma','إكزيما','peau sèche rouge','faible','Émollients','مرطبات'),
('mycose',12,'Mycose (champignon)','فطريات','candidose','faible','Antifongique','مضاد للفطريات'),
('chute_cheveux',12,'Chute de cheveux','تساقط الشعر','alopécie','faible','Bilan ferritine, thyroïde','فحص'),
('grain_beaute',12,'Grain de beauté suspect','شامة مشبوهة','mélanome,nævus','elevee','Dermatologue rapide','طبيب جلدية سريعا'),
('plaie_infectee',12,'Plaie infectée','جرح ملتهب','infection peau','moderee','Désinfection, antibiotique si besoin','تطهير'),
('brulure',12,'Brûlure','حرق','brûlure cutanée','moderee','Refroidir 15 min eau froide','تبريد بالماء البارد 15 دقيقة'),
('zona',12,'Zona','الحزام الناري','herpes zoster','moderee','Antiviral précoce','مضاد فيروسي مبكر'),

-- ------- Musculo -------
('mal_dos',13,'Mal de dos','ألم الظهر','lombalgie,dos','faible','Repos relatif, antalgique','راحة نسبية ومسكن'),
('mal_cou',13,'Douleur cervicale','ألم الرقبة','torticolis,cou','faible','Repos, chaleur','راحة وحرارة'),
('mal_genou',13,'Douleur du genou','ألم الركبة','gonalgie','moderee','Repos, glace','راحة وثلج'),
('mal_epaule',13,'Douleur d''épaule','ألم الكتف','épaule','moderee','Kiné, anti-inflammatoire','علاج طبيعي'),
('entorse',13,'Entorse','التواء','foulure','moderee','Glace, contention','ثلج وتثبيت'),
('fracture',13,'Suspicion de fracture','احتمال كسر','os cassé','elevee','Immobilisation, urgences','تثبيت واستعجالات'),
('arthrose',13,'Douleurs articulaires chroniques','آلام مفصلية مزمنة','arthrose,rhumatisme','moderee','Rhumatologue','طبيب الروماتيزم'),
('gonflement_articulaire',13,'Articulation gonflée','تورم المفصل','arthrite','elevee','Bilan rhumato urgent','فحص عاجل'),
('crampes',13,'Crampes musculaires','تشنج عضلي','crampe','faible','Hydratation, magnésium','إماهة ومغنيسيوم'),
('sciatique',13,'Sciatique','عرق النسا','sciatalgie','moderee','Antalgique, kiné','مسكن وعلاج طبيعي'),

-- ------- Endocrino -------
('soif_intense',14,'Soif intense + urines abondantes','عطش شديد','polyurie polydipsie,diabète','elevee','Glycémie urgente','فحص السكر عاجل'),
('hypoglycemie',14,'Malaise hypoglycémique','نقص السكر','sucre bas','elevee','Sucre rapide oral','سكر سريع'),
('goitre',14,'Gonflement du cou (thyroïde)','تضخم الغدة الدرقية','goitre,thyroïde','moderee','Bilan thyroïdien','فحص الغدة الدرقية'),
('prise_poids',14,'Prise de poids rapide','زيادة الوزن السريعة','obésité','moderee','Bilan endocrinien','فحص الغدد'),

-- ------- Mental -------
('anxiete',15,'Anxiété / angoisse','قلق','stress,angoisse','moderee','Relaxation, soutien psychologique','الاسترخاء ودعم نفسي'),
('depression',15,'Tristesse persistante / dépression','اكتئاب','dépression,triste','elevee','Consultation psy','استشارة نفسية'),
('idees_suicidaires',15,'Idées suicidaires','أفكار انتحارية','suicide','urgence_vitale','URGENCE psychiatrique - 14','حالة استعجال نفسية - 14'),
('attaque_panique',15,'Attaque de panique','نوبة هلع','panique','moderee','Respiration lente','تنفس بطيء'),
('addiction',15,'Dépendance (alcool/tabac/drogues)','إدمان','addiction','elevee','Addictologue','طبيب الإدمان'),
('trouble_alimentaire',15,'Trouble du comportement alimentaire','اضطراب الأكل','anorexie,boulimie','elevee','Consultation','استشارة'),

-- ------- Enfant -------
('pleurs_bebe',16,'Pleurs persistants nourrisson','بكاء الرضيع','bébé pleure','moderee','Vérifier faim, couche, fièvre','تحقق من الجوع والحفاض والحمى'),
('fievre_bebe',16,'Fièvre nourrisson < 3 mois','حمى رضيع أقل من 3 أشهر','bébé fièvre','urgence_vitale','URGENCE pédiatrique','استعجال طب أطفال'),
('refus_aliment_bebe',16,'Refus alimentaire bébé','رفض الأكل','bébé ne mange pas','moderee','Pédiatre','طبيب أطفال'),
('retard_croissance',16,'Retard de croissance','تأخر النمو','enfant petit','moderee','Pédiatre','طبيب أطفال'),
('eruption_enfant',16,'Éruption + fièvre chez enfant','طفح مع حمى','varicelle,rougeole','moderee','Pédiatre','طبيب أطفال'),
('toux_aboyante_enfant',16,'Toux aboyante (laryngite)','سعال نباحي','laryngite enfant','elevee','Pédiatre/urgences','طبيب أطفال'),

-- ------- Urgences -------
('arret_cardiaque',17,'Inconscience + pas de respiration','فقدان الوعي وتوقف التنفس','arrêt cardiaque,RCP','urgence_vitale','RCP + 14','إنعاش + 14'),
('etouffement',17,'Étouffement / corps étranger','اختناق','choking','urgence_vitale','Heimlich + 14','هايمليك + 14'),
('intoxication',17,'Intoxication / empoisonnement','تسمم','poison','urgence_vitale','Centre antipoison + 14','مركز السموم + 14'),
('hemorragie',17,'Hémorragie importante','نزيف غزير','saignement abondant','urgence_vitale','Compression + 14','ضغط + 14'),
('accident_route',17,'Traumatisme grave','صدمة شديدة','accident','urgence_vitale','Ne pas mobiliser + 14','عدم التحريك + 14'),
('brulure_etendue',17,'Brûlure étendue','حرق واسع','grand brûlé','urgence_vitale','Refroidir + 14','تبريد + 14'),
('reaction_allergique',17,'Choc anaphylactique','صدمة تحسسية','allergie grave,anaphylaxie','urgence_vitale','Adrénaline + 14','أدرينالين + 14');

-- =====================================================================
-- 10. MAPPING SYMPTÔME → SPÉCIALITÉ
-- =====================================================================

-- Helper : on récupère les IDs par code
-- Priorité 1 = à consulter en premier
-- Priorité 2 = si symptôme persiste ou s'aggrave
-- Priorité 3 = en cas de complication / référence spécialisée

INSERT INTO symptome_specialite (symptome_id, specialite_id, priorite, condition_fr, condition_ar)
SELECT s.id, sp.id, m.priorite, m.cond_fr, m.cond_ar
FROM symptomes s
JOIN (
  -- (code_symptome, code_specialite, priorite, condition_fr, condition_ar)
  SELECT 'fievre' AS cs,'generaliste' AS csp,1 AS priorite,NULL AS cond_fr,NULL AS cond_ar UNION ALL
  SELECT 'fievre','infectio',2,'si > 5 jours ou voyage récent','إذا تجاوزت 5 أيام' UNION ALL
  SELECT 'fievre','pediatrie',1,'enfant < 15 ans','طفل أقل من 15 سنة' UNION ALL
  SELECT 'fatigue','generaliste',1,NULL,NULL UNION ALL
  SELECT 'fatigue','endocrino',2,'si associée à prise/perte de poids','مرتبط بتغير الوزن' UNION ALL
  SELECT 'fatigue','hemato',2,'si pâleur ou essoufflement','شحوب أو ضيق نفس' UNION ALL
  SELECT 'perte_poids','generaliste',1,NULL,NULL UNION ALL
  SELECT 'perte_poids','onco',2,'bilan oncologique','فحص أورام' UNION ALL
  SELECT 'perte_poids','endocrino',2,NULL,NULL UNION ALL
  SELECT 'sueurs_nocturnes','generaliste',1,NULL,NULL UNION ALL
  SELECT 'sueurs_nocturnes','infectio',2,'tuberculose à éliminer','استبعاد السل' UNION ALL
  SELECT 'sueurs_nocturnes','hemato',2,'lymphome à éliminer','استبعاد ليمفوما' UNION ALL
  SELECT 'malaise','generaliste',1,NULL,NULL UNION ALL
  SELECT 'malaise','cardio',2,'si répété ou effort','إذا تكرر' UNION ALL
  SELECT 'malaise','neuro',2,NULL,NULL UNION ALL
  SELECT 'frissons','generaliste',1,NULL,NULL UNION ALL

  SELECT 'cephalee','generaliste',1,NULL,NULL UNION ALL
  SELECT 'cephalee','neuro',2,'si chronique ou intense','مزمن أو شديد' UNION ALL
  SELECT 'cephalee','ophtalmo',3,'si troubles visuels','اضطراب الرؤية' UNION ALL
  SELECT 'migraine','neuro',1,NULL,NULL UNION ALL
  SELECT 'vertige','generaliste',1,NULL,NULL UNION ALL
  SELECT 'vertige','orl',2,NULL,NULL UNION ALL
  SELECT 'vertige','neuro',3,NULL,NULL UNION ALL
  SELECT 'convulsion','urgences',1,NULL,NULL UNION ALL
  SELECT 'convulsion','neuro',2,NULL,NULL UNION ALL
  SELECT 'paralysie','urgences',1,NULL,NULL UNION ALL
  SELECT 'paralysie','neuro',2,NULL,NULL UNION ALL
  SELECT 'trouble_parole','urgences',1,NULL,NULL UNION ALL
  SELECT 'trouble_parole','neuro',2,NULL,NULL UNION ALL
  SELECT 'tremblements','neuro',1,NULL,NULL UNION ALL
  SELECT 'perte_memoire','neuro',1,NULL,NULL UNION ALL
  SELECT 'perte_memoire','psy',2,NULL,NULL UNION ALL
  SELECT 'perte_memoire','geriatrie',2,'sujet âgé','مسن' UNION ALL
  SELECT 'insomnie','generaliste',1,NULL,NULL UNION ALL
  SELECT 'insomnie','psy',2,NULL,NULL UNION ALL
  SELECT 'engourdissement','neuro',1,NULL,NULL UNION ALL

  SELECT 'vision_floue','ophtalmo',1,NULL,NULL UNION ALL
  SELECT 'oeil_rouge','ophtalmo',1,NULL,NULL UNION ALL
  SELECT 'douleur_oeil','ophtalmo',1,NULL,NULL UNION ALL
  SELECT 'perte_vue_brutale','urgences',1,NULL,NULL UNION ALL
  SELECT 'perte_vue_brutale','ophtalmo',1,NULL,NULL UNION ALL
  SELECT 'larmoiement','ophtalmo',1,NULL,NULL UNION ALL
  SELECT 'diplopie','ophtalmo',1,NULL,NULL UNION ALL
  SELECT 'diplopie','neuro',2,NULL,NULL UNION ALL

  SELECT 'mal_gorge','generaliste',1,NULL,NULL UNION ALL
  SELECT 'mal_gorge','orl',2,'si récidivant','إذا تكرر' UNION ALL
  SELECT 'toux','generaliste',1,NULL,NULL UNION ALL
  SELECT 'toux','pneumologie',2,'si > 3 semaines','إذا تجاوز 3 أسابيع' UNION ALL
  SELECT 'toux_sang','urgences',1,NULL,NULL UNION ALL
  SELECT 'toux_sang','pneumologie',2,NULL,NULL UNION ALL
  SELECT 'nez_bouche','generaliste',1,NULL,NULL UNION ALL
  SELECT 'nez_bouche','orl',2,'si chronique','إذا مزمن' UNION ALL
  SELECT 'nez_bouche','allergo',3,NULL,NULL UNION ALL
  SELECT 'saignement_nez','orl',1,NULL,NULL UNION ALL
  SELECT 'mal_oreille','orl',1,NULL,NULL UNION ALL
  SELECT 'mal_oreille','pediatrie',1,'enfant','طفل' UNION ALL
  SELECT 'perte_audition','orl',1,NULL,NULL UNION ALL
  SELECT 'perte_audition','audio',2,NULL,NULL UNION ALL
  SELECT 'acouphenes','orl',1,NULL,NULL UNION ALL
  SELECT 'voix_enrouée','orl',1,NULL,NULL UNION ALL
  SELECT 'vertige_rotatoire','orl',1,NULL,NULL UNION ALL

  SELECT 'mal_dent','dentiste',1,NULL,NULL UNION ALL
  SELECT 'mal_dent','stomato',2,NULL,NULL UNION ALL
  SELECT 'saignement_gencive','dentiste',1,NULL,NULL UNION ALL
  SELECT 'aphtes','dentiste',1,NULL,NULL UNION ALL
  SELECT 'aphtes','stomato',2,NULL,NULL UNION ALL
  SELECT 'mauvaise_haleine','dentiste',1,NULL,NULL UNION ALL
  SELECT 'abces_dentaire','dentiste',1,NULL,NULL UNION ALL
  SELECT 'abces_dentaire','stomato',2,NULL,NULL UNION ALL

  SELECT 'essoufflement','generaliste',1,NULL,NULL UNION ALL
  SELECT 'essoufflement','pneumologie',2,NULL,NULL UNION ALL
  SELECT 'essoufflement','cardio',2,NULL,NULL UNION ALL
  SELECT 'douleur_thoracique','urgences',1,NULL,NULL UNION ALL
  SELECT 'douleur_thoracique','cardio',2,NULL,NULL UNION ALL
  SELECT 'sifflement_respiratoire','pneumologie',1,NULL,NULL UNION ALL
  SELECT 'sifflement_respiratoire','allergo',2,NULL,NULL UNION ALL
  SELECT 'crise_asthme','urgences',1,NULL,NULL UNION ALL
  SELECT 'crise_asthme','pneumologie',2,NULL,NULL UNION ALL
  SELECT 'expectorations','generaliste',1,NULL,NULL UNION ALL
  SELECT 'expectorations','pneumologie',2,NULL,NULL UNION ALL
  SELECT 'ronflement','orl',1,NULL,NULL UNION ALL
  SELECT 'ronflement','pneumologie',2,NULL,NULL UNION ALL

  SELECT 'palpitations','cardio',1,NULL,NULL UNION ALL
  SELECT 'htnsion','cardio',1,NULL,NULL UNION ALL
  SELECT 'htnsion','generaliste',1,NULL,NULL UNION ALL
  SELECT 'hypotension','generaliste',1,NULL,NULL UNION ALL
  SELECT 'hypotension','cardio',2,NULL,NULL UNION ALL
  SELECT 'oedeme_jambes','cardio',1,NULL,NULL UNION ALL
  SELECT 'oedeme_jambes','nephro',2,NULL,NULL UNION ALL
  SELECT 'oedeme_jambes','chir_vasc',2,NULL,NULL UNION ALL
  SELECT 'douleur_mollet','urgences',1,NULL,NULL UNION ALL
  SELECT 'douleur_mollet','chir_vasc',2,NULL,NULL UNION ALL

  SELECT 'douleur_abdo','generaliste',1,NULL,NULL UNION ALL
  SELECT 'douleur_abdo','gastro',2,NULL,NULL UNION ALL
  SELECT 'douleur_abdo','chir_visc',3,'si suspicion chirurgicale','احتمال جراحة' UNION ALL
  SELECT 'douleur_abdo','gyneco',2,'femme','للمرأة' UNION ALL
  SELECT 'nausees','generaliste',1,NULL,NULL UNION ALL
  SELECT 'vomissements','generaliste',1,NULL,NULL UNION ALL
  SELECT 'vomissements','gastro',2,NULL,NULL UNION ALL
  SELECT 'vomissements','pediatrie',1,'enfant','طفل' UNION ALL
  SELECT 'diarrhee','generaliste',1,NULL,NULL UNION ALL
  SELECT 'diarrhee','gastro',2,NULL,NULL UNION ALL
  SELECT 'diarrhee','infectio',2,'voyage récent','سفر حديث' UNION ALL
  SELECT 'constipation','generaliste',1,NULL,NULL UNION ALL
  SELECT 'constipation','gastro',2,NULL,NULL UNION ALL
  SELECT 'sang_selles','gastro',1,NULL,NULL UNION ALL
  SELECT 'sang_selles','chir_visc',2,NULL,NULL UNION ALL
  SELECT 'brulures_estomac','generaliste',1,NULL,NULL UNION ALL
  SELECT 'brulures_estomac','gastro',2,NULL,NULL UNION ALL
  SELECT 'ballonnements','generaliste',1,NULL,NULL UNION ALL
  SELECT 'ballonnements','gastro',2,NULL,NULL UNION ALL
  SELECT 'jaunisse','hepato',1,NULL,NULL UNION ALL
  SELECT 'jaunisse','gastro',1,NULL,NULL UNION ALL
  SELECT 'perte_appetit','generaliste',1,NULL,NULL UNION ALL

  SELECT 'brulure_miction','generaliste',1,NULL,NULL UNION ALL
  SELECT 'brulure_miction','uro',2,NULL,NULL UNION ALL
  SELECT 'brulure_miction','gyneco',2,'femme','للمرأة' UNION ALL
  SELECT 'sang_urines','uro',1,NULL,NULL UNION ALL
  SELECT 'mictions_freq','uro',1,NULL,NULL UNION ALL
  SELECT 'mictions_freq','endocrino',2,'diabète?','احتمال سكري' UNION ALL
  SELECT 'retention_urine','urgences',1,NULL,NULL UNION ALL
  SELECT 'retention_urine','uro',2,NULL,NULL UNION ALL
  SELECT 'douleur_lombaire','uro',1,NULL,NULL UNION ALL
  SELECT 'douleur_lombaire','nephro',2,NULL,NULL UNION ALL
  SELECT 'incontinence','uro',1,NULL,NULL UNION ALL
  SELECT 'incontinence','gyneco',1,'femme','للمرأة' UNION ALL

  SELECT 'douleur_testicule','urgences',1,NULL,NULL UNION ALL
  SELECT 'douleur_testicule','uro',1,NULL,NULL UNION ALL
  SELECT 'trouble_erection','uro',1,NULL,NULL UNION ALL
  SELECT 'trouble_erection','sexo',2,NULL,NULL UNION ALL
  SELECT 'trouble_erection','endocrino',3,NULL,NULL UNION ALL
  SELECT 'ecoulement_urethral','uro',1,NULL,NULL UNION ALL
  SELECT 'ecoulement_urethral','infectio',2,NULL,NULL UNION ALL
  SELECT 'hypertrophie_prostate','uro',1,NULL,NULL UNION ALL

  SELECT 'retard_regles','gyneco',1,NULL,NULL UNION ALL
  SELECT 'retard_regles','sagefemme',1,NULL,NULL UNION ALL
  SELECT 'saignement_anormal','gyneco',1,NULL,NULL UNION ALL
  SELECT 'douleur_regles','gyneco',1,NULL,NULL UNION ALL
  SELECT 'pertes_anormales','gyneco',1,NULL,NULL UNION ALL
  SELECT 'grossesse','gyneco',1,NULL,NULL UNION ALL
  SELECT 'grossesse','sagefemme',1,NULL,NULL UNION ALL
  SELECT 'contractions_grossesse','urgences',1,NULL,NULL UNION ALL
  SELECT 'contractions_grossesse','gyneco',1,NULL,NULL UNION ALL
  SELECT 'bouffees_chaleur','gyneco',1,NULL,NULL UNION ALL
  SELECT 'bouffees_chaleur','endocrino',2,NULL,NULL UNION ALL
  SELECT 'mastodynie','gyneco',1,NULL,NULL UNION ALL
  SELECT 'boule_sein','gyneco',1,NULL,NULL UNION ALL
  SELECT 'boule_sein','onco',2,NULL,NULL UNION ALL

  SELECT 'eruption_cutanee','dermato',1,NULL,NULL UNION ALL
  SELECT 'eruption_cutanee','generaliste',1,NULL,NULL UNION ALL
  SELECT 'demangeaisons','dermato',1,NULL,NULL UNION ALL
  SELECT 'urticaire','dermato',1,NULL,NULL UNION ALL
  SELECT 'urticaire','allergo',2,NULL,NULL UNION ALL
  SELECT 'acne','dermato',1,NULL,NULL UNION ALL
  SELECT 'eczema','dermato',1,NULL,NULL UNION ALL
  SELECT 'eczema','allergo',2,NULL,NULL UNION ALL
  SELECT 'mycose','dermato',1,NULL,NULL UNION ALL
  SELECT 'chute_cheveux','dermato',1,NULL,NULL UNION ALL
  SELECT 'chute_cheveux','endocrino',2,NULL,NULL UNION ALL
  SELECT 'grain_beaute','dermato',1,NULL,NULL UNION ALL
  SELECT 'grain_beaute','onco',2,NULL,NULL UNION ALL
  SELECT 'plaie_infectee','generaliste',1,NULL,NULL UNION ALL
  SELECT 'plaie_infectee','dermato',2,NULL,NULL UNION ALL
  SELECT 'brulure','urgences',1,'2e/3e degré','من الدرجة 2 أو 3' UNION ALL
  SELECT 'brulure','generaliste',1,'1er degré','الدرجة 1' UNION ALL
  SELECT 'zona','dermato',1,NULL,NULL UNION ALL
  SELECT 'zona','generaliste',1,NULL,NULL UNION ALL

  SELECT 'mal_dos','generaliste',1,NULL,NULL UNION ALL
  SELECT 'mal_dos','rhumato',2,NULL,NULL UNION ALL
  SELECT 'mal_dos','ortho',2,NULL,NULL UNION ALL
  SELECT 'mal_dos','kine',2,NULL,NULL UNION ALL
  SELECT 'mal_cou','generaliste',1,NULL,NULL UNION ALL
  SELECT 'mal_cou','rhumato',2,NULL,NULL UNION ALL
  SELECT 'mal_genou','ortho',1,NULL,NULL UNION ALL
  SELECT 'mal_genou','rhumato',2,NULL,NULL UNION ALL
  SELECT 'mal_epaule','ortho',1,NULL,NULL UNION ALL
  SELECT 'mal_epaule','rhumato',2,NULL,NULL UNION ALL
  SELECT 'entorse','ortho',1,NULL,NULL UNION ALL
  SELECT 'entorse','urgences',1,NULL,NULL UNION ALL
  SELECT 'fracture','urgences',1,NULL,NULL UNION ALL
  SELECT 'fracture','ortho',2,NULL,NULL UNION ALL
  SELECT 'arthrose','rhumato',1,NULL,NULL UNION ALL
  SELECT 'arthrose','ortho',2,NULL,NULL UNION ALL
  SELECT 'gonflement_articulaire','rhumato',1,NULL,NULL UNION ALL
  SELECT 'gonflement_articulaire','urgences',1,'fièvre associée','مع حمى' UNION ALL
  SELECT 'crampes','generaliste',1,NULL,NULL UNION ALL
  SELECT 'sciatique','generaliste',1,NULL,NULL UNION ALL
  SELECT 'sciatique','rhumato',2,NULL,NULL UNION ALL
  SELECT 'sciatique','neurochir',3,NULL,NULL UNION ALL

  SELECT 'soif_intense','generaliste',1,NULL,NULL UNION ALL
  SELECT 'soif_intense','endocrino',2,NULL,NULL UNION ALL
  SELECT 'hypoglycemie','urgences',1,NULL,NULL UNION ALL
  SELECT 'hypoglycemie','endocrino',2,NULL,NULL UNION ALL
  SELECT 'goitre','endocrino',1,NULL,NULL UNION ALL
  SELECT 'prise_poids','endocrino',1,NULL,NULL UNION ALL
  SELECT 'prise_poids','nutrition',1,NULL,NULL UNION ALL

  SELECT 'anxiete','psycho',1,NULL,NULL UNION ALL
  SELECT 'anxiete','psy',2,NULL,NULL UNION ALL
  SELECT 'depression','psy',1,NULL,NULL UNION ALL
  SELECT 'depression','psycho',1,NULL,NULL UNION ALL
  SELECT 'idees_suicidaires','urgences',1,NULL,NULL UNION ALL
  SELECT 'idees_suicidaires','psy',1,NULL,NULL UNION ALL
  SELECT 'attaque_panique','psy',1,NULL,NULL UNION ALL
  SELECT 'attaque_panique','psycho',1,NULL,NULL UNION ALL
  SELECT 'addiction','addicto',1,NULL,NULL UNION ALL
  SELECT 'addiction','psy',2,NULL,NULL UNION ALL
  SELECT 'trouble_alimentaire','psy',1,NULL,NULL UNION ALL
  SELECT 'trouble_alimentaire','nutrition',2,NULL,NULL UNION ALL

  SELECT 'pleurs_bebe','pediatrie',1,NULL,NULL UNION ALL
  SELECT 'fievre_bebe','urgences',1,NULL,NULL UNION ALL
  SELECT 'fievre_bebe','pediatrie',1,NULL,NULL UNION ALL
  SELECT 'refus_aliment_bebe','pediatrie',1,NULL,NULL UNION ALL
  SELECT 'retard_croissance','pediatrie',1,NULL,NULL UNION ALL
  SELECT 'retard_croissance','endocrino',2,NULL,NULL UNION ALL
  SELECT 'eruption_enfant','pediatrie',1,NULL,NULL UNION ALL
  SELECT 'eruption_enfant','dermato',2,NULL,NULL UNION ALL
  SELECT 'toux_aboyante_enfant','urgences',1,NULL,NULL UNION ALL
  SELECT 'toux_aboyante_enfant','pediatrie',1,NULL,NULL UNION ALL

  SELECT 'arret_cardiaque','urgences',1,NULL,NULL UNION ALL
  SELECT 'etouffement','urgences',1,NULL,NULL UNION ALL
  SELECT 'intoxication','urgences',1,NULL,NULL UNION ALL
  SELECT 'hemorragie','urgences',1,NULL,NULL UNION ALL
  SELECT 'accident_route','urgences',1,NULL,NULL UNION ALL
  SELECT 'brulure_etendue','urgences',1,NULL,NULL UNION ALL
  SELECT 'reaction_allergique','urgences',1,NULL,NULL UNION ALL
  SELECT 'reaction_allergique','allergo',2,NULL,NULL
) AS m ON m.cs = s.code
JOIN specialites sp ON sp.code = m.csp;

-- =====================================================================
-- 11. DRAPEAUX ROUGES (à détecter par le chatbot)
-- =====================================================================

INSERT INTO drapeaux_rouges (symptome_id, signe_fr, signe_ar)
SELECT s.id, d.signe_fr, d.signe_ar FROM symptomes s JOIN (
  SELECT 'cephalee' AS cs,'Mal de tête brutal "en coup de tonnerre"' AS signe_fr,'صداع مفاجئ شديد جدا' AS signe_ar UNION ALL
  SELECT 'cephalee','Mal de tête + fièvre + raideur de la nuque','صداع مع حمى وتيبس الرقبة' UNION ALL
  SELECT 'cephalee','Mal de tête + vomissements + trouble de la conscience','صداع مع تقيؤ واضطراب الوعي' UNION ALL
  SELECT 'douleur_thoracique','Douleur > 20 minutes irradiant bras gauche/mâchoire','ألم يستمر أكثر من 20 دقيقة وينتشر للذراع الأيسر' UNION ALL
  SELECT 'douleur_thoracique','Douleur + sueurs + essoufflement','ألم مع تعرق وضيق نفس' UNION ALL
  SELECT 'douleur_abdo','Ventre dur, douloureux, fièvre','بطن صلب مع ألم وحمى' UNION ALL
  SELECT 'douleur_abdo','Douleur abdo + arrêt des matières et gaz','ألم بطن مع انسداد' UNION ALL
  SELECT 'fievre','Fièvre + raideur de nuque + photophobie','حمى مع تيبس الرقبة' UNION ALL
  SELECT 'fievre','Fièvre + purpura (taches violettes)','حمى مع طفح أرجواني' UNION ALL
  SELECT 'fievre_bebe','Toute fièvre chez nourrisson < 3 mois','أي حمى عند رضيع أقل من 3 أشهر' UNION ALL
  SELECT 'vomissements','Vomissements + déshydratation chez enfant','تقيؤ مع جفاف عند الطفل' UNION ALL
  SELECT 'vomissements','Vomissements en jet + céphalée intense','تقيؤ نافور مع صداع' UNION ALL
  SELECT 'mal_dos','Mal de dos + incontinence sphinctérienne','ألم ظهر مع سلس' UNION ALL
  SELECT 'mal_dos','Mal de dos + perte de force jambes','ألم ظهر مع ضعف الساقين' UNION ALL
  SELECT 'sang_selles','Sang noir + malaise + pâleur','دم أسود مع شحوب وإغماء' UNION ALL
  SELECT 'contractions_grossesse','Saignement abondant grossesse','نزيف غزير أثناء الحمل' UNION ALL
  SELECT 'contractions_grossesse','Diminution des mouvements du bébé','نقص حركة الجنين' UNION ALL
  SELECT 'depression','Idées suicidaires actives','أفكار انتحارية فعلية' UNION ALL
  SELECT 'reaction_allergique','Gonflement langue/gorge + difficulté respirer','تورم اللسان والحلق مع صعوبة التنفس'
) AS d ON d.cs = s.code;

-- =====================================================================
-- 12. EXEMPLES DE MÉDECINS (DONNÉES FICTIVES - À REMPLACER)
-- =====================================================================

-- !!! ATTENTION : ces médecins sont INVENTÉS pour démontrer le schéma.
-- Aucun de ces noms/téléphones/adresses ne correspond à un vrai médecin.

INSERT INTO medecins
(num_ordre, civilite, nom, prenom, genre, specialite_id, secteur, tarif_consultation_da, langues_parlees,
 wilaya_id, commune_id, adresse_fr, adresse_ar, telephone_fixe, telephone_mobile, accepte_rdv_en_ligne, teleconsultation)
VALUES
('FICTIF-0001','Dr','BENALI','Karim','H',
  (SELECT id FROM specialites WHERE code='generaliste'),'prive',1500.00,'francais,arabe',
  16,(SELECT id FROM communes WHERE nom_fr='Alger-Centre' LIMIT 1),
  'EXEMPLE - Cabinet médical, rue Didouche Mourad','مثال - عيادة طبية',
  '021000001','0550000001',TRUE,TRUE),

('FICTIF-0002','Dr','HADJ-AISSA','Amina','F',
  (SELECT id FROM specialites WHERE code='pediatrie'),'prive',2000.00,'francais,arabe,anglais',
  16,(SELECT id FROM communes WHERE nom_fr='Hydra' LIMIT 1),
  'EXEMPLE - Polyclinique Les Glycines','مثال - عيادة الجلسين',
  '021000002','0550000002',TRUE,FALSE),

('FICTIF-0003','Pr','MEZIANE','Rachid','H',
  (SELECT id FROM specialites WHERE code='cardiologie'),'mixte',3500.00,'francais,arabe',
  16,(SELECT id FROM communes WHERE nom_fr='Bir Mourad Raïs' LIMIT 1),
  'EXEMPLE - Centre de cardiologie','مثال - مركز أمراض القلب',
  '021000003','0550000003',TRUE,TRUE),

('FICTIF-0004','Dr','BOUKHALFA','Yacine','H',
  (SELECT id FROM specialites WHERE code='dermato'),'prive',2500.00,'francais,arabe',
  31,(SELECT id FROM communes WHERE nom_fr='Oran' LIMIT 1),
  'EXEMPLE - Boulevard de l''ALN','مثال',
  '041000001','0550000004',TRUE,TRUE),

('FICTIF-0005','Dr','CHERIFI','Lila','F',
  (SELECT id FROM specialites WHERE code='gyneco'),'prive',3000.00,'francais,arabe',
  25,(SELECT id FROM communes WHERE nom_fr='Constantine' LIMIT 1),
  'EXEMPLE - Cité Daksi','مثال',
  '031000001','0550000005',TRUE,FALSE);

-- Horaires fictifs (samedi-jeudi 9h-17h avec pause)
INSERT INTO horaires (medecin_id, jour, ouverture, fermeture, pause_debut, pause_fin, sur_rdv)
SELECT m.id, j.jour, '09:00:00','17:00:00','12:30:00','13:30:00',TRUE
FROM medecins m
CROSS JOIN (
  SELECT 'samedi' AS jour UNION ALL SELECT 'dimanche' UNION ALL
  SELECT 'lundi'         UNION ALL SELECT 'mardi'    UNION ALL
  SELECT 'mercredi'      UNION ALL SELECT 'jeudi'
) j
WHERE m.num_ordre LIKE 'FICTIF-%';

-- =====================================================================
-- 13. VUES UTILES POUR LE CHATBOT
-- =====================================================================

-- Vue : pour un symptôme donné, retourne les spécialistes par priorité
CREATE OR REPLACE VIEW v_orientation AS
SELECT
  s.id            AS symptome_id,
  s.code          AS symptome_code,
  s.nom_fr        AS symptome_fr,
  s.nom_ar        AS symptome_ar,
  s.gravite,
  sp.id           AS specialite_id,
  sp.code         AS specialite_code,
  sp.nom_fr       AS specialite_fr,
  sp.nom_ar       AS specialite_ar,
  ss.priorite,
  ss.condition_fr,
  ss.condition_ar
FROM symptomes s
JOIN symptome_specialite ss ON ss.symptome_id = s.id
JOIN specialites sp ON sp.id = ss.specialite_id;

-- Vue : médecins ouverts aujourd'hui à une heure donnée
-- Usage : SELECT * FROM v_medecin_complet WHERE specialite_code='pediatrie' AND wilaya_id=16;
CREATE OR REPLACE VIEW v_medecin_complet AS
SELECT
  m.id, m.civilite, m.nom, m.prenom,
  sp.code AS specialite_code, sp.nom_fr AS specialite_fr, sp.nom_ar AS specialite_ar,
  w.id   AS wilaya_id, w.nom_fr AS wilaya_fr, w.nom_ar AS wilaya_ar,
  c.nom_fr AS commune_fr,
  m.adresse_fr, m.adresse_ar,
  m.telephone_fixe, m.telephone_mobile, m.whatsapp,
  m.tarif_consultation_da, m.accepte_rdv_en_ligne, m.teleconsultation,
  m.note_moyenne, m.nb_avis
FROM medecins m
JOIN specialites sp ON sp.id = m.specialite_id
JOIN wilayas w      ON w.id  = m.wilaya_id
LEFT JOIN communes c ON c.id = m.commune_id
WHERE m.est_actif = TRUE;

-- =====================================================================
-- 14. EXEMPLES DE REQUÊTES POUR LE CHATBOT
-- =====================================================================
/*

-- a) Recherche d'un symptôme par mot-clé en français OU arabe
SELECT id, nom_fr, nom_ar, gravite
FROM symptomes
WHERE nom_fr LIKE '%fièvre%' OR nom_ar LIKE '%حمى%' OR mots_cles LIKE '%fièvre%';

-- b) Orientation : "j'ai mal à la tête, qui consulter ?"
SELECT specialite_fr, specialite_ar, priorite, condition_fr
FROM v_orientation
WHERE symptome_code = 'cephalee'
ORDER BY priorite;

-- c) Trouver pédiatres à Alger ouverts maintenant (jeudi 10h)
SELECT m.*, h.ouverture, h.fermeture
FROM v_medecin_complet m
JOIN horaires h ON h.medecin_id = m.id
WHERE m.specialite_code = 'pediatrie'
  AND m.wilaya_id = 16
  AND h.jour = 'jeudi'
  AND CURTIME() BETWEEN h.ouverture AND h.fermeture
  AND NOT (CURTIME() BETWEEN h.pause_debut AND h.pause_fin);

-- d) Tous les drapeaux rouges associés à un symptôme
SELECT signe_fr, signe_ar, action_fr
FROM drapeaux_rouges dr
JOIN symptomes s ON s.id = dr.symptome_id
WHERE s.code = 'douleur_thoracique';

*/
