/* ============================================================
   ORIENTDZ — Moteur i18n v2.0  "Production-Ready"
   ─────────────────────────────────────────────────────────────
   Architecture :
   • Dictionnaire `translations` FR/AR complet (300+ clés)
   • switchLanguage(lang) : RTL, police Cairo, data-i18n, storage
   • Pill Toggle CSS pur — aucune dépendance aux emoji-flags
     (les drapeaux 🇫🇷 🇩🇿 s'affichent comme "FR" "DZ" sous Windows)
   • Clés localStorage : "orientdz_lang" (principal) + "pw_lang" (alias)
   • Zéro FOUC : init synchrone sur DOMContentLoaded
   • API publique : window.PWi18n.switchLanguage / .t / .lang
   ============================================================ */
(function () {
  'use strict';

  /* ── 1. Initialisation de la langue ──────────────────────── */
  const STORAGE_KEY  = 'orientdz_lang';
  const STORAGE_ALIAS = 'pw_lang';          // rétro-compatibilité

  let LANG = localStorage.getItem(STORAGE_KEY)
          || localStorage.getItem(STORAGE_ALIAS)
          || 'fr';

  /* ══════════════════════════════════════════════════════════
     2. DICTIONNAIRE DE TRADUCTIONS
        Clé : data-i18n="<key>" dans le HTML
     ══════════════════════════════════════════════════════════ */
  const translations = {

    /* ──────────────────────────────── FRANÇAIS ─── */
    fr: {

      /* ─ Navbar (commun à toutes les pages) ─ */
      'nav.home'     : 'Accueil',
      'nav.chatbot'  : 'Assistant AI',
      'nav.map'      : 'Carte',
      'nav.nutri'    : 'OrientNutri',
      'nav.sauvemoi' : '🆘 SauveMoi QR',
      'nav.login'    : 'Connexion',
      'nav.signup'   : 'Commencer',
      'nav.main'     : 'Main',
      'nav.overview' : 'Accueil',
      'nav.ai'       : 'Assistant AI',

      /* ─ Hero ─ */
      'hero.badge'          : '🚨 Urgences & Orientation Médicale 24h/24',
      'hero.titleL1'        : 'Trouvez vos',
      'hero.titleL2'        : 'spécialistes',
      'hero.titleL3'        : 'et établissements de santé',
      'hero.titleL4'        : 'instantanément',
      'hero.subtitle'       : "La plateforme intelligente d'orientation médicale et d'urgence en Algérie. Professionnels de santé à proximité, assistant IA et conseils personnalisés.",
      'hero.cta1'           : '📍 Explorer la Carte Santé',
      'hero.cta2'           : 'Essayer le Chatbot',
      'hero.trust1'         : 'Gratuit',
      'hero.trust2'         : 'Sans inscription',
      'hero.trust3'         : 'Données sécurisées',
      'hero.float.badge'    : '✦ Réponse instantanée',
      'hero.float.pharmacy' : 'Pharmacie de garde',
      'hero.float.distance' : 'à 380 m de vous',

      /* ─ Statistiques ─ */
      'stats.pharmacies'  : 'Établissements & Praticiens',
      'stats.cities'      : 'Wilayas disponibles',
      'stats.availability': 'Disponibilité garantie',

      /* ─ Comment ça marche ─ */
      'how.label'       : 'COMMENT ÇA MARCHE',
      'how.title'       : '3 étapes pour votre santé',
      'how.subtitle'    : "En quelques secondes, accédez aux pharmacies proches, consultez notre IA et obtenez votre solution.",
      'how.step1.title' : 'Activez votre localisation',
      'how.step1.desc'  : "Autorisez l'accès GPS pour découvrir les professionnels et structures de santé à proximité en temps réel.",
      'how.step2.title' : 'Découvrez & consultez',
      'how.step2.desc'  : "Visualisez les structures de santé, leurs spécialités, et discutez avec notre assistant AI.",
      'how.step3.title' : 'Obtenez votre solution',
      'how.step3.desc'  : "Recevez des conseils personnalisés, trouvez vos médicaments et planifiez votre nutrition.",

      /* ─ Fonctionnalités (6 cartes) ─ */
      'feat.label'          : 'FONCTIONNALITÉS',
      'feat.title'          : 'Une plateforme complète pour votre santé',
      'feat.subtitle'       : "Tout ce dont vous avez besoin, réuni en une seule application intelligente et sécurisée.",
      'feat.pharmacy.title' : 'Structures de santé en temps réel',
      'feat.pharmacy.desc'  : "Géolocalisation, spécialités médicales et services d'urgence mis à jour en permanence.",
      'feat.ai.title'       : 'Assistant AI',
      'feat.ai.desc'        : 'Décrivez vos symptômes, obtenez des conseils et le bon spécialiste.',
      'feat.notice.title'   : 'SauveMoi QR',
      'feat.notice.desc'    : "Générez votre carte d'urgence chiffrée. Scannée par les secouristes en 1 seconde.",
      'feat.nutri.title'    : 'OrientNutri AI',
      'feat.nutri.desc'     : 'Programmes nutritionnels adaptés à votre pathologie.',
      'feat.h24.title'      : 'Disponible 24h/24',
      'feat.h24.desc'       : 'Une assistance sans interruption à tout moment.',
      'feat.secure.title'   : 'Données sécurisées',
      'feat.secure.desc'    : 'Confidentialité et protection de vos informations.',

      /* ─ Bannière urgence ─ */
      'urg.badge' : 'Urgence médicale',
      'urg.title' : 'Un service de santé adapté à proximité, à toute heure.',
      'urg.desc'  : "En cas de besoin, OrientDZ localise instantanément le spécialiste, l'hôpital ou la pharmacie la plus proche et vous guide pas à pas.",
      'urg.cta1'  : 'Urgences & Gardes',
      'urg.cta2'  : "Consulter l'AI",

      /* ─ Footer ─ */
      'footer.about'   : "La plateforme intelligente d'assistance médicale d'urgence pour tous.",
      'footer.product' : 'Produit',
      'footer.support' : 'Support',
      'footer.legal'   : 'Légal',
      'footer.help'    : "Centre d'aide",
      'footer.contact' : 'Contact',
      'footer.status'  : 'Statut',
      'footer.docs'    : 'Documentation',
      'footer.privacy' : 'Confidentialité',
      'footer.cgu'     : 'CGU',
      'footer.cookies' : 'Cookies',
      'footer.mentions': 'Mentions légales',
      'footer.tagline' : 'Votre santé, plus simple.',
      'footer.copy'    : '© 2026 OrientDZ. Tous droits réservés.',
      'footer.care'    : 'Conçu avec soin pour votre santé.',

      /* ─ SauveMoi QR — Formulaire & UI ─ */
      'smq.page.title'       : 'SauveMoi QR — OrientDZ',
      'smq.hero.title'       : 'SauveMoi QR',
      'smq.hero.sub'         : "Génère ta carte d'urgence médicale chiffrée par QR Code.<br>100 % hors-ligne · Zéro cloud · Données privées protégées.",
      'smq.pill1'            : 'Chiffrement XOR local',
      'smq.pill2'            : 'Aucune donnée envoyée',
      'smq.pill3'            : 'Scanner intégré',
      'smq.form.title'       : "Profil Médical d'Urgence",
      'smq.blood'            : 'Groupe Sanguin',
      'smq.maladies'         : 'Maladies Chroniques',
      'smq.mal.1'            : 'Diabète type 2',
      'smq.mal.2'            : 'Diabète type 1',
      'smq.mal.3'            : 'Hypertension',
      'smq.mal.4'            : 'Insuffisance cardiaque',
      'smq.mal.5'            : 'Asthme / BPCO',
      'smq.mal.6'            : 'Épilepsie',
      'smq.mal.7'            : 'Insuffisance rénale',
      'smq.mal.8'            : 'Cancer (traitement)',
      'smq.mal.other'        : 'Autre maladie…',
      'smq.allergies'        : 'Allergies Critiques ⚠️',
      'smq.al.1'             : 'Pénicilline',
      'smq.al.2'             : 'Amoxicilline',
      'smq.al.3'             : 'AINS / Aspirine',
      'smq.al.4'             : 'Ibuprofène',
      'smq.al.5'             : 'Latex',
      'smq.al.6'             : 'Iode / Contraste',
      'smq.al.7'             : 'Sulfamides',
      'smq.al.8'             : 'Morphine',
      'smq.al.other'         : 'Autre allergie critique…',
      'smq.traitement'       : 'Traitements en Cours',
      'smq.traitement.ph'    : 'Ex : Metformine 500mg 2×/j · Amlodipine 5mg · Insuline glargine 20U/soir…',
      'smq.contact.nom'      : "Nom Contact d'Urgence",
      'smq.contact.nom.ph'   : 'Ex : Ahmed Benali',
      'smq.contact.tel'      : "Téléphone d'Urgence",
      'smq.contact.tel.ph'   : 'Ex : +213 555 123 456',
      'smq.secure'           : 'Toutes les données sont chiffrées localement (XOR + Base64) avant la génération du QR. Aucune information ne quitte votre appareil.',
      'smq.generate'         : "Générer mon QR d'Urgence",
      'smq.err.blood'        : 'Veuillez sélectionner votre groupe sanguin.',
      'smq.err.nom'          : "Nom du contact d'urgence requis.",
      'smq.err.tel'          : "Téléphone du contact d'urgence requis.",
      'smq.result.title'     : 'Carte générée avec succès',
      'smq.result.sub'       : "Montrez ce QR aux secouristes ou collez-le sur votre carte d'identité.",
      'smq.dl.wallet'        : 'Carte Portefeuille',
      'smq.dl.wall'          : "Fond d'écran Mobile",
      'smq.test'             : '👁️ Tester le rendu secouriste sur ce PC',
      /* Overlay fiche clinique rouge (affiché après scan) */
      'smq.ov.badge'         : '⚕ Fiche Médicale d\'Urgence',
      'smq.ov.brand'         : 'OrientDZ · SauveMoi QR',
      'smq.ov.blood.label'   : 'Groupe Sanguin',
      'smq.ov.allergy.label' : '⚠ Allergies Critiques',
      'smq.ov.maladies.label': 'Maladies Chroniques',
      'smq.ov.traitement.label':'Traitements en Cours',
      'smq.ov.call'          : "📞 Appeler le Contact d'Urgence",
      'smq.ov.samu'          : '🚑 SAMU : 14',
      'smq.ov.urgences'      : '🏥 Urgences : 15',
      'smq.ov.privacy'       : '🔒 Données déchiffrées localement sur cet appareil<br>Aucun serveur contacté · OrientDZ 2026',
      'smq.ov.footer'        : 'OrientDZ · SauveMoi QR',
      'smq.ov.samu2'         : '🆘 SAMU : 14 · URGENCES : 15',
      'smq.qr.title'         : "QR d'Urgence Médical",

      /* ─ OrientNutri (NutriEngine v3) ─ */
      'nutri.title'              : 'Conseiller Nutrition & Santé AI',
      'nutri.hero.title'         : 'Votre conseiller nutrition personnalisé',
      'nutri.hero.subtitle'      : "Entrez votre condition médicale et recevez un plan nutritionnel adapté, validé par des nutritionnistes et enrichi par l'AI.",
      'nutri.hero.stat1'         : '38 Pathologies',
      'nutri.hero.stat2'         : 'Conseils validés',
      'nutri.profile'            : 'Votre profil',
      'nutri.condition'          : 'Condition médicale',
      'nutri.age'                : 'Âge',
      'nutri.years'              : 'ans',
      'nutri.objective'          : 'Votre objectif',
      'nutri.obj.lose'           : 'Perdre du poids',
      'nutri.obj.glycemia'       : 'Contrôler la glycémie',
      'nutri.obj.energy'         : "Améliorer l'énergie",
      'nutri.obj.inflam'         : 'Réduire inflammation',
      'nutri.obj.immune'         : 'Renforcer immunité',
      'nutri.obj.transit'        : 'Améliorer le transit',
      'nutri.obj.gain'           : 'Prendre du poids',
      'nutri.obj.balance'        : "Équilibrer l'alimentation",
      'nutri.sex'                : 'Sexe',
      'nutri.sex.m'              : 'Homme',
      'nutri.sex.f'              : 'Femme',
      'nutri.sex.label'          : 'Sexe biologique',
      'nutri.weight'             : 'Poids (kg)',
      'nutri.height'             : 'Taille (cm)',
      'nutri.weight.label'       : 'Poids actuel',
      'nutri.height.label'       : 'Taille',
      'nutri.age.label'          : 'Âge',
      'nutri.pal'                : "Niveau d'activité physique",
      'nutri.pal.section'        : "Niveau d'activité physique",
      'nutri.pal.1'              : "Sédentaire (peu ou pas d'exercice)",
      'nutri.pal.2'              : 'Légèrement actif (1–3 j/semaine)',
      'nutri.pal.3'              : 'Modérément actif (3–5 j/semaine)',
      'nutri.pal.4'              : 'Très actif (6–7 j/semaine)',
      'nutri.pal.1.name'         : 'Sédentaire',
      'nutri.pal.1.desc'         : 'Bureau, peu de déplacements',
      'nutri.pal.2.name'         : 'Légèrement actif',
      'nutri.pal.2.desc'         : 'Exercice léger 1–3 j/sem',
      'nutri.pal.3.name'         : 'Modérément actif',
      'nutri.pal.3.desc'         : 'Exercice modéré 3–5 j/sem',
      'nutri.pal.4.name'         : 'Très actif',
      'nutri.pal.4.desc'         : 'Sport intensif 6–7 j/sem',
      'nutri.form.title'         : 'Profil Métabolique Patient',
      'nutri.metrics.section'    : 'Données métriques',
      'nutri.metrics.bmeq'       : "(utilisées dans l'équation BMR)",
      'nutri.goal.section'       : 'Objectif nutritionnel',
      'nutri.goal.loss.name'     : 'Perte de poids',
      'nutri.goal.loss.delta'    : 'Déficit − 400 kcal/jour',
      'nutri.goal.maintain.name' : 'Maintien du poids',
      'nutri.goal.maintain.delta': 'Équilibre calorique',
      'nutri.goal.gain.name'     : 'Prise de masse',
      'nutri.goal.gain.delta'    : 'Surplus + 300 kcal/jour',
      /* Résultats NutriEngine */
      'nutri.res.tdee'           : 'Votre TDEE (Dépense énergétique totale)',
      'nutri.res.bmr'            : 'Métabolisme de base (BMR)',
      'nutri.res.prot'           : 'Protéines',
      'nutri.res.gluc'           : 'Glucides',
      'nutri.res.lip'            : 'Lipides',
      'nutri.res.formula'        : 'Formule',
      'nutri.res.patho'          : 'Profil pathologique',
      'nutri.dash.header'        : 'Vos besoins journaliers calculés',
      'nutri.dash.unit.kcal'     : 'kcal / jour',
      'nutri.score.label'        : 'Score de pertinence',
      'nutri.rules.label'        : 'règles médicales activées',
      /* Planning 7 jours */
      'nutri.plan.title'         : 'Planning 7 jours',
      'nutri.plan.total'         : 'Total journée',
      'nutri.plan.swap'          : '🔄 Changer ce repas',
      'nutri.plan.breakfast'     : 'Petit-déjeuner',
      'nutri.plan.lunch'         : 'Déjeuner',
      'nutri.plan.snack'         : 'Collation',
      'nutri.plan.dinner'        : 'Dîner',
      'nutri.days.0'             : 'Lundi',
      'nutri.days.1'             : 'Mardi',
      'nutri.days.2'             : 'Mercredi',
      'nutri.days.3'             : 'Jeudi',
      'nutri.days.4'             : 'Vendredi',
      'nutri.days.5'             : 'Samedi',
      'nutri.days.6'             : 'Dimanche',
      /* Onglets & boutons */
      'nutri.tab.plan'           : 'Planning 7J',
      'nutri.tab.aliments'       : 'Aliments',
      'nutri.tab.foods'          : 'Aliments',
      'nutri.tab.macros'         : 'Macros & Micros',
      'nutri.tab.day'            : 'Journée type',
      'nutri.tab.advice'         : 'Conseils & Suivi',
      'nutri.generate'           : 'Générer mon plan nutritionnel',
      'nutri.export.btn'         : '📄 Exporter mon programme (PDF)',
      'nutri.loading'            : 'Analyse en cours…',
      /* Colonnes aliments */
      'nutri.col.recommended'    : 'À privilégier',
      'nutri.col.avoid'          : 'À éviter',
      /* Divers */
      'nutri.placeholder.choose' : 'Choisissez votre pathologie…',
      'nutri.footer.disc'        : "⚠️ Ces conseils sont informatifs et ne remplacent pas un avis médical professionnel.",
      'nutri.badge.ai'           : 'Généré par AI · OrientDZ',

      /* ─ Carte Santé ─ */
      'carte.topbar.title'       : 'Carte des Structures de Santé',
      'carte.topbar'             : 'Algérie — 58 wilayas',
      'carte.title'              : 'Structures de santé',
      'carte.search'             : 'Rechercher un établissement…',
      'carte.geolocate'          : 'Me géolocaliser',
      'carte.filter.label'       : 'Filtrer par type',
      'carte.filter.all'         : 'Tous',
      'carte.filter.hospital'    : 'Hôpitaux',
      'carte.filter.clinic'      : 'Cliniques',
      'carte.filter.pharmacy'    : 'Pharmacies',
      'carte.filter.lab'         : 'Labo & Centres spécialisés',
      'carte.filter.doctor'      : 'Médecins',
      'carte.results.shown'      : 'Résultats affichés',
      'carte.sort.distance'      : 'Trié par distance',
      'carte.geo.detected'       : '📍 Position détectée',
      'carte.geo.reset'          : 'Effacer',
      'carte.loading'            : 'Chargement des données…',
      'carte.empty'              : 'Aucun résultat',
      'carte.empty.sub'          : 'Essayez un autre filtre ou wilaya',
      'carte.legend.hospital'    : 'Hôpital',
      'carte.legend.clinic'      : 'Clinique',
      'carte.legend.pharmacy'    : 'Pharmacie',
      'carte.legend.lab'         : 'Labo & Spécialisé',
      'carte.legend.doctor'      : 'Médecin',
      /* Sous-types établissements */
      'sub.Hôpital'              : 'Hôpital',
      'sub.CHU'                  : 'CHU',
      'sub.EHU'                  : 'EHU',
      'sub.EPH'                  : 'EPH',
      'sub.EPSP'                 : 'EPSP',
      'sub.EHS'                  : 'EHS',
      'sub.HCA'                  : 'HCA',
      'sub.Maternité'            : 'Maternité',
      'sub.Hôpital psychiatrique': 'Psychiatrique',
      'sub.Hôpital militaire'    : 'Hôpital militaire',
      'sub.Centre anticancéreux' : 'Anticancéreux',
      'sub.Sanatorium'           : 'Sanatorium',
      'sub.Secteur sanitaire'    : 'Secteur sanitaire',
      'sub.Clinique'             : 'Clinique',
      'sub.Polyclinique'         : 'Polyclinique',
      'sub.Centre de santé'      : 'Centre de santé',
      'sub.Dispensaire'          : 'Dispensaire',
      'sub.Salle de soins'       : 'Salle de soins',
      'sub.Unité de soins'       : 'Unité de soins',
      'sub.Vaccination'          : 'Vaccination',
      'sub.Urgences médicales'   : 'Urgences',
      'sub.Pharmacie'            : 'Pharmacie',
      'sub.Laboratoire'          : 'Laboratoire',
      "sub.Centre d'analyses"    : "Centre d'analyses",
      'sub.Imagerie médicale'    : 'Imagerie médicale',
      'sub.Analyses médicales'   : 'Analyses médicales',
      'sub.Hémodialyse'          : 'Hémodialyse',
      'sub.Cabinet médical'      : 'Cabinet médical',
      'sub.Cabinet dentaire'     : 'Cabinet dentaire',
      'sub.Ophtalmologie'        : 'Ophtalmologie',
      'sub.Gynécologie'          : 'Gynécologie',
      'sub.Médecin spécialiste'  : 'Spécialiste',
      'sub.Spécialiste'          : 'Spécialiste',
      'sub.ORL'                  : 'ORL',
      'sub.Médecine du travail'  : 'Médecine du travail',
      'sub.Centre médical'       : 'Centre médical',
    },

    /* ──────────────────────────────── ARABE ─── */
    ar: {

      /* ─ Navbar ─ */
      'nav.home'     : 'الرئيسية',
      'nav.chatbot'  : 'المساعد الذكي',
      'nav.map'      : 'الخريطة',
      'nav.nutri'    : 'أوريان نوتري',
      'nav.sauvemoi' : '🆘 سوف موا QR',
      'nav.login'    : 'تسجيل الدخول',
      'nav.signup'   : 'ابدأ الآن',
      'nav.main'     : 'القائمة',
      'nav.overview' : 'الرئيسية',
      'nav.ai'       : 'المساعد الذكي',

      /* ─ Hero ─ */
      'hero.badge'          : '🚨 الاستعجالات والتوجيه الطبي 24/24',
      'hero.titleL1'        : 'ابحث عن',
      'hero.titleL2'        : 'المختصين',
      'hero.titleL3'        : 'والمرافق الصحية',
      'hero.titleL4'        : 'في لحظة',
      'hero.subtitle'       : 'المنصة الذكية للتوجيه الطبي والاستعجالات في الجزائر. متخصصو الصحة بالقرب منك، مساعد ذكي، ونصائح مخصصة.',
      'hero.cta1'           : '📍 استكشف خريطة الصحة',
      'hero.cta2'           : 'جرّب المساعد الذكي',
      'hero.trust1'         : 'مجاني',
      'hero.trust2'         : 'بدون تسجيل',
      'hero.trust3'         : 'بيانات آمنة',
      'hero.float.badge'    : '✦ استجابة فورية',
      'hero.float.pharmacy' : 'صيدلية المداومة',
      'hero.float.distance' : 'على بعد 380 م',

      /* ─ Statistiques ─ */
      'stats.pharmacies'  : 'مرفق طبي وممارس صحي',
      'stats.cities'      : 'ولاية متاحة',
      'stats.availability': 'ضمان التوفر',

      /* ─ Comment ça marche ─ */
      'how.label'       : 'كيف يعمل',
      'how.title'       : '3 خطوات لصحتك',
      'how.subtitle'    : 'في ثوانٍ، اعثر على الصيدليات القريبة، استشر مساعدنا الذكي، واحصل على الحل.',
      'how.step1.title' : 'فعّل موقعك',
      'how.step1.desc'  : 'اسمح بالوصول إلى GPS لاكتشاف المختصين والمرافق الصحية القريبة في الوقت الحقيقي.',
      'how.step2.title' : 'اكتشف واستشر',
      'how.step2.desc'  : 'استعرض المرافق الصحية وتخصصاتها وتحدث مع مساعدنا الذكي.',
      'how.step3.title' : 'احصل على حلك',
      'how.step3.desc'  : 'تلقَّ نصائح مخصصة، اعثر على أدويتك، وخطّط لتغذيتك.',

      /* ─ Fonctionnalités ─ */
      'feat.label'          : 'الخصائص',
      'feat.title'          : 'منصة متكاملة لصحتك',
      'feat.subtitle'       : 'كل ما تحتاجه، مجتمعًا في تطبيق ذكي وآمن واحد.',
      'feat.pharmacy.title' : 'المرافق الصحية في الوقت الحقيقي',
      'feat.pharmacy.desc'  : 'تحديد الموقع والتخصصات الطبية وخدمات الاستعجال محدّثة باستمرار.',
      'feat.ai.title'       : 'المساعد الذكي',
      'feat.ai.desc'        : 'صف أعراضك واحصل على نصائح والطبيب المختص المناسب.',
      'feat.notice.title'   : 'سوف موا QR',
      'feat.notice.desc'    : 'أنشئ بطاقة الطوارئ الطبية المشفّرة. يقرأها المسعف خلال ثانية واحدة.',
      'feat.nutri.title'    : 'أوريان نوتري الذكي',
      'feat.nutri.desc'     : 'برامج غذائية مكيّفة مع مرضك.',
      'feat.h24.title'      : 'متاح 24/24',
      'feat.h24.desc'       : 'مساعدة دون انقطاع في أي وقت.',
      'feat.secure.title'   : 'بيانات آمنة',
      'feat.secure.desc'    : 'سرية وحماية لمعلوماتك.',

      /* ─ Bannière urgence ─ */
      'urg.badge' : 'حالة استعجال طبية',
      'urg.title' : 'خدمة صحية ملائمة قريبة منك، في كل وقت.',
      'urg.desc'  : 'عند الحاجة، تحدد لك OrientDZ فورًا أقرب مختص أو مستشفى أو صيدلية وترشدك إليها خطوة بخطوة.',
      'urg.cta1'  : 'الاستعجالات والمداومة',
      'urg.cta2'  : 'استشر المساعد الذكي',

      /* ─ Footer ─ */
      'footer.about'   : 'منصة ذكية للمساعدة الطبية الاستعجالية للجميع.',
      'footer.product' : 'المنتج',
      'footer.support' : 'الدعم',
      'footer.legal'   : 'قانوني',
      'footer.help'    : 'مركز المساعدة',
      'footer.contact' : 'اتصل بنا',
      'footer.status'  : 'الحالة',
      'footer.docs'    : 'التوثيق',
      'footer.privacy' : 'الخصوصية',
      'footer.cgu'     : 'شروط الاستخدام',
      'footer.cookies' : 'الكوكيز',
      'footer.mentions': 'إخطارات قانونية',
      'footer.tagline' : 'صحتك، أبسط.',
      'footer.copy'    : '© 2026 OrientDZ. جميع الحقوق محفوظة.',
      'footer.care'    : 'مُصمَّم بعناية لأجل صحتك.',

      /* ─ SauveMoi QR ─ */
      'smq.page.title'       : 'سوف موا QR — أوريان DZ',
      'smq.hero.title'       : 'سوف موا QR',
      'smq.hero.sub'         : 'أنشئ بطاقة الطوارئ الطبية المشفّرة بـ QR Code.<br>100% بدون إنترنت · لا سحابة · بياناتك خاصة.',
      'smq.pill1'            : 'تشفير XOR محلي',
      'smq.pill2'            : 'لا بيانات تُرسل',
      'smq.pill3'            : 'ماسح مدمج',
      'smq.form.title'       : 'الملف الطبي للطوارئ',
      'smq.blood'            : 'فصيلة الدم',
      'smq.maladies'         : 'الأمراض المزمنة',
      'smq.mal.1'            : 'السكري النوع 2',
      'smq.mal.2'            : 'السكري النوع 1',
      'smq.mal.3'            : 'ضغط الدم المرتفع',
      'smq.mal.4'            : 'قصور القلب',
      'smq.mal.5'            : 'الربو / داء الانسداد',
      'smq.mal.6'            : 'الصرع',
      'smq.mal.7'            : 'قصور الكلى',
      'smq.mal.8'            : 'السرطان (علاج)',
      'smq.mal.other'        : 'مرض آخر…',
      'smq.allergies'        : 'الحساسية الحرجة ⚠️',
      'smq.al.1'             : 'البنسلين',
      'smq.al.2'             : 'أموكسيسيلين',
      'smq.al.3'             : 'مضادات الالتهاب / أسبرين',
      'smq.al.4'             : 'إيبوبروفين',
      'smq.al.5'             : 'اللاتكس',
      'smq.al.6'             : 'اليود / الصبغة',
      'smq.al.7'             : 'السلفاميدات',
      'smq.al.8'             : 'المورفين',
      'smq.al.other'         : 'حساسية حرجة أخرى…',
      'smq.traitement'       : 'العلاجات الجارية',
      'smq.traitement.ph'    : 'مثل: ميتفورمين 500 ملغ · أملوديبين 5 ملغ · إنسولين جلارجين…',
      'smq.contact.nom'      : 'اسم جهة الاتصال الطارئة',
      'smq.contact.nom.ph'   : 'مثل: أحمد بن علي',
      'smq.contact.tel'      : 'هاتف الطوارئ',
      'smq.contact.tel.ph'   : 'مثل: 213 555 123 456+',
      'smq.secure'           : 'جميع البيانات تُشفّر محلياً (XOR + Base64) قبل إنشاء QR. لا تغادر أي معلومة جهازك.',
      'smq.generate'         : 'أنشئ كود QR للطوارئ',
      'smq.err.blood'        : 'الرجاء اختيار فصيلة الدم.',
      'smq.err.nom'          : 'اسم جهة الاتصال الطارئة مطلوب.',
      'smq.err.tel'          : 'رقم هاتف الطوارئ مطلوب.',
      'smq.result.title'     : 'تم إنشاء البطاقة بنجاح',
      'smq.result.sub'       : 'أرِ هذا الـ QR للمسعفين أو ضعه على بطاقة هويتك.',
      'smq.dl.wallet'        : 'بطاقة المحفظة',
      'smq.dl.wall'          : 'خلفية الهاتف',
      'smq.test'             : '👁️ اختبار عرض المسعف على هذا الجهاز',
      /* Overlay fiche clinique rouge */
      'smq.ov.badge'         : '⚕ الملف الطبي للطوارئ',
      'smq.ov.brand'         : 'أوريان DZ · سوف موا QR',
      'smq.ov.blood.label'   : 'فصيلة الدم',
      'smq.ov.allergy.label' : '⚠ الحساسية الحرجة',
      'smq.ov.maladies.label': 'الأمراض المزمنة',
      'smq.ov.traitement.label':'العلاجات الجارية',
      'smq.ov.call'          : '📞 الاتصال بجهة الطوارئ',
      'smq.ov.samu'          : '🚑 المستعجلات : 14',
      'smq.ov.urgences'      : '🏥 الإسعاف : 15',
      'smq.ov.privacy'       : '🔒 تم فك التشفير محلياً على هذا الجهاز<br>لا يوجد خادم مُتصل · أوريان DZ 2026',
      'smq.ov.footer'        : 'أوريان DZ · سوف موا QR',
      'smq.ov.samu2'         : '🆘 المستعجلات : 14 · الإسعاف : 15',
      'smq.qr.title'         : 'QR الطوارئ الطبي',

      /* ─ OrientNutri ─ */
      'nutri.title'              : 'مستشار التغذية والصحة الذكي',
      'nutri.hero.title'         : 'مستشار التغذية الشخصي',
      'nutri.hero.subtitle'      : 'أدخل حالتك الصحية واحصل على برنامج غذائي مناسب، موثّق من قبل أخصائيي التغذية ومُعزَّز بالذكاء الاصطناعي.',
      'nutri.hero.stat1'         : '38 حالة مرضية',
      'nutri.hero.stat2'         : 'نصائح موثّقة',
      'nutri.profile'            : 'ملفك الشخصي',
      'nutri.condition'          : 'الحالة الصحية',
      'nutri.age'                : 'العمر',
      'nutri.years'              : 'سنة',
      'nutri.objective'          : 'هدفك',
      'nutri.obj.lose'           : 'إنقاص الوزن',
      'nutri.obj.glycemia'       : 'ضبط السكر',
      'nutri.obj.energy'         : 'تحسين الطاقة',
      'nutri.obj.inflam'         : 'تقليل الالتهاب',
      'nutri.obj.immune'         : 'تعزيز المناعة',
      'nutri.obj.transit'        : 'تحسين الهضم',
      'nutri.obj.gain'           : 'زيادة الوزن',
      'nutri.obj.balance'        : 'توازن التغذية',
      'nutri.sex'                : 'الجنس',
      'nutri.sex.m'              : 'ذكر',
      'nutri.sex.f'              : 'أنثى',
      'nutri.sex.label'          : 'الجنس البيولوجي',
      'nutri.weight'             : 'الوزن (كغ)',
      'nutri.height'             : 'الطول (سم)',
      'nutri.weight.label'       : 'الوزن الحالي',
      'nutri.height.label'       : 'الطول',
      'nutri.age.label'          : 'السن',
      'nutri.pal'                : 'مستوى النشاط البدني',
      'nutri.pal.section'        : 'مستوى النشاط البدني',
      'nutri.pal.1'              : 'مستقر (لا تمرين تقريباً)',
      'nutri.pal.2'              : 'نشاط خفيف (1–3 أيام/أسبوع)',
      'nutri.pal.3'              : 'نشاط متوسط (3–5 أيام/أسبوع)',
      'nutri.pal.4'              : 'نشاط عالٍ (6–7 أيام/أسبوع)',
      'nutri.pal.1.name'         : 'مستقر',
      'nutri.pal.1.desc'         : 'مكتب، القليل من التنقل',
      'nutri.pal.2.name'         : 'نشاط خفيف',
      'nutri.pal.2.desc'         : 'تمرين خفيف 1–3 أيام/أسبوع',
      'nutri.pal.3.name'         : 'نشاط متوسط',
      'nutri.pal.3.desc'         : 'تمرين متوسط 3–5 أيام/أسبوع',
      'nutri.pal.4.name'         : 'نشاط مرتفع',
      'nutri.pal.4.desc'         : 'رياضة مكثفة 6–7 أيام/أسبوع',
      'nutri.form.title'         : 'الملف الأيضي للمريض',
      'nutri.metrics.section'    : 'البيانات المترية',
      'nutri.metrics.bmeq'       : '(مستخدمة في معادلة BMR)',
      'nutri.goal.section'       : 'الهدف الغذائي',
      'nutri.goal.loss.name'     : 'إنقاص الوزن',
      'nutri.goal.loss.delta'    : 'عجز − 400 سعرة/يوم',
      'nutri.goal.maintain.name' : 'الحفاظ على الوزن',
      'nutri.goal.maintain.delta': 'توازن السعرات',
      'nutri.goal.gain.name'     : 'اكتساب الكتلة',
      'nutri.goal.gain.delta'    : 'فائض + 300 سعرة/يوم',
      /* Résultats NutriEngine */
      'nutri.res.tdee'           : 'إجمالي الطاقة اليومية (TDEE)',
      'nutri.res.bmr'            : 'معدل الأيض القاعدي (BMR)',
      'nutri.res.prot'           : 'البروتينات',
      'nutri.res.gluc'           : 'الكربوهيدرات',
      'nutri.res.lip'            : 'الدهون',
      'nutri.res.formula'        : 'الصيغة',
      'nutri.res.patho'          : 'الملف المرضي',
      'nutri.dash.header'        : 'احتياجاتك اليومية المحسوبة',
      'nutri.dash.unit.kcal'     : 'سعرة / يوم',
      'nutri.score.label'        : 'درجة الصلة',
      'nutri.rules.label'        : 'قاعدة طبية مُفعَّلة',
      /* Planning 7 jours */
      'nutri.plan.title'         : 'برنامج 7 أيام',
      'nutri.plan.total'         : 'إجمالي اليوم',
      'nutri.plan.swap'          : '🔄 تغيير الوجبة',
      'nutri.plan.breakfast'     : 'الفطور',
      'nutri.plan.lunch'         : 'الغداء',
      'nutri.plan.snack'         : 'وجبة خفيفة',
      'nutri.plan.dinner'        : 'العشاء',
      'nutri.days.0'             : 'الإثنين',
      'nutri.days.1'             : 'الثلاثاء',
      'nutri.days.2'             : 'الأربعاء',
      'nutri.days.3'             : 'الخميس',
      'nutri.days.4'             : 'الجمعة',
      'nutri.days.5'             : 'السبت',
      'nutri.days.6'             : 'الأحد',
      /* Onglets & boutons */
      'nutri.tab.plan'           : 'برنامج 7 أيام',
      'nutri.tab.aliments'       : 'الأطعمة',
      'nutri.tab.foods'          : 'الأطعمة',
      'nutri.tab.macros'         : 'المغذيات الكبرى والصغرى',
      'nutri.tab.day'            : 'يوم نموذجي',
      'nutri.tab.advice'         : 'النصائح والمتابعة',
      'nutri.generate'           : 'أنشئ برنامجي الغذائي',
      'nutri.export.btn'         : '📄 تصدير برنامجي (PDF)',
      'nutri.loading'            : 'جاري التحليل…',
      /* Colonnes aliments */
      'nutri.col.recommended'    : 'يُنصح بها',
      'nutri.col.avoid'          : 'تجنّبها',
      /* Divers */
      'nutri.placeholder.choose' : 'اختر حالتك المرضية…',
      'nutri.footer.disc'        : '⚠️ هذه النصائح إرشادية ولا تُغني عن استشارة الطبيب.',
      'nutri.badge.ai'           : 'مُنشأ بالذكاء الاصطناعي · OrientDZ',

      /* ─ Carte Santé ─ */
      'carte.topbar.title'       : 'خريطة المرافق الصحية',
      'carte.topbar'             : 'الجزائر — 58 ولاية',
      'carte.title'              : 'مرافق الصحة',
      'carte.search'             : 'البحث عن مؤسسة...',
      'carte.geolocate'          : 'تحديد موقعي',
      'carte.filter.label'       : 'تصفية حسب النوع',
      'carte.filter.all'         : 'الكل',
      'carte.filter.hospital'    : 'مستشفيات',
      'carte.filter.clinic'      : 'عيادات',
      'carte.filter.pharmacy'    : 'صيدليات',
      'carte.filter.lab'         : 'مختبرات ومراكز متخصصة',
      'carte.filter.doctor'      : 'أطباء',
      'carte.results.shown'      : 'النتائج المعروضة',
      'carte.sort.distance'      : 'مرتبة حسب المسافة',
      'carte.geo.detected'       : '📍 تم تحديد الموقع',
      'carte.geo.reset'          : 'مسح',
      'carte.loading'            : 'جاري التحميل...',
      'carte.empty'              : 'لا توجد نتائج',
      'carte.empty.sub'          : 'جرّب فلترًا آخر أو ولاية مختلفة',
      'carte.legend.hospital'    : 'مستشفى',
      'carte.legend.clinic'      : 'عيادة',
      'carte.legend.pharmacy'    : 'صيدلية',
      'carte.legend.lab'         : 'مختبر ومتخصص',
      'carte.legend.doctor'      : 'طبيب',
      /* Sous-types */
      'sub.Hôpital'              : 'مستشفى',
      'sub.CHU'                  : 'مستشفى جامعي',
      'sub.EHU'                  : 'مستشفى جامعي',
      'sub.EPH'                  : 'مؤسسة عامة استشفائية',
      'sub.EPSP'                 : 'مؤسسة وقاية صحية',
      'sub.EHS'                  : 'مؤسسة متخصصة',
      'sub.HCA'                  : 'مستشفى',
      'sub.Maternité'            : 'مستشفى الأمومة',
      'sub.Hôpital psychiatrique': 'مستشفى نفسي',
      'sub.Hôpital militaire'    : 'مستشفى عسكري',
      'sub.Centre anticancéreux' : 'مركز الأورام',
      'sub.Sanatorium'           : 'مصحة',
      'sub.Secteur sanitaire'    : 'قطاع صحي',
      'sub.Clinique'             : 'عيادة خاصة',
      'sub.Polyclinique'         : 'عيادة متعددة التخصصات',
      'sub.Centre de santé'      : 'مركز صحي',
      'sub.Dispensaire'          : 'مستوصف',
      'sub.Salle de soins'       : 'قاعة العلاج',
      'sub.Unité de soins'       : 'وحدة علاج',
      'sub.Vaccination'          : 'تلقيح',
      'sub.Urgences médicales'   : 'مستعجلات',
      'sub.Pharmacie'            : 'صيدلية',
      'sub.Laboratoire'          : 'مختبر تحاليل',
      "sub.Centre d'analyses"    : 'مركز تحاليل',
      'sub.Imagerie médicale'    : 'تصوير طبي',
      'sub.Analyses médicales'   : 'تحاليل طبية',
      'sub.Hémodialyse'          : 'غسيل الكلى',
      'sub.Cabinet médical'      : 'عيادة طبية',
      'sub.Cabinet dentaire'     : 'عيادة أسنان',
      'sub.Ophtalmologie'        : 'طب العيون',
      'sub.Gynécologie'          : 'طب النساء',
      'sub.Médecin spécialiste'  : 'طبيب متخصص',
      'sub.Spécialiste'          : 'أخصائي',
      'sub.ORL'                  : 'أذن أنف حنجرة',
      'sub.Médecine du travail'  : 'طب العمل',
      'sub.Centre médical'       : 'مركز طبي',
    }
  };

  /* ══════════════════════════════════════════════════════════
     3. HELPER — accès au dictionnaire
     ══════════════════════════════════════════════════════════ */
  function t(key) {
    return translations[LANG][key] ?? key;
  }

  /* ══════════════════════════════════════════════════════════
     4. CSS DU PILL TOGGLE (injecté une seule fois)
        Design : capsule gris clair, bouton actif = blanc surélevé
        AUCUNE dépendance aux emoji-drapeaux (évite "FR FR" / "DZ AR"
        sur les systèmes Windows qui rendent les flags en lettres ISO)
     ══════════════════════════════════════════════════════════ */
  const PILL_CSS = `
/* ── Conteneur capsule ─────────────────────────────── */
.pw-lang-pill {
  display: inline-flex;
  align-items: center;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 9999px;
  padding: 3px;
  gap: 2px;
  height: 36px;
  box-shadow: inset 0 1px 2px rgba(15,23,42,.04);
  flex-shrink: 0;
}

/* ── Bouton inactif ────────────────────────────────── */
.pw-lang-opt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 15px;
  border-radius: 9999px;
  font-size: .8125rem;
  font-weight: 700;
  letter-spacing: .03em;
  color: #64748B;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all .2s cubic-bezier(.4,0,.2,1);
  font-family: inherit;
  line-height: 1;
  white-space: nowrap;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

/* ── Bouton actif (langue sélectionnée) ────────────── */
.pw-lang-opt.is-active {
  background: #FFFFFF;
  color: #0F172A;
  border-color: #CBD5E1;
  box-shadow: 0 1px 3px rgba(15,23,42,.12),
              0 1px 1px rgba(15,23,42,.08);
}

/* ── Hover sur bouton inactif ──────────────────────── */
.pw-lang-opt:hover:not(.is-active) {
  color: #334155;
  background: rgba(255,255,255,.55);
}

/* ── Bouton arabe : police Cairo ───────────────────── */
.pw-lang-opt[data-lang="ar"] {
  font-family: 'Cairo', 'Inter', sans-serif;
  font-size: .875rem;
}

/* ── RTL : tout le site ────────────────────────────── */
html[dir="rtl"] body,
html[dir="rtl"] button,
html[dir="rtl"] input,
html[dir="rtl"] textarea,
html[dir="rtl"] select {
  font-family: 'Cairo', 'Inter', sans-serif !important;
}
html[dir="rtl"] .nav-links { flex-direction: row-reverse; }
html[dir="rtl"] .pw-lang-pill { flex-direction: row-reverse; }
html[dir="rtl"] .nav-right-group { flex-direction: row-reverse; }

/* ── Responsive ────────────────────────────────────── */
@media (max-width: 768px) {
  .pw-lang-pill { height: 32px; }
  .pw-lang-opt  { padding: 3px 12px; font-size: .75rem; }
}
`;

  /* ══════════════════════════════════════════════════════════
     5. INJECTION CSS (une seule fois dans <head>)
     ══════════════════════════════════════════════════════════ */
  function injectCss() {
    if (document.getElementById('pw-i18n-css')) return;
    const style = document.createElement('style');
    style.id = 'pw-i18n-css';
    style.textContent = PILL_CSS;
    document.head.appendChild(style);
  }

  /* ══════════════════════════════════════════════════════════
     6. POLICE CAIRO (chargée dynamiquement si arabe)
     ══════════════════════════════════════════════════════════ */
  function ensureArabicFont() {
    if (document.getElementById('pw-cairo-font')) return;
    const link = document.createElement('link');
    link.id   = 'pw-cairo-font';
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(link);
  }

  /* ══════════════════════════════════════════════════════════
     7. CONSTRUCTION HTML DU PILL
        Libellés : "FR" et "AR" — texte pur, aucun emoji-flag
     ══════════════════════════════════════════════════════════ */
  function pillHtml() {
    const frActive = LANG === 'fr';
    const arActive = LANG === 'ar';
    return `<div class="pw-lang-pill" role="tablist" aria-label="Langue / اللغة">
  <button class="pw-lang-opt${frActive ? ' is-active' : ''}"
          data-lang="fr" role="tab" aria-selected="${frActive}">FR</button>
  <button class="pw-lang-opt${arActive ? ' is-active' : ''}"
          data-lang="ar" role="tab" aria-selected="${arActive}">AR</button>
</div>`;
  }

  /* ══════════════════════════════════════════════════════════
     8. INSERTION DU PILL dans le DOM
        Cibles par priorité :
        1. Pill statique déjà présent dans le HTML  → skip
        2. .topbar-right   (pages internes type ai.html)
        3. .nav-right-group (accueil index.html — nouveau wrapper)
        4. .nav-actions    (fallback ancien accueil)
        5. .odz-actions    (emergency_qr.html)
        6. Fixé en haut à droite (dernier recours)
     ══════════════════════════════════════════════════════════ */
  function insertPill() {
    /* Si un pill statique existe déjà dans le HTML, on ne crée pas de doublon.
       L'état .is-active sera corrigé par switchLanguage() au moment de apply(). */
    if (document.querySelector('.pw-lang-pill')) return;

    let host;

    host = document.querySelector('.topbar-right');
    if (host) { host.insertAdjacentHTML('afterbegin', pillHtml()); return; }

    host = document.querySelector('.nav-right-group');
    if (host) { host.insertAdjacentHTML('afterbegin', pillHtml()); return; }

    host = document.querySelector('.nav-actions');
    if (host) { host.insertAdjacentHTML('afterbegin', pillHtml()); return; }

    host = document.querySelector('.odz-actions');
    if (host) { host.insertAdjacentHTML('afterbegin', pillHtml()); return; }

    /* Dernier recours : position fixe */
    const fb = document.createElement('div');
    fb.style.cssText = 'position:fixed;top:14px;right:14px;z-index:9999;';
    fb.innerHTML = pillHtml();
    document.body.appendChild(fb);
  }

  /* ══════════════════════════════════════════════════════════
     9. APPLICATION DES TRADUCTIONS
        Parcourt tous les éléments data-i18n* du DOM courant
     ══════════════════════════════════════════════════════════ */
  function applyTranslations() {
    const T = translations[LANG];

    /* data-i18n → textContent (cas standard) */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = T[el.getAttribute('data-i18n')];
      if (v != null) el.textContent = v;
    });

    /* data-i18n-html → innerHTML (pour les <br>, <strong>, etc.) */
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = T[el.getAttribute('data-i18n-html')];
      if (v != null) el.innerHTML = v;
    });

    /* data-i18n-placeholder → attribut placeholder des inputs */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const v = T[el.getAttribute('data-i18n-placeholder')];
      if (v != null) el.placeholder = v;
    });

    /* data-i18n-title → attribut title (tooltips) */
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const v = T[el.getAttribute('data-i18n-title')];
      if (v != null) el.title = v;
    });

    /* data-i18n-aria → aria-label (accessibilité) */
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const v = T[el.getAttribute('data-i18n-aria')];
      if (v != null) el.setAttribute('aria-label', v);
    });
  }

  /* ══════════════════════════════════════════════════════════
     10. switchLanguage(lang) — FONCTION PRINCIPALE PUBLIQUE
         Appelée au clic sur un bouton du pill ET à l'init
     ══════════════════════════════════════════════════════════ */
  function switchLanguage(lang) {
    if (lang !== 'fr' && lang !== 'ar') return;

    LANG = lang;

    /* ── Persistance ── */
    localStorage.setItem(STORAGE_KEY,   lang);   // orientdz_lang
    localStorage.setItem(STORAGE_ALIAS, lang);   // pw_lang (alias rétro-compat)

    /* ── Direction & langue HTML ── */
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir              = lang === 'ar' ? 'rtl' : 'ltr';

    /* ── Police arabe ── */
    if (lang === 'ar') ensureArabicFont();

    /* ── Traductions DOM ── */
    applyTranslations();

    /* ── État visuel du pill ── */
    document.querySelectorAll('.pw-lang-opt').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    /* ── Événement personnalisé pour les pages JS dynamiques ──
       (ex : nutrition.html rebuild du planning 7J, emergency_qr.html) */
    document.dispatchEvent(
      new CustomEvent('pw:langchange', { detail: { lang } })
    );
  }

  /* ══════════════════════════════════════════════════════════
     11. INITIALISATION (DOMContentLoaded — zéro FOUC)
     ══════════════════════════════════════════════════════════ */
  function init() {
    injectCss();
    insertPill();
    switchLanguage(LANG); /* applique la langue sauvegardée immédiatement */

    /* Délégation de clic sur tous les boutons du pill (présents ou futurs) */
    document.addEventListener('click', e => {
      const btn = e.target.closest('.pw-lang-opt');
      if (btn && btn.dataset.lang) switchLanguage(btn.dataset.lang);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    /* Script chargé après DOMContentLoaded (ex: defer) */
    init();
  }

  /* ══════════════════════════════════════════════════════════
     12. API PUBLIQUE — window.PWi18n
         Usage depuis n'importe quelle page :
           window.PWi18n.t('nav.home')         // → 'Accueil' / 'الرئيسية'
           window.PWi18n.switchLanguage('ar')  // bascule en arabe
           window.PWi18n.lang                  // langue courante ('fr'|'ar')
     ══════════════════════════════════════════════════════════ */
  window.PWi18n = {
    t,
    switchLanguage,
    setLang: switchLanguage, /* alias rétro-compatibilité */
    get lang() { return LANG; },
    translations,            /* dictionnaire complet exposé */
  };

})();
