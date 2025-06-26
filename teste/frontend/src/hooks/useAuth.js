import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

// 1. Cria o Contexto
const AuthContext = createContext({});

// 2. Cria o Provedor (AuthProvider)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para carregar os dados do usuário do AsyncStorage
  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@user');
      const storagedToken = await AsyncStorage.getItem('@token');

      if (storagedUser && storagedToken) {
        // Se temos um token, configuramos o header do Axios para futuras requisições
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  // Função de Login
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email: email.toLowerCase(),
        senha: password,
      });

      const { token, data } = response.data;
      
      setUser(data.user);

      // Configura o header do Axios para todas as requisições autenticadas
      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Salva os dados no AsyncStorage
      await AsyncStorage.setItem('@user', JSON.stringify(data.user));
      await AsyncStorage.setItem('@token', token);

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Não foi possível fazer o login.';
      return { success: false, error: errorMessage };
    }
  };

  // Função de Logout
  const logout = async () => {
    // Limpa o AsyncStorage
    await AsyncStorage.clear();
    // Reseta o estado do usuário
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Cria o Hook (useAuth)
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider.');
  }
  return context;
}

export { AuthProvider, useAuth };