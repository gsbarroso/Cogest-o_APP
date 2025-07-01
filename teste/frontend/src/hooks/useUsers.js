import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import api from '../services/api';
import { getUsers, createUser, updateUser, deleteUser as deleteUserRequest } from '../services/endpoints';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data.users);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os utilizadores.');
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUser = async (userData) => {
    try {
      await createUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Erro no registo.' };
    }
  };

  const updateUserHook = async (userId, updatedData) => {
    try {
      await updateUser(userId, updatedData);
      fetchUsers();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Erro ao atualizar.' };
    }
  };

  const deleteUserHook = async (userId) => {
    try {
      // Usamos deleteUserRequest para evitar conflito de nomes
      await deleteUserRequest(userId);
      fetchUsers();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao eliminar.' };
    }
  };

  // Renomeamos as funções no retorno para evitar conflitos nas páginas
  return { users, loading, fetchUsers, registerUser, updateUser: updateUserHook, deleteUser: deleteUserHook };
};