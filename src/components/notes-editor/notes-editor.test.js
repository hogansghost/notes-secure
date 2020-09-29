import React from 'react';
import { mount } from 'enzyme';

import { DarkModeContext } from 'context/dark-mode-context';
import { LoadingContext } from 'context/loading-context';
import { NotesAppContext } from 'context/notes-app-context';

import NotesEditor from 'components/notes-editor/notes-editor';
import NotesViewer from 'components/notes-viewer/notes-viewer';
import AddNote from 'components/notes-editor/add-note/add-note';

describe('NotesEditor (component)', () => {
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
            <NotesEditor />
          </NotesAppContext.Provider>
        </LoadingContext.Provider>
      </DarkModeContext.Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('.notes-editor__actions-section--update button')).toHaveLength(2);
    expect(wrapper.find('.notes-editor__content-title-input')).toHaveLength(1);
    expect(wrapper.find('.notes-editor__content-body-input')).toHaveLength(1);
  });
});
