// Caminho: src/hooks/useAuth.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { loginRequest } from '../services/endpoints';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Limpa a sessão ao iniciar para forçar o login, como solicitado anteriormente.
    async function clearSessionOnStartup() {
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
      // CORREÇÃO: Lógica de erro melhorada para diagnóstico
      console.error('[AUTH_HOOK_ERROR]', JSON.stringify(error)); // Log detalhado do erro

      if (error.response) {
        // Erro vindo da API (ex: 401 - E-mail/senha errados)
        return { success: false, error: error.response.data.message };
      } else if (error.request) {
        // Erro de rede: a requisição foi feita mas não houve resposta.
        // Esta é a causa mais provável do seu problema.
        return { success: false, error: 'Não foi possível conectar ao servidor. Verifique a sua rede e o IP da API.' };
      } else {
        // Erro na configuração da requisição
        return { success: false, error: 'Ocorreu um erro inesperado ao tentar fazer login.' };
      }
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