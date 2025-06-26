import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

// --- Carrossel ---
export const CarouselContainer = styled.View`
  height: 200px;
  margin-top: 20px;
`;

export const CarouselImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

export const PaginationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 15px;
`;

export const PaginationDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#fdd835' : '#555')};
  margin-horizontal: 5px;
`;

// --- Lista de Sessões ---
export const ListContainer = styled.View`
  flex: 1;
  background-color: #1a1a1a;
  margin: 0 20px 20px 20px;
  border-radius: 20px;
  padding: 10px 15px;
  border-width: 1px;
  border-color: #2c2c2c;
`;

export const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 10px;
  margin-bottom: 5px;
  background-color: #fdd835;
  border-radius: 10px;
`;

export const ListHeaderText = styled.Text`
  color: #000;
  font-weight: 900;
  font-size: 13px;
  width: 33%;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// --- Item da Lista (Layout Principal Corrigido) ---
export const MemberItemContainer = styled.View`
  flex-direction: row;
  align-items: center; /* Alinha verticalmente */
  justify-content: space-between; /* Mantém o espaço entre os blocos */
  padding-vertical: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #2c2c2c; 
`;

export const MemberInfo = styled.View`
  /* CORREÇÃO PRINCIPAL: */
  flex: 1;             /* Permite que este container cresça para ocupar o espaço livre */
  flex-shrink: 1;      /* Permite que este container encolha se não houver espaço */
  padding-right: 10px; /* Adiciona um respiro para não colar nos itens da direita */
`;

export const MemberName = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 2px;
`;

export const MemberRole = styled.Text`
  color: #fdd835;
  font-size: 13px;
  font-weight: 500;
`;

// --- Container para os itens da direita ---
export const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-shrink: 0; /* Impede que este container seja "espremido" */
`;

export const TimeBox = styled.View`
  background-color: #333;
  border-radius: 20px;
  padding: 6px 12px;
  margin-left: 8px;
`;

export const TimeText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export const LogoutSessionButton = styled.TouchableOpacity`
  margin-left: 12px;
  padding: 8px;
  background-color: rgba(229, 57, 53, 0.2);
  border-radius: 50px;
`;