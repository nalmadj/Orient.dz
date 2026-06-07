"""
Reclassify structures into 5 distinct categories:
  hospital  → vrais hôpitaux / CHU / EPH
  clinic    → cliniques, polycliniques, dispensaires, centres de santé
  pharmacy  → pharmacies (inchangé)
  lab       → laboratoires, centres d'analyses, imagerie médicale
  doctor    → cabinets médicaux, médecins spécialistes

Also adds:
  subtype   → label précis (ex: "Polyclinique", "CHU", "Laboratoire")
  wilaya    → assignée par Haversine (comme avant)
"""

import json, math, sys, re

WILAYAS = [
    (1,'Adrar',27.874,-0.294),(2,'Chlef',36.165,1.330),(3,'Laghouat',33.800,2.885),
    (4,'Oum El Bouaghi',35.876,7.114),(5,'Batna',35.556,6.174),(6,'Béjaïa',36.752,5.084),
    (7,'Biskra',34.850,5.728),(8,'Béchar',31.617,-2.216),(9,'Blida',36.470,2.828),
    (10,'Bouira',36.374,3.900),(11,'Tamanrasset',22.785,5.523),(12,'Tébessa',35.404,8.124),
    (13,'Tlemcen',34.878,-1.315),(14,'Tiaret',35.371,1.320),(15,'Tizi Ouzou',36.712,4.046),
    (16,'Alger',36.737,3.086),(17,'Djelfa',34.670,3.263),(18,'Jijel',36.820,5.767),
    (19,'Sétif',36.191,5.408),(20,'Saïda',34.830,0.153),(21,'Skikda',36.876,6.906),
    (22,'Sidi Bel Abbès',35.189,-0.631),(23,'Annaba',36.897,7.747),(24,'Guelma',36.462,7.426),
    (25,'Constantine',36.365,6.615),(26,'Médéa',36.264,2.750),(27,'Mostaganem',35.932,0.089),
    (28,"M'Sila",35.702,4.543),(29,'Mascara',35.395,0.140),(30,'Ouargla',31.949,5.325),
    (31,'Oran',35.691,-0.641),(32,'El Bayadh',33.680,1.017),(33,'Illizi',26.507,8.482),
    (34,'Bordj Bou Arréridj',36.073,4.762),(35,'Boumerdès',36.769,3.477),
    (36,'El Tarf',36.767,8.313),(37,'Tindouf',27.674,-8.147),(38,'Tissemsilt',35.607,1.812),
    (39,'El Oued',33.368,6.863),(40,'Khenchela',35.425,7.143),(41,'Souk Ahras',36.286,7.951),
    (42,'Tipaza',36.589,2.448),(43,'Mila',36.450,6.263),(44,'Aïn Defla',36.264,1.966),
    (45,'Naâma',33.267,-0.317),(46,'Aïn Témouchent',35.298,-1.139),(47,'Ghardaïa',32.490,3.673),
    (48,'Relizane',35.738,0.556),(49,'Timimoun',29.263,0.230),
    (50,'Bordj Badji Mokhtar',21.330,0.950),(51,'Ouled Djellal',34.418,5.072),
    (52,'Béni Abbès',30.131,-2.166),(53,'In Salah',27.195,2.468),
    (54,'In Guezzam',19.567,5.767),(55,'Touggourt',33.100,6.067),(56,'Djanet',24.555,9.484),
    (57,"El M'Ghair",33.954,5.923),(58,'El Meniaa',30.579,2.879),
]

