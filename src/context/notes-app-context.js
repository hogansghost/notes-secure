import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorageState } from 'hooks/index';

import { LoadingContext, LoadingStates } from 'context/loading-context';

import { sanitize } from 'utils/sanitation';

export const NotesAppContext = createContext();

export function NotesAppProvider({
  children,
}) {
  const initialNotes = [{
    dateCreated: new Date(),
    dateEdited: new Date(),
    title: 'Note 1: Oldest note',
    content: 'Add proper markup',
    id: uuidv4(),
  }, {
    dateCreated: new Date(),
    dateEdited: new Date(),
    title: 'Note 2',
    content: 'Add styling',
    id: uuidv4(),
  }, {
    dateCreated: new Date(),
    dateEdited: new Date(),
    title: 'Note 3',
    content: 'Build proper ui (atomic) components',
    id: uuidv4(),
  }];

  const {
    addLoadingState,
    removeLoadingState,
  } = useContext(LoadingContext);

  const [isGlobalEditing, setIsGlobalEditing] = useState(false);
  const [notesList, setNotesList] = useLocalStorageState('notes-list', initialNotes);
  const [selectedNote, setSelectedNote] = useState(null);


  const wait = async (delay = 500) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });
  };

  const encrypt = async (data) => {
      await wait(500);

      return data;
    }

    const decrypt = async (data) => {
      addLoadingState(LoadingStates.Saving);
      await wait(500);
      removeLoadingState(LoadingStates.Saving);

      return data;
  }

  const setActiveNote = async (id) => {
    const noteObj = notesList.filter((note) => note.id === id)[0];
    const noteContent = await decrypt(noteObj.content);
    const noteDecrypted = {
      ...noteObj,
      content: noteContent,
    };

    setSelectedNote(noteDecrypted);
  }


  const addNewNote = ({ title, content }) => {
    setNotesList([...notesList, {
      dateCreated: new Date(),
      dateEdited: new Date(),
      content,
      id: uuidv4(),
      title,
    }]);
  };

  const editTask = ({ updatedId, updatedContent }) => {
    const updatedNote = notesList.map((currTask, index) => (
      currTask.id === updatedId ? { ...currTask, content: updatedContent } : currTask
    ));

    setNotesList(updatedNote);
  };

  const removeTask = ({ id: updatedId }) => {
    const updatedNote = notesList.filter((currTask) => (
      currTask.id !== updatedId
    ));

    setNotesList(updatedNote);
  };

  return (
    <NotesAppContext.Provider
      value={{
        isGlobalEditing,
        setIsGlobalEditing,
        encrypt,
        decrypt,
        editTask,
        removeTask,
        selectedNote,
        addNewNote,
        setActiveNote,
        notesList,
      }}
    >
      {children}
    </NotesAppContext.Provider>
  );
}
