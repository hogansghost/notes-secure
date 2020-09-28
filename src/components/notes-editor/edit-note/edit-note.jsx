import React, { useContext } from 'react';

import NotesEditor from 'components/notes-editor/notes-editor';

import { LoadingContext } from 'context/loading-context';
import { NotesAppContext } from 'context/notes-app-context';

export const EditNote = ({
  onCancel,
  onSubmit,
}) => {
  const {
    isLoading,
  } = useContext(LoadingContext);

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

  return ( isLoading ? (
      <p>Saving</p>
    ) : (
      <NotesEditor
        note={selectedNote}
        onCancel={onCancel}
        onDelete={handleOnDelete}
        onSubmit={handleOnSubmit}
      />
    )
  )
};

export default EditNote;
