import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

export default function MatchStartButton({ onPress }: { onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.outer, { transform: [{ scale }] }]}> 
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        android_ripple={{ color: '#1976D2' }}
      >
        <MaterialCommunityIcons name="handshake" size={28} color="#fff" style={{ marginRight: 10 }} />
        <View>
          <Text style={styles.buttonText}>매칭 시작</Text>
          <Text style={styles.buttonSub}>지금 바로 문화교류 시작!</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginVertical: 24,
    shadowColor: '#1976D2',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    borderRadius: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingVertical: 22,
    paddingHorizontal: 36,
    borderRadius: 32,
    minWidth: 280,
    justifyContent: 'center',
    shadowColor: '#1976D2',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonPressed: {
    backgroundColor: '#145ea8',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  buttonSub: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 13,
    opacity: 0.85,
    marginTop: 2,
    textAlign: 'center',
  },
}); 