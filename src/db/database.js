// src/db/database.js
// V3.3 schema: side-by-side ratings (per-panel SE/OV), concept-level SU,
// ranking, audio language, and survey language.

import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system/legacy';
import { SIDE_BY_SIDE_CODES, SUSTAIN_CODES, PANELS } from '../utils/questions';
import { buildZip, base64ToBytes, bytesToBase64, utf8 } from '../utils/zipWriter';


let db = null;

function getDB() {
  if (!db) {
    db = SQLite.openDatabaseSync('pantarei_survey_v3.db');
  }
  return db;
}

// Build the dynamic column list for side-by-side + sustainability ratings.
function ratingColumns() {
  const cols = [];
  SUSTAIN_CODES.forEach(c => cols.push(`${c} INTEGER`));
  SIDE_BY_SIDE_CODES.forEach(c => cols.push(`${c} INTEGER`));
  return cols.join(',\n      ');
}

export async function initDatabase() {
  await getDB().execAsync(`
    CREATE TABLE IF NOT EXISTS responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participant_id TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      survey_language TEXT,
      consent_research INTEGER DEFAULT 0,
      consent_recording INTEGER DEFAULT 0,
      consent_age INTEGER DEFAULT 0,
      consent_recording_at TEXT,
      background TEXT,
      age_group TEXT,
      gender TEXT,
      first_time TEXT,
      ${ratingColumns()},
      ranking TEXT,
      open_comment TEXT,
      audio_language TEXT,
      recording_open TEXT,
      completed INTEGER DEFAULT 0,
      duration_seconds INTEGER
    );
  `);

  // Migration: older installs were created before consent_recording_at existed.
  // ALTER TABLE ADD COLUMN is a no-op we must guard, so check the column list.
  try {
    const cols = await getDB().getAllAsync(`PRAGMA table_info(responses);`);
    if (!cols.some(c => c.name === 'consent_recording_at')) {
      await getDB().execAsync(`ALTER TABLE responses ADD COLUMN consent_recording_at TEXT;`);
    }
  } catch (e) {
    // Non-fatal: the column simply stays absent on this device.
  }
}

