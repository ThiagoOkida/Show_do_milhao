import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function IndexScreen() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();

  const isSmallMascot = width < 1253;

  const logoSize = 100;
  const mascotSize = isSmallMascot ? 250 : 500;
  const titleSize = 40;
  const buttonFontSize = 22;
  const loginFontSize = 18;
  const buttonWidth = 280;
  const buttonPadding = 16;

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/images/logo.png')}
        style={[styles.logo, { width: logoSize, height: logoSize }]}
      />

      {/* Botão de login */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={[styles.loginText, { fontSize: loginFontSize }]}>Login</Text>
      </TouchableOpacity>

      {/* Título e botões */}
      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: titleSize }]}>PoliEducação</Text>

        <TouchableOpacity
          style={[styles.actionButton, { width: buttonWidth, paddingVertical: buttonPadding }]}
          onPress={() => navigation.navigate('SelecaoMateria')} // troque 'Quiz' por 'SelecaoMateria' se essa for a tela de jogo
        >
          <Text style={[styles.buttonText, { fontSize: buttonFontSize }]}>Jogar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { width: buttonWidth, paddingVertical: buttonPadding }]}
          onPress={() => navigation.navigate('Ranking')}
        >
          <Text style={[styles.buttonText, { fontSize: buttonFontSize }]}>Ranking</Text>
        </TouchableOpacity>
      </View>

      {/* Mascote */}
      <Image
        source={require('../../assets/images/professor.png')}
        style={[styles.mascot, { width: mascotSize, height: mascotSize }]}
      />
    </SafeAreaView>
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
    left: 40,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  loginButton: {
    position: 'absolute',
    top: 40,
    right: 40,
    backgroundColor: '#E6E6E6',
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  loginText: {
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#F39C12',
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mascot: {
    position: 'absolute',
    bottom: 0,
    left: 30,
    resizeMode: 'contain',
  },
});
