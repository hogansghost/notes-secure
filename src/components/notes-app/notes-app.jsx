import React, { useContext } from 'react';
import { NotesAppContext } from 'context/notes-app-context';

import NotesHeader from 'components/notes-header/notes-header';
import NotesPreviewList from 'components/notes-preview-list/notes-preview-list';
import NotesViewer from 'components/notes-viewer/notes-viewer';

import './notes-app.scss';

function NoteApp() {
  const {
    notesList,
  } = useContext(NotesAppContext);

  return (
    <div className="notes-app">
      <NotesHeader

      />

      <NotesPreviewList
        notes={notesList}
      />

      <NotesViewer />
    </div>
  );
}

export default NoteApp;
