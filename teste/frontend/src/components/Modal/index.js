import React from 'react';
import { Modal as ReactNativeModal } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Backdrop, ModalView, Header, Title, CloseButton, Body, Footer } from './styles';

// Este componente segue o modelo da sua imagem "ModalContainer"
export default function Modal({ open, title, onClose, footer, children, ...rest }) {
  // Se a prop 'open' for false, o modal não renderiza nada
  if (!open) {
    return null;
  }

  return (
    <ReactNativeModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose} // Permite fechar com o botão "voltar" do Android
      {...rest}
    >
      <Backdrop>
        <ModalView>
          <Header>
            <Title>{title}</Title>
            <CloseButton onPress={onClose}>
              <Feather name="x" size={24} color="#888" />
            </CloseButton>
          </Header>

          <Body>
            {children}
          </Body>

          {/* O rodapé só é renderizado se for passado via props */}
          {footer && (
            <Footer>
              {footer}
            </Footer>
          )}

        </ModalView>
      </Backdrop>
    </ReactNativeModal>
  );
}