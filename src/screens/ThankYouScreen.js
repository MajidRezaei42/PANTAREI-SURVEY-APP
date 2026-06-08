// src/screens/ThankYouScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';

export default function ThankYouScreen({ route, navigation }) {
  const { participantId } = route.params || {};
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState(8);

  // Timer only decrements the number — no navigation inside setState.
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Navigation fires AFTER render, in its own effect, when countdown hits 0.
  useEffect(() => {
    if (countdown === 0) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  }, [countdown, navigation]);

  return (
    <View style={styles.root}>
      <Text style={styles.icon}>✅</Text>
      <Text style={styles.title}>{t('thankYou')}</Text>
      <Text style={styles.sub}>{t('thankYouSub')}</Text>

      <View style={styles.pidBox}>
        <Text style={styles.pidLabel}>{t('yourId')}</Text>
        <Text style={styles.pidValue}>{participantId}</Text>
        <Text style={styles.pidNote}>{t('keepId')}</Text>
      </View>

      <Text style={styles.countdown}>{t('returningHome')} {countdown}s…</Text>

      <TouchableOpacity style={styles.homeBtn}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
        activeOpacity={0.8}>
        <Text style={styles.homeTxt}>{t('returnNow')}</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        PANTAREI — EIC Pathfinder Challenges 2023{'\n'}
        HORIZON-EIC-2023-PATHFINDERCHALLENGES-01
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, backgroundColor: '#2D5016' },
  icon: { fontSize: 70, marginBottom: 10 },
  title: { fontSize: 40, fontWeight: '800', color: '#FFF', marginBottom: 10 },
  sub: { fontSize: 16, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  pidBox: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, padding: 20, alignItems: 'center', width: '100%', marginBottom: 24 },
  pidLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 1, marginBottom: 6, fontWeight: '600' },
  pidValue: { fontSize: 20, fontWeight: '800', color: '#FFF', letterSpacing: 1, fontFamily: 'monospace', marginBottom: 10 },
  pidNote: { fontSize: 12, color: 'rgba(255,255,255,0.65)', textAlign: 'center', lineHeight: 17 },
  countdown: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 },
  homeBtn: { backgroundColor: '#FFF', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32, marginBottom: 24 },
  homeTxt: { fontSize: 15, fontWeight: '700', color: '#2D5016' },
  footer: { fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 16 },
});
