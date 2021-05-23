import React from "react";
import { useColorScheme } from "react-native";
import { getAsyncItem, setASyncItem } from "./utils";

type themeVarieties = {
  color: string,
  inverted: string
}

export type themeTypes = {
  light: themeVarieties,
  dark: themeVarieties
}

type themeContext = {
  theme: 'light' | 'dark',
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<themeContext>({
  theme: 'light',
  toggleTheme: () => { }
});

export const ThemeProvider: React.FC = ({ children }) => {
  // get whether device theme is dark/light
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = React.useState<any>(deviceTheme ?? 'light');

  // Method to toggle light / dark theme
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setASyncItem({ key: 'selectedTheme', value: 'dark' });
    }
    else if (theme === 'dark') {
      setTheme('light')
      setASyncItem({ key: 'selectedTheme', value: 'light' });
    }
  }

  // Set the persisted theme selected by user
  React.useEffect(() => {
    getAsyncItem('selectedTheme').then((theme) => {
      theme && setTheme(theme);
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )

}