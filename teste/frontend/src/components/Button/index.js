import React from 'react';
import { ButtonContainer, ButtonText } from './styles';

// Usamos "export default" porque este é o principal export do ficheiro.
export default function Button({ children, onPress, disabled }) {
  return (
    <ButtonContainer onPress={onPress} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}
