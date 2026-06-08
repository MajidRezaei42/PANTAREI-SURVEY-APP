// src/components/PanelSlider.js
// 1–7 slider for one panel in the side-by-side pages.
// Shows the Likert anchor label (e.g. "Slightly agree") live under the
// slider as soon as the user selects a value.

import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder, TouchableOpacity } from 'react-native';
import PanelIcon from './PanelIcon';
import { PANEL_COLORS } from '../utils/questions';
import { useLanguage } from '../i18n/LanguageContext';

const STEPS     = [1, 2, 3, 4, 5, 6, 7];
const DOT_R     = 8;
const DOT_D     = DOT_R * 2;
const TRACK_PAD = 16;

export default function PanelSlider({ panelId, panelName, value, onChange }) {
  const { t } = useLanguage();
  const color   = PANEL_COLORS[panelId] || '#2D5016';
  const [trackW, setTrackW] = useState(0);

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
      onPanResponderGrant: (e) => onChange(panelId, xToStep(e.nativeEvent.locationX)),
      onPanResponderMove:  (e) => onChange(panelId, xToStep(e.nativeEvent.locationX)),
    })
  ).current;

  const fillLeft  = trackW > 0 ? dotCX(1) : 0;
  const fillWidth = value && trackW > 0 ? dotCX(value) - dotCX(1) : 0;
  const scaleDesc = value ? t(`scale_${value}`) : null;

  return (
    <View style={styles.row}>
      <PanelIcon panelId={panelId} size={44} />
      <View style={styles.body}>

        {/* Label + value badge */}
        <View style={styles.labelRow}>
          <Text style={styles.name} numberOfLines={2}>{panelName}</Text>
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
            <View style={[styles.fillBar, {
              left: fillLeft, width: fillWidth, backgroundColor: color,
            }]} />
          )}
          {trackW > 0 && STEPS.map(n => {
            const active = value === n;
            return (
              <TouchableOpacity
                key={n}
                style={[styles.dotWrap, { left: dotCX(n) - DOT_R }]}
                onPress={() => onChange(panelId, n)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  row:       { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  body:      { flex: 1 },
  labelRow:  { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 },
  name:      { fontSize: 13, fontWeight: '600', color: '#1A1814', flex: 1, lineHeight: 18, marginRight: 8 },
  badge:     { minWidth: 28, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, flexShrink: 0 },
  badgeTxt:  { color: '#FFF', fontWeight: '800', fontSize: 13 },
  track:     { height: 40, justifyContent: 'center' },
  baseline:  { position: 'absolute', height: 2, backgroundColor: '#E0E0E0', top: 19 },
  fillBar:   { position: 'absolute', height: 3, top: 18.5, borderRadius: 2 },
  dotWrap:   { position: 'absolute', top: 19 - DOT_R, width: DOT_D, height: DOT_D, alignItems: 'center', justifyContent: 'center' },
  dot:       { width: DOT_D, height: DOT_D, borderRadius: DOT_R, borderWidth: 2, backgroundColor: '#FFF' },
  numRow:    { position: 'relative', height: 18, marginTop: 2 },
  num:       { position: 'absolute', fontSize: 11, color: '#AAA', width: 16, textAlign: 'center' },
  descRow:   { minHeight: 18, marginTop: 4 },
  scaleDesc: { fontSize: 12, fontWeight: '600', fontStyle: 'italic' },
  scaleDescEmpty: { fontSize: 11, color: '#CCCCCC', fontStyle: 'italic' },
});
