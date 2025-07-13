import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Portfolio } from '@/models/portfolio';

export async function POST(req) {
    try {
        await connectDB();

        const { title, url, content, image } = await req.json();


        const newItem = new Portfolio({ title, url, content, image });
        await newItem.save();

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('خطا در افزودن نمونه کار:', err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
