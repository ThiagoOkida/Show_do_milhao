import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

export default function SelecaoMateria() {
  const router = useRouter();

  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  const materias = [
    { id: 'E', nome: 'Exatas', cor: '#F39C12', imagem: require('../assets/images/exatas.png') },
    { id: 'L', nome: 'Linguagens', cor: '#be6ee0', imagem: require('../assets/images/linguagens.png') },
    { id: 'B', nome: 'Biológicas', cor: '#7ED321', imagem: require('../assets/images/biologicas.png') },
    { id: 'H', nome: 'Humanas', cor: '#a38b52', imagem: require('../assets/images/humanas.png') },
  ];

  const toggleMateria = (id: string) => {
    setSelecionadas(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // ...imports e o restante do componente

const handlePronto = async () => {
  if (selecionadas.length === 0) {
    Alert.alert('Selecione pelo menos uma matéria para continuar.');
    return;
  }
  try {
    const response = await fetch('http://localhost:3000/api/questions/by-knowledge-area', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ knowledgeAreas: selecionadas }),
    });
    if (!response.ok) throw new Error('Erro ao buscar perguntas');
    const perguntas = await response.json();
    router.push({ pathname: '/Jogo', params: { perguntas: JSON.stringify(perguntas) } });
  } catch (error) {
  let errorMsg = 'Erro ao buscar perguntas!';
  if (error instanceof Error) {
    errorMsg = error.message;
  }
  Alert.alert('Erro ao buscar perguntas!', errorMsg);
}

};

// ...e no botão:
<TouchableOpacity style={styles.botaoPronto} onPress={handlePronto}>
  <Text style={styles.textoPronto}>Pronto!</Text>
</TouchableOpacity>


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* Logo como botão de voltar */}
        <TouchableOpacity onPress={() => router.push('/')} style={styles.logoWrapper}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Conteúdo central (matérias) */}
        <View style={styles.content}>
          <View style={styles.grid}>
            {materias.map(materia => (
              <TouchableOpacity
                key={materia.id}
                onPress={() => toggleMateria(materia.id)}
                style={[styles.materiaBox, { backgroundColor: materia.cor }]}
              >
                {selecionadas.includes(materia.id) && (
                  <Text style={styles.check}>✓</Text>
                )}
                <Image source={materia.imagem} style={styles.icon} />
                <Text style={styles.materiaText}>{materia.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Botão pronto e voltar */}
        <View style={styles.botoesInferiores}>
          <TouchableOpacity style={styles.botaoPronto} onPress={handlePronto}>
            <Text style={styles.textoPronto}>Pronto!</Text>
          </TouchableOpacity>
          <Text style={styles.voltarTexto} onPress={() => router.push('/')}>{'< Voltar'}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16C5D1',
    paddingHorizontal: 16,
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },
  materiaBox: {
    width: 240,
    height: 240,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  check: {
    position: 'absolute',
    top: 6,
    left: 8,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  materiaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botoesInferiores: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  botaoPronto: {
    backgroundColor: '#F39C12',
    paddingVertical: 18,
    paddingHorizontal: 70,
    borderRadius: 50,
    marginBottom: 8,
  },
  textoPronto: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'serif',
  },
  voltarTexto: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
