import React, { useContext, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { LoadingContext } from 'context/loading-context';
import { NotesAppContext } from 'context/notes-app-context';

import EditNote from 'components/notes-editor/edit-note/edit-note';
import Button from 'components/ui/button/button';

import { bem } from 'utils/bem';

import './notes-viewer.scss';

export const NotesViewer = () => {
  const {
    selectedNote,
    setIsGlobalEditing,
  } = useContext(NotesAppContext);

  const {
    isLoading,
  } = useContext(LoadingContext);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsGlobalEditing(true);
  }

  const handleOnCancel = () => {
    setIsEditing(false);
    setIsGlobalEditing(false);
  }

  const handleOnSubmit = () => {
    setIsEditing(false);
  }

  return (
    <div className={bem('notes-viewer', { isLoading })}>
      { isEditing ? (
        <EditNote
          onCancel={handleOnCancel}
          onSubmit={handleOnSubmit}
        />
      ) : (
        <div className="notes-viewer__selected-note">
          { selectedNote ? (
            <>
              <div className="notes-viewer__selected-note-actions">
                <Button onClick={handleEditClick}>Edit</Button>
              </div>

              <p>{selectedNote.title}</p>

              <ReactMarkdown
                source={selectedNote.content}
              />

            </>
          ) : (
            <p>Select a note!</p>
          )}
        </div>
      )}
    </div>
  )
}

export default NotesViewer;
