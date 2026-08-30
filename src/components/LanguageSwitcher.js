// src/components/LanguageSwitcher.js
// Compact EN/DE/FR/IT toggle. Placed in headers so the user can switch
// language at any moment during the survey (requirement #2).

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LANGUAGES } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import { fs } from '../utils/responsive';

export default function LanguageSwitcher({ light = false }) {
  const { lang, setLang } = useLanguage();
  return (
    <View style={styles.row}>
      {LANGUAGES.map(l => {
        const active = lang === l.code;
        return (
          <TouchableOpacity
            key={l.code}
            onPress={() => setLang(l.code)}
            activeOpacity={0.7}
            style={[
              styles.pill,
              light ? styles.pillLight : styles.pillDark,
              active && (light ? styles.activeLight : styles.activeDark),
            ]}
          >
            <Text style={[
              styles.txt,
              light ? styles.txtLight : styles.txtDark,
              active && (light ? styles.txtActiveLight : styles.txtActiveDark),
            ]}>
              {l.code}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 3, flexShrink: 1 },
  pill: { paddingHorizontal: 7, paddingVertical: 4, borderRadius: 12, borderWidth: 1 },
  pillLight: { borderColor: 'rgba(255,255,255,0.5)' },
  pillDark: { borderColor: '#CCC' },
  activeLight: { backgroundColor: '#FFF', borderColor: '#FFF' },
  activeDark: { backgroundColor: '#2D5016', borderColor: '#2D5016' },
  txt: { fontSize: fs(12), fontWeight: '700' },
  txtLight: { color: 'rgba(255,255,255,0.85)' },
  txtDark: { color: '#666' },
  // Active label must contrast with the active PILL, not with the header.
  // light  variant -> white pill  -> dark green text
  // dark   variant -> green pill  -> white text
  txtActiveLight: { color: '#2D5016' },
  txtActiveDark:  { color: '#FFFFFF' },
});
