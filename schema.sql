-- ============================================================
-- PharmaWay — Schéma PostgreSQL : Pharmacies Algérie
-- ============================================================

CREATE EXTENSION IF NOT EXISTS postgis;

-- Wilayas
CREATE TABLE wilayas (
  id          SMALLINT PRIMARY KEY,
  nom         VARCHAR(80)  NOT NULL UNIQUE,
  nom_ar      VARCHAR(80),
  longitude   DOUBLE PRECISION,
  latitude    DOUBLE PRECISION
);

-- Communes
CREATE TABLE communes (
  id          SERIAL PRIMARY KEY,
  wilaya_id   SMALLINT NOT NULL REFERENCES wilayas(id) ON DELETE CASCADE,
  nom         VARCHAR(120) NOT NULL,
  nom_ar      VARCHAR(120),
  UNIQUE (wilaya_id, nom)
);

-- Pharmacies
CREATE TABLE pharmacies (
  id          SERIAL PRIMARY KEY,
  commune_id  INTEGER NOT NULL REFERENCES communes(id) ON DELETE CASCADE,
  nom         VARCHAR(200) NOT NULL,
  adresse     TEXT,
  telephone   VARCHAR(30),
  ouverture   TIME,
  fermeture   TIME,
  jours       VARCHAR(50),
  garde       BOOLEAN NOT NULL DEFAULT FALSE,
  longitude   DOUBLE PRECISION,
  latitude    DOUBLE PRECISION,
  geom        GEOMETRY(Point, 4326) GENERATED ALWAYS AS (
                CASE WHEN longitude IS NOT NULL AND latitude IS NOT NULL
                  THEN ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
                END
              ) STORED,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Gardes planning (rotation hebdomadaire)
CREATE TABLE gardes_planning (
  id           SERIAL PRIMARY KEY,
  pharmacie_id INTEGER NOT NULL REFERENCES pharmacies(id) ON DELETE CASCADE,
  date_garde   DATE NOT NULL,
  heure_debut  TIME NOT NULL DEFAULT '20:00',
  heure_fin    TIME NOT NULL DEFAULT '08:00',
  UNIQUE (pharmacie_id, date_garde)
);

-- Index géospatial pour recherches de proximité
CREATE INDEX idx_pharmacies_geom   ON pharmacies USING GIST(geom);
CREATE INDEX idx_pharmacies_commune ON pharmacies(commune_id);
CREATE INDEX idx_pharmacies_garde   ON pharmacies(garde) WHERE garde = TRUE;
CREATE INDEX idx_gardes_date        ON gardes_planning(date_garde);

-- Vue : pharmacies avec wilaya + commune dénormalisées
CREATE VIEW v_pharmacies AS
  SELECT
    p.id,
    p.nom,
    p.adresse,
    p.telephone,
    p.ouverture,
    p.fermeture,
    p.jours,
    p.garde,
    p.longitude,
    p.latitude,
    c.nom        AS commune,
    w.nom        AS wilaya,
    w.id         AS wilaya_id
  FROM pharmacies p
  JOIN communes c ON c.id = p.commune_id
  JOIN wilayas  w ON w.id = c.wilaya_id;
