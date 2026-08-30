// src/components/LikertScale.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fs } from '../utils/responsive';

export default function LikertScale({
  code, text, leftAnchor, rightAnchor,
  value, onChange, color = '#2D5016', index = 0,
}) {
  const bg = index % 2 === 0 ? '#FFFFFF' : '#F7F9F5';
  return (
    <View style={[styles.row, { backgroundColor: bg }]}>
      <View style={styles.qCol}>
        <Text style={[styles.code, { color }]}>{code.toUpperCase()}</Text>
        <Text style={styles.qText}>{text}</Text>
        <Text style={styles.anchor}>◄ {leftAnchor}</Text>
      </View>
      <View style={styles.scaleCol}>
        <View style={styles.circles}>
          {[1,2,3,4,5,6,7].map(n => (
            <TouchableOpacity
              key={n}
              style={[styles.circle, { borderColor: color },
                      value === n && { backgroundColor: color }]}
              onPress={() => onChange(code, n)}
              activeOpacity={0.7}
            >
              <Text style={[styles.num, value === n && { color: '#FFF' }]}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[styles.anchorR, { color: color + '99' }]}>{rightAnchor} ►</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 12,
    borderBottomWidth: 1, borderBottomColor: '#E0E0E0', alignItems: 'center',
  },
  qCol:  { flex: 1, paddingRight: 8 },
  code:  { fontSize: fs(10), fontWeight: '700', letterSpacing: 0.5, marginBottom: 2 },
  qText: { fontSize: fs(13), color: '#1A1814', lineHeight: fs(18), marginBottom: 3 },
  anchor:{ fontSize: fs(11), color: '#888', fontStyle: 'italic' },
  scaleCol: { alignItems: 'flex-end' },
  circles:  { flexDirection: 'row', gap: 4, marginBottom: 3 },
  circle: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF',
  },
  num:    { fontSize: fs(12), fontWeight: '600', color: '#444' },
  anchorR:{ fontSize: fs(11), fontStyle: 'italic', textAlign: 'right' },
});
