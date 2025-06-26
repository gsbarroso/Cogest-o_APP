import styled from 'styled-components/native';

export const InputContainer = styled.View`
  width: 100%;
  height: 55px;
  background-color: #fff;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
  margin-bottom: 15px;
`;

export const StyledInput = styled.TextInput`
  flex: 1; /* Ocupa todo o espaço disponível */
  font-size: 16px;
  color: #333;
`;

export const IconContainer = styled.TouchableOpacity`
  padding-left: 10px;
`;