export const setStorageItem = (identifier: string, value: any) => {
  localStorage.setItem(identifier, JSON.stringify(value));
};

export const getStorageItem = (identifier: string) => {
  const item = localStorage.getItem(identifier);
  if (item) {
    return JSON.parse(item);
  }
  return null;
};

export const removeStorageItem = (identifier: string) => {
  localStorage.removeItem(identifier);
};
