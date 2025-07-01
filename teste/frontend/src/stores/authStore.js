// Arquivo: src/stores/authStore.js
// Responsabilidade: Gerenciar o estado global de autenticação (token, dados do utilizador)
// e persistir esses dados no dispositivo de forma segura usando Zustand.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 'create' é a função principal do Zustand para criar um store.
const useAuthStore = create(
  // 'persist' é um middleware que guarda automaticamente o estado do store.
  // Sempre que o estado mudar, ele será salvo no local de armazenamento definido.
  persist(
    // A função (set) => ({...}) define o estado inicial e as ações do store.
    // 'set' é uma função usada para atualizar o estado.
    (set) => ({
      // --- ESTADO INICIAL ---
      token: null, // O token de autenticação JWT. Começa como nulo.
      user: null,  // Os dados do utilizador logado. Começa como nulo.

      // --- AÇÕES (FUNÇÕES PARA MODIFICAR O ESTADO) ---
      
      /**
       * Define o token de autenticação no estado.
       * @param {string} token - O token JWT recebido da API.
       */
      setToken: (token) => set({ token }),

      /**
       * Define os dados do utilizador logado no estado.
       * @param {object} user - O objeto de utilizador recebido da API.
       */
      setUser: (user) => set({ user }),

      /**
       * Limpa o estado de autenticação, efetivamente fazendo o logout.
       * Define o token e o utilizador como nulos.
       */
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      // --- CONFIGURAÇÃO DA PERSISTÊNCIA ---
      name: 'auth-storage', // Nome da chave sob a qual os dados serão guardados no AsyncStorage.
      
      // Define o AsyncStorage como o motor de armazenamento.
      // createJSONStorage é necessário para que o Zustand saiba como serializar/desserializar os dados.
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;