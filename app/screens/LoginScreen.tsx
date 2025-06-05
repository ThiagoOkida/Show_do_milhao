import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Logo topo */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

      {/* Card de login */}
      <View style={styles.card}>
        {/* Botão Voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.label}>E-mail Poliedro</Text>
        <TextInput style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#888" />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry placeholderTextColor="#888" />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.professorButton}>
          <Text style={styles.professorText}>Professor</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    top: 40,
    left: 30,
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  card: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 24,
    elevation: 8,
  },
  backButton: {
    marginBottom: 12,
  },
  backArrow: {
    fontSize: 22,
    color: '#fff',
    backgroundColor: '#F39C12',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#F39C12',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  professorButton: {
    backgroundColor: '#E6E6E6',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
  },
  professorText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
  },
});
