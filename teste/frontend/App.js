import React from 'react';
import { AuthProvider } from './src/hooks/useAuth'; // 1. Importe o AuthProvider
import AppRoutes from './src/routes/app.routes';

export default function App() {
  return (
    // 2. Envolva suas rotas com o AuthProvider
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
