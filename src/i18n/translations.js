// src/i18n/translations.js
// Three-language dictionary for the PANTAREI side-by-side survey.
// EN = English, DE = German, FR = French.
// Every user-facing string in the app lives here.

export const LANGUAGES = [
  { code: 'EN', label: 'English',  flag: '🇬🇧' },
  { code: 'DE', label: 'Deutsch',  flag: '🇩🇪' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
];

// Languages the participant may SPEAK during the voice recording.
// Wider than the UI list — we want everyone to be able to pick their mother tongue.
// "OTHER" reveals a free-text input so anything else can be recorded too.
export const AUDIO_LANGUAGES = [
  { code: 'EN',    label: 'English',     flag: '🇬🇧' },
  { code: 'DE',    label: 'Deutsch',     flag: '🇩🇪' },
  { code: 'FR',    label: 'Français',    flag: '🇫🇷' },
  { code: 'IT',    label: 'Italiano',    flag: '🇮🇹' },
  { code: 'ES',    label: 'Español',     flag: '🇪🇸' },
  { code: 'NL',    label: 'Nederlands',  flag: '🇳🇱' },
  { code: 'PT',    label: 'Português',   flag: '🇵🇹' },
  { code: 'PL',    label: 'Polski',      flag: '🇵🇱' },
  { code: 'OTHER', label: 'Other',       flag: '🌍' },
];

export const TRANSLATIONS = {
  // ─────────────────────────────────────── HOME ───────────────────
  appName: { EN: 'PANTAREI', DE: 'PANTAREI', FR: 'PANTAREI' },
  homeSubtitle: {
    EN: 'Panel Perception Survey · NEB Festival 2026',
    DE: 'Panel-Wahrnehmungsumfrage · NEB-Festival 2026',
    FR: 'Enquête de perception des panneaux · Festival NEB 2026',
  },
  homeIntro: {
    EN: 'You are looking at building panels made from bio-waste materials: recycled transparent wood, wheat stem fibres, and eggshell powder — 3D-printed in bone-inspired architectures.',
    DE: 'Sie betrachten Bauplatten aus Bio-Abfallmaterialien: recyceltes transparentes Holz, Weizenstrohfasern und Eierschalenpulver — 3D-gedruckt in knochen­inspirierten Strukturen.',
    FR: 'Vous observez des panneaux de construction fabriqués à partir de biodéchets : bois transparent recyclé, fibres de paille de blé et poudre de coquille d’œuf — imprimés en 3D dans des architectures inspirées de l’os.',
  },
  homeExamine: {
    EN: 'Please examine all five panels, then share your impressions. ~4 minutes.',
    DE: 'Bitte betrachten Sie alle fünf Platten und teilen Sie dann Ihre Eindrücke mit. ~4 Minuten.',
    FR: 'Veuillez examiner les cinq panneaux, puis partager vos impressions. ~4 minutes.',
  },
  responsesCollected: {
    EN: 'Responses collected', DE: 'Gesammelte Antworten', FR: 'Réponses recueillies',
  },
  total: { EN: 'Total', DE: 'Gesamt', FR: 'Total' },
  completed: { EN: 'completed', DE: 'abgeschlossen', FR: 'complétées' },
  startSurvey: { EN: 'Start New Survey', DE: 'Neue Umfrage starten', FR: 'Démarrer une enquête' },
  exportData: { EN: 'Export Data', DE: 'Daten exportieren', FR: 'Exporter les données' },
  chooseLanguage: { EN: 'Language', DE: 'Sprache', FR: 'Langue' },

  // ─────────────────────────────────────── CONSENT ────────────────
  consentTitle: { EN: 'Data Protection & Consent', DE: 'Datenschutz & Einwilligung', FR: 'Protection des données & consentement' },
  gdprText: {
    EN: 'Controller: PANTAREI Consortium (coordinated by Politecnico di Milano). Data processed under GDPR Art. 6(1)(e) and Art. 89. No personal identifiers stored. Voice recordings pseudonymised by participant ID on secured devices. Withdraw any time: PANTAREI2026@outlook.com',
    DE: 'Verantwortlicher: PANTAREI-Konsortium (koordiniert vom Politecnico di Milano). Datenverarbeitung gemäß DSGVO Art. 6(1)(e) und Art. 89. Keine personenbezogenen Daten gespeichert. Sprachaufnahmen werden über Teilnehmer-ID pseudonymisiert auf gesicherten Geräten gespeichert. Widerruf jederzeit: PANTAREI2026@outlook.com',
    FR: 'Responsable : Consortium PANTAREI (coordonné par le Politecnico di Milano). Données traitées selon le RGPD art. 6(1)(e) et art. 89. Aucun identifiant personnel stocké. Enregistrements vocaux pseudonymisés par ID de participant sur des appareils sécurisés. Retrait à tout moment : PANTAREI2026@outlook.com',
  },
  consentResearch: {
    EN: 'I consent to my anonymous responses being used for PANTAREI scientific research and understand I can withdraw any time by quoting my Participant ID.',
    DE: 'Ich willige ein, dass meine anonymen Antworten für die wissenschaftliche PANTAREI-Forschung verwendet werden, und weiß, dass ich jederzeit unter Angabe meiner Teilnehmer-ID widerrufen kann.',
    FR: 'Je consens à ce que mes réponses anonymes soient utilisées pour la recherche scientifique PANTAREI et je comprends que je peux me retirer à tout moment en citant mon ID de participant.',
  },
  consentRecording: {
    EN: 'I consent to my voice being recorded for the open-ended questions. (Optional)',
    DE: 'Ich willige ein, dass meine Stimme für die offenen Fragen aufgezeichnet wird. (Optional)',
    FR: 'Je consens à ce que ma voix soit enregistrée pour les questions ouvertes. (Facultatif)',
  },
  consentAge: {
    EN: 'I confirm that I am 18 years of age or older.',
    DE: 'Ich bestätige, dass ich 18 Jahre oder älter bin.',
    FR: 'Je confirme que j’ai 18 ans ou plus.',
  },
  requiredToParticipate: { EN: '* Required to participate', DE: '* Zur Teilnahme erforderlich', FR: '* Requis pour participer' },
  beginSurvey: { EN: 'Begin Survey →', DE: 'Umfrage beginnen →', FR: 'Commencer →' },
  starting: { EN: 'Starting…', DE: 'Wird gestartet…', FR: 'Démarrage…' },
  back: { EN: '← Back', DE: '← Zurück', FR: '← Retour' },
  requiredMissing: { EN: 'Required fields missing', DE: 'Pflichtfelder fehlen', FR: 'Champs requis manquants' },
  requiredMissingMsg: {
    EN: 'Please consent to research and confirm you are 18 or older.',
    DE: 'Bitte stimmen Sie der Forschung zu und bestätigen Sie, dass Sie 18 oder älter sind.',
    FR: 'Veuillez consentir à la recherche et confirmer que vous avez 18 ans ou plus.',
  },

  // ─────────────────────────────────────── DEMOGRAPHICS ───────────
  aboutYou: { EN: 'About You', DE: 'Über Sie', FR: 'À propos de vous' },
  background: { EN: 'Background', DE: 'Hintergrund', FR: 'Profil' },
  ageGroup: { EN: 'Age group', DE: 'Altersgruppe', FR: 'Tranche d’âge' },
  gender: { EN: 'Gender', DE: 'Geschlecht', FR: 'Genre' },
  firstTimeQ: {
    EN: 'Is this your first time seeing bio-waste-derived building materials in person?',
    DE: 'Sehen Sie zum ersten Mal Baumaterialien aus Bio-Abfall in echt?',
    FR: 'Est-ce la première fois que vous voyez des matériaux de construction issus de biodéchets en personne ?',
  },
  optional: { EN: '(optional)', DE: '(optional)', FR: '(facultatif)' },

  // Background options
  bg_arch:   { EN: 'Architecture / Urban design / Art / Creative / Building / Construction', DE: 'Architektur / Stadtplanung / Kunst / Kreativ / Bau', FR: 'Architecture / Urbanisme / Art / Création / Bâtiment' },
  bg_policy: { EN: 'Policy / Public administration / Sustainability / Environment', DE: 'Politik / Verwaltung / Nachhaltigkeit / Umwelt', FR: 'Politique / Administration / Durabilité / Environnement' },
  bg_eng:    { EN: 'Engineering / Research / Academia (any discipline)', DE: 'Ingenieurwesen / Forschung / Wissenschaft (alle Disziplinen)', FR: 'Ingénierie / Recherche / Universitaire (toute discipline)' },
  bg_public: { EN: 'General public', DE: 'Allgemeine Öffentlichkeit', FR: 'Grand public' },

  // Gender options
  g_woman:  { EN: 'Woman', DE: 'Frau', FR: 'Femme' },
  g_man:    { EN: 'Man', DE: 'Mann', FR: 'Homme' },
  g_nonbin: { EN: 'Non-binary / gender diverse', DE: 'Nicht-binär / divers', FR: 'Non-binaire / divers' },
  g_nosay:  { EN: 'Prefer not to say', DE: 'Keine Angabe', FR: 'Préfère ne pas répondre' },

  // First-time options
  ft_yes: { EN: 'Yes, first time', DE: 'Ja, zum ersten Mal', FR: 'Oui, première fois' },
  ft_no:  { EN: 'No, I have seen similar before', DE: 'Nein, schon Ähnliches gesehen', FR: 'Non, déjà vu similaire' },

  // ─────────────────────────────────────── SECTIONS ───────────────
  scaleHint: {
    EN: '1 = Strongly disagree · 7 = Strongly agree',
    DE: '1 = Stimme gar nicht zu · 7 = Stimme voll zu',
    FR: '1 = Pas du tout d’accord · 7 = Tout à fait d’accord',
  },
  sustainabilityTrust: { EN: 'Sustainability Trust', DE: 'Nachhaltigkeits­vertrauen', FR: 'Confiance en la durabilité' },
  sensoryAppeal: { EN: 'Sensory Appeal', DE: 'Sinnliche Anziehung', FR: 'Attrait sensoriel' },
  overallExperience: { EN: 'Overall Experience', DE: 'Gesamteindruck', FR: 'Expérience globale' },
  overallRanking: { EN: 'Overall Ranking', DE: 'Gesamt-Rangfolge', FR: 'Classement général' },
  rateAllPanels: {
    EN: 'Rate each panel on this statement',
    DE: 'Bewerten Sie jede Platte zu dieser Aussage',
    FR: 'Évaluez chaque panneau sur cet énoncé',
  },

  // Sustainability (single, applies to concept)
  su1: { EN: 'Using these bio-sourced panels genuinely reduces construction waste.', DE: 'Die Verwendung dieser biobasierten Platten reduziert tatsächlich Bauabfall.', FR: 'L’utilisation de ces panneaux biosourcés réduit véritablement les déchets de construction.' },
  su2: { EN: 'Bio-waste materials make a building more responsible.', DE: 'Bio-Abfallmaterialien machen ein Gebäude verantwortungsvoller.', FR: 'Les matériaux issus de biodéchets rendent un bâtiment plus responsable.' },
  su3: { EN: 'Knowing these come from food/crop waste increases my appreciation.', DE: 'Zu wissen, dass diese aus Lebensmittel-/Ernteabfällen stammen, erhöht meine Wertschätzung.', FR: 'Savoir que cela provient de déchets alimentaires/agricoles augmente mon appréciation.' },

  // Sensory (side-by-side, per panel)
  se1: { EN: 'Panel is visually appealing.', DE: 'Die Platte ist optisch ansprechend.', FR: 'Le panneau est visuellement attrayant.' },
  se2: { EN: 'Material feels appealing to the touch.', DE: 'Das Material fühlt sich angenehm an.', FR: 'Le matériau est agréable au toucher.' },
  se3: { EN: 'The material looks natural and organic.', DE: 'Das Material wirkt natürlich und organisch.', FR: 'Le matériau semble naturel et organique.' },
  se4: { EN: 'This panel has an innovative appearance.', DE: 'Diese Platte hat ein innovatives Aussehen.', FR: 'Ce panneau a une apparence innovante.' },
  se5: { EN: 'The visible composition adds to the appeal.', DE: 'Die sichtbare Zusammensetzung steigert den Reiz.', FR: 'La composition visible ajoute à l’attrait.' },

  // Overall (side-by-side, per panel)
  ov1: { EN: 'I would feel comfortable in a space using this panel.', DE: 'Ich würde mich in einem Raum mit dieser Platte wohlfühlen.', FR: 'Je me sentirais à l’aise dans un espace utilisant ce panneau.' },
  ov2: { EN: 'I would recommend this panel for sustainable building.', DE: 'Ich würde diese Platte für nachhaltiges Bauen empfehlen.', FR: 'Je recommanderais ce panneau pour la construction durable.' },

  // ─────────────────────────────────────── RANKING ────────────────
  rankingInstruction: {
    EN: 'Drag the panels to order them from best (top) to worst (bottom) based on your overall impression.',
    DE: 'Ziehen Sie die Platten, um sie von der besten (oben) bis zur schlechtesten (unten) zu ordnen.',
    FR: 'Faites glisser les panneaux pour les classer du meilleur (haut) au pire (bas) selon votre impression globale.',
  },
  rankBest: { EN: '↑ Best', DE: '↑ Beste', FR: '↑ Meilleur' },
  rankWorst: { EN: '↓ Worst', DE: '↓ Schlechteste', FR: '↓ Pire' },
  dragHint: { EN: 'Hold any panel and drag up or down to reorder', DE: 'Platte gedrückt halten und hoch-/runterziehen zum Umsortieren', FR: 'Maintenez un panneau et faites-le glisser pour réordonner' },

  // ─────────────────────────────────────── OPEN QUESTION ──────────
  openTitle: { EN: 'In Your Own Words', DE: 'In Ihren eigenen Worten', FR: 'Dans vos propres mots' },
  openQuestion: {
    EN: 'Why did the panel you ranked #1 impress you most? You can also talk about the other panels.',
    DE: 'Warum hat Sie die als #1 platzierte Platte am meisten beeindruckt? Sie können auch über die anderen Platten sprechen.',
    FR: 'Pourquoi le panneau que vous avez classé n°1 vous a-t-il le plus impressionné ? Vous pouvez aussi parler des autres panneaux.',
  },
  openPlaceholder: {
    EN: 'I liked panel X the most, since it seems really beautiful and soft when touched. The use of bio-sourced materials was wisely shown in the appearance, and I believe in future I would love to live in an apartment with these panels installed! Panel Y is also great but a little not nicely built and looks synthetic…',
    DE: 'Mir gefiel Platte X am besten, da sie wirklich schön aussieht und sich weich anfühlt. Die Verwendung biobasierter Materialien zeigte sich klug im Aussehen, und ich könnte mir vorstellen, künftig in einer Wohnung mit diesen Platten zu leben! Platte Y ist auch toll, aber etwas weniger schön verarbeitet und wirkt synthetisch…',
    FR: 'J’ai préféré le panneau X, car il semble vraiment beau et doux au toucher. L’utilisation de matériaux biosourcés était bien mise en valeur dans l’apparence, et je pense qu’à l’avenir j’aimerais vivre dans un appartement équipé de ces panneaux ! Le panneau Y est aussi très bien mais un peu moins bien fini et paraît synthétique…',
  },
  speakLanguage: {
    EN: 'Which language will you speak in your recording?',
    DE: 'In welcher Sprache werden Sie aufnehmen?',
    FR: 'Dans quelle langue allez-vous parler dans votre enregistrement ?',
  },
  speakLanguageHint: {
    EN: '🌍 Record in whatever language is most comfortable for you — your mother tongue is perfect. We just need to know which one so we can transcribe it.',
    DE: '🌍 Sprechen Sie in der Sprache, in der Sie sich am wohlsten fühlen — Ihre Muttersprache ist ideal. Wir müssen nur wissen welche, damit wir sie transkribieren können.',
    FR: '🌍 Enregistrez dans la langue qui vous est la plus confortable — votre langue maternelle est parfaite. Nous avons juste besoin de savoir laquelle pour la transcrire.',
  },
  otherLanguage: {
    EN: 'Type the language you will speak…',
    DE: 'Tippen Sie die Sprache ein, die Sie sprechen werden…',
    FR: 'Tapez la langue que vous allez parler…',
  },

  // ─────────────────────────────────────── VOICE ──────────────────
  recordVoice: { EN: 'Record voice', DE: 'Sprache aufnehmen', FR: 'Enregistrer la voix' },
  stop: { EN: 'Stop', DE: 'Stopp', FR: 'Arrêter' },
  voiceRecorded: { EN: 'Voice recorded', DE: 'Aufnahme gespeichert', FR: 'Voix enregistrée' },
  recordingNotConsented: { EN: 'Recording not consented', DE: 'Aufnahme nicht zugestimmt', FR: 'Enregistrement non consenti' },

  // ─────────────────────────────────────── NAV / SUBMIT ───────────
  next: { EN: 'Next →', DE: 'Weiter →', FR: 'Suivant →' },
  previous: { EN: '← Previous', DE: '← Zurück', FR: '← Précédent' },
  submitSurvey: { EN: '✓ Submit Survey', DE: '✓ Umfrage absenden', FR: '✓ Envoyer l’enquête' },
  discard: { EN: 'Discard and return to home', DE: 'Verwerfen und zur Startseite', FR: 'Annuler et revenir à l’accueil' },
  discardConfirm: { EN: 'Discard?', DE: 'Verwerfen?', FR: 'Annuler ?' },
  discardMsg: { EN: 'All answers will be lost.', DE: 'Alle Antworten gehen verloren.', FR: 'Toutes les réponses seront perdues.' },
  cancel: { EN: 'Cancel', DE: 'Abbrechen', FR: 'Annuler' },
  incomplete: { EN: 'Incomplete', DE: 'Unvollständig', FR: 'Incomplet' },
  incompleteMsg: {
    EN: 'Please answer all rating questions before continuing.',
    DE: 'Bitte beantworten Sie alle Bewertungsfragen, bevor Sie fortfahren.',
    FR: 'Veuillez répondre à toutes les questions d’évaluation avant de continuer.',
  },
  missingInfo: { EN: 'Missing info', DE: 'Fehlende Angaben', FR: 'Informations manquantes' },
  missingDemo: {
    EN: 'Please complete background, age group, and first-time questions.',
    DE: 'Bitte füllen Sie Hintergrund, Altersgruppe und Erstbesuch aus.',
    FR: 'Veuillez compléter le profil, la tranche d’âge et la première visite.',
  },

  // ─────────────────────────────────────── PROGRESS LABELS ────────
  stepDemographics: { EN: 'About You', DE: 'Über Sie', FR: 'À propos de vous' },
  stepSustain: { EN: 'Sustainability', DE: 'Nachhaltigkeit', FR: 'Durabilité' },
  stepSensory: { EN: 'Sensory', DE: 'Sinnlich', FR: 'Sensoriel' },
  stepOverall: { EN: 'Overall', DE: 'Gesamt', FR: 'Global' },
  stepRanking: { EN: 'Ranking', DE: 'Rangfolge', FR: 'Classement' },
  stepOpen: { EN: 'Comments', DE: 'Kommentare', FR: 'Commentaires' },

  // ─────────────────────────────────────── THANK YOU ──────────────
  thankYou: { EN: 'Thank you!', DE: 'Vielen Dank!', FR: 'Merci !' },
  thankYouSub: { EN: 'Your response has been saved successfully.', DE: 'Ihre Antwort wurde erfolgreich gespeichert.', FR: 'Votre réponse a été enregistrée avec succès.' },
  yourId: { EN: 'YOUR PARTICIPANT ID', DE: 'IHRE TEILNEHMER-ID', FR: 'VOTRE ID DE PARTICIPANT' },
  keepId: {
    EN: 'Keep this ID if you wish to withdraw. Contact: PANTAREI2026@outlook.com',
    DE: 'Bewahren Sie diese ID für einen Widerruf auf. Kontakt: PANTAREI2026@outlook.com',
    FR: 'Conservez cet ID pour tout retrait. Contact : PANTAREI2026@outlook.com',
  },
  returningHome: { EN: 'Returning to home in', DE: 'Zurück zur Startseite in', FR: 'Retour à l’accueil dans' },
  returnNow: { EN: 'Return to Home Now', DE: 'Jetzt zur Startseite', FR: 'Revenir à l’accueil' },


  // Likert anchors — shown live under the slider when a value is selected.
  scale_1: { EN: 'Strongly disagree',   DE: 'Stimme gar nicht zu',     FR: 'Pas du tout d’accord' },
  scale_2: { EN: 'Disagree',            DE: 'Stimme nicht zu',         FR: 'Pas d’accord' },
  scale_3: { EN: 'Slightly disagree',   DE: 'Stimme eher nicht zu',    FR: 'Plutôt pas d’accord' },
  scale_4: { EN: 'Neutral',             DE: 'Neutral',                 FR: 'Neutre' },
  scale_5: { EN: 'Slightly agree',      DE: 'Stimme eher zu',          FR: 'Plutôt d’accord' },
  scale_6: { EN: 'Agree',               DE: 'Stimme zu',               FR: 'D’accord' },
  scale_7: { EN: 'Strongly agree',      DE: 'Stimme voll zu',          FR: 'Tout à fait d’accord' },

  // Panel descriptions — 4 actual produced panels (see panels.pptx)
  panelA: {
    EN: 'Pure PLA — pale, smooth TPMS lattice, no bio-filler',
    DE: 'Reines PLA — helles, glattes TPMS-Gitter, kein Biofüller',
    FR: 'PLA pur — structure TPMS claire et lisse, sans charge bio',
  },
  panelB: {
    EN: 'PLA + 2.5% almond shell powder — warm golden-tan',
    DE: 'PLA + 2,5 % Mandelschalenpulver — warmer Goldton',
    FR: 'PLA + 2,5 % poudre de coque d’amande — teinte dorée chaude',
  },
  panelC: {
    EN: 'PLA + 7.5% almond shell powder — darker amber-brown',
    DE: 'PLA + 7,5 % Mandelschalenpulver — dunkleres Bernsteinbraun',
    FR: 'PLA + 7,5 % poudre de coque d’amande — brun ambré plus foncé',
  },
  panelD: {
    EN: 'PLA + 10% flax fibres — sandy khaki with visible natural fibres',
    DE: 'PLA + 10 % Flachsfasern — sandiges Khaki, sichtbare Naturfasern',
    FR: 'PLA + 10 % fibres de lin — kaki sableux, fibres naturelles visibles',
  },
};

// Helper: t('key', lang) → string with safe fallback to EN then key.
export function t(key, lang = 'EN') {
  const entry = TRANSLATIONS[key];
  if (!entry) return key;
  return entry[lang] || entry.EN || key;
}
