// src/components/VoiceRecorder.js
// expo-audio (SDK 54). Audio-language picker covers 8 common Festival
// languages plus "Other" with a free-text input — record in ANY language.
// No language gate on the record button: participants can record immediately.

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAudioRecorder, useAudioPlayer, AudioModule } from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';
import { AUDIO_LANGUAGES } from '../i18n/translations';

const PRESET_CODES = AUDIO_LANGUAGES.filter(l => l.code !== 'OTHER').map(l => l.code);

export default function VoiceRecorder({
  participantId,
  questionCode,
  onRecordingComplete,
  onLanguageChange,
  audioLanguage,
  existingUri = null,
  color = '#2D5016',
  disabled = false,
  t,
}) {
  const [isRecording, setIsRecording]   = useState(false);
  const [recordingUri, setRecordingUri] = useState(existingUri);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [duration, setDuration]         = useState(0);

  // Is the user typing a custom language? True if existing audioLanguage
  // value isn't one of the preset codes (e.g. they previously typed "Catalan").
  const initialOther = !!(audioLanguage && !PRESET_CODES.includes(audioLanguage));
  const [isOther, setIsOther]   = useState(initialOther);
  const [otherText, setOtherText] = useState(initialOther ? audioLanguage : '');

  const timerRef = useRef(null);
  const recorder = useAudioRecorder({ extension: '.m4a', sampleRate: 44100, numberOfChannels: 1 });
  const player   = useAudioPlayer(recordingUri);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const iv = setInterval(() => {
      if (player && !player.playing) { setIsPlaying(false); clearInterval(iv); }
    }, 500);
    return () => clearInterval(iv);
  }, [isPlaying, player]);

  const pickPreset = (code) => {
    setIsOther(false);
    setOtherText('');
    onLanguageChange(code);
  };

  const pickOther = () => {
    setIsOther(true);
    // Keep what user typed (or empty string until they type)
    onLanguageChange(otherText || '');
  };

  const onOtherTextChange = (text) => {
    setOtherText(text);
    onLanguageChange(text);
  };

  const handleStart = async () => {
    // Require language selection before recording (feature #3)
    if (!audioLanguage) {
      Alert.alert(
        t ? t('speakLanguage') : 'Choose your language first',
        t ? t('speakLanguageHint') : 'Please select the language you will speak before recording.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }
    const { granted } = await AudioModule.requestRecordingPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission needed', 'Please allow microphone access in device settings.');
      return;
    }
    try {
      await recorder.prepareToRecordAsync();
      recorder.record();
      setIsRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } catch (e) {
      Alert.alert('Recording error', e.message);
    }
  };

  const handleStop = async () => {
    clearInterval(timerRef.current);
    setIsRecording(false);
    try {
      await recorder.stop();
      const tempUri = recorder.uri;
      if (!tempUri) { Alert.alert('Error', 'No recording captured.'); return; }
      const dir = FileSystem.documentDirectory + 'recordings/';
      const info = await FileSystem.getInfoAsync(dir);
      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
      }
      const fname = `${participantId}_${questionCode}_${Date.now()}.m4a`;
      const dest = dir + fname;
      await FileSystem.moveAsync({ from: tempUri, to: dest });
      setRecordingUri(dest);
      onRecordingComplete(dest);
    } catch (e) {
      Alert.alert('Save error', e.message);
    }
  };

  const handlePlay = async () => {
    if (!recordingUri || !player) return;
    try { player.seekTo(0); player.play(); setIsPlaying(true); }
    catch (e) { Alert.alert('Playback error', e.message); }
  };

  const handleDelete = () => {
    Alert.alert('Delete recording?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
          setRecordingUri(null);
          onRecordingComplete(null);
        }
      },
    ]);
  };

  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  if (disabled) {
    return (
      <View style={styles.disabled}>
        <Text style={styles.disabledText}>🎤 {t ? t('recordingNotConsented') : 'Recording not consented'}</Text>
      </View>
    );
  }

  // What language label to show in the "voice recorded" badge
  const langLabel = (() => {
    if (!audioLanguage) return '';
    const preset = AUDIO_LANGUAGES.find(l => l.code === audioLanguage);
    return preset ? preset.label : audioLanguage;
  })();

  return (
    <View style={styles.wrap}>
      {/* Audio language picker — highlighted until a language is chosen */}
      <View style={[styles.langBox, !audioLanguage && styles.langBoxRequired]}>
        <Text style={styles.hint}>{t ? t('speakLanguageHint') : ''}</Text>
        <Text style={styles.langLabel}>
          {t ? t('speakLanguage') : 'Which language will you speak?'}
          {!audioLanguage ? <Text style={styles.langRequired}> *</Text> : <Text style={styles.langDone}> ✓</Text>}
        </Text>
        <View style={styles.langRow}>
          {AUDIO_LANGUAGES.map(l => {
            const active = l.code === 'OTHER' ? isOther : (audioLanguage === l.code && !isOther);
            const onPress = l.code === 'OTHER' ? pickOther : () => pickPreset(l.code);
            return (
              <TouchableOpacity
                key={l.code}
                style={[styles.langChip, active && { backgroundColor: color, borderColor: color }]}
                onPress={onPress}
                activeOpacity={0.7}
              >
                <Text style={[styles.langChipTxt, active && { color: '#FFF', fontWeight: '700' }]}>
                  {l.flag} {l.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {isOther && (
          <TextInput
            style={styles.otherInput}
            placeholder={t ? t('otherLanguage') : 'Type the language…'}
            placeholderTextColor="#AAA"
            value={otherText}
            onChangeText={onOtherTextChange}
            maxLength={40}
            autoCapitalize="words"
          />
        )}
      </View>

      {!recordingUri ? (
        <TouchableOpacity
          style={[styles.micBtn, { borderColor: color }, isRecording && styles.recActive]}
          onPress={isRecording ? handleStop : handleStart}
          activeOpacity={0.8}
        >
          <Text style={[styles.micLabel, { color: isRecording ? '#FFF' : color }]}>
            {isRecording ? `⏹  ${t ? t('stop') : 'Stop'}  ${fmt(duration)}` : `🎤  ${t ? t('recordVoice') : 'Record voice'}`}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.playRow}>
          <Text style={styles.doneLabel}>✅ {t ? t('voiceRecorded') : 'Voice recorded'}{langLabel ? `  (${langLabel})` : ''}</Text>
          <TouchableOpacity onPress={handlePlay} disabled={isPlaying}>
            <Text style={[styles.playBtn, { color }]}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.delBtn}>🗑</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 8 },
  langBox: { marginBottom: 12, backgroundColor: '#F4F8EF', borderRadius: 10, padding: 12 },
  langBoxRequired: {
    borderWidth: 1.5,
    borderColor: '#C8920A',
    backgroundColor: '#FFFBF0',
  },
  hint:    { fontSize: 12, color: '#4A5C40', lineHeight: 18, marginBottom: 10 },
  langLabel: { fontSize: 13, fontWeight: '700', color: '#2D5016', marginBottom: 6 },
  langRequired: { color: '#CC2020', fontWeight: '800', fontSize: 14 },
  langDone:     { color: '#2D5016', fontWeight: '700', fontSize: 13 },
  langRow:  { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  langChip: { borderWidth: 1.5, borderColor: '#CCC', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#FFF' },
  langChipTxt: { fontSize: 13, color: '#444' },
  otherInput: { marginTop: 8, borderWidth: 1, borderColor: '#CCC', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFF', fontSize: 14 },
  micBtn: { borderWidth: 1.5, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 18, alignSelf: 'flex-start' },
  recActive: { backgroundColor: '#CC2020', borderColor: '#CC2020' },
  micLabel: { fontSize: 14, fontWeight: '600' },
  playRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
  doneLabel: { fontSize: 13, color: '#2D5016', fontStyle: 'italic', flex: 1 },
  playBtn: { fontSize: 26 },
  delBtn: { fontSize: 22 },
  disabled: { marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 6 },
  disabledText: { fontSize: 12, color: '#BBB', fontStyle: 'italic' },
});
