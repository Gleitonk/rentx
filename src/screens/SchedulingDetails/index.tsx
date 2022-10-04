import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from "date-fns";
import { Feather } from '@expo/vector-icons';

import { Accessory } from '@components/Accessory';
import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import { ImageSlider } from '@components/ImageSlider';

import { Accessories, Brand, CalendarIcon, CarImages, Container, Content, DateInfo, DateTitle, DateValue, Description, Details, Footer, Header, Name, Period, Price, Rent, RentalPeriod, RentalPrice, RentalPriceDetail, RentalPriceLabel, RentalPriceQuota, RentalPriceTotal } from './styles';


import { getAccessoryIcon } from "@utils/getAccessoryIcon";
import { getPlatformDate } from "@utils/getPlatformDate";

import { CarDTO } from "@dtos/CarDTO";
import { api } from "@services/api";
import { Alert } from "react-native";

type Params = {
    car: CarDTO;
    dates: string[];
}

type RentalPeriod = {
    start: string;
    end: string;
}

export function SchedulingDetails() {
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();
    const navigation = useNavigation();

    const route = useRoute();

    const { car, dates } = route.params as Params;

    const rentTotal = Number(dates.length * car.rent.price)

    async function handleCompleteRental() {
        setIsLoading(true);

        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates
        ];

        await api.post('schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        });

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
            .then(() => navigation.navigate('schedulingComplete'))
            .catch((err) => {
                setIsLoading(false);
                Alert.alert('Ops!', 'Não foi possível completar o agendamento.')
                console.log(err)
            });
    }

    function handleGoBack() {
        navigation.goBack();
    }


    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
        })

    }, [])


    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleGoBack}
                />
            </Header>

            <CarImages>
                <ImageSlider
                    imageUrl={car.photos}
                />
            </CarImages>


            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }
                </Accessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name={'calendar'}
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name={'chevron-right'}
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>


                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetail>
                        <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetail>
                </RentalPrice>


            </Content>

            <Footer>
                <Button
                    title='Alugar agora'
                    color={theme.colors.success}
                    onPress={handleCompleteRental}
                    loading={isLoading}
                    disabled={isLoading}
                >
                </Button>
            </Footer>
        </Container>
    );
}