import React from 'react';
import { mount } from 'enzyme';

import { DarkModeContext } from 'context/dark-mode-context';
import { LoadingContext } from 'context/loading-context';
import { NotesAppContext } from 'context/notes-app-context';

import NotesApp from 'components/notes-app/notes-app';
import NotesViewer from 'components/notes-viewer/notes-viewer';
import AddNote from 'components/notes-editor/add-note/add-note';

describe('NotesApp (component)', () => {
  let addNote = jest.fn();
  let selectedNote = null;
  let notesList = [];

  it('should render the main notes viewer by default.', () => {
    const wrapper = mount(
      <DarkModeContext.Provider
        value={{
          isDarkMode: false,
        }}
      >
        <LoadingContext.Provider
          value={{
            isLoading: false,
          }}
        >
          <NotesAppContext.Provider
            value={{
              addNote,
              selectedNote,
              notesList,
            }}
            >
            <NotesApp />
          </NotesAppContext.Provider>
        </LoadingContext.Provider>
      </DarkModeContext.Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(NotesViewer)).toHaveLength(1);
    expect(wrapper.find(AddNote)).toHaveLength(0);
  });

  it('should render the AddNote component when isAdding is true (by clicking add note).', () => {
    const wrapper = mount(
      <DarkModeContext.Provider
        value={{
          isDarkMode: false,
        }}
      >
        <LoadingContext.Provider
          value={{
            isLoading: false,
          }}
          >
          <NotesAppContext.Provider
            value={{
              addNote,
              selectedNote,
              notesList,
              isAdding: true,
            }}
            >
            <NotesApp />
          </NotesAppContext.Provider>
        </LoadingContext.Provider>
      </DarkModeContext.Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(NotesViewer)).toHaveLength(0);
    expect(wrapper.find(AddNote)).toHaveLength(1);
  });
});
