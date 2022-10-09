import React from 'react';
import LottieView from 'lottie-react-native';

import CarAnimation from '@assets/car_animation.json';

import { Container } from './styles';

export function LoadAnimation() {
    return (
        <Container>
            <LottieView
                source={CarAnimation}
                style={{ height: 200 }}
                resizeMode='contain'
                autoPlay
                loop
            />
        </Container>
    );
}