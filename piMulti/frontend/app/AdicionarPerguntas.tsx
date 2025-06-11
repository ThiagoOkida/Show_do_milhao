import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

const API_URL = 'http://localhost:3000/api/questions';

export default function AdicionarPergunta() {
  const router = useRouter();
  const [questionText, setQuestionText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState(['', '', '']);
  const [knowledgeArea, setKnowledgeArea] = useState('');

  const handleWrongAnswerChange = (index: number, value: string) => {
    const newAnswers = [...wrongAnswers];
    newAnswers[index] = value;
    setWrongAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!questionText || !correctAnswer || wrongAnswers.some(a => !a) || !knowledgeArea) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText,
          correctAnswer,
          wrongAnswers,
          knowledgeArea,
          difficulty: 1
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sucesso', 'Pergunta adicionada com sucesso!');
        setQuestionText('');
        setCorrectAnswer('');
        setWrongAnswers(['', '', '']);
        setKnowledgeArea('');
      } else {
        Alert.alert('Erro', data.message || 'Erro ao adicionar pergunta.');
      }
    } catch (err) {
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />

        <ScrollView style={{ width: '85%' }}>
          <View style={styles.card}>
            <Text style={styles.label}>Questão:</Text>
            <TextInput style={styles.input} value={questionText} onChangeText={setQuestionText} />

            <Text style={styles.label}>Resposta Correta:</Text>
            <TextInput style={styles.input} value={correctAnswer} onChangeText={setCorrectAnswer} />

            <Text style={styles.label}>Alternativas Incorretas:</Text>
            {wrongAnswers.map((alt, idx) => (
              <TextInput
                key={idx}
                style={styles.input}
                value={alt}
                onChangeText={(text) => handleWrongAnswerChange(idx, text)}
              />
            ))}

            <Text style={styles.label}>Categoria:</Text>
            {['E', 'H', 'B', 'L'].map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setKnowledgeArea(cat)}
                style={styles.radioOption}
              >
                <View style={styles.radioCircle}>
                  {knowledgeArea === cat && <View style={styles.radioSelected} />}
                </View>
                <Text style={styles.radioLabel}>
                  {cat === 'E' ? 'Exatas' : cat === 'H' ? 'Humanas' : cat === 'B' ? 'Biológicas' : 'Linguagens'}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
              <Text style={styles.sendText}>Enviar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/Questoes')}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16C5D1',
    alignItems: 'center',
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
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 30,
    marginTop: 140,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  radioLabel: {
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#A6D86E',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  sendText: {
    color: '#000',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#E6E6E6',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginBottom: 30,
  },
  backText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
