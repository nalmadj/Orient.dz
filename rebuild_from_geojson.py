"""
Rebuild structures-data.js from the raw export.geojson using real OSM tags.
6 strict categories:
  hospital    → vrais hôpitaux (CHU, EPH, EHS, EHU...)
  clinic      → cliniques privées et polycliniques (hospitalisation)
  centre      → centres médicaux et de santé (consultations polyvalentes)
  lab         → laboratoires, imagerie, dialyse, analyses
  doctor      → cabinets médicaux individuels, spécialistes
  pharmacy    → pharmacies
"""
import json, math, re, unicodedata

# ─── WILAYAS ────────────────────────────────────────────────────────────────
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

def haversine(a, b, c, d):
    R=6371; dL=(c-a)*math.pi/180; dG=(d-b)*math.pi/180
    x=math.sin(dL/2)**2+math.cos(a*math.pi/180)*math.cos(c*math.pi/180)*math.sin(dG/2)**2
    return R*2*math.atan2(math.sqrt(x),math.sqrt(1-x))

def nearest_wilaya(lat, lng):
    best,bd=None,float('inf')
    for _,wn,wl,wg in WILAYAS:
        d=haversine(lat,lng,wl,wg)
        if d<bd: bd=d; best=wn
    return best

def norm(s):
    if not s: return ''
    return unicodedata.normalize('NFD', s.lower()).encode('ascii','ignore').decode()

# ─── CLASSIFICATION RULES ──────────────────────────────────────────────────
# Priority order: most specific first
# (category, subtype, keyword_list) — keywords matched against normalized name
LAB_KW = [
    'laboratoire','labo ','labo d','centre d analyse','centre d analyses',
    'analyses medicales','analyses biologiques','biologie medicale',
    'imagerie','radiologie','scanner','irm ','irm-','(irm)',
    'echographie','echo ','radiograph','scintigraphie',
    'hemodialyse','hémodialyse','hemodialy','dialyse','dialysis',
    'transfusion','centre de sang','banque de sang','blood',
    'anatomie pathologique','cytologie',
]
DOCTOR_KW = [
    'cabinet medical','cabinet du medecin','cabinet de medecin',
    'cabinet prive','cabinet d ophtalmologie','cabinet de gyneco',
    'cabinet dentaire','cabinet du docteur','cabinet dr',
    'dr ','dr.','docteur ','medecin generaliste','medecin prive',
    'ophtalmolog','ophtalmologie','ophtalmo',
    'stomatolog','dentiste','dentaire','chirurgie dentaire',
    'gynecologue','gynecolog','cardiologue','pneumologue',
    'pediatre','nephrologue','urologue','dermatologue',
    'neurologue','endocrinologue','rhumatologue','orthopediste',
    'oto-rhino','(orl)','o.r.l','psychiatre','psychologue',
    'specialiste','medecine du travail',
]
HOSP_KW = [
    'chu ','chu-',' chu ','chuo','centre hospitalier universitaire',
    'ehu ','ehu-',' ehu ',
    'eph ','eph-',' eph ','etablissement public hospitalier','etablissement hospitalier',
    'epsp ','epsp-',' epsp',
    'ehs ','ehs-',' ehs',
    'hca ','hca-',' hca ',
    'clinique militaire','hopital militaire','militaire',
    'anticancereux','anti-cancereux','centre du cancer','oncologie',
    'sanatorium','sanatoriu',
    'maternite','maternit',
    'psychiatrique','psychiatrie','neuro-psychiatrique','neuropsychiatrique',
    'secteur sanitaire',
    'hopital','hospital ','hôpital',
]
CLINIC_KW = [
    'polyclinique','policlinique','poly-clinique','poly clinique',
    'clinique privee','clinique de chirurgie','clinique medicale',
    'clinique chirurgicale','clinique d accouchement','clinique d obstetrique',
    'clinique ophtalmologique','clinique ',
]
CENTRE_KW = [
    'centre de sante','centres de sante','centre de medecine',
    'centre medico','centre medical','complexe medical','complexe de sante',
    'complexe sanitaire','unite de soins','salle de soins','salle de soin',
    'dispensaire','vaccination','vaccin ',
    'unite de depistage','unite mobile','imedghacen',
    'urgences medicales','urgences ','unite d urgences',
    'centre de consultation','consultation externe',
    'mssp ','mssp-',
]

