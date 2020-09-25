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
    completed: false,
    description: 'Add proper markup',
    id: uuidv4(),
    order: 0,
  }, {
    completed: false,
    description: 'Add styling',
    id: uuidv4(),
    order: 1,
  }, {
    completed: false,
    description: 'Build proper ui (atomic) components',
    id: uuidv4(),
    order: 2,
  }, {
    completed: false,
    description: 'Add test coverage',
    id: uuidv4(),
    order: 3,
  }, {
    completed: false,
    description: 'Update to TypeScript',
    id: uuidv4(),
    order: 4,
  }, {
    completed: false,
    description: 'See about adding file reordering (mobile is an issue)',
    id: uuidv4(),
    order: 5,
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
    const noteDescription = await decrypt(noteObj.description);
    const noteDecrypted = {
      ...noteObj,
      description: noteDescription,
    };

    setSelectedNote(noteDecrypted);
  }


  const addNewNote = (note) => {
    setNotesList([...notesList, {
      completed: false,
      description: encodeURI(sanitize(note)),
      id: uuidv4(),
      order: notesList.length,
    }]);
  };

  const editTask = ({ updatedId, updatedDescription }) => {
    const updatedNote = notesList.map((currTask, index) => (
      currTask.id === updatedId ? { ...currTask, order: index, description: updatedDescription } : {...currTask, order: index }
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
