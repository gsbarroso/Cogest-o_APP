// =================================================================
// 1. PÁGINA DE LOGIN CORRIGIDA E MAIS ROBUSTA
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
      
      // Se o login falhar, o hook já mostra um alerta.
      // O estado de loading será desativado no 'finally'.
      if (!result.success) {
        // Apenas para garantir que o loading pare aqui também em caso de falha controlada.
        setLoading(false);
      }
      // Se o login for bem-sucedido, a navegação para a Home é automática
      // porque o estado 'signed' no AuthProvider muda, e o nosso sistema de rotas reage a isso.

    } catch (error) {
      // Este catch é para erros inesperados que o hook não apanhou.
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique a sua rede e o IP da API.');
      setLoading(false);
    }
    // O 'finally' foi removido daqui para um controlo mais explícito do loading,
    // garantindo que ele só para depois de todas as ações.
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