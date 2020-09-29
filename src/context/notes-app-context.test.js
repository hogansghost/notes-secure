import React, { useContext, useEffect } from 'react';
import { mount } from 'enzyme';
import { LoadingProvider } from 'context/loading-context';
import { NotesAppContext, NotesAppProvider } from 'context/notes-app-context';

describe("NotesAppContext (context)", () => {
  let TestComponent;
  let defaultSelectedNoteId;

  beforeAll(() => {
    TestComponent = ({ title, content }) => {
      const {
        addNewNote,
        editNote,
        isAdding,
        notesList,
        selectedNoteId,
        setActiveNote,
        setIsAdding,
        setIsGlobalEditing,
      } = useContext(NotesAppContext);

      const handleAddNote = () => {
        setIsAdding(true);
        setIsGlobalEditing(true);

        addNewNote({
          title: title ? title : 'New note',
          content: content ? content : 'New description',
        });
      }

      const handleEditNote = () => {
        setIsGlobalEditing(true);

        editNote({
          id: notesList[0].id,
          title: 'Edited note',
          content: 'Edited description',
        });
      }

      useEffect(() => {
        setActiveNote(notesList[0].id);
        defaultSelectedNoteId = notesList[0].id;
      }, []);

      return (
        <>
          <div className="test-value">{notesList[0].title}</div>
          <div className="test-is-adding">{isAdding.toString()}</div>
          <div className="test-selected-id">{(selectedNoteId || '').toString()}</div>
          <button className='add-note' onClick={handleAddNote}>Add note</button>
          <button className='edit-note' onClick={handleEditNote}>Edit note</button>
        </>
      );
    }
  });

  it('NotesAppProvider gives access to the default notes list.', () => {
    const wrapper = mount(
      <LoadingProvider value={{ isLoading: false, addLoadingState: jest.fn(), removeLoadingState: jest.fn() }}>
        <NotesAppProvider>
          <TestComponent />
        </NotesAppProvider>
      </LoadingProvider>
    );

    expect(wrapper.find('.test-value').text()).toEqual('Markup examples');
  });

  it('selectedNoteId can be set.', () => {
    const wrapper = mount(
      <LoadingProvider value={{ isLoading: false, addLoadingState: jest.fn(), removeLoadingState: jest.fn() }}>
        <NotesAppProvider>
          <TestComponent />
        </NotesAppProvider>
      </LoadingProvider>
    );

    expect(wrapper.find('.test-selected-id').text()).toEqual(defaultSelectedNoteId);
  });

  it('you can add a note.', () => {
    const wrapper = mount(
      <LoadingProvider value={{ isLoading: false, addLoadingState: jest.fn(), removeLoadingState: jest.fn() }}>
        <NotesAppProvider>
          <TestComponent />
        </NotesAppProvider>
      </LoadingProvider>
    );

    wrapper.find('.add-note').simulate('click');

    wrapper.update();

    setTimeout(() => {
      expect(wrapper.find('.test-value').text()).toEqual('New note');
      expect(wrapper.find('.test-is-adding').text()).toEqual('false');
    });
  });

  it('you cannot try and add multiple notes if isLoading.', () => {
    let title = 'New note';
    let content = 'New content';

    const wrapper = mount(
      <LoadingProvider value={{ isLoading: true, addLoadingState: jest.fn(), removeLoadingState: jest.fn() }}>
        <NotesAppProvider>
          <TestComponent title={title} content={content} />
        </NotesAppProvider>
      </LoadingProvider>
    );

    wrapper.find('.add-note').simulate('click');

    title = "Attempted update";

    wrapper.find('.add-note').simulate('click');

    wrapper.update();

    setTimeout(() => {
      expect(wrapper.find('.test-value').text()).toEqual('New note');
    });
  });

  it('you can edit a note.', () => {
    const wrapper = mount(
      <LoadingProvider value={{ isLoading: false, addLoadingState: jest.fn(), removeLoadingState: jest.fn() }}>
        <NotesAppProvider>
          <TestComponent />
        </NotesAppProvider>
      </LoadingProvider>
    );

    wrapper.find('.edit-note').simulate('click');

    wrapper.update();

    setTimeout(() => {
      expect(wrapper.find('.test-value').text()).toEqual('Edited note');
      expect(wrapper.find('.test-is-adding').text()).toEqual('false');
    }, 1000);
  });
});
