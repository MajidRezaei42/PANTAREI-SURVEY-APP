// src/screens/DataManagerScreen.js
// Admin page: stats, export CSV/JSON, browse responses,
// delete a record (feature #6), play recorded audio (feature #7).

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import {
  getAllResponses, getTotalCount, getTopRankCounts,
  exportToCSV, exportToJSON, exportToZip, deleteResponse,
} from '../db/database';
import { PANELS, PANEL_COLORS, SENSORY_QUESTIONS, OVERALL_QUESTIONS, perPanelCode } from '../utils/questions';
import AudioPlayback from '../components/AudioPlayback';
import { fs } from '../utils/responsive';

export default function DataManagerScreen({ navigation }) {
  const [responses, setResponses] = useState([]);
  const [total, setTotal] = useState(0);
  const [topRanks, setTopRanks] = useState({});
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    load();
    const u = navigation.addListener('focus', load);
    return u;
  }, [navigation]);

  const load = async () => {
    setResponses(await getAllResponses());
    setTotal(await getTotalCount());
    setTopRanks(await getTopRankCounts());
  };

  const doExport = async (fmt) => {
    setLoading(true);
    try {
      const res = fmt === 'CSV' ? await exportToCSV() : fmt === 'JSON' ? await exportToJSON() : await exportToZip();
      if (!res) { Alert.alert('No data', 'No completed responses yet.'); return; }
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(res.path, {
          mimeType: fmt === 'CSV' ? 'text/csv' : fmt === 'JSON' ? 'application/json' : 'application/zip',
          dialogTitle: `Export PANTAREI ${fmt}`,
        });
      } else {
        Alert.alert('Exported', `${res.fname}\n${res.count} responses`);
      }
    } catch (e) { Alert.alert('Export error', e.message); }
    finally { setLoading(false); }
  };

  const confirmDelete = (id, pid) => {
    Alert.alert(
      'Delete this record?',
      `Participant ${pid}\nThis permanently removes the response and its audio file. This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: async () => {
            try {
              await deleteResponse(id);
              if (expanded === id) setExpanded(null);
              await load();
            } catch (e) { Alert.alert('Delete error', e.message); }
          }
        },
      ]
    );
  };

  // Render the per-panel matrix for a side-by-side question group.
  const renderMatrix = (r, questions, label, color) => (
    <>
      <Text style={[styles.detTitle, { color }]}>{label}</Text>
      <View style={styles.matrixHeader}>
        <Text style={[styles.matrixCell, styles.matrixQ]}> </Text>
        {PANELS.map(p => (
          <Text key={p.id} style={[styles.matrixCell, styles.matrixHead, { color: PANEL_COLORS[p.id] }]}>{p.id}</Text>
        ))}
      </View>
      {questions.map(q => (
        <View key={q.code} style={styles.matrixRow}>
          <Text style={[styles.matrixCell, styles.matrixQ]}>{q.code.toUpperCase()}</Text>
          {PANELS.map(p => (
            <Text key={p.id} style={[styles.matrixCell, styles.matrixVal]}>
              {r[perPanelCode(q.code, p.id)] ?? '–'}
            </Text>
          ))}
        </View>
      ))}
    </>
  );

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backTxt}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data Manager</Text>
        <TouchableOpacity onPress={load} style={styles.refresh}>
          <Text style={styles.refreshTxt}>↻</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Stats: #1 rank counts per panel */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ranked #1 — count per panel</Text>
          <View style={styles.statRow}>
            {PANELS.map(p => (
              <View key={p.id} style={[styles.statBox, { borderColor: PANEL_COLORS[p.id] }]}>
                <Text style={[styles.statLabel, { color: PANEL_COLORS[p.id] }]}>{p.id}</Text>
                <Text style={[styles.statNum, { color: PANEL_COLORS[p.id] }]}>{topRanks[p.id] || 0}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.total}>Total: {total} completed</Text>
        </View>

        {/* Export */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Export Data</Text>
          <Text style={styles.cardSub}>Share via email, Google Drive, or save to device.</Text>
          <TouchableOpacity style={[styles.expBtn, { backgroundColor: '#2D5016' }]}
            onPress={() => doExport('CSV')} disabled={loading} activeOpacity={0.8}>
            <Text style={styles.expTxt}>📄  Export as CSV</Text>
            <Text style={styles.expHint}>For Excel / R / Python</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.expBtn, { backgroundColor: '#1A3A6B' }]}
            onPress={() => doExport('JSON')} disabled={loading} activeOpacity={0.8}>
            <Text style={styles.expTxt}>{ }  Export as JSON</Text>
            <Text style={styles.expHint}>For ML pipeline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.expBtn, { backgroundColor: '#6A2D8F' }]}
            onPress={() => doExport('ZIP')} disabled={loading} activeOpacity={0.8}>
            <Text style={styles.expTxt}>📦  Export ZIP (data + audio)</Text>
            <Text style={styles.expHint}>CSV + JSON + all recordings in one file</Text>
          </TouchableOpacity>
        </View>

        {/* Response list */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Responses ({responses.length})</Text>
          {responses.length === 0 && <Text style={styles.empty}>No completed responses yet.</Text>}

          {responses.map(r => {
            const open = expanded === r.id;
            return (
              <View key={r.id} style={[styles.respRow, open && styles.respRowOpen]}>
                <TouchableOpacity style={styles.respHead}
                  onPress={() => setExpanded(open ? null : r.id)} activeOpacity={0.7}>
                  <Text style={styles.respId}>{r.participant_id}</Text>
                  <Text style={styles.respLang}>{r.survey_language || '—'}</Text>
                  <Text style={styles.respTime}>{new Date(r.timestamp).toLocaleTimeString()}</Text>
                  <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
                </TouchableOpacity>

                {open && (
                  <View style={styles.detail}>
                    <Text style={styles.detTitle}>Ranking (best→worst)</Text>
                    <Text style={styles.detVal}>{r.ranking || '—'}</Text>

                    <Text style={[styles.detTitle, { color: '#1A3A6B' }]}>Sustainability</Text>
                    <Text style={styles.detVal}>SU1:{r.su1??'–'}  SU2:{r.su2??'–'}  SU3:{r.su3??'–'}</Text>

                    {renderMatrix(r, SENSORY_QUESTIONS, 'Sensory (per panel)', '#2D5016')}
                    {renderMatrix(r, OVERALL_QUESTIONS, 'Overall (per panel)', '#7A5C10')}

                    {r.open_comment ? (
                      <>
                        <Text style={styles.detTitle}>Open comment{r.audio_language ? ` (lang: ${r.audio_language})` : ''}</Text>
                        <Text style={styles.detVal}>"{r.open_comment}"</Text>
                      </>
                    ) : null}

                    {/* Feature #7 — play recorded audio */}
                    {r.recording_open ? (
                      <AudioPlayback uri={r.recording_open} language={r.audio_language} />
                    ) : null}

                    <Text style={styles.dur}>Duration: {r.duration_seconds}s · {r.background} · {r.age_group} · {r.gender}</Text>

                    {/* Feature #6 — delete record */}
                    <TouchableOpacity style={styles.delBtn}
                      onPress={() => confirmDelete(r.id, r.participant_id)} activeOpacity={0.8}>
                      <Text style={styles.delTxt}>🗑  Delete this record</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F8F2' },
  header: { backgroundColor: '#1A3A6B', paddingTop: 48, paddingBottom: 16, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' },
  back: { padding: 4, marginRight: 12 },
  backTxt: { fontSize: fs(22), color: '#FFF' },
  refresh: { padding: 4, marginLeft: 'auto' },
  refreshTxt: { fontSize: fs(22), color: '#FFF' },
  headerTitle: { fontSize: fs(18), fontWeight: '700', color: '#FFF', flex: 1 },
  body: { padding: 14, paddingBottom: 40 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 12, elevation: 2 },
  cardTitle: { fontSize: fs(15), fontWeight: '700', color: '#1A1814', marginBottom: 4 },
  cardSub: { fontSize: fs(12), color: '#888', marginBottom: 10 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statBox: { borderWidth: 2, borderRadius: 8, padding: 8, alignItems: 'center', width: '18%' },
  statLabel: { fontSize: fs(11), fontWeight: '700' },
  statNum: { fontSize: fs(22), fontWeight: '800' },
  total: { fontSize: fs(13), color: '#666', textAlign: 'right' },
  expBtn: { borderRadius: 10, padding: 14, marginBottom: 8 },
  expTxt: { fontSize: fs(15), fontWeight: '700', color: '#FFF' },
  expHint: { fontSize: fs(11), color: 'rgba(255,255,255,0.7)' },
  empty: { fontSize: fs(13), color: '#BBB', textAlign: 'center', padding: 20 },
  respRow: { borderWidth: 1, borderColor: '#EEE', borderRadius: 8, padding: 10, marginBottom: 6 },
  respRowOpen: { borderColor: '#2D5016', backgroundColor: '#F9FBF7' },
  respHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  respId: { fontSize: fs(12), fontFamily: 'monospace', color: '#666', flex: 1 },
  respLang: { fontSize: fs(11), fontWeight: '700', color: '#1A3A6B' },
  respTime: { fontSize: fs(11), color: '#AAA' },
  chevron: { fontSize: fs(12), color: '#AAA' },
  detail: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#EEE' },
  detTitle: { fontSize: fs(11), fontWeight: '700', color: '#888', marginTop: 8, marginBottom: 3 },
  detVal: { fontSize: fs(12), color: '#444', fontFamily: 'monospace' },
  matrixHeader: { flexDirection: 'row', marginTop: 2 },
  matrixRow: { flexDirection: 'row', alignItems: 'center' },
  matrixCell: { fontSize: fs(12), fontFamily: 'monospace', textAlign: 'center', paddingVertical: 1 },
  matrixQ: { width: 44, textAlign: 'left', color: '#888', fontWeight: '700' },
  matrixHead: { flex: 1, fontWeight: '800' },
  matrixVal: { flex: 1, color: '#444' },
  dur: { fontSize: fs(11), color: '#AAA', marginTop: 10 },
  delBtn: { marginTop: 12, borderWidth: 1.5, borderColor: '#CC2020', borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  delTxt: { fontSize: fs(14), fontWeight: '700', color: '#CC2020' },
});
