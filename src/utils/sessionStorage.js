export function getItem(key) {
  const value = sessionStorage.getItem(key);
  if (key === 'recent' || key === 'wordList') {
    return value === null ? [] : JSON.parse(value);
  } else {
    return JSON.parse(value);
  }
}

export function setItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key) {
  sessionStorage.removeItem(key);
}