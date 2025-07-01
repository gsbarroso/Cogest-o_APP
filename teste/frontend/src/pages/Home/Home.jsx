// =================================================================
// 3. PÁGINA HOME CORRIGIDA
// Caminho: src/pages/Home/Home.jsx
// =================================================================

import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Dimensions, View, Text, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { useSessions } from '../../hooks/useSessions';

import {
  Container, CarouselContainer, CarouselImage, PaginationContainer, PaginationDot,
  ListContainer, ListHeader, ListHeaderText, MemberItemContainer, MemberInfo,
  MemberName, MemberRole, ActionsContainer, TimeBox, TimeText, LogoutSessionButton,
} from './styles';
import Header from '../../components/Header/index.js';
import Button from '../../components/Button/index.js';

const LiveChronometer = ({ startTime, style }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  return <Text style={style}>{formatTime(elapsedTime)}</Text>;
};

export default function Home({ navigation }) {
  const { user, logout } = useAuth();
  const { activeSessions, logarPonto, deslogarPonto } = useSessions();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();
  const { width: screenWidth } = Dimensions.get('window');
  const carouselImages = [
    require('../../assets/img1.jpg'),
    require('../../assets/img2.jpg'),
    require('../../assets/img3.jpg')
  ];

  const handleAppLogout = () => logout();
  const goToManager = () => navigation.navigate('Manager');
  
  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

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
        <LogoutSessionButton onPress={() => deslogarPonto(item.pontoId)}>
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
          ref={flatListRef} data={carouselImages}
          renderItem={({ item }) => <View style={{ width: screenWidth }}><CarouselImage source={item} /></View>}
          keyExtractor={(item, index) => index.toString()}
          horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={onScroll}
        />
      </CarouselContainer>
      <PaginationContainer>
        {carouselImages.map((_, index) => <PaginationDot key={index} active={index === activeIndex} />)}
      </PaginationContainer>
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <Button onPress={logarPonto}>LOGAR PONTO</Button>
      </View>
      <ListContainer>
        <ListHeader>
          <ListHeaderText>MEMBRO</ListHeaderText>
          <ListHeaderText style={{ textAlign: 'center' }}>CHEGADA</ListHeaderText>
          <ListHeaderText style={{ textAlign: 'right' }}>TEMPO</ListHeaderText>
        </ListHeader>
        <FlatList
          data={activeSessions} renderItem={renderActiveSession}
          keyExtractor={(item) => item.pontoId.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={{color: '#888', textAlign: 'center', marginTop: 50, fontStyle: 'italic'}}>Ninguém logado no momento.</Text>}
        />
      </ListContainer>
      <View style={{ padding: 20, paddingTop: 10, paddingBottom: 30 }}>
        <Button onPress={goToManager}>GERENCIAR USUÁRIOS</Button>
      </View>
    </Container>
  );
}