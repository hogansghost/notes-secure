import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { LoadingContext } from 'context/loading-context';
import { NotesAppContext } from 'context/notes-app-context';

import NotesViewer from './notes-viewer';

describe('NotesViewer (component)', () => {
  let wrapper;
  let addNote = jest.fn();
  let selectedNote = null;

  beforeEach(() => {

    wrapper = mount(
      <LoadingContext.Provider
        value={{
          isLoading: false,
        }}
      >
        <NotesAppContext.Provider
          value={{
            addNote,
            selectedNote
          }}
        >
          <NotesViewer />
        </NotesAppContext.Provider>
      </LoadingContext.Provider>
    );
  });

  it('render the "select a note" message when no message is selected by default.', () => {
    const wrapper = mount(
      <LoadingContext.Provider
        value={{
          isLoading: false,
        }}
      >
        <NotesAppContext.Provider
          value={{
            addNote: jest.fn(),
            selectedNote: null,
          }}
        >
          <NotesViewer />
        </NotesAppContext.Provider>
      </LoadingContext.Provider>
    );

    expect(wrapper.find('.notes-viewer__select-message')).toHaveLength(1);
    expect(wrapper.find('.notes-viewer__select-message').text()).toEqual('Select a note!');
  });

  it('Render the selected message in place of the "select a note message" as well as the edit button.', () => {
    const wrapper = mount(
      <LoadingContext.Provider
        value={{
          isLoading: false,
        }}
      >
        <NotesAppContext.Provider
          value={{
            addNote: jest.fn(),
            selectedNote: { title: 'A mocked title', content: 'A mocked note content' },
          }}
        >
          <NotesViewer />
        </NotesAppContext.Provider>
      </LoadingContext.Provider>
    );

    expect(wrapper.find('.notes-viewer__select-message')).toHaveLength(0);

    expect(wrapper.find('p').at(0).text()).toEqual('A mocked title');
    expect(wrapper.find('p').at(1).text()).toEqual('A mocked note content');
    expect(wrapper.find('button')).toHaveLength(1);
  });
});
