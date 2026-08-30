// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { initDatabase, getTotalCount, getTopRankCounts } from '../db/database';
import { PANELS, PANEL_COLORS } from '../utils/questions';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES } from '../i18n/translations';
import { fs, sp } from '../utils/responsive';

export default function HomeScreen({ navigation }) {
  const { lang, setLang, t } = useLanguage();
  const [total, setTotal] = useState(0);
  const [topRanks, setTopRanks] = useState({});
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDatabase().then(() => setDbReady(true)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!dbReady) return;
    const unsub = navigation.addListener('focus', load);
    load();
    return unsub;
  }, [dbReady]);

  const load = async () => {
    setTotal(await getTotalCount());
    setTopRanks(await getTopRankCounts());
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#2D5016" />
      <View style={styles.header}>
        <Text style={styles.title}>{t('appName')}</Text>
        <Text style={styles.sub}>{t('homeSubtitle')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>


        {/* Language chooser — big, on the very first page */}
        <View style={styles.card}>
          <Text style={styles.langTitle}>🌐 {t('chooseLanguage')}</Text>
          <View style={styles.langRow}>
            {LANGUAGES.map(l => {
              const active = lang === l.code;
              return (
                <TouchableOpacity
                  key={l.code}
                  style={[styles.langBtn, active && styles.langBtnActive]}
                  onPress={() => setLang(l.code)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.langFlag}>{l.flag}</Text>
                  <Text style={[styles.langLabel, active && styles.langLabelActive]}>{l.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.desc}>{t('homeIntro')}</Text>
          <Text style={[styles.desc, { marginBottom: 0 }]}>{t('homeExamine')}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.statTitle}>{t('responsesCollected')}</Text>
          <View style={styles.statRow}>
            {PANELS.map(p => (
              <View key={p.id} style={[styles.statBox, { borderColor: PANEL_COLORS[p.id] }]}>
                <Text style={[styles.statLabel, { color: PANEL_COLORS[p.id] }]}>#{1} {p.id}</Text>
                <Text style={[styles.statNum, { color: PANEL_COLORS[p.id] }]}>{topRanks[p.id] || 0}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.totalText}>{t('total')}: {total} {t('completed')}</Text>
        </View>

        <TouchableOpacity
          style={[styles.startBtn, !dbReady && { backgroundColor: '#AAA' }]}
          onPress={() => navigation.navigate('Consent')}
          disabled={!dbReady}
          activeOpacity={0.85}
        >
          <Text style={styles.startTxt}>📋  {t('startSurvey')}</Text>
        </TouchableOpacity>

        <View style={styles.adminRow}>
          <TouchableOpacity style={styles.adminBtn} onPress={() => navigation.navigate('DataManager')}>
            <Text style={styles.adminTxt}>⬇  {t('exportData')}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          PANTAREI — EIC Pathfinder Challenges 2023{'\n'}
          Coordinated by Politecnico di Milano
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F8F2' },
  header: { backgroundColor: '#2D5016', paddingTop: sp(50), paddingBottom: sp(24), paddingHorizontal: sp(20), alignItems: 'center' },
  title: { fontSize: fs(32), fontWeight: '800', color: '#FFF', letterSpacing: 2 },
  sub: { fontSize: fs(13), color: '#A8C890', marginTop: 4, textAlign: 'center' },
  body: { padding: sp(20), paddingBottom: sp(40) },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: sp(16), marginBottom: sp(14), borderLeftWidth: 4, borderLeftColor: '#2D5016', elevation: 2 },
  langTitle: { fontSize: fs(15), fontWeight: '700', color: '#2D5016', marginBottom: 12 },
  langRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  langBtn: { flexGrow: 1, flexBasis: '45%', alignItems: 'center', paddingVertical: 12, borderRadius: 10, borderWidth: 2, borderColor: '#DDD', backgroundColor: '#FAFAFA' },
  langBtnActive: { borderColor: '#2D5016', backgroundColor: '#E8F5E0' },
  langFlag: { fontSize: fs(26), marginBottom: 4 },
  langLabel: { fontSize: fs(13), color: '#666', fontWeight: '600' },
  langLabelActive: { color: '#2D5016', fontWeight: '800' },
  desc: { fontSize: fs(14), color: '#333', lineHeight: fs(21), marginBottom: 8 },
  statTitle: { fontSize: fs(13), fontWeight: '600', color: '#555', marginBottom: 12 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statBox: { borderWidth: 1.5, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 6, alignItems: 'center', width: '18%' },
  statLabel: { fontSize: fs(10), fontWeight: '700' },
  statNum: { fontSize: fs(22), fontWeight: '800', marginTop: 2 },
  totalText: { fontSize: fs(13), color: '#777', textAlign: 'right', marginTop: 4 },
  startBtn: { backgroundColor: '#2D5016', borderRadius: 16, paddingVertical: 18, alignItems: 'center', marginBottom: 12, elevation: 4 },
  startTxt: { fontSize: fs(20), fontWeight: '700', color: '#FFF' },
  adminRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  adminBtn: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
  adminTxt: { fontSize: fs(13), color: '#555' },
  footer: { fontSize: fs(11), color: '#AAA', textAlign: 'center', lineHeight: fs(17) },
});
