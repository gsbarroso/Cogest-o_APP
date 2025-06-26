import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import api from '../../services/api'; // Importa a API

import {
  Container,
  FormContainer,
  Title,
  SignInLinkContainer,
  SignInText,
  SignInLink
} from './styles';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('Desenvolvedor'); // Valor padrão
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    setLoading(true);

    try {
      await api.post('/users', { // A rota de criação de usuário é /users
        nome,
        email: email.toLowerCase(),
        cargo,
        senha,
        nivel_acesso: false, // Padrão
      });

      Alert.alert('Sucesso!', 'Sua conta foi criada. Faça o login para continuar.');
      navigation.navigate('Login');

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Não foi possível criar a conta.';
      Alert.alert('Erro no Cadastro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <Header onPress={() => navigation.goBack()} showBackButton={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <FormContainer>
          <Title>CADASTRO</Title>
          <Input placeholder="Nome" value={nome} onChangeText={setNome} />
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {/* Aqui você poderia usar um Picker para o cargo, mas por simplicidade mantemos o Input */}
          <Input placeholder="Cargo" value={cargo} onChangeText={setCargo} />
          <Input
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            isPassword={true}
          />
          <Input
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            isPassword={true}
          />
          <Button onPress={handleCreateAccount} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : 'CRIAR CONTA'}
          </Button>
          <SignInLinkContainer onPress={goToLogin}>
            <SignInText>
              Já tem uma conta? <SignInLink>Faça o login.</SignInLink>
            </SignInText>
          </SignInLinkContainer>
        </FormContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}