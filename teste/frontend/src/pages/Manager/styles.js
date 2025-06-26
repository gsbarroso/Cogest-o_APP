import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const List = styled.View`
  flex: 1;
  padding: 20px;
`;

// Item da lista
export const UserItemContainer = styled.View`
  background-color: #1e1e1e;
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const UserInfo = styled.View`
  flex: 1;
`;

export const UserName = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const UserRole = styled.Text`
  color: #fdd835;
  font-size: 14px;
  margin-top: 2px;
`;

// NOVO ESTILO ADICIONADO
export const UserEmail = styled.Text`
  color: #999; /* Cor cinza para diferenciar do cargo */
  font-size: 12px;
  margin-top: 4px;
`;


// Botões de Ação
export const ActionContainer = styled.View`
  flex-direction: row;
`;

export const ActionButton = styled.TouchableOpacity`
  margin-left: 15px;
  padding: 5px;
`;

// Estilos para o Modal de Edição
export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: 'rgba(0, 0, 0, 0.7)';
`;

export const ModalContent = styled.View`
  width: 90%;
  background-color: #1e1e1e;
  border-radius: 15px;
  padding: 20px;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  color: #fdd835;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ModalInput = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-radius: 8px;
  padding-horizontal: 15px;
  margin-bottom: 15px;
  font-size: 16px;
`;