import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
  <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />

      {/* BOTÃO LOGIN NO TOPO DIREITO */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* TÍTULO CENTRAL */}
      <Text style={styles.title}>PoliEducação</Text>

      {/* BOTÕES CENTRAIS */}
      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Quiz')}>
        <Text style={styles.buttonText}>Jogar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Ranking')}>
        <Text style={styles.buttonText}>Ranking</Text>
      </TouchableOpacity>

      {/* MASCOTE */}
    <Image source={require('../../../assets/images/professor.png')} style={styles.mascot} />
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
    left: 20,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  loginButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#E6E6E6',
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  loginText: {
    fontWeight: '600',
    fontSize: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 60,
    fontFamily: 'serif',
  },
  actionButton: {
    backgroundColor: '#F39C12',
    width: 250,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 20,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  mascot: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
