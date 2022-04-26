export const setLocalStorage = (key, value) => {
  localStorage.setItem('mealsToken', '1');
  localStorage.setItem('cocktailsToken', '1');
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (item) => {
  const savedItem = localStorage.getItem(item);
  if (savedItem) {
    return JSON.parse(savedItem);
  }
};
