'use server';

import { cookies } from 'next/headers';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export async function create(consentValue = 'true') {
  const cookieStore = await cookies(); // No need to await cookies in Next.js, they are synchronous.

  if (consentValue === 'false') cookieStore.set('consent', 'false');
  if (consentValue === 'true') cookieStore.set('consent', 'true');

  const consent = cookieStore.get('consent');
  console.info('Current consent value:', consent?.value);
}

export async function setLocationCookie(location: string, coordinates: Coordinates | null) {
  const cookieStore = await cookies();
  const consent = cookieStore.get('consent');

  if (!coordinates) return;
  const { latitude, longitude } = coordinates;

  if (consent?.value === 'true') {
    cookieStore.set('location', location, { path: '/', maxAge: 60 * 60 * 24 * 30 }); // 30 days
    cookieStore.set('coords', JSON.stringify({ latitude, longitude }));
    console.info(`Location cookie set to: ${location}`);
  } else {
    console.info('Consent not given, location cookie not set.');
  }
}

export async function getLocationCookie() {
  const cookieStore = await cookies();
  const getLocation = cookieStore.get('location')?.value || '';
  const getCoords = cookieStore.get('coords')?.value || '';
  return { getLocation, getCoords };
}
