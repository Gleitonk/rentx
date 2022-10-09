import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import Logo from '@assets/logo.svg';

import { Car } from '@components/Car';
import { LoadAnimation } from '@components/LoadAnimation';

import { api } from '@services/api';

import { CarDTO } from '@dtos/CarDTO';

// import { Ionicons } from "@expo/vector-icons";
// import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);
// import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

export function Home() {
    const navigation = useNavigation();
    const theme = useTheme();

    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('carDetails', { car });
    }

    // const positionX = useSharedValue(0);
    // const positionY = useSharedValue(0);

    // const myCarsButtonStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [
    //             { translateX: positionX.value },
    //             { translateY: positionY.value }
    //         ]
    //     }
    // });

    // const onGestureEvent = useAnimatedGestureHandler({
    //     onStart: (_, context: any) => {
    //         context.positionX = positionX.value;
    //         context.positionY = positionY.value;
    //     },
    //     onActive: (event, context: any) => {
    //         positionX.value = event.translationX;
    //         positionY.value = event.translationY;
    //     },
    //     onEnd: (event) => {
    //         positionX.value = withSpring(0);
    //         positionY.value = withSpring(0);
    //     }
    // });


    // function handleOpenMyCars() {
    //     navigation.navigate('myCars');
    // }

    useEffect(() => {
        let isMounted = true;

        async function fetchCars() {
            try {
                const response = await api.get('/cars');
                if (isMounted) {
                    setCars(response.data);
                }

            } catch (error) {
                console.log(error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }
        fetchCars();

        return () => {
            isMounted = false;
        }
    }, [])

    return (
        <Container >
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />

                    {
                        !isLoading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>


            {isLoading ? <LoadAnimation /> :
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

            {/* <PanGestureHandler
                onGestureEvent={onGestureEvent}
            >
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated
                        onPress={handleOpenMyCars}
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                    >
                        <Ionicons
                            name='ios-car-sport'
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler> */}
        </Container>
    );
}


const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});