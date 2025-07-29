import { Alert } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Contacts from 'expo-contacts';
import * as DocumentPicker from 'expo-document-picker';
import { Accelerometer } from 'expo-sensors';

/**
 * Hook customizado e completo para gerir permissões e interações nativas com o Expo Go.
 */
export const usePermissions = () => {
  /**
   * Pede permissão para a localização.
   * Retorna 'true' se concedida, 'false' caso contrário.
   */
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  };

  /**
   * Pede permissão para os contatos.
   * Retorna 'true' se concedida, 'false' caso contrário.
   */
  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    return status === 'granted';
  };

  /**
   * Abre a câmara para tirar uma foto. A própria função pede a permissão necessária.
   * Retorna o 'asset' da imagem ou 'null' se cancelado.
   */
  const takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão Negada", "É necessário permitir o acesso à câmara para tirar uma foto.");
      return null;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    return pickerResult.canceled ? null : pickerResult.assets[0];
  };

  /**
   * Abre a galeria para selecionar uma imagem. A própria função pede a permissão necessária.
   * Retorna o 'asset' da imagem ou 'null' se cancelado.
   */
  const selectImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão Negada", "É necessário permitir o acesso à galeria.");
      return null;
    }
    
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    return pickerResult.canceled ? null : pickerResult.assets[0];
  };

  /**
   * Cria um arquivo de texto no armazenamento temporário do app e abre a janela de compartilhamento do sistema.
   * Retorna 'true' em sucesso, 'false' em falha.
   */
  const saveAndShareFile = async () => {
    try {
      const fileUri = FileSystem.cacheDirectory + 'relatorio_cogestao.txt';
      await FileSystem.writeAsStringAsync(fileUri, 'Este é um relatório de teste gerado pelo CoGestão APP.');
      
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Erro', 'O compartilhamento não está disponível neste dispositivo.');
        return false;
      }
      
      await Sharing.shareAsync(fileUri);
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * Abre o seletor de documentos do sistema para o utilizador escolher um arquivo.
   * Retorna o 'asset' do arquivo ou 'null' se cancelado.
   */
  const selectFileFromDevice = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      return result.canceled ? null : result.assets[0];
    } catch (error) {
      return null;
    }
  };

  /**
   * Subscreve a atualizações do acelerómetro.
   * @param {function} callback - Função que será chamada com os dados do sensor.
   * @returns {object} A subscrição que pode ser usada para cancelar o listener.
   */
  const subscribeToAccelerometer = (callback) => {
    Accelerometer.setUpdateInterval(1000);
    const subscription = Accelerometer.addListener(callback);
    return subscription;
  };

  /**
   * Cancela a subscrição a atualizações do acelerómetro.
   * @param {object} subscription - A subscrição retornada por subscribeToAccelerometer.
   */
  const unsubscribeFromAccelerometer = (subscription) => {
    subscription && subscription.remove();
  };

  // Exporta todas as funções para serem usadas na sua página de testes.
  return {
    requestLocationPermission,
    requestContactsPermission,
    takePicture,
    selectImageFromGallery,
    saveAndShareFile,
    selectFileFromDevice,
    subscribeToAccelerometer,
    unsubscribeFromAccelerometer,
  };
};