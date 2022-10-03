import { useNavigation, useRoute } from "@react-navigation/native";

import { Accessory } from '@components/Accessory';
import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import { ImageSlider } from '@components/ImageSlider';

import { About, Accessories, Brand, CarImages, Container, Content, Description, Details, Footer, Header, Name, Period, Price, Rent } from './styles';

import speedSvg from '@assets/speed.svg';
import accelerationSvg from '@assets/acceleration.svg';
import gasolineSvg from '@assets/gasoline.svg';
import exchangeSvg from '@assets/exchange.svg';
import forceSvg from '@assets/force.svg';
import peopleSvg from '@assets/people.svg';
import { CarDTO } from "@dtos/CarDTO";
import { getAccessoryIcon } from "@utils/getAccessoryIcon";

type Params = {
    car: CarDTO;
}

export function CarDetails() {
    const navigation = useNavigation();

    const route = useRoute();

    const { car } = route.params as Params;

    function handleConfirmRental() {
        navigation.navigate('scheduling')
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

                <About>
                    {car.about}
                </About>
            </Content>

            <Footer>
                <Button
                    title='Escolher período do aluguel'
                    onPress={handleConfirmRental}
                />
            </Footer>
        </Container>
    );
}