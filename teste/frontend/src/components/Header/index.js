import React from 'react';
import { Feather } from '@expo/vector-icons';
import { HeaderContainer, Logo, BackButton } from './styles';
import logoImage from '../../assets/logo.png'; // Verifique se este caminho está correto

export default function Header({ onPress, showBackButton = true }) {
  return (
    <HeaderContainer>
      <Logo source={logoImage} />
      {showBackButton && (
        <BackButton onPress={onPress}>
          <Feather name="arrow-left" size={28} color="black" />
        </BackButton>
      )}
    </HeaderContainer>
  );
}
