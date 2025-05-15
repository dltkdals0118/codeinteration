import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CountryMap from './CountryMap';
import MatchStartButton from './MatchStartButton';
import TodayQuizCard from './TodayQuizCard';

export default function MainScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MatchStartButton onPress={() => router.push('/matching-wait')} />
      <TodayQuizCard />
      <CountryMap />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff'
  }
}); 