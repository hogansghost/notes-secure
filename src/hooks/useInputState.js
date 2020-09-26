import { useState } from 'react';

export default (initialVal) => {
  const [value, setValue] = useState(initialVal);

  const changeValue = (evt) => {
    const newValue = evt.target?.value;
    setValue(newValue);
  };

  const resetValue = (resetValue = '') => {
    setValue(resetValue);
  };

  return [value, changeValue, resetValue];
}
