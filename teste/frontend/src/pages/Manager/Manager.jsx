// =================================================================
// 6. PÁGINA MANAGER CORRIGIDA
// Caminho: src/pages/Manager/Manager.jsx
// =================================================================

import React, { useState, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { useUsers } from '../../hooks/useUsers';
import { useModal } from '../../hooks/useModal';

import { Container, List, UserItemContainer, UserInfo, UserName, UserRole, UserEmail, ActionContainer, ActionButton, ModalInput } from './styles';
import { MessageText } from '../../components/Modal/styles';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

export default function Manager({ navigation }) {
  const { user: loggedInUser } = useAuth();
  const { users, loading, fetchUsers, updateUser, deleteUser } = useUsers();
  const { showModal, hideModal } = useModal();
  
  const [isEditModalVisible, setEditModalVisible] = useState(false);
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
    setEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
    setSelectedUser(null);
  };

  const handleSaveChanges = async () => {
    if (!editedName || !editedRole || !editedEmail) {
      showModal({ title: 'Atenção', content: <MessageText>Todos os campos devem ser preenchidos.</MessageText> });
      return;
    }
    const result = await updateUser(selectedUser._id, { nome: editedName, cargo: editedRole, email: editedEmail });
    handleCloseEditModal();
    if (result.success) {
      showModal({ title: 'Sucesso', content: <MessageText>Utilizador atualizado!</MessageText> });
    } else {
      showModal({ title: 'Erro', content: <MessageText>{result.error}</MessageText> });
    }
  };

  const handleDeleteUser = (userId, userName) => {
    showModal({
      title: 'Confirmar Exclusão',
      content: <MessageText>Tem a certeza que deseja excluir o utilizador "{userName}"?</MessageText>,
      footer: (
        // CORREÇÃO: Botões empilhados verticalmente
        <>
          <Button onPress={async () => {
            hideModal();
            const result = await deleteUser(userId);
            if (result.success) {
              showModal({ title: 'Sucesso', content: <MessageText>Utilizador eliminado.</MessageText> });
            } else {
              showModal({ title: 'Erro', content: <MessageText>{result.error}</MessageText> });
            }
          }}>Excluir</Button>
          <View style={{marginTop: 10}}>
            <Button onPress={hideModal}>Cancelar</Button>
          </View>
        </>
      )
    });
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
          <ActionButton onPress={() => handleOpenEditModal(item)}><Feather name="edit-2" size={24} color="#fdd835" /></ActionButton>
          <ActionButton onPress={() => handleDeleteUser(item._id, item.nome)}><Feather name="trash-2" size={24} color="#e53935" /></ActionButton>
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
          <FlatList data={users} renderItem={renderUserItem} keyExtractor={item => item._id} />
        </List>
      )}
      
      <Modal open={isEditModalVisible} onClose={handleCloseEditModal} title={`Editar Dados de ${selectedUser?.nome || ''}`} footer={
          <>
            <Button onPress={handleSaveChanges}>GUARDAR ALTERAÇÕES</Button>
            <View style={{marginTop: 10}}><Button onPress={handleCloseEditModal}>CANCELAR</Button></View>
          </>
        }>
        <ModalInput value={editedName} onChangeText={setEditedName} placeholder="Nome do utilizador" />
        <ModalInput value={editedRole} onChangeText={setEditedRole} placeholder="Cargo do utilizador" />
        <ModalInput value={editedEmail} onChangeText={setEditedEmail} placeholder="E-mail do utilizador" keyboardType="email-address" autoCapitalize="none" />
      </Modal>
    </Container>
  );
}