import { useState } from 'react';

export default (initialVal = false) => {
  const [value, setValue] = useState(initialVal);

  const toggleValue = () => {
    setValue(!value);
  };

  const setSpecificValue = (newVal) => {
    setValue(newVal);
  }

  return [value, toggleValue, setSpecificValue];
}
