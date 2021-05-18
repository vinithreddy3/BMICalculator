import React from 'react';
import HomeScreen from './src/components/HomeScreen';
import { ThemeProvider } from './src/utils/ThemeProvider';

// Root component of the application
const App = () => {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
