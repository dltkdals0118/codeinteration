import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, Card, Chip, Snackbar, Title } from 'react-native-paper';
import { supabase } from '../constants/supabase';

const rankingTypes = ['국가별', '유형별'];

export default function PointShopScreen() {
  const [goods, setGoods] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [feed, setFeed] = useState<any[]>([]);
  const [ranking, setRanking] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState('국가별');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exchanging, setExchanging] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [goodsData, badgesData, feedData, rankingData] = await Promise.all([
        supabase.from('goods').select('*'),
        supabase.from('badges').select('*'),
        supabase.from('feed').select('*'),
        supabase.from('ranking').select('*').eq('type', selectedType),
      ]);
      setGoods(goodsData.data || []);
      setBadges(badgesData.data || []);
      setFeed(feedData.data || []);
      setRanking(rankingData.data || []);
    } catch (e: any) {
      setError(e.message || '데이터 불러오기 실패');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  const handleExchange = async (id: string) => {
    setExchanging(id);
    try {
      const { error } = await supabase.from('exchange').insert([{ goods_id: id }]);
      if (error) throw error;
      setSnackbar('교환 완료!');
      fetchAll();
    } catch (e: any) {
      setSnackbar('교환 실패: ' + e.message);
    } finally {
      setExchanging(null);
    }
  };

  if (loading) return <View style={styles.container}><ActivityIndicator /></View>;
  if (error) return <View style={styles.container}><Text style={{ color: 'red' }}>{error}</Text></View>;

  return (
    <View style={styles.container}>
      <Title style={styles.title}>포인트샵 & 랭킹</Title>
      <Text style={styles.section}>문화굿즈 교환</Text>
      <FlatList
        data={goods}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({ item }) => (
          <Card style={styles.goodsCard}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Text style={{ marginBottom: 8 }}>{item.point}P</Text>
              <Button mode="contained" onPress={() => handleExchange(item.id)} loading={exchanging === item.id} disabled={!!exchanging}>
                교환
              </Button>
            </Card.Content>
          </Card>
        )}
        style={{ marginBottom: 12 }}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.section}>성취 뱃지</Text>
      <View style={styles.badgeRow}>{badges.map((b: any) => <Chip key={b.id || b} style={styles.badge}>{b.emoji || b}</Chip>)}</View>
      <Text style={styles.section}>랭킹</Text>
      <View style={styles.rankingTypeRow}>
        {rankingTypes.map(type => (
          <Chip key={type} selected={selectedType === type} onPress={() => setSelectedType(type)} style={selectedType === type ? styles.selectedType : styles.rankingTypeBtn}>
            {type}
          </Chip>
        ))}
      </View>
      <Card style={styles.rankingCard}>
        <Card.Content>
          {ranking.map((item, index) => (
            <Text key={item.id || index}>{index + 1}. {item.name} - {item.score}점</Text>
          ))}
        </Card.Content>
      </Card>
      <Text style={styles.section}>커뮤니티 피드</Text>
      <FlatList
        data={feed}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.feedCard}>
            <Card.Content>
              <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
              <Text>{item.msg}</Text>
            </Card.Content>
          </Card>
        )}
        style={{ marginBottom: 8 }}
      />
      <Snackbar visible={!!snackbar} onDismiss={() => setSnackbar('')} duration={2500}>{snackbar}</Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  section: { fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  goodsCard: { width: 160, marginRight: 12, backgroundColor: '#E3F2FD' },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  badge: { fontSize: 18, marginRight: 4 },
  rankingTypeRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  rankingTypeBtn: { backgroundColor: '#E0E0E0', marginRight: 4 },
  selectedType: { backgroundColor: '#C8E6C9', marginRight: 4 },
  rankingCard: { marginBottom: 8, backgroundColor: '#F5F5F5' },
  feedCard: { marginBottom: 8, backgroundColor: '#F5F5F5' },
}); 