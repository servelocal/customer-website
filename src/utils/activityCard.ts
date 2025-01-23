const SUBCATEGORY_CLASSES: Record<string, string> = {
  Bouldering: 'border-blue-500 text-blue-500',
  Golfing: 'border-green-500 text-green-500',
  Adventure: 'border-yellow-500 text-yellow-500',
  Bowling: 'border-red-500 text-red-500',
  Default: 'border-gray-300 text-gray-700',
};

/**
 * Get CSS classes for a given subcategory.
 * @param subCategory - Subcategory name
 * @returns CSS class string
 */
export const getSubCategoryClasses = (subCategory: string): string =>
  SUBCATEGORY_CLASSES[subCategory] || SUBCATEGORY_CLASSES.Default;

/**
 * Calculate the distance between two points using the Haversine formula.
 * @param lat1 - Latitude of the first point
 * @param lon1 - Longitude of the first point
 * @param lat2 - Latitude of the second point
 * @param lon2 - Longitude of the second point
 * @returns Distance in miles
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
};

/**
 * Validate whether the provided coordinates are valid.
 * @param coordinates - Object containing latitude and longitude
 * @returns Boolean indicating whether the coordinates are valid
 */
export const isValidCoordinate = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): boolean => latitude !== 0 && longitude !== 0;
