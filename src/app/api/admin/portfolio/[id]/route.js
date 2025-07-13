import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'
import { Portfolio } from '@/models/portfolio';

export async function DELETE(request, { params }) {
    await connectDB();
    const { id } = params;

    try {
        const deleted = await Portfolio.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ success: false, message: 'نمونه کار پیدانشد' }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('خطا در حذف:', err);
        return NextResponse.json({ success: false, message: 'خطای سرور' }, { status: 500 });
    }
}