WILAYA_BOUNDS = {
    'Adrar':[26.5,29.5,-2.5,1.5],'Chlef':[35.8,36.6,0.9,2.0],
    'Laghouat':[32.5,35.0,1.8,4.5],'Oum El Bouaghi':[35.4,36.4,6.5,8.0],
    'Batna':[34.8,36.1,5.5,7.2],'Béjaïa':[36.4,37.0,4.3,5.8],
    'Biskra':[33.5,35.5,4.8,7.0],'Béchar':[28.5,32.7,-3.6,-0.5],
    'Blida':[36.2,36.7,2.4,3.3],'Bouira':[36.0,36.7,3.4,4.7],
    'Tamanrasset':[19.0,25.5,2.5,9.5],'Tébessa':[34.5,36.2,7.3,8.7],
    'Tlemcen':[34.0,35.4,-2.2,0.0],'Tiaret':[34.7,36.0,0.6,2.3],
    'Tizi Ouzou':[36.5,37.0,3.6,4.9],'Alger':[36.5,36.9,2.8,3.4],
    'Djelfa':[33.0,35.5,2.0,4.8],'Jijel':[36.5,37.0,5.4,6.5],
    'Sétif':[35.7,36.6,4.8,6.3],'Saïda':[33.8,35.2,-0.6,0.8],
    'Skikda':[36.5,37.1,6.4,7.3],'Sidi Bel Abbès':[34.6,35.8,-1.3,0.1],
    'Annaba':[36.6,37.1,7.3,8.2],'Guelma':[36.0,36.9,7.0,8.0],
    'Constantine':[36.0,36.8,6.2,7.2],'Médéa':[35.7,36.6,2.1,3.5],
    'Mostaganem':[35.6,36.3,-0.4,0.8],"M'Sila":[34.8,36.2,3.7,5.5],
    'Mascara':[34.8,35.8,-0.3,0.7],'Ouargla':[29.5,33.5,3.5,8.0],
    'Oran':[35.2,36.1,-1.6,0.1],'El Bayadh':[32.0,34.5,-0.5,2.3],
    'Illizi':[22.5,28.5,7.5,12.0],'Bordj Bou Arréridj':[35.7,36.5,4.3,5.5],
    'Boumerdès':[36.5,37.0,3.3,4.0],'El Tarf':[36.5,37.1,7.8,8.8],
    'Tindouf':[24.0,29.5,-9.5,-5.0],'Tissemsilt':[35.2,36.1,1.3,2.5],
    'El Oued':[31.5,34.5,5.5,8.5],'Khenchela':[34.8,36.0,6.7,7.8],
    'Souk Ahras':[35.8,36.8,7.5,8.6],'Tipaza':[36.3,36.9,1.8,3.0],
    'Mila':[35.8,36.7,5.8,6.9],'Aïn Defla':[35.8,36.6,1.4,2.6],
    'Naâma':[31.5,34.0,-1.3,1.0],'Aïn Témouchent':[35.0,35.8,-1.9,-0.7],
    'Ghardaïa':[30.5,33.5,2.5,5.0],'Relizane':[35.2,36.1,-0.1,1.2],
    'Timimoun':[27.0,30.5,-1.5,2.0],'Bordj Badji Mokhtar':[19.5,23.0,-0.5,2.5],
    'Ouled Djellal':[33.5,35.0,4.5,6.0],'Béni Abbès':[27.5,31.5,-3.5,-0.5],
    'In Salah':[25.5,29.0,0.5,4.0],'In Guezzam':[18.0,21.5,3.5,8.0],
    'Touggourt':[32.0,34.0,5.5,7.0],'Djanet':[22.5,26.0,8.5,11.0],
    "El M'Ghair":[33.0,35.0,5.0,7.0],'El Meniaa':[29.5,32.0,1.5,4.5],
}

# ── Règles de classification (ordre : du plus spécifique au plus général) ──
# Chaque règle : (type_final, subtype_label, keywords_in_nom)
RULES = [
    # LABORATOIRES & IMAGERIE (priorité haute)
    ('lab', 'Laboratoire',          ['laboratoire d', 'laboratoire ']),
    ('lab', 'Centre d\'analyses',   ['centre d\'analyse', 'centre d\'analyses',
                                     "centre d'analyse", "centre d'analyses"]),
    ('lab', 'Imagerie médicale',    ['imagerie', 'radiologie', 'scanner', 'irm ',
                                     'irm-', '(irm)', 'echographie', 'écho ',
                                     'radiographi']),
    ('lab', 'Analyses médicales',   ['analyses médicales', 'analyses medicales',
                                     'biologie médicale', 'biologie medicale',
                                     'labo d\'', 'labo analyse']),
    ('lab', 'Hémodialyse',          ['hémodialyse', 'hemodialyse', 'dialyse',
                                     'hémodyalyse']),

    # MÉDECINS & SPÉCIALISTES
    ('doctor', 'Cabinet médical',   ['cabinet médical', 'cabinet medical',
                                     'cabinet de médecin', 'cabinet du médecin']),
    ('doctor', 'Cabinet dentaire',  ['dentaire', 'dentiste', 'stomatolog',
                                     'chirurgie dentaire', 'cabinet dentaire']),
    ('doctor', 'Ophtalmologie',     ['ophtalmolog', 'ophtalmologie', 'ophtalmolo',
                                     'ophtalmique', 'ophtalmo ']),
    ('doctor', 'Gynécologie',       ['gynécolog', 'gynecolog', 'gynécologue',
                                     'gynéco ']),
    ('doctor', 'Médecin spécialiste',['docteur ', 'dr ', 'dr.', 'cabinet du dr',
                                      'cabinet dr', 'médecin généraliste',
                                      'medecin generaliste', 'médecin privé']),
    ('doctor', 'Spécialiste',       ['spécialiste', 'specialiste', 'cardiologue',
                                     'pneumologue', 'pédiatre', 'pediatre',
                                     'néphrologue', 'nephrologue', 'radiologue',
                                     'chirurgien', 'orthopédiste', 'orthopediste',
                                     'neurologue', 'endocrinologue', 'urologue',
                                     'dermatologue', 'rhumatologue', 'interniste']),
    ('doctor', 'ORL',               ['oto-rhino', 'orl ', '(orl)', 'o.r.l']),
    ('doctor', 'Médecine du travail',['médecine du travail', 'medecine du travail']),

    # HÔPITAUX (grands établissements publics)
    ('hospital', 'CHU',             ['chu ', 'chu-', 'chuo ', 'centre hospitalo',
                                     'centre hospitalier universitaire']),
    ('hospital', 'EHU',             ['ehu ', 'ehu-']),
    ('hospital', 'EPH',             ['eph ', 'eph-', ' eph', 'etablissement public hospitalier',
                                     'établissement public hospitalier']),
    ('hospital', 'EPSP',            ['epsp', 'e.p.s.p']),
    ('hospital', 'EHS',             ['ehs ', 'ehs-', ' ehs']),
    ('hospital', 'Hôpital militaire',['militaire', 'hôpital militaire', 'hopital militaire',
                                      'clinique militaire']),
    ('hospital', 'Centre anticancéreux',['anticancéreux', 'anticancereux', 'anti-cancéreux',
                                         'centre du cancer', 'oncologie']),
    ('hospital', 'Sanatorium',      ['sanatorium']),
    ('hospital', 'Maternité',       ['maternité', 'maternite', 'maternit']),
    ('hospital', 'Hôpital psychiatrique',['psychiatrique', 'psychiatrie', 'neuro-psychiatrique',
                                          'neuropsychiatrique']),
    ('hospital', 'Hôpital',         ['hôpital', 'hopital', 'hospital ']),
    ('hospital', 'Secteur sanitaire',['secteur sanitaire']),
    ('hospital', 'HCA',             ['hca ']),

    # CLINIQUES & POLYCLINIQUES
    ('clinic', 'Polyclinique',      ['polyclinique', 'policlinique', 'poly-clinique']),
    ('clinic', 'Centre de santé',   ['centre de santé', 'centre de sante',
                                     'centres de santé', 'centres de sante',
                                     'centre de médecine', 'centre médico',
                                     'centre medico', 'centre médical',
                                     'centre medical', 'complexe médical',
                                     'complexe de santé']),
    ('clinic', 'Dispensaire',       ['dispensaire']),
    ('clinic', 'Salle de soins',    ['salle de soin', 'salle de soins']),
    ('clinic', 'Unité de soins',    ['unité de soins', 'unite de soins',
                                     'soins de santé', 'soins de proximité',
                                     'soins de proximite']),
    ('clinic', 'Clinique',          ['clinique ']),
    ('clinic', 'Vaccination',       ['vaccination', 'vaccin ']),
    ('clinic', 'Urgences médicales',['urgences médicales', 'urgences medicales',
                                     'urgences ']),
]

