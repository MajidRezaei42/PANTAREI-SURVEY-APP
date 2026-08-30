// src/screens/SurveyScreen.js
// Multi-page side-by-side survey flow (V3.3).
//
// Page order:
//   0            Demographics (with defaults pre-selected)
//   1            Sustainability (concept-level, 3 single ratings)
//   2..6         Sensory SE1..SE5  — one question per page, all 5 panels (sliders)
//   7..8         Overall  OV1..OV2 — one question per page, all 5 panels (sliders)
//   9            Drag-and-drop ranking
//   10           Open question (placeholder text + voice w/ language)
//
// Auto-saves after each change. Language switch available in the header.

import React, { useState, useRef, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  TextInput, Alert, Platform, KeyboardAvoidingView,
} from 'react-native';
import LikertScale   from '../components/LikertScale';
import ConceptSlider from '../components/ConceptSlider';
import PanelSlider   from '../components/PanelSlider';
import DragRanking   from '../components/DragRanking';
import VoiceRecorder from '../components/VoiceRecorder';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { updateResponse } from '../db/database';
import { useLanguage } from '../i18n/LanguageContext';
import {
  PANELS, PANEL_COLORS, BACKGROUNDS, AGE_GROUPS, GENDERS, FIRST_TIME,
  SUSTAIN_QUESTIONS, SENSORY_QUESTIONS, OVERALL_QUESTIONS,
  SUSTAIN_CODES, SIDE_BY_SIDE_CODES, perPanelCode,
} from '../utils/questions';
import { fs } from '../utils/responsive';

const GREEN = '#2D5016';

