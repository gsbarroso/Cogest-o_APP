import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './useAuth'; // Para saber qual utilizador está a logar o ponto

/**
 * Hook customizado para gerir as sessões de ponto ativas.
 */
export const useSessions = () => {
  const { user } = useAuth(); // Pega o utilizador atualmente logado
  const [activeSessions, setActiveSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Nota: Numa aplicação real, esta função faria uma chamada à API
  // para buscar sessões que já possam estar ativas no backend.
  // useEffect(() => { /* Lógica para buscar sessões iniciais */ }, []);

  /**
   * Adiciona o utilizador logado à lista de sessões ativas.
   */
  const logarPonto = useCallback(() => {
    if (!user) {
      Alert.alert('Erro', 'Utilizador não encontrado. Por favor, faça login novamente.');
      return;
    }
    
    // Verifica se o utilizador já não tem uma sessão ativa
    const isAlreadyActive = activeSessions.some(session => session._id === user._id);
    if (isAlreadyActive) {
      Alert.alert('Atenção', 'Você já logou o seu ponto de entrada.');
      return;
    }

    // Numa aplicação real, isto chamaria um serviço: await sessionService.startSession(user._id);
    const newSession = {
      ...user,
      chegada: new Date(),
      pontoId: Date.now(), // ID único para esta sessão específica
    };

    setActiveSessions(prevSessions => [...prevSessions, newSession]);
  }, [user, activeSessions]); // Depende do utilizador e das sessões atuais

  /**
   * Remove uma sessão da lista de sessões ativas.
   * @param {number} pontoId - O ID da sessão de ponto a ser removida.
   */
  const deslogarPonto = useCallback((pontoId) => {
    // Numa aplicação real, isto chamaria um serviço: await sessionService.endSession(pontoId);
    setActiveSessions(prevSessions => prevSessions.filter(session => session.pontoId !== pontoId));
  }, []);

  // Expõe o estado e as funções para serem usadas nas páginas
  return { activeSessions, loading, logarPonto, deslogarPonto };
};
