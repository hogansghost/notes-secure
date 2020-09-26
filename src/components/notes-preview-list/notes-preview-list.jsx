import React, { useContext } from 'react';

import { LoadingContext } from 'context/loading-context';
import { NotesAppContext } from 'context/notes-app-context';

import './notes-preview-list.scss';

export const NotesPreviewList = ({
  notes
}) => {
  const {
    selectedNote,
    setActiveNote,
  } = useContext(NotesAppContext);


  const {
    isLoading,
  } = useContext(LoadingContext);

  const handleOnClick = (id) => {
    setActiveNote(id);
  };

  return (
    <ul className="notes-preview-list">
      { notes.map((note) => (
        <li className="notes-preview-list__list-item" key={note.id}>
          <button disabled={isLoading} className="notes-preview-list__list-item-button" onClick={() => handleOnClick(note.id)}>{note.title}</button>
        </li>
      ))}
    </ul>
  )
}

export default NotesPreviewList;
