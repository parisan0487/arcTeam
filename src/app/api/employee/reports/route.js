import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Report from '@/models/report';
import { verifyToken } from '@/lib/auth';
import { User } from '@/models/user';


export async function POST(req) {
    await connectDB();

    const token = req.cookies.get('token')?.value;
    const userData = verifyToken(token);



    if (!userData) return NextResponse.json({ message: 'وارد شوید', success: false }, { status: 401 });

    const { title, description, duration } = await req.json();

    if (!title || !description || !duration)
        return NextResponse.json({ message: 'همه فیلدها اجباری هستند', success: false }, { status: 400 });


    const report = await Report.create({
        userId: userData.userId,
        title,
        description,
        duration
    });

    return NextResponse.json({ message: 'گزارش ثبت شد', success: true, report });

}






export async function GET(req) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        const user = verifyToken(token);

        if (!user || user.role !== "admin") {
            return NextResponse.json(
                { message: "دسترسی غیرمجاز", success: false },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(req.url);

        const userId = searchParams.get("userId");
        const from = searchParams.get("from");
        const to = searchParams.get("to");
        const name = searchParams.get("name");
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "20", 10);

        const filter = {};

        if (userId) filter.userId = userId;

        // فیلتر تاریخ
        if (from || to) {
            filter.date = {};
            if (from) filter.date.$gte = new Date(from);
            if (to) {
                const toDate = new Date(to);
                toDate.setHours(23, 59, 59, 999);
                filter.date.$lte = toDate;
            }
        }

        // فیلتر نام
        if (name) {
            const users = await User.find({ username: { $regex: name, $options: "i" } }, "_id");
            const userIds = users.map(u => u._id);
            if (userIds.length > 0) {
                filter.userId = { $in: userIds };
            } else {
                return NextResponse.json({
                    success: true,
                    reports: [],
                    pagination: {
                        page,
                        limit,
                        totalPages: 1,
                        totalReports: 0,
                    },
                });
            }
        }

        const totalReports = await Report.countDocuments(filter);
        const skip = (page - 1) * limit;

        const reports = await Report.find(filter)
            .populate("userId", "username name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            success: true,
            reports,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalReports / limit),
                totalReports,
            },
        });
    } catch (error) {
        console.error("GET /api/employee/reports error:", error);
        return NextResponse.json({ message: "خطای سرور", success: false }, { status: 500 });
    }
}

