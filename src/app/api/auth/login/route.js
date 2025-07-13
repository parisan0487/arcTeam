import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import { User } from '@/models/user';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    const body = await req.json();
    const { username, password } = body;

    await connectDB();

    const user = await User.findOne({ username });
    if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: '180d', // 6 ماه
    });

    const response = NextResponse.json({
        message: 'Logged in',
    });

    // ذخیره کوکی
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
    });

    return response;
}
