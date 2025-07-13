'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // آیکون‌های همبرگر و بستن

const links = [
    { href: '/admin/blog', label: 'مقالات' },
    { href: '/admin/portfolio', label: 'نمونه‌کارها' },
    { href: '/admin/users-reports', label: 'گزارش‌های کاربران' },
    { href: '/admin/reports', label: 'ثبت گزارش' },
    { href: '/admin/change-password', label: "تغییر رمز" },
    { href: '/admin/users', label: 'کاربران' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <aside className="bg-white/5 backdrop-blur-md border border-gray-700 rounded-lg w-full sm:w-64">
            <div className="flex flex-col p-4 gap-4 h-full relative">
                {/* Header */}
                <div className="flex justify-between items-center sm:block">
                    <Link href="/admin">
                        <h2 className="text-xl font-bold text-[#00e0ca]">پنل ادمین</h2>
                    </Link>

                    {/* Hamburger Menu - Only visible on mobile */}
                    <button
                        className="sm:hidden text-gray-300"
                        onClick={toggleMenu}
                        aria-label="toggle menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav
                    className={`flex flex-col gap-3 transition-all duration-300 overflow-hidden sm:overflow-visible
                    ${menuOpen ? 'max-h-screen mt-4' : 'max-h-0 sm:max-h-full'} sm:mt-6 sm:flex`}
                >
                    {links.map(({ href, label }) => {
                        const isActive = pathname.startsWith(href);
                        const isChangePassword = href === '/admin/change-password';

                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setMenuOpen(false)} // بستن منو بعد از کلیک روی لینک در موبایل
                                className={`
                                    ${isChangePassword ? 'hidden sm:block' : ''}
                                    px-3 py-2 rounded-md text-center sm:text-right text-[15px] sm:text-lg font-medium
                                    transition-all
                                    ${isActive
                                        ? 'bg-[#00e0ca] text-black shadow'
                                        : 'text-gray-300 hover:text-[#00e0ca] hover:bg-[#2c2c2c]'}
                                `}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-600 text-[16px] sm:text-lg transition-colors mt-4 sm:mt-8"
                >
                    خروج
                </button>
            </div>
        </aside>
    );
}
