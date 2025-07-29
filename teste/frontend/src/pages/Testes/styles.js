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
  color: #fdd835;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

export const InfoText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
  line-height: 24px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  margin-top: 15px;
`;

// ... (estilos existentes: Container, FormContainer, etc.)

export const SensorBox = styled.View`
  width: 100%;
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
`;

export const SensorText = styled.Text`
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  font-family: monospace; /* Fonte monoespaçada para melhor alinhamento */
`;