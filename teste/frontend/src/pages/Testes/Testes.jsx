import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
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
    subscribeToAccelerometer,
    unsubscribeFromAccelerometer,
  } = usePermissions();

  const [sensorData, setSensorData] = useState(null);
  const [sensorSubscription, setSensorSubscription] = useState(null);

  useEffect(() => {
    // Garante que o listener do sensor seja removido ao sair da página
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
    if (!success) showModal({ title: 'Erro', content: <MessageText>Não foi possível compartilhar o arquivo.</MessageText> });
  };

  const handleSelectFile = async () => {
    const result = await selectFileFromDevice();
    showModal({
      title: 'Seletor de Arquivos',
      content: <MessageText>{result ? `Arquivo selecionado: ${result.name}` : 'Nenhum arquivo selecionado.'}</MessageText>
    });
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
          <Title>Testes de Interação</Title>
          <InfoText>Cada botão testa uma API nativa diferente.</InfoText>
          
          <ButtonContainer><Button onPress={handleTakePicture}>Tirar Foto</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleSelectImage}>Selecionar Imagem</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleSelectFile}>Selecionar Arquivo</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleShareFile}>Compartilhar</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleLocation}>Compartilhar Localização</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleContacts}>Permissão de Contatos</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleSensor}>{sensorSubscription ? 'Parar Leitura do Sensor' : 'Ler Acelerômetro'}</Button></ButtonContainer>

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