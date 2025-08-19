import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { usePermissions } from '../../hooks/usePermissions';
import { useModal } from '../../hooks/useModal';
import { Container, FormContainer, Title, InfoText, ButtonContainer, SensorBox, SensorText } from './styles';
import { MessageText } from '../../components/Modal/styles';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';

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
    scheduleNotification,
    subscribeToAccelerometer,
    unsubscribeFromAccelerometer,
  } = usePermissions();

  // Estados para os testes
  const [date, setDate] = useState(new Date());
  const [showIOSPicker, setShowIOSPicker] = useState(false);
  const [sensorData, setSensorData] = useState(null);
  const [sensorSubscription, setSensorSubscription] = useState(null);
  const [storageInput, setStorageInput] = useState('');
  const [loadedData, setLoadedData] = useState('');

  // Limpa a subscrição do sensor ao sair da página
  useEffect(() => {
    return () => sensorSubscription && unsubscribeFromAccelerometer(sensorSubscription);
  }, [sensorSubscription]);

  // --- LÓGICA DE ARMAZENAMENTO (similar a Cookies) ---
  const STORAGE_KEY = '@CPE_Teste_Armazenamento';

  const handleSaveData = async () => {
    if (!storageInput) {
      Alert.alert('Atenção', 'Por favor, digite algo para salvar.');
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY, storageInput);
      showModal({ title: 'Sucesso!', content: <MessageText>A informação foi salva no dispositivo.</MessageText> });
      setStorageInput('');
    } catch (e) {
      showModal({ title: 'Erro', content: <MessageText>Não foi possível salvar a informação.</MessageText> });
    }
  };

  const handleLoadData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setLoadedData(value);
      } else {
        showModal({ title: 'Aviso', content: <MessageText>Nenhuma informação encontrada no armazenamento.</MessageText> });
      }
    } catch (e) {
      showModal({ title: 'Erro', content: <MessageText>Não foi possível carregar a informação.</MessageText> });
    }
  };

  const handleClearData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setLoadedData('');
      showModal({ title: 'Sucesso!', content: <MessageText>A informação foi removida do dispositivo.</MessageText> });
    } catch (e) {
      showModal({ title: 'Erro', content: <MessageText>Não foi possível remover a informação.</MessageText> });
    }
  };

  // --- LÓGICA DE NOTIFICAÇÃO AGENDADA ---
  const onDateTimeChange = (event, selectedDate) => {
    setShowIOSPicker(false);
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
  };

  const showAndroidPicker = (modeToShow) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onDateTimeChange,
      mode: modeToShow,
      is24Hour: true,
      minimumDate: new Date(),
    });
  };

  const handleScheduleNotification = async () => {
    if (date.getTime() <= Date.now()) {
      showModal({ title: 'Atenção', content: <MessageText>Por favor, escolha uma data e hora no futuro.</MessageText> });
      return;
    }
    const success = await scheduleNotification(date);
    if (success) {
      showModal({ title: 'Notificação Agendada', content: <MessageText>A sua notificação foi agendada para {date.toLocaleString('pt-BR')}.</MessageText> });
    }
  };

  // --- HANDLERS PARA TODOS OS OUTROS BOTÕES DE TESTE ---
  const handleTakePicture = async () => {
    const result = await takePicture();
    if (result) showModal({ title: 'Câmera', content: <MessageText>Foto tirada com sucesso!</MessageText> });
  };

  const handleSelectImage = async () => {
    const result = await selectImageFromGallery();
    if (result) showModal({ title: 'Galeria', content: <MessageText>Imagem selecionada com sucesso!</MessageText> });
  };

  const handleLocation = async () => {
    const granted = await requestLocationPermission();
    showModal({ title: 'Permissão de Localização', content: <MessageText>{granted ? 'Acesso concedido!' : 'Acesso negado.'}</MessageText> });
  };

  const handleContacts = async () => {
    const granted = await requestContactsPermission();
    showModal({ title: 'Permissão de Contatos', content: <MessageText>{granted ? 'Acesso concedido!' : 'Acesso negado.'}</MessageText> });
  };

  const handleShareFile = async () => {
    const success = await saveAndShareFile();
    if (!success) showModal({ title: 'Erro', content: <MessageText>Não foi possível compartilhar o ficheiro.</MessageText> });
  };

  const handleSelectFile = async () => {
    const result = await selectFileFromDevice();
    if (result) showModal({ title: 'Seletor de Ficheiros', content: <MessageText>{`Ficheiro selecionado: ${result.name}`}</MessageText> });
  };

  const handleNotification = async () => {
    const success = await sendTestNotification();
    if (success) {
      showModal({ title: 'Notificação', content: <MessageText>A notificação foi agendada! Deverá recebê-la em 2 segundos.</MessageText> });
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

          {/* Seção de Armazenamento Local */}
          <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#1e1e1e', padding: 15, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ color: '#fdd835', fontSize: 18, fontWeight: 'bold' }}>Teste de Armazenamento Local</Text>
            <Text style={{ color: '#fff', fontSize: 14, marginVertical: 10, textAlign: 'center' }}>Simula o comportamento de Cookies no navegador.</Text>
            <Input placeholder="Digite um texto para salvar..." value={storageInput} onChangeText={setStorageInput} />
            <ButtonContainer><Button onPress={handleSaveData}>SALVAR INFORMAÇÃO</Button></ButtonContainer>
            <ButtonContainer><Button onPress={handleLoadData}>CARREGAR INFORMAÇÃO</Button></ButtonContainer>
            <ButtonContainer><Button onPress={handleClearData}>LIMPAR INFORMAÇÃO</Button></ButtonContainer>
            {loadedData ? <Text style={{ color: '#fff', fontSize: 16, marginTop: 15, textAlign: 'center' }}>Informação Carregada: "{loadedData}"</Text> : null}
          </View>

          {/* Seção de Notificação Agendada */}
          <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#1e1e1e', padding: 15, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ color: '#fdd835', fontSize: 18, fontWeight: 'bold' }}>Notificação Agendada</Text>
            <Text style={{ color: '#fff', fontSize: 16, marginVertical: 10, textAlign: 'center' }}>Agendado para: {date.toLocaleString('pt-BR')}</Text>
            {Platform.OS === 'android' ? (
              <><ButtonContainer><Button onPress={() => showAndroidPicker('date')}>ESCOLHER DATA</Button></ButtonContainer><ButtonContainer><Button onPress={() => showAndroidPicker('time')}>ESCOLHER HORA</Button></ButtonContainer></>
            ) : (
              <ButtonContainer><Button onPress={() => setShowIOSPicker(true)}>ESCOLHER DATA E HORA</Button></ButtonContainer>
            )}
            <ButtonContainer><Button onPress={handleScheduleNotification}>AGENDAR NOTIFICAÇÃO</Button></ButtonContainer>
          </View>
          {showIOSPicker && <DateTimePicker testID="dateTimePicker" value={date} mode="datetime" is24Hour={true} display="spinner" onChange={onDateTimeChange} minimumDate={new Date()} />}

          {/* Restante dos botões de teste */}
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