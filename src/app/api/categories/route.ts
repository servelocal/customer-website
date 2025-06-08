import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await pool.query('SELECT * FROM categories');
  return NextResponse.json(res.rows);
}
