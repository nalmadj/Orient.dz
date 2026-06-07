"""
PharmaWay — Import Pharmacies_Algerie_13Wilayas.xlsx → PostgreSQL
Usage: python import_excel.py [--excel PATH] [--geocode]
"""

import os, sys, time, argparse, re
from pathlib import Path

import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
from dotenv import load_dotenv

load_dotenv()

WILAYAS_CODES = {
    'Alger': 16, 'Blida': 9, 'Oran': 31, 'Tipaza': 42,
    'Boumerdès': 35, 'Béjaïa': 6, 'Tizi Ouzou': 15,
    'Jijel': 18, 'Mostaganem': 27, 'Djelfa': 17,
    'Batna': 5, 'Saïda': 20, 'Biskra': 7,
}

JOURS_NORM = {
    'Lun–Sam': 'Lun–Sam', 'Lun-Sam': 'Lun–Sam',
    'Lun–Ven': 'Lun–Ven', 'Lun-Ven': 'Lun–Ven',
    '7j/7': '7j/7', 'Tous les jours': '7j/7',
}


def parse_time(val):
    if not val or str(val).strip() in ('', 'nan'):
        return None
    m = re.match(r'(\d{1,2}):(\d{2})', str(val).strip())
    return f"{int(m.group(1)):02d}:{m.group(2)}" if m else None


def geocode_nominatim(adresse, commune, wilaya, delay=1.1):
    try:
        import requests
        q = f"{adresse}, {commune}, {wilaya}, Algeria"
        r = requests.get(
            'https://nominatim.openstreetmap.org/search',
            params={'q': q, 'format': 'json', 'limit': 1},
            headers={'User-Agent': 'PharmaWay/1.0 (contact@pharmaway.dz)'},
            timeout=8,
        )
        data = r.json()
        time.sleep(delay)
        if data:
            return float(data[0]['lon']), float(data[0]['lat'])
    except Exception as e:
        print(f"  Geocoding error for '{adresse}': {e}", file=sys.stderr)
    return None, None


def load_excel(path):
    df = pd.read_excel(path, header=2)
    df.columns = ['wilaya', 'commune', 'nom', 'adresse',
                  'telephone', 'ouverture', 'fermeture', 'jours', 'garde']
    df = df.dropna(subset=['nom'])
    df['garde']     = df['garde'].fillna('Non').astype(str).str.strip().str.lower() == 'oui'
    df['telephone'] = df['telephone'].fillna('').astype(str).str.strip()
    df['adresse']   = df['adresse'].fillna('').astype(str).str.strip()
    df['jours']     = df['jours'].fillna('Lun–Sam').astype(str).str.strip()
    df['jours']     = df['jours'].map(lambda x: JOURS_NORM.get(x, x))
    df['ouverture'] = df['ouverture'].astype(str).apply(parse_time)
    df['fermeture'] = df['fermeture'].astype(str).apply(parse_time)
    df['wilaya']    = df['wilaya'].astype(str).str.strip()
    df['commune']   = df['commune'].astype(str).str.strip()
    df['nom']       = df['nom'].astype(str).str.strip()
    return df


def run(excel_path, geocode=False):
    df = load_excel(excel_path)
    print(f"Loaded {len(df)} pharmacies from {excel_path}")

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur  = conn.cursor()

    # Upsert wilayas
    wilaya_ids = {}
    for nom, code in WILAYAS_CODES.items():
        cur.execute(
            "INSERT INTO wilayas(id, nom) VALUES (%s, %s) ON CONFLICT(id) DO NOTHING RETURNING id",
            (code, nom)
        )
        wilaya_ids[nom] = code

    # Upsert communes
    commune_ids = {}
    for (wilaya, commune), _ in df.groupby(['wilaya', 'commune']):
        wid = wilaya_ids.get(wilaya)
        if not wid:
            print(f"  Unknown wilaya: {wilaya}", file=sys.stderr)
            continue
        cur.execute(
            """INSERT INTO communes(wilaya_id, nom) VALUES (%s, %s)
               ON CONFLICT (wilaya_id, nom) DO UPDATE SET nom=EXCLUDED.nom
               RETURNING id""",
            (wid, commune)
        )
        commune_ids[(wilaya, commune)] = cur.fetchone()[0]

    # Insert pharmacies
    inserted = skipped = 0
    for _, row in df.iterrows():
        cid = commune_ids.get((row['wilaya'], row['commune']))
        if not cid:
            skipped += 1
            continue

        lon, lat = None, None
        if geocode and row['adresse']:
            print(f"  Geocoding: {row['nom']} …")
            lon, lat = geocode_nominatim(row['adresse'], row['commune'], row['wilaya'])

        cur.execute(
            """INSERT INTO pharmacies
               (commune_id, nom, adresse, telephone, ouverture, fermeture, jours, garde, longitude, latitude)
               VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
               ON CONFLICT DO NOTHING""",
            (cid, row['nom'], row['adresse'], row['telephone'] or None,
             row['ouverture'], row['fermeture'], row['jours'],
             bool(row['garde']), lon, lat)
        )
        inserted += 1

    conn.commit()
    cur.close()
    conn.close()
    print(f"Done — {inserted} inserted, {skipped} skipped.")


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--excel', default='Pharmacies_Algerie_13Wilayas.xlsx')
    p.add_argument('--geocode', action='store_true', help='Geocode via Nominatim (slow)')
    args = p.parse_args()
    run(args.excel, geocode=args.geocode)
