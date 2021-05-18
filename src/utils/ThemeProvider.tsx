import React from "react";
import { AsyncStorage } from "react-native";
import { getAsyncItem } from "./utils";

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
  const [theme, setTheme] = React.useState<any>('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      AsyncStorage.setItem('selectedTheme', 'dark');
    }
    else if (theme === 'dark') {
      setTheme('light')
      AsyncStorage.setItem('selectedTheme', 'light');
    }
  }

  React.useEffect(() => {
    getAsyncItem('selectedTheme').then((theme) => {
      setTheme(theme ?? 'light');
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )

}