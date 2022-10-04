import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from 'styled-components/native';

import { format } from 'date-fns';
import { Alert } from "react-native";

import { Calendar, DayProps, generateinterval, MarkedDateProps } from '@components/Calendar';
import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import ArrowSvg from "@assets/arrow.svg";

import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Footer, Content } from './styles';
import { getPlatformDate } from "@utils/getPlatformDate";
import { CarDTO } from "@dtos/CarDTO";

type RentalPeriod = {
    startFormated: string;
    endFormated: string;
}

type Params = {
    car: CarDTO;
}

export function Scheduling() {
    const [lastSelectedDay, setLastSelectedDay] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();

    const navigation = useNavigation();

    const route = useRoute();
    const { car } = route.params as Params;


    function handleConfirmRental() {
        if (!rentalPeriod.startFormated || !rentalPeriod.endFormated) {
            return Alert.alert('Selecione o intervalo para alugar')
        }

        navigation.navigate('schedulingDetails', {
            car,
            dates: Object.keys(markedDates)
        });
    }

    function handleGoBack() {
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDay.timestamp ? date : lastSelectedDay;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDay(end);

        const interval = generateinterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormated: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormated: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        });
    }


    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleGoBack}
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
                        <DateValue isSelected={!!rentalPeriod.startFormated} >{rentalPeriod.startFormated}</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue isSelected={!!rentalPeriod.endFormated}>{rentalPeriod.endFormated}</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>


            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />

            </Content>


            <Footer>
                <Button
                    title='Confirmar'
                    onPress={handleConfirmRental}
                    disabled={!rentalPeriod.startFormated}
                />
            </Footer>

        </Container>
    );
}