import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from 'react-native-responsive-fontsize';

import { CarList, Container, Header, HeaderContent, MyCarsButton, TotalCars } from './styles';
import Logo from '@assets/logo.svg';

import { Car } from '@components/Car';
import { Loading } from '@components/Loading';

import { api } from '@services/api';

import { CarDTO } from '@dtos/CarDTO';
import { useTheme } from 'styled-components/native';

export function Home() {
    const navigation = useNavigation();

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const theme = useTheme();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('carDetails', { car });
    }

    function handleOpenMyCars() {
        navigation.navigate('myCars');
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars')
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCars()
    }, [])

    return (
        <Container >
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />

                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>


            {isLoading ? <Loading /> :
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={(item) => (
                        < Car
                            data={item.item}
                            onPress={() => handleCarDetails(item.item)}
                        />
                    )}

                />
            }

            <MyCarsButton
                onPress={handleOpenMyCars}
            >
                <Ionicons
                    name='ios-car-sport'
                    size={32}
                    color={theme.colors.shape}
                />
            </MyCarsButton>
        </Container>
    );
}