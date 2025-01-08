'use server';

import { cookies } from 'next/headers';

export async function create() {
  const cookieStore = await cookies();

  cookieStore.set('consent', 'true');
}
