# PANTAREI App v2 — Side-by-Side Survey (V3.3)

This is your working SDK 54 app, upgraded to the new side-by-side survey
with 8 new features. Everything that worked before still works the same way
(expo-audio, SQLite sync API, expo-file-system/legacy, emoji icons).

## How to run (unchanged from before)

```
npm install
npx expo start
```
Scan the QR code with Expo Go (SDK 54) on your phone.

To build the installable APK:
```
eas build --platform android --profile preview
```

## What changed

### New survey structure (V3.3)
- **Consent** → no longer asks "which panel" (every participant now rates ALL 5 panels).
- **Demographics** → grouped backgrounds; Gender defaults to "Prefer not to say",
  First-time defaults to "Yes", Background defaults to "General public".
- **Sustainability (SU1–SU3)** → concept-level, one rating each.
- **Sensory (SE1–SE5)** and **Overall (OV1–OV2)** → side-by-side, one question per page,
  all 5 panels rated with 1–7 sliders.
- **Ranking** → drag-and-drop, best (top) to worst (bottom).
- **Open question** → mother-tongue comment with sample placeholder text + voice recording.

### The 8 requested features
1. **Side-by-side one-question-per-page** — `SurveyScreen.js` pages 2–8; each shows the
   question once and a `PanelSlider` (icon + name + 1–7 slider) for every panel.
2. **Three languages (EN/DE/FR)** — chosen on the Home page and switchable any time via the
   `LanguageSwitcher` pill in every header. All strings live in `src/i18n/translations.js`.
3. **Audio language field** — the voice recorder asks which language the participant will speak
   before recording; stored in the `audio_language` column for AI transcription.
4. **Default selections** — see Demographics above (set in `src/utils/questions.js` via `default:true`).
5. **Sample placeholder text** — shown in the open-ended question (`openPlaceholder` per language).
6. **Delete a record** — Data Manager → expand a response → "Delete this record"
   (also deletes its audio file).
7. **Play recorded audio** — Data Manager → expand a response → "Play recording"
   (`AudioPlayback.js`).
8. **Drag-and-drop ranking** — `DragRanking.js`, reorder the 5 panels with a finger drag.

## Adding real panel photos later (currently placeholder badges)

Right now each panel shows a coloured letter badge (A/B/C/D/E) as a placeholder.
When you have real photos:

1. Put images in `src/assets/panels/` e.g. `panelA.jpg`, `panelB.jpg`, …
2. Open `src/utils/questions.js` and edit `PANEL_IMAGES`:
   ```js
   export const PANEL_IMAGES = {
     A: require('../assets/panels/panelA.jpg'),
     B: require('../assets/panels/panelB.jpg'),
     C: require('../assets/panels/panelC.jpg'),
     D: require('../assets/panels/panelD.jpg'),
     E: require('../assets/panels/panelE.jpg'),
   };
   ```
The sliders and the ranking list will then show the photos automatically.

## Data / export
- New DB file name: `pantarei_survey_v2.db` (so it won't clash with the old one).
- CSV/JSON export now includes: survey_language, su1–su3, all 35 side-by-side
  columns (se1_A … ov2_E), ranking (e.g. "C,A,D,B,E"), open_comment,
  audio_language, recording_open.

## Withdrawal contact
The V3.3 survey text uses **PANTAREI2026@outlook.com** (as in your new document).
If you'd rather use the POLIMI address, change it in `src/i18n/translations.js`
(keys `gdprText` and `keepId`).
