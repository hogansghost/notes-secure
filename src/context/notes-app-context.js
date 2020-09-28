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
    content: '# H1↵## H2↵### H3↵#### H4↵##### H5↵###### H6↵↵Alternatively, for H1 and H2, an underline-ish style:↵↵Alt-H1↵======↵↵Alt-H2↵------↵↵Emphasis, aka italics, with *asterisks* or _underscores_.↵↵Strong emphasis, aka bold, with **asterisks** or __underscores__.↵↵Combined emphasis with **asterisks and _underscores_**.↵↵Strikethrough uses two tildes. ~~Scratch this.~~↵↵1. First ordered list item↵2. Another item↵⋅⋅* Unordered sub-list. ↵1. Actual numbers don\'t matter, just that it\'s a number↵⋅⋅1. Ordered sub-list↵4. And another item.↵↵⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we\'ll use three here to also align the raw Markdown).↵↵⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅↵⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅↵⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)↵↵* Unordered list can use asterisks↵- Or minuses↵+ Or pluses↵↵```javascript↵var s = "JavaScript syntax highlighting";↵alert(s);↵```↵ ↵```python↵s = "Python syntax highlighting"↵print s↵```↵ ↵```↵No language indicated, so no syntax highlighting. ↵But let\'s throw in a <b>tag</b>.↵```',
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
