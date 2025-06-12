import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

type UserRanking = {
  _id: string;
  email: string;
  score: number;
};

export default function Ranking() {
  const [ranking, setRanking] = useState<UserRanking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/ranking');
        const data = await response.json();

        // LOG para debug
        console.log("Ranking recebido do backend:", data);

        // Proteção: só seta se for array
        setRanking(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao buscar ranking:', error);
        setRanking([]); // garante array mesmo em erro
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>🏆 Ranking dos Jogadores</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#16C5D1" style={{ marginTop: 32 }} />
        ) : (
          <ScrollView style={styles.scrollArea}>
            {ranking.length === 0 ? (
              <Text style={styles.semDados}>Nenhum jogador encontrado.</Text>
            ) : (
              ranking.map((user, idx) => (
                <View key={user._id} style={styles.card}>
                  <Text style={styles.nome}>
                    {idx + 1}º - {user.email}
                  </Text>
                  <Text style={styles.score}>{user.score ? `R$ ${user.score.toLocaleString('pt-BR')}` : "R$ 0,00"}</Text>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16C5D1",
    paddingTop: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#fff',
  },
  scrollArea: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 20,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16C5D1",
  },
  score: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  semDados: {
    color: "#fff",
    textAlign: "center",
    marginTop: 24,
    fontSize: 18,
  },
});
