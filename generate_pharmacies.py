import json, math, random

random.seed(42)

WILAYAS = [
    (1,  'Adrar',          27.874,  -0.294,  ['Adrar','Reggane','Timimoun','Aoulef','Zaouiet Kounta']),
    (2,  'Chlef',          36.165,   1.330,  ['Chlef','Ténès','El Karimia','Boukadir','Oued Fodda']),
    (3,  'Laghouat',       33.800,   2.885,  ['Laghouat','Aflou','Hassi R\'Mel','Ksar El Hirane']),
    (4,  'Oum El Bouaghi', 35.876,   7.114,  ['Oum El Bouaghi','Aïn Beïda','Khenchela','Aïn Fakroun']),
    (5,  'Batna',          35.556,   6.174,  ['Batna','Arris','Barika','Merouana','N\'Gaous','Aïn Touta']),
    (6,  'Béjaïa',         36.752,   5.084,  ['Béjaïa','Akbou','El Kseur','Amizour','Sidi Aïch','Kherrata']),
    (7,  'Biskra',         34.850,   5.728,  ['Biskra','Tolga','Sidi Okba','El Kantara','Ouled Djellal']),
    (8,  'Béchar',         31.617,  -2.216,  ['Béchar','Abadla','Kenadsa','Béni Abbès']),
    (9,  'Blida',          36.470,   2.828,  ['Blida','Boufarik','Bougara','Larbaa','Meftah','Chiffa']),
    (10, 'Bouira',         36.374,   3.900,  ['Bouira','Lakhdaria','Sour El Ghouzlane','M\'Chedallah']),
    (11, 'Tamanrasset',    22.785,   5.523,  ['Tamanrasset','In Salah','In Guezzam','Abalessa']),
    (12, 'Tébessa',        35.404,   8.124,  ['Tébessa','Bir El Ater','Chéria','El Aouinet']),
    (13, 'Tlemcen',        34.878,  -1.315,  ['Tlemcen','Maghnia','Ghazaouet','Nedroma','Remchi','Aïn Temouchent']),
    (14, 'Tiaret',         35.371,   1.320,  ['Tiaret','Frenda','Sougueur','Rahouia','Ksar Chellala']),
    (15, 'Tizi Ouzou',     36.712,   4.046,  ['Tizi Ouzou','Azazga','Draa El Mizan','Tigzirt','Boghni','Aïn El Hammam']),
    (16, 'Alger',          36.737,   3.086,  ['Alger-Centre','Bab El Oued','El Harrach','Hussein Dey','Kouba','Bir Mourad Raïs','Ben Aknoun','Bouzareah','Cheraga','Hydra','Mohammadia','Rouiba','Birkhadem','Draria']),
    (17, 'Djelfa',         34.670,   3.263,  ['Djelfa','Messaad','Aïn Oussera','Birine','Hassi Bahbah']),
    (18, 'Jijel',          36.820,   5.767,  ['Jijel','El Milia','Taher','Ziama Mansouriah','Texenna']),
    (19, 'Sétif',          36.191,   5.408,  ['Sétif','El Eulma','Aïn Oulmène','Bougaa','Aïn Arnat','Béni Aziz']),
    (20, 'Saïda',          34.830,   0.153,  ['Saïda','Aïn El Hadjar','Youb','Sidi Boubekeur']),
    (21, 'Skikda',         36.876,   6.906,  ['Skikda','El Harrouch','Collo','Azzaba','Tamalous']),
    (22, 'Sidi Bel Abbès', 35.189,  -0.631,  ['Sidi Bel Abbès','Télagh','Ras El Ma','Aïn Thrid','Sfisef']),
    (23, 'Annaba',         36.897,   7.747,  ['Annaba','El Bouni','El Hadjar','Aïn Berda','Berrahal']),
    (24, 'Guelma',         36.462,   7.426,  ['Guelma','Bouchegouf','Héliopolis','Oued Zenati','Nechmaya']),
    (25, 'Constantine',    36.365,   6.615,  ['Constantine','Aïn Smara','El Khroub','Hamma Bouziane','Ibn Ziad']),
    (26, 'Médéa',          36.264,   2.750,  ['Médéa','Berrouaghia','Ksar El Boukhari','Aïn Boucif','El Azizia']),
    (27, 'Mostaganem',     35.932,   0.089,  ['Mostaganem','Aïn Tédelès','Sidi Ali','Mesra','Fornaka']),
    (28, 'M\'Sila',        35.702,   4.543,  ['M\'Sila','Bou Saâda','Aïn El Melh','Magra','Sidi Aïssa']),
    (29, 'Mascara',        35.395,   0.140,  ['Mascara','Mohammadia','Sig','Aïn Fares','Oggaz']),
    (30, 'Ouargla',        31.949,   5.325,  ['Ouargla','Hassi Messaoud','Touggourt','El Hadjira','Témacine']),
    (31, 'Oran',           35.691,  -0.641,  ['Oran','Es Sénia','Aïn El Turk','Bir El Djir','Arzew','Bethioua','Mers El Kébir']),
    (32, 'El Bayadh',      33.680,   1.017,  ['El Bayadh','Brezina','Rogassa','Aïn El Orak']),
    (33, 'Illizi',         26.507,   8.482,  ['Illizi','Djanet','In Amenas','Debdeb']),
    (34, 'Bordj Bou Arréridj', 36.073, 4.762, ['Bordj Bou Arréridj','Ras El Oued','El Hamadia','Aïn Taghrout']),
    (35, 'Boumerdès',      36.769,   3.477,  ['Boumerdès','Thénia','Boudouaou','Khemis El Khechna','Dellys']),
    (36, 'El Tarf',        36.767,   8.313,  ['El Tarf','Ben Mehidi','Bouteldja','Besbes','El Kala']),
    (37, 'Tindouf',        27.674,  -8.147,  ['Tindouf','Oum El Assel']),
    (38, 'Tissemsilt',     35.607,   1.812,  ['Tissemsilt','Bordj Bounaama','Theniet El Had','Lardjem']),
    (39, 'El Oued',        33.368,   6.863,  ['El Oued','Guemar','Robbah','Bayadha','Kouinine']),
    (40, 'Khenchela',      35.425,   7.143,  ['Khenchela','Aïn Touila','Aïn Skhouna','Bouhmama']),
    (41, 'Souk Ahras',     36.286,   7.951,  ['Souk Ahras','Sedrata','Merahna','Aïn Zana']),
    (42, 'Tipaza',         36.589,   2.448,  ['Tipaza','Kolea','Hadjout','Cherchell','Gouraya','Bou Ismail']),
    (43, 'Mila',           36.450,   6.263,  ['Mila','Ferdjioua','Chelghoum Laïd','Tadjenanet','Grarem Gouga']),
    (44, 'Aïn Defla',      36.264,   1.966,  ['Aïn Defla','Khemis Miliana','El Attaf','Miliana','Djendel']),
    (45, 'Naâma',          33.267,  -0.317,  ['Naâma','Mécheria','Aïn Sefra','Sfissifa','Tiout']),
    (46, 'Aïn Témouchent', 35.298,  -1.139,  ['Aïn Témouchent','Hammam Bou Hadjar','Beni Saf','El Malah','Sidi Safi']),
    (47, 'Ghardaïa',       32.490,   3.673,  ['Ghardaïa','Metlili','El Guerrara','Berriane','Zelfana']),
    (48, 'Relizane',       35.738,   0.556,  ['Relizane','Aïn Tarek','Oued Rhiou','Sidi M\'Hamed Ben Ali','Mazouna']),
    (49, 'Timimoun',       29.263,   0.230,  ['Timimoun','Aougrout','Talmine']),
    (50, 'Bordj Badji Mokhtar', 21.330, 0.950, ['Bordj Badji Mokhtar','Timiaouine']),
    (51, 'Ouled Djellal',  34.418,   5.072,  ['Ouled Djellal','Sidi Khaled','Ras El Miaad']),
    (52, 'Béni Abbès',     30.131,  -2.166,  ['Béni Abbès','Igli','Kerzaz']),
    (53, 'In Salah',       27.195,   2.468,  ['In Salah','In Ghar','Foggaret Ezzaouia']),
    (54, 'In Guezzam',     19.567,   5.767,  ['In Guezzam','Tin Zaouatine']),
    (55, 'Touggourt',      33.100,   6.067,  ['Touggourt','Témacine','Nezla','Megarine']),
    (56, 'Djanet',         24.555,   9.484,  ['Djanet','Bordj El Haouès']),
    (57, 'El M\'Ghair',    33.954,   5.923,  ['El M\'Ghair','Djamaa','Still','Oued Allenda']),
    (58, 'El Meniaa',      30.579,   2.879,  ['El Meniaa','Hassi Gara','Berriane']),
]

