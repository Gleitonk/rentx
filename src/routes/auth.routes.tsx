import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Splash } from '@screens/Splash';
import { SignIn } from '@screens/SignIn';
import { SignUpFirstStep } from '@screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '@screens/SignUp/SignUpSecondStep';
import { Confirmation } from '@screens/Confirmation';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='signin'>
            <Screen
                name="splash"
                component={Splash}
            />

            <Screen
                name="signin"
                component={SignIn}
            />

            <Screen
                name="signupfirststep"
                component={SignUpFirstStep}
            />

            <Screen
                name="signupsecondstep"
                component={SignUpSecondStep}
            />

            <Screen
                name="confirmation"
                component={Confirmation}
            />

        </Navigator>
    );
}