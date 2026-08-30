// src/components/ScaleDebug.js
// TEMPORARY diagnostic. Shows what the device actually reports so we can tell
// whether adaptive typography is running and what scale it picked.
// Remove this component (and its import) before the field deployment.

import React from 'react';
import { View, Text, StyleSheet, Dimensions, PixelRatio, Platform } from 'react-native';
import { SCALE, isTablet, fs } from '../utils/responsive';

export default function ScaleDebug() {
  const w = Dimensions.get('window');
  const s = Dimensions.get('screen');
  return (
    <View style={styles.box}>
      <Text style={styles.h}>SCALE DIAGNOSTIC</Text>
      <Text style={styles.l}>window dp: {Math.round(w.width)} x {Math.round(w.height)}</Text>
      <Text style={styles.l}>screen dp: {Math.round(s.width)} x {Math.round(s.height)}</Text>
      <Text style={styles.l}>shortest dp: {Math.round(Math.min(w.width, w.height))}</Text>
      <Text style={styles.l}>pixel ratio: {PixelRatio.get()}</Text>
      <Text style={styles.l}>real px: {Math.round(w.width * PixelRatio.get())} x {Math.round(w.height * PixelRatio.get())}</Text>
      <Text style={styles.l}>OS font scale: {PixelRatio.getFontScale()}</Text>
      <Text style={styles.l}>platform: {Platform.OS} {Platform.Version}</Text>
      <Text style={styles.hit}>SCALE = {SCALE.toFixed(3)}   isTablet = {String(isTablet)}</Text>
      <Text style={styles.hit}>13pt renders at {fs(13)}   22pt at {fs(22)}</Text>
      <Text style={styles.sample}>Sample text at fs(13)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: 12, padding: 12, borderRadius: 10,
    backgroundColor: '#1B1B1B', borderWidth: 2, borderColor: '#E8B500',
  },
  h:   { color: '#E8B500', fontWeight: '800', fontSize: 14, marginBottom: 6 },
  l:   { color: '#DDD', fontSize: 12, fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier' },
  hit: { color: '#7BE38B', fontSize: 13, fontWeight: '700', marginTop: 6 },
  sample: { color: '#FFF', fontSize: fs(13), marginTop: 8 },
});
