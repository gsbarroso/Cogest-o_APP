// =================================================================
// 1. PÁGINA DE LOGIN CORRIGIDA COM DIAGNÓSTICO
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
    console.log('[LOGIN] A tentar fazer login com:', email); // Log de diagnóstico

    try {
      const result = await login(email, senha);
      
      if (!result.success) {
        // O hook 'login' já mostra um alerta de erro vindo da API
        console.log('[LOGIN] Falha controlada:', result.error);
      }
      // Se o login for bem-sucedido, a navegação para a Home é automática.

    } catch (error) {
      // Este bloco apanha erros de rede (ex: IP errado, firewall)
      console.error('[LOGIN] Erro de rede ou na chamada da API:', error);
      Alert.alert(
        'Erro de Conexão',
        'Não foi possível comunicar com o servidor. Verifique a sua ligação à rede e o endereço de IP da API.'
      );
    } finally {
      // Este bloco garante que o loading é sempre desativado
      setLoading(false);
      console.log('[LOGIN] Processo de login finalizado.');
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