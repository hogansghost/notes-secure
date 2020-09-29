import React, { useContext } from 'react';

import NotesEditor from 'components/notes-editor/notes-editor';

import { NotesAppContext } from 'context/notes-app-context';

export const EditNote = ({
  onCancel,
  onSubmit,
}) => {
  const {
    editNote,
    removeNote,
    selectedNote,
  } = useContext(NotesAppContext);

  const handleOnSubmit = ({ content, title }) => {
    editNote({
      id: selectedNote.id,
      dateEdited: new Date(),
      content,
      title,
    });

    onSubmit();
  }

  const handleOnDelete = ({ id }) => {
    onCancel();
    removeNote({ id });
  }

  return (
    <NotesEditor
      note={selectedNote}
      onCancel={onCancel}
      onDelete={handleOnDelete}
      onSubmit={handleOnSubmit}
    />
  );
};

export default EditNote;
