const pptxgen = require("C:/Users/COMPUTER/AppData/Roaming/npm/node_modules/pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'OrientDZ — PFE Presentation';

// ── Color palette (OrientDZ brand: teal/navy) ──
const C = {
  dark:    "0F172A",
  navy:    "1E293B",
  teal:    "0D9488",
  teal2:   "06B6D4",
  teallt:  "CCFBF1",
  white:   "FFFFFF",
  off:     "F8FAFC",
  muted:   "64748B",
  red:     "DC2626",
  green:   "10B981",
  amber:   "F59E0B",
  slate:   "334155",
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.12 });

// ════════════════════════════════════════════
// SLIDE 1 — TITLE
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };

  // Teal accent left strip
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.teal } });

  // Large background circle (decorative)
  s.addShape(pres.shapes.OVAL, { x: 6.5, y: -1.2, w: 5.5, h: 5.5, fill: { color: C.teal, transparency: 88 }, line: { color: C.teal, width: 1, transparency: 70 } });
  s.addShape(pres.shapes.OVAL, { x: 7.2, y: -0.5, w: 3.8, h: 3.8, fill: { color: C.teal2, transparency: 92 }, line: { color: C.teal2, width: 1, transparency: 80 } });

  // Tag
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.55, w: 2.6, h: 0.34, fill: { color: C.teal, transparency: 70 }, line: { color: C.teal, width: 0 } });
  s.addText("PROJET DE FIN D'ÉTUDES — NIT 2025-2026", { x: 0.5, y: 0.55, w: 2.6, h: 0.34, fontSize: 7.5, bold: true, color: C.teallt, align: "center", valign: "middle", margin: 0 });

  // Main title
  s.addText("Orient", { x: 0.5, y: 1.05, w: 3.2, h: 1.0, fontSize: 60, bold: true, color: C.white, fontFace: "Calibri", align: "left", valign: "middle", margin: 0 });
  s.addText("DZ", { x: 3.0, y: 1.05, w: 1.5, h: 1.0, fontSize: 60, bold: true, color: C.teal, fontFace: "Calibri", align: "left", valign: "middle", margin: 0 });

  // Subtitle
  s.addText("Plateforme Intelligente d'Orientation Médicale & d'Urgence en Algérie", {
    x: 0.5, y: 2.0, w: 7.5, h: 0.7, fontSize: 16, color: "94A3B8", fontFace: "Calibri", align: "left", valign: "top", margin: 0
  });

  // Divider
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.75, w: 4.5, h: 0.025, fill: { color: C.teal, transparency: 40 } });

  // Module pills
  const pills = [
    { label: "OrientNutri", color: C.green },
    { label: "OrientIA", color: C.teal2 },
    { label: "OrientMap", color: C.amber },
    { label: "SauveMoi QR", color: C.red },
  ];
  pills.forEach((p, i) => {
    const x = 0.5 + i * 2.25;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.98, w: 2.0, h: 0.34, fill: { color: p.color, transparency: 75 }, line: { color: p.color, width: 1 } });
    s.addText(p.label, { x, y: 2.98, w: 2.0, h: 0.34, fontSize: 9.5, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
  });

  // Student info
  s.addText([
    { text: "Présenté par : ", options: { color: "94A3B8", fontSize: 11 } },
    { text: "Islem Ahmed", options: { color: C.white, bold: true, fontSize: 11 } },
  ], { x: 0.5, y: 4.45, w: 5, h: 0.3, margin: 0 });

  s.addText("Établissement : Numidia Institute of Technology  |  Année : 2025-2026", {
    x: 0.5, y: 4.78, w: 8, h: 0.25, fontSize: 9, color: "475569", margin: 0
  });
}

