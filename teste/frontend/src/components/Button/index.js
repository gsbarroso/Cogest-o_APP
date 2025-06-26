import React from 'react';
import { ButtonContainer, ButtonText } from './styles';

// `children` será o texto do botão. `onPress` a função a ser executada.
export default function Button({ children, onPress }) {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}