def classify(nom, amenity, healthcare):
    """Returns (category, subtype)"""
    n  = norm(nom)
    hc = (healthcare or '').lower().strip()
    am = (amenity or '').lower().strip()

    # 1. Pharmacy — always from tag
    if am == 'pharmacy' or hc == 'pharmacy':
        return 'pharmacy', 'Pharmacie'

    # 2. Doctor — OSM tag or keyword
    if hc in ('doctor','doctors','dentist','optometrist','physiotherapist',
               'psychotherapist','audiologist','podiatrist'):
        return 'doctor', 'Cabinet médical'

    # 3. Lab — OSM tag or keyword (highest priority before hospital)
    if hc in ('laboratory','medical_laboratory','blood_bank','blood_donation',
               'dialysis','rehabilitation'):
        sub = {'laboratory':'Laboratoire','medical_laboratory':'Laboratoire',
               'blood_bank':'Banque de sang','blood_donation':'Don de sang',
               'dialysis':'Centre de dialyse','rehabilitation':'Rééducation'}.get(hc,'Laboratoire')
        return 'lab', sub
    for kw in LAB_KW:
        if kw in n: return 'lab', _lab_subtype(n)

    # 4. Doctor — keyword
    for kw in DOCTOR_KW:
        if kw in n: return 'doctor', _doctor_subtype(n)

    # 5. Hospital — only real hospitals
    if am == 'hospital' and hc in ('hospital','sanatorium',''):
        for kw in HOSP_KW:
            if kw in n: return 'hospital', _hosp_subtype(n)
        # amenity=hospital but no keyword → still hospital by tag
        return 'hospital', 'Hôpital'

    # 6. Polyclinic / private clinic
    for kw in CLINIC_KW:
        if kw in n: return 'clinic', _clinic_subtype(n)
    if hc == 'polyclinic': return 'clinic', 'Polyclinique'

    # 7. Centre médical / health centre
    for kw in CENTRE_KW:
        if kw in n: return 'centre', _centre_subtype(n)
    if hc in ('vaccination_centre','centre','birthing_centre','birthing_center'):
        return 'centre', 'Centre de santé'

    # 8. Fallback: clinic OSM tag → centre médical
    if am == 'clinic' or hc == 'clinic':
        return 'centre', 'Centre de santé'

    return 'centre', 'Centre de santé'

def _lab_subtype(n):
    if any(k in n for k in ['hemodialyse','dialyse','hemodialy','dialysis']): return 'Centre de dialyse'
    if any(k in n for k in ['imagerie','radiologie','scanner','irm','echographie']): return 'Imagerie médicale'
    if any(k in n for k in ['banque de sang','transfusion','blood']): return 'Banque de sang'
    return 'Laboratoire d\'analyses'

def _doctor_subtype(n):
    if any(k in n for k in ['dent','stomatol']): return 'Cabinet dentaire'
    if any(k in n for k in ['ophtalmol','ophtalmo']): return 'Ophtalmologie'
    if any(k in n for k in ['gynecol','gyneco']): return 'Gynécologie'
    if any(k in n for k in ['cardio']): return 'Cardiologie'
    if any(k in n for k in ['pediatr']): return 'Pédiatrie'
    if any(k in n for k in ['psychiatr','psychol']): return 'Psychiatrie'
    if any(k in n for k in ['oto-rhino','orl']): return 'ORL'
    if any(k in n for k in ['chirurgi']): return 'Chirurgie'
    return 'Cabinet médical'

def _hosp_subtype(n):
    if any(k in n for k in ['chu','universitaire']): return 'CHU'
    if any(k in n for k in ['ehu']): return 'EHU'
    if any(k in n for k in ['eph']): return 'EPH'
    if any(k in n for k in ['epsp']): return 'EPSP'
    if any(k in n for k in ['ehs']): return 'EHS'
    if any(k in n for k in ['militaire']): return 'Hôpital militaire'
    if any(k in n for k in ['anticancereux','cancer','oncolo']): return 'Centre anticancéreux'
    if any(k in n for k in ['psychiatr','neuropsychiat']): return 'Hôpital psychiatrique'
    if any(k in n for k in ['maternit']): return 'Maternité'
    if any(k in n for k in ['sanator']): return 'Sanatorium'
    return 'Hôpital'

