// =================================================================
// 3. ATUALIZAR O FICHEIRO PRINCIPAL DA APLICAÇÃO
// Caminho: App.js
// =================================================================

import React from 'react';
import { AuthProvider } from './src/hooks/useAuth';
import { ModalProvider } from './src/hooks/useModal'; // Importa o ModalProvider
import MainNavigator from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      {/* Envolvemos a aplicação com o ModalProvider */}
      <ModalProvider>
        <MainNavigator />
      </ModalProvider>
    </AuthProvider>
  );
}