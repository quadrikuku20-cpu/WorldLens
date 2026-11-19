// Import the function that starts a React Native app with Expo
import { registerRootComponent } from 'expo';
// Import our root component from App.js
import App from './App';

// Tell Expo that App is the first component to show when the app opens
registerRootComponent(App);
