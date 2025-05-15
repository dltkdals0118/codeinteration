import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../constants/supabase';

export default function GuideScreen() {
  const [guide, setGuide] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from('guide').select('*');
        if (error) throw error;
        setGuide(data || []);
      } catch (e: any) {
        setError(e.message || '가이드 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };
    fetchGuide();
  }, []);

  if (loading) return <View style={styles.container}><ActivityIndicator /></View>;
  if (error) return <View style={styles.container}><Text style={{ color: 'red' }}>{error}</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>가이드 & 진입</Text>
      <FlatList
        data={guide}
        keyExtractor={(_, idx) => idx + ''}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.section}>{item.title}</Text>
            <Text>{item.content}</Text>
            {item.action && <Button title={item.action.label} onPress={() => alert(item.action.label + ' (더미)')} />}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  section: { fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
}); 