def _clinic_subtype(n):
    if any(k in n for k in ['polyclinique','policlinique']): return 'Polyclinique'
    return 'Clinique privée'

def _centre_subtype(n):
    if any(k in n for k in ['dispensaire']): return 'Dispensaire'
    if any(k in n for k in ['salle de soin','unite de soin']): return 'Salle de soins'
    if any(k in n for k in ['vaccin']): return 'Centre de vaccination'
    if any(k in n for k in ['urgences','urgence']): return 'Urgences médicales'
    if any(k in n for k in ['polyclinique','policlinique']): return 'Polyclinique'
    if any(k in n for k in ['complexe']): return 'Complexe médical'
    if any(k in n for k in ['medico-social','medico social']): return 'Centre médico-social'
    return 'Centre de santé'

# ─── EXTRACT NAME ──────────────────────────────────────────────────────────
def get_name(p):
    for key in ['name:fr','name','alt_name:fr','alt_name','name:ar']:
        v = p.get(key,'').strip()
        if v and not v.startswith('?'): return v
    return None

def get_city(p):
    for key in ['addr:city:fr','addr:city','addr:suburb:fr','addr:suburb','addr:place:fr','addr:place']:
        v = p.get(key,'').strip()
        if v: return v
    return ''

# ─── MAIN ─────────────────────────────────────────────────────────────────
print('Loading export.geojson...')
with open('C:/Users/COMPUTER/Downloads/export.geojson', encoding='utf-8') as f:
    geo = json.load(f)

features = geo['features']
print(f'{len(features)} features found')

results = []
skipped = 0
counts  = {}
seen    = set()

for feat in features:
    p = feat.get('properties', {})
    geom = feat.get('geometry', {})
    if not geom: skipped+=1; continue

    coords = geom.get('coordinates')
    gtype  = geom.get('type','')

    # Extract lat/lng
    if gtype == 'Point' and coords:
        lng, lat = coords[0], coords[1]
    elif gtype in ('Polygon','MultiPolygon') and coords:
        # Use centroid approximation
        flat = coords[0] if gtype=='Polygon' else coords[0][0]
        if flat:
            lats = [c[1] for c in flat]; lngs = [c[0] for c in flat]
            lat = sum(lats)/len(lats); lng = sum(lngs)/len(lngs)
        else: skipped+=1; continue
    else: skipped+=1; continue

    # Skip invalid coords
    if not (-90<=lat<=90 and -180<=lng<=180): skipped+=1; continue
    # Keep only Algeria bounding box approx
    if not (18 <= lat <= 38 and -10 <= lng <= 12): skipped+=1; continue

    amenity    = p.get('amenity','')
    healthcare = p.get('healthcare','')
    name = get_name(p)
    if not name:
        # Try to get any non-empty name
        name = (p.get('name') or p.get('old_name') or '').strip()
    if not name or name in ('?','','-'): skipped+=1; continue

    # Deduplicate by name+coords (rounded to 4 dec)
    key = (name, round(lat,4), round(lng,4))
    if key in seen: skipped+=1; continue
    seen.add(key)

    category, subtype = classify(name, amenity, healthcare)
    city   = get_city(p)
    wilaya = nearest_wilaya(lat, lng)

    results.append({
        'nom':      name,
        'type':     category,
        'subtype':  subtype,
        'city':     city,
        'wilaya':   wilaya,
        'latitude':  round(lat, 6),
        'longitude': round(lng, 6),
    })
    counts[category] = counts.get(category, 0) + 1

print(f'\nProcessed: {len(results)} | Skipped: {skipped}')
print('\nCategory distribution:')
for k,v in sorted(counts.items(), key=lambda x:-x[1]):
    print(f'  {k:12s}: {v:5d}')

# Write JS
bounds_js = json.dumps(WILAYA_BOUNDS, ensure_ascii=False, separators=(',',':'))
data_js   = json.dumps(results, ensure_ascii=False, separators=(',',':'))
out = f'window.STRUCTURES_DB={data_js};\nwindow.WILAYA_BOUNDS={bounds_js};\n'

out_path = 'C:/Users/COMPUTER/Desktop/pharmawayyy2/js/utils/structures-data.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(out)

print(f'\nWritten: {out_path} ({len(out)//1024} KB)')
