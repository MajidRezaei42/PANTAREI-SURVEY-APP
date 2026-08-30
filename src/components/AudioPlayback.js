// src/components/AudioPlayback.js
// Plays a stored voice recording from the Data Manager.
// Shows the spoken language prominently.
// Uses createAudioPlayer imperatively (avoids hook-conditional issues).

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { createAudioPlayer } from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';
import { fs } from '../utils/responsive';

export default function AudioPlayback({ uri, language, color = '#1A3A6B' }) {
  const [status,    setStatus]    = useState('checking'); // checking | ready | playing | missing
  const playerRef = useRef(null);

  // Verify the file exists, then create the player
  useEffect(() => {
    if (!uri) { setStatus('missing'); return; }
    let mounted = true;

    FileSystem.getInfoAsync(uri).then(info => {
      if (!mounted) return;
      if (!info.exists) { setStatus('missing'); return; }
      // File confirmed — create player
      try {
        const p = createAudioPlayer({ uri });
        playerRef.current = p;
        setStatus('ready');
      } catch (e) {
        setStatus('missing');
      }
    }).catch(() => { if (mounted) setStatus('missing'); });

    return () => {
      mounted = false;
      // Clean up player on unmount
      if (playerRef.current) {
        try { playerRef.current.remove(); } catch (e) {}
        playerRef.current = null;
      }
    };
  }, [uri]);

  // Poll for playback end while playing
  useEffect(() => {
    if (status !== 'playing') return;
    const iv = setInterval(() => {
      if (playerRef.current && !playerRef.current.playing) {
        setStatus('ready');
        clearInterval(iv);
      }
    }, 400);
    return () => clearInterval(iv);
  }, [status]);

  const handlePlay = () => {
    if (!playerRef.current) return;
    try {
      playerRef.current.seekTo(0);
      playerRef.current.play();
      setStatus('playing');
    } catch (e) { setStatus('ready'); }
  };

  const handlePause = () => {
    if (!playerRef.current) return;
    try {
      playerRef.current.pause();
      setStatus('ready');
    } catch (e) {}
  };

  if (!uri) return null;

  if (status === 'checking') {
    return (
      <View style={styles.checkingRow}>
        <ActivityIndicator size="small" color={color} />
        <Text style={[styles.checkingTxt, { color }]}>Checking recording…</Text>
      </View>
    );
  }

  if (status === 'missing') {
    return (
      <View style={styles.missingRow}>
        <Text style={styles.missingIcon}>🎤</Text>
        <Text style={styles.missingTxt}>Recording file not found on this device</Text>
      </View>
    );
  }

  const isPlaying = status === 'playing';

  return (
    <View style={[styles.wrap, { borderColor: color + '55' }]}>
      {/* Language badge */}
      <View style={[styles.langBadge, { backgroundColor: color }]}>
        <Text style={styles.langIcon}>🎤</Text>
        <Text style={styles.langTxt}>
          {language ? `Recorded in: ${language}` : 'Voice recording'}
        </Text>
      </View>

      {/* Play / Pause */}
      <TouchableOpacity
        style={[styles.playBtn, { backgroundColor: isPlaying ? '#CC2020' : color + 'EE' }]}
        onPress={isPlaying ? handlePause : handlePlay}
        activeOpacity={0.8}
      >
        <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        <Text style={styles.playTxt}>{isPlaying ? 'Pause' : 'Play recording'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1, borderRadius: 10,
    overflow: 'hidden', marginTop: 8,
  },
  langBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 7, paddingHorizontal: 12,
  },
  langIcon: { fontSize: fs(14) },
  langTxt:  { fontSize: fs(13), fontWeight: '700', color: '#FFF' },
  playBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 10, paddingHorizontal: 14,
  },
  playIcon: { fontSize: fs(16), color: '#FFF' },
  playTxt:  { fontSize: fs(14), fontWeight: '600', color: '#FFF' },
  checkingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginTop: 8, padding: 8,
  },
  checkingTxt: { fontSize: fs(12) },
  missingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 8, padding: 8,
    backgroundColor: '#FFF5F5', borderRadius: 8,
  },
  missingIcon: { fontSize: fs(16) },
  missingTxt:  { fontSize: fs(12), color: '#AA0000', fontStyle: 'italic' },
});
