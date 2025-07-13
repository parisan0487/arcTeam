'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function PortfolioListPage() {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [portfoliosToDelete, setPortfoliosToDelete] = useState(null);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        // مرحله ۱: گرفتن نقش کاربر
        fetch('/api/role')
            .then(res => res.json())
            .then(({ role }) => {
                if (role !== 'admin') {
                    setAccessDenied(true);
                    setLoading(false);
                    return;
                }

                // مرحله ۲: گرفتن نمونه‌کارها
                fetch('/api/admin/portfolio')
                    .then(async (res) => {
                        if (!res.ok) {
                            const errorText = await res.text();
                            throw new Error(errorText || 'خطا در دریافت نمونه کار');
                        }
                        return res.json();
                    })
                    .then((data) => {
                        setPortfolios(data.portfolios || []);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.error('خطا:', err.message);
                        toast.error('خطا در دریافت نمونه‌کار');
                        setLoading(false);
                    });
            });
    }, []);

    if (loading) return <p className="text-gray-400 p-6 text-center">در حال بررسی دسترسی...</p>;

    if (accessDenied) {
        return (
            <div className="p-6 text-red-500 font-bold text-2xl text-center">
                شما اجازه دسترسی به این صفحه را ندارید.
            </div>
        );
    }


    const openDeleteModal = (id) => {
        setPortfoliosToDelete(id);
        console.log(id)
        setShowDeleteModal(true);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setPortfoliosToDelete(null);
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch(`/api/admin/portfolio/${portfoliosToDelete}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const text = await res.text(); // بررسی محتوای پاسخ در حالت خطا
                console.error('Response error text:', text);
                toast.error('خطا در برقراری ارتباط با سرور');
                cancelDelete();
                return;
            }

            const data = await res.json();

            if (data.success) {
                setPortfolios((prev) => prev.filter((a) => a._id !== portfoliosToDelete));
                toast.success('نمونه کار با موفقیت حذف شد')
            } else {
                toast.error(data.message || 'خطا در حذف نمونه کار');
            }
        } catch (err) {
            console.error('خطا در حذف:', err);
            toast.error('مشکلی در حذف نمونه کار پیش آمد');
        } finally {
            cancelDelete();
        }
    };



    return (
        <div className="p-6 ">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#00e0ca]">لیست نمونه کارها</h1>
                <Link
                    href="/admin/portfolio/new"
                    className="bg-[#00e0ca] text-black px-5 py-2 rounded-lg font-semibold hover:bg-[#00c8b0] transition"
                >
                    + نمونه کار جدید
                </Link>
            </div>

            {loading ? (
                <p className="text-gray-400">در حال بارگذاری...</p>
            ) : portfolios.length === 0 ? (
                <p className="text-gray-500">هیچ نمونه کاری پیدا نشد</p>
            ) : (
                <ul className="space-y-4">
                    {portfolios.map((portfolio) => (
                        <li
                            key={portfolio._id}
                            className="p-4 rounded-xl shadow-md bg-[#1a1a1a] flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-lg font-semibold text-white">{portfolio.title}</h2>
                                <p className="text-sm text-gray-400">
                                    {new Date(portfolio.createdAt).toLocaleDateString('fa-IR')}
                                </p>
                            </div>
                            <div className="space-x-4 flex">
                                <button
                                    onClick={() => openDeleteModal(portfolio._id)}
                                    className="text-red-500 hover:underline font-medium"
                                >
                                    حذف
                                </button>
                                {showDeleteModal && (
                                    <div className="fixed inset-0 flex items-center justify-center z-50">
                                        <div className="bg-[#062e2e] rounded-2xl p-8 w-[350px] max-w-full mx-4 shadow-2xl text-center">
                                            <p className="mb-8 text-xl font-semibold text-white">
                                                آیا از حذف مقاله مطمئن هستید؟
                                            </p>
                                            <div className="flex justify-center gap-6">
                                                <button
                                                    onClick={confirmDelete}
                                                    className="flex-1 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                                                    autoFocus
                                                >
                                                    حذف
                                                </button>
                                                <button
                                                    onClick={cancelDelete}
                                                    className="flex-1 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                                                >
                                                    انصراف
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
