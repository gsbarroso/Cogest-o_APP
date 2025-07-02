// =================================================================
// 4. PÁGINA DE CADASTRO CORRIGIDA
// Caminho: src/pages/Cadastro/Cadastro.jsx
// =================================================================

import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ActivityIndicator, View } from 'react-native';
import { useUsers } from '../../hooks/useUsers';
import { useModal } from '../../hooks/useModal';

import { Container, FormContainer, Title, SignInLinkContainer, SignInText, SignInLink } from './styles';
import { MessageText } from '../../components/Modal/styles';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Cadastro({ navigation }) {
  const { registerUser } = useUsers();
  const { showModal, hideModal } = useModal();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('Desenvolvedor');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      showModal({ title: 'Atenção', content: <MessageText>Por favor, preencha todos os campos.</MessageText> });
      return;
    }
    if (senha !== confirmarSenha) {
      showModal({ title: 'Erro', content: <MessageText>As senhas não coincidem!</MessageText> });
      return;
    }

    setLoading(true);
    const result = await registerUser({ nome, email: email.toLowerCase(), cargo, senha, nivel_acesso: cargo === 'Admin' });
    setLoading(false);

    if (result.success) {
      showModal({
        title: 'Sucesso!',
        content: <MessageText>A sua conta foi criada. Faça o login para continuar.</MessageText>,
        footer: <Button onPress={() => {
          hideModal();
          navigation.navigate('Login');
        }}>Ir para Login</Button>
      });
    } else {
      showModal({ title: 'Erro no Cadastro', content: <MessageText>{result.error}</MessageText> });
    }
  };

  const goToLogin = () => navigation.navigate('Login');

  return (
    <Container>
      <Header onPress={() => navigation.goBack()} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <FormContainer>
          <Title>CADASTRO</Title>
          <Input placeholder="Nome" value={nome} onChangeText={setNome} />
          <Input placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Input placeholder="Cargo (Admin, Gerente, Desenvolvedor)" value={cargo} onChangeText={setCargo} />
          <Input placeholder="Senha" value={senha} onChangeText={setSenha} isPassword={true} />
          <Input placeholder="Confirme sua senha" value={confirmarSenha} onChangeText={setConfirmarSenha} isPassword={true} />
          <View style={{ width: '100%', marginTop: 10 }}>
            <Button onPress={handleCreateAccount} disabled={loading}>
              {loading ? <ActivityIndicator color="#000" /> : 'CRIAR CONTA'}
            </Button>
          </View>
          <SignInLinkContainer onPress={goToLogin}>
            <SignInText>Já tem uma conta? <SignInLink>Faça o login.</SignInLink></SignInText>
          </SignInLinkContainer>
        </FormContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}