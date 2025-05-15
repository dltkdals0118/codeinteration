import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { supabase } from '../constants/supabase';

export default function MyPageScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [reportMsg, setReportMsg] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reporting, setReporting] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [profileData, chatsData, statsData] = await Promise.all([
        supabase.from('profile').select('*').single(),
        supabase.from('chats').select('*'),
        supabase.from('stats').select('*'),
      ]);
      setProfile(profileData.data || null);
      setChats(chatsData.data || []);
      setStats(statsData.data || []);
    } catch (e: any) {
      setError(e.message || '데이터 불러오기 실패');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleReport = async () => {
    setReporting(true);
    try {
      const { error } = await supabase.from('report').insert([{ message: reportMsg }]);
      if (error) throw error;
      setShowReport(false);
      setReportMsg('');
      Alert.alert('신고가 접수되었습니다.');
    } catch (e: any) {
      Alert.alert('신고 실패', e.message);
    } finally {
      setReporting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    Alert.alert('로그아웃 되었습니다.', '앱을 새로고침 해주세요.');
  };

  if (loading) return <View style={styles.container}><ActivityIndicator /></View>;
  if (error) return <View style={styles.container}><Text style={{ color: 'red' }}>{error}</Text></View>;

  return (
    <View style={styles.container}>
      <Button mode="outlined" onPress={handleLogout} style={styles.logoutBtn}>로그아웃</Button>
      <Text style={styles.title}>마이페이지</Text>
      <Text style={styles.section}>프로필</Text>
      <Text>이름: {profile?.name}</Text>
      <Text>소개: {profile?.intro}</Text>
      <Button mode="text" onPress={() => Alert.alert('설정 화면(더미)')} style={styles.button}>설정</Button>
      <Text style={styles.section}>내 대화내역 & 피드백</Text>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.with_user} ({item.country}) - 피드백: {item.feedback}</Text>
        )}
        style={{ marginBottom: 8 }}
      />
      <Text style={styles.section}>국가별 통계</Text>
      <FlatList
        data={stats}
        keyExtractor={item => item.country}
        renderItem={({ item }) => (
          <Text>{item.country}: {item.count}회</Text>
        )}
        style={{ marginBottom: 8 }}
      />
      <Text style={styles.section}>안전신고</Text>
      {showReport ? (
        <View style={styles.reportBox}>
          <TextInput
            style={styles.input}
            placeholder="신고 내용을 입력하세요"
            value={reportMsg}
            onChangeText={setReportMsg}
            multiline
          />
          <Button mode="contained" onPress={handleReport} disabled={reporting || !reportMsg} style={styles.button}>
            {reporting ? '제출 중...' : '신고 제출'}
          </Button>
        </View>
      ) : (
        <Button mode="contained" onPress={() => setShowReport(true)} style={styles.button}>신고하기</Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  section: { fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, minHeight: 40, marginBottom: 8 },
  reportBox: { marginBottom: 12 },
  logoutBtn: { alignSelf: 'flex-end', marginBottom: 8 },
  button: { marginBottom: 8 },
}); 