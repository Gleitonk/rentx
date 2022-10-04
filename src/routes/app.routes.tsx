import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from '@screens/Home';
import { CarDetails } from '@screens/CarDetails';
import { Scheduling } from '@screens/Scheduling';
import { SchedulingDetails } from '@screens/SchedulingDetails';
import { SchedulingComplete } from '@screens/SchedulingComplete';
import { MyCars } from '@screens/MyCars';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} >
            <Screen
                name="home"
                component={Home}
            />

            <Screen
                name="carDetails"
                component={CarDetails}
            />

            <Screen
                name="scheduling"
                component={Scheduling}
            />

            <Screen
                name="schedulingDetails"
                component={SchedulingDetails}
            />

            <Screen
                name="schedulingComplete"
                component={SchedulingComplete}
            />

            <Screen
                name="myCars"
                component={MyCars}
            />

        </Navigator>
    );
}