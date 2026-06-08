// src/components/ConceptSlider.js
// Full-width 1–7 slider for concept-level questions (SU1-3).
// Visually identical to PanelSlider — same geometry, same live anchor label.

import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder, TouchableOpacity } from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';

const STEPS     = [1, 2, 3, 4, 5, 6, 7];
const DOT_R     = 9;
const DOT_D     = DOT_R * 2;
const TRACK_PAD = 16;

export default function ConceptSlider({ code, questionText, value, onChange, color = '#1A3A6B', index = 0 }) {
  const { t } = useLanguage();
  const [trackW, setTrackW] = useState(0);
  const bg = index % 2 === 0 ? '#FFFFFF' : '#F4F7FB';

  const innerW = Math.max(0, trackW - TRACK_PAD * 2);
  const step   = innerW > 0 ? innerW / 6 : 0;
  const dotCX  = (n) => TRACK_PAD + (n - 1) * step;

  const xToStep = (x) => {
    if (step <= 0) return value || 1;
    return Math.round(Math.max(1, Math.min(7, (x - TRACK_PAD) / step + 1)));
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder:  () => true,
      onPanResponderGrant: (e) => onChange(code, xToStep(e.nativeEvent.locationX)),
      onPanResponderMove:  (e) => onChange(code, xToStep(e.nativeEvent.locationX)),
    })
  ).current;

  const fillLeft  = trackW > 0 ? dotCX(1) : 0;
  const fillWidth = value && trackW > 0 ? dotCX(value) - dotCX(1) : 0;
  const scaleDesc = value ? t(`scale_${value}`) : null;

  return (
    <View style={[styles.wrap, { backgroundColor: bg }]}>

      {/* Question row */}
      <View style={styles.questionRow}>
        <Text style={[styles.code, { color }]}>{code.toUpperCase()}</Text>
        <Text style={styles.question}>{questionText}</Text>
        <View style={[styles.badge, { backgroundColor: value ? color : '#DDD' }]}>
          <Text style={styles.badgeTxt}>{value ?? '–'}</Text>
        </View>
      </View>

      {/* Track */}
      <View
        style={styles.track}
        onLayout={e => setTrackW(e.nativeEvent.layout.width)}
        {...pan.panHandlers}
      >
        <View style={[styles.baseline, { left: fillLeft, right: TRACK_PAD }]} />
        {value != null && trackW > 0 && (
          <View style={[styles.fillBar, { left: fillLeft, width: fillWidth, backgroundColor: color }]} />
        )}
        {trackW > 0 && STEPS.map(n => {
          const active = value === n;
          return (
            <TouchableOpacity
              key={n}
              style={[styles.dotWrap, { left: dotCX(n) - DOT_R }]}
              onPress={() => onChange(code, n)}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            >
              <View style={[
                styles.dot, { borderColor: color },
                active && { backgroundColor: color, transform: [{ scale: 1.35 }] },
              ]} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Number labels */}
      <View style={styles.numRow}>
        {trackW > 0 && STEPS.map(n => (
          <Text key={n} style={[
            styles.num,
            { left: dotCX(n) - 8 },
            value === n && { color, fontWeight: '800' },
          ]}>
            {n}
          </Text>
        ))}
      </View>

      {/* Live anchor description */}
      <View style={styles.descRow}>
        {scaleDesc ? (
          <Text style={[styles.scaleDesc, { color }]}>
            {value} — {scaleDesc}
          </Text>
        ) : (
          <Text style={styles.scaleDescEmpty}>tap or drag to rate</Text>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrap:         { paddingVertical: 14, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
  questionRow:  { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 8 },
  code:         { fontSize: 11, fontWeight: '800', letterSpacing: 0.5, marginTop: 2, minWidth: 32 },
  question:     { flex: 1, fontSize: 14, color: '#1A1814', lineHeight: 20 },
  badge:        { minWidth: 28, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, flexShrink: 0 },
  badgeTxt:     { color: '#FFF', fontWeight: '800', fontSize: 13 },
  track:        { height: 40, justifyContent: 'center' },
  baseline:     { position: 'absolute', height: 2, backgroundColor: '#E0E0E0', top: 19 },
  fillBar:      { position: 'absolute', height: 3, top: 18.5, borderRadius: 2 },
  dotWrap:      { position: 'absolute', top: 19 - DOT_R, width: DOT_D, height: DOT_D, alignItems: 'center', justifyContent: 'center' },
  dot:          { width: DOT_D, height: DOT_D, borderRadius: DOT_R, borderWidth: 2, backgroundColor: '#FFF' },
  numRow:       { position: 'relative', height: 18, marginTop: 2 },
  num:          { position: 'absolute', fontSize: 11, color: '#AAA', width: 16, textAlign: 'center' },
  descRow:      { minHeight: 18, marginTop: 5 },
  scaleDesc:    { fontSize: 12, fontWeight: '600', fontStyle: 'italic' },
  scaleDescEmpty: { fontSize: 11, color: '#CCCCCC', fontStyle: 'italic' },
});
