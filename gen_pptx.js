const pptxgen = require("C:/Users/COMPUTER/AppData/Roaming/npm/node_modules/pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "OrientDZ Defense Presentation";
pres.author = "MADJENE Nawel & BENDEBBAH Mohamed Islem";

// ── Color palette ──────────────────────────────────────────────────────────
const C = {
  darkBg:    "0A2540",   // deep navy – title/section/conclusion slides
  primary:   "028090",   // teal
  accent:    "02C39A",   // mint green
  accentWarm:"E8734A",   // coral for warnings/highlights
  lightBg:   "FFFFFF",
  cardBg:    "F0F8FF",
  textDark:  "1E293B",
  textMid:   "475569",
  textLight: "FFFFFF",
  mutedLine: "CBD5E1",
};

// ── Helpers ─────────────────────────────────────────────────────────────────
const makeShadow = () => ({ type: "outer", blur: 6, offset: 3, angle: 135, color: "000000", opacity: 0.10 });

// Dark slide header strip
function addDarkHeader(slide, label) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 5.625,
    fill: { color: C.darkBg }, line: { color: C.darkBg }
  });
  // Left accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.18, h: 5.625,
    fill: { color: C.accent }, line: { color: C.accent }
  });
  if (label) {
    slide.addText(label, {
      x: 0.35, y: 0.12, w: 9.5, h: 0.35,
      fontSize: 9, color: C.accent, bold: true, charSpacing: 4, margin: 0
    });
  }
}

// Content slide: white bg + teal left bar + section label
function addLightSlide(slide, sectionLabel, title) {
  slide.background = { color: C.lightBg };
  // Left sidebar accent
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.12, h: 5.625,
    fill: { color: C.primary }, line: { color: C.primary }
  });
  // Section label top left
  if (sectionLabel) {
    slide.addText(sectionLabel, {
      x: 0.25, y: 0.12, w: 9.5, h: 0.25,
      fontSize: 8, color: C.primary, bold: true, charSpacing: 3, margin: 0
    });
  }
  // Title
  if (title) {
    slide.addText(title, {
      x: 0.25, y: 0.42, w: 9.5, h: 0.55,
      fontSize: 26, fontFace: "Calibri", bold: true, color: C.darkBg, margin: 0
    });
    // thin rule under title
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.25, y: 1.02, w: 9.5, h: 0.03,
      fill: { color: C.mutedLine }, line: { color: C.mutedLine }
    });
  }
}

// Card helper
function addCard(slide, x, y, w, h, title, body, color) {
  color = color || C.primary;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: "FFFFFF" },
    line: { color: C.mutedLine, width: 1 },
    shadow: makeShadow()
  });
  // top color bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.055,
    fill: { color: color }, line: { color: color }
  });
  if (title) {
    slide.addText(title, {
      x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.3,
      fontSize: 11, bold: true, color: C.darkBg, margin: 0
    });
  }
  if (body) {
    slide.addText(body, {
      x: x + 0.15, y: y + 0.42, w: w - 0.3, h: h - 0.5,
      fontSize: 10, color: C.textMid, margin: 0, valign: "top"
    });
  }
}

