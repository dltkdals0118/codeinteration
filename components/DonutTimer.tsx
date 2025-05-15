import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const RADIUS = 40;
const STROKE = 8;
const CIRCUM = 2 * Math.PI * RADIUS;

export default function DonutTimer({ duration = 60, onComplete }: { duration?: number; onComplete: () => void }) {
  const [countdown, setCountdown] = useState(duration);
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    Animated.timing(animated, {
      toValue: 1,
      duration: duration * 1000,
      useNativeDriver: false
    }).start();

    return () => clearInterval(timer);
  }, []);

  const strokeDashoffset = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, CIRCUM],
  });

  return (
    <View style={styles.container}>
      <Svg width={100} height={100}>
        <Circle
          cx={50}
          cy={50}
          r={RADIUS}
          stroke="#E0E0E0"
          strokeWidth={STROKE}
          fill="none"
        />
        <AnimatedCircle
          cx={50}
          cy={50}
          r={RADIUS}
          stroke="#1976D2"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUM}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <Text style={styles.countdown}>{countdown}s</Text>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginVertical: 16 },
  countdown: { position: 'absolute', fontSize: 24, fontWeight: 'bold', color: '#1976D2' }
}); 