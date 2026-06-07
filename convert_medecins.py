# -*- coding: utf-8 -*-
"""Convertit annuaire_medecins_algerie_complet.xlsx → medecins.json
Mappe les spécialités sur les codes du chatbot et ajoute lat/lng (centroïdes wilaya)."""
import json, sys, io, re
import openpyxl

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

XLSX_PATH = r"C:\Users\COMPUTER\Downloads\annuaire_medecins_algerie_complet.xlsx"
OUT_PATH  = r"C:\Users\COMPUTER\Desktop\pharmawayyy2\medecins.json"

# Mapping spécialité Excel → code chatbot
SPEC_MAP = {
    'Médecin Généraliste':'GEN',
    'Cardiologue':'CARDIO',
    'Pédiatre':'PEDIA',
    'Gynécologue':'GYN',
    'Dermatologue':'DERMA',
    'Pneumologue':'PNEUMO',
    'Gastro-entérologue':'GASTRO',
    'Neurologue':'NEURO',
    'Endocrinologue':'ENDO',
    'ORL':'ORL',
    'Ophtalmologue':'OPHTA',
    'Rhumatologue':'RHUMATO',
    'Orthopédiste':'ORTHO',
    'Psychiatre':'PSY',
    'Dentiste':'DENT',
    'Urologue':'URO',
    'Oncologue':'ONCO',
    'Anesthésiste':'ANESTH',
    'Chirurgien':'CHIR',
    'Radiologue':'RADIO',
}

# Centroïdes des 58 wilayas (lat, lng)
WILAYA_COORDS = {
 1:(27.8742,-0.2939), 2:(36.1654,1.3346), 3:(33.8000,2.8650), 4:(35.8753,7.1136),
 5:(35.5559,6.1741), 6:(36.7508,5.0689), 7:(34.8500,5.7333), 8:(31.6177,-2.2167),
 9:(36.4709,2.8281), 10:(36.3739,3.9020), 11:(22.7858,5.5228), 12:(35.4042,8.1244),
 13:(34.8786,-1.3148), 14:(35.3711,1.3170), 15:(36.7169,4.0488), 16:(36.7538,3.0588),
 17:(34.6731,3.2531), 18:(36.8189,5.7669), 19:(36.1898,5.4109), 20:(34.8326,0.1454),
 21:(36.8761,6.9094), 22:(35.1928,-0.6306), 23:(36.9000,7.7556), 24:(36.4624,7.4283),
 25:(36.3522,6.6155), 26:(36.2641,2.7539), 27:(35.9319,0.0894), 28:(35.7058,4.5419),
 29:(35.3964,0.1414), 30:(31.9523,5.3304), 31:(35.6969,-0.6331), 32:(33.6803,1.0192),
 33:(26.4833,8.4667), 34:(36.0731,4.7611), 35:(36.7656,3.4778), 36:(36.7672,8.3133),
 37:(27.6742,-8.1478), 38:(35.6072,1.8108), 39:(33.3556,6.8628), 40:(35.4267,7.1389),
 41:(36.2861,7.9511), 42:(36.5894,2.4486), 43:(36.4500,6.2667), 44:(36.2647,1.9678),
 45:(33.2667,-0.3133), 46:(35.2997,-1.1397), 47:(32.4920,3.6731), 48:(35.7372,0.5560),
 49:(29.2639,0.2406), 50:(21.3289,0.9542), 51:(34.4181,5.0644), 52:(30.1306,-2.1672),
 53:(27.1969,2.4789), 54:(19.5708,5.7747), 55:(33.1067,6.0667), 56:(24.5544,9.4844),
 57:(33.9542,5.9219), 58:(30.5825,2.8794),
}

# Petit jitter par commune pour ne pas que tous les médecins d'une wilaya aient la même coord
def commune_offset(wilaya_id, commune_name):
    # Pseudo-random déterministe basé sur le nom
    h = abs(hash(commune_name)) % 10000
    dlat = ((h // 100) - 50) / 5000.0   # ±0.01° ≈ ±1 km
    dlng = ((h % 100) - 50) / 5000.0
    return dlat, dlng

print("Lecture de l'Excel…")
wb = openpyxl.load_workbook(XLSX_PATH, read_only=True, data_only=True)
ws = wb['Annuaire Complet']

medecins = []
unknown_specs = set()
skipped = 0

for row in ws.iter_rows(min_row=5, values_only=True):
    num_w, wilaya, commune, nom, spec, adresse, tel, horaires = row
    if not (num_w and nom and spec):
        skipped += 1
        continue
    code = SPEC_MAP.get(spec)
    if not code:
        unknown_specs.add(spec)
        continue
    base_lat, base_lng = WILAYA_COORDS.get(num_w, (28.0, 3.0))
    dlat, dlng = commune_offset(num_w, commune or '')
    medecins.append({
        'id':   len(medecins) + 1,
        'nom':  nom.strip(),
        'sp':   code,
        'w':    num_w,
        'wn':   (wilaya or '').strip(),
        'c':    (commune or '').strip(),
        'a':    (adresse or '').strip(),
        't':    (tel or '').strip(),
        'h':    (horaires or '').strip(),
        'lat':  round(base_lat + dlat, 6),
        'lng':  round(base_lng + dlng, 6),
    })

print(f"Médecins convertis : {len(medecins)}")
print(f"Lignes ignorées    : {skipped}")
if unknown_specs:
    print(f"Spécialités non mappées : {unknown_specs}")

# Sauvegarde JSON compact (sans espaces)
with open(OUT_PATH, 'w', encoding='utf-8') as f:
    json.dump({'medecins': medecins, 'count': len(medecins)}, f, ensure_ascii=False, separators=(',', ':'))

import os
size_mb = os.path.getsize(OUT_PATH) / 1024 / 1024
print(f"Fichier écrit : {OUT_PATH} ({size_mb:.2f} MB)")
