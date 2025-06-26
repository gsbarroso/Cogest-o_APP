import React, { useState, useEffect } from 'react';
import { FlatList, Modal, Alert, View, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth'; // 1. Importa o hook para saber quem está logado

import {
  Container,
  List,
  UserItemContainer,
  UserInfo,
  UserName,
  UserRole,
  UserEmail,
  ActionContainer,
  ActionButton,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalInput
} from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';

export default function Manager({ navigation }) {
  const { user: loggedInUser } = useAuth(); // Pega os dados do utilizador logado
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para controlar o Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedRole, setEditedRole] = useState('');
  const [editedEmail, setEditedEmail] = useState(''); // NOVO ESTADO para o e-mail

  // Busca os utilizadores da API quando o ecrã carrega
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data.data.users);
    } catch (error) {
      Alert.alert('Erro', 'A sua sessão expirou ou não tem permissão para ver esta página.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Abre o modal com os dados do utilizador selecionado
  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setEditedName(user.nome);
    setEditedRole(user.cargo);
    setEditedEmail(user.email); // Adicionado: define o e-mail atual no estado
    setModalVisible(true);
  };

  // Função para salvar as alterações no banco de dados
  const handleSaveChanges = async () => {
    if (!editedName || !editedRole || !editedEmail) {
      Alert.alert('Atenção', 'Todos os campos devem ser preenchidos.');
      return;
    }
    try {
      // Adicionado: envia o e-mail no corpo da requisição PUT
      await api.put(`/users/${selectedUser._id}`, {
        nome: editedName, 
        cargo: editedRole,
        email: editedEmail,
      });
      
      Alert.alert('Sucesso', 'Utilizador atualizado com sucesso!');
      setModalVisible(false);
      fetchUsers();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Não foi possível atualizar o utilizador.';
      Alert.alert('Erro', errorMessage);
    }
  };

  const handleDeleteUser = (userId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem a certeza que deseja excluir este utilizador?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          onPress: async () => {
            try {
              await api.delete(`/users/${userId}`);
              Alert.alert('Sucesso', 'Utilizador eliminado.');
              fetchUsers();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível eliminar o utilizador.');
            }
          },
          style: 'destructive' 
        }
      ]
    );
  };

  // Componente para renderizar cada item da lista
  const renderUserItem = ({ item }) => (
    <UserItemContainer>
      <UserInfo>
        <UserName>{item.nome}</UserName>
        <UserRole>{item.cargo}</UserRole>
        <UserEmail>{item.email}</UserEmail>
      </UserInfo>
      {loggedInUser && loggedInUser.cargo === 'Admin' && (
        <ActionContainer>
          <ActionButton onPress={() => handleOpenEditModal(item)}>
            <Feather name="edit-2" size={24} color="#fdd835" />
          </ActionButton>
          <ActionButton onPress={() => handleDeleteUser(item._id)}>
            <Feather name="trash-2" size={24} color="#e53935" />
          </ActionButton>
        </ActionContainer>
      )}
    </UserItemContainer>
  );

  return (
    <Container>
      <Header onPress={() => navigation.goBack()} />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#fdd835" />
        </View>
      ) : (
        <List>
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
          />
        </List>
      )}
      
      {isModalVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ModalContainer>
            <ModalContent>
              <ModalTitle>Editar Utilizador</ModalTitle>
              <ModalInput value={editedName} onChangeText={setEditedName} placeholder="Nome do utilizador" />
              <ModalInput value={editedRole} onChangeText={setEditedRole} placeholder="Cargo do utilizador" />
              {/* Adicionado: campo para editar o e-mail */}
              <ModalInput 
                value={editedEmail} 
                onChangeText={setEditedEmail} 
                placeholder="E-mail do utilizador" 
                keyboardType="email-address" 
                autoCapitalize="none" 
              />
              <Button onPress={handleSaveChanges}>GUARDAR ALTERAÇÕES</Button>
              <View style={{marginTop: 10}}>
                <Button onPress={() => setModalVisible(false)}>CANCELAR</Button>
              </View>
            </ModalContent>
          </ModalContainer>
        </Modal>
      )}
    </Container>
  );
}
