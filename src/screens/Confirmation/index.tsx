import { useNavigation, useRoute } from "@react-navigation/native";

import { useWindowDimensions } from 'react-native';

import { Container, Content, Message, Title, Footer } from './styles';

import LogoSvg from '@assets/logo_background_gray.svg';
import DoneSvg from '@assets/done.svg';
import { ConfirmButton } from '@components/ConfirmButton';

type Params = {
    title: string;
    message: string;
    nextScreenRoute: any;
}

export function Confirmation() {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const route = useRoute();

    const { title, message, nextScreenRoute } = route.params as Params;

    function handleConfirm() {
        navigation.navigate(nextScreenRoute);
    }

    return (
        <Container>
            <LogoSvg
                width={width}
            />

            <Content>
                <DoneSvg
                    width={80}
                    height={80}
                />

                <Title>{title}</Title>

                <Message>
                    {message}
                </Message>
            </Content>

            <Footer>
                <ConfirmButton
                    title='OK'
                    onPress={handleConfirm}
                />
            </Footer>

        </Container>
    );
}