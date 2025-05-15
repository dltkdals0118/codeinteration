import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Snackbar, TextInput, Title } from 'react-native-paper';
import { supabase } from '../constants/supabase';

export default function AuthScreen({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess('회원가입 성공! 이메일을 확인하세요.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSuccess('로그인 성공!');
        onAuth();
      }
    } catch (e: any) {
      setError(e.message || '오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={{ marginBottom: 16 }}>{isSignUp ? '회원가입' : '로그인'}</Title>
      <TextInput
        label="이메일"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAuth} loading={loading} style={styles.button}>
        {isSignUp ? '회원가입' : '로그인'}
      </Button>
      <Button onPress={() => setIsSignUp(!isSignUp)} style={styles.button}>
        {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
      </Button>
      <Snackbar visible={!!error} onDismiss={() => setError('')} duration={3000} style={{ backgroundColor: 'red' }}>{error}</Snackbar>
      <Snackbar visible={!!success} onDismiss={() => setSuccess('')} duration={3000}>{success}</Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  input: { width: 260, marginBottom: 12 },
  button: { width: 260, marginBottom: 8 },
}); 