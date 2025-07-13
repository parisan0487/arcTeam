'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import moment from 'moment-jalaali'


export default function ReportsListPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);
    const [jalaliDate, setJalaliDate] = useState('')
    const [name, setName] = useState('')


    const [filters, setFilters] = useState({
        from: '',
        to: '',
        page: 1,
        limit: 10,
    });

    const [pagination, setPagination] = useState({
        totalPages: 1,
        totalReports: 0,
    });


    const handleFilter = () => {
        const newFilters = {
            page: 1, // برای شروع فیلتر جدید همیشه برگرد به صفحه ۱
            limit: filters.limit,
        };

        // اگر تاریخ وارد شده بود، تبدیل کن به ISO برای استفاده در فچ
        if (jalaliDate.trim()) {
            const from = moment(jalaliDate, 'jYYYY/jMM/jDD').startOf('day').toISOString();
            const to = moment(jalaliDate, 'jYYYY/jMM/jDD').endOf('day').toISOString();
            newFilters.from = from;
            newFilters.to = to;
        }

        // اگر نام وارد شده بود
        if (name.trim()) {
            newFilters.name = name.trim();
        }

        setFilters(newFilters);
    };



    useEffect(() => {
        setLoading(true);
        setAccessDenied(false);

        const params = new URLSearchParams();


        if (filters.from) params.append('from', filters.from);
        if (filters.to) params.append('to', filters.to);
        if (filters.name) params.append('name', filters.name);


        params.append('page', filters.page);
        params.append('limit', filters.limit);

        fetch('/api/employee/reports?' + params.toString())
            .then(async (res) => {
                if (res.status === 403) {
                    setAccessDenied(true);
                    setLoading(false);
                    return null;
                }
                if (!res.ok) throw new Error('خطا در دریافت گزارش‌ها');
                return res.json();
            })
            .then((data) => {
                if (!data) return;
                setReports(data.reports);
                console.log(data.reports)
                setPagination({
                    totalPages: data.pagination.totalPages,
                    totalReports: data.pagination.totalReports,
                });
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [filters]);

    const handlePageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
    };

    if (loading) return <p className="p-6 text-center text-gray-400">در حال بارگذاری گزارش‌ها...</p>;

    if (accessDenied)
        return (
            <div className="p-6 text-red-500 font-bold text-2xl text-center">
                شما اجازه دسترسی به این صفحه را ندارید.
            </div>
        );

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-[#00e0ca]">گزارش‌های کاربران</h1>

            <div className="w-full max-w-[54rem] flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

                {/* فیلترها */}
                <div className="flex flex-wrap items-end gap-4 flex-1">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm text-gray-300">تاریخ</label>
                        <input
                            type="text"
                            placeholder="1403/04/05"
                            className="border border-gray-600 bg-[#2a2a2a] text-white p-2 rounded w-52 focus:outline-none focus:ring-2 focus:ring-[#00e0ca]"
                            value={jalaliDate}
                            onChange={(e) => setJalaliDate(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm text-gray-300">نام کاربر</label>
                        <input
                            type="text"
                            placeholder="نام کاربر"
                            className="border border-gray-600 bg-[#2a2a2a] text-white p-2 rounded w-52 focus:outline-none focus:ring-2 focus:ring-[#00e0ca]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm text-transparent select-none">اعمال فیلتر</label>
                        <button
                            onClick={handleFilter}
                            className="bg-[#00e0ca] text-black px-4 py-2 rounded hover:bg-[#00cbb5] transition-colors"
                        >
                            اعمال فیلتر
                        </button>
                    </div>
                </div>
            </div>



            {/* لیست گزارش‌ها */}
            {reports.length === 0 ? (
                <p className="text-gray-500">گزارشی یافت نشد.</p>
            ) : (
                <ul className="grid grid-cols-3 gap-y-10">
                    {reports.map((report) => (
                        <li
                            key={report._id}
                            className="p-4 rounded-xl shadow-lg bg-[#1a1a1a] flex flex-col gap-1 w-60 h-52 hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            <div className="flex flex-col gap-3">
                                <p className="text-white font-semibold truncate">کاربر: {report.userId?.username || 'ناشناخته'}</p>
                                <p className="text-[#00e0ca] font-bold truncate">عنوان: {report.title}</p>
                                <p className="text-gray-300 text-sm max-w-full custom-scrollbar-horizontal">
                                    توضیح: {report.description}
                                </p>
                            </div>
                            <div className="mt-auto flex flex-col gap-0.5">
                                <p className="text-gray-400 text-xs">تعداد ساعت: {report.duration} ساعت</p>
                                <p className="text-gray-400 text-xs">
                                    تاریخ: {new Date(report.date).toLocaleDateString('fa-IR')}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* صفحه بندی */}
            <div className="flex justify-center gap-2 mt-6">
                <button
                    disabled={filters.page <= 1}
                    onClick={() => handlePageChange(filters.page - 1)}
                    className="px-4 py-2 rounded bg-[#00e0ca] text-black disabled:opacity-50"
                >
                    قبلی
                </button>

                <span className="px-4 py-2 text-white">
                    صفحه {filters.page} از {pagination.totalPages}
                </span>

                <button
                    disabled={filters.page >= pagination.totalPages}
                    onClick={() => handlePageChange(filters.page + 1)}
                    className="px-4 py-2 rounded bg-[#00e0ca] text-black disabled:opacity-50"
                >
                    بعدی
                </button>
            </div>
        </div>
    );
}
