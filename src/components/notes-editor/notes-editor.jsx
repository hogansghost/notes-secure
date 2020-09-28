import React from 'react';

import { useInputState } from 'hooks/index';

import Button, { ButtonType } from 'components/ui/button/button';

import './notes-editor.scss';

export const NotesEditor = ({
  note,
  onCancel,
  onDelete,
  onSubmit,
}) => {
  const [noteContent, setNoteContent, resetNoteContent] = useInputState(note?.content || '');
  const [noteTitle, setNoteTitle, resetNoteTitle] = useInputState(note?.title || '');

  const handleOnSubmit = () => {
    onSubmit({
      content: noteContent,
      title: noteTitle,
    });
  }

  const resetEditInputs = () => {
    resetNoteContent();
    resetNoteTitle();
  }

  const handleOnCancel = () => {
    resetEditInputs();

    onCancel();
  }

  const handleOnDelete = () => {
    onDelete({ id: note.id });
    resetEditInputs();
  }

  return (
    <div className="notes-editor">
      <div className="notes-editor__actions">
        { onDelete && (
          <Button type={ButtonType.Delete} onClick={handleOnDelete}>Delete</Button>
        )}

        <Button onClick={handleOnCancel}>Cancel</Button>

        <Button onClick={handleOnSubmit}>Save changes</Button>
      </div>

      <div className="notes-editor__content">
        <label className="notes-editor__content-title">
          <input className="notes-editor__content-title-input" value={noteTitle} onChange={setNoteTitle} />
        </label>

        <label className="notes-editor__content-body">
          <textarea className="notes-editor__content-body-input" value={noteContent} onChange={setNoteContent}></textarea>
        </label>
      </div>
    </div>
  )
};

export default NotesEditor;
