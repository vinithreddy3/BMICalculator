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
    SplashScreen.hide();
  });

  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
