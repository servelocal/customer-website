export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and') // Replace & with "and"
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
};

export const unslugify = (slug: string): string => {
  return slug
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalise the first letter of each word
    .trim(); // Trim any leading or trailing spaces
};
