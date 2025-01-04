export const getCookie = (name: string): string | undefined => {
  if (typeof window !== 'undefined') {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : undefined;
  }
  return undefined;
};

export const setCookie = (
  name: string,
  value: string,
  options: { path?: string; maxAge?: number } = {}
) => {
  if (typeof window !== 'undefined') {
    const { path = '/', maxAge } = options;
    let cookieString = `${name}=${encodeURIComponent(value)}; path=${path}`;
    if (maxAge) {
      cookieString += `; max-age=${maxAge}`;
    }
    document.cookie = cookieString;
  }
};
