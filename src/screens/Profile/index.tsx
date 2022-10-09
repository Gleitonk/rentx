import { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';

import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '@hooks/auth';
import { useTheme } from 'styled-components/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { BackButton } from '@components/BackButton';

import { Container, Content, Header, HeaderTitle, HeaderTop, LogOutButton, Option, Options, OptionTitle, Photo, PhotoButton, PhotoContainer, Section } from './styles';
import { Input } from '@components/Input';
import { PasswordInput } from '@components/PasswordInput';
import { Button } from '@components/Button';


export function Profile() {
    const { user, signOut, updateUser } = useAuth();

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    const theme = useTheme();
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    function handleOptionChange(selectedOption: 'dataEdit' | 'passwordEdit') {
        setOption(selectedOption);
    }

    async function handleSelectAvatar() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if (result.cancelled) {
            return;
        }

        if (result.uri) {
            setAvatar(result.uri);
        }
    }

    async function handleProfileUpdate() {
        try {

            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatória'),
                name: Yup.string().required('Nome é obrigatório')
            })

            const data = { name, driverLicense }

            await schema.validate(data);

            await updateUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token
            });

            Alert.alert('Perfil atualizado');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Ops', error.message)
            } else {
                console.log(error);
                Alert.alert('Ops', 'Não foi possível atualizar perfil')
            }
        }
    }

    function handleSignOut() {
        Alert.alert('Tem certeza?', 'Deseja mesmo sair da conta?', [
            {
                text: 'Sim',
                onPress: signOut
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                color={theme.colors.shape}
                                onPress={handleGoBack}
                            />

                            <HeaderTitle>Editar Perfil</HeaderTitle>

                            <LogOutButton onPress={handleSignOut}>
                                <Feather
                                    name='power'
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </LogOutButton>
                        </HeaderTop>

                        <PhotoContainer>
                            {!!avatar && <Photo source={{ uri: avatar }} />}

                            <PhotoButton onPress={handleSelectAvatar}>
                                <Feather
                                    name='camera'
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <Content
                        style={{ marginBottom: useBottomTabBarHeight() }}
                    >
                        <Options>
                            <Option
                                active={option === 'dataEdit'}
                                onPress={() => handleOptionChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dados
                                </OptionTitle>
                            </Option>

                            <Option
                                active={option === 'passwordEdit'}
                                onPress={() => handleOptionChange('passwordEdit')}
                            >
                                <OptionTitle active={option === 'passwordEdit'}>
                                    Trocar senha
                                </OptionTitle>
                            </Option>






                        </Options>
                        {
                            option === 'dataEdit' ?
                                <Section>
                                    <Input
                                        iconName='user'
                                        placeholder='Nome'
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                        onChangeText={setName}
                                    />

                                    <Input
                                        editable={false}
                                        iconName='mail'
                                        defaultValue={user.email}
                                        autoCorrect={false}
                                    />

                                    <Input
                                        iconName='credit-card'
                                        placeholder='CNH'
                                        keyboardType='numeric'
                                        defaultValue={user.driver_license}
                                        onChangeText={setDriverLicense}
                                    />
                                </Section>

                                :

                                <Section>

                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Senha atual'
                                    />

                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Nova senha'
                                    />

                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Confirmar sua senha'
                                    />

                                </Section>

                        }
                        <Button
                            title='Salvar alterações'
                            onPress={handleProfileUpdate}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}