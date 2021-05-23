import React from 'react';
import HomeScreen from './src/components/HomeScreen';
import { ThemeProvider } from './src/utils/ThemeProvider';
import SplashScreen from "react-native-splash-screen";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

// Root component of the application
const App = () => {

  // Hide Splash screen on app load.
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 250) //so that selected theme is set from async before rendering App
  });

  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
