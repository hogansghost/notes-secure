var NoNoMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

export function escapeHTML(str, forAttribute) {
    return str.replace(forAttribute ? /[&<>'"]/g : /[&<>]/g, (c) => (
      NoNoMap[c]
    ));
}

export function sanitize(str) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#x27;',
      '/': '&#x2F;',
      '`': '&grave;',
  };

  const reg = /[&<>"'/]/ig;
  return str.replace(reg, (match) => (map[match]));
}
