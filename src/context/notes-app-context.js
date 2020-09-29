import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorageState } from 'hooks/index';

import { LoadingContext, LoadingStates } from 'context/loading-context';

export const NotesAppContext = createContext();

export function NotesAppProvider({
  children,
}) {
  const initialNotes = [{
    dateCreated: new Date(),
    dateEdited: new Date(),
    title: 'Markup examples',
    content: '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\n\nAlternatively, for H1 and H2, an underline-ish style:\n\nAlt-H1\n======\n\nAlt-H2\n------\n\nEmphasis, aka italics, with *asterisks* or _underscores_.\n\nStrong emphasis, aka bold, with **asterisks** or __underscores__.\n\nCombined emphasis with **asterisks and _underscores_**.\n\nStrikethrough uses two tildes. ~~Scratch this.~~\n\n1. First ordered list item\n2. Another item\n⋅⋅* Unordered sub-list. \n1. Actual numbers don\'t matter, just that it\'s a number\n⋅⋅1. Ordered sub-list\n4. And another item.\n\n⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we\'ll use three here to also align the raw Markdown).\n\n⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅\n⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅\n⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)\n\n* Unordered list can use asterisks\n- Or minuses\n+ Or pluses\n\n```javascript\nvar s = "JavaScript syntax highlighting";\nalert(s);\n```\n \n```python\ns = "Python syntax highlighting"\nprint s\n```\n \n```\nNo language indicated, so no syntax highlighting. \nBut let\'s throw in a <b>tag</b>.\n```',
    id: uuidv4(),
  }, {
    dateCreated: new Date(),
    dateEdited: new Date(),
    title: 'Remaning items',
    content: '"# Remaining items\n\n## Base functionality\n\nCreate a context object to handle the base functionality for adding notes, editing, deleting, with the encrypt and decrypt functions to fun on the description when required such as loading the new notes.\n\nBasically a todo list app but with the added encrypt on save and decrypt functions.\n\n### Custom hooks\n\nA custom hook for the toggling of state as well as an input field hook for handling the input state, clearing it, etc.\n\nPort the dark mode hook that I wrote recently because why not.\n\n## Basic layout\n\nSome basic styling so that this thing is actually useable rather than a mess of buttons everywhere and no clear hierarchy.\n\n## Unit tests\n\nTest components as that\'s a pretty useful skill as well.',
    id: uuidv4(),
  }, {
    dateCreated: new Date(),
    dateEdited: new Date(),
    title: 'Another note',
    content: 'Clean up the default notes from the copy pasted list from my other test project',
    id: uuidv4(),
  }];

  const {
    isLoading,
    addLoadingState,
    removeLoadingState,
  } = useContext(LoadingContext);

  const [isGlobalEditing, setIsGlobalEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [notesList, setNotesList] = useLocalStorageState('notes-list', initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);


  const wait = useCallback(async (delay = 500) => (
    new Promise((resolve, reject) => {
      setTimeout(resolve, delay);
    })
  ), []);

  const encrypt =  useCallback(async (data) => {
    addLoadingState(LoadingStates.Saving);
    await wait(500);
    removeLoadingState(LoadingStates.Saving);

    return data;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wait]);

  const decrypt = useCallback(async (data) => {
    addLoadingState(LoadingStates.Loading);
    await wait(500);
    removeLoadingState(LoadingStates.Loading);

    return data;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wait]);

  const setActiveNote = (id) => {
    setSelectedNoteId(id);
  }


  const addNewNote = async ({ content, title }) => {
    if (isLoading) {
      return;
    }

    const newId = uuidv4();

    setNotesList([...notesList, {
      dateCreated: new Date(),
      dateEdited: new Date(),
      content: await encrypt(content),
      id: newId,
      title,
    }]);

    setIsAdding(false);
    setIsGlobalEditing(false);
    setSelectedNoteId(newId);
  };

  const editNote = async ({ content, dateEdited, id, title }) => {
    if (isLoading) {
      return;
    }

    const encryptedContent = await encrypt(content);

    const updatedNote = notesList.map((currTask) => (
      currTask.id === id ? { ...currTask, content: encryptedContent, dateEdited, title } : currTask
    ));

    setIsGlobalEditing(false);

    setNotesList(updatedNote);
  };

  const removeNote = ({ id }) => {
    if (isLoading) {
      return;
    }

    const updatedNote = notesList.filter((currTask) => (
      currTask.id !== id
    ));

    setSelectedNote(null);
    setSelectedNoteId(null);
    setNotesList(updatedNote);
  };

  useEffect(() => {
    if (selectedNoteId) {
      async function decryptSelectedNote() {
        const note = notesList.filter((filterNote) => filterNote.id === selectedNoteId)[0];
        const noteContent = await decrypt(note.content);
        const noteDecrypted = {
          ...note,
          content: noteContent,
        };

        setSelectedNote(noteDecrypted);
      }

      decryptSelectedNote();
    }
  }, [decrypt, notesList, selectedNoteId]);

   return (
    <NotesAppContext.Provider
      value={{
        isAdding,
        setIsAdding,
        isGlobalEditing,
        setIsGlobalEditing,
        editNote,
        removeNote,
        selectedNote,
        addNewNote,
        setActiveNote,
        selectedNoteId,
        notesList,
      }}
    >
      {children}
    </NotesAppContext.Provider>
  );
}