// Stat callout
function addStat(slide, x, y, w, h, number, label, color) {
  color = color || C.primary;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: color }, line: { color: color },
    shadow: makeShadow()
  });
  slide.addText(number, {
    x, y: y + 0.15, w, h: h * 0.55,
    fontSize: 28, bold: true, color: "FFFFFF", align: "center", margin: 0
  });
  slide.addText(label, {
    x, y: y + h * 0.62, w, h: h * 0.35,
    fontSize: 9, color: "FFFFFF", align: "center", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 1 — Title
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addDarkHeader(slide, null);

  // Top institution line
  slide.addText("NUMIDIA INSTITUTE OF TECHNOLOGY  ·  NIT", {
    x: 0.35, y: 0.22, w: 9.3, h: 0.28,
    fontSize: 9, color: "90C8D0", bold: true, charSpacing: 3, align: "center", margin: 0
  });

  // Mint horizontal rule
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.5, y: 0.55, w: 7, h: 0.04,
    fill: { color: C.accent }, line: { color: C.accent }
  });

  // Main title
  slide.addText("OrientDZ", {
    x: 0.35, y: 0.7, w: 9.3, h: 1.05,
    fontSize: 54, fontFace: "Calibri", bold: true, color: C.textLight, align: "center", margin: 0
  });

  // Subtitle
  slide.addText("A Bilingual Intelligent Web Platform for Health", {
    x: 0.35, y: 1.78, w: 9.3, h: 0.45,
    fontSize: 18, color: C.accent, align: "center", italic: true, margin: 0
  });

  // Mint rule
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.5, y: 2.3, w: 7, h: 0.04,
    fill: { color: C.accent }, line: { color: C.accent }
  });

  // Module badges
  const badges = ["OrientNutri", "SauveMoi QR", "OrientMap", "OrientIA"];
  const bw = 2.0, bh = 0.32, bsy = 2.44, gap = 0.1;
  const totalW = badges.length * bw + (badges.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  badges.forEach((b, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX + i * (bw + gap), y: bsy, w: bw, h: bh,
      fill: { color: C.primary }, line: { color: C.primary }
    });
    slide.addText(b, {
      x: startX + i * (bw + gap), y: bsy, w: bw, h: bh,
      fontSize: 10, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });
  });

  // Authors block
  slide.addText([
    { text: "MADJENE Nawel  ·  BENDEBBAH Mohamed Islem", options: { bold: true, breakLine: true } },
    { text: "Supervisor: M. MAZOUNI Fares", options: { breakLine: true } },
    { text: "Option: Intelligence Artificielle  ·  Licence Informatique  ·  Academic Year 2025–2026", options: {} }
  ], {
    x: 0.35, y: 4.55, w: 9.3, h: 0.9,
    fontSize: 11, color: "90C8D0", align: "center", margin: 0
  });

  // Final Year badge
  slide.addText("PFE Defense  ·  June 2026", {
    x: 3.5, y: 5.2, w: 3, h: 0.28,
    fontSize: 9, color: C.accent, align: "center", charSpacing: 2, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 2 — Outline
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addDarkHeader(slide, "PRESENTATION OVERVIEW");

  slide.addText("Presentation Outline", {
    x: 0.35, y: 0.5, w: 9.3, h: 0.5,
    fontSize: 28, bold: true, color: C.textLight, margin: 0
  });

  const items = [
    ["01", "Introduction", "Context of digital health in Algeria"],
    ["02", "Problem Statement", "Fragmented, cloud-dependent, Arabic-lacking solutions"],
    ["03", "Our Solution", "OrientDZ — the platform overview"],
    ["04", "Objectives", "Goals and scope of the project"],
    ["05", "Methodology", "Architecture, stack, and design decisions"],
    ["06", "Results", "Modules, performance benchmarks, user testing"],
    ["07", "Discussion", "Comparison, limitations, future work"],
    ["08", "Conclusion", "Contributions and outlook"],
  ];

  const colW = 4.5, rowH = 0.56, cols = 2, rows = 4;
  const startX = 0.3, startY = 1.15;
  items.forEach((item, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (colW + 0.2);
    const y = startY + row * (rowH + 0.1);
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: colW, h: rowH,
      fill: { color: "122A42" }, line: { color: C.primary, width: 1 }
    });
    slide.addText(item[0], {
      x: x + 0.1, y, w: 0.45, h: rowH,
      fontSize: 16, bold: true, color: C.accent, valign: "middle", align: "center", margin: 0
    });
    slide.addText(item[1], {
      x: x + 0.62, y: y + 0.06, w: colW - 0.72, h: 0.24,
      fontSize: 12, bold: true, color: C.textLight, margin: 0
    });
    slide.addText(item[2], {
      x: x + 0.62, y: y + 0.3, w: colW - 0.72, h: 0.22,
      fontSize: 9, color: "7ABCC5", margin: 0
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 3 — Introduction: Context
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addLightSlide(slide, "INTRODUCTION", "Digital Health in Algeria: Context");

  // Stats row
  const stats = [
    ["45M+", "Citizens", C.primary],
    ["68%", "4G penetration\n(ARPCE 2024)", C.primary],
    ["3.5M+", "Algerians\nwith diabetes", C.accentWarm],
    ["30%", "Adults with\nhypertension", C.accentWarm],
  ];
  stats.forEach(([num, lbl, col], i) => {
    addStat(slide, 0.25 + i * 2.37, 1.15, 2.2, 1.15, num, lbl, col);
  });

  // Context text
  slide.addText([
    { text: "Algeria's National Health Policy 2025–2030 ", options: { bold: true } },
    { text: "identifies digital health as a priority reform lever, yet a significant gap exists between ambitions and deployed infrastructure.", options: {} }
  ], {
    x: 0.25, y: 2.5, w: 9.5, h: 0.42,
    fontSize: 12, color: C.textDark, margin: 0
  });

  const points = [
    "Rural & peri-urban populations face severe informational asymmetry in accessing medical orientation",
    "Chronic non-communicable diseases (diabetes, hypertension, cardiovascular) demand sustained nutritional education",
    "Existing digital health apps require constant internet connectivity — unusable in low-coverage zones",
    "Medical data transmitted to foreign servers raises legal concerns under Algerian Law n°18-07",
  ];
  slide.addText(
    points.map((p, i) => ({ text: p, options: { bullet: true, breakLine: i < points.length - 1 } })),
    { x: 0.35, y: 3.0, w: 9.2, h: 2.35, fontSize: 12, color: C.textDark, paraSpaceAfter: 4, margin: 0 }
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 4 — Problem Statement
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addLightSlide(slide, "PROBLEM STATEMENT", "What Problems Do We Address?");

  const problems = [
    { title: "No Arabic Support", body: "Existing health apps lack native Arabic UI and RTL layout, excluding the majority of Algerian users." },
    { title: "Cloud Dependency", body: "All available platforms require stable internet — failing in emergencies or low-coverage zones." },
    { title: "Privacy Risks", body: "Medical data transmitted to foreign servers without explicit consent violates Algerian Law n°18-07 on personal data protection." },
    { title: "Fragmented Tools", body: "No single platform integrates nutrition guidance, emergency records, and facility mapping for the Algerian context." },
    { title: "Cost Barriers", body: "Backend infrastructure costs prevent academic and startup-led health projects from scaling sustainably." },
    { title: "Clinical Gap", body: "Insufficient specialized nutritional guidance for the 38 most prevalent chronic pathologies in Algeria." },
  ];

  const cw = 3.0, ch = 1.4, gap = 0.16;
  problems.forEach((p, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    addCard(slide, 0.25 + col * (cw + gap), 1.2 + row * (ch + gap), cw, ch, p.title, p.body, C.accentWarm);
  });

  // Problem question
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.25, y: 4.35, w: 9.5, h: 0.9,
    fill: { color: C.darkBg }, line: { color: C.darkBg }
  });
  slide.addText(
    "Can we build a clinically-grounded, privacy-preserving, fully bilingual (FR/AR) health platform that works offline?",
    { x: 0.45, y: 4.35, w: 9.1, h: 0.9, fontSize: 13, bold: true, color: C.accent, align: "center", valign: "middle", italic: true, margin: 0 }
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 5 — Solution Overview
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addLightSlide(slide, "SOLUTION", "OrientDZ — The Proposed Platform");

  // Central platform label
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.4, y: 1.1, w: 3.2, h: 0.75,
    fill: { color: C.primary }, line: { color: C.primary }, shadow: makeShadow()
  });
  slide.addText("OrientDZ", {
    x: 3.4, y: 1.1, w: 3.2, h: 0.75,
    fontSize: 22, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0
  });

  // Tagline
  slide.addText("Client-side · JAMstack · Bilingual FR/AR · Privacy by Design · Zero Backend", {
    x: 0.3, y: 1.92, w: 9.4, h: 0.28,
    fontSize: 10, color: C.textMid, align: "center", italic: true, margin: 0
  });

  // 4 module cards
  const modules = [
    { name: "OrientNutri", desc: "Clinical nutrition expert system\n38 pathologies · 10 categories\nMifflin-St Jeor BMR · ADA 2023\n3–7 ms inference · No internet", color: C.primary },
    { name: "SauveMoi QR", desc: "Offline emergency medical card\nXOR+Base64 encryption · QR code\nBlood type · Allergies · Contacts\nWorks without network", color: "E05C2D" },
    { name: "OrientMap", desc: "Interactive health facility map\nLeaflet.js + OpenStreetMap\nHospitals · Clinics · Pharmacies\nGeolocation-based search", color: "047857" },
    { name: "OrientIA", desc: "Bilingual conversational AI\nMedical Q&A in FR and AR\nExternal LLM integration\nGeneral health orientation", color: "7C3AED" },
  ];

  const mw = 2.25, mh = 1.9, gap = 0.13;
  modules.forEach((m, i) => {
    const x = 0.25 + i * (mw + gap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.3, w: mw, h: mh,
      fill: { color: "FFFFFF" }, line: { color: C.mutedLine }, shadow: makeShadow()
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.3, w: mw, h: 0.38,
      fill: { color: m.color }, line: { color: m.color }
    });
    slide.addText(m.name, {
      x, y: 2.3, w: mw, h: 0.38,
      fontSize: 12, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });
    slide.addText(m.desc, {
      x: x + 0.1, y: 2.72, w: mw - 0.2, h: mh - 0.45,
      fontSize: 9.5, color: C.textMid, margin: 0, valign: "top"
    });
  });

  // Architecture tag
  slide.addText("Architecture: JAMstack · HTML5 · CSS3 · JavaScript ES6+  ·  Full offline for critical modules", {
    x: 0.25, y: 5.27, w: 9.5, h: 0.25,
    fontSize: 9, color: C.textMid, align: "center", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 6 — Objectives
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addLightSlide(slide, "OBJECTIVES", "Project Goals");

  const objectives = [
    { num: "01", title: "Offline-First Health Guidance", body: "Deliver clinically-grounded nutritional plans for 38 chronic pathologies operating entirely in the browser without any network request." },
    { num: "02", title: "Bilingual Native Support", body: "Implement full French–Arabic UI with dynamic RTL/LTR switching, 300+ translation keys, and zero FOUC through custom i18n engine." },
    { num: "03", title: "Privacy by Design", body: "Ensure all medical data remains exclusively client-side, in compliance with Algerian Law n°18-07 on personal data protection." },
    { num: "04", title: "Emergency Medical Access", body: "Enable first responders to access critical patient data offline via XOR-encrypted QR codes, without any server transmission." },
    { num: "05", title: "Verified Clinical Performance", body: "Achieve Lighthouse scores ≥ 90 (Performance 91, Best Practices 95, SEO 92) and sub-200ms inference latency." },
    { num: "06", title: "Health Facility Discovery", body: "Provide an interactive geolocation-based map of Algerian health facilities using Leaflet.js and OpenStreetMap." },
  ];

  const ow = 4.55, oh = 1.1, gap = 0.16;
  objectives.forEach((obj, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.22 + col * (ow + gap);
    const y = 1.15 + row * (oh + gap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: ow, h: oh,
      fill: { color: "F8FBFF" }, line: { color: C.mutedLine }, shadow: makeShadow()
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.5, h: oh,
      fill: { color: C.primary }, line: { color: C.primary }
    });
    slide.addText(obj.num, {
      x, y, w: 0.5, h: oh,
      fontSize: 13, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });
    slide.addText(obj.title, {
      x: x + 0.6, y: y + 0.1, w: ow - 0.7, h: 0.28,
      fontSize: 11, bold: true, color: C.darkBg, margin: 0
    });
    slide.addText(obj.body, {
      x: x + 0.6, y: y + 0.38, w: ow - 0.7, h: oh - 0.45,
      fontSize: 9, color: C.textMid, margin: 0
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 7 — Methodology: Architecture & Stack
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addLightSlide(slide, "METHODOLOGY", "System Architecture & Technology Stack");

  // 5-layer architecture (left column)
  const layers = [
    { label: "PRESENTATION LAYER", desc: "HTML5 Semantic · CSS3 Design Tokens · RTL/LTR i18n Engine", color: "0E7490" },
    { label: "LOGIC LAYER", desc: "NutriEngine ES6 Class · XOR Cryptography · QR Generator", color: C.primary },
    { label: "DATA LAYER", desc: "LocalStorage · Web Storage API · MEALS_DB · PATHO_PROFILES", color: "047857" },
    { label: "MAPPING LAYER", desc: "Leaflet.js v1.9.4 · OpenStreetMap · Geolocation API", color: "7C3AED" },
    { label: "AI LAYER", desc: "OrientIA · External LLM · Bilingual conversational interface", color: "B45309" },
  ];

  layers.forEach((l, i) => {
    const y = 1.15 + i * 0.82;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.25, y, w: 5.5, h: 0.72,
      fill: { color: "F0F8FF" }, line: { color: C.mutedLine }
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.25, y, w: 2.2, h: 0.72,
      fill: { color: l.color }, line: { color: l.color }
    });
    slide.addText(l.label, {
      x: 0.28, y, w: 2.14, h: 0.72,
      fontSize: 8, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });
    slide.addText(l.desc, {
      x: 2.55, y: y + 0.1, w: 3.1, h: 0.52,
      fontSize: 9.5, color: C.textDark, margin: 0, valign: "middle"
    });
  });

  // Right column: Tech stack
  slide.addText("TECH STACK", {
    x: 5.95, y: 1.1, w: 3.8, h: 0.28,
    fontSize: 9, bold: true, color: C.primary, charSpacing: 3, margin: 0
  });

  const stackItems = [
    ["HTML5 + CSS3", "Semantic markup, design tokens, RTL/LTR"],
    ["JavaScript ES6+", "Class-based architecture, no frameworks"],
    ["Leaflet.js v1.9.4", "Lightweight interactive maps (42KB)"],
    ["QRCode.js v1.0.0", "Client-side QR generation, no dependencies"],
    ["Google Fonts (lazy)", "Inter (FR) + Cairo (AR), injected on demand"],
    ["JAMstack / Static", "GitHub Pages / Netlify · Zero backend cost"],
  ];

  stackItems.forEach(([tech, desc], i) => {
    const y = 1.45 + i * 0.67;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 5.95, y, w: 3.8, h: 0.58,
      fill: { color: "FAFCFE" }, line: { color: C.mutedLine }
    });
    slide.addText(tech, {
      x: 6.05, y: y + 0.05, w: 3.6, h: 0.22,
      fontSize: 10, bold: true, color: C.darkBg, margin: 0
    });
    slide.addText(desc, {
      x: 6.05, y: y + 0.28, w: 3.6, h: 0.22,
      fontSize: 9, color: C.textMid, margin: 0
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 8 — Results: OrientNutri
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addLightSlide(slide, "RESULTS — MODULE 1", "OrientNutri: Nutritional Expert System");

  // Key stats
  const stats = [
    ["38", "Pathologies\ncovered", C.primary],
    ["10", "Clinical\ncategories", C.primary],
    ["3–7ms", "Inference\nlatency", "047857"],
    ["85–98%", "Deterministic\nconfidence score", "047857"],
  ];
  stats.forEach(([n, l, c], i) => addStat(slide, 0.25 + i * 2.37, 1.15, 2.2, 1.1, n, l, c));

  // Two columns below
  // Left: How it works
  slide.addText("How It Works", {
    x: 0.25, y: 2.45, w: 4.5, h: 0.3,
    fontSize: 13, bold: true, color: C.darkBg, margin: 0
  });
  const steps = [
    "User inputs biometric data (age, weight, height, sex, PAL, pathology)",
    "NutriEngine calculates BMR via Mifflin-St Jeor equation (JPEN 1990)",
    "TDEE computed with WHO/FAO PAL coefficients (FAO TRS No.1, 2004)",
    "Caloric target adjusted per goal (loss/maintain/gain) per WHO 2022",
    "Macronutrients derived from PATHO_PROFILES (ADA 2023, DASH, ACC/AHA, KDIGO)",
    "7-day meal plan assembled from bilingual MEALS_DB (CIQUAL 2020 / USDA 2023)",
  ];
  slide.addText(
    steps.map((s, i) => ({ text: s, options: { bullet: true, breakLine: i < steps.length - 1 } })),
    { x: 0.25, y: 2.8, w: 4.55, h: 2.6, fontSize: 10, color: C.textDark, paraSpaceAfter: 3, margin: 0 }
  );

  // Right: Verification case
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4.95, y: 2.45, w: 4.8, h: 2.95,
    fill: { color: "F0F8FF" }, line: { color: C.mutedLine }
  });
  slide.addText("Verification Case", {
    x: 5.05, y: 2.52, w: 4.6, h: 0.28,
    fontSize: 11, bold: true, color: C.primary, margin: 0
  });
  const caseLines = [
    "Male · 35 y/o · 80 kg · 175 cm · Sedentary · Diabetes Type 2",
    "",
    "BMR = (10×80) + (6.25×175) − (5×35) + 5 = 1724 kcal/day",
    "TDEE = 1724 × 1.2 (PAL sedentary) = 2069 kcal/day",
    "Target (maintain) = 2069 kcal/day",
    "Profile: ADA 2023 → P 25% · G 40% · L 35%",
    "Proteins: 129 g  ·  Carbs: 207 g  ·  Fats: 80 g",
    "",
    "Confidence score: 92% (deterministic)",
  ];
  slide.addText(
    caseLines.map((l, i) => ({ text: l, options: { breakLine: i < caseLines.length - 1 } })),
    { x: 5.05, y: 2.85, w: 4.6, h: 2.45, fontSize: 10, color: C.textDark, fontFace: "Consolas", margin: 0 }
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 9 — Results: SauveMoi QR
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addLightSlide(slide, "RESULTS — MODULE 2", "SauveMoi QR: Offline Emergency Medical Card");

  // Left: How it works
  slide.addText("Cryptographic Protocol", {
    x: 0.25, y: 1.2, w: 4.6, h: 0.3,
    fontSize: 13, bold: true, color: C.darkBg, margin: 0
  });
  const steps = [
    "User fills emergency form: blood type, allergies, pathologies, medications, emergency contact",
    "Data serialized to JSON → UTF-8 byte array via TextEncoder()",
    "XOR encryption: C[i] = P[i] ⊕ K[i mod 34]  with 34-byte APP_KEY",
    "Base64 encoding via btoa() → URL-safe ASCII string",
    "URL constructed: emergency_qr.html?data=<encoded>",
    "QRCode.js generates scannable QR (180×180 px, Error Correction M)",
    "On scan: automatic decryption → emergency overlay displays in full screen",
  ];
  slide.addText(
    steps.map((s, i) => ({ text: s, options: { bullet: true, breakLine: i < steps.length - 1 } })),
    { x: 0.25, y: 1.55, w: 4.6, h: 3.55, fontSize: 10, color: C.textDark, paraSpaceAfter: 4, margin: 0 }
  );

  // Right: Key properties
  slide.addText("Key Properties", {
    x: 5.05, y: 1.2, w: 4.7, h: 0.3,
    fontSize: 13, bold: true, color: C.darkBg, margin: 0
  });

  const props = [
    { title: "Zero Transmission", desc: "No data sent to any server — entire medical record lives in the QR URL", color: "E05C2D" },
    { title: "Full Arabic Support", desc: "UTF-8 multi-byte handling via TextEncoder/TextDecoder preserves Arabic text through encryption", color: C.primary },
    { title: "Instant Decryption", desc: "XOR self-inverse property → same function encrypts and decrypts, sub-millisecond", color: "047857" },
    { title: "Emergency Display", desc: "Scan mode: full-screen overlay with blood type, allergies in red, SAMU 14 / Urgences 15 direct call", color: "7C3AED" },
    { title: "Portable Formats", desc: "Download as wallet card (1010×638 px PNG) or phone wallpaper (1080×1920 px)", color: "B45309" },
  ];

  props.forEach((p, i) => {
    const y = 1.55 + i * 0.75;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 5.05, y, w: 4.7, h: 0.65,
      fill: { color: "FAFCFE" }, line: { color: C.mutedLine }
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 5.05, y, w: 0.08, h: 0.65,
      fill: { color: p.color }, line: { color: p.color }
    });
    slide.addText(p.title, {
      x: 5.22, y: y + 0.06, w: 4.4, h: 0.22,
      fontSize: 10, bold: true, color: C.darkBg, margin: 0
    });
    slide.addText(p.desc, {
      x: 5.22, y: y + 0.3, w: 4.4, h: 0.28,
      fontSize: 9, color: C.textMid, margin: 0
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 10 — Results: OrientMap, OrientIA & i18n
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addLightSlide(slide, "RESULTS — MODULES 3 & 4", "OrientMap · OrientIA · Bilingual Engine");

  const cards = [
    {
      title: "OrientMap",
      color: "047857",
      items: [
        "Interactive map of Algerian health facilities",
        "Leaflet.js v1.9.4 (42KB) + OpenStreetMap (ODbL)",
        "Hospitals · Clinics · Pharmacies · Care Centers",
        "Geolocation-based nearest facility search",
        "Mobile-responsive with pinch-to-zoom support",
      ]
    },
    {
      title: "OrientIA",
      color: "7C3AED",
      items: [
        "Bilingual conversational medical assistant",
        "French & Arabic health Q&A interface",
        "External LLM integration for general orientation",
        "Clearly scoped to general guidance (not diagnosis)",
        "Consistent UI with rest of the platform",
      ]
    },
    {
      title: "i18n Engine",
      color: C.primary,
      items: [
        "300+ translation keys (FR/AR) in js/i18n.js",
        "switchLanguage() persists in localStorage",
        "Dynamic RTL/LTR: html[dir] attribute switch",
        "Lazy Arabic font injection (Cairo, Google Fonts)",
        "CustomEvent('pw:langchange') syncs all modules",
        "Zero FOUC (Flash of Unstyled Content)",
      ]
    },
  ];

  const cw = 3.05, ch = 3.9, gap = 0.12;
  cards.forEach((card, i) => {
    const x = 0.25 + i * (cw + gap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.15, w: cw, h: ch,
      fill: { color: "FAFCFE" }, line: { color: C.mutedLine }, shadow: makeShadow()
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.15, w: cw, h: 0.38,
      fill: { color: card.color }, line: { color: card.color }
    });
    slide.addText(card.title, {
      x, y: 1.15, w: cw, h: 0.38,
      fontSize: 13, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0
    });
    slide.addText(
      card.items.map((it, j) => ({ text: it, options: { bullet: true, breakLine: j < card.items.length - 1 } })),
      { x: x + 0.12, y: 1.6, w: cw - 0.24, h: ch - 0.52, fontSize: 10, color: C.textDark, paraSpaceAfter: 3, margin: 0 }
    );
  });

  // Bottom note
  slide.addText("All modules share a unified design token system (CSS custom properties) ensuring visual consistency across the platform.", {
    x: 0.25, y: 5.2, w: 9.5, h: 0.28,
    fontSize: 9, color: C.textMid, align: "center", italic: true, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 11 — Results: Performance Benchmarks
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addLightSlide(slide, "RESULTS — PERFORMANCE", "Benchmarks & Lighthouse Scores");

  // Lighthouse scores
  const lhScores = [
    ["91", "Performance", C.primary],
    ["87", "Accessibility", "047857"],
    ["95", "Best Practices", C.accent],
    ["92", "SEO", "7C3AED"],
  ];
  lhScores.forEach(([score, label, color], i) => {
    const x = 0.25 + i * 2.37;
    slide.addShape(pres.shapes.OVAL, {
      x, y: 1.1, w: 1.9, h: 1.9,
      fill: { color: "FFFFFF" }, line: { color: color, width: 4 }, shadow: makeShadow()
    });
    slide.addText(score, {
      x, y: 1.28, w: 1.9, h: 0.85,
      fontSize: 34, bold: true, color: color, align: "center", margin: 0
    });
    slide.addText("/100", {
      x, y: 2.05, w: 1.9, h: 0.3,
      fontSize: 10, color: color, align: "center", margin: 0
    });
    slide.addText(label, {
      x, y: 3.05, w: 1.9, h: 0.28,
      fontSize: 10, bold: true, color: C.textDark, align: "center", margin: 0
    });
  });

  // Latency table
  slide.addText("Latency Benchmarks", {
    x: 0.25, y: 3.5, w: 5.5, h: 0.3,
    fontSize: 13, bold: true, color: C.darkBg, margin: 0
  });

  const tableData = [
    [
      { text: "Operation", options: { bold: true, color: "FFFFFF", fill: { color: C.darkBg } } },
      { text: "Latency", options: { bold: true, color: "FFFFFF", fill: { color: C.darkBg } } },
    ],
    ["OrientNutri full inference (run())", "3–7 ms"],
    ["SauveMoi XOR encrypt/decrypt", "< 1 ms"],
    ["Page initial load (4G)", "< 2 s"],
    ["Language switch (switchLanguage)", "< 10 ms"],
  ];

  slide.addTable(tableData, {
    x: 0.25, y: 3.85, w: 5.5, h: 1.5,
    border: { pt: 0.5, color: C.mutedLine },
    colW: [3.8, 1.7],
    rowH: 0.3,
    fontSize: 10,
    color: C.textDark,
  });

  // Right: Functional coverage
  slide.addText("Test & Validation", {
    x: 6.0, y: 3.5, w: 3.75, h: 0.3,
    fontSize: 13, bold: true, color: C.darkBg, margin: 0
  });
  const validItems = [
    "5 user profiles tested (student, teacher, retiree, GP, nurse)",
    "SauveMoi QR rated 'immediately useful' by all participants",
    "GP confirmed clinical relevance of nutritional profiles",
    "Sub-200ms inference on entry-level smartphone",
    "Full offline functionality for OrientNutri + SauveMoi",
    "Arabic RTL rendering verified on Chrome + Firefox",
  ];
  slide.addText(
    validItems.map((v, i) => ({ text: v, options: { bullet: true, breakLine: i < validItems.length - 1 } })),
    { x: 6.0, y: 3.85, w: 3.75, h: 1.6, fontSize: 9.5, color: C.textDark, paraSpaceAfter: 3, margin: 0 }
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 12 — Discussion: Comparison & Limitations
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addLightSlide(slide, "DISCUSSION", "Comparison with Existing Solutions & Limitations");

  // Comparison table
  slide.addText("vs. Existing Health Platforms", {
    x: 0.25, y: 1.15, w: 5.5, h: 0.28,
    fontSize: 12, bold: true, color: C.darkBg, margin: 0
  });

  const tableData = [
    [
      { text: "Feature", options: { bold: true, color: "FFFFFF", fill: { color: C.darkBg } } },
      { text: "Existing Apps", options: { bold: true, color: "FFFFFF", fill: { color: C.darkBg } } },
      { text: "OrientDZ", options: { bold: true, color: "FFFFFF", fill: { color: C.primary } } },
    ],
    ["Native Arabic + RTL", "Rare / poor quality", "✓ Full, native"],
    ["Offline operation", "None", "✓ Critical modules"],
    ["Privacy (no server)", "Always cloud", "✓ Client-side only"],
    ["Emergency QR card", "None", "✓ SauveMoi QR"],
    ["Clinical nutrition (38 paths)", "None", "✓ OrientNutri"],
    ["Zero backend cost", "No", "✓ Static hosting"],
    ["Algerian Law 18-07", "Not addressed", "✓ By design"],
  ];

  slide.addTable(tableData, {
    x: 0.25, y: 1.5, w: 5.5, h: 3.9,
    border: { pt: 0.5, color: C.mutedLine },
    colW: [2.2, 1.65, 1.65],
    rowH: 0.5,
    fontSize: 10,
    color: C.textDark,
  });

  // Limitations
  slide.addText("Current Limitations", {
    x: 6.0, y: 1.15, w: 3.75, h: 0.28,
    fontSize: 12, bold: true, color: C.accentWarm, margin: 0
  });
  const limits = [
    "Accessibility score 87/100 — some dynamic ARIA labels incomplete",
    "OrientIA depends on external LLM — no offline AI conversation",
    "MEALS_DB limited to 24 dishes (to be enriched with Algerian dishes)",
    "No longitudinal biometric tracking across sessions",
    "OrientMap facility data manually curated, not real-time",
    "XOR encryption provides obfuscation, not cryptographic hardening",
  ];
  slide.addText(
    limits.map((l, i) => ({ text: l, options: { bullet: true, breakLine: i < limits.length - 1 } })),
    { x: 6.0, y: 1.5, w: 3.75, h: 2.5, fontSize: 9.5, color: C.textDark, paraSpaceAfter: 4, margin: 0 }
  );

  // Future work
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 6.0, y: 4.1, w: 3.75, h: 1.3,
    fill: { color: "EFF9F7" }, line: { color: C.accent, width: 1 }
  });
  slide.addText("Future Work", {
    x: 6.1, y: 4.17, w: 3.55, h: 0.25,
    fontSize: 10, bold: true, color: C.primary, margin: 0
  });
  slide.addText(
    [
      { text: "Service Worker → full PWA offline install", options: { bullet: true, breakLine: true } },
      { text: "Accessibility score → 95+ (complete ARIA)", options: { bullet: true, breakLine: true } },
      { text: "Optional lightweight backend for sync", options: { bullet: true, breakLine: true } },
      { text: "Partnership with Algerian public health institutions", options: { bullet: true } },
    ],
    { x: 6.1, y: 4.45, w: 3.55, h: 0.88, fontSize: 9, color: C.textDark, margin: 0 }
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 13 — Conclusion
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addDarkHeader(slide, "CONCLUSION");

  slide.addText("Contributions of OrientDZ", {
    x: 0.35, y: 0.5, w: 9.3, h: 0.5,
    fontSize: 26, bold: true, color: C.textLight, margin: 0
  });

  const contributions = [
    {
      title: "Architectural",
      body: "Proves viability of a fully client-side health platform meeting performance, accessibility, and privacy requirements simultaneously",
      color: C.primary
    },
    {
      title: "Algorithmic",
      body: "Implements a clinically-grounded nutritional expert system (38 pathologies, Mifflin-St Jeor, PAL OMS/FAO) with 3–7 ms inference",
      color: "047857"
    },
    {
      title: "Cryptographic",
      body: "Original solution for offline emergency data access via XOR+Base64 protocol — no network required, full Arabic support",
      color: C.accent
    },
    {
      title: "Linguistic",
      body: "Custom i18n engine with 300+ keys, dynamic RTL/LTR, lazy Arabic font injection — zero FOUC, zero external libraries",
      color: "7C3AED"
    },
  ];

  contributions.forEach((c, i) => {
    const x = 0.25 + (i % 2) * 4.8;
    const y = 1.1 + Math.floor(i / 2) * 1.3;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.5, h: 1.15,
      fill: { color: "122A42" }, line: { color: c.color, width: 1 }
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.1, h: 1.15,
      fill: { color: c.color }, line: { color: c.color }
    });
    slide.addText(c.title, {
      x: x + 0.22, y: y + 0.1, w: 4.1, h: 0.3,
      fontSize: 12, bold: true, color: c.color, margin: 0
    });
    slide.addText(c.body, {
      x: x + 0.22, y: y + 0.44, w: 4.1, h: 0.62,
      fontSize: 10, color: "90C8D0", margin: 0
    });
  });

  // Bottom summary bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.25, y: 3.85, w: 9.5, h: 0.72,
    fill: { color: C.primary }, line: { color: C.primary }
  });
  slide.addText(
    "Lighthouse 91/100 · Offline-first · Bilingual FR/AR RTL · Privacy by Design · JAMstack · Zero backend cost",
    { x: 0.35, y: 3.85, w: 9.3, h: 0.72, fontSize: 11, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 }
  );

  // Vision
  slide.addText(
    "OrientDZ represents what Algerian AI academic research can produce: a sovereign, accessible, medically grounded, privacy-respecting platform — a foundation for the health-tech startup ecosystem in Algeria.",
    { x: 0.35, y: 4.65, w: 9.3, h: 0.78, fontSize: 10.5, color: "7ABCC5", align: "center", italic: true, margin: 0 }
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE 14 — Questions
// ═══════════════════════════════════════════════════════════════════════════
{
  const slide = pres.addSlide();
  addDarkHeader(slide, null);

  slide.addText("Thank You for Your Attention", {
    x: 0.35, y: 0.6, w: 9.3, h: 0.55,
    fontSize: 22, color: "90C8D0", align: "center", margin: 0
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 2, y: 1.25, w: 6, h: 0.06,
    fill: { color: C.accent }, line: { color: C.accent }
  });

  slide.addText("Questions & Discussion", {
    x: 0.35, y: 1.5, w: 9.3, h: 1.2,
    fontSize: 52, fontFace: "Calibri", bold: true, color: C.textLight, align: "center", margin: 0
  });

  // Summary stats
  const summaryStats = [
    ["4", "Functional\nModules"],
    ["38", "Pathologies\nCovered"],
    ["300+", "Translation\nKeys"],
    ["91", "Lighthouse\nScore"],
    ["0€", "Backend\nCost"],
  ];
  const sw = 1.7, sh = 1.0, gap = 0.12;
  const totalW2 = summaryStats.length * sw + (summaryStats.length - 1) * gap;
  const startX2 = (10 - totalW2) / 2;
  summaryStats.forEach(([n, l], i) => {
    addStat(slide, startX2 + i * (sw + gap), 2.85, sw, sh, n, l, C.primary);
  });

  // Authors
  slide.addText([
    { text: "MADJENE Nawel  ·  BENDEBBAH Mohamed Islem", options: { bold: true, breakLine: true } },
    { text: "Supervisor: M. MAZOUNI Fares", options: { breakLine: true } },
    { text: "Licence Informatique · Option Intelligence Artificielle · NIT · 2025–2026", options: {} }
  ], {
    x: 0.35, y: 4.0, w: 9.3, h: 0.95,
    fontSize: 11, color: "90C8D0", align: "center", margin: 0
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 2, y: 5.05, w: 6, h: 0.06,
    fill: { color: C.primary }, line: { color: C.primary }
  });

  slide.addText("OrientDZ — Bilingual Intelligent Health Platform · PFE Defense June 2026", {
    x: 0.35, y: 5.2, w: 9.3, h: 0.28,
    fontSize: 9, color: "7ABCC5", align: "center", charSpacing: 1, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// Save
// ═══════════════════════════════════════════════════════════════════════════
pres.writeFile({ fileName: "C:\\Users\\COMPUTER\\Desktop\\pharmawayyy2\\OrientDZ_Defense_Presentation.pptx" })
  .then(() => console.log("✓ Saved: OrientDZ_Defense_Presentation.pptx"))
  .catch(e => { console.error("ERROR:", e); process.exit(1); });
