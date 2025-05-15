import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';
import DonutTimer from '../../components/DonutTimer';

const SOCKET_URL = 'https://oneminute.onrender.com'; // Render 배포 서버 주소

export default function MatchingWaitScreen() {
  const [matched, setMatched] = useState(false);
  const [partner, setPartner] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const socketRef = useRef<any>(null);

  // TODO: 실제 로그인 유저 정보로 교체
  const user = {
    id: 'user1',
    country: 'KR',
    name: '나',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { transports: ['websocket'] });
    socketRef.current.emit('join-matching', user);
    socketRef.current.on('match-found', (data: any) => {
      setMatched(true);
      setPartner(data.partner);
      setSessionId(data.sessionId);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  if (!matched) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.waitText}>실시간 매칭 대기 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.title}>매칭 성공!</Text>
      <Image source={{ uri: partner.avatar }} style={styles.avatar} />
      <Text style={styles.partnerName}>{partner.name} ({partner.country})</Text>
      <DonutTimer duration={60} onComplete={() => alert('세션 종료!')} />
      <Text style={styles.sessionId}>세션: {sessionId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  waitText: { marginTop: 16, fontSize: 18, color: '#1976D2' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1976D2', marginBottom: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 12, borderWidth: 3, borderColor: '#E3F2FD' },
  partnerName: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  sessionId: { marginTop: 12, color: '#888', fontSize: 13 },
}); 