import React, { useContext } from 'react';
import { useInputState } from 'hooks/index';

import { NotesAppContext } from 'context/notes-app-context';

export const NotesEditor = () => {
  const {
    addNewNote,
    selectedNote,
  } = useContext(NotesAppContext);

  const [noteContent, setNoteContent] = useInputState('');
  const [noteTitle, setNoteTitle] = useInputState('');

  const handleSaveOnClick = () => {
    addNewNote({
      title: noteTitle,
      content: noteContent,
    });
  }

  return (
    <div className="notes-editor">
      <input className="notes-editor__title" value={noteTitle} onChange={setNoteTitle} />
      <textarea className="notes-editor__content" value={noteContent} onChange={setNoteContent}></textarea>
      <button className="notes-editor__Save" onClick={handleSaveOnClick}>SAVE</button>
    </div>
  )
};

export default NotesEditor;
