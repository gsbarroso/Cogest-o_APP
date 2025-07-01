// =================================================================
// 2. PÁGINA DE CADASTRO CORRIGIDA
// Caminho: src/pages/Cadastro/Cadastro.jsx
// =================================================================

import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert, ActivityIndicator, View } from 'react-native';
import { useUsers } from '../../hooks/useUsers';

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
  const { registerUser } = useUsers();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('Desenvolvedor');
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
      const result = await registerUser({
        nome,
        email: email.toLowerCase(),
        cargo,
        senha,
        nivel_acesso: cargo === 'Admin',
      });

      if (result.success) {
        Alert.alert('Sucesso!', 'A sua conta foi criada. Faça o login para continuar.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro no Cadastro', result.error);
      }
    } catch (error) {
      Alert.alert('Erro Crítico', 'Ocorreu um erro inesperado ao criar a conta.');
    } finally {
      // CORREÇÃO: O bloco 'finally' garante que o loading é sempre desativado.
      setLoading(false);
    }
  };

  const goToLogin = () => navigation.navigate('Login');

  return (
    <Container>
      <Header onPress={() => navigation.goBack()} />
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
            autoCapitalize="none"
          />
          <Input placeholder="Cargo (Admin, Gerente, Desenvolvedor)" value={cargo} onChangeText={setCargo} />
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
          <View style={{ width: '100%', marginTop: 10 }}>
            <Button onPress={handleCreateAccount} disabled={loading}>
              {loading ? <ActivityIndicator color="#000" /> : 'CRIAR CONTA'}
            </Button>
          </View>
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