import React from 'react';
import { Feather } from '@expo/vector-icons';
import { HeaderContainer, Logo, BackButton } from './styles';

import logoImage from '../../assets/logo.png';

// Adicionamos showBackButton, com valor padrão 'true'
export default function Header({ onPress, showBackButton = true }) {
  return (
    <HeaderContainer>
      <Logo source={logoImage} />
      
      {/* O botão de voltar só aparece se showBackButton for true */}
      {showBackButton && (
        <BackButton onPress={onPress}>
          <Feather name="arrow-left" size={28} color="black" />
        </BackButton>
      )}
    </HeaderContainer>
  );
}