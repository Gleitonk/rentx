import { BackButton } from '@components/BackButton';
import ArrowSvg from "@assets/arrow.svg";

import { useTheme } from 'styled-components/native';
import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Footer, Content } from './styles';
import { Button } from '@components/Button';
import { Calendar } from '@components/Calendar';

export function Scheduling() {
    const theme = useTheme();

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={() => { }}
                    color={theme.colors.shape}
                />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel.
                </Title>


                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue isSelected={false} >02/10/2022</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue isSelected={false}>02/10/2022</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar />

            </Content>

            <Footer>
                <Button
                    title='Confirmar'
                />
            </Footer>

        </Container>
    );
}