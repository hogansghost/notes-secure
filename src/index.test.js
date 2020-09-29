import React from 'react';
import ReactDOM from 'react-dom';

import { LoadingProvider } from 'context/loading-context';
import { NotesAppProvider } from 'context/notes-app-context';
import { DarkModeProvider } from 'context/dark-mode-context';

import NotesApp from 'components/notes-app/notes-app';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Note application root', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    require("./index.js");

    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <LoadingProvider>
          <NotesAppProvider>
            <DarkModeProvider>
              <NotesApp />
            </DarkModeProvider>
          </NotesAppProvider>
        </LoadingProvider>
      </React.StrictMode>
    , div);
  });
});
