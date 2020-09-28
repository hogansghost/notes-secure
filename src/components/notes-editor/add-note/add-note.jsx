import React, { useContext } from 'react';

import NotesEditor from 'components/notes-editor/notes-editor';

import { NotesAppContext } from 'context/notes-app-context';

import './add-note.scss';

export const AddNote = () => {
  const {
    addNewNote,
    setIsAdding,
    setIsGlobalEditing,
  } = useContext(NotesAppContext);

  const handleOnSubmit = ({ content, title }) => {
    addNewNote({
      content,
      title,
    });
  }

  const handleOnCancel = () => {
    setIsAdding(false);
    setIsGlobalEditing(false);
  }

  return (
    <NotesEditor
      onSubmit={handleOnSubmit}
      onCancel={handleOnCancel}
    />
  )
};

export default AddNote;
