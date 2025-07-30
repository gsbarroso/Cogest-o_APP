import { Alert } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Contacts from 'expo-contacts';
import * as DocumentPicker from 'expo-document-picker';
import { Accelerometer } from 'expo-sensors';
import * as Notifications from 'expo-notifications';

// Configuração inicial para notificações (necessário para o iOS e para o app em primeiro plano)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Hook customizado e completo para gerir permissões e interações nativas com o Expo Go.
 */
export const usePermissions = () => {
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  };

  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    return status === 'granted';
  };

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

  const selectFileFromDevice = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      return result.canceled ? null : result.assets[0];
    } catch (error) {
      return null;
    }
  };

  const sendTestNotification = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Não é possível enviar notificações sem a sua permissão.');
      return false;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "CoGestão APP 📬",
        body: 'Esta é uma notificação de teste!',
        data: { data: 'algum dado extra' },
      },
      trigger: { seconds: 2 },
    });
    return true;
  };

  const subscribeToAccelerometer = (callback) => {
    Accelerometer.setUpdateInterval(1000);
    const subscription = Accelerometer.addListener(callback);
    return subscription;
  };

  const unsubscribeFromAccelerometer = (subscription) => {
    subscription && subscription.remove();
  };

  return {
    requestLocationPermission,
    requestContactsPermission,
    takePicture,
    selectImageFromGallery,
    saveAndShareFile,
    selectFileFromDevice,
    sendTestNotification,
    subscribeToAccelerometer,
    unsubscribeFromAccelerometer,
  };
};