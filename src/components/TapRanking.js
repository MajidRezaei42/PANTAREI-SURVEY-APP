// src/components/TapRanking.js
// ZERO-DEPENDENCY FALLBACK — use this instead of DragRanking if the
// npm install fails. Swap it in SurveyScreen.js by changing:
//   import DragRanking from '../components/DragRanking';
// to:
//   import DragRanking from '../components/TapRanking';
//
// UX: tap ▲ / ▼ to move a panel up or down one slot.
// Each tap springs the two swapped items smoothly past each other.

import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import PanelIcon from './PanelIcon';
import { PANEL_COLORS } from '../utils/questions';
import { fs, dp } from '../utils/responsive';

const ROW_H = 68;
const GAP   = 8;
const SLOT  = ROW_H + GAP;

export default function TapRanking({ order, onReorder, t }) {
  // One Animated.Value per row index for vertical offset.
  const anims = useRef(order.map(() => new Animated.Value(0))).current;

  const swap = (i, j) => {
    if (i < 0 || j >= order.length) return;

    // Spring: row i moves one slot toward j, row j moves one slot toward i.
    const dir = j > i ? 1 : -1;
    Animated.parallel([
      Animated.spring(anims[i], {
        toValue: dir * SLOT,
        useNativeDriver: true,
        friction: 7, tension: 200,
      }),
      Animated.spring(anims[j], {
        toValue: -dir * SLOT,
        useNativeDriver: true,
        friction: 7, tension: 200,
      }),
    ]).start(() => {
      // Reset values before re-rendering so there's no jump.
      anims[i].setValue(0);
      anims[j].setValue(0);
      const next = [...order];
      [next[i], next[j]] = [next[j], next[i]];
      onReorder(next);
    });
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.endRow}>
        <Text style={[styles.endTxt, { color: '#2D5016' }]}>{t('rankBest')}</Text>
      </View>

      {order.map((panel, index) => {
        const color = PANEL_COLORS[panel.id];
        const isFirst = index === 0;
        const isLast  = index === order.length - 1;
        return (
          <Animated.View
            key={panel.id}
            style={[styles.row, { borderLeftColor: color, transform: [{ translateY: anims[index] }] }]}
          >
            <View style={[styles.rank, { backgroundColor: color }]}>
              <Text style={styles.rankTxt}>{index + 1}</Text>
            </View>

            <PanelIcon panelId={panel.id} size={42} />

            <View style={styles.info}>
              <Text style={styles.name}>{panel.label}</Text>
              <Text style={styles.desc} numberOfLines={1}>{t(panel.descKey)}</Text>
            </View>

            {/* Up / Down controls */}
            <View style={styles.controls}>
              <TouchableOpacity
                style={[styles.arrow, isFirst && styles.arrowDisabled]}
                onPress={() => !isFirst && swap(index, index - 1)}
                disabled={isFirst}
                activeOpacity={0.6}
                hitSlop={{ top: 6, bottom: 3, left: 8, right: 8 }}
              >
                <Text style={[styles.arrowTxt, { color: isFirst ? '#DDD' : color }]}>▲</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.arrow, isLast && styles.arrowDisabled]}
                onPress={() => !isLast && swap(index, index + 1)}
                disabled={isLast}
                activeOpacity={0.6}
                hitSlop={{ top: 3, bottom: 6, left: 8, right: 8 }}
              >
                <Text style={[styles.arrowTxt, { color: isLast ? '#DDD' : color }]}>▼</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      })}

      <View style={[styles.endRow, { marginTop: 4 }]}>
        <Text style={[styles.endTxt, { color: '#AAA' }]}>{t('rankWorst')}</Text>
      </View>
      <Text style={styles.hint}>Tap ▲ / ▼ to change the order</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:    { marginTop: 4 },
  endRow:  { alignItems: 'center', paddingVertical: 4 },
  endTxt:  { fontSize: fs(12), fontWeight: '700', letterSpacing: 0.5 },
  row: {
    height: ROW_H, marginBottom: GAP,
    backgroundColor: '#FFF', borderRadius: 12, borderLeftWidth: 5,
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 12,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3,
  },
  rank:     { width: dp(28), height: dp(28), borderRadius: dp(14), alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  rankTxt:  { color: '#FFF', fontWeight: '800', fontSize: fs(14) },
  info:     { flex: 1 },
  name:     { fontSize: fs(14), fontWeight: '700', color: '#1A1814' },
  desc:     { fontSize: fs(11), color: '#888', marginTop: 1 },
  controls: { flexDirection: 'column', alignItems: 'center', gap: 2 },
  arrow:    { padding: 4 },
  arrowDisabled: { opacity: 0.3 },
  arrowTxt: { fontSize: fs(16), fontWeight: '700' },
  hint:     { fontSize: fs(12), color: '#AAA', fontStyle: 'italic', textAlign: 'center', marginTop: 6 },
});
