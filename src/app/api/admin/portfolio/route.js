import { connectDB } from '@/lib/db';
import { Portfolio } from '@/models/portfolio';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  const portfolios = await Portfolio.find().sort({ createdAt: -1 });
  

  return NextResponse.json({ success: true, portfolios });
}
