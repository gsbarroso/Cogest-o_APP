// =================================================================
// 1. ARQUIVO PRINCIPAL DA APLICAÇÃO (SEM ALTERAÇÕES)
// Caminho: App.js
// =================================================================

import React from 'react';
import { AuthProvider } from './src/hooks/useAuth';
import MainNavigator from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}