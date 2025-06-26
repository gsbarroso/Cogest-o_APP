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
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  margin-vertical: 30px;
`;

// ... adicione no final do arquivo
export const SignInLinkContainer = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignInText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const SignInLink = styled.Text`
  color: #fdd835;
  font-weight: bold;
  font-size: 16px;
`;