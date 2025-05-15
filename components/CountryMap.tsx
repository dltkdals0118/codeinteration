import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CountryMap() {
  // 샘플 교환 국가 데이터
  const countries = [
    { code: 'US', flag: '🇺🇸', name: '미국' },
    { code: 'KR', flag: '🇰🇷', name: '한국' },
    { code: 'BR', flag: '🇧🇷', name: '브라질' },
    { code: 'FR', flag: '🇫🇷', name: '프랑스' },
    { code: 'JP', flag: '🇯🇵', name: '일본' },
  ];
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <MaterialCommunityIcons name="earth" size={26} color="#1976D2" style={{ marginRight: 8 }} />
        <Text style={styles.title}>교환한 문화 국가</Text>
      </View>
      <View style={styles.flagRow}>
        {countries.map((c) => (
          <View key={c.code} style={styles.flagCircle}>
            <Text style={styles.flag}>{c.flag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.desc}>여기에서 교류한 국가를 한눈에 볼 수 있어요!</Text>
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
    alignItems: 'center',
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
  flagRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    marginTop: 2,
  },
  flagCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    shadowColor: '#1976D2',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  flag: {
    fontSize: 26,
  },
  desc: {
    marginTop: 8,
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
  },
}); 