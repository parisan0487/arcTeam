'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SubmitReportPage() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        duration: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.description || !form.duration) {
            toast.error('لطفاً تمام فیلدها را پر کنید.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/employee/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: form.title,
                    description: form.description,
                    duration: parseFloat(form.duration),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'خطا در ارسال گزارش');
                return;
            }

            toast.success('گزارش با موفقیت ثبت شد.');
            setForm({ title: '', description: '', duration: '' });
        } catch (err) {
            toast.error('خطایی رخ داد.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 max-sm:mt-10 py-10 rounded-2xl bg-[#1a1a1a] text-white border border-gray-700 shadow-2xl">
            <h1 className="text-2xl font-extrabold mb-8 text-[#00e0ca] text-center border-b border-[#00e0ca] pb-2">
                ثبت گزارش روزانه
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 text-right">
                <div>
                    <label className="block mb-2 text-sm text-gray-300">عنوان گزارش</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#00e0ca] placeholder-gray-400"
                        placeholder="مثلاً: طراحی صفحه تماس با ما"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-gray-300">توضیحات</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#00e0ca] placeholder-gray-400"
                        placeholder="شرح کاری که امروز انجام داده‌اید..."
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-2 text-sm text-gray-300">مدت زمان (ساعت)</label>
                    <input
                        type="number"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#00e0ca] placeholder-gray-400"
                        placeholder="مثلاً: 3.5"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#00e0ca] text-black font-bold rounded-xl hover:bg-[#00c2b3] transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? 'در حال ثبت...' : 'ثبت گزارش'}
                </button>
            </form>
        </div>

    );
}
