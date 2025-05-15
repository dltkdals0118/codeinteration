import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../constants/supabase';

const icons = [
  { label: '감동', emoji: '😍' },
  { label: '유익', emoji: '🤓' },
  { label: '친절', emoji: '😊' },
];

export default function MutualEvaluationScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from('evaluation').insert([{ type: selected, comment }]);
      if (error) throw error;
      setSaved(true);
      setComment('');
      setSelected(null);
      fetchHistory();
    } catch (e: any) {
      setError(e.message || '저장 실패');
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const { data, error } = await supabase.from('evaluation').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setHistory(data || []);
    } catch {
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>상호 평가</Text>
      <View style={styles.iconRow}>
        {icons.map((icon) => (
          <TouchableOpacity
            key={icon.label}
            style={[styles.iconBtn, selected === icon.label && styles.selected]}
            onPress={() => setSelected(icon.label)}
          >
            <Text style={styles.emoji}>{icon.emoji}</Text>
            <Text>{icon.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="코멘트를 남겨주세요"
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <Button title={loading ? '저장 중...' : '평가 저장'} onPress={handleSave} disabled={!selected || loading} />
      {error && <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text>}
      {saved && <Text style={styles.savedMsg}>만남 기록이 저장되었습니다!</Text>}
      <Text style={styles.section}>만남 기록</Text>
      {historyLoading ? <ActivityIndicator /> : (
        <FlatList
          data={history}
          keyExtractor={(_, idx) => idx + ''}
          renderItem={({ item }) => (
            <Text>- {item.type} / {item.comment}</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  iconRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  iconBtn: { alignItems: 'center', padding: 12, borderRadius: 8, backgroundColor: '#E3F2FD' },
  selected: { backgroundColor: '#C8E6C9' },
  emoji: { fontSize: 32 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, width: 220, minHeight: 60, marginBottom: 16 },
  savedMsg: { marginTop: 12, color: '#1976D2', fontWeight: 'bold' },
  section: { fontWeight: 'bold', marginTop: 24, marginBottom: 8 },
}); 