import React, { useContext } from 'react';

import { LoadingContext } from 'context/loading-context';
import { NotesAppContext } from 'context/notes-app-context';

import NotesPreviewListButton from 'components/notes-preview-list/button/button';

import './notes-preview-list.scss';

export const NotesPreviewList = ({
  notes = [],
}) => {
  const {
    isGlobalEditing,
    selectedNote,
    setActiveNote,
  } = useContext(NotesAppContext);

  const {
    isLoading,
  } = useContext(LoadingContext);

  const handleOnClick = (id) => {
    setActiveNote(id);
  };

  const notesList = notes.sort((a,b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

  return (
    <ul className="notes-preview-list">
      { notesList.map((note, index) => (
        <li className="notes-preview-list__list-item" key={note.id}>
          <NotesPreviewListButton
            tabIndex={index}
            disabled={isLoading || isGlobalEditing}
            note={note}
            onSelection={handleOnClick}
            selected={selectedNote && note.id === selectedNote.id}
          />
        </li>
      ))}
    </ul>
  )
}

export default NotesPreviewList;
