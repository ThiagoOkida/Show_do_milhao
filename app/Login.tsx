import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'Login',
};

export default function Login() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const logoSize = width < 400 ? 80 : width < 700 ? 100 : 150;
  const isSmallMascot = width < 1253;

  const mascotSize = isSmallMascot ? 250 : 500;

  return (
    <>
      {/* Oculta o header padrão do expo-router */}
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container}>
        {/* Logo como botão de voltar */}
        <TouchableOpacity onPress={() => router.push('/')} style={styles.logoWrapper}>
          <Image
            source={require('../assets/images/logo.png')}
            style={[styles.logo, { width: 125, height: 125 }]}
          />
        </TouchableOpacity>

        {/* Card de login */}
        <View style={styles.card}>
          <Text style={styles.label}>E-mail Poliedro</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#555"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#555"
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
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
  logoWrapper: {
    position: 'absolute',
    top: 30,
    left: 40,
    zIndex: 10,
  },
  logo: {
    resizeMode: 'contain',
    borderRadius: 20,
  },
  card: {
    width: '90%',
    maxWidth: 600,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    width: '100%',
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#e5e5e5',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
