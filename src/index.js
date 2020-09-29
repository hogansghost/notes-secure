import React from 'react';
import ReactDOM from 'react-dom';

import { LoadingProvider } from 'context/loading-context';
import { NotesAppProvider } from 'context/notes-app-context';
import { DarkModeProvider } from 'context/dark-mode-context';

import NotesApp from 'components/notes-app/notes-app';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <LoadingProvider>
      <NotesAppProvider>
        <DarkModeProvider>
          <NotesApp />
        </DarkModeProvider>
      </NotesAppProvider>
    </LoadingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
