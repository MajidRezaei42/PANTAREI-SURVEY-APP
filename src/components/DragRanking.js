// src/components/DragRanking.js
//
// Smooth drag-and-drop using PanGestureHandler from react-native-gesture-handler
// (already installed — no new dependencies).
//
// Key difference from all previous versions:
//   Animated.event({ nativeEvent: { translationY: dragY } }, { useNativeDriver: true })
//   pipes the gesture DIRECTLY to the native animation system. The JS thread is
//   NOT involved during finger movement — this is what makes it feel like Duolingo.
//
// Architecture:
//   • Fixed-height container (n × SLOT px). Every row is position:absolute at top = idx*SLOT.
//   • The dragged row gets a translateY from the native gesture value.
//   • Other rows get a translateY from spring animations that only trigger when the
//     "hover index" changes — not 60×/second.
//   • On release: spring the dragged row to its landing slot, then commit the JS reorder.

import React, { useRef, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, Animated,
} from 'react-native';
import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import PanelIcon from './PanelIcon';
import { PANEL_COLORS } from '../utils/questions';

const ROW_H  = 72;
const GAP    = 8;
const SLOT   = ROW_H + GAP;

// ─────────────────────────────────────────────────────────────────────────────
// Single draggable row
// ─────────────────────────────────────────────────────────────────────────────
const DragRow = React.memo(({ panel, index, color, isActive, shiftY, dragY,
                               onGestureEvent, onHandlerStateChange, t }) => {
  const translateY = isActive
    ? Animated.add(new Animated.Value(index * SLOT), dragY)
    : Animated.add(new Animated.Value(index * SLOT), shiftY);

  return (
    <PanGestureHandler
      onGestureEvent={isActive ? onGestureEvent : undefined}
      onHandlerStateChange={onHandlerStateChange}
      enabled={true}
    >
      <Animated.View
        style={[
          styles.row,
          {
            borderLeftColor: color,
            transform: [{ translateY }],
            zIndex: isActive ? 999 : index,
            elevation: isActive ? 16 : 2,
            shadowOpacity: isActive ? 0.4 : 0.1,
            shadowRadius: isActive ? 12 : 3,
            backgroundColor: isActive ? '#FDFFFE' : '#FFF',
          },
        ]}
      >
        <View style={[styles.rank, { backgroundColor: color }]}>
          <Text style={styles.rankTxt}>{index + 1}</Text>
        </View>
        <PanelIcon panelId={panel.id} size={42} />
        <View style={styles.info}>
          <Text style={styles.name}>{panel.label}</Text>
          <Text style={styles.desc} numberOfLines={1}>{t(panel.descKey)}</Text>
        </View>
        <View style={styles.gripWrap}>
          {[0, 1, 2].map(i => (
            <View
              key={i}
              style={[styles.gripLine, isActive && { backgroundColor: color }]}
            />
          ))}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function DragRanking({ order, onReorder, t }) {
  const n = order.length;

  // One shift Animated.Value per slot (persist across renders).
  const shifts = useRef(Array.from({ length: n }, () => new Animated.Value(0))).current;

  // The single shared drag value — native thread, zero JS latency.
  const dragY = useRef(new Animated.Value(0)).current;

  // Which row index is being dragged (-1 = none).
  const [activeIdx, setActiveIdx] = useState(-1);
  const activeIdxRef = useRef(-1);

  // Track last hover index so we only re-spring when it changes.
  const lastHoverRef = useRef(-1);

  // Keep live copy of order for use inside gesture callbacks (refs avoid stale closure).
  const orderRef = useRef(order);
  orderRef.current = order;

  // ── Gesture event (native thread) ────────────────────────────────────────
  const onGestureEvent = useRef(
    Animated.event(
      [{ nativeEvent: { translationY: dragY } }],
      {
        useNativeDriver: true,
        listener: (event) => {
          // JS side: compute hover index and spring other rows if it changed.
          const dy    = event.nativeEvent.translationY;
          const from  = activeIdxRef.current;
          if (from < 0) return;

          const rawHover  = from + dy / SLOT;
          const hover     = Math.max(0, Math.min(n - 1, Math.round(rawHover)));

          if (hover === lastHoverRef.current) return;
          lastHoverRef.current = hover;

          for (let i = 0; i < n; i++) {
            if (i === from) continue;
            let target = 0;
            if (from < i && i <= hover) target = -SLOT;
            if (hover <= i && i < from) target = SLOT;
            Animated.spring(shifts[i], {
              toValue: target,
              useNativeDriver: true,
              friction: 8,
              tension: 200,
            }).start();
          }
        },
      }
    )
  ).current;

  // ── State change (begin / end) ─────────────────────────────────────────────
  const makeHandlerStateChange = useCallback((panelId) => (event) => {
    const { state, translationY } = event.nativeEvent;

    if (state === State.BEGAN || state === State.ACTIVE) {
      const idx = orderRef.current.findIndex(p => p.id === panelId);
      if (idx < 0) return;
      dragY.setValue(0);
      activeIdxRef.current = idx;
      lastHoverRef.current = idx;
      setActiveIdx(idx);
    }

    if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
      const from = activeIdxRef.current;
      if (from < 0) return;

      const delta  = Math.round(translationY / SLOT);
      const target = Math.max(0, Math.min(n - 1, from + delta));
      const finalDy = (target - from) * SLOT;

      // Spring dragged item to its landing position, then commit reorder.
      Animated.spring(dragY, {
        toValue: finalDy,
        useNativeDriver: true,
        friction: 7,
        tension: 120,
      }).start(() => {
        // Hard-reset everything before re-render so there's no visual jump.
        dragY.setValue(0);
        shifts.forEach(s => s.setValue(0));
        activeIdxRef.current = -1;
        lastHoverRef.current = -1;
        setActiveIdx(-1);

        if (target !== from) {
          const next = [...orderRef.current];
          const [moved] = next.splice(from, 1);
          next.splice(target, 0, moved);
          onReorder(next);
        }
      });
    }
  }, [dragY, shifts, n, onReorder]);

  // Build one handler per panelId (stable across re-renders for same panel set).
  const handlers = useRef({});
  order.forEach(p => {
    if (!handlers.current[p.id]) {
      handlers.current[p.id] = makeHandlerStateChange(p.id);
    }
  });

  return (
    <View style={styles.wrap}>
      <View style={styles.endRow}>
        <Text style={[styles.endTxt, { color: '#2D5016' }]}>{t('rankBest')}</Text>
      </View>

      {/* Fixed-height absolute container — rows never reflow during drag */}
      <View style={{ height: n * SLOT, marginBottom: GAP }}>
        {order.map((panel, index) => {
          const color    = PANEL_COLORS[panel.id];
          const isActive = activeIdx === index;
          return (
            <DragRow
              key={panel.id}
              panel={panel}
              index={index}
              color={color}
              isActive={isActive}
              shiftY={shifts[index]}
              dragY={dragY}
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={handlers.current[panel.id]}
              t={t}
            />
          );
        })}
      </View>

      <View style={styles.endRow}>
        <Text style={[styles.endTxt, { color: '#AAA' }]}>{t('rankWorst')}</Text>
      </View>
      <Text style={styles.hint}>{t('dragHint')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:     { marginTop: 4 },
  endRow:   { alignItems: 'center', paddingVertical: 4 },
  endTxt:   { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  row: {
    position: 'absolute', left: 0, right: 0,
    height: ROW_H,
    backgroundColor: '#FFF', borderRadius: 12, borderLeftWidth: 5,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
  },
  rank:     { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  rankTxt:  { color: '#FFF', fontWeight: '800', fontSize: 14 },
  info:     { flex: 1 },
  name:     { fontSize: 14, fontWeight: '700', color: '#1A1814' },
  desc:     { fontSize: 11, color: '#888', marginTop: 1 },
  gripWrap: { width: 22, justifyContent: 'center', alignItems: 'center', gap: 4 },
  gripLine: { width: 18, height: 2.5, backgroundColor: '#CCC', borderRadius: 1.5 },
  hint:     { fontSize: 12, color: '#AAA', fontStyle: 'italic', textAlign: 'center', marginTop: 4 },
});