PREFIXES = [
    'Pharmacie', 'Pharmacie', 'Pharmacie', 'Pharmacie',
    'Pharmacie Centrale', 'Pharmacie El', 'Grande Pharmacie',
    'Pharmacie Nouvelle', 'Pharmacie Moderne',
]

ARABIC_NAMES = [
    'Al Amal','Al Baraka','Al Chifa','Al Firdaws','Al Hilal',
    'Al Inayah','Al Kawthar','Al Nour','Al Rahma','Al Saha',
    'Al Salam','Al Shifa','Al Taqwa','Al Wafaa','Al Yaqeen',
    'Ibn Sina','Ibn Rushd','Ibn Khaldoun','Avicenne','Al Andalous',
]

FRENCH_NAMES = [
    'Centrale','du Centre','du Marché','des Oliviers','de la Paix',
    'du Progrès','du Soleil','de l\'Espoir','de la Santé','des Jardins',
    'des Fleurs','du Stade','du Boulevard','de la Gare','de la Mosquée',
    'El Fath','El Wiam','El Nakhil','El Widad','El Badr',
    'Dar Es-Salam','El Amel','El Farah','El Oumid','El Hidaya',
]

STREETS = [
    'Rue des Frères Bouadma','Rue Ben M\'Hidi Larbi','Cité des Orangers',
    'Cité OPGI','Cité 200 Logements','Boulevard Zighoud Youcef',
    'Rue du 1er Novembre','Cité El Badr','Lotissement El Wiam',
    'Cité Sonacome','Rue Mustapha Benboulaïd','Boulevard Krim Belkacem',
    'Rue Ahmed Zabana','Cité 500 Logements','Avenue Khemisti',
    'Rue Abane Ramdane','Cite des Pins','Rue Didouche Mourad',
    'Cite Erriadh','Lotissement El Amel','Boulevard du 5 Juillet',
    'Rue Amirouche','Cite Khalidj','Avenue de l\'ALN',
    'Rue Houari Boumediene','Cite AADL','Rue du 8 Mai 1945',
]

