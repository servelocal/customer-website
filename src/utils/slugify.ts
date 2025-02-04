export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and') // Replace & with "and"
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
};
