import React, { useContext } from 'react';

import { LoadingContext } from 'context/loading-context';
import { NotesAppContext } from 'context/notes-app-context';

import NotesEditor from 'components/notes-editor/notes-editor';

import './notes-viewer.scss';

export const NotesViewer = ({
  notes
}) => {
  const {
    selectedNote,
  } = useContext(NotesAppContext);

  const {
    isLoading,
  } = useContext(LoadingContext);

  const content = selectedNote?.description ? decodeURI(selectedNote.description).replace(/\n/g, "<br />") : '';
  return !isLoading ? (
    <div className="notes-viewer">
      { selectedNote ? (
        <>
          <p>ID: {selectedNote.id}</p>
          <p dangerouslySetInnerHTML={{__html: content}} />
        </>
      ) : (
        <p>Select a note!</p>
      )}

      <NotesEditor />
    </div>
  ) : (
    <p>L O A D I N G   L O L</p>
  )
}

export default NotesViewer;
