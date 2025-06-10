import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView, 
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

export default function Jogo() {
  const router = useRouter();

  const alternativas = ['A', 'B', 'C', 'D', 'E'];
  const textoQuestao = 'QUESTÃO: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget.Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolorLorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor';
  const textoAlternativa = 'Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolorLorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolorLorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* Logo com botão de voltar */}
        <TouchableOpacity onPress={() => router.push('/')} style={styles.logoWrapper}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Scroll para conteúdo */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Enunciado */}
          <View style={styles.enunciadoBox}>
            <Text style={styles.enunciadoTexto}>{textoQuestao}</Text>
          </View>

          {/* Alternativas */}
          {alternativas.map((letra, index) => (
            <TouchableOpacity key={letra} style={styles.alternativa}>
              <Text style={styles.letraAlternativa}>{letra}</Text>
              <Text style={styles.textoAlternativa}>{textoAlternativa}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16C5D1',
    paddingTop: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 140,
  },
  logoWrapper: {
    position: 'absolute',
    top: 30,
    left: 40,
    zIndex: 10,
  },
  logo: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  enunciadoBox: {
    backgroundColor: '#E5E5E5',
    borderRadius: 40,
    padding: 30,
    marginBottom: 20,
  },
  enunciadoTexto: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#000',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  alternativasContainer: {
    justifyContent: 'flex-start',
  },
  alternativa: {
    backgroundColor: '#E5E5E5',
    borderRadius: 30,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  letraAlternativa: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 12,
    width: 30,
  },
  textoAlternativa: {
    fontSize: 16,
    flexShrink: 1,
    flexWrap: 'wrap',
    flex: 1,
  },
});
