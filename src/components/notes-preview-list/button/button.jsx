import React from 'react';

import { bem } from 'utils/bem';

export const NotesPreviewList = ({
  disabled,
  note,
  onSelection,
  selected,
  tabIndex,
}) => {
  const handleOnClick = () => {
    onSelection(note.id);
  };

  return (
    <button
      className={bem('notes-preview-list__list-item-button', {
        selected
      })}
      tabIndex={tabIndex}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {note.title ? note.title : <span className="notes-preview-list__list-item-button-untitled">Untitled</span>}
    </button>
  )
}

export default NotesPreviewList;
