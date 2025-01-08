export const capitalise = (str?: string): string => {
  if (!str) return '';
  if (str.length === 2) return str.toUpperCase();
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
