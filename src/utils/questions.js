// src/utils/questions.js
// Updated for the 4 ACTUAL produced panels (from panels.pptx):
//   A = Pure PLA            — pale cream, bone-inspired TPMS structure
//   B = PLA + 2.5% almond  — warm golden-tan
//   C = PLA + 7.5% almond  — darker brown, more textured
//   D = PLA + 10% flax     — sandy/khaki, visible flax fibres

// Colors matched to the real visual appearance of each panel
export const PANEL_COLORS = {
  A: '#7A8B6F',   // muted sage — pale cream PLA reads as off-white/grey-green
  B: '#A0722A',   // warm golden-tan — 2.5% almond shell tint
  C: '#7B4F1A',   // darker amber-brown — 7.5% almond shell, richer tone
  D: '#8B7340',   // sandy khaki — flax fibre colour
};

export const PANELS = [
  { id: 'A', label: 'Panel A', descKey: 'panelA' },
  { id: 'B', label: 'Panel B', descKey: 'panelB' },
  { id: 'C', label: 'Panel C', descKey: 'panelC' },
  { id: 'D', label: 'Panel D', descKey: 'panelD' },
];

export const PANEL_IMAGES = {
  A: require('../assets/panels/panelA.jpg'),
  B: require('../assets/panels/panelB.jpg'),
  C: require('../assets/panels/panelC.jpg'),
  D: require('../assets/panels/panelD.jpg'),
};

