'use server';

import { cookies } from 'next/headers';

export async function create(consentValue = 'true') {
  const cookieStore = await cookies(); // No need to await cookies in Next.js, they are synchronous.

  if (consentValue === 'false') {
    cookieStore.set('consent', 'false');
    console.log('Consent declined');
    return;
  }

  if (consentValue === 'true') {
    cookieStore.set('consent', 'true');
    console.log('Consent accepted');
  }

  const consent = cookieStore.get('consent');
  console.log('Current consent value:', consent?.value);
}

export async function setLocationCookie(location: string) {
  const cookieStore = await cookies();
  const consent = cookieStore.get('consent');

  if (consent?.value === 'true') {
    cookieStore.set('location', location, { path: '/', maxAge: 60 * 60 * 24 * 30 }); // 30 days
    console.log(`Location cookie set to: ${location}`);
  } else {
    console.log('Consent not given, location cookie not set.');
  }
}

export async function getLocationCookie() {
  const cookieStore = await cookies();
  return cookieStore.get('location')?.value || '';
}
