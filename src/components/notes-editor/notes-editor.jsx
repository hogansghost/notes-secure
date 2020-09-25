import React, { useContext } from 'react';
import { useInputState } from 'hooks/index';

import { NotesAppContext } from 'context/notes-app-context';

export const NotesEditor = () => {
  const {
    addNewNote,
    selectedNote,
  } = useContext(NotesAppContext);

  const [noteContent, setNoteContent] = useInputState('');

  const handleOnChange = (evt) => {
    const value = evt.target.value;

    setNoteContent(value);
  }

  const handleSaveOnClick = () => {
    addNewNote(noteContent);
  }

  return (
    <>
    <textarea value={noteContent} onChange={handleOnChange}></textarea>
    <button onClick={handleSaveOnClick}>SAVE</button>
    </>
  )
};

export default NotesEditor;
