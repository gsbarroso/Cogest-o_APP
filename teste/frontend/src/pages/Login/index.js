import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/useAuth'; // 1. Importa o hook

import { Container, FormContainer, Title, SignUpContainer, SignUpText, SignUpLink } from './styles';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login({ navigation }) {
  const { login } = useAuth(); // 2. Pega a função de login do hook
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha e-mail e senha.');
      return;
    }
    setLoading(true);
    const result = await login(email, senha); // 3. Usa a função de login
    setLoading(false);

    if (!result.success) {
      Alert.alert('Erro no Login', result.error);
    } else {
      // A navegação será controlada pelo estado de autenticação agora,
      // mas podemos manter o replace para uma transição imediata.
      navigation.replace('Home');
    }
  };

  const goToCadastro = () => {
    navigation.navigate('Cadastro');
  };

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
          <Button onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : 'ENTRAR'}
          </Button>
          <SignUpContainer onPress={goToCadastro}>
            <SignUpText>
              Não possui conta? <SignUpLink>Faça seu cadastro aqui.</SignUpLink>
            </SignUpText>
          </SignUpContainer>
        </FormContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}