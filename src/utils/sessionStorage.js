export function getItem(key) {
  const value = sessionStorage.getItem(key);
  if (key === 'recent' || key === 'wordList') {
    if (value === null) {
      return [];
    } else {
      return JSON.parse(value);
    }
  } else {
    return JSON.parse(value);
  }
}

export function setItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}