export default function SurveyScreen({ route, navigation }) {
  const { responseId, participantId } = route.params;
  // Recording consent can be granted mid-survey: participants often forget the
  // optional tick-box and only say "yes, record me" once they reach the question.
  const [recConsent, setRecConsent] = useState(!!route.params.consentRecording);
  const { t } = useLanguage();
  const startTime = useRef(Date.now());

  // ----- defaults pre-selected (requirement #4) -----
  const defBg  = BACKGROUNDS.find(b => b.default)?.value || null;
  const defG   = GENDERS.find(g => g.default)?.value || null;
  const defFt  = FIRST_TIME.find(f => f.default)?.value || null;

  const [page, setPage] = useState(0);

  const [background, setBackground] = useState(defBg);
  const [ageGroup, setAgeGroup] = useState(null);
  const [gender, setGender] = useState(defG);
  const [firstTime, setFirstTime] = useState(defFt);

  // Sustainability: concept-level ratings { su1: n, ... }
  const [sustain, setSustain] = useState(
    Object.fromEntries(SUSTAIN_CODES.map(c => [c, null]))
  );

  // Side-by-side per-panel ratings { se1_A: n, ... }
  const [ratings, setRatings] = useState(
    Object.fromEntries(SIDE_BY_SIDE_CODES.map(c => [c, null]))
  );

  // Ranking: array of panel objects (initial order A..E)
  const [order, setOrder] = useState([...PANELS]);

  // Open question
  const [openComment, setOpenComment] = useState('');
  const [audioLang, setAudioLang] = useState(null);
  const [recOpen, setRecOpen] = useState(null);

  // Save defaults immediately on mount so partial records still have them
  const didInit = useRef(false);
  if (!didInit.current) {
    didInit.current = true;
    updateResponse(responseId, {
      background: defBg, gender: defG, first_time: defFt,
    }).catch(() => {});
  }

  const save = fields => updateResponse(responseId, fields).catch(console.warn);

  // Participant consents at the recorder itself. Stored with a timestamp so the
  // record shows consent was given later in the session, not at the start.
  const grantRecordingConsent = () => {
    setRecConsent(true);
    save({ consent_recording: 1, consent_recording_at: new Date().toISOString() });
  };

  // ----- page model -----
  const pages = useMemo(() => {
    const list = [
      { type: 'demographics', label: t('stepDemographics') },
      { type: 'sustain', label: t('stepSustain') },
    ];
    SENSORY_QUESTIONS.forEach(q => list.push({ type: 'sidebyside', q, group: 'sensory', label: t('stepSensory') }));
    OVERALL_QUESTIONS.forEach(q => list.push({ type: 'sidebyside', q, group: 'overall', label: t('stepOverall') }));
    list.push({ type: 'ranking', label: t('stepRanking') });
    list.push({ type: 'open', label: t('stepOpen') });
    return list;
  }, [t]);

  const totalPages = pages.length;
  const current = pages[page];
  const progress = Math.round(((page + 1) / totalPages) * 100);

  // ----- handlers -----
  const handleSustain = (code, value) => {
    setSustain(prev => ({ ...prev, [code]: value }));
    save({ [code]: value });
  };

  const handleSlider = (qCode, panelId, value) => {
    const col = perPanelCode(qCode, panelId);
    setRatings(prev => ({ ...prev, [col]: value }));
    save({ [col]: value });
  };

  const handleReorder = (newOrder) => {
    setOrder(newOrder);
    save({ ranking: newOrder.map(p => p.id).join(',') });
  };

  // ----- per-page completion checks -----
  const canAdvance = () => {
    if (current.type === 'demographics') {
      return background && ageGroup && firstTime;
    }
    if (current.type === 'sustain') {
      return SUSTAIN_CODES.every(c => sustain[c] !== null);
    }
    if (current.type === 'sidebyside') {
      return PANELS.every(p => ratings[perPanelCode(current.q.code, p.id)] !== null);
    }
    return true; // ranking + open always advanceable
  };

  const goNext = () => {
    if (!canAdvance()) {
      if (current.type === 'demographics') Alert.alert(t('missingInfo'), t('missingDemo'));
      else Alert.alert(t('incomplete'), t('incompleteMsg'));
      return;
    }
    if (page < totalPages - 1) setPage(page + 1);
  };

  const goPrev = () => { if (page > 0) setPage(page - 1); };

  const submit = async () => {
    // Persist ranking even if user never dragged (initial order)
    const dur = Math.round((Date.now() - startTime.current) / 1000);
    try {
      await updateResponse(responseId, {
        background, age_group: ageGroup, gender, first_time: firstTime,
        ...sustain, ...ratings,
        ranking: order.map(p => p.id).join(','),
        open_comment: openComment,
        consent_recording: recConsent ? 1 : 0,
        audio_language: audioLang,
        recording_open: recOpen,
        completed: 1, duration_seconds: dur,
      });
      navigation.navigate('ThankYou', { participantId });
    } catch (e) {
      Alert.alert('Submit error', 'Could not save. Please try again.');
    }
  };

  // ----- small inline chip selector -----
  const Chips = ({ options, selected, onSelect }) => (
    <View style={styles.chips}>
      {options.map(o => {
        const value = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : t(o.key);
        const active = selected === value;
        return (
          <TouchableOpacity key={value}
            style={[styles.chip, active && { backgroundColor: '#7A5C10', borderColor: '#7A5C10' }]}
            onPress={() => onSelect(value)} activeOpacity={0.7}>
            <Text style={[styles.chipTxt, active && { color: '#FFF', fontWeight: '600' }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  // ----- render the active page body -----
  const renderPage = () => {
    if (current.type === 'demographics') {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('aboutYou')}</Text>

          <Text style={styles.fieldLabel}>{t('background')} <Text style={styles.req}>*</Text></Text>
          <Chips options={BACKGROUNDS} selected={background}
            onSelect={v => { setBackground(v); save({ background: v }); }} />

          <Text style={styles.fieldLabel}>{t('ageGroup')} <Text style={styles.req}>*</Text></Text>
          <Chips options={AGE_GROUPS} selected={ageGroup}
            onSelect={v => { setAgeGroup(v); save({ age_group: v }); }} />

          <Text style={styles.fieldLabel}>{t('gender')} <Text style={styles.optional}>{t('optional')}</Text></Text>
          <Chips options={GENDERS} selected={gender}
            onSelect={v => { setGender(v); save({ gender: v }); }} />

          <Text style={styles.fieldLabel}>{t('firstTimeQ')} <Text style={styles.req}>*</Text></Text>
          <Chips options={FIRST_TIME} selected={firstTime}
            onSelect={v => { setFirstTime(v); save({ first_time: v }); }} />
        </View>
      );
    }

    if (current.type === 'sustain') {
      return (
        <View style={styles.card}>
          <View style={[styles.colorBar, { backgroundColor: '#1A3A6B' }]} />
          <Text style={[styles.cardTitle, { color: '#1A3A6B' }]}>{t('sustainabilityTrust')}</Text>
          <Text style={styles.scaleHint}>{t('scaleHint')}</Text>
          <View style={styles.likertBlock}>
            {SUSTAIN_QUESTIONS.map((q, i) => (
              <ConceptSlider key={q.code}
                code={q.code}
                questionText={t(q.key)}
                value={sustain[q.code]}
                onChange={(code, v) => handleSustain(code, v)}
                color="#1A3A6B" index={i} />
            ))}
          </View>
        </View>
      );
    }

    if (current.type === 'sidebyside') {
      const groupColor = current.group === 'sensory' ? GREEN : '#7A5C10';
      const groupTitle = current.group === 'sensory' ? t('sensoryAppeal') : t('overallExperience');
      return (
        <View style={styles.card}>
          <View style={[styles.colorBar, { backgroundColor: groupColor }]} />
          <Text style={[styles.sbsGroup, { color: groupColor }]}>{groupTitle}</Text>
          <Text style={styles.sbsQuestion}>
            <Text style={[styles.sbsCode, { color: groupColor }]}>{current.q.code.toUpperCase()}  </Text>
            {t(current.q.key)}
          </Text>
          <Text style={styles.scaleHint}>{t('rateAllPanels')} · {t('scaleHint')}</Text>

          <View style={styles.sliders}>
            {PANELS.map(p => (
              <PanelSlider key={p.id}
                panelId={p.id}
                panelName={`${p.label} — ${t(p.descKey)}`}
                value={ratings[perPanelCode(current.q.code, p.id)]}
                onChange={(panelId, v) => handleSlider(current.q.code, panelId, v)} />
            ))}
          </View>
        </View>
      );
    }

    if (current.type === 'ranking') {
      return (
        <View style={styles.card}>
          <View style={[styles.colorBar, { backgroundColor: GREEN }]} />
          <Text style={[styles.cardTitle, { color: GREEN }]}>{t('overallRanking')}</Text>
          <Text style={styles.sbsQuestion}>{t('rankingInstruction')}</Text>
          <DragRanking order={order} onReorder={handleReorder} t={t} />
        </View>
      );
    }

    if (current.type === 'open') {
      return (
        <View style={styles.card}>
          <View style={[styles.colorBar, { backgroundColor: '#7A5C10' }]} />
          <Text style={[styles.cardTitle, { color: '#7A5C10' }]}>{t('openTitle')}</Text>
          <Text style={styles.openLabel}>{t('openQuestion')}</Text>
          <TextInput style={styles.input}
            placeholder={t('openPlaceholder')}
            placeholderTextColor="#BBB"
            value={openComment}
            onChangeText={tx => { setOpenComment(tx); save({ open_comment: tx }); }}
            multiline maxLength={1500} />
          <VoiceRecorder
            participantId={participantId}
            questionCode="open"
            onRecordingComplete={u => { setRecOpen(u); save({ recording_open: u }); }}
            onLanguageChange={l => { setAudioLang(l); save({ audio_language: l }); }}
            audioLanguage={audioLang}
            existingUri={recOpen}
            color="#7A5C10"
            disabled={!recConsent}
            onGrantConsent={grantRecordingConsent}
            t={t} />
        </View>
      );
    }
    return null;
  };

  const isLast = page === totalPages - 1;

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>PANTAREI</Text>
          <LanguageSwitcher light />
        </View>
        <Text style={styles.stepLabel}>{current.label} · {page + 1}/{totalPages}</Text>
        <View style={styles.track}><View style={[styles.fill, { width: `${progress}%` }]} /></View>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        {renderPage()}

        <View style={styles.navRow}>
          {page > 0 ? (
            <TouchableOpacity style={styles.prevBtn} onPress={goPrev} activeOpacity={0.8}>
              <Text style={styles.prevTxt}>{t('previous')}</Text>
            </TouchableOpacity>
          ) : <View style={{ flex: 1 }} />}

          {isLast ? (
            <TouchableOpacity style={styles.submitBtn} onPress={submit} activeOpacity={0.85}>
              <Text style={styles.submitTxt}>{t('submitSurvey')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.nextBtn} onPress={goNext} activeOpacity={0.85}>
              <Text style={styles.nextTxt}>{t('next')}</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.discard}
          onPress={() => Alert.alert(t('discardConfirm'), t('discardMsg'), [
            { text: t('cancel'), style: 'cancel' },
            { text: t('discardConfirm'), style: 'destructive', onPress: () => navigation.navigate('Home') },
          ])}>
          <Text style={styles.discardTxt}>{t('discard')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F5F8F2' },
  header: { paddingTop: 48, paddingBottom: 12, paddingHorizontal: 16, backgroundColor: GREEN },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  headerTitle: { fontSize: fs(18), fontWeight: '800', color: '#FFF', letterSpacing: 1 },
  stepLabel: { fontSize: fs(12), color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  track: { height: 5, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#FFF', borderRadius: 3 },
  body: { padding: 12, paddingBottom: 40 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 12, elevation: 2, overflow: 'hidden' },
  colorBar: { height: 4, marginHorizontal: -14, marginTop: -14, marginBottom: 12 },
  cardTitle: { fontSize: fs(16), fontWeight: '700', color: '#1A1814', marginBottom: 8 },
  scaleHint: { fontSize: fs(12), color: '#999', fontStyle: 'italic', marginBottom: 10 },
  likertBlock: { borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#E8E8E8' },
  fieldLabel: { fontSize: fs(13), fontWeight: '600', color: '#444', marginTop: 14, marginBottom: 8 },
  req: { color: '#CC2020' },
  optional: { color: '#AAA', fontWeight: '400', fontSize: fs(12) },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { borderWidth: 1.5, borderColor: '#CCC', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#FAFAFA' },
  chipTxt: { fontSize: fs(13), color: '#444' },
  sbsGroup: { fontSize: fs(13), fontWeight: '700', letterSpacing: 0.5, marginBottom: 6, textTransform: 'uppercase' },
  sbsQuestion: { fontSize: fs(16), color: '#1A1814', lineHeight: fs(22), marginBottom: 8, fontWeight: '500' },
  sbsCode: { fontWeight: '800' },
  sliders: { marginTop: 4 },
  openLabel: { fontSize: fs(15), color: '#333', lineHeight: fs(21), marginBottom: 10, fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: fs(14), color: '#333', backgroundColor: '#FAFAFA', minHeight: 130, textAlignVertical: 'top', lineHeight: fs(20) },
  navRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  prevBtn: { flex: 1, borderWidth: 1.5, borderColor: '#BBB', borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  prevTxt: { fontSize: fs(15), fontWeight: '700', color: '#666' },
  nextBtn: { flex: 2, backgroundColor: GREEN, borderRadius: 14, paddingVertical: 15, alignItems: 'center', elevation: 3 },
  nextTxt: { fontSize: fs(16), fontWeight: '700', color: '#FFF' },
  submitBtn: { flex: 2, backgroundColor: '#2D5016', borderRadius: 14, paddingVertical: 15, alignItems: 'center', elevation: 3 },
  submitTxt: { fontSize: fs(16), fontWeight: '700', color: '#FFF' },
  discard: { alignItems: 'center', paddingVertical: 12 },
  discardTxt: { fontSize: fs(13), color: '#CC2020', textDecorationLine: 'underline' },
});
