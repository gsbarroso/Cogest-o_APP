import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

// Formata o tempo em HH:MM:SS
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// Este componente recebe o tempo de início e calcula o tempo decorrido a cada segundo
const Chronometer = ({ startTime, style }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // A cada segundo, atualiza o tempo decorrido
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado para evitar vazamento de memória
    return () => clearInterval(interval);
  }, [startTime]); // O efeito depende do startTime

  return <Text style={style}>{formatTime(elapsedTime)}</Text>;
};

export default Chronometer;