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
import { useRouter, Stack } from 'expo-router';
import { useAuth } from '@/hooks/authContext';

export default function HomePageProfessor() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { user, logout } = useAuth();

  const isSmallMascot = width < 1253;
  const mascotSize = isSmallMascot ? 250 : 500;

  const titleSize = 48;
  const buttonFontSize = 24;
  const loginFontSize = 18;
  const buttonPadding = width < 400 ? 12 : 18;

  const jogarButtonWidth = width * 0.6;
  const rankingButtonWidth = width * 0.5;
  const questoesButtonWidth = width * 0.4;

  const handleLoginLogout = () => {
    if (user) {
      logout();
      router.replace('/'); // volta para a página inicial
    } else {
      router.push('/Login');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/images/logo.png')}
          style={[styles.logo, { width: 125, height: 125 }]}
        />

        {/* Botão de login/logout */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            user && { backgroundColor: '#e74c3c' }, // vermelho se logado
          ]}
          onPress={handleLoginLogout}
        >
          <Text
            style={[
              styles.loginText,
              { fontSize: loginFontSize },
              user && { color: '#fff' }, // branco se logado
            ]}
          >
            {user ? 'Logout' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Título e botões */}
        <View style={styles.content}>
          <Text style={[styles.title, { fontSize: titleSize }]}>PoliEducação</Text>

          <TouchableOpacity
            style={[styles.actionButton, { width: jogarButtonWidth, paddingVertical: buttonPadding }]}
            onPress={() => router.push('/SelecaoMateria')}
          >
            <Text style={[styles.buttonText, { fontSize: buttonFontSize }]}>Jogar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { width: rankingButtonWidth, paddingVertical: buttonPadding }]}
            onPress={() => router.push('/Ranking')}
          >
            <Text style={[styles.buttonText, { fontSize: buttonFontSize }]}>Ranking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { width: questoesButtonWidth, paddingVertical: buttonPadding }]}
            onPress={() => router.push('/Questoes')}
          >
            <Text style={[styles.buttonText, { fontSize: buttonFontSize }]}>Questões</Text>
          </TouchableOpacity>
        </View>

        {/* Mascote */}
        <Image
          source={require('../assets/images/professor.png')}
          style={[styles.mascot, { width: mascotSize, height: mascotSize }]}
        />
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
    color: '#000', // cor padrão (preto)
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
