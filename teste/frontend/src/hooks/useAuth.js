// Caminho: src/hooks/useAuth.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { loginRequest } from '../services/endpoints';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Este hook agora limpa a sessão ao iniciar a app.
  useEffect(() => {
    async function clearSessionOnStartup() {
      // CORREÇÃO: Limpa qualquer token ou utilizador guardado anteriormente.
      // Isto garante que o estado 'signed' será sempre 'false' no arranque.
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
      return { success: true };
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