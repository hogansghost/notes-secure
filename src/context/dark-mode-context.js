import React, { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();

export const Themes = {
  Dark: 'dark',
  Light: 'light',
};

export function DarkModeProvider({
  children,
}) {
  const darkMediaQuery = 'screen and (prefers-color-scheme: dark)';

  const [darkMode, setDarkMode] = useState(Themes.Light);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeChange = () => {
    const isPreferenceDarkMode = window.matchMedia(darkMediaQuery).matches;

    setDarkMode(isPreferenceDarkMode ? Themes.Dark : Themes.Light);
    setIsDarkMode(isPreferenceDarkMode);
  };

  useEffect(() => {
    window.matchMedia(darkMediaQuery).addEventListener('change', handleDarkModeChange);

    return () => {
      window.matchMedia(darkMediaQuery).removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  useEffect(() => {
    setDarkMode(isDarkMode ? Themes.Dark : Themes.Light);
    document.documentElement.setAttribute('data-theme', isDarkMode ? Themes.Dark : Themes.Light);
  }, [isDarkMode]);

  useEffect(() => {
    const isPreferenceDarkMode = window.matchMedia(darkMediaQuery).matches;
    setIsDarkMode(isPreferenceDarkMode);
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}
