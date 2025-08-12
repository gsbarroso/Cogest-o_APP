import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Platform } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { usePermissions } from '../../hooks/usePermissions';
import { useModal } from '../../hooks/useModal';
import { Container, FormContainer, Title, InfoText, ButtonContainer, SensorBox, SensorText } from './styles';
import { MessageText } from '../../components/Modal/styles';
import Header from '../../components/Header';
import Button from '../../components/Button';

export default function Testes({ navigation }) {
  const { showModal } = useModal();
  const {
    scheduleNotification,
    // ...outras funções do hook que você usa
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

  const [date, setDate] = useState(new Date());
  const [showIOSPicker, setShowIOSPicker] = useState(false);

  const [sensorData, setSensorData] = useState(null);
  const [sensorSubscription, setSensorSubscription] = useState(null);

  useEffect(() => {
    return () => sensorSubscription && unsubscribeFromAccelerometer(sensorSubscription);
  }, [sensorSubscription]);

  // Função unificada para lidar com a mudança de data/hora
  const onDateTimeChange = (event, selectedDate) => {
    // Esconde o seletor no iOS
    setShowIOSPicker(false);
    
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
  };

  // Função para abrir o seletor (de data OU de hora) no Android
  const showAndroidPicker = (modeToShow) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onDateTimeChange, // Reutilizamos a mesma função
      mode: modeToShow, // 'date' ou 'time'
      is24Hour: true,
      minimumDate: new Date(),
    });
  };

  const handleScheduleNotification = async () => {
    if (date.getTime() <= Date.now()) {
        showModal({
            title: 'Atenção',
            content: <MessageText>Por favor, escolha uma data e hora no futuro.</MessageText>
        });
        return;
    }
    const success = await scheduleNotification(date);
    if (success) {
      showModal({
        title: 'Notificação Agendada',
        content: <MessageText>A sua notificação foi agendada para {date.toLocaleString('pt-BR')}.</MessageText>
      });
    }
  };
  
  // As outras funções de teste permanecem iguais
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
          
          <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#1e1e1e', padding: 15, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ color: '#fdd835', fontSize: 18, fontWeight: 'bold' }}>Notificação Agendada</Text>
            <Text style={{ color: '#fff', fontSize: 16, marginVertical: 10, textAlign: 'center' }}>
              Agendado para: {date.toLocaleString('pt-BR')}
            </Text>
            
            {/* --- LÓGICA DE BOTÕES DIFERENTE PARA CADA PLATAFORMA --- */}
            {Platform.OS === 'android' ? (
              <>
                <ButtonContainer>
                  <Button onPress={() => showAndroidPicker('date')}>ESCOLHER DATA</Button>
                </ButtonContainer>
                <ButtonContainer>
                  <Button onPress={() => showAndroidPicker('time')}>ESCOLHER HORA</Button>
                </ButtonContainer>
              </>
            ) : (
              <ButtonContainer>
                <Button onPress={() => setShowIOSPicker(true)}>ESCOLHER DATA E HORA</Button>
              </ButtonContainer>
            )}

            <ButtonContainer>
                <Button onPress={handleScheduleNotification}>AGENDAR NOTIFICAÇÃO</Button>
            </ButtonContainer>
          </View>

          {showIOSPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="datetime"
              is24Hour={true}
              display="spinner"
              onChange={onDateTimeChange}
              minimumDate={new Date()}
            />
          )}

          
          <ButtonContainer><Button onPress={handleNotification}>Enviar Notificação (em 2 seg)</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleTakePicture}>Tirar Foto (Câmera)</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleSelectImage}>Selecionar Imagem (Galeria)</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleSelectFile}>Selecionar Arquivo (Downloads)</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleShareFile}>Gerar e Salvar Arquivo</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleLocation}>Pedir Permissão de Localização</Button></ButtonContainer>
          <ButtonContainer><Button onPress={handleContacts}>Pedir Permissão de Contatos</Button></ButtonContainer>
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