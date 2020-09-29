export const hyphenCase = (...strings) => {
  const filteredParams = strings.filter((string) => typeof string === 'string' && string.trim() !== '').join(' ');

  // Replace anything not a letter, number or dash with a dash.
  // Replace lowerCase followed by upperCase and sequential upperCase followed by lowerCase with a dash.
  // Replace multiple sequential dashes and any trailing with nothing.
  return filteredParams
    .replace(/([^a-zA-Z0-9,^]+)|([a-z])([A-Z])|([A-Z])([A-Z][a-z])|(-{1,})/g, '$2$4-$3$5')
    .replace(/^[\s-]{1,}|[\s-]{1,}$/g, '')
    .toLowerCase();
};

export function bem(baseClass = '', modifierList) {
  let stringOutputArray = [baseClass];

  if (Array.isArray(modifierList)) {
    modifierList.forEach((bemClass) => stringOutputArray.push(`${baseClass}--${hyphenCase(bemClass)}`));
  } else if (typeof modifierList === 'object') {
    Object.entries(modifierList).forEach((bemEntry) => {
      const [
        bemKey,
        bemValue,
      ] = bemEntry;

      if (Array.isArray(bemValue) || !!bemValue) {
        stringOutputArray.push(`${baseClass}--${hyphenCase(bemKey)}`);
      }
    });
  }

  return stringOutputArray.join(' ').trim();
}
