// =================================================================
// 2. PÁGINA HOME CORRIGIDA
// Caminho: src/pages/Home/Home.jsx
// Responsabilidade: Chamar o logout sem navegação explícita.
// =================================================================

import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Dimensions, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { useSessions } from '../../hooks/useSessions';
import { useModal } from '../../hooks/useModal';

import { Container, CarouselContainer, CarouselImage, PaginationContainer, PaginationDot, ListContainer, ListHeader, ListHeaderText, MemberItemContainer, MemberInfo, MemberName, MemberRole, ActionsContainer, TimeBox, TimeText, LogoutSessionButton } from './styles';
import { MessageText } from '../../components/Modal/styles';
import Header from '../../components/Header';
import Button from '../../components/Button';

const LiveChronometer = ({ startTime, style }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (s) => `${Math.floor(s / 3600).toString().padStart(2, '0')}:${Math.floor((s % 3600) / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  return <Text style={style}>{formatTime(elapsedTime)}</Text>;
};

export default function Home({ navigation }) {
  const { user, logout } = useAuth();
  const { activeSessions, logarPonto, deslogarPonto } = useSessions();
  const { showModal, hideModal } = useModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();
  const { width: screenWidth } = Dimensions.get('window');
  const carouselImages = [ require('../../assets/img1.jpg'), require('../../assets/img2.jpg'), require('../../assets/img3.jpg') ];

  const handleAppLogout = () => {
    showModal({
      title: 'Sair da Aplicação',
      content: <MessageText>Tem a certeza que deseja encerrar a sua sessão?</MessageText>,
      footer: (
        <>
          <Button onPress={() => {
            hideModal();
            // CORREÇÃO: Apenas chamamos o logout. O router trata da navegação.
            logout(); 
          }}>Sair</Button>
          <View style={{marginTop: 10}}>
            <Button onPress={hideModal}>Cancelar</Button>
          </View>
        </>
      )
    });
  };

  const handleLogarPonto = () => {
    showModal({
      title: 'Confirmar Entrada',
      content: <MessageText>Deseja registar o seu ponto de entrada agora?</MessageText>,
      footer: (
        <>
          <Button onPress={() => {
            logarPonto();
            hideModal();
          }}>Confirmar</Button>
          <View style={{marginTop: 10}}>
            <Button onPress={hideModal}>Cancelar</Button>
          </View>
        </>
      )
    });
  };

  const handleDeslogarPonto = (pontoId, userName) => {
    showModal({
      title: 'Confirmar Saída',
      content: <MessageText>Deseja registar a saída para {userName}?</MessageText>,
      footer: (
        <>
          <Button onPress={() => {
            deslogarPonto(pontoId);
            hideModal();
          }}>Confirmar Saída</Button>
          <View style={{marginTop: 10}}>
            <Button onPress={hideModal}>Cancelar</Button>
          </View>
        </>
      )
    });
  };

  const onScroll = (e) => setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width));
  const renderActiveSession = ({ item }) => (
    <MemberItemContainer>
      {/* CORREÇÃO: Alterado de UserName para MemberName */}
      <MemberInfo><MemberName>{item.nome}</MemberName><MemberRole>{item.cargo}</MemberRole></MemberInfo>
      <ActionsContainer>
        <TimeBox><TimeText>{item.chegada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TimeText></TimeBox>
        <TimeBox><LiveChronometer startTime={item.pontoId} style={{ color: '#fff', fontSize: 14 }} /></TimeBox>
        <LogoutSessionButton onPress={() => handleDeslogarPonto(item.pontoId, item.nome)}><Feather name="log-out" size={20} color="#e53935" /></LogoutSessionButton>
      </ActionsContainer>
    </MemberItemContainer>
  );

  return (
    <Container>
      <Header onPress={handleAppLogout} />
      <CarouselContainer>
        <FlatList ref={flatListRef} data={carouselImages} renderItem={({ item }) => <View style={{ width: screenWidth }}><CarouselImage source={item} /></View>} keyExtractor={(item, index) => index.toString()} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={onScroll} />
      </CarouselContainer>
      <PaginationContainer>
        {carouselImages.map((_, i) => <PaginationDot key={i} active={i === activeIndex} />)}
      </PaginationContainer>
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}><Button onPress={handleLogarPonto}>LOGAR PONTO</Button></View>
      <ListContainer>
        <ListHeader><ListHeaderText>MEMBRO</ListHeaderText><ListHeaderText style={{ textAlign: 'center' }}>CHEGADA</ListHeaderText><ListHeaderText style={{ textAlign: 'right' }}>TEMPO</ListHeaderText></ListHeader>
        <FlatList data={activeSessions} renderItem={renderActiveSession} keyExtractor={(item) => item.pontoId.toString()} ListEmptyComponent={<Text style={{color: '#888', textAlign: 'center', marginTop: 50, fontStyle: 'italic'}}>Ninguém logado no momento.</Text>} />
      </ListContainer>
      {user?.cargo === 'Admin' && (
        <View style={{ padding: 20, paddingTop: 10, paddingBottom: 30 }}><Button onPress={() => navigation.navigate('Manager')}>GERENCIAR UTILIZADORES</Button></View>
      )}
    </Container>
  );
}
