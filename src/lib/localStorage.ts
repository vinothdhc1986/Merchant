export const getCloseHeaderListFromLocalStorage = (key: string): string[] => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const setCloseHeaderListInLocalStorage = (
  key: string,
  value: string[]
): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const setUserAuthenticated = (): void => {
  localStorage.setItem('user', `true`);
};

export const removeUserAuthenticated = (): void => {
  localStorage.removeItem('user');
};
