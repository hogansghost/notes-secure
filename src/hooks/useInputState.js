import { useState } from 'react';

export default (initialVal) => {
  const [value, setValue] = useState(initialVal);

  const changeValue = (evt) => {
    setValue(evt);
  };

  const resetValue = (newString = '') => {
    setValue(newString);
  };

  return [value, changeValue, resetValue];
}
