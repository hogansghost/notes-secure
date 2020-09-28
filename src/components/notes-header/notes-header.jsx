import React, { useContext } from 'react';

import { DarkModeContext } from 'context/dark-mode-context';
import { LoadingContext } from 'context/loading-context';
import { NotesAppContext } from 'context/notes-app-context';

import Button from 'components/ui/button/button';

import './notes-header.scss';

export const NotesHeader = () => {
  const {
    isDarkMode,
    setIsDarkMode,
  } = useContext(DarkModeContext);

  const {
    isLoading,
  } = useContext(LoadingContext);

  const {
    isAdding,
    isGlobalEditing,
    setIsAdding,
    setIsGlobalEditing,
  } = useContext(NotesAppContext);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const handleNewClick = () => {
    setIsAdding(true);
    setIsGlobalEditing(true);
  }

  const disableNewNote = isGlobalEditing || isAdding || isLoading;

  return (
    <header className="notes-header">
      <div className="notes-header__actions">
        <Button disabled={disableNewNote} onClick={handleNewClick}>New note</Button>
      </div>

      <div className="notes-header__theme-actions">
        <Button onClick={toggleDarkMode}>Dark mode</Button>
      </div>
    </header>
  )
}

export default NotesHeader;
