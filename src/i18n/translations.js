// src/i18n/translations.js
// Three-language dictionary for the PANTAREI side-by-side survey.
// EN = English, DE = German, FR = French.
// Every user-facing string in the app lives here.

export const LANGUAGES = [
  { code: 'EN', label: 'English',  flag: '🇬🇧' },
  { code: 'DE', label: 'Deutsch',  flag: '🇩🇪' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
  { code: 'IT', label: 'Italiano', flag: '🇮🇹' },
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
  appName: { EN: 'PANTAREI', DE: 'PANTAREI', FR: 'PANTAREI', IT: 'PANTAREI' },
  homeSubtitle: {
    EN: 'Panel Perception Survey · NEB Festival 2026',
    DE: 'Panel-Wahrnehmungsumfrage · NEB-Festival 2026',
    FR: 'Enquête de perception des panneaux · Festival NEB 2026',
  
    IT: 'Indagine sulla percezione dei pannelli · Festival NEB 2026',},
  homeIntro: {
    EN: 'You are looking at building panels made from bio-waste materials: recycled transparent wood, wheat stem fibres, and eggshell powder — 3D-printed in bone-inspired architectures.',
    DE: 'Sie betrachten Bauplatten aus Bio-Abfallmaterialien: recyceltes transparentes Holz, Weizenstrohfasern und Eierschalenpulver — 3D-gedruckt in knochen­inspirierten Strukturen.',
    FR: 'Vous observez des panneaux de construction fabriqués à partir de biodéchets : bois transparent recyclé, fibres de paille de blé et poudre de coquille d’œuf — imprimés en 3D dans des architectures inspirées de l’os.',
  
    IT: "Stai osservando pannelli edilizi realizzati con materiali derivati da bio-scarti: legno trasparente riciclato, fibre di stelo di grano e polvere di gusci d'uovo — stampati in 3D con architetture ispirate alle ossa.",},
  homeExamine: {
    EN: 'Please examine all five panels, then share your impressions. ~4 minutes.',
    DE: 'Bitte betrachten Sie alle fünf Platten und teilen Sie dann Ihre Eindrücke mit. ~4 Minuten.',
    FR: 'Veuillez examiner les cinq panneaux, puis partager vos impressions. ~4 minutes.',
  
    IT: 'Esamina tutti e cinque i pannelli, poi condividi le tue impressioni. ~4 minuti.',},
  responsesCollected: {
    EN: 'Responses collected', DE: 'Gesammelte Antworten', FR: 'Réponses recueillies', IT: 'Risposte raccolte' },
  total: { EN: 'Total', DE: 'Gesamt', FR: 'Total', IT: 'Totale' },
  completed: { EN: 'completed', DE: 'abgeschlossen', FR: 'complétées', IT: 'completate' },
  startSurvey: { EN: 'Start New Survey', DE: 'Neue Umfrage starten', FR: 'Démarrer une enquête', IT: 'Inizia nuova indagine' },
  exportData: { EN: 'Export Data', DE: 'Daten exportieren', FR: 'Exporter les données', IT: 'Esporta dati' },
  chooseLanguage: { EN: 'Language', DE: 'Sprache', FR: 'Langue', IT: 'Lingua' },

  // ─────────────────────────────────────── CONSENT ────────────────
  consentTitle: { EN: 'Data Protection & Consent', DE: 'Datenschutz & Einwilligung', FR: 'Protection des données & consentement', IT: 'Protezione dei dati e consenso' },
  gdprText: {
    EN: 'Controller: PANTAREI Consortium (coordinated by Politecnico di Milano). Data processed under GDPR Art. 6(1)(e) and Art. 89. No personal identifiers stored. Voice recordings pseudonymised by participant ID on secured devices. Withdraw any time: PANTAREI2026@outlook.com',
    DE: 'Verantwortlicher: PANTAREI-Konsortium (koordiniert vom Politecnico di Milano). Datenverarbeitung gemäß DSGVO Art. 6(1)(e) und Art. 89. Keine personenbezogenen Daten gespeichert. Sprachaufnahmen werden über Teilnehmer-ID pseudonymisiert auf gesicherten Geräten gespeichert. Widerruf jederzeit: PANTAREI2026@outlook.com',
    FR: 'Responsable : Consortium PANTAREI (coordonné par le Politecnico di Milano). Données traitées selon le RGPD art. 6(1)(e) et art. 89. Aucun identifiant personnel stocké. Enregistrements vocaux pseudonymisés par ID de participant sur des appareils sécurisés. Retrait à tout moment : PANTAREI2026@outlook.com',
  
    IT: 'Titolare del trattamento: Consorzio PANTAREI (coordinato dal Politecnico di Milano). Dati trattati ai sensi degli artt. 6(1)(e) e 89 del GDPR. Nessun identificativo personale conservato. Le registrazioni vocali sono pseudonimizzate tramite ID partecipante su dispositivi protetti. Puoi revocare il consenso in qualsiasi momento: PANTAREI2026@outlook.com',},
  consentResearch: {
    EN: 'I consent to my anonymous responses being used for PANTAREI scientific research and understand I can withdraw any time by quoting my Participant ID.',
    DE: 'Ich willige ein, dass meine anonymen Antworten für die wissenschaftliche PANTAREI-Forschung verwendet werden, und weiß, dass ich jederzeit unter Angabe meiner Teilnehmer-ID widerrufen kann.',
    FR: 'Je consens à ce que mes réponses anonymes soient utilisées pour la recherche scientifique PANTAREI et je comprends que je peux me retirer à tout moment en citant mon ID de participant.',
  
    IT: "Acconsento all'utilizzo delle mie risposte anonime per la ricerca scientifica PANTAREI e comprendo di poter revocare il consenso in qualsiasi momento indicando il mio ID partecipante.",},
  consentRecording: {
    EN: 'I consent to my voice being recorded for the open-ended questions. (Optional)',
    DE: 'Ich willige ein, dass meine Stimme für die offenen Fragen aufgezeichnet wird. (Optional)',
    FR: 'Je consens à ce que ma voix soit enregistrée pour les questions ouvertes. (Facultatif)',
  
    IT: 'Acconsento alla registrazione della mia voce per le domande aperte. (Facoltativo)',},
  consentAge: {
    EN: 'I confirm that I am 18 years of age or older.',
    DE: 'Ich bestätige, dass ich 18 Jahre oder älter bin.',
    FR: 'Je confirme que j’ai 18 ans ou plus.',
  
    IT: 'Confermo di avere 18 anni o più.',},
  requiredToParticipate: { EN: '* Required to participate', DE: '* Zur Teilnahme erforderlich', FR: '* Requis pour participer', IT: '* Necessario per partecipare' },
  beginSurvey: { EN: 'Begin Survey →', DE: 'Umfrage beginnen →', FR: 'Commencer →', IT: "Inizia l'indagine →" },
  starting: { EN: 'Starting…', DE: 'Wird gestartet…', FR: 'Démarrage…', IT: 'Avvio…' },
  back: { EN: '← Back', DE: '← Zurück', FR: '← Retour', IT: '← Indietro' },
  requiredMissing: { EN: 'Required fields missing', DE: 'Pflichtfelder fehlen', FR: 'Champs requis manquants', IT: 'Campi obbligatori mancanti' },
  requiredMissingMsg: {
    EN: 'Please consent to research and confirm you are 18 or older.',
    DE: 'Bitte stimmen Sie der Forschung zu und bestätigen Sie, dass Sie 18 oder älter sind.',
    FR: 'Veuillez consentir à la recherche et confirmer que vous avez 18 ans ou plus.',
  
    IT: 'Acconsenti alla ricerca e conferma di avere almeno 18 anni.',},

  // ─────────────────────────────────────── DEMOGRAPHICS ───────────
  aboutYou: { EN: 'About You', DE: 'Über Sie', FR: 'À propos de vous', IT: 'Su di te' },
  background: { EN: 'Background', DE: 'Hintergrund', FR: 'Profil', IT: 'Formazione' },
  ageGroup: { EN: 'Age group', DE: 'Altersgruppe', FR: 'Tranche d’âge', IT: "Fascia d'età" },
  gender: { EN: 'Gender', DE: 'Geschlecht', FR: 'Genre', IT: 'Genere' },
  firstTimeQ: {
    EN: 'Is this your first time seeing bio-waste-derived building materials in person?',
    DE: 'Sehen Sie zum ersten Mal Baumaterialien aus Bio-Abfall in echt?',
    FR: 'Est-ce la première fois que vous voyez des matériaux de construction issus de biodéchets en personne ?',
  
    IT: 'È la prima volta che vedi dal vivo materiali edilizi derivati da bio-scarti?',},
  optional: { EN: '(optional)', DE: '(optional)', FR: '(facultatif)', IT: '(facoltativo)' },

  // Background options
  bg_arch: { EN: 'Architecture / Urban design / Art / Creative / Building / Construction', DE: 'Architektur / Stadtplanung / Kunst / Kreativ / Bau', FR: 'Architecture / Urbanisme / Art / Création / Bâtiment', IT: 'Architettura / Design urbano / Arte / Settore creativo / Edilizia / Costruzioni' },
  bg_policy: { EN: 'Policy / Public administration / Sustainability / Environment', DE: 'Politik / Verwaltung / Nachhaltigkeit / Umwelt', FR: 'Politique / Administration / Durabilité / Environnement', IT: 'Politiche pubbliche / Pubblica amministrazione / Sostenibilità / Ambiente' },
  bg_eng: { EN: 'Engineering / Research / Academia (any discipline)', DE: 'Ingenieurwesen / Forschung / Wissenschaft (alle Disziplinen)', FR: 'Ingénierie / Recherche / Universitaire (toute discipline)', IT: 'Ingegneria / Ricerca / Università (qualsiasi disciplina)' },
  bg_public: { EN: 'General public', DE: 'Allgemeine Öffentlichkeit', FR: 'Grand public', IT: 'Pubblico generale' },

  // Gender options
  g_woman: { EN: 'Woman', DE: 'Frau', FR: 'Femme', IT: 'Donna' },
  g_man: { EN: 'Man', DE: 'Mann', FR: 'Homme', IT: 'Uomo' },
  g_nonbin: { EN: 'Non-binary / gender diverse', DE: 'Nicht-binär / divers', FR: 'Non-binaire / divers', IT: 'Non binario / genere diverso' },
  g_nosay: { EN: 'Prefer not to say', DE: 'Keine Angabe', FR: 'Préfère ne pas répondre', IT: 'Preferisco non rispondere' },

  // First-time options
  ft_yes: { EN: 'Yes, first time', DE: 'Ja, zum ersten Mal', FR: 'Oui, première fois', IT: 'Sì, è la prima volta' },
  ft_no: { EN: 'No, I have seen similar before', DE: 'Nein, schon Ähnliches gesehen', FR: 'Non, déjà vu similaire', IT: 'No, ne ho già visti di simili' },

  // ─────────────────────────────────────── SECTIONS ───────────────
  scaleHint: {
    EN: '1 = Strongly disagree · 7 = Strongly agree',
    DE: '1 = Stimme gar nicht zu · 7 = Stimme voll zu',
    FR: '1 = Pas du tout d’accord · 7 = Tout à fait d’accord',
  
    IT: "1 = Del tutto in disaccordo · 7 = Del tutto d'accordo",},
  sustainabilityTrust: { EN: 'Sustainability Trust', DE: 'Nachhaltigkeits­vertrauen', FR: 'Confiance en la durabilité', IT: 'Fiducia nella sostenibilità' },
  sensoryAppeal: { EN: 'Sensory Appeal', DE: 'Sinnliche Anziehung', FR: 'Attrait sensoriel', IT: 'Attrattiva sensoriale' },
  overallExperience: { EN: 'Overall Experience', DE: 'Gesamteindruck', FR: 'Expérience globale', IT: 'Esperienza complessiva' },
  overallRanking: { EN: 'Overall Ranking', DE: 'Gesamt-Rangfolge', FR: 'Classement général', IT: 'Classifica complessiva' },
  rateAllPanels: {
    EN: 'Rate each panel on this statement',
    DE: 'Bewerten Sie jede Platte zu dieser Aussage',
    FR: 'Évaluez chaque panneau sur cet énoncé',
  
    IT: 'Valuta ogni pannello rispetto a questa affermazione',},

  // Sustainability (single, applies to concept)
  su1: { EN: 'Using these bio-sourced panels genuinely reduces construction waste.', DE: 'Die Verwendung dieser biobasierten Platten reduziert tatsächlich Bauabfall.', FR: 'L’utilisation de ces panneaux biosourcés réduit véritablement les déchets de construction.', IT: "L'uso di questi pannelli di origine biologica riduce concretamente i rifiuti da costruzione." },
  su2: { EN: 'Bio-waste materials make a building more responsible.', DE: 'Bio-Abfallmaterialien machen ein Gebäude verantwortungsvoller.', FR: 'Les matériaux issus de biodéchets rendent un bâtiment plus responsable.', IT: 'I materiali da bio-scarti rendono un edificio più responsabile.' },
  su3: { EN: 'Knowing these come from food/crop waste increases my appreciation.', DE: 'Zu wissen, dass diese aus Lebensmittel-/Ernteabfällen stammen, erhöht meine Wertschätzung.', FR: 'Savoir que cela provient de déchets alimentaires/agricoles augmente mon appréciation.', IT: 'Sapere che derivano da scarti alimentari o agricoli aumenta il mio apprezzamento.' },

  // Sensory (side-by-side, per panel)
  se1: { EN: 'Panel is visually appealing.', DE: 'Die Platte ist optisch ansprechend.', FR: 'Le panneau est visuellement attrayant.', IT: 'Il pannello è visivamente gradevole.' },
  se2: { EN: 'Material feels appealing to the touch.', DE: 'Das Material fühlt sich angenehm an.', FR: 'Le matériau est agréable au toucher.', IT: 'Il materiale è piacevole al tatto.' },
  se3: { EN: 'The material looks natural and organic.', DE: 'Das Material wirkt natürlich und organisch.', FR: 'Le matériau semble naturel et organique.', IT: 'Il materiale appare naturale e organico.' },
  se4: { EN: 'This panel has an innovative appearance.', DE: 'Diese Platte hat ein innovatives Aussehen.', FR: 'Ce panneau a une apparence innovante.', IT: 'Questo pannello ha un aspetto innovativo.' },
  se5: { EN: 'The visible composition adds to the appeal.', DE: 'Die sichtbare Zusammensetzung steigert den Reiz.', FR: 'La composition visible ajoute à l’attrait.', IT: "La composizione visibile ne accresce l'attrattiva." },

  // Overall (side-by-side, per panel)
  ov1: { EN: 'I would feel comfortable in a space using this panel.', DE: 'Ich würde mich in einem Raum mit dieser Platte wohlfühlen.', FR: 'Je me sentirais à l’aise dans un espace utilisant ce panneau.', IT: 'Mi sentirei a mio agio in uno spazio che utilizza questo pannello.' },
  ov2: { EN: 'I would recommend this panel for sustainable building.', DE: 'Ich würde diese Platte für nachhaltiges Bauen empfehlen.', FR: 'Je recommanderais ce panneau pour la construction durable.', IT: "Consiglierei questo pannello per l'edilizia sostenibile." },

  // ─────────────────────────────────────── RANKING ────────────────
  rankingInstruction: {
    EN: 'Drag the panels to order them from best (top) to worst (bottom) based on your overall impression.',
    DE: 'Ziehen Sie die Platten, um sie von der besten (oben) bis zur schlechtesten (unten) zu ordnen.',
    FR: 'Faites glisser les panneaux pour les classer du meilleur (haut) au pire (bas) selon votre impression globale.',
  
    IT: 'Trascina i pannelli per ordinarli dal migliore (in alto) al peggiore (in basso) secondo la tua impressione complessiva.',},
  rankBest: { EN: '↑ Best', DE: '↑ Beste', FR: '↑ Meilleur', IT: '↑ Migliore' },
  rankWorst: { EN: '↓ Worst', DE: '↓ Schlechteste', FR: '↓ Pire', IT: '↓ Peggiore' },
  dragHint: { EN: 'Hold any panel and drag up or down to reorder', DE: 'Platte gedrückt halten und hoch-/runterziehen zum Umsortieren', FR: 'Maintenez un panneau et faites-le glisser pour réordonner', IT: 'Tieni premuto un pannello e trascinalo su o giù per riordinare' },

  // ─────────────────────────────────────── OPEN QUESTION ──────────
  openTitle: { EN: 'In Your Own Words', DE: 'In Ihren eigenen Worten', FR: 'Dans vos propres mots', IT: 'Con parole tue' },
  openQuestion: {
    EN: 'Why did the panel you ranked #1 impress you most? You can also talk about the other panels.',
    DE: 'Warum hat Sie die als #1 platzierte Platte am meisten beeindruckt? Sie können auch über die anderen Platten sprechen.',
    FR: 'Pourquoi le panneau que vous avez classé n°1 vous a-t-il le plus impressionné ? Vous pouvez aussi parler des autres panneaux.',
  
    IT: 'Perché il pannello che hai messo al 1° posto ti ha colpito di più? Puoi parlare anche degli altri pannelli.',},
  openPlaceholder: {
    EN: 'I liked panel X the most, since it seems really beautiful and soft when touched. The use of bio-sourced materials was wisely shown in the appearance, and I believe in future I would love to live in an apartment with these panels installed! Panel Y is also great but a little not nicely built and looks synthetic…',
    DE: 'Mir gefiel Platte X am besten, da sie wirklich schön aussieht und sich weich anfühlt. Die Verwendung biobasierter Materialien zeigte sich klug im Aussehen, und ich könnte mir vorstellen, künftig in einer Wohnung mit diesen Platten zu leben! Platte Y ist auch toll, aber etwas weniger schön verarbeitet und wirkt synthetisch…',
    FR: 'J’ai préféré le panneau X, car il semble vraiment beau et doux au toucher. L’utilisation de matériaux biosourcés était bien mise en valeur dans l’apparence, et je pense qu’à l’avenir j’aimerais vivre dans un appartement équipé de ces panneaux ! Le panneau Y est aussi très bien mais un peu moins bien fini et paraît synthétique…',
  
    IT: "Il pannello X mi è piaciuto di più, perché sembra davvero bello e morbido al tatto. L'uso di materiali di origine biologica è stato mostrato con intelligenza nell'aspetto e credo che in futuro mi piacerebbe vivere in un appartamento con questi pannelli! Anche il pannello Y è ottimo, ma un po' meno rifinito e sembra sintetico…",},
  speakLanguage: {
    EN: 'Which language will you speak in your recording?',
    DE: 'In welcher Sprache werden Sie aufnehmen?',
    FR: 'Dans quelle langue allez-vous parler dans votre enregistrement ?',
  
    IT: 'In quale lingua parlerai nella registrazione?',},
  speakLanguageHint: {
    EN: '🌍 Record in whatever language is most comfortable for you — your mother tongue is perfect. We just need to know which one so we can transcribe it.',
    DE: '🌍 Sprechen Sie in der Sprache, in der Sie sich am wohlsten fühlen — Ihre Muttersprache ist ideal. Wir müssen nur wissen welche, damit wir sie transkribieren können.',
    FR: '🌍 Enregistrez dans la langue qui vous est la plus confortable — votre langue maternelle est parfaite. Nous avons juste besoin de savoir laquelle pour la transcrire.',
  
    IT: '🌍 Registra nella lingua che preferisci — la tua lingua madre va benissimo. Ci serve solo sapere quale per poterla trascrivere.',},
  otherLanguage: {
    EN: 'Type the language you will speak…',
    DE: 'Tippen Sie die Sprache ein, die Sie sprechen werden…',
    FR: 'Tapez la langue que vous allez parler…',
  
    IT: 'Scrivi la lingua che parlerai…',},

  // ─────────────────────────────────────── VOICE ──────────────────
  recordVoice: { EN: 'Record voice', DE: 'Sprache aufnehmen', FR: 'Enregistrer la voix', IT: 'Registra voce' },
  stop: { EN: 'Stop', DE: 'Stopp', FR: 'Arrêter', IT: 'Ferma' },
  voiceRecorded: { EN: 'Voice recorded', DE: 'Aufnahme gespeichert', FR: 'Voix enregistrée', IT: 'Voce registrata' },
  recordingNotConsented: { EN: 'Recording not consented', DE: 'Aufnahme nicht zugestimmt', FR: 'Enregistrement non consenti', IT: 'Registrazione non consentita' },
  consentLaterTitle: {
    EN: 'Voice recording is off',
    DE: 'Sprachaufnahme ist deaktiviert',
    FR: "L'enregistrement vocal est désactivé",
  
    IT: 'La registrazione vocale è disattivata',},
  consentLaterBody: {
    EN: 'You did not tick the voice-recording box at the start. You can turn it on now if you wish — it stays optional.',
    DE: 'Sie haben das Kästchen für die Sprachaufnahme am Anfang nicht angekreuzt. Sie können sie jetzt aktivieren, wenn Sie möchten — sie bleibt freiwillig.',
    FR: "Vous n'avez pas coché la case d'enregistrement vocal au début. Vous pouvez l'activer maintenant si vous le souhaitez — cela reste facultatif.",
  
    IT: "All'inizio non hai selezionato la casella per la registrazione vocale. Puoi attivarla ora se lo desideri — resta facoltativa.",},
  consentLaterButton: {
    EN: 'I agree — enable voice recording',
    DE: 'Ich stimme zu — Sprachaufnahme aktivieren',
    FR: "J'accepte — activer l'enregistrement vocal",
  
    IT: 'Acconsento — attiva la registrazione vocale',},
  consentLaterConfirmTitle: {
    EN: 'Confirm consent',
    DE: 'Einwilligung bestätigen',
    FR: 'Confirmer le consentement',
  
    IT: 'Conferma il consenso',},
  consentLaterCancel: { EN: 'Cancel', DE: 'Abbrechen', FR: 'Annuler', IT: 'Annulla' },
  consentLaterAgree: { EN: 'I agree', DE: 'Ich stimme zu', FR: "J'accepte", IT: 'Acconsento' },

  // ─────────────────────────────────────── NAV / SUBMIT ───────────
  next: { EN: 'Next →', DE: 'Weiter →', FR: 'Suivant →', IT: 'Avanti →' },
  previous: { EN: '← Previous', DE: '← Zurück', FR: '← Précédent', IT: '← Precedente' },
  submitSurvey: { EN: '✓ Submit Survey', DE: '✓ Umfrage absenden', FR: '✓ Envoyer l’enquête', IT: "✓ Invia l'indagine" },
  discard: { EN: 'Discard and return to home', DE: 'Verwerfen und zur Startseite', FR: 'Annuler et revenir à l’accueil', IT: 'Annulla e torna alla home' },
  discardConfirm: { EN: 'Discard?', DE: 'Verwerfen?', FR: 'Annuler ?', IT: 'Vuoi annullare?' },
  discardMsg: { EN: 'All answers will be lost.', DE: 'Alle Antworten gehen verloren.', FR: 'Toutes les réponses seront perdues.', IT: 'Tutte le risposte andranno perse.' },
  cancel: { EN: 'Cancel', DE: 'Abbrechen', FR: 'Annuler', IT: 'Annulla' },
  incomplete: { EN: 'Incomplete', DE: 'Unvollständig', FR: 'Incomplet', IT: 'Incompleto' },
  incompleteMsg: {
    EN: 'Please answer all rating questions before continuing.',
    DE: 'Bitte beantworten Sie alle Bewertungsfragen, bevor Sie fortfahren.',
    FR: 'Veuillez répondre à toutes les questions d’évaluation avant de continuer.',
  
    IT: 'Rispondi a tutte le domande di valutazione prima di continuare.',},
  missingInfo: { EN: 'Missing info', DE: 'Fehlende Angaben', FR: 'Informations manquantes', IT: 'Informazioni mancanti' },
  missingDemo: {
    EN: 'Please complete background, age group, and first-time questions.',
    DE: 'Bitte füllen Sie Hintergrund, Altersgruppe und Erstbesuch aus.',
    FR: 'Veuillez compléter le profil, la tranche d’âge et la première visite.',
  
    IT: "Completa le domande su formazione, fascia d'età e prima volta.",},

  // ─────────────────────────────────────── PROGRESS LABELS ────────
  stepDemographics: { EN: 'About You', DE: 'Über Sie', FR: 'À propos de vous', IT: 'Su di te' },
  stepSustain: { EN: 'Sustainability', DE: 'Nachhaltigkeit', FR: 'Durabilité', IT: 'Sostenibilità' },
  stepSensory: { EN: 'Sensory', DE: 'Sinnlich', FR: 'Sensoriel', IT: 'Sensoriale' },
  stepOverall: { EN: 'Overall', DE: 'Gesamt', FR: 'Global', IT: 'Complessivo' },
  stepRanking: { EN: 'Ranking', DE: 'Rangfolge', FR: 'Classement', IT: 'Classifica' },
  stepOpen: { EN: 'Comments', DE: 'Kommentare', FR: 'Commentaires', IT: 'Commenti' },

  // ─────────────────────────────────────── THANK YOU ──────────────
  thankYou: { EN: 'Thank you!', DE: 'Vielen Dank!', FR: 'Merci !', IT: 'Grazie!' },
  thankYouSub: { EN: 'Your response has been saved successfully.', DE: 'Ihre Antwort wurde erfolgreich gespeichert.', FR: 'Votre réponse a été enregistrée avec succès.', IT: 'La tua risposta è stata salvata correttamente.' },
  yourId: { EN: 'YOUR PARTICIPANT ID', DE: 'IHRE TEILNEHMER-ID', FR: 'VOTRE ID DE PARTICIPANT', IT: 'IL TUO ID PARTECIPANTE' },
  keepId: {
    EN: 'Keep this ID if you wish to withdraw. Contact: PANTAREI2026@outlook.com',
    DE: 'Bewahren Sie diese ID für einen Widerruf auf. Kontakt: PANTAREI2026@outlook.com',
    FR: 'Conservez cet ID pour tout retrait. Contact : PANTAREI2026@outlook.com',
  
    IT: 'Conserva questo ID se desideri revocare il consenso. Contatto: PANTAREI2026@outlook.com',},
  returningHome: { EN: 'Returning to home in', DE: 'Zurück zur Startseite in', FR: 'Retour à l’accueil dans', IT: 'Ritorno alla home tra' },
  returnNow: { EN: 'Return to Home Now', DE: 'Jetzt zur Startseite', FR: 'Revenir à l’accueil', IT: 'Torna subito alla home' },


  // Likert anchors — shown live under the slider when a value is selected.
  scale_1: { EN: 'Strongly disagree',   DE: 'Stimme gar nicht zu',     FR: 'Pas du tout d’accord', IT: 'Del tutto in disaccordo' },
  scale_2: { EN: 'Disagree',            DE: 'Stimme nicht zu',         FR: 'Pas d’accord', IT: 'In disaccordo' },
  scale_3: { EN: 'Slightly disagree',   DE: 'Stimme eher nicht zu',    FR: 'Plutôt pas d’accord', IT: 'Parzialmente in disaccordo' },
  scale_4: { EN: 'Neutral',             DE: 'Neutral',                 FR: 'Neutre', IT: 'Neutrale' },
  scale_5: { EN: 'Slightly agree',      DE: 'Stimme eher zu',          FR: 'Plutôt d’accord', IT: "Parzialmente d'accordo" },
  scale_6: { EN: 'Agree',               DE: 'Stimme zu',               FR: 'D’accord', IT: "D'accordo" },
  scale_7: { EN: 'Strongly agree',      DE: 'Stimme voll zu',          FR: 'Tout à fait d’accord', IT: "Del tutto d'accordo" },

  // Panel descriptions — 4 actual produced panels (see panels.pptx)
  panelA: {
    EN: 'Pure PLA — pale, smooth TPMS lattice, no bio-filler',
    DE: 'Reines PLA — helles, glattes TPMS-Gitter, kein Biofüller',
    FR: 'PLA pur — structure TPMS claire et lisse, sans charge bio',
  
    IT: 'PLA puro — reticolo TPMS chiaro e liscio, senza bio-riempitivo',},
  panelB: {
    EN: 'PLA + 2.5% almond shell powder — warm golden-tan',
    DE: 'PLA + 2,5 % Mandelschalenpulver — warmer Goldton',
    FR: 'PLA + 2,5 % poudre de coque d’amande — teinte dorée chaude',
  
    IT: 'PLA + 2,5% polvere di gusci di mandorla — beige dorato caldo',},
  panelC: {
    EN: 'PLA + 7.5% almond shell powder — darker amber-brown',
    DE: 'PLA + 7,5 % Mandelschalenpulver — dunkleres Bernsteinbraun',
    FR: 'PLA + 7,5 % poudre de coque d’amande — brun ambré plus foncé',
  
    IT: 'PLA + 7,5% polvere di gusci di mandorla — ambra-bruno più scuro',},
  panelD: {
    EN: 'PLA + 10% flax fibres — sandy khaki with visible natural fibres',
    DE: 'PLA + 10 % Flachsfasern — sandiges Khaki, sichtbare Naturfasern',
    FR: 'PLA + 10 % fibres de lin — kaki sableux, fibres naturelles visibles',
  
    IT: 'PLA + 10% fibre di lino — cachi sabbia con fibre naturali visibili',},
};

// Helper: t('key', lang) → string with safe fallback to EN then key.
export function t(key, lang = 'EN') {
  const entry = TRANSLATIONS[key];
  if (!entry) return key;
  return entry[lang] || entry.EN || key;
}
