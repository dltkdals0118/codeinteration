import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 여러 퀴즈 배열 추가
const quizzes = [
  {
    question: '한국의 대표적인 전통 음식은?',
    options: ['김치', '햄버거', '피자'],
    answer: 0
  },
  {
    question: '이탈리아의 대표 음식은?',
    options: ['초밥', '피자', '타코'],
    answer: 1
  },
  {
    question: '일본의 대표 음식은?',
    options: ['김치', '초밥', '파에야'],
    answer: 1
  },
  {
    question: '멕시코의 대표 음식은?',
    options: ['타코', '파스타', '스테이크'],
    answer: 0
  },
  {
    question: '프랑스의 대표 빵은?',
    options: ['바게트', '난', '프레첼'],
    answer: 0
  }
];

// 기존 quiz 변수 삭제, 랜덤 퀴즈 선택
const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];

export default function TodayQuizCard() {
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(1));

  const handleSelect = (idx: number) => {
    setSelected(idx);
    if (idx === randomQuiz.answer) {
      setResult('정답입니다!');
    } else {
      setResult('오답입니다. 다시 시도해보세요.');
      setTimeout(() => {
        setSelected(null);
        setResult(null);
        fadeAnim.setValue(0);
      }, 1000);
    }
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  return (
    <View style={styles.outerWrap}>
      {/* 카드 상단 라인/장식 */}
      <View style={styles.topLine} />
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}> 
        {/* 그라데이션 배경 */}
        <LinearGradient
          colors={["#fffbe6", "#e3f2fd", "#fff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <MaterialCommunityIcons name="lightbulb-on-outline" size={36} color="#FFD600" style={styles.quizIcon} />
        <Text style={styles.title}>오늘의 문화 퀴즈</Text>
        <Text style={styles.question}>Q. {randomQuiz.question}</Text>
        <View style={styles.options}>
          {randomQuiz.options.map((opt, idx) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.optionBtn,
                selected === idx && (idx === randomQuiz.answer ? styles.correct : styles.incorrect),
                selected === idx && styles.selectedOption
              ]}
              onPress={() => handleSelect(idx)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={selected !== null && result === '정답입니다!'}
              activeOpacity={0.85}
            >
              <View style={styles.optionRow}>
                <View style={[styles.optionCircle, selected === idx && (idx === randomQuiz.answer ? styles.circleCorrect : styles.circleIncorrect)]}>
                  <Text style={styles.circleText}>{idx + 1}</Text>
                </View>
                <Text style={styles.optionText}>{opt}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {result && (
          <Animated.View style={[styles.resultBox, result.includes('정답') ? styles.resultCorrect : styles.resultIncorrect, { opacity: fadeAnim }]}> 
            <Text style={styles.resultText}>{result}</Text>
          </Animated.View>
        )}
      </Animated.View>
      {/* 카드 하단 미니멀 점 장식 */}
      <View style={styles.bottomDots}>
        <View style={styles.dot} />
        <View style={[styles.dot, { backgroundColor: '#FFD600' }]} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrap: {
    alignItems: 'center',
    marginVertical: 24,
  },
  topLine: {
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1976D2',
    marginBottom: 12,
    opacity: 0.12,
  },
  card: {
    padding: 36,
    backgroundColor: 'transparent',
    borderRadius: 32,
    minWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 10,
    overflow: 'hidden',
  },
  quizIcon: {
    marginBottom: 10,
  },
  title: {
    fontWeight: '900',
    fontSize: 30,
    marginBottom: 18,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#222',
  },
  question: {
    fontSize: 20,
    marginBottom: 28,
    color: '#222',
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  options: {
    width: '100%',
    marginBottom: 24,
    gap: 16,
  },
  optionBtn: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 18,
    backgroundColor: '#F3F6FA',
    marginVertical: 6,
    marginHorizontal: 0,
    alignItems: 'flex-start',
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedOption: {
    borderColor: '#FFD600',
    shadowOpacity: 0.16,
    elevation: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#B3C6E6',
  },
  circleText: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  circleCorrect: {
    backgroundColor: '#E6F9E6',
    borderColor: '#43A047',
  },
  circleIncorrect: {
    backgroundColor: '#FFE6E6',
    borderColor: '#E53935',
  },
  optionText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  correct: { backgroundColor: '#E6F9E6', borderColor: '#43A047' },
  incorrect: { backgroundColor: '#FFE6E6', borderColor: '#E53935' },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 18,
    minWidth: 200,
    justifyContent: 'center',
    shadowColor: '#FFD600',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  resultCorrect: { backgroundColor: '#FFFDE7' },
  resultIncorrect: { backgroundColor: '#FFF3E6' },
  resultText: { fontWeight: 'bold', fontSize: 20, color: '#222' },
  bottomDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B3C6E6',
    opacity: 0.5,
  },
}); 