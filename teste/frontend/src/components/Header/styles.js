import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 15px;
  padding-top: 40px;
  background-color: #fdd835;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

// ANTES:
// export const Logo = styled.Text` ... `;

// DEPOIS (substitua pelo código abaixo):
export const Logo = styled.Image`
  width: 120px;  /* Ajuste a largura conforme o tamanho da sua logo */
  height: 68px; /* Ajuste a altura conforme o tamanho da sua logo */
  resize-mode: contain; /* Garante que a imagem se ajuste sem distorcer */
`;

export const BackButton = styled.TouchableOpacity`
  padding: 5px;
`;