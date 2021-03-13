export const isEmpty = (input: any): boolean => {
  if (typeof input === 'undefined' || input === null) return true;
  if (typeof input === 'function' || typeof input === 'number') return false;
  if (Array.isArray(input)) return input.length === 0;
  return !input || Object.keys(input).length === 0;
};

export const getTommorowsDate = (): string => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  return `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
};
