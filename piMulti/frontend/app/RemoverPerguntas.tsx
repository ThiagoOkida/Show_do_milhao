import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

const API_URL = 'http://localhost:3000/api/questions';

export default function RemoverPergunta() {
  const router = useRouter();
  const [perguntas, setPerguntas] = useState<any[]>([]);
  const [expandida, setExpandida] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandida(prev => (prev === id ? null : id));
  };

  const fetchPerguntas = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPerguntas(data);
    } catch (error) {
      console.error('Erro ao buscar perguntas:', error);
    }
  };

  const deletarPergunta = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      Alert.alert('Sucesso', result.message || 'Pergunta removida com sucesso');
      fetchPerguntas(); // Atualiza lista após deletar
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a pergunta.');
      console.error('Erro ao deletar:', error);
    }
  };

  useEffect(() => {
    fetchPerguntas();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />

        <View style={styles.card}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {perguntas.map((pergunta, index) => (
  <View key={pergunta._id} style={styles.perguntaBox}>
    <TouchableOpacity
      style={styles.perguntaHeader}
      onPress={() => toggleExpand(pergunta._id)}
    >
      <Text style={styles.perguntaId}>Questão {index + 1}</Text>
      <Text>{expandida === pergunta._id ? '▲' : '▼'}</Text>
    </TouchableOpacity>

    {expandida === pergunta._id && (
      <View style={styles.perguntaConteudo}>
        <View style={styles.perguntaInfo}>
          <Text style={styles.perguntaTexto}>{pergunta.questionText}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 8 }}>Alternativas:</Text>
            {pergunta.wrongAnswers?.map((alt: string, idx: number) => (
              <Text key={idx}>- {alt}</Text>
            ))}
            <Text style={{ marginTop: 8, fontWeight: 'bold' }}>
              Resposta correta: {pergunta.correctAnswer}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deletarPergunta(pergunta._id)}
        >
          <Text style={styles.deleteText}>Apagar questão</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
))}

          </ScrollView>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/Questoes')}>
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
    flexDirection: 'column',
    gap: 8,
    marginBottom: 10,
  },
  perguntaTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
