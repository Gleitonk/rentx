import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from 'styled-components/native';
import { ActivityIndicator } from "react-native";

import { Routes } from './src/routes';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import theme from './src/theme';
import { AppProvider } from '@hooks/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if (!fontsLoaded) {
    return (
      <ActivityIndicator size="large" color={theme.colors.main}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.header }}
      />
    )
  }

  return (
    <ThemeProvider
      theme={theme}
    >
      <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>

          <StatusBar
            style="light"
            backgroundColor='transparent'
            translucent
          />

          <Routes />

        </GestureHandlerRootView>
      </AppProvider>
    </ThemeProvider>
  );
}
