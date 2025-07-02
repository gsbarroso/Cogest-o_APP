// =================================================================
// 1. HOOK DO MODAL GLOBAL (Sem alterações)
// Caminho: src/hooks/useModal.js
// =================================================================

import React, { createContext, useState, useContext, useCallback } from 'react';
import { View } from 'react-native';
import Modal from '../components/Modal';
import Button from '../components/Button';

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [modalConfig, setModalConfig] = useState({
    isVisible: false,
    title: '',
    content: null,
    footer: null,
  });

  const hideModal = useCallback(() => {
    setModalConfig({ isVisible: false, title: '', content: null, footer: null });
  }, []);

  const showModal = useCallback((config) => {
    const footer = config.footer || <Button onPress={hideModal}>OK</Button>;
    setModalConfig({ ...config, isVisible: true, footer });
  }, [hideModal]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        open={modalConfig.isVisible}
        onClose={hideModal}
        title={modalConfig.title}
        footer={modalConfig.footer}
      >
        {modalConfig.content}
      </Modal>
    </ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}