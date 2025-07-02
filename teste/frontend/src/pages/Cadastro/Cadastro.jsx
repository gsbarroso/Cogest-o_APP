// =================================================================
// 2. PÁGINA DE CADASTRO CORRIGIDA COM DIAGNÓSTICO
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
    console.log('[CADASTRO] A tentar criar conta para:', email);

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
      // CORREÇÃO: Adicionando um log mais detalhado do erro de rede.
      console.error('[CADASTRO] Erro crítico na chamada da API:', JSON.stringify(error));
      Alert.alert(
        'Erro de Conexão',
        'Não foi possível comunicar com o servidor. Verifique se o seu telemóvel e computador estão na mesma rede Wi-Fi e se o IP no ficheiro da API está correto.'
      );
    } finally {
      setLoading(false);
      console.log('[CADASTRO] Processo de cadastro finalizado.');
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