PHONE_PREFIXES = ['021','023','025','027','029','031','033','035','037','038','041','043','045','046','048','049']

HOURS_SETS = [
    ('08:00','20:00','Lun–Sam'),
    ('08:00','21:00','Lun–Sam'),
    ('08:00','22:00','Lun–Sam'),
    ('08:30','20:30','Lun–Sam'),
    ('07:30','19:30','Lun–Sam'),
    ('08:00','20:00','7j/7'),
    ('08:00','23:00','7j/7'),
    ('00:00','23:59','7j/7'),
]


def gen_phone(wcode):
    prefix = PHONE_PREFIXES[wcode % len(PHONE_PREFIXES)]
    digits = ''.join([str(random.randint(0,9)) for _ in range(6)])
    return f"+213 {prefix} {digits[:2]} {digits[2:4]} {digits[4:6]}"


def gen_name(commune):
    if random.random() < 0.55:
        return f"Pharmacie {random.choice(ARABIC_NAMES)}"
    elif random.random() < 0.6:
        return f"Pharmacie {random.choice(FRENCH_NAMES)}"
    else:
        return f"{random.choice(PREFIXES)} {commune}"


def gen_address(commune):
    return f"{random.choice(STREETS)}, {commune}"


def disperse(blat, blng, idx, total):
    ang = idx * 137.508 * math.pi / 180
    r_val = 0.04 + (idx % 7) * 0.018
    lat = blat + r_val * math.sin(ang)
    lng = blng + r_val * math.cos(ang)
    return round(lat + random.uniform(-0.005, 0.005), 6), \
           round(lng + random.uniform(-0.005, 0.005), 6)


def n_pharmacies(n_communes):
    """Pharmacies per wilaya based on commune count."""
    return max(6, n_communes * random.randint(3, 6))


result = {}

for wid, wname, blat, blng, communes in WILAYAS:
    pharmacies = []
    total = n_pharmacies(len(communes))
    garde_count = max(1, total // 5)
    garde_indices = set(random.sample(range(total), garde_count))

    idx = 0
    for ci, commune in enumerate(communes):
        per_commune = max(1, round(total / len(communes)))
        for j in range(per_commune):
            lat, lng = disperse(blat, blng, idx, total)
            h = random.choice(HOURS_SETS)
            garde = idx in garde_indices

            pharmacies.append({
                'commune': commune,
                'nom': gen_name(commune),
                'adresse': gen_address(commune),
                'telephone': gen_phone(wid),
                'ouverture': h[0],
                'fermeture': h[1],
                'jours': h[2],
                'garde': garde,
                'latitude': lat,
                'longitude': lng,
            })
            idx += 1
            if idx >= total:
                break
        if idx >= total:
            break

    # Make sure each wilaya has at least one garde
    if not any(p['garde'] for p in pharmacies):
        pharmacies[0]['garde'] = True

    result[wname] = pharmacies

# Write JS file
lines = ['window.PHARMACIES_DB = ']
lines.append(json.dumps(result, ensure_ascii=False, indent=2))
lines.append(';')

out_path = 'js/utils/pharmacies-data.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(''.join(lines))

total_ph = sum(len(v) for v in result.values())
print(f"Generated {total_ph} pharmacies across {len(result)} wilayas -> {out_path}")
for wname, plist in result.items():
    gardes = sum(1 for p in plist if p['garde'])
    print(f"  {wname}: {len(plist)} pharmacies, {gardes} gardes")
