// =================================================================
// 2. ARQUIVO DE ROTAS CORRIGIDO COM IMPORTAÇÕES DIRETAS
// Caminho: src/routes/index.js
// =================================================================

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';

// CORREÇÃO DEFINITIVA: Importando cada página diretamente do seu ficheiro .jsx
import Login from '../pages/Login/Login.jsx';
import Cadastro from '../pages/Cadastro/Cadastro.jsx';
import Home from '../pages/Home/Home.jsx';
import Manager from '../pages/Manager/Manager.jsx';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Cadastro" component={Cadastro} />
  </AuthStack.Navigator>
);

const AppRoutes = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="Manager" component={Manager} />
  </AppStack.Navigator>
);

const Routes = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#fdd835" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

const MainNavigator = () => (
  <NavigationContainer>
    <Routes />
  </NavigationContainer>
);

export default MainNavigator;