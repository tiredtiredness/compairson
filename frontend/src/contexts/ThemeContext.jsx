import { createContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // light / dark
  return (
    <ThemeContext.Provider value={(theme, setTheme)}></ThemeContext.Provider>
  );
};

export { ThemeContext };
