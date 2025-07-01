// =================================================================
// 1. PÁGINA DE LOGIN CORRIGIDA
// Caminho: src/pages/Login/Login.jsx
// =================================================================

import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

import { Container, FormContainer, Title, SignUpContainer, SignUpText, SignUpLink } from './styles';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, senha);
      if (!result.success) {
        Alert.alert('Erro no Login', result.error);
      }
      // Se o login for bem-sucedido, a navegação é automática.
    } catch (error) {
      // Captura erros inesperados da chamada
      Alert.alert('Erro Crítico', 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      // CORREÇÃO: O bloco 'finally' garante que o loading
      // seja desativado, quer a operação tenha sucesso ou falhe.
      setLoading(false);
    }
  };

  const goToCadastro = () => navigation.navigate('Cadastro');

  return (
    <Container>
      <Header showBackButton={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <FormContainer>
          <Title>LOGIN</Title>
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            isPassword={true}
          />
          <View style={{ width: '100%', marginTop: 10 }}>
            <Button onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#000" /> : 'ENTRAR'}
            </Button>
          </View>
          <SignUpContainer onPress={goToCadastro}>
            <SignUpText>
              Não tem login? <SignUpLink>Faça seu cadastro aqui.</SignUpLink>
            </SignUpText>
          </SignUpContainer>
        </FormContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}