def haversine(lat1, lng1, lat2, lng2):
    R = 6371
    dLat = (lat2-lat1)*math.pi/180
    dLng = (lng2-lng1)*math.pi/180
    a = math.sin(dLat/2)**2 + math.cos(lat1*math.pi/180)*math.cos(lat2*math.pi/180)*math.sin(dLng/2)**2
    return R*2*math.atan2(math.sqrt(a), math.sqrt(1-a))

def nearest_wilaya(lat, lng):
    best, best_d = None, float('inf')
    for _,wname,wlat,wlng in WILAYAS:
        d = haversine(lat, lng, wlat, wlng)
        if d < best_d:
            best_d = d
            best = wname
    return best

def classify(nom, original_type):
    """Return (type, subtype)"""
    n = nom.lower()
    if original_type == 'pharmacy':
        return 'pharmacy', 'Pharmacie'
    for final_type, subtype, keywords in RULES:
        for kw in keywords:
            if kw in n:
                return final_type, subtype
    # Fallback : garder le type original avec label générique
    if original_type == 'hospital':
        return 'hospital', 'Hôpital'
    return 'clinic', 'Clinique'

# ── Main ──
print('Loading structures...', flush=True)
with open('C:/Users/COMPUTER/Downloads/structures.json', encoding='utf-8') as f:
    data = json.load(f)

print(f'Classifying {len(data)} structures...', flush=True)
counts = {}
for i, s in enumerate(data):
    t, sub = classify(s['nom'], s['type'])
    s['type']    = t
    s['subtype'] = sub
    s['wilaya']  = nearest_wilaya(s['latitude'], s['longitude'])
    counts[t] = counts.get(t, 0) + 1
    if (i+1) % 1000 == 0:
        print(f'  {i+1}/{len(data)}...', flush=True)

print('\n=== Final distribution ===')
for k, v in sorted(counts.items(), key=lambda x: -x[1]):
    print(f'  {k:12s}: {v}')

# Écrire le JS
bounds_js = json.dumps(WILAYA_BOUNDS, ensure_ascii=False, separators=(',',':'))
data_js   = json.dumps(data, ensure_ascii=False, separators=(',',':'))
out = f'window.STRUCTURES_DB={data_js};\nwindow.WILAYA_BOUNDS={bounds_js};\n'

out_path = 'C:/Users/COMPUTER/Desktop/pharmawayyy2/js/utils/structures-data.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(out)

print(f'\nDone → {out_path} ({len(out)//1024} KB)')
print('Sample:', [(s['nom'][:30], s['type'], s['subtype']) for s in data[:6]])
