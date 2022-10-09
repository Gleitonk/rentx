import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Yup from "yup";

import { Container, Form, FormTitle, Header, Steps, Subtitle, Title } from './styles';

import { BackButton } from '@components/BackButton';
import { Bullet } from '@components/Bullet';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/auth';

export function SignUpFirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');

  const navigation = useNavigation();
  const { user } = useAuth();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        drivingLicense: Yup.string()
          .required('CNH é obrigatória'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        name: Yup.string()
          .required('Nome é obrigatório')
      });

      const data = { name, email, drivingLicense }

      await schema.validate(data);

      navigation.navigate('signupsecondstep', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Ops', error.message);
      }



    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <Container>
          <Header>

            <BackButton onPress={handleGoBack} />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>

          </Header>

          <Title>
            Crie sua{`\n`}conta
          </Title>

          <Subtitle>
            Faça seu cadastro{`\n`}de froma rápida e fácil
          </Subtitle>


          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              keyboardType='email-address'
              onChangeText={setName}
              value={name}
            />

            <Input
              iconName='mail'
              placeholder='E-mail'
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              onChangeText={setDrivingLicense}
              value={drivingLicense}
            />
          </Form>

          <Button
            title='Próximo'
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}