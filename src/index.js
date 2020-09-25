import React from 'react';
import ReactDOM from 'react-dom';

import { LoadingProvider } from 'context/loading-context';
import { NotesAppProvider } from 'context/notes-app-context';
import { DarkmodeProvider } from 'context/dark-mode-context';

import NotesApp from 'components/notes-app/notes-app';
import SvgYard from 'components/SvgYard/svg-yard';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <SvgYard />

    <LoadingProvider>
      <NotesAppProvider>
        <DarkmodeProvider>
          <NotesApp />
        </DarkmodeProvider>
      </NotesAppProvider>
    </LoadingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

