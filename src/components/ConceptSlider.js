// src/components/ConceptSlider.js
// 1–7 rating for concept-level questions (SU1-3).
// Same reliable 7-button approach as PanelSlider — no PanResponder.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';
import { fs } from '../utils/responsive';

const STEPS = [1, 2, 3, 4, 5, 6, 7];

export default function ConceptSlider({ code, questionText, value, onChange, color = '#1A3A6B', index = 0 }) {
  const { t } = useLanguage();
  const bg   = index % 2 === 0 ? '#FFFFFF' : '#F4F7FB';
  const desc = value ? t(`scale_${value}`) : null;

  return (
    <View style={[styles.wrap, { backgroundColor: bg }]}>
      {/* Question */}
      <View style={styles.qRow}>
        <Text style={[styles.code, { color }]}>{code.toUpperCase()}</Text>
        <Text style={styles.qText}>{questionText}</Text>
        <View style={[styles.badge, { backgroundColor: value ? color : '#CCC' }]}>
          <Text style={styles.badgeTxt}>{value ?? '–'}</Text>
        </View>
      </View>

      {/* 7 buttons */}
      <View style={styles.btnRow}>
        {STEPS.map(n => {
          const active = value === n;
          return (
            <TouchableOpacity
              key={n}
              style={[
                styles.btn,
                { borderColor: color },
                active && { backgroundColor: color },
              ]}
              onPress={() => onChange(code, n)}
              activeOpacity={0.65}
            >
              <Text style={[styles.btnTxt, active && styles.btnTxtActive]}>
                {n}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Anchors */}
      <View style={styles.anchors}>
        <Text style={styles.anchorL}>◄ {t('scale_1')}</Text>
        <Text style={styles.anchorR}>{t('scale_7')} ►</Text>
      </View>

      {/* Live description */}
      {desc ? (
        <Text style={[styles.desc, { color }]}>{value} — {desc}</Text>
      ) : (
        <Text style={styles.descEmpty}>tap a number to rate</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:     { paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
  qRow:     { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 8 },
  code:     { fontSize: fs(11), fontWeight: '800', letterSpacing: 0.5, marginTop: 2, minWidth: 32 },
  qText:    { flex: 1, fontSize: fs(14), color: '#1A1814', lineHeight: fs(20) },
  badge:    { minWidth: 28, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, flexShrink: 0 },
  badgeTxt: { color: '#FFF', fontWeight: '800', fontSize: fs(13) },

  btnRow: { flexDirection: 'row', gap: 4 },
  btn: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  btnTxt:       { fontSize: fs(14), fontWeight: '600', color: '#555' },
  btnTxtActive: { color: '#FFF', fontWeight: '800' },

  anchors:  { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  anchorL:  { fontSize: fs(10), color: '#AAA', fontStyle: 'italic' },
  anchorR:  { fontSize: fs(10), color: '#AAA', fontStyle: 'italic' },

  desc:      { fontSize: fs(12), fontWeight: '600', fontStyle: 'italic', marginTop: 3 },
  descEmpty: { fontSize: fs(11), color: '#CCCCCC', fontStyle: 'italic', marginTop: 3 },
});
