import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";

// Progressão de prêmios
const PROGRESSAO = [
  0,
  1000,
  5000,
  10000,
  50000, // checkpoint 1
  100000,
  300000,
  500000,
  1000000, // checkpoint 2
];
const CHECKPOINTS = [0, 3, 6]; // Índices de checkpoint (questão 0, 4 e 8)

// Função para encontrar último checkpoint atingido
function getLastCheckpoint(idx: number) {
  let last = 0;
  for (const cp of CHECKPOINTS) {
    if (idx >= cp) last = cp;
    else break;
  }
  return last;
}

export default function Jogo() {
  const router = useRouter();
  const { perguntas } = useLocalSearchParams();

  let listaPerguntas: any[] = [];
  if (typeof perguntas === "string") {
    try {
      listaPerguntas = JSON.parse(perguntas);
    } catch {
      listaPerguntas = [];
    }
  } else if (Array.isArray(perguntas)) {
    listaPerguntas = perguntas;
  }

  // Estados do jogo
  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [respostaCorreta, setRespostaCorreta] = useState<boolean | null>(null);
  const [errou, setErrou] = useState(false);

  // Mantém alternativas fixas para cada pergunta (não embaralha novamente)
  const alternativasFixas = useMemo(() => {
    return listaPerguntas.map((pergunta) => {
      const alts = [pergunta.correctAnswer, ...pergunta.wrongAnswers];
      // Embaralha UMA vez ao iniciar o jogo
      for (let i = alts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alts[i], alts[j]] = [alts[j], alts[i]];
      }
      return alts;
    });
  }, [perguntas]);

  if (!listaPerguntas.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nenhuma pergunta disponível.</Text>
      </View>
    );
  }

  const perguntaAtual = listaPerguntas[indice];
  const alternativas = alternativasFixas[indice];

  // Calcula prêmio atual e checkpoints
  const premioAtual = PROGRESSAO[indice];
  const idxCheckpoint = getLastCheckpoint(indice);
  const premioCheckpoint = PROGRESSAO[idxCheckpoint];

  function handleResponder(alternativa: string) {
    if (respostaSelecionada !== null) return;
    setRespostaSelecionada(alternativa);
    const correta = alternativa === perguntaAtual.correctAnswer;
    setRespostaCorreta(correta);
    if (correta) {
      setAcertos((a) => a + 1);
    } else {
      setErrou(true);
      setShowResult(true);
    }
  }

  function handleProxima() {
    setRespostaSelecionada(null);
    setRespostaCorreta(null);
    if (indice < listaPerguntas.length - 1) {
      setIndice((i) => i + 1);
    } else {
      setShowResult(true);
    }
  }

  // Fim de jogo (encerra ao errar OU ao finalizar todas)
  if (showResult) {
    // Calcula o prêmio final
    const premioFinal = errou ? premioCheckpoint : PROGRESSAO[indice];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.premioInfo}>
            Prêmio final: R$ {premioFinal.toLocaleString("pt-BR")}
          </Text>
        </View>
        <View style={styles.finalContainer}>
          <Text style={styles.finalText}>
            {errou ? "Você errou! Fim de jogo." : "Quiz finalizado!"}
          </Text>
          <Text style={styles.finalText}>
            Acertos: {acertos} / {listaPerguntas.length}
          </Text>
          <Text style={styles.finalText}>
            {errou
              ? `Você ficou com R$ ${premioCheckpoint.toLocaleString("pt-BR")} `
              : `Você ganhou R$ ${premioFinal.toLocaleString("pt-BR")}`}
          </Text>
          {/* Botão de reiniciar ou ir para ranking */}
          <TouchableOpacity
            style={[styles.proximaBtn, { marginTop: 32 }]}
            onPress={() => router.push("/")}
          >
            <Text style={styles.proximaTxt}>Voltar ao início</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* Barra superior: prêmio */}
        <View style={styles.topBar}>
          <Text style={styles.premioInfo}>
            Prêmio atual: R$ {premioAtual.toLocaleString("pt-BR")}
          </Text>
          <Text style={styles.checkpointText}>
            Último checkpoint: R$ {premioCheckpoint.toLocaleString("pt-BR")}
          </Text>
        </View>
        <View style={styles.quizWrapper}>
          <View style={styles.enunciadoBox}>
            <Text style={styles.enunciadoTexto}>
              {perguntaAtual.questionText}
            </Text>
          </View>
          {/* Alternativas */}
          <View style={styles.alternativasContainer}>
            {alternativas.map((alt: string, idx: number) => {
              let backgroundColor = "#E5E5E5";
              if (respostaSelecionada) {
                if (alt === respostaSelecionada) {
                  backgroundColor = respostaCorreta
                    ? "#7ED321"
                    : "#FF5C5C";
                } else if (!respostaCorreta && alt === perguntaAtual.correctAnswer) {
                  backgroundColor = "#7ED321";
                }
              }
              return (
                <TouchableOpacity
                  key={alt + idx}
                  style={[styles.alternativa, { backgroundColor }]}
                  onPress={() => handleResponder(alt)}
                  disabled={respostaSelecionada !== null}
                >
                  <Text style={styles.textoAlternativa}>{alt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* Feedback e botão de próxima */}
          {respostaSelecionada && !errou && (
            <View style={{ alignItems: "center", marginTop: 24 }}>
              <Text style={styles.feedbackMsg}>
                {respostaCorreta ? "Correto!" : "Errado!"}
              </Text>
              <TouchableOpacity
                style={styles.proximaBtn}
                onPress={handleProxima}
              >
                <Text style={styles.proximaTxt}>
                  {indice === listaPerguntas.length - 1
                    ? "Finalizar"
                    : "Próxima"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {respostaSelecionada && errou && (
            <Text style={styles.feedbackMsg}>Errado! Você ficou com o valor do último checkpoint.</Text>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16C5D1",
    width: "100%",
    height: "100%",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: width > 900 ? 60 : 20,
    paddingTop: 20,
    gap: 24,
  },
  premioInfo: {
    fontSize: width > 900 ? 22 : 16,
    color: "#000",
    fontWeight: "bold",
    textAlign: "right",
  },
  checkpointText: {
    fontSize: width > 900 ? 16 : 13,
    color: "#444",
    fontStyle: "italic",
    textAlign: "right",
    marginLeft: 16,
    marginTop: 3,
  },
  quizWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: width > 900 ? 30 : 0,
  },
  enunciadoBox: {
    width: width > 900 ? "50%" : "90%",
    minWidth: 320,
    backgroundColor: "#E5E5E5",
    borderRadius: 40,
    padding: width > 900 ? 36 : 22,
    marginBottom: 28,
    alignItems: "center",
    alignSelf: "center",
  },
  enunciadoTexto: {
    fontSize: width > 900 ? 28 : 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  alternativasContainer: {
    width: width > 900 ? "50%" : "90%",
    minWidth: 320,
  },
  alternativa: {
    borderRadius: 30,
    paddingVertical: width > 900 ? 26 : 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#E5E5E5",
    width: "100%",
  },
  textoAlternativa: {
    fontSize: width > 900 ? 23 : 18,
    fontFamily: "sans-serif",
  },
  feedbackMsg: {
    fontSize: width > 900 ? 26 : 20,
    fontWeight: "bold",
    color: "#222",
    marginTop: 12,
    textAlign: "center",
  },
  proximaBtn: {
    marginTop: 20,
    backgroundColor: "#F39C12",
    borderRadius: 30,
    alignSelf: "center",
    paddingHorizontal: 40,
    paddingVertical: 18,
  },
  proximaTxt: {
    fontSize: width > 900 ? 22 : 18,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "sans-serif",
  },
  finalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  finalText: {
    fontSize: width > 900 ? 36 : 28,
    fontWeight: "bold",
    marginTop: 30,
    color: "#000",
    textAlign: "center",
  },
});
