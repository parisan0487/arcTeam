import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import { User } from '@/models/user';

export async function POST(req) {
    try {
        await connectDB();
        const { username, password } = await req.json(); 

        if (!username || !password) {
            return NextResponse.json({ error: 'همه فیلدها الزامی است' }, { status: 400 });
        }

        // تعیین نقش بر اساس کد ثبت‌نام
        let role = null;
        if (password === process.env.ADMIN_PASSWORD) role = 'admin';
        if (password === process.env.EMPLOYEE_PASSWORD) role = 'employee';

        if (!role) {
            return NextResponse.json({ error: 'کد ثبت‌نام معتبر نیست' }, { status: 403 });
        }

        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ error: 'این نام کاربری قبلاً ثبت شده' }, { status: 409 });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, password: hashedPassword, role });

    
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '180d' }
        );

        const res = NextResponse.json(
            { message: 'ثبت‌نام و ورود موفقیت‌آمیز', user: newUser },
            { status: 201 }
        );

        // ذخیره توکن در کوکی
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 180, // 180 روز = 6 ماه
        });

        return res;
    } catch (err) {
        return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
    }
}
