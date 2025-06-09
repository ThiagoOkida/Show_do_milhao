import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

export default function AdicionarPergunta() {
  const router = useRouter();
  const [categoria, setCategoria] = useState('');

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
          <Text style={styles.label}>Questão:</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>Resposta:</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>Alternativas:</Text>
          {[...Array(4)].map((_, index) => (
            <TextInput key={index} style={styles.input} />
          ))}

          <View style={styles.radioGroup}>
            {['Exatas', 'Humanas', 'Biolog.', 'Linguagens'].map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategoria(cat)}
                style={styles.radioOption}
              >
                <View style={styles.radioCircle}>
                  {categoria === cat && <View style={styles.radioSelected} />}
                </View>
                <Text style={styles.radioLabel}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 30,
    width: '85%',
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  },
  backText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
