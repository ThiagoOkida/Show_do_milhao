import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const subjects = [
  { id: 'exatas', label: 'Exatas', color: '#F39C12', icon: require('../../assets/icons/exatas.png') },
  { id: 'linguagens', label: 'Linguagens', color: '#D72D66', icon: require('../../assets/icons/linguagens.png') },
  { id: 'biologicas', label: 'Biológicas', color: '#6FCF97', icon: require('../../assets/icons/biologicas.png') },
  { id: 'humanas', label: 'Humanas', color: '#F6EB61', icon: require('../../assets/icons/humanas.png') },
];

export default function SubjectSelectionScreen() {
  const navigation = useNavigation<any>();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const renderSubject = ({ item }: { item: typeof subjects[0] }) => {
    const selected = selectedSubjects.includes(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.subjectButton,
          { backgroundColor: item.color },
          selected && styles.selected,
        ]}
        onPress={() => toggleSubject(item.id)}
      >
        <Image source={item.icon} style={styles.subjectIcon} />
        <Text style={styles.subjectLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

      {/* Lista de matérias */}
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={renderSubject}
        horizontal
        contentContainerStyle={styles.subjectList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Botão Pronto */}
      <TouchableOpacity style={styles.readyButton}>
        <Text style={styles.readyText}>Pronto!</Text>
      </TouchableOpacity>

      {/* Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{'< Voltar'}</Text>
      </TouchableOpacity>
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
    top: 30,
    left: 20,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  subjectList: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
    gap: 20,
  },
  subjectButton: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderWidth: 3,
    borderColor: '#000',
  },
  subjectIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  subjectLabel: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  readyButton: {
    backgroundColor: '#F39C12',
    marginTop: 60,
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 50,
  },
  readyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  backText: {
    marginTop: 20,
    fontSize: 14,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});