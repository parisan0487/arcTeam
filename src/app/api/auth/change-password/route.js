import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import { User } from '@/models/user';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        const { currentPassword, newPassword } = await req.json();

        const token = req.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ message: 'توکن یافت نشد' }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ message: 'توکن نامعتبر است' }, { status: 401 });
        }

        const userId = decoded.id;

        await connectDB();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'کاربر یافت نشد' }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'رمز عبور فعلی نادرست است' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: 'رمز عبور با موفقیت تغییر یافت' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'خطا در تغییر رمز عبور' }, { status: 500 });
    }
}
