import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';

import * as Yup from "yup";

import { StatusBar } from 'expo-status-bar';

import { Footer, Container, Header, Subtitle, Title, Form } from './styles';

import { Button } from '@components/Button';
import { useTheme } from 'styled-components/native';
import { Input } from '@components/Input';
import { PasswordInput } from '@components/PasswordInput';

export function SignIn() {
    const theme = useTheme();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { signIn } = useAuth();

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('Senha é obrigatória')
            });

            await schema.validate({ email, password });

            signIn({ email, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Ops', error.message)
            }
            return Alert.alert(
                'Erro na autenticação',
                'Ocorreu um erro ao fazer login, verifique as credenciais.'
            )
        }
    }

    function handleNewAccount() {
        navigation.navigate('signupfirststep');
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <Container>

                    <StatusBar
                        style="dark"
                        backgroundColor='transparent'
                        translucent
                    />

                    <Header>

                        <Title>
                            Estamons {`\n`}
                            quase lá.
                        </Title>


                        <Subtitle>
                            Faça seu login para começar {`\n`}
                            sua experiência incrivel.
                        </Subtitle>

                    </Header>

                    <Form>
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            autoCapitalize='none'
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title='Login'
                            onPress={handleSignIn}
                            disabled={(email && password) ? false : true}
                            loading={isLoading}
                        />

                        <Button
                            color={theme.colors.background_secondary}
                            light
                            title='Criar conta gratuita'
                            onPress={handleNewAccount}
                            disabled={false}
                        />
                    </Footer>

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}