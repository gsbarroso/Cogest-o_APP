// =================================================================
// 2. ESTILOS DO COMPONENTE MODAL (Sem alterações)
// Caminho: src/components/Modal/styles.js
// =================================================================

import styled from 'styled-components/native';

export const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ModalView = styled.View`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  elevation: 5;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  padding-bottom: 15px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 5px;
  margin-left: 10px;
`;

export const Body = styled.View`
  width: 100%;
`;

export const Footer = styled.View`
  width: 100%;
  margin-top: 25px;
`;

export const MessageText = styled.Text`
  font-size: 16px;
  color: #555;
  text-align: center;
  line-height: 24px;
`;
