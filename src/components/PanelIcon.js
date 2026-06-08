// src/components/PanelIcon.js
// Shows the real panel photograph.
// Falls back to a coloured letter badge if the image is not yet loaded.

import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { PANEL_IMAGES, PANEL_COLORS } from '../utils/questions';

export default function PanelIcon({ panelId, size = 48 }) {
  const img   = PANEL_IMAGES[panelId];
  const color = PANEL_COLORS[panelId] || '#888';

  if (img) {
    return (
      <Image
        source={img}
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.15,
        }}
        resizeMode="cover"
      />
    );
  }

  // Fallback badge
  return (
    <View style={[styles.badge, {
      width: size, height: size,
      borderRadius: size * 0.18,
      backgroundColor: color,
    }]}>
      <Text style={[styles.letter, { fontSize: size * 0.42 }]}>{panelId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge:  { alignItems: 'center', justifyContent: 'center' },
  letter: { color: '#FFF', fontWeight: '800' },
});
