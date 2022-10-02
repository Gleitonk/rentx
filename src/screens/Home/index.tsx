import React from 'react';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container, Header, HeaderContent, TotalCars } from './styles';
import Logo from '@assets/logo.svg';
import { Car } from '@components/Car';

export function Home() {
    const carData = {
        brand: 'AUDI',
        name: 'RS 6 AVANT',
        rent: {
            period: 'AO DIA',
            price: 520,
        },
        thumbnail: 'https://www.pngmart.com/files/22/Audi-RS6-PNG-Pic.png',
    }

    const carData2 = {
        brand: 'PORCHE',
        name: '911 GT3 RS',
        rent: {
            period: 'AO DIA',
            price: 520,
        },
        thumbnail: 'https://di-uploads-pod15.dealerinspire.com/rusnakwestlakeporsche/uploads/2019/07/2019PRC010464_640_01.png',
    }
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

            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7]}
                keyExtractor={item => String(item)}
                renderItem={(item) => (
                    <Car
                        data={carData}
                    />
                )}
                contentContainerStyle={{ padding: 24, paddingBottom: 150 }}
                showsVerticalScrollIndicator={false}
            />

        </Container>
    );
}