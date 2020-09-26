import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

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

  return !isLoading ? (
    <div className="notes-viewer">
      { selectedNote ? (
        <>
          <p>{selectedNote.id}</p>
          <p>{selectedNote.title}</p>

          <ReactMarkdown source={selectedNote.description} />
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
