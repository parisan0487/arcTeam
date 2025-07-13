'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function AddPortfolioPage() {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleThumbnailUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            setImageUrl(data.url);
        } catch (err) {
            console.error(err);
            toast.error('خطای غیرمنتظره در آپلود تصویر');
        }
    };

    const handleRemoveThumbnail = () => {
        setImageUrl('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !url.trim() || !content.trim() || !imageUrl.trim()) {
            console.error('لطفاً همه فیلدها را پر کنید');
            return;
        }
        setLoading(true);

        try {
            const res = await fetch('/api/admin/portfolio/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, url, content, image: imageUrl }),
            });

            const data = await res.json();
            setLoading(false);

            if (data.success) {
                toast.success('نمونه کار با موفقیت ثبت شد')
                router.push('/admin/portfolio');
            } else {
                toast.error('خطا در ثبت نمونه‌کار');
            }
        } catch (err) {
            console.error('خطا در ثبت:', err);
            toast.error('مشکلی در ذخیره اطلاعات پیش آمد');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto shadow-xl rounded-2xl p-8 bg-[#1a1a1a] text-white space-y-8 border border-gray-700">
            <h1 className="text-3xl font-extrabold text-center text-[#00e0ca] border-b border-[#00e0ca] pb-4">
                افزودن نمونه‌کار
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">عنوان</label>
                    <input
                        type="text"
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00e0ca] placeholder-gray-400"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="مثلاً: طراحی وب‌سایت شخصی"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">لینک نمونه‌کار</label>
                    <input
                        type="text"
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00e0ca] placeholder-gray-400"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="مثلاً: https://example.com"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">توضیحات</label>
                    <textarea
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#00e0ca] placeholder-gray-400"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="توضیحاتی درباره این نمونه‌کار..."
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">تصویر</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="file:bg-[#00e0ca] file:text-black file:rounded-lg file:px-4 file:py-1 cursor-pointer bg-[#2a2a2a] w-full text-gray-300"
                    />

                    {imageUrl && (
                        <div className="mt-5 relative w-[120px] h-[120px] rounded-lg border border-[#00e0ca] overflow-hidden shadow-md">
                            <Image
                                src={imageUrl}
                                alt="تصویر شاخص"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="120px"
                                priority
                            />
                            <button
                                type="button"
                                onClick={handleRemoveThumbnail}
                                className="absolute top-1 left-1 bg-red-600 text-white rounded px-2 py-1 text-xs shadow"
                            >
                                حذف
                            </button>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading || !title.trim() || !url.trim() || !content.trim() || !imageUrl.trim()}
                    className={`w-full py-3 px-4 rounded-lg transition font-semibold text-center ${loading || !title.trim() || !url.trim() || !imageUrl.trim()
                            ? 'bg-[#00e0ca]/50 cursor-not-allowed'
                            : 'bg-[#00e0ca] text-black hover:bg-[#00c6b0]'
                        }`}
                >
                    {loading ? 'در حال ذخیره...' : 'افزودن نمونه‌کار'}
                </button>

            </form>
        </div>

    );
}
