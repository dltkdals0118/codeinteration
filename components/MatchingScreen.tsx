import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DonutTimer from './DonutTimer';

export default function MatchingScreen() {
  const [finished, setFinished] = useState(false);

  // 샘플 매칭 정보
  const matchInfo = {
    country: '🇫🇷',
    countryName: '프랑스',
    language: '프랑스어',
    topic: '음식 문화',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  return (
    <LinearGradient
      colors={["#fffbe6", "#e3f2fd", "#fff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <Text style={styles.title}>매칭 대기 중…</Text>
      <View style={styles.cardShadow}>
        <View style={styles.profileCard}>
          <Image source={{ uri: matchInfo.avatar }} style={styles.avatar} />
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="flag" size={18} color="#1976D2" style={{ marginRight: 4 }} />
            <Text style={styles.infoText}>{matchInfo.country} {matchInfo.countryName}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="translate" size={18} color="#1976D2" style={{ marginRight: 4 }} />
            <Text style={styles.infoText}>{matchInfo.language}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="food" size={18} color="#1976D2" style={{ marginRight: 4 }} />
            <Text style={styles.infoText}>{matchInfo.topic}</Text>
          </View>
        </View>
      </View>
      <View style={styles.timerWrap}>
        <DonutTimer duration={60} onComplete={() => setFinished(true)} />
        <Text style={styles.waitText}>{!finished ? '1분간 대화 후 평가가 가능합니다.' : '평가를 진행해 주세요!'}</Text>
      </View>
      <TouchableOpacity
        style={[styles.evalBtn, !finished && styles.evalBtnDisabled]}
        onPress={() => finished && alert('평가 화면으로 이동!')}
        activeOpacity={finished ? 0.8 : 1}
        disabled={!finished}
      >
        <MaterialCommunityIcons name="star-circle" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.evalBtnText}>상호 평가하기</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1976D2',
    marginBottom: 32,
    letterSpacing: 1.5,
  },
  cardShadow: {
    shadowColor: '#1976D2',
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 10,
    borderRadius: 32,
    marginBottom: 32,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 32,
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 38,
    minWidth: 260,
    minHeight: 320,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: '#E3F2FD',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  timerWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  waitText: {
    marginTop: 14,
    color: '#888',
    fontSize: 15,
    fontWeight: '500',
  },
  evalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 32,
    shadowColor: '#1976D2',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    marginTop: 8,
  },
  evalBtnDisabled: {
    backgroundColor: '#B0BEC5',
    shadowOpacity: 0.08,
  },
  evalBtnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 1.1,
  },
}); 