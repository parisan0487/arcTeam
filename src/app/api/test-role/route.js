import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
    const token = req.cookies.get('token')?.value;
    const userData = verifyToken(token);

    return NextResponse.json({
        tokenExists: !!token,
        userData,
    });
}
