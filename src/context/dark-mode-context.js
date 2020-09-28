import React, { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();

export const Themes = {
  Dark: 'dark',
  Light: 'light',
};

export function DarkmodeProvider({
  children,
}) {
  const darkMediaQuery = 'screen and (prefers-color-scheme: dark)';

  const [darkMode, setDarkMode] = useState(Themes.Light);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // const handleDarkModeChangeCallback = useCallback(() => {
  //   const isDarkMode = darkMode === Themes.Dark;

  //   setDarkMode(isDarkMode ? Themes.Dark : Themes.Light);
  // }, [darkMode]);

  const handleDarkModeChange = () => {
    const isDarkMode = window.matchMedia(darkMediaQuery).matches;

    setDarkMode(isDarkMode ? Themes.Dark : Themes.Light);
    setIsDarkMode(isDarkMode);
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
