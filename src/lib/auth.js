import jwt from 'jsonwebtoken';

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}


// تابع بررسی لاگین بودن در سمت سرور
export function getCurrentAdmin() {
    const token = cookies().get('token')?.value;
    if (!token) return null;

    const decoded = verifyToken(token);
    if (decoded?.role === 'admin') {
        return decoded;
    }
    return null;
}