export async function createResponse(participantId, surveyLanguage, consents = {}) {
  const { research = 0, recording = 0, age = 0 } = consents;
  const result = await getDB().runAsync(
    `INSERT INTO responses
       (participant_id, timestamp, survey_language,
        consent_research, consent_recording, consent_age,
        consent_recording_at, completed)
     VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
    [
      participantId, new Date().toISOString(), surveyLanguage,
      research ? 1 : 0, recording ? 1 : 0, age ? 1 : 0,
      recording ? new Date().toISOString() : null,
    ]
  );
  return result.lastInsertRowId;
}

export async function updateResponse(id, fields) {
  const keys = Object.keys(fields);
  if (!keys.length) return 0;
  const result = await getDB().runAsync(
    `UPDATE responses SET ${keys.map(k => `${k} = ?`).join(', ')} WHERE id = ?`,
    [...Object.values(fields), id]
  );
  return result.changes;
}

export async function getAllResponses() {
  return await getDB().getAllAsync(
    `SELECT * FROM responses WHERE completed = 1 ORDER BY timestamp DESC`
  );
}

// Feature 6: delete a single record (and its audio file if present).
export async function deleteResponse(id) {
  const row = await getDB().getFirstAsync(
    `SELECT recording_open FROM responses WHERE id = ?`, [id]
  );
  if (row && row.recording_open) {
    try {
      const info = await FileSystem.getInfoAsync(row.recording_open);
      if (info.exists) await FileSystem.deleteAsync(row.recording_open, { idempotent: true });
    } catch (e) { /* ignore file errors */ }
  }
  const result = await getDB().runAsync(`DELETE FROM responses WHERE id = ?`, [id]);
  return result.changes;
}

// Total completed count (ranking-based survey is not per-panel anymore).
export async function getTotalCount() {
  const row = await getDB().getFirstAsync(
    `SELECT COUNT(*) as count FROM responses WHERE completed = 1`
  );
  return row ? row.count : 0;
}

// How often each panel was ranked #1 (nice quick stat for admin page).
export async function getTopRankCounts() {
  const rows = await getAllResponses();
  const counts = {};
  PANELS.forEach(p => { counts[p.id] = 0; });
  rows.forEach(r => {
    if (r.ranking) {
      const first = r.ranking.split(',')[0];
      if (first && counts[first] !== undefined) counts[first] += 1;
    }
  });
  return counts;
}

function buildHeaders() {
  return [
    'participant_id', 'timestamp', 'survey_language',
    'consent_research', 'consent_recording', 'consent_age', 'consent_recording_at',
    'background', 'age_group', 'gender', 'first_time',
    ...SUSTAIN_CODES,
    ...SIDE_BY_SIDE_CODES,
    'ranking', 'open_comment', 'audio_language', 'recording_open',
    'duration_seconds',
  ];
}

export async function exportToCSV() {
  const rows = await getAllResponses();
  if (!rows.length) return null;
  const headers = buildHeaders();
  const esc = v => {
    if (v == null) return '';
    const s = String(v);
    return (s.includes(',') || s.includes('"') || s.includes('\n'))
      ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const csv = [headers.join(','), ...rows.map(r => headers.map(h => esc(r[h])).join(','))].join('\n');
  const fname = `pantarei_v2_${new Date().toISOString().slice(0,10)}.csv`;
  const path = FileSystem.documentDirectory + fname;
  await FileSystem.writeAsStringAsync(path, csv, { encoding: FileSystem.EncodingType.UTF8 });
  return { path, fname, count: rows.length };
}

export async function exportToJSON() {
  const rows = await getAllResponses();
  if (!rows.length) return null;
  const json = JSON.stringify({
    export_time: new Date().toISOString(),
    project: 'PANTAREI',
    survey: 'SideBySide_V3.3',
    n: rows.length,
    responses: rows,
  }, null, 2);
  const fname = `pantarei_v2_${new Date().toISOString().slice(0,10)}.json`;
  const path = FileSystem.documentDirectory + fname;
  await FileSystem.writeAsStringAsync(path, json, { encoding: FileSystem.EncodingType.UTF8 });
  return { path, fname, count: rows.length };
}


// ── ZIP export: data + all audio files in one archive ────────────────────────
// The zip contains:
//   pantarei_data.csv          — all responses (same as CSV export)
//   pantarei_data.json         — all responses (same as JSON export)
//   README.txt                 — column guide + audio file naming explanation
//   recordings/
//     {participantId}_{audioLanguage}_{timestamp}.m4a   — one file per recording
//
// The CSV has a column "recording_open" with the original device path.
// In the zip, that path is replaced by the relative zip path so you can
// cross-reference easily: find the participant ID in the CSV, then open
// the matching audio file from the recordings/ folder.

export async function exportToZip() {
  const rows = await getAllResponses();
  if (!rows.length) return null;

  const entries = [];
  const dateStr = new Date().toISOString().slice(0, 10);

  // ── Build CSV with zip-relative audio paths ──────────────────────────────
  const headers = buildHeaders();
  const esc = v => {
    if (v == null) return '';
    const s = String(v);
    return (s.includes(',') || s.includes('"') || s.includes('\n'))
      ? '"' + s.replace(/"/g, '""') + '"' : s;
  };

  // Map: original device URI → zip-relative path (built while adding audio files)
  const uriToZipPath = {};

  // First pass: collect and embed audio files
  for (const row of rows) {
    if (!row.recording_open) continue;
    try {
      const info = await FileSystem.getInfoAsync(row.recording_open);
      if (!info.exists) continue;

      // Read as base64
      const b64 = await FileSystem.readAsStringAsync(row.recording_open, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const audioBytes = base64ToBytes(b64);

      // Clean participant ID for use in filename (remove unsafe chars)
      const safePid  = (row.participant_id || 'unknown').replace(/[^A-Za-z0-9_-]/g, '_');
      const safeLang = (row.audio_language || 'unknown').replace(/[^A-Za-z0-9_-]/g, '_');
      const ts       = (row.timestamp || '').replace(/[^0-9T]/g, '').slice(0, 15);
      const zipName  = `recordings/${safePid}_${safeLang}_${ts}.m4a`;

      entries.push({ name: zipName, data: audioBytes });
      uriToZipPath[row.recording_open] = zipName;
    } catch (e) {
      // File unreadable — skip silently, note in CSV
    }
  }

  // Second pass: build CSV with zip-relative paths substituted in
  const csvRows = rows.map(r => {
    const modified = { ...r };
    if (r.recording_open && uriToZipPath[r.recording_open]) {
      modified.recording_open = uriToZipPath[r.recording_open];
    } else if (r.recording_open) {
      modified.recording_open = '(file not found on device)';
    }
    return headers.map(h => esc(modified[h])).join(',');
  });
  const csv = [headers.join(','), ...csvRows].join('\n');
  entries.unshift({ name: 'pantarei_data.csv', data: utf8(csv) });

  // ── JSON with zip-relative paths ─────────────────────────────────────────
  const jsonRows = rows.map(r => ({
    ...r,
    recording_open: uriToZipPath[r.recording_open] || r.recording_open || null,
  }));
  const json = JSON.stringify({
    export_time: new Date().toISOString(),
    project: 'PANTAREI',
    survey: 'SideBySide_V3.3',
    n: rows.length,
    audio_files_included: Object.keys(uriToZipPath).length,
    responses: jsonRows,
  }, null, 2);
  entries.splice(1, 0, { name: 'pantarei_data.json', data: utf8(json) });

  // ── README ────────────────────────────────────────────────────────────────
  const readme = [
    'PANTAREI Survey Export — ' + new Date().toISOString(),
    '='.repeat(60),
    '',
    'Files in this archive:',
    '  pantarei_data.csv    All survey responses (open in Excel / R / Python)',
    '  pantarei_data.json   Same data in JSON (for ML pipeline)',
    '  recordings/          Voice recordings, one .m4a file per participant',
    '',
    'How to match recordings to responses:',
    '  Each audio file is named:',
    '    {participantId}_{audioLanguage}_{timestamp}.m4a',
    '  The CSV column "recording_open" contains the same relative path.',
    '  Match on participant_id to link a response row to its audio file.',
    '',
    'Audio language:',
    '  Stored in the "audio_language" column and in the filename.',
    '  This is the language the participant said they would speak,',
    '  provided to assist AI transcription.',
    '',
    'Project: PANTAREI — EIC Pathfinder Challenges 2023',
    'Contact: PANTAREI2026@outlook.com',
  ].join('\n');
  entries.splice(2, 0, { name: 'README.txt', data: utf8(readme) });

  // ── Build and write the zip ───────────────────────────────────────────────
  const zipBytes = buildZip(entries);
  const b64Zip   = bytesToBase64(zipBytes);
  const fname    = `pantarei_export_${dateStr}.zip`;
  const path     = FileSystem.documentDirectory + fname;

  await FileSystem.writeAsStringAsync(path, b64Zip, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return {
    path,
    fname,
    count:        rows.length,
    audioCount:   Object.keys(uriToZipPath).length,
  };
}

export function generateParticipantId() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `P-${t}-${r}`;
}
