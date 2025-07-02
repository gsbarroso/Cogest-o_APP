// =================================================================
// 1. HOOK DE AUTENTICAÇÃO CORRIGIDO
// Caminho: src/hooks/useAuth.js
// Responsabilidade: Gerir o estado de autenticação e garantir
// que a aplicação comece sempre na tela de Login.
// =================================================================

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { loginRequest } from '../services/endpoints';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // CORREÇÃO: Garante que a aplicação sempre comece deslogada.
  useEffect(() => {
    async function clearSessionOnStartup() {
      // Limpa qualquer token ou utilizador guardado anteriormente.
      // Isto força o estado 'signed' a ser 'false' no arranque.
      await AsyncStorage.clear();
      setLoading(false);
    }
    clearSessionOnStartup();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginRequest({ email, senha: password });
      const { token, data } = response;
      
      setUser(data.user);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      await AsyncStorage.setItem('@user', JSON.stringify(data.user));
      await AsyncStorage.setItem('@token', token);
      
      // Retorna o utilizador para que a página de Login possa usá-lo no modal
      return { success: true, user: data.user }; 
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Erro no login.' };
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}