import { useAuth } from "@/app/hooks/authContext"; 
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const API_BASE_URL = "http://localhost:3000/api";

export const unstable_settings = {
  initialRouteName: "Login",
};

export default function Login() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const logoSize = width < 400 ? 80 : width < 700 ? 100 : 150;
  const isSmallMascot = width < 1253;
  const mascotSize = isSmallMascot ? 250 : 500;
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro de Login", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("🔍 Dados recebidos do backend:", data);

      if (response.ok) {
        Alert.alert("Login Bem-Sucedido", data.message || "Bem-vindo!");

        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log(
            "Token salvo no localStorage:",
            localStorage.getItem("token")
          );
        }

        if (data.user) {
          login(data.user); 
        }

        if (data.user?.isProfessor) {
          router.replace("/HomePageProfessor");
        } else {
          router.replace("/");
        }
      } else {
        Alert.alert("Erro de Login", data.message || "Credenciais inválidas.");
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.logoWrapper}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={[styles.logo, { width: 125, height: 125 }]}
          />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.label}>E-mail Poliedro</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#555"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#555"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
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
    backgroundColor: "#16C5D1",
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    position: "absolute",
    top: 30,
    left: 40,
    zIndex: 10,
  },
  logo: {
    resizeMode: "contain",
    borderRadius: 20,
  },
  card: {
    width: "90%",
    maxWidth: 600,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    width: "100%",
    backgroundColor: "#e5e5e5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#e5e5e5",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    marginTop: 12,
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