// ════════════════════════════════════════════
// SLIDE 2 — INTRODUCTION (Context)
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.off };

  // Top bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: C.navy } });
  s.addText("INTRODUCTION", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("01", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("Contexte : La Santé Numérique en Algérie", {
    x: 0.4, y: 0.7, w: 9.2, h: 0.55, fontSize: 22, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
  });

  // Left column — 3 stat cards
  const stats = [
    { val: "60%+", label: "Taux de pénétration\nsmartphone urbain", color: C.teal },
    { val: "48", label: "Wilayas\ncouvertes par OrientDZ", color: C.teal2 },
    { val: "500+", label: "Établissements\n& praticiens référencés", color: C.green },
  ];
  stats.forEach((st, i) => {
    const y = 1.45 + i * 1.22;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 3.0, h: 1.08, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 0.06, h: 1.08, fill: { color: st.color } });
    s.addText(st.val, { x: 0.6, y: y + 0.05, w: 2.8, h: 0.5, fontSize: 28, bold: true, color: st.color, fontFace: "Calibri", margin: 0 });
    s.addText(st.label, { x: 0.6, y: y + 0.55, w: 2.8, h: 0.45, fontSize: 9.5, color: C.muted, margin: 0 });
  });

  // Right column — challenge bullets
  s.addShape(pres.shapes.RECTANGLE, { x: 3.7, y: 1.45, w: 5.9, h: 3.65, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addText("Défis du système de santé algérien", {
    x: 3.9, y: 1.55, w: 5.5, h: 0.38, fontSize: 13, bold: true, color: C.dark, margin: 0
  });

  const challenges = [
    { icon: "⚠", text: "Surcharge des services hospitaliers" },
    { icon: "🌐", text: "Absence d'un référentiel numérique unifié" },
    { icon: "🔌", text: "Dépendance aux serveurs cloud — inutilisable hors-ligne" },
    { icon: "🗣", text: "Barrière linguistique FR / AR non traitée" },
    { icon: "🔒", text: "Vulnérabilité des données médicales en urgence" },
  ];
  challenges.forEach((ch, i) => {
    const y = 2.05 + i * 0.6;
    s.addShape(pres.shapes.OVAL, { x: 3.9, y: y + 0.03, w: 0.3, h: 0.3, fill: { color: C.teal, transparency: 80 } });
    s.addText(ch.icon, { x: 3.9, y: y + 0.03, w: 0.3, h: 0.3, fontSize: 9, align: "center", valign: "middle", margin: 0 });
    s.addText(ch.text, { x: 4.28, y, w: 5.1, h: 0.42, fontSize: 11.5, color: C.slate, valign: "middle", margin: 0 });
  });

  // Footer
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: C.navy } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 3 — INTRODUCTION (Platform Overview)
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.off };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: C.navy } });
  s.addText("INTRODUCTION", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("02", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("OrientDZ : Vue d'Ensemble", {
    x: 0.4, y: 0.7, w: 9.2, h: 0.55, fontSize: 22, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
  });

  s.addText("Une plateforme mobile modulaire, bilingue (FR/AR), fonctionnant hors-ligne par défaut, dédiée à l'orientation médicale et à la sécurité sanitaire en Algérie.", {
    x: 0.4, y: 1.3, w: 9.2, h: 0.5, fontSize: 12, color: C.muted, italic: true, margin: 0
  });

  // 4 module cards in 2x2 grid
  const modules = [
    { title: "OrientIA", sub: "Assistant Médical IA", desc: "Chatbot bilingue analysant les symptômes et orientant vers le bon spécialiste parmi 30+ spécialités médicales.", color: C.teal2, icon: "🤖" },
    { title: "OrientNutri", sub: "Plan Nutritionnel IA", desc: "Calcul BMR/TDEE (Mifflin-St Jeor) et macronutriments personnalisés. 100% hors-ligne.", color: C.green, icon: "🥗" },
    { title: "OrientMap", sub: "Carte Santé Interactive", desc: "Géolocalisation des hôpitaux, cliniques et pharmacies de garde sur les 48 wilayas.", color: C.amber, icon: "🗺" },
    { title: "SauveMoi QR", sub: "Urgence Médicale", desc: "Fiche clinique chiffrée (XOR+Base64) encodée en QR Code, accessible sans réseau.", color: C.red, icon: "🆘" },
  ];

  const positions = [
    { x: 0.4, y: 1.95 }, { x: 5.2, y: 1.95 },
    { x: 0.4, y: 3.55 }, { x: 5.2, y: 3.55 },
  ];

  modules.forEach((m, i) => {
    const { x, y } = positions[i];
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.42, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 1.42, fill: { color: m.color } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: y + 0.18, w: 0.55, h: 0.55, fill: { color: m.color, transparency: 80 } });
    s.addText(m.icon, { x: x + 0.18, y: y + 0.18, w: 0.55, h: 0.55, fontSize: 14, align: "center", valign: "middle", margin: 0 });
    s.addText(m.title, { x: x + 0.85, y: y + 0.12, w: 3.5, h: 0.32, fontSize: 13.5, bold: true, color: m.color, margin: 0 });
    s.addText(m.sub, { x: x + 0.85, y: y + 0.42, w: 3.5, h: 0.24, fontSize: 9.5, color: C.muted, italic: true, margin: 0 });
    s.addText(m.desc, { x: x + 0.18, y: y + 0.78, w: 4.1, h: 0.55, fontSize: 9, color: C.slate, margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: C.navy } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 4 — PROBLEM STATEMENT
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.OVAL, { x: -1, y: 2.5, w: 5, h: 5, fill: { color: C.teal, transparency: 93 }, line: { color: C.teal, width: 1, transparency: 85 } });
  s.addShape(pres.shapes.OVAL, { x: 7, y: -1, w: 4, h: 4, fill: { color: C.teal2, transparency: 93 }, line: { color: C.teal2, width: 1, transparency: 85 } });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: "FFFFFF", transparency: 92 } });
  s.addText("PROBLÉMATIQUE", { x: 0.4, y: 0, w: 5, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("03", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("Question de Recherche Centrale", {
    x: 0.4, y: 0.68, w: 9.2, h: 0.52, fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", margin: 0
  });

  // Research question box
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.28, w: 9.2, h: 0.88, fill: { color: C.teal, transparency: 82 }, line: { color: C.teal, width: 1 } });
  s.addText('"Comment concevoir une plateforme mobile de santé, adaptée au contexte algérien, bilingue (FR/AR) de manière native, indépendante des infrastructures cloud, et capable de protéger les données médicales même sans connectivité ?"', {
    x: 0.6, y: 1.3, w: 8.8, h: 0.84, fontSize: 11.5, color: C.white, italic: true, align: "center", valign: "middle", margin: 0
  });

  // 4 problem pillars
  const probs = [
    { num: "01", title: "Fragmentation de l'info", desc: "Aucune plateforme unifiée: orientation + nutrition + urgence offline.", color: C.teal2 },
    { num: "02", title: "Barrière linguistique", desc: "Aucun support natif arabe adapté au contexte algérien sans cloud.", color: C.amber },
    { num: "03", title: "Urgences sans données", desc: "Patient inconscient = secouristes sans accès aux infos médicales critiques.", color: C.red },
    { num: "04", title: "Dépendance cloud", desc: "Apps inutilisables dans les zones à faible connectivité (hors agglomérations).", color: C.green },
  ];

  probs.forEach((p, i) => {
    const x = 0.4 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.38, w: 2.1, h: 2.85, fill: { color: "FFFFFF", transparency: 93 }, line: { color: p.color, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.38, w: 2.1, h: 0.38, fill: { color: p.color, transparency: 60 } });
    s.addText(p.num, { x, y: 2.38, w: 2.1, h: 0.38, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(p.title, { x: x + 0.1, y: 2.84, w: 1.9, h: 0.48, fontSize: 10.5, bold: true, color: p.color, margin: 0 });
    s.addText(p.desc, { x: x + 0.1, y: 3.35, w: 1.9, h: 1.65, fontSize: 9.5, color: "94A3B8", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: "FFFFFF", transparency: 93 } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 5 — OBJECTIVES
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.off };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: C.navy } });
  s.addText("OBJECTIFS", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("04", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("Objectifs du Projet OrientDZ", {
    x: 0.4, y: 0.68, w: 9.2, h: 0.52, fontSize: 22, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
  });

  const objGroups = [
    {
      label: "Fonctionnels",
      color: C.teal,
      icon: "⚙",
      items: [
        "Système expert nutritionnel décentralisé (BMR/TDEE — Mifflin-St Jeor)",
        "Module urgence SauveMoi QR avec chiffrement local XOR + Base64",
        "Localisation bilingue FR/AR via localStorage (sans cloud)",
        "Interface RTL adaptée pour la langue arabe",
      ]
    },
    {
      label: "Architecturaux",
      color: C.teal2,
      icon: "🏗",
      items: [
        "Architecture offline-first : toutes fonctions critiques sans réseau",
        "Décentralisation : aucune donnée médicale vers serveurs distants",
        "Architecture modulaire : ajout/suppression de composants sans refonte",
      ]
    },
    {
      label: "Académiques",
      color: C.green,
      icon: "🎓",
      items: [
        "Démontrer la faisabilité d'un système expert médical embarqué sans serveur",
        "Évaluer les protocoles de chiffrement légers sur mobile",
        "Proposer un modèle de localisation bilingue native réplicable",
      ]
    },
  ];

  const colX = [0.4, 3.55, 6.7];

  objGroups.forEach((g, i) => {
    const x = colX[i];
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.38, w: 3.0, h: 3.95, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.38, w: 3.0, h: 0.5, fill: { color: g.color } });
    s.addText(g.icon + "  " + g.label, { x, y: 1.38, w: 3.0, h: 0.5, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

    g.items.forEach((item, j) => {
      const iy = 1.98 + j * 0.88;
      s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: iy + 0.08, w: 0.22, h: 0.22, fill: { color: g.color, transparency: 60 } });
      s.addText(item, { x: x + 0.48, y: iy, w: 2.4, h: 0.78, fontSize: 9.5, color: C.slate, valign: "top", margin: 0 });
    });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: C.navy } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 6 — METHODOLOGY (Architecture + process)
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.off };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: C.navy } });
  s.addText("MÉTHODOLOGIE", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("05", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("Architecture & Démarche de Développement", {
    x: 0.4, y: 0.68, w: 9.2, h: 0.52, fontSize: 20, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
  });

  // Left: Tech stack
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.35, w: 4.5, h: 3.88, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addText("Stack Technique", { x: 0.55, y: 1.48, w: 4.2, h: 0.34, fontSize: 13, bold: true, color: C.dark, margin: 0 });

  const stack = [
    { layer: "Frontend", tech: "HTML5 · CSS3 · JavaScript ES6 Modules", color: C.teal },
    { layer: "Données", tech: "JSON local — symptoms_database.json · pharmanutri_database.json", color: C.teal2 },
    { layer: "IA / Expert", tech: "Règles métier embarquées — aucun appel LLM externe", color: C.green },
    { layer: "Chiffrement", tech: "XOR + Base64 — local, offline-first", color: C.red },
    { layer: "Localisation", tech: "localStorage / i18n.js — FR ↔ AR avec RTL dynamique", color: C.amber },
    { layer: "QR Code", tech: "qrcodejs (CDN) — génération côté client uniquement", color: C.muted },
  ];

  stack.forEach((row, i) => {
    const y = 1.95 + i * 0.53;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y, w: 1.0, h: 0.36, fill: { color: row.color, transparency: 78 }, line: { color: row.color, width: 0 } });
    s.addText(row.layer, { x: 0.55, y, w: 1.0, h: 0.36, fontSize: 8.5, bold: true, color: row.color, align: "center", valign: "middle", margin: 0 });
    s.addText(row.tech, { x: 1.65, y, w: 3.1, h: 0.36, fontSize: 9, color: C.slate, valign: "middle", margin: 0 });
  });

  // Right: Agile phases
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.35, w: 4.4, h: 3.88, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addText("Démarche Agile (15 semaines)", { x: 5.35, y: 1.48, w: 4.1, h: 0.34, fontSize: 13, bold: true, color: C.dark, margin: 0 });

  const phases = [
    { num: "1", name: "Analyse & Spécification", dur: "4 sem.", detail: "Recueil des besoins, étude de l'existant, décisions de périmètre (retrait PharmaInfo).", color: C.teal },
    { num: "2", name: "Conception & Implémentation", dur: "8 sem.", detail: "Architecture modulaire, développement OrientNutri + SauveMoi QR, interface bilingue.", color: C.teal2 },
    { num: "3", name: "Test & Validation", dur: "3 sem.", detail: "Tests unitaires algorithmes nutritionnels, conformité chiffrement, scénarios urgence.", color: C.green },
  ];

  phases.forEach((ph, i) => {
    const y = 1.96 + i * 1.05;
    s.addShape(pres.shapes.OVAL, { x: 5.35, y: y + 0.14, w: 0.44, h: 0.44, fill: { color: ph.color } });
    s.addText(ph.num, { x: 5.35, y: y + 0.14, w: 0.44, h: 0.44, fontSize: 12, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(ph.name, { x: 5.9, y, w: 2.5, h: 0.34, fontSize: 11, bold: true, color: C.dark, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 8.45, y: y + 0.04, w: 0.9, h: 0.26, fill: { color: ph.color, transparency: 75 } });
    s.addText(ph.dur, { x: 8.45, y: y + 0.04, w: 0.9, h: 0.26, fontSize: 8.5, bold: true, color: ph.color, align: "center", valign: "middle", margin: 0 });
    s.addText(ph.detail, { x: 5.9, y: y + 0.38, w: 3.5, h: 0.58, fontSize: 9, color: C.muted, margin: 0 });
    if (i < 2) s.addShape(pres.shapes.LINE, { x: 5.57, y: y + 0.62, w: 0, h: 0.4, line: { color: ph.color, width: 1.5, transparency: 50 } });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: C.navy } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 7 — METHODOLOGY (OrientNutri deep-dive)
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.off };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: C.navy } });
  s.addText("MÉTHODOLOGIE", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("06", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("OrientNutri & SauveMoi QR — Algorithmes Clés", {
    x: 0.4, y: 0.68, w: 9.2, h: 0.52, fontSize: 20, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
  });

  // OrientNutri card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.38, w: 4.5, h: 3.82, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.38, w: 4.5, h: 0.45, fill: { color: C.green } });
  s.addText("🥗  OrientNutri — Système Expert Nutritionnel", { x: 0.5, y: 1.38, w: 4.3, h: 0.45, fontSize: 11, bold: true, color: C.white, valign: "middle", margin: 0 });

  s.addText("Équation de Mifflin-St Jeor :", { x: 0.55, y: 1.92, w: 4.2, h: 0.28, fontSize: 10.5, bold: true, color: C.dark, margin: 0 });

  // Formula boxes
  const formulas = [
    { label: "Homme", f: "BMR = 10×P + 6.25×T − 5×Â + 5" },
    { label: "Femme", f: "BMR = 10×P + 6.25×T − 5×Â − 161" },
  ];
  formulas.forEach((fm, i) => {
    const y = 2.25 + i * 0.44;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y, w: 4.2, h: 0.36, fill: { color: "F0FDF4" }, line: { color: C.green, width: 1 } });
    s.addText(fm.label + ":", { x: 0.65, y, w: 0.7, h: 0.36, fontSize: 9, bold: true, color: C.green, valign: "middle", margin: 0 });
    s.addText(fm.f, { x: 1.38, y, w: 3.2, h: 0.36, fontSize: 9.5, color: C.dark, italic: true, valign: "middle", margin: 0, fontFace: "Consolas" });
  });

  s.addText("TDEE = BMR × Facteur d'activité (NAP : 1.2 – 1.9)", {
    x: 0.55, y: 3.15, w: 4.2, h: 0.32, fontSize: 9.5, color: C.muted, italic: true, margin: 0
  });

  s.addText("Répartition macronutriments selon l'objectif :", { x: 0.55, y: 3.52, w: 4.2, h: 0.28, fontSize: 10, bold: true, color: C.dark, margin: 0 });
  const macros = [
    { obj: "Perte de poids", ratio: "P 40% · L 30% · G 30%", color: C.teal },
    { obj: "Maintien", ratio: "P 30% · L 30% · G 40%", color: C.green },
    { obj: "Prise de masse", ratio: "P 35% · L 25% · G 40%", color: C.amber },
  ];
  macros.forEach((m, i) => {
    const y = 3.86 + i * 0.38;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y, w: 0.06, h: 0.3, fill: { color: m.color } });
    s.addText(m.obj + " → " + m.ratio, { x: 0.7, y, w: 4.1, h: 0.3, fontSize: 9, color: C.slate, valign: "middle", margin: 0 });
  });

  // SauveMoi QR card
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.38, w: 4.4, h: 3.82, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.38, w: 4.4, h: 0.45, fill: { color: C.red } });
  s.addText("🆘  SauveMoi QR — Chiffrement Local d'Urgence", { x: 5.3, y: 1.38, w: 4.2, h: 0.45, fontSize: 11, bold: true, color: C.white, valign: "middle", margin: 0 });

  s.addText("Protocole de sécurité :", { x: 5.35, y: 1.92, w: 4.1, h: 0.28, fontSize: 10.5, bold: true, color: C.dark, margin: 0 });

  const steps = [
    { n: "1", t: "Saisie des données cliniques", d: "Groupe sanguin, allergies, pathologies, traitements, contacts urgence." },
    { n: "2", t: "Chiffrement XOR + Base64", d: "Clé dérivée localement — aucune donnée n'est transmise au réseau." },
    { n: "3", t: "Génération QR Code", d: "qrcodejs côté client — données encodées dans le QR, scannable offline." },
    { n: "4", t: "Déchiffrement par secouriste", d: "Scan QR → décodage Base64 → XOR inverse → fiche clinique lisible." },
  ];
  steps.forEach((st, i) => {
    const y = 2.28 + i * 0.82;
    s.addShape(pres.shapes.OVAL, { x: 5.35, y: y + 0.06, w: 0.34, h: 0.34, fill: { color: C.red } });
    s.addText(st.n, { x: 5.35, y: y + 0.06, w: 0.34, h: 0.34, fontSize: 10, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(st.t, { x: 5.78, y, w: 3.6, h: 0.3, fontSize: 10.5, bold: true, color: C.dark, margin: 0 });
    s.addText(st.d, { x: 5.78, y: y + 0.32, w: 3.6, h: 0.42, fontSize: 9, color: C.muted, margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: C.navy } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 8 — RESULTS (OrientIA)
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.off };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: C.navy } });
  s.addText("RÉSULTATS", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("07", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("OrientIA — Assistant Médical IA", {
    x: 0.4, y: 0.68, w: 9.2, h: 0.52, fontSize: 22, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
  });

  // Big stats row
  const bigStats = [
    { val: "100+", label: "Symptômes reconnus", color: C.teal },
    { val: "30+", label: "Spécialités médicales", color: C.teal2 },
    { val: "48", label: "Wilayas avec hôpitaux", color: C.green },
    { val: "4", label: "Niveaux d'urgence\nURG_1 → URG_4", color: C.red },
  ];
  bigStats.forEach((bs, i) => {
    const x = 0.4 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.35, w: 2.1, h: 1.1, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.35, w: 2.1, h: 0.05, fill: { color: bs.color } });
    s.addText(bs.val, { x, y: 1.42, w: 2.1, h: 0.5, fontSize: 28, bold: true, color: bs.color, align: "center", valign: "middle", fontFace: "Calibri", margin: 0 });
    s.addText(bs.label, { x, y: 1.88, w: 2.1, h: 0.5, fontSize: 9, color: C.muted, align: "center", margin: 0 });
  });

  // Feature details
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 2.58, w: 9.2, h: 2.65, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addText("Fonctionnalités Clés de OrientIA", { x: 0.6, y: 2.7, w: 8.8, h: 0.34, fontSize: 13, bold: true, color: C.dark, margin: 0 });

  const feats = [
    { icon: "🔍", title: "Reconnaissance de symptômes", desc: "Analyse textuelle + synonymes — ex. 'mal de tête', 'céphalée', 'migraine' → même entrée." },
    { icon: "🏥", title: "Orientation vers spécialiste", desc: "Spécialiste principal + spécialistes secondaires + premier recours (pharmacien/urgences)." },
    { icon: "📋", title: "Causes & Questions de triage", desc: "5 causes fréquentes + 4 questions cliniques de suivi affichées au patient." },
    { icon: "📍", title: "Établissements par wilaya", desc: "Sélection wilaya → liste hôpitaux publics + cliniques privées avec spécialités et téléphone." },
  ];
  feats.forEach((f, i) => {
    const col = i % 2; const row = Math.floor(i / 2);
    const x = 0.6 + col * 4.6;
    const y = 3.15 + row * 0.88;
    s.addShape(pres.shapes.OVAL, { x, y: y + 0.04, w: 0.38, h: 0.38, fill: { color: C.teal, transparency: 78 } });
    s.addText(f.icon, { x, y: y + 0.04, w: 0.38, h: 0.38, fontSize: 11, align: "center", valign: "middle", margin: 0 });
    s.addText(f.title, { x: x + 0.46, y, w: 4.0, h: 0.28, fontSize: 10.5, bold: true, color: C.dark, margin: 0 });
    s.addText(f.desc, { x: x + 0.46, y: y + 0.3, w: 4.0, h: 0.5, fontSize: 9, color: C.muted, margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: C.navy } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 9 — RESULTS (OrientNutri validation)
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.off };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: C.navy } });
  s.addText("RÉSULTATS", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("08", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("OrientNutri — Validation des Algorithmes", {
    x: 0.4, y: 0.68, w: 9.2, h: 0.52, fontSize: 22, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
  });

  // Table of validation test cases
  s.addText("Tableau 2.3 — Cas de test de validation (extrait)", { x: 0.4, y: 1.3, w: 9.2, h: 0.3, fontSize: 11, italic: true, color: C.muted, margin: 0 });

  const headers = ["Profil", "BMR Calculé", "TDEE (NAP×1.55)", "Objectif", "Protéines", "Statut"];
  const rows = [
    ["H, 25a, 75kg, 1m78", "1 798 kcal", "2 787 kcal", "Prise de masse", "243 g", "✓ Conforme"],
    ["F, 32a, 62kg, 1m65", "1 412 kcal", "2 189 kcal", "Perte de poids", "219 g", "✓ Conforme"],
    ["H, 45a, 90kg, 1m80", "1 900 kcal", "2 945 kcal", "Maintien", "221 g", "✓ Conforme"],
    ["F, 19a, 55kg, 1m60", "1 330 kcal", "2 062 kcal", "Prise de masse", "180 g", "✓ Conforme"],
  ];

  const colW = [2.2, 1.5, 1.65, 1.6, 1.2, 1.3];
  const colX2 = [0.4, 2.6, 4.1, 5.75, 7.35, 8.55];

  // Header row
  headers.forEach((h, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: colX2[i], y: 1.72, w: colW[i], h: 0.38, fill: { color: C.navy } });
    s.addText(h, { x: colX2[i], y: 1.72, w: colW[i], h: 0.38, fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
  });

  rows.forEach((row, ri) => {
    const rowY = 2.12 + ri * 0.44;
    const bg = ri % 2 === 0 ? "F8FAFC" : C.white;
    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, { x: colX2[ci], y: rowY, w: colW[ci], h: 0.4, fill: { color: bg }, line: { color: "E2E8F0", width: 0.5 } });
      const isConf = cell.startsWith("✓");
      s.addText(cell, { x: colX2[ci], y: rowY, w: colW[ci], h: 0.4, fontSize: 9, color: isConf ? C.green : C.slate, align: "center", valign: "middle", bold: isConf, margin: 0 });
    });
  });

  // Macros bar chart (visual)
  s.addText("Répartition macronutriments — Profil Prise de masse (2 945 kcal)", { x: 0.4, y: 4.0, w: 9.2, h: 0.28, fontSize: 10.5, bold: true, color: C.dark, margin: 0 });

  const macroData = [
    { label: "Protéines 35%", pct: 0.35, color: C.teal, kcal: "1 031 kcal" },
    { label: "Glucides 40%", pct: 0.40, color: C.teal2, kcal: "1 178 kcal" },
    { label: "Lipides 25%", pct: 0.25, color: C.amber, kcal: "736 kcal" },
  ];
  const barW = 8.2, barX = 0.9, barY = 4.38;
  macroData.forEach((m, i) => {
    const w = m.pct * barW;
    const prevW = macroData.slice(0, i).reduce((a, b) => a + b.pct * barW, 0);
    s.addShape(pres.shapes.RECTANGLE, { x: barX + prevW, y: barY, w, h: 0.45, fill: { color: m.color } });
    if (w > 1.0) s.addText(m.label + " — " + m.kcal, { x: barX + prevW + 0.05, y: barY, w: w - 0.1, h: 0.45, fontSize: 8.5, color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: C.navy } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 10 — RESULTS (SauveMoi QR + Map)
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.off };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: C.navy } });
  s.addText("RÉSULTATS", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("09", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("SauveMoi QR & OrientMap — Résultats", {
    x: 0.4, y: 0.68, w: 9.2, h: 0.52, fontSize: 22, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
  });

  // SauveMoi card
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.35, w: 4.5, h: 3.88, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.35, w: 4.5, h: 0.42, fill: { color: C.red } });
  s.addText("🆘  SauveMoi QR — Fiche Clinique d'Urgence", { x: 0.5, y: 1.35, w: 4.3, h: 0.42, fontSize: 11, bold: true, color: C.white, valign: "middle", margin: 0 });

  const qrFields = [
    { field: "Groupe sanguin", ex: "A+" },
    { field: "Allergies", ex: "Pénicilline, Aspirine" },
    { field: "Pathologies", ex: "Diabète type 2, HTA" },
    { field: "Traitements en cours", ex: "Metformine 500mg" },
    { field: "Contact d'urgence", ex: "+213 5X XX XX XX" },
    { field: "Médecin traitant", ex: "Dr. Mansouri — Alger" },
    { field: "Antécédents chirurgicaux", ex: "Appendicectomie 2019" },
  ];

  s.addText("Champs de la fiche clinique chiffrée :", { x: 0.58, y: 1.85, w: 4.1, h: 0.28, fontSize: 10, bold: true, color: C.dark, margin: 0 });

  qrFields.forEach((qf, i) => {
    const y = 2.2 + i * 0.38;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.58, y, w: 4.15, h: 0.33, fill: { color: i % 2 === 0 ? "FFF5F5" : C.white }, line: { color: "FCA5A5", width: 0.5 } });
    s.addText(qf.field + ":", { x: 0.65, y, w: 1.8, h: 0.33, fontSize: 8.5, bold: true, color: C.red, valign: "middle", margin: 0 });
    s.addText(qf.ex, { x: 2.5, y, w: 2.1, h: 0.33, fontSize: 8.5, color: C.slate, italic: true, valign: "middle", margin: 0 });
  });

  // OrientMap card
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.35, w: 4.4, h: 3.88, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.35, w: 4.4, h: 0.42, fill: { color: C.amber } });
  s.addText("🗺  OrientMap — Carte Santé Interactive", { x: 5.3, y: 1.35, w: 4.2, h: 0.42, fontSize: 11, bold: true, color: C.white, valign: "middle", margin: 0 });

  const mapFeats = [
    { icon: "📍", title: "Géolocalisation GPS", desc: "Détection position → affichage structures de santé proches en temps réel." },
    { icon: "🏥", title: "Hôpitaux Publics & Cliniques", desc: "Filtrage par type d'établissement + spécialités disponibles par wilaya." },
    { icon: "💊", title: "Pharmacies de garde", desc: "Localisation pharmacies de garde 24h/7j — données actualisées." },
    { icon: "🚨", title: "Urgences SAMU 14", desc: "Accès direct numéro SAMU 14 et Protection Civile 1021 depuis la carte." },
    { icon: "📱", title: "Interface responsive", desc: "Adapté mobile et tablette, mode sombre, support arabe RTL." },
  ];
  mapFeats.forEach((mf, i) => {
    const y = 1.86 + i * 0.6;
    s.addShape(pres.shapes.OVAL, { x: 5.3, y: y + 0.06, w: 0.32, h: 0.32, fill: { color: C.amber, transparency: 75 } });
    s.addText(mf.icon, { x: 5.3, y: y + 0.06, w: 0.32, h: 0.32, fontSize: 9, align: "center", valign: "middle", margin: 0 });
    s.addText(mf.title, { x: 5.7, y, w: 3.7, h: 0.28, fontSize: 10.5, bold: true, color: C.dark, margin: 0 });
    s.addText(mf.desc, { x: 5.7, y: y + 0.3, w: 3.7, h: 0.28, fontSize: 9, color: C.muted, margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: C.navy } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 11 — RESULTS (Benchmarks & KPIs)
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.off };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: C.navy } });
  s.addText("RÉSULTATS", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("10", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("Bilan des Résultats & Performances", {
    x: 0.4, y: 0.68, w: 9.2, h: 0.52, fontSize: 22, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
  });

  // Comparison bar chart
  s.addText("Analyse comparative — OrientDZ vs applications existantes", {
    x: 0.4, y: 1.3, w: 9.2, h: 0.3, fontSize: 11, italic: true, color: C.muted, margin: 0
  });

  const criteria = [
    { label: "Fonctionnement offline", orientdz: 100, concur: 15 },
    { label: "Bilingue FR/AR natif", orientdz: 100, concur: 10 },
    { label: "0 donnée vers cloud", orientdz: 100, concur: 5 },
    { label: "Urgence QR code", orientdz: 100, concur: 0 },
    { label: "Nutrition intégrée", orientdz: 100, concur: 30 },
  ];

  const bChartData = [
    { name: "OrientDZ", labels: criteria.map(c => c.label), values: criteria.map(c => c.orientdz) },
    { name: "Apps existantes (moy.)", labels: criteria.map(c => c.label), values: criteria.map(c => c.concur) },
  ];
  s.addChart(pres.charts.BAR, bChartData, {
    x: 0.4, y: 1.68, w: 9.2, h: 2.62, barDir: "bar",
    chartColors: [C.teal, "CBD5E1"],
    chartArea: { fill: { color: C.white }, roundedCorners: false },
    catAxisLabelColor: C.slate,
    valAxisLabelColor: "94A3B8",
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: C.dark,
    showLegend: true,
    legendPos: "t",
    legendFontSize: 9,
    valAxisMaxVal: 100,
  });

  // Bottom KPI row
  const kpis = [
    { val: "0", unit: "requête réseau", label: "pour les fonctions critiques", color: C.teal },
    { val: "< 1s", unit: "temps de réponse", label: "chatbot symptômes", color: C.green },
    { val: "100%", unit: "offline", label: "OrientNutri + SauveMoi QR", color: C.amber },
    { val: "2", unit: "langues", label: "FR + AR avec RTL dynamique", color: C.teal2 },
  ];
  kpis.forEach((kpi, i) => {
    const x = 0.4 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.45, w: 2.1, h: 0.85, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.45, w: 2.1, h: 0.05, fill: { color: kpi.color } });
    s.addText(kpi.val, { x, y: 4.5, w: 2.1, h: 0.32, fontSize: 22, bold: true, color: kpi.color, align: "center", valign: "middle", fontFace: "Calibri", margin: 0 });
    s.addText(kpi.unit + " — " + kpi.label, { x, y: 4.82, w: 2.1, h: 0.42, fontSize: 8, color: C.muted, align: "center", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: C.navy } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 12 — DISCUSSION
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.off };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: C.navy } });
  s.addText("DISCUSSION", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("11", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("Contributions, Limites & Perspectives", {
    x: 0.4, y: 0.68, w: 9.2, h: 0.52, fontSize: 22, bold: true, color: C.dark, fontFace: "Calibri", margin: 0
  });

  // Contributions
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.35, w: 4.5, h: 2.28, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.35, w: 4.5, h: 0.38, fill: { color: C.teal } });
  s.addText("✅  Contributions", { x: 0.5, y: 1.35, w: 4.3, h: 0.38, fontSize: 11.5, bold: true, color: C.white, valign: "middle", margin: 0 });

  const contribs = [
    "Premier système expert médical bilingue FR/AR embarqué pour l'Algérie",
    "Architecture offline-first sans aucune infrastructure serveur démontrée",
    "Protocole de chiffrement léger (XOR+Base64) validé pour usage médical mobile",
    "Modèle de localisation bilingue native réplicable pour d'autres domaines",
  ];
  contribs.forEach((c, i) => {
    s.addText([
      { text: "→ ", options: { bold: true, color: C.teal } },
      { text: c, options: { color: C.slate } },
    ], { x: 0.55, y: 1.82 + i * 0.44, w: 4.2, h: 0.38, fontSize: 9.5, valign: "middle", margin: 0 });
  });

  // Limits
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.35, w: 4.4, h: 2.28, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.35, w: 4.4, h: 0.38, fill: { color: C.amber } });
  s.addText("⚠  Limites Actuelles", { x: 5.3, y: 1.35, w: 4.2, h: 0.38, fontSize: 11.5, bold: true, color: C.white, valign: "middle", margin: 0 });

  const limits = [
    "Données symptômes : base statique (non mise à jour en temps réel)",
    "Chiffrement XOR : léger, non cryptographiquement robuste (usage interne)",
    "OrientMap : données géographiques à enrichir pour communes rurales",
    "Pas de compte utilisateur (historique non persistant entre sessions)",
  ];
  limits.forEach((l, i) => {
    s.addText([
      { text: "→ ", options: { bold: true, color: C.amber } },
      { text: l, options: { color: C.slate } },
    ], { x: 5.35, y: 1.82 + i * 0.44, w: 4.1, h: 0.38, fontSize: 9.5, valign: "middle", margin: 0 });
  });

  // Perspectives
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.78, w: 9.2, h: 1.45, fill: { color: C.white }, shadow: makeShadow(), line: { color: "E2E8F0", width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.78, w: 9.2, h: 0.38, fill: { color: C.teal2 } });
  s.addText("🚀  Perspectives & Évolutions", { x: 0.5, y: 3.78, w: 8.8, h: 0.38, fontSize: 11.5, bold: true, color: C.white, valign: "middle", margin: 0 });

  const persp = [
    { icon: "📱", text: "Version React Native pour iOS/Android" },
    { icon: "🤖", text: "Intégration LLM local (Llama) pour OrientIA" },
    { icon: "🔐", text: "Chiffrement AES-256 pour SauveMoi QR" },
    { icon: "💼", text: "Valorisation sous forme de startup HealthTech" },
  ];
  persp.forEach((p, i) => {
    const x = 0.6 + i * 2.35;
    s.addShape(pres.shapes.OVAL, { x, y: 4.24, w: 0.3, h: 0.3, fill: { color: C.teal2, transparency: 70 } });
    s.addText(p.icon, { x, y: 4.24, w: 0.3, h: 0.3, fontSize: 9, align: "center", valign: "middle", margin: 0 });
    s.addText(p.text, { x: x + 0.38, y: 4.2, w: 1.85, h: 0.42, fontSize: 9.5, color: C.slate, valign: "middle", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: C.navy } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 13 — CONCLUSION
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.navy };

  s.addShape(pres.shapes.OVAL, { x: -1.5, y: -1.5, w: 6, h: 6, fill: { color: C.teal, transparency: 90 }, line: { color: C.teal, width: 1, transparency: 85 } });
  s.addShape(pres.shapes.OVAL, { x: 6.5, y: 2, w: 5, h: 5, fill: { color: C.teal2, transparency: 92 }, line: { color: C.teal2, width: 1, transparency: 88 } });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: "FFFFFF", transparency: 94 } });
  s.addText("CONCLUSION", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("12", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("Conclusion Générale", {
    x: 0.4, y: 0.72, w: 9.2, h: 0.52, fontSize: 24, bold: true, color: C.white, fontFace: "Calibri", margin: 0
  });

  // Summary box
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.35, w: 9.2, h: 1.1, fill: { color: C.teal, transparency: 85 }, line: { color: C.teal, width: 1 } });
  s.addText("OrientDZ démontre qu'il est possible de concevoir une plateforme de santé mobile complète, bilingue (FR/AR), fonctionnant 100% hors-ligne pour ses modules critiques, sans infrastructure cloud, et adaptée aux contraintes spécifiques du contexte algérien.", {
    x: 0.6, y: 1.4, w: 8.8, h: 1.0, fontSize: 12, color: C.white, italic: true, align: "center", valign: "middle", margin: 0
  });

  // 4 achievement pills
  const achieves = [
    { text: "✅ OrientIA opérationnel\n100+ symptômes", color: C.teal },
    { text: "✅ OrientNutri validé\nBMR/TDEE Mifflin", color: C.green },
    { text: "✅ SauveMoi QR\nchiffrement local", color: C.red },
    { text: "✅ 48 wilayas\nOrientMap couvertes", color: C.amber },
  ];
  achieves.forEach((a, i) => {
    const x = 0.4 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.65, w: 2.1, h: 1.0, fill: { color: "FFFFFF", transparency: 90 }, line: { color: a.color, width: 1 } });
    s.addText(a.text, { x, y: 2.65, w: 2.1, h: 1.0, fontSize: 10, bold: true, color: a.color, align: "center", valign: "middle", margin: 0 });
  });

  // Quote / closing
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.82, w: 9.2, h: 0.88, fill: { color: "FFFFFF", transparency: 94 }, line: { color: "FFFFFF", width: 1, transparency: 80 } });
  s.addText('"La technologie au service de la santé pour tous les citoyens algériens — sans barrière réseau, sans barrière linguistique."', {
    x: 0.6, y: 3.88, w: 8.8, h: 0.76, fontSize: 12, color: "94A3B8", italic: true, align: "center", valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: "FFFFFF", transparency: 94 } });
  s.addText("OrientDZ — NIT 2025-2026", { x: 0.3, y: 5.35, w: 5, h: 0.28, fontSize: 8, color: "475569", valign: "middle", margin: 0 });
}

