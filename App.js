import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';

// FavoritesProvider makes the favorites list available to every screen
export default function App() {
  return (
    <FavoritesProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </FavoritesProvider>
  );
}