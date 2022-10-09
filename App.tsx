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

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  return (
    <ThemeProvider
      theme={theme}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>

        <StatusBar
          style="light"
          backgroundColor='transparent'
          translucent
        />

        {fontsLoaded ? <Routes /> : <ActivityIndicator size="large" color="#00ff00" />}

      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
