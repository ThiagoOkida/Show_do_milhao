import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

export default function Questoes() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: '#2ecc71' }]}
            onPress={() => router.push('/AdicionarPerguntas')}
          >
            <Text style={styles.icon}>＋</Text>
            <Text style={styles.buttonLabel}>Adicionar pergunta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: '#e74c3c' }]}
            onPress={() => router.push('/RemoverPerguntas')}
          >
            <Text style={styles.icon}>🚫</Text>
            <Text style={styles.buttonLabel}>Remover pergunta</Text>
          </TouchableOpacity>
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 20,
    width: 120,
    height: 120,
  },
  icon: {
    fontSize: 40,
    color: 'black',
    marginBottom: 8,
  },
  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
});
