import React from 'react';
import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components/native';
import { ActivityIndicator } from "react-native";

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

import { Home } from './src/screens/Home';
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
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />

      {fontsLoaded ? <Home /> : <ActivityIndicator size="large" color="#00ff00" />}

    </ThemeProvider>
  );
}
