import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

const perguntasMock = [
  { id: 'Q.01', texto: 'Pergunta exemplo', alternativas: ['A', 'B', 'C', 'D'] },
  { id: 'Q.02', texto: 'Pergunta exemplo', alternativas: ['A', 'B', 'C', 'D'] },
  { id: 'Q.03', texto: 'Pergunta exemplo', alternativas: ['A', 'B', 'C', 'D'] },
  { id: 'Q.04', texto: 'Pergunta exemplo', alternativas: ['A', 'B', 'C', 'D'] },
  { id: 'Q.05', texto: 'Pergunta exemplo', alternativas: ['A', 'B', 'C', 'D'] },
];

export default function RemoverPergunta() {
  const router = useRouter();
  const [expandida, setExpandida] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandida(prev => (prev === id ? null : id));
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />

        <View style={styles.card}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {perguntasMock.map((pergunta) => (
              <View key={pergunta.id} style={styles.perguntaBox}>
                <TouchableOpacity
                  style={styles.perguntaHeader}
                  onPress={() => toggleExpand(pergunta.id)}
                >
                  <Text style={styles.perguntaId}>{pergunta.id}</Text>
                  <Text>{expandida === pergunta.id ? '▲' : '▼'}</Text>
                </TouchableOpacity>

                {expandida === pergunta.id && (
                  <View style={styles.perguntaConteudo}>
                    <View style={styles.perguntaInfo}>
                      <Text style={styles.perguntaTexto}>Q</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ marginBottom: 8 }}>Alternativas:</Text>
                        {pergunta.alternativas.map((alt, idx) => (
                          <Text key={idx}>- {alt}</Text>
                        ))}
                      </View>
                    </View>

                    <TouchableOpacity style={styles.deleteButton}>
                      <Text style={styles.deleteText}>Apagar questão</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/Questoes')}
        >
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16C5D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    width: '85%',
    height: '70%',
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  perguntaBox: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  perguntaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  perguntaId: {
    fontWeight: 'bold',
  },
  perguntaConteudo: {
    backgroundColor: '#ddd',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#bbb',
  },
  perguntaInfo: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
  perguntaTexto: {
    fontSize: 48,
    fontWeight: 'bold',
    width: 80,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#E6E6E6',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  backText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
