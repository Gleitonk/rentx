import { useNavigation } from "@react-navigation/native";

import { Feather } from '@expo/vector-icons';

import { Accessory } from '@components/Accessory';
import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import { ImageSlider } from '@components/ImageSlider';

import { Accessories, Brand, CalendarIcon, CarImages, Container, Content, DateInfo, DateTitle, DateValue, Description, Details, Footer, Header, Name, Period, Price, Rent, RentalPeriod, RentalPrice, RentalPriceDetail, RentalPriceLabel, RentalPriceQuota, RentalPriceTotal } from './styles';

import speedSvg from '@assets/speed.svg';
import accelerationSvg from '@assets/acceleration.svg';
import gasolineSvg from '@assets/gasoline.svg';
import exchangeSvg from '@assets/exchange.svg';
import forceSvg from '@assets/force.svg';
import peopleSvg from '@assets/people.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';


export function SchedulingDetails() {
    const theme = useTheme();
    const navigation = useNavigation();

    function handleCompleteRental() {
        navigation.navigate('schedulingComplete')
    }

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <Header>
                <BackButton
                    onPress={handleGoBack}
                />
            </Header>

            <CarImages>
                <ImageSlider
                    imageUrl={['https://di-uploads-pod15.dealerinspire.com/rusnakwestlakeporsche/uploads/2019/07/2019PRC010464_640_01.png']}
                />
            </CarImages>


            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <Accessories>
                    <Accessory icon={speedSvg} name="380Km/h" />
                    <Accessory icon={accelerationSvg} name="3.2s" />
                    <Accessory icon={forceSvg} name="800 HP" />
                    <Accessory icon={gasolineSvg} name="Gasolina" />
                    <Accessory icon={exchangeSvg} name="Auto" />
                    <Accessory icon={peopleSvg} name="2 pessoas" />
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
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>

                    <Feather
                        name={'chevron-right'}
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>


                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetail>
                        <RentalPriceQuota>R$ 580 x3 diarias</RentalPriceQuota>
                        <RentalPriceTotal>R$ 3000</RentalPriceTotal>
                    </RentalPriceDetail>
                </RentalPrice>


            </Content>

            <Footer>
                <Button
                    title='Alugar agora'
                    color={theme.colors.success}
                    onPress={handleCompleteRental}
                />
            </Footer>
        </Container>
    );
}