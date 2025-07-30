import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { usePermissions } from '../../hooks/usePermissions';
import { useModal } from '../../hooks/useModal';

import { Container, FormContainer, Title, InfoText, ButtonContainer, SensorBox, SensorText } from './styles';
import { MessageText } from '../../components/Modal/styles';
import Header from '../../components/Header';
import Button from '../../components/Button';

export default function Testes({ navigation }) {
  const { showModal } = useModal();
  const {
    takePicture,
    selectImageFromGallery,
    requestLocationPermission,
    requestContactsPermission,
    saveAndShareFile,
    selectFileFromDevice,
    sendTestNotification,
    subscribeToAccelerometer,
    unsubscribeFromAccelerometer,
  } = usePermissions();

  const [sensorData, setSensorData] = useState(null);
  const [sensorSubscription, setSensorSubscription] = useState(null);

  useEffect(() => {
    return () => sensorSubscription && unsubscribeFromAccelerometer(sensorSubscription);
  }, [sensorSubscription]);

  const handleTakePicture = async () => {
    const result = await takePicture();
    showModal({
      title: 'Câmera',
      content: <MessageText>{result ? 'Foto tirada com sucesso!' : 'Ação cancelada.'}</MessageText>
    });
  };

  const handleSelectImage = async () => {
    const result = await selectImageFromGallery();
    showModal({
      title: 'Galeria',
      content: <MessageText>{result ? 'Imagem selecionada com sucesso!' : 'Ação cancelada.'}</MessageText>
    });
  };

  const handleLocation = async () => {
    const granted = await requestLocationPermission();
    showModal({
      title: 'Permissão de Localização',
      content: <MessageText>{granted ? 'Acesso concedido!' : 'Acesso negado.'}</MessageText>
    });
  };

  const handleContacts = async () => {
    const granted = await requestContactsPermission();
    showModal({
      title: 'Permissão de Contatos',
      content: <MessageText>{granted ? 'Acesso concedido!' : 'Acesso negado.'}</MessageText>
    });
  };

  const handleShareFile = async () => {
    const success = await saveAndShareFile();
    if (!success) showModal({ title: 'Erro', content: <MessageText>Não foi possível compartilhar o ficheiro.</MessageText> });
  };

  const handleSelectFile = async () => {
    const result = await selectFileFromDevice();
    showModal({
      title: 'Seletor de Ficheiros',
      content: <MessageText>{result ? `Ficheiro selecionado: ${result.name}` : 'Nenhum ficheiro selecionado.'}</MessageText>
    });
  };

  const handleNotification = async () => {
    const success = await sendTestNotification();
    if (success) {
      showModal({
        title: 'Notificação',
        content: <MessageText>A notificação foi agendada! Deverá recebê-la em 2 segundos.</MessageText>
      });
    }
  };

  const handleSensor = () => {
    if (sensorSubscription) {
      unsubscribeFromAccelerometer(sensorSubscription);
      setSensorSubscription(null);
      setSensorData(null);
    } else {
      const newSubscription = subscribeToAccelerometer(setSensorData);
      setSensorSubscription(newSubscription);
    }
  };

  return (
    <Container>
      <Header onPress={() => navigation.goBack()} />
      <ScrollView>
        <FormContainer>
          <Title>Testes de Interação (Expo Go)</Title>
          <InfoText>Cada botão testa uma API nativa diferente.</InfoText>
          
          <ButtonContainer><Button onPress={handleNotification}>Enviar Notificação</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleTakePicture}>Tirar Foto (Câmera)</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleSelectImage}>Selecionar Imagem (Galeria)</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleSelectFile}>Selecionar Arquivo (Downloads)</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleShareFile}>Gerar e Salvar Aequivo</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleLocation}>Pedir Permissão de Localização</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleContacts}>Pedir Permissão de Contatos</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleSensor}>{sensorSubscription ? 'Parar Leitura do Sensor' : 'Ler Acelerómetro'}</Button></ButtonContainer>

          {sensorData && (
            <SensorBox>
              <SensorText>X: {sensorData.x.toFixed(2)}</SensorText>
              <SensorText>Y: {sensorData.y.toFixed(2)}</SensorText>
              <SensorText>Z: {sensorData.z.toFixed(2)}</SensorText>
            </SensorBox>
          )}
        </FormContainer>
      </ScrollView>
    </Container>
  );
}