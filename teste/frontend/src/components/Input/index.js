import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { InputContainer, StyledInput, IconContainer } from './styles';

// O {...props} permite passar qualquer outra propriedade de TextInput (placeholder, value, etc)
export default function Input({ isPassword, ...props }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <InputContainer>
      <StyledInput
        {...props}
        placeholderTextColor="#888"
        // Lógica para censurar/mostrar a senha
        secureTextEntry={isPassword && !isPasswordVisible}
      />
      {isPassword && (
        <IconContainer onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="black"
          />
        </IconContainer>
      )}
    </InputContainer>
  );
}