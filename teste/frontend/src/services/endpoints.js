import api from './api';

// --- Serviço de Autenticação ---

/**
 * Envia as credenciais para a rota de login.
 * @param {object} credentials - Objeto com email e senha.
 * @returns {Promise<object>} A resposta da API com o token e os dados do usuário.
 */
export async function loginRequest(credentials) {
  const { data } = await api.post('/auth/login', credentials);
  return data;
}


// --- Serviço de Usuários ---

/**
 * Busca a lista completa de usuários.
 * @returns {Promise<object>} A lista de usuários.
 */
export async function getUsers() {
  const { data } = await api.get('/users');
  return data;
}

/**
 * Cria um novo usuário no banco de dados.
 * @param {object} userData - Os dados do novo usuário (nome, email, cargo, etc.).
 * @returns {Promise<object>} Os dados do usuário recém-criado.
 */
export async function createUser(userData) {
  const { data } = await api.post('/users', userData);
  return data;
}

/**
 * Atualiza os dados de um usuário específico.
 * @param {string} id - O ID do usuário a ser atualizado.
 * @param {object} updatedData - Os novos dados para o usuário.
 * @returns {Promise<object>} Os dados do usuário atualizado.
 */
export async function updateUser(id, updatedData) {
  const { data } = await api.put(`/users/${id}`, updatedData);
  return data;
}

/**
 * Deleta um usuário específico.
 * @param {string} id - O ID do usuário a ser deletado.
 * @returns {Promise<object>} A mensagem de sucesso da API.
 */
export async function deleteUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}