import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa suas telas
import IndexScreen from './app/index';
import LoginScreen from './app/Login';
import SelecaoMateria from './app/SelecaoMateria';
import AuthProvider  from './app/hooks/authContext'; // <= AQUI

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider> {/* <= ENGLOBA TUDO */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={IndexScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SelecaoMateria" component={SelecaoMateria} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
