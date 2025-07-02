// Caminho: src/services/api.js
// Responsabilidade: Configurar o Axios com o endereço correto do backend.

import axios from 'axios';
import useAuthStore from '../stores/authStore';

// =================================================================
// CORREÇÃO PRINCIPAL: Substitua 'localhost' pelo IP da sua máquina.
// =================================================================

// 1. Encontre o seu IP (instruções abaixo).
// 2. Substitua o IP no URL abaixo.
// 3. Verifique se a porta (ex: 3000) é a mesma que o seu backend está a usar.
const baseURL = 'http://192.168.39.117:3000/api';

const api = axios.create({ baseURL });

// O interceptor continua o mesmo, adicionando o token a todas as requisições.
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;