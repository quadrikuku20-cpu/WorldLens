// React is needed to write components
import React from 'react';
// StatusBar controls the phone's top bar (time, battery)
import { StatusBar } from 'expo-status-bar';
// Our navigation (tabs and screens), which we build in the next step
import AppNavigator from './src/navigation/AppNavigator';

// App is the root component: everything in the app is shown inside it
// TODO (Marc): wrap <AppNavigator /> in <FavoritesProvider> once
// src/context/FavoritesContext.js is built, so every screen can use favorites.
export default function App() {
  return (
    <>
      {/* "auto" picks light or dark status bar text to match the phone's theme */}
      <StatusBar style="auto" />
      {/* Show the navigation, which controls which screen is visible */}
      <AppNavigator />
    </>
  );
}