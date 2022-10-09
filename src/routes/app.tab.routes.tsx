import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from 'styled-components/native';

import { Home } from '@screens/Home';
import { MyCars } from '@screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';

const { Navigator, Screen } = createBottomTabNavigator();

import HomeSvg from '@assets/home.svg';
import CarSvg from '@assets/car.svg';
import PeopleSvg from '@assets/people.svg';
import { Platform } from 'react-native';
import { Profile } from '@screens/Profile';

export function AppTabRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: theme.colors.text_details,
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 60,
                    backgroundColor: theme.colors.background_primary
                }
            }}
        >

            <Screen
                name="AppStackRoutes"
                component={AppStackRoutes}
                options={{
                    tabBarIcon: (({ color }) => (
                        <HomeSvg width={24} height={24} fill={color} />
                    ))
                }}
            />

            <Screen
                name="mycars"
                component={MyCars}
                options={{
                    tabBarIcon: (({ color }) => (
                        <CarSvg width={24} height={24} fill={color} />
                    ))
                }}
            />

            <Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: (({ color }) => (
                        <PeopleSvg width={24} height={24} fill={color} />
                    ))
                }}
            />


        </Navigator>
    );
}