import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROGRESSAO = [
  0, 1000, 5000, 10000, 50000, 100000, 300000, 500000, 1000000,
];
const CHECKPOINTS = [0, 3, 6];

const MAX_ALTERNATIVAS = 4;

function getLastCheckpoint(idx: number) {
  let last = 0;
  for (const cp of CHECKPOINTS) {
    if (idx >= cp) last = cp;
    else break;
  }
  return last;
}

async function atualizarPontuacao(score: number) {
  try {
    const token = localStorage.getItem("token");
    console.log('DEBUG: Chamou atualizarPontuacao com score:', score);
    console.log('DEBUG: Token recuperado no localStorage:', token);
    if (!token) return;
    await fetch('http://localhost:3000/api/users/score', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score }),
    });
    console.log('DEBUG: Fetch PUT enviado com score:', score);
  } catch (err) {
    console.error('Erro ao atualizar pontuação:', err);
    
  }
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

  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [respostaCorreta, setRespostaCorreta] = useState<boolean | null>(null);
  const [errou, setErrou] = useState(false);
  const [alternativasVisiveis, setAlternativasVisiveis] = useState<string[]>([]);
  const [alternativasEliminadas, setAlternativasEliminadas] = useState<string[]>([]);

  const [pulosRestantes, setPulosRestantes] = useState(2);
  const [cartasRestantes, setCartasRestantes] = useState(1);

  const alternativasFixas = useMemo(() => {
    return listaPerguntas.map((pergunta) => {
      const alts = [pergunta.correctAnswer, ...pergunta.wrongAnswers];
      for (let i = alts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alts[i], alts[j]] = [alts[j], alts[i]];
      }
      return alts;
    });
  }, [perguntas]);

  useEffect(() => {
    if (alternativasFixas[indice]) {
      setAlternativasVisiveis(alternativasFixas[indice]);
      setAlternativasEliminadas([]); 
    }
  }, [indice, alternativasFixas]);

  useEffect(() => {
    if (showResult) {
      console.log('DEBUG: useEffect chamado após finalizar quiz!');
      const premioFinal = errou ? PROGRESSAO[getLastCheckpoint(indice)] : PROGRESSAO[indice];
      atualizarPontuacao(premioFinal);
    }
  }, [showResult]);

  if (!listaPerguntas.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nenhuma pergunta disponível.</Text>
      </View>
    );
  }

  const perguntaAtual = listaPerguntas[indice];
  const alternativas = alternativasVisiveis;

  const premioAtual = PROGRESSAO[indice];
  const idxCheckpoint = getLastCheckpoint(indice);
  const premioCheckpoint = PROGRESSAO[idxCheckpoint];

  const isUltimaPergunta = indice === listaPerguntas.length - 1;

  function handleResponder(alternativa: string) {
    if (respostaSelecionada !== null) return;
    if (alternativasEliminadas.includes(alternativa)) return;
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

  function handlePular() {
    if (respostaSelecionada !== null) return;
    if (isUltimaPergunta) return;
    setPulosRestantes(pulosRestantes - 1);
    handleProxima();
  }

  function handleCartas() {
    if (respostaSelecionada !== null) return;
    if (isUltimaPergunta) return;
    if (cartasRestantes <= 0) return;
    const incorretas = alternativas.filter(
      (alt) =>
        alt !== perguntaAtual.correctAnswer &&
        !alternativasEliminadas.includes(alt)
    );
    if (incorretas.length === 0) return;
    const qtdRemover = Math.min(
      Math.floor(Math.random() * (incorretas.length)) + 1,
      incorretas.length
    );
    const removidas = incorretas
      .sort(() => 0.5 - Math.random())
      .slice(0, qtdRemover);
    setAlternativasEliminadas((prev) => [...prev, ...removidas]);
    setCartasRestantes(cartasRestantes - 1);
  }

  if (showResult) {
    const premioFinal = errou ? premioCheckpoint : PROGRESSAO[indice];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredBar}>
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
        <View style={styles.centeredBar}>
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

          {/* Bloco de alternativas sempre ocupa altura máxima */}
          <View style={styles.alternativasBloco}>
            {[...Array(MAX_ALTERNATIVAS)].map((_, i) => {
              const alt = alternativas[i];
              if (alt) {
                let backgroundColor = "#E5E5E5";
                let disabled = false;
                if (alternativasEliminadas.includes(alt)) {
                  backgroundColor = "#FF5C5C"; 
                  disabled = true;
                } else if (respostaSelecionada) {
                  if (alt === respostaSelecionada) {
                    backgroundColor = respostaCorreta ? "#7ED321" : "#FF5C5C";
                  } else if (
                    !respostaCorreta &&
                    alt === perguntaAtual.correctAnswer
                  ) {
                    backgroundColor = "#7ED321";
                  }
                  disabled = true;
                }
                return (
                  <TouchableOpacity
                    key={alt + i}
                    style={[styles.alternativa, { backgroundColor }]}
                    onPress={() => handleResponder(alt)}
                    disabled={disabled}
                  >
                    <Text style={styles.textoAlternativa}>{alt}</Text>
                  </TouchableOpacity>
                );
              }

              return (
                <View key={"vazio_" + i} style={styles.alternativaVazia} />
              );
            })}
          </View>

          {/* Lifelines abaixo do bloco de alternativas */}
          {!respostaSelecionada && (
            <View style={styles.lifelinesRow}>
              <TouchableOpacity
                onPress={handlePular}
                style={[
                  styles.lifelineBtn,
                  (isUltimaPergunta || pulosRestantes === 0) && { opacity: 0.5 }
                ]}
                disabled={isUltimaPergunta || pulosRestantes === 0}
              >
                <Image
                  source={require("../assets/images/pular.png")}
                  style={styles.lifelineIcon}
                />
                <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                  {pulosRestantes}x
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCartas}
                style={[
                  styles.lifelineBtn,
                  (isUltimaPergunta || cartasRestantes === 0) && { opacity: 0.5 }
                ]}
                disabled={isUltimaPergunta || cartasRestantes === 0}
              >
                <Image
                  source={require("../assets/images/carta.png")}
                  style={styles.lifelineIcon}
                />
                <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                  {cartasRestantes}x
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Feedback e botão de próxima/finalizar */}
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
            <Text style={styles.feedbackMsg}>
              Errado! Você ficou com o valor do último checkpoint.
            </Text>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16C5D1",
    width: "100%",
    height: "100%",
  },
  centeredBar: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: width > 900 ? 36 : 16,
    marginBottom: width > 900 ? 36 : 18,
  },
  premioInfo: {
    fontSize: width > 900 ? 26 : 18,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  checkpointText: {
    fontSize: width > 900 ? 18 : 13,
    color: "#444",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 6,
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
    marginBottom: 12,
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
  alternativasBloco: {
    width: width > 900 ? "50%" : "90%",
    minWidth: 320,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 0,
    justifyContent: "center",
    alignItems: "stretch",
    minHeight: (width > 900 ? 78 : 58) * MAX_ALTERNATIVAS + 16,
  },
  alternativa: {
    borderRadius: 30,
    paddingVertical: width > 900 ? 26 : 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    minHeight: width > 900 ? 58 : 48,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#E5E5E5",
    width: "100%",
  },
  alternativaVazia: {
    borderRadius: 30,
    marginBottom: 20,
    minHeight: width > 900 ? 58 : 48,
    backgroundColor: "transparent",
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
  lifelinesRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 16,
  },
  lifelineBtn: {
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
  },
  lifelineIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
