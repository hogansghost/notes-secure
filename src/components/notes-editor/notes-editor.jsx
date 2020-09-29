import React from 'react';

import { useInputState } from 'hooks/index';
import { bem } from 'utils/bem';

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
        <div className={bem('notes-editor__actions-section', ['destroy'])}>
          { onDelete && (
            <Button type={ButtonType.Delete} onClick={handleOnDelete}>Delete</Button>
          )}
        </div>

        <div className={bem('notes-editor__actions-section', ['update'])}>
          <Button onClick={handleOnCancel}>Cancel</Button>

          <Button onClick={handleOnSubmit}>Save changes</Button>
        </div>
      </div>

      <div className="notes-editor__content">
        <label className="notes-editor__content-title">
          <input
            className="notes-editor__content-title-input"
            placeholder=""
            value={noteTitle}
            onChange={setNoteTitle}
          />
        </label>

        <label className="notes-editor__content-body">
          <textarea
            className="notes-editor__content-body-input"
            placeholder="Note content"
            value={noteContent}
            onChange={setNoteContent}
          ></textarea>
        </label>
      </div>
    </div>
  )
};

export default NotesEditor;
