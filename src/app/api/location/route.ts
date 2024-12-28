import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Await retrieval of the location cookie value
  const location = (await req.cookies.get('location')?.value) || 'United Kingdom';
  return NextResponse.json({ decodeURIComponent(location) });
}

export async function POST(req: NextRequest) {
  try {
    // Await the JSON parsing of the request body
    const { location } = await req.json();

    if (!location) {
      return NextResponse.json({ error: 'Location is required' }, { status: 400 });
    }

    const response = NextResponse.json({ success: true });

    // Set the cookie with appropriate options
    await response.cookies.set('location', location, {
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