// SVG icon source for each panel — drawn to reflect what participants
// actually see: a bone-inspired TPMS lattice panel with the bio-filler
// colour and texture visible. Used in PanelIcon.js
export const PANEL_SVG_ICONS = {
  // A: Pure PLA — pale, smooth, translucent-looking lattice
  A: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="6" fill="#F0EDE6"/>
    <!-- wavy gyroid rows -->
    <path d="M4 18 Q12 10 20 18 Q28 26 36 18 Q44 10 52 18 Q56 22 56 22" stroke="#C8C0B0" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M4 28 Q12 20 20 28 Q28 36 36 28 Q44 20 52 28 Q56 32 56 32" stroke="#C8C0B0" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M4 38 Q12 30 20 38 Q28 46 36 38 Q44 30 52 38 Q56 42 56 42" stroke="#C8C0B0" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- diamond pore dots -->
    <circle cx="12" cy="14" r="2.5" fill="#DEDAD2"/>
    <circle cx="28" cy="14" r="2.5" fill="#DEDAD2"/>
    <circle cx="44" cy="14" r="2.5" fill="#DEDAD2"/>
    <circle cx="12" cy="24" r="2.5" fill="#DEDAD2"/>
    <circle cx="28" cy="24" r="2.5" fill="#DEDAD2"/>
    <circle cx="44" cy="24" r="2.5" fill="#DEDAD2"/>
    <circle cx="12" cy="34" r="2.5" fill="#DEDAD2"/>
    <circle cx="28" cy="34" r="2.5" fill="#DEDAD2"/>
    <circle cx="44" cy="34" r="2.5" fill="#DEDAD2"/>
    <circle cx="12" cy="46" r="2.5" fill="#DEDAD2"/>
    <circle cx="28" cy="46" r="2.5" fill="#DEDAD2"/>
    <circle cx="44" cy="46" r="2.5" fill="#DEDAD2"/>
    <text x="30" y="56" text-anchor="middle" font-size="6" font-family="sans-serif" fill="#9A9080" font-weight="600">PURE PLA</text>
  </svg>`,

  // B: PLA + 2.5% almond shell — golden-tan, same lattice + granular texture
  B: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="6" fill="#D4A855"/>
    <!-- almond shell texture speckle background -->
    <circle cx="8"  cy="8"  r="1.2" fill="#B8892E" opacity="0.6"/>
    <circle cx="16" cy="5"  r="1"   fill="#C49A3A" opacity="0.5"/>
    <circle cx="24" cy="9"  r="1.3" fill="#B8892E" opacity="0.5"/>
    <circle cx="40" cy="6"  r="1"   fill="#C49A3A" opacity="0.6"/>
    <circle cx="52" cy="9"  r="1.2" fill="#B8892E" opacity="0.5"/>
    <!-- wavy lattice rows -->
    <path d="M4 18 Q12 10 20 18 Q28 26 36 18 Q44 10 52 18" stroke="#8B6010" stroke-width="3.8" fill="none" stroke-linecap="round"/>
    <path d="M4 28 Q12 20 20 28 Q28 36 36 28 Q44 20 52 28" stroke="#8B6010" stroke-width="3.8" fill="none" stroke-linecap="round"/>
    <path d="M4 38 Q12 30 20 38 Q28 46 36 38 Q44 30 52 38" stroke="#8B6010" stroke-width="3.8" fill="none" stroke-linecap="round"/>
    <circle cx="12" cy="14" r="2.8" fill="#7A5008"/>
    <circle cx="28" cy="14" r="2.8" fill="#7A5008"/>
    <circle cx="44" cy="14" r="2.8" fill="#7A5008"/>
    <circle cx="12" cy="24" r="2.8" fill="#7A5008"/>
    <circle cx="28" cy="24" r="2.8" fill="#7A5008"/>
    <circle cx="44" cy="24" r="2.8" fill="#7A5008"/>
    <circle cx="12" cy="44" r="2.8" fill="#7A5008"/>
    <circle cx="28" cy="44" r="2.8" fill="#7A5008"/>
    <circle cx="44" cy="44" r="2.8" fill="#7A5008"/>
    <text x="30" y="56" text-anchor="middle" font-size="5.5" font-family="sans-serif" fill="#5A3A08" font-weight="600">2.5% ALMOND</text>
  </svg>`,

  // C: PLA + 7.5% almond — darker, richer brown, more textured
  C: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="6" fill="#9C6820"/>
    <!-- denser speckle = more filler -->
    <circle cx="8"  cy="8"  r="1.5" fill="#6B4010" opacity="0.7"/>
    <circle cx="15" cy="5"  r="1.2" fill="#7A4C18" opacity="0.6"/>
    <circle cx="22" cy="9"  r="1.5" fill="#6B4010" opacity="0.6"/>
    <circle cx="30" cy="6"  r="1.2" fill="#7A4C18" opacity="0.7"/>
    <circle cx="38" cy="9"  r="1.5" fill="#6B4010" opacity="0.6"/>
    <circle cx="46" cy="5"  r="1.2" fill="#7A4C18" opacity="0.5"/>
    <circle cx="53" cy="8"  r="1.5" fill="#6B4010" opacity="0.7"/>
    <circle cx="11" cy="15" r="1"   fill="#6B4010" opacity="0.5"/>
    <circle cx="35" cy="13" r="1"   fill="#7A4C18" opacity="0.5"/>
    <circle cx="49" cy="16" r="1.2" fill="#6B4010" opacity="0.6"/>
    <!-- lattice -->
    <path d="M4 19 Q12 11 20 19 Q28 27 36 19 Q44 11 52 19" stroke="#4A2C08" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M4 29 Q12 21 20 29 Q28 37 36 29 Q44 21 52 29" stroke="#4A2C08" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M4 39 Q12 31 20 39 Q28 47 36 39 Q44 31 52 39" stroke="#4A2C08" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="12" cy="15" r="3" fill="#3A1C04"/>
    <circle cx="28" cy="15" r="3" fill="#3A1C04"/>
    <circle cx="44" cy="15" r="3" fill="#3A1C04"/>
    <circle cx="12" cy="25" r="3" fill="#3A1C04"/>
    <circle cx="28" cy="25" r="3" fill="#3A1C04"/>
    <circle cx="44" cy="25" r="3" fill="#3A1C04"/>
    <circle cx="12" cy="45" r="3" fill="#3A1C04"/>
    <circle cx="28" cy="45" r="3" fill="#3A1C04"/>
    <circle cx="44" cy="45" r="3" fill="#3A1C04"/>
    <text x="30" y="56" text-anchor="middle" font-size="5.5" font-family="sans-serif" fill="#2A1004" font-weight="600">7.5% ALMOND</text>
  </svg>`,

  // D: PLA + 10% flax fibres — sandy khaki, visible fibrous strands
  D: `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="6" fill="#B8A060"/>
    <!-- flax fibre lines criss-crossing the surface -->
    <line x1="6"  y1="4"  x2="14" y2="18" stroke="#7A6020" stroke-width="0.8" opacity="0.6"/>
    <line x1="18" y1="3"  x2="10" y2="17" stroke="#8B7030" stroke-width="0.7" opacity="0.5"/>
    <line x1="30" y1="5"  x2="22" y2="20" stroke="#7A6020" stroke-width="0.9" opacity="0.6"/>
    <line x1="44" y1="4"  x2="38" y2="16" stroke="#8B7030" stroke-width="0.8" opacity="0.5"/>
    <line x1="52" y1="6"  x2="48" y2="18" stroke="#7A6020" stroke-width="0.7" opacity="0.6"/>
    <line x1="8"  y1="25" x2="20" y2="35" stroke="#6A5018" stroke-width="0.8" opacity="0.5"/>
    <line x1="36" y1="22" x2="28" y2="36" stroke="#7A6020" stroke-width="0.9" opacity="0.6"/>
    <line x1="50" y1="26" x2="42" y2="38" stroke="#8B7030" stroke-width="0.7" opacity="0.5"/>
    <!-- lattice waves — slightly rougher stroke to show fibre texture -->
    <path d="M4 19 Q12 11 20 19 Q28 27 36 19 Q44 11 52 19" stroke="#5A4010" stroke-width="4.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 29 Q12 21 20 29 Q28 37 36 29 Q44 21 52 29" stroke="#5A4010" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <path d="M4 39 Q12 31 20 39 Q28 47 36 39 Q44 31 52 39" stroke="#5A4010" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <circle cx="12" cy="15" r="3" fill="#4A3008"/>
    <circle cx="28" cy="15" r="3" fill="#4A3008"/>
    <circle cx="44" cy="15" r="3" fill="#4A3008"/>
    <circle cx="12" cy="25" r="3" fill="#4A3008"/>
    <circle cx="28" cy="25" r="3" fill="#4A3008"/>
    <circle cx="44" cy="25" r="3" fill="#4A3008"/>
    <circle cx="12" cy="45" r="3" fill="#4A3008"/>
    <circle cx="28" cy="45" r="3" fill="#4A3008"/>
    <circle cx="44" cy="45" r="3" fill="#4A3008"/>
    <text x="30" y="56" text-anchor="middle" font-size="5.5" font-family="sans-serif" fill="#2A1C04" font-weight="600">10% FLAX</text>
  </svg>`,
};

export const BACKGROUNDS = [
  { value: 'Architecture / Urban design / Art / Creative / Building / Construction', key: 'bg_arch' },
  { value: 'Policy / Public administration / Sustainability / Environment',           key: 'bg_policy' },
  { value: 'Engineering / Research / Academia (any discipline)',                      key: 'bg_eng' },
  { value: 'General public',                                                           key: 'bg_public', default: true },
];

export const AGE_GROUPS = ['<25', '25–34', '35–44', '45–54', '55–64', '65+'];

export const GENDERS = [
  { value: 'Woman',                       key: 'g_woman' },
  { value: 'Man',                         key: 'g_man' },
  { value: 'Non-binary / gender diverse', key: 'g_nonbin' },
  { value: 'Prefer not to say',           key: 'g_nosay', default: true },
];

export const FIRST_TIME = [
  { value: 'Yes, first time',         key: 'ft_yes', default: true },
  { value: 'No, seen similar before', key: 'ft_no' },
];

export const SUSTAIN_QUESTIONS = [
  { code: 'su1', key: 'su1' },
  { code: 'su2', key: 'su2' },
  { code: 'su3', key: 'su3' },
];

export const SENSORY_QUESTIONS = [
  { code: 'se1', key: 'se1' },
  { code: 'se2', key: 'se2' },
  { code: 'se3', key: 'se3' },
  { code: 'se4', key: 'se4' },
  { code: 'se5', key: 'se5' },
];

export const OVERALL_QUESTIONS = [
  { code: 'ov1', key: 'ov1' },
  { code: 'ov2', key: 'ov2' },
];

export function perPanelCode(code, panelId) {
  return `${code}_${panelId}`;
}

export const SIDE_BY_SIDE_CODES = [];
[...SENSORY_QUESTIONS, ...OVERALL_QUESTIONS].forEach(q => {
  PANELS.forEach(p => SIDE_BY_SIDE_CODES.push(perPanelCode(q.code, p.id)));
});
// 4 panels × (5 sensory + 2 overall) = 28 codes

export const SUSTAIN_CODES = SUSTAIN_QUESTIONS.map(q => q.code);
