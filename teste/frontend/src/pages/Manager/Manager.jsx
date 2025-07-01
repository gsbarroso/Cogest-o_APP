// =================================================================
// 2. PÁGINA MANAGER CORRIGIDA
// Caminho: src/pages/Manager/Manager.jsx
// =================================================================

import React, { useState, useEffect } from 'react';
import { FlatList, Modal, Alert, View, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
// CORREÇÃO: Importando os hooks diretamente dos seus ficheiros.
import { useAuth } from '../../hooks/useAuth'; 
import { useUsers } from '../../hooks/useUsers'; 

import {
  Container, List, UserItemContainer, UserInfo, UserName, UserRole, UserEmail,
  ActionContainer, ActionButton, ModalContainer, ModalContent, ModalTitle, ModalInput
} from './styles';
import Header from '../../components/Header/index.js';
import Button from '../../components/Button/index.js';

export default function Manager({ navigation }) {
  const { user: loggedInUser } = useAuth();
  const { users, loading, fetchUsers, updateUser, deleteUser } = useUsers();
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedRole, setEditedRole] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setEditedName(user.nome);
    setEditedRole(user.cargo);
    setEditedEmail(user.email);
    setModalVisible(true);
  };

  const handleSaveChanges = async () => {
    if (!editedName || !editedRole || !editedEmail) {
      Alert.alert('Atenção', 'Todos os campos devem ser preenchidos.');
      return;
    }
    const result = await updateUser(selectedUser._id, {
      nome: editedName, cargo: editedRole, email: editedEmail,
    });
    if (result.success) {
      Alert.alert('Sucesso', 'Utilizador atualizado!');
      setModalVisible(false);
    } else {
      Alert.alert('Erro', result.error);
    }
  };

  const handleDeleteUser = (userId) => {
    Alert.alert("Confirmar Exclusão", "Tem a certeza que deseja excluir este utilizador?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Excluir", 
        onPress: async () => {
          const result = await deleteUser(userId);
          if (!result.success) {
            Alert.alert('Erro', result.error);
          } else {
            Alert.alert('Sucesso', 'Utilizador eliminado.');
          }
        },
        style: 'destructive' 
      }
    ]);
  };

  const renderUserItem = ({ item }) => (
    <UserItemContainer>
      <UserInfo>
        <UserName>{item.nome}</UserName>
        <UserRole>{item.cargo}</UserRole>
        <UserEmail>{item.email}</UserEmail>
      </UserInfo>
      {loggedInUser?.cargo === 'Admin' && (
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
              <ModalInput 
                value={editedEmail} onChangeText={setEditedEmail} placeholder="E-mail do utilizador" 
                keyboardType="email-address" autoCapitalize="none" 
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