import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { Container, Form, FormTitle, Header, Steps, Subtitle, Title } from './styles';

import { BackButton } from '@components/BackButton';
import { Bullet } from '@components/Bullet';
import { Button } from '@components/Button';
import { PasswordInput } from '@components/PasswordInput';
import { api } from '@services/api';

type Params = {
  user: {
    name: string;
    email: string;
    drivingLicense: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha');
    }

    if (password != passwordConfirm) {
      return Alert.alert('As senhas não são iguais');
    }

    await api.post('users', {
      name: user.name,
      email: user.email,
      driver_license: user.drivingLicense,
      password
    })
      .then(() => {
        navigation.navigate('confirmation', {
          title: 'Conta criada!',
          message: 'Agora é só fazer login\ne aproveitar',
          nextScreenRoute: 'signin'
        })
      })
      .catch(() => {
        Alert.alert('Ops', 'Não foi possível fazer o cadastro')
      })
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <Container>
          <Header>

            <BackButton onPress={handleGoBack} />

            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>

          </Header>

          <Title>
            Crie sua{`\n`}conta
          </Title>

          <Subtitle>
            Faça seu cadastro{`\n`}de froma rápida e fácil
          </Subtitle>


          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />

            <PasswordInput
              iconName='lock'
              placeholder='Repetir senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}