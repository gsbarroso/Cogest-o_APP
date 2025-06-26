import axios from 'axios';

// Substitua SEU_IP_LOCAL pelo IP que você encontrou no passo anterior.
const BASE_URL = 'http://192.168.178.117:3000/api'; 

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;