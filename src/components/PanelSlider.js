// src/components/PanelSlider.js
// 1–7 rating for one panel. Seven equal tappable buttons — no PanResponder,
// no layout measurement, works reliably on every screen size and device.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PanelIcon from './PanelIcon';
import { PANEL_COLORS } from '../utils/questions';
import { useLanguage } from '../i18n/LanguageContext';
import { fs } from '../utils/responsive';

const STEPS = [1, 2, 3, 4, 5, 6, 7];

export default function PanelSlider({ panelId, panelName, value, onChange }) {
  const { t }  = useLanguage();
  const color  = PANEL_COLORS[panelId] || '#2D5016';
  const desc   = value ? t(`scale_${value}`) : null;

  return (
    <View style={styles.row}>
      {/* Panel photo / icon */}
      <PanelIcon panelId={panelId} size={48} />

      <View style={styles.body}>
        {/* Panel name + value badge */}
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={2}>{panelName}</Text>
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
                onPress={() => onChange(panelId, n)}
                activeOpacity={0.65}
              >
                <Text style={[styles.btnTxt, active && styles.btnTxtActive]}>
                  {n}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Anchor labels row */}
        <View style={styles.anchors}>
          <Text style={styles.anchorL}>◄ {t('scale_1')}</Text>
          <Text style={styles.anchorR}>{t('scale_7')} ►</Text>
        </View>

        {/* Live description */}
        {desc ? (
          <Text style={[styles.desc, { color }]}>
            {value} — {desc}
          </Text>
        ) : (
          <Text style={styles.descEmpty}>tap a number to rate</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  body:     { flex: 1 },
  topRow:   { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 },
  name:     { fontSize: fs(13), fontWeight: '600', color: '#1A1814', flex: 1, lineHeight: fs(18), marginRight: 6 },
  badge:    { minWidth: 28, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, flexShrink: 0 },
  badgeTxt: { color: '#FFF', fontWeight: '800', fontSize: fs(13) },

  btnRow: { flexDirection: 'row', gap: 4 },
  btn: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  btnTxt:      { fontSize: fs(14), fontWeight: '600', color: '#555' },
  btnTxtActive: { color: '#FFF', fontWeight: '800' },

  anchors:  { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  anchorL:  { fontSize: fs(10), color: '#AAA', fontStyle: 'italic' },
  anchorR:  { fontSize: fs(10), color: '#AAA', fontStyle: 'italic' },

  desc:      { fontSize: fs(12), fontWeight: '600', fontStyle: 'italic', marginTop: 3 },
  descEmpty: { fontSize: fs(11), color: '#CCCCCC', fontStyle: 'italic', marginTop: 3 },
});
