import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RankingList() {
  // 샘플 데이터
  const ranking = [
    { name: 'Alice', country: '🇺🇸', score: 120 },
    { name: 'Bob', country: '🇰🇷', score: 110 },
    { name: 'Carlos', country: '🇧🇷', score: 100 }
  ];
  const medals = ['gold', 'silver', 'bronze'];
  const medalColors = ['#FFD600', '#B0BEC5', '#FF8A65'];
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MaterialCommunityIcons name="trophy-award" size={28} color="#FFD600" style={{ marginRight: 8 }} />
        <Text style={styles.title}>랭킹</Text>
      </View>
      {ranking.map((user, idx) => (
        <View key={user.name} style={[styles.row, idx === 0 && styles.firstRow]}>
          <View style={[styles.medal, { backgroundColor: medalColors[idx] || '#E0E0E0' }] }>
            <MaterialCommunityIcons name={idx === 0 ? 'crown' : 'medal'} size={18} color={idx === 0 ? '#FFD600' : '#fff'} />
            <Text style={styles.medalText}>{idx + 1}</Text>
          </View>
          <Text style={styles.flag}>{user.country}</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.score}>{user.score}점</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginVertical: 16,
    minWidth: 280,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
    letterSpacing: 1,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F7F9FB',
    paddingHorizontal: 10,
  },
  firstRow: {
    backgroundColor: '#FFFDE7',
    shadowColor: '#FFD600',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  medal: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexDirection: 'row',
    gap: 2,
  },
  medalText: {
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 2,
    fontSize: 15,
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  score: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1976D2',
    marginLeft: 8,
  },
}); 