// ════════════════════════════════════════════
// SLIDE 14 — QUESTIONS
// ════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.OVAL, { x: 2, y: 0.5, w: 6, h: 6, fill: { color: C.teal, transparency: 94 }, line: { color: C.teal, width: 1, transparency: 88 } });
  s.addShape(pres.shapes.OVAL, { x: 0.5, y: 3, w: 3, h: 3, fill: { color: C.teal2, transparency: 95 }, line: { color: C.teal2, width: 1, transparency: 90 } });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.55, fill: { color: "FFFFFF", transparency: 94 } });
  s.addText("Q&A", { x: 0.4, y: 0, w: 4, h: 0.55, fontSize: 10, bold: true, color: C.teal, charSpacing: 3, valign: "middle", margin: 0 });
  s.addText("13", { x: 8.8, y: 0, w: 0.8, h: 0.55, fontSize: 11, color: "475569", valign: "middle", align: "right", margin: 0 });

  s.addText("Questions ?", {
    x: 1.0, y: 1.4, w: 8, h: 1.1, fontSize: 52, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0
  });

  s.addText("Merci de votre attention", {
    x: 1.0, y: 2.58, w: 8, h: 0.5, fontSize: 18, color: "94A3B8", align: "center", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.18, w: 3, h: 0.025, fill: { color: C.teal, transparency: 50 } });

  const contactItems = [
    { icon: "📧", text: "islem889.09@gmail.com" },
    { icon: "🎓", text: "Numidia Institute of Technology — NIT 2025-2026" },
    { icon: "🌐", text: "OrientDZ — Plateforme d'orientation médicale en Algérie" },
  ];
  contactItems.forEach((ci, i) => {
    s.addText(ci.icon + "  " + ci.text, {
      x: 1.5, y: 3.42 + i * 0.48, w: 7, h: 0.4, fontSize: 11, color: "94A3B8", align: "center", margin: 0
    });
  });

  // Module recap pills
  const modules2 = [
    { label: "OrientIA", color: C.teal2 },
    { label: "OrientNutri", color: C.green },
    { label: "OrientMap", color: C.amber },
    { label: "SauveMoi QR", color: C.red },
  ];
  modules2.forEach((m, i) => {
    const x = 1.0 + i * 2.1;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 4.88, w: 1.85, h: 0.32, fill: { color: m.color, transparency: 78 }, line: { color: m.color, width: 1 } });
    s.addText(m.label, { x, y: 4.88, w: 1.85, h: 0.32, fontSize: 9.5, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.35, w: 10, h: 0.28, fill: { color: "FFFFFF", transparency: 94 } });
  s.addText("Orient DZ © 2026 — Tous droits réservés", { x: 0.3, y: 5.35, w: 9.4, h: 0.28, fontSize: 8, color: "475569", align: "center", valign: "middle", margin: 0 });
}

// ── Write file ──
const outPath = "C:\\Users\\COMPUTER\\Desktop\\pharmawayyy2\\OrientDZ_PFE_Presentation.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("✅  Presentation saved: " + outPath);
}).catch(err => {
  console.error("❌  Error:", err);
});
