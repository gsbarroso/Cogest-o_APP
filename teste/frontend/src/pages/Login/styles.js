import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

export const FormContainer = styled.View`
  flex: 1;
  padding: 25px;
  align-items: center;
`;

export const Title = styled.Text`
  color: #fdd835; /* Cor amarela para o título LOGIN */
  font-size: 32px;
  font-weight: bold;
  margin-vertical: 30px;
`;

// Estilos para o link de cadastro
export const SignUpContainer = styled.TouchableOpacity`
  margin-top: 30px;
`;

export const SignUpText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const SignUpLink = styled.Text`
  color: #fdd835;
  font-weight: bold;
  font-size: 16px;
`;