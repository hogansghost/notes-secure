import React, { useContext } from 'react';

import { DarkModeContext } from 'context/dark-mode-context';

import './notes-header.scss';

export const NotesHeader = ({
  notes
}) => {
  const {
    isDarkMode,
    setIsDarkMode,
  } = useContext(DarkModeContext);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <header className="notes-header">header <button className="" onClick={toggleDarkMode}>DARK LIGHT</button></header>
  )
}

export default NotesHeader;
