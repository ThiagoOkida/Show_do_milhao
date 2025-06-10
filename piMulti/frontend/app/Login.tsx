import React, { useState } from 'react'; // Importar useState
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  useWindowDimensions,
  Alert, // Para exibir mensagens de erro/sucesso
  ActivityIndicator, // Para mostrar um indicador de carregamento
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

// Supondo que você tenha uma URL para o seu backend.
// Substitua pela URL real do seu backend (local ou de produção).
const API_BASE_URL = 'http://localhost:3000/api'; // Exemplo: seu backend está rodando na porta 5000

export const unstable_settings = {
  initialRouteName: 'Login',
};

export default function Login() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // 1. Estados para armazenar email e senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para o indicador de carregamento

  const logoSize = width < 400 ? 80 : width < 700 ? 100 : 150;
  const isSmallMascot = width < 1253;

  const mascotSize = isSmallMascot ? 250 : 500;

  // 2. Função para lidar com o login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro de Login', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true); // Ativa o indicador de carregamento

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, { // Assumindo rota de login no backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 4. Tratamento de Sucesso
        Alert.alert('Login Bem-Sucedido', data.message || 'Bem-vindo!');
        // Se o backend retornar um token ou informações do usuário, salve-as
        // Exemplo: AsyncStorage.setItem('userToken', data.token);
        // Exemplo: AsyncStorage.setItem('userInfo', JSON.stringify(data.user));

        // 5. Navegação Condicional
        // Você precisaria de alguma lógica para determinar se é professor ou aluno
        // e para qual tela navegar. Isso viria dos dados de 'data.user' do backend.
        // Por exemplo, se o backend retornar `data.user.isProfessor`:
        if (data.user && data.user.isProfessor) {
          router.replace('/HomePageProfessor'); // Navega para a tela do professor
        } else {
          router.replace('/'); // Navega para a tela do aluno
        }
      } else {
        // 4. Tratamento de Falha
        Alert.alert('Erro de Login', data.message || 'Credenciais inválidas.');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

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
            keyboardType="email-address" // Teclado apropriado para e-mail
            autoCapitalize="none" // Não capitalizar a primeira letra
            value={email}
            onChangeText={setEmail} // Conecta o input ao estado 'email'
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#555"
            secureTextEntry
            value={password}
            onChangeText={setPassword} // Conecta o input ao estado 'password'
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin} // Chama a função handleLogin ao pressionar o botão
            disabled={loading} // Desabilita o botão enquanto o carregamento está ativo
          >
            {loading ? (
              <ActivityIndicator color="#000" /> // Mostra o spinner enquanto carrega
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
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