import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Dimensions, View, Text, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

import {
  Container,
  CarouselContainer,
  CarouselImage,
  PaginationContainer,
  PaginationDot,
  ListContainer,
  ListHeader,
  ListHeaderText,
  MemberItemContainer,
  MemberInfo,
  MemberName,
  MemberRole,
  ActionsContainer,
  TimeBox,
  TimeText,
  LogoutSessionButton,
} from './styles';

import Header from '../../components/Header';
import Button from '../../components/Button';

// --- COMPONENTE CRONÔMETRO ---
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const LiveChronometer = ({ startTime, style }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return <Text style={style}>{formatTime(elapsedTime)}</Text>;
};
// --- FIM DO CRONÔMETRO ---


export default function Home({ navigation }) {
  const { user, logout } = useAuth();
  const [activeSessions, setActiveSessions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();

  const carouselImages = [
    require('../../assets/img1.jpg'),
    require('../../assets/img2.jpg'),
    require('../../assets/img3.jpg')
  ];
  const { width: screenWidth } = Dimensions.get('window');

  const handleAppLogout = () => {
    logout();
    navigation.replace('Login');
  };

  const goToManager = () => {
    navigation.navigate('Manager');
  };

  const handleLogarPonto = () => {
    if (!user) {
      Alert.alert('Erro', 'Usuário não encontrado. Por favor, faça login novamente.');
      return;
    }
    
    const isAlreadyActive = activeSessions.some(session => session._id === user._id);
    if (isAlreadyActive) {
      Alert.alert('Atenção', 'Você já logou seu ponto de entrada.');
      return;
    }

    const newSession = {
      ...user,
      chegada: new Date(),
      pontoId: Date.now(),
    };

    setActiveSessions(prevSessions => [...prevSessions, newSession]);
  };

  const handleDeslogarPonto = (pontoId) => {
    setActiveSessions(prevSessions => prevSessions.filter(session => session.pontoId !== pontoId));
  };
  
  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveIndex(roundIndex);
  };

  // Componente para renderizar cada item da lista de sessões
  const renderActiveSession = ({ item }) => (
    <MemberItemContainer>
      <MemberInfo>
        <MemberName>{item.nome}</MemberName>
        <MemberRole>{item.cargo}</MemberRole>
      </MemberInfo>

      <ActionsContainer>
        <TimeBox>
          <TimeText>{item.chegada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TimeText>
        </TimeBox>
        <TimeBox>
          <LiveChronometer startTime={item.pontoId} style={{ color: '#fff', fontSize: 14 }} />
        </TimeBox>
        <LogoutSessionButton onPress={() => handleDeslogarPonto(item.pontoId)}>
          <Feather name="log-out" size={20} color="#e53935" />
        </LogoutSessionButton>
      </ActionsContainer>
    </MemberItemContainer>
  );

  return (
    <Container>
      <Header onPress={handleAppLogout} />

      <CarouselContainer>
        <FlatList
          ref={flatListRef}
          data={carouselImages}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth }}>
              <CarouselImage source={item} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
        />
      </CarouselContainer>
      <PaginationContainer>
        {carouselImages.map((_, index) => (
          <PaginationDot key={index} active={index === activeIndex} />
        ))}
      </PaginationContainer>

      <View style={{ padding: 20, paddingTop: 10 }}>
        <Button onPress={handleLogarPonto}>PONTO</Button>
      </View>

      <ListContainer>
        <ListHeader>
          <ListHeaderText>MEMBRO</ListHeaderText>
          <ListHeaderText style={{ textAlign: 'center' }}>CHEGADA</ListHeaderText>
          <ListHeaderText style={{ textAlign: 'right' }}>TEMPO</ListHeaderText>
        </ListHeader>
        
        <FlatList
          data={activeSessions}
          renderItem={renderActiveSession}
          keyExtractor={(item) => item.pontoId.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={{color: '#888', textAlign: 'center', marginTop: 50, fontStyle: 'italic'}}>Ninguém logado no momento.</Text>}
        />
      </ListContainer>

      {/* CORREÇÃO: O botão agora é visível para todos os usuários */}
      <View style={{ padding: 20, paddingTop: 0, paddingBottom: 30 }}>
        <Button onPress={goToManager}>LISTA DE MEMBROS</Button>
      </View>
    </Container>
  );
}