import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useModal } from '../../hooks/useModal';

import { Container, FormContainer, Title, SignUpContainer, SignUpText, SignUpLink } from './styles';
import { MessageText } from '../../components/Modal/styles';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login({ navigation }) {
  const { login } = useAuth();
  const { showModal, hideModal } = useModal();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      showModal({ title: 'Atenção', content: <MessageText>Por favor, preencha e-mail e senha.</MessageText> });
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, senha);
      if (result.success) {
        showModal({
          title: 'Login Bem-Sucedido!',
          content: <MessageText>Bem-vindo(a) de volta, {result.user?.nome || ''}!</MessageText>,
          footer: <Button onPress={hideModal}>Continuar</Button>
        });
      } else {
        showModal({ title: 'Erro no Login', content: <MessageText>{result.error}</MessageText> });
      }
    } catch (error) {
      showModal({ title: 'Erro de Conexão', content: <MessageText>Não foi possível conectar ao servidor.</MessageText> });
    } finally {
      setLoading(false);
    }
  };

  const goToCadastro = () => navigation.navigate('Cadastro');
  // Função para navegar para a tela de testes
  const goToTestes = () => navigation.navigate('Testes');

  return (
    <Container>
      <Header showBackButton={false} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <FormContainer>
          <Title>LOGIN</Title>
          <Input placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Input placeholder="Senha" value={senha} onChangeText={setSenha} isPassword={true} />
          <View style={{ width: '100%', marginTop: 10 }}>
            <Button onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#000" /> : 'ENTRAR'}
            </Button>
          </View>

          {/* Botão que leva para a página de testes */}
          <View style={{ width: '100%', marginTop: 20 }}>
            <Button onPress={goToTestes}>
              PÁGINA DE TESTES
            </Button>
          </View>
          
          <SignUpContainer onPress={goToCadastro}>
            <SignUpText>Não tem login? <SignUpLink>Faça seu cadastro aqui.</SignUpLink></SignUpText>
          </SignUpContainer>
        </FormContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}