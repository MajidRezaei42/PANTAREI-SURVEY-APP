// src/screens/ConsentScreen.js
// No panel selection now — every participant evaluates all 5 panels.
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { createResponse, generateParticipantId } from '../db/database';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function ConsentScreen({ navigation }) {
  const { lang, t } = useLanguage();
  const [cResearch, setCR] = useState(false);
  const [cRecording, setCC] = useState(false);
  const [cAge, setCA] = useState(false);
  const [loading, setLoading] = useState(false);

  const canGo = cResearch && cAge;

  const proceed = async () => {
    if (!canGo) {
      Alert.alert(t('requiredMissing'), t('requiredMissingMsg'));
      return;
    }
    setLoading(true);
    try {
      const pid = generateParticipantId();
      const rid = await createResponse(pid, lang, {
        research: cResearch, recording: cRecording, age: cAge,
      });
      navigation.navigate('Survey', {
        responseId: rid, participantId: pid, consentRecording: cRecording,
      });
    } catch (e) {
      Alert.alert('Error', 'Could not start survey. Please try again.');
    } finally { setLoading(false); }
  };

  const Check = ({ checked, onToggle, label, req }) => (
    <TouchableOpacity style={styles.checkRow} onPress={onToggle} activeOpacity={0.7}>
      <View style={[styles.box, checked && styles.boxOn]}>
        {checked && <Text style={styles.tick}>✓</Text>}
      </View>
      <Text style={styles.checkLabel}>{label}{req ? <Text style={styles.req}> *</Text> : null}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.body}>
      <View style={styles.topBar}>
        <Text style={styles.sectionTitle}>{t('consentTitle')}</Text>
        <LanguageSwitcher />
      </View>

      <View style={styles.gdprBox}>
        <Text style={styles.gdprText}>{t('gdprText')}</Text>
      </View>

      <View style={styles.card}>
        <Check checked={cResearch} onToggle={() => setCR(v => !v)} label={t('consentResearch')} req />
        <View style={styles.div} />
        <Check checked={cRecording} onToggle={() => setCC(v => !v)} label={t('consentRecording')} />
        <View style={styles.div} />
        <Check checked={cAge} onToggle={() => setCA(v => !v)} label={t('consentAge')} req />
      </View>
      <Text style={styles.reqNote}>{t('requiredToParticipate')}</Text>

      <TouchableOpacity style={[styles.goBtn, !canGo && styles.goBtnOff]}
        onPress={proceed} disabled={!canGo || loading} activeOpacity={0.85}>
        <Text style={styles.goTxt}>{loading ? t('starting') : t('beginSurvey')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backTxt}>{t('back')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F8F2' },
  body: { padding: 16, paddingBottom: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1A1814', flex: 1 },
  gdprBox: { backgroundColor: '#FDF6E3', borderRadius: 10, padding: 14, borderLeftWidth: 4, borderLeftColor: '#7A5C10', marginBottom: 14 },
  gdprText: { fontSize: 12, color: '#555', lineHeight: 18 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 14, elevation: 2 },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10, gap: 12 },
  box: { width: 24, height: 24, borderRadius: 4, borderWidth: 2, borderColor: '#2D5016', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  boxOn: { backgroundColor: '#2D5016' },
  tick: { color: '#FFF', fontWeight: '900', fontSize: 14 },
  checkLabel: { flex: 1, fontSize: 13, color: '#333', lineHeight: 19 },
  req: { color: '#CC2020', fontWeight: '700' },
  div: { height: 1, backgroundColor: '#EEE', marginHorizontal: -4 },
  reqNote: { fontSize: 11, color: '#999', marginTop: 6, marginBottom: 14 },
  goBtn: { backgroundColor: '#2D5016', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 12, elevation: 3 },
  goBtnOff: { backgroundColor: '#AAA' },
  goTxt: { fontSize: 17, fontWeight: '700', color: '#FFF' },
  back: { alignItems: 'center', paddingVertical: 8 },
  backTxt: { fontSize: 14, color: '#888' },
});
