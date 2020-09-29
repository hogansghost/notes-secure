import React, { useContext } from 'react';
import { NotesAppContext } from 'context/notes-app-context';

import NotesHeader from 'components/notes-header/notes-header';
import NotesPreviewList from 'components/notes-preview-list/notes-preview-list';
import NotesViewer from 'components/notes-viewer/notes-viewer';
import AddNote from 'components/notes-editor/add-note/add-note';

import './notes-app.scss';

function NotesApp() {
  const {
    notesList,
    isAdding,
  } = useContext(NotesAppContext);


  return (
    <div className="notes-app">
      <div className="notes-app__header">
        <NotesHeader />
      </div>

      <div className="notes-app__list">
        <NotesPreviewList
          notes={notesList}
        />
      </div>

      <div className="notes-app__content">
        { isAdding ? (
          <AddNote />
        ) : (
          <NotesViewer />
        )}
      </div>
    </div>
  );
}

export default NotesApp;
