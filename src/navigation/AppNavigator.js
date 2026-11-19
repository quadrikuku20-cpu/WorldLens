// React is needed to write components
import React from 'react';
// NavigationContainer wraps the whole app and keeps track of navigation
import { NavigationContainer } from '@react-navigation/native';
// Stack navigator: screens that open on top of each other, with a back button
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Bottom tab navigator: the tab bar at the bottom of the screen
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Ionicons is the icon set from the Expo Vector Icons library
import { Ionicons } from '@expo/vector-icons';

// Import every screen so we can register it below
import HomeScreen from '../screens/HomeScreen';
import CountryListScreen from '../screens/CountryListScreen';
import CountryProfileScreen from '../screens/CountryProfileScreen';
import StateDetailScreen from '../screens/StateDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

// Create one stack navigator and one tab navigator to use below
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// The stack inside the Explore tab: Home -> List -> Profile -> State detail
function ExploreStack() {
  return (
    <Stack.Navigator>
      {/* First screen of the stack, so it opens first */}
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'WorldLens' }} />
      <Stack.Screen name="CountryList" component={CountryListScreen} options={{ title: 'Countries' }} />
      {/* The title comes from the country name passed in when navigating */}
      <Stack.Screen
        name="CountryProfile"
        component={CountryProfileScreen}
        options={({ route }) => ({ title: route.params?.name ?? 'Country' })}
      />
      {/* The title is the state or province name passed in when navigating */}
      <Stack.Screen
        name="StateDetail"
        component={StateDetailScreen}
        options={({ route }) => ({ title: route.params?.stateName ?? 'State' })}
      />
    </Stack.Navigator>
  );
}

// The main navigator: two tabs at the bottom (Explore and Favorites)
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // The stack already has its own header, so hide the tab header
          headerShown: false,
          // Blue color for the selected tab
          tabBarActiveTintColor: '#1F5FA8',
          // Show a globe for Explore and a heart for Favorites
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={route.name === 'Explore' ? 'globe-outline' : 'heart-outline'}
              size={size}
              color={color}
            />
          ),
        })}
      >
        {/* Explore tab shows the whole stack above */}
        <Tab.Screen name="Explore" component={ExploreStack} />
        {/* Favorites tab shows one screen */}
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}