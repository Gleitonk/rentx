import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons'

import { BackButton } from '@components/BackButton';
import { Car } from '@components/Car';
import { Loading } from '@components/Loading';

import { CarDTO } from '@dtos/CarDTO';

import { api } from '@services/api';


import { Appointments, AppointmentsQuantity, AppointmentsTitle, CarFooter, CarFooterDate, CarFooterPeriod, CarFooterTitle, CarWrapper, Container, Content, EmptyContainer, Header, Subtitle, Title } from './styles';
import { ListEmpty } from '@components/ListEmpty';

type Carprops = {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

export function MyCars() {
    const [cars, setCars] = useState<Carprops[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();
    const theme = useTheme();

    function handleGoBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchMyCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMyCars();
    }, []);

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleGoBack}
                    color={theme.colors.shape}
                />

                <Title>
                    Seus agendamentos,{'\n'}
                    estão aqui.
                </Title>

                <Subtitle>
                    Conforto, segurança e preticidade.
                </Subtitle>
            </Header>

            {isLoading ? <Loading /> :

                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>

                    <FlatList
                        data={cars}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car
                                    data={item.car}
                                />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name='arrowright'
                                            size={20}
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}

                        ListEmptyComponent={() => (
                            <EmptyContainer>
                                <ListEmpty
                                message="Não há agendamentos."
                            />
                            </EmptyContainer>
                        )}

                        showsVerticalScrollIndicator={false}
                    />
                </Content>
            }
        </Container>
    );
}