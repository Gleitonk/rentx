import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

import { useTheme } from 'styled-components/native';
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { Accessory } from '@components/Accessory';
import { BackButton } from '@components/BackButton';
import { Button } from '@components/Button';
import { ImageSlider } from '@components/ImageSlider';

import { About, Accessories, Brand, CarImages, Container, Description, Details, Footer, Header, Name, Period, Price, Rent } from './styles';

import { CarDTO } from "@dtos/CarDTO";
import { getAccessoryIcon } from "@utils/getAccessoryIcon";


type Params = {
    car: CarDTO;
}

export function CarDetails() {
    const theme = useTheme();

    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    const scrollY = useSharedValue(0);

    const scrollHandle = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    });

    function handleConfirmRental() {
        navigation.navigate('scheduling', { car });
    }

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary }
                ]}
            >
                <Header>
                    <BackButton
                        onPress={handleGoBack}
                    />
                </Header>

                <Animated.View
                    style={[sliderCarsStyleAnimation]}
                >
                    <CarImages>
                        <ImageSlider
                            imageUrl={car.photos}
                        />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandle}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
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
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button
                    title='Escolher per??odo do aluguel'
                    onPress={handleConfirmRental}
                />
            </Footer>
        </Container >
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    }
})