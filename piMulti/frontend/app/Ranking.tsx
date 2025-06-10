import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function Ranking() {
  const router = useRouter();
  const [expandido, setExpandido] = useState<string | null>(null);

  const ranking = [
    { id: '1', nome: 'João Callado', premiacao: 'R$ 1.000.000,00' },
    { id: '2', nome: 'Thiago Ryuji', premiacao: 'R$ 500.000,00' },
    { id: '3', nome: 'Maria Silva', premiacao: 'R$ 300.000,00' },
    { id: '4', nome: 'Carlos Oliveira', premiacao: 'R$ 100.000,00' },
  ];

  const toggleExpandir = (id: string) => {
    setExpandido(prev => (prev === id ? null : id));
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* Logo com botão */}
        <TouchableOpacity onPress={() => router.push('/')} style={styles.logoWrapper}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        <Text style={styles.titulo}>Ranking</Text>

        <ScrollView style={styles.scrollArea}>
          {ranking.map((item, index) => (
            <View key={item.id} style={styles.cardContainer}>
              <TouchableOpacity
                style={[
                  styles.card,
                  expandido === item.id && styles.cardExpandido,
                ]}
                onPress={() => toggleExpandir(item.id)}
              >
                <Text style={styles.nome}>
                  {index + 1} - {item.nome}
                </Text>
                <Text style={styles.iconeMais}>＋</Text>
              </TouchableOpacity>

              {expandido === item.id && (
                <View style={styles.expandido}>
                  <Text style={styles.premiacaoLabel}>Premiação</Text>
                  <Text style={styles.premiacaoValor}>{item.premiacao}</Text>
                  <Text style={styles.link}>Ver questões &gt;</Text>
                </View>
              )}
            </View>
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
  titulo: {
    textAlign: 'center',
    fontSize: 32,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'white',
  },
  scrollArea: {
    paddingHorizontal: 20,
    marginTop: 140,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#E5E5E5',
    borderRadius: 30,
    padding: 18,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardExpandido: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#666',
  },
  iconeMais: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#F39C12',
  },
  expandido: {
    backgroundColor: '#E5E5E5',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  premiacaoLabel: {
    fontSize: 18,
    color: '#555',
    marginBottom: 6,
  },
  premiacaoValor: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  link: {
    color: '#444',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
