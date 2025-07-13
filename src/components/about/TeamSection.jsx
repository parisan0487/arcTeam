"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, ChevronLeft, User } from "lucide-react";

const team = [
    {
        name: "ندا اکبری",
        role: "توسعه‌دهنده فرانت‌اند",
        location: "کاشمر",
        image: "/img/logo.svg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
    },
    {
        name: "مریم صادقی",
        role: "طراح رابط کاربری",
        location: "کاشمر",
        image: "/img/baner.jpg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
    },
    {
        name: "الهه نادری",
        role: "پشتیبان فنی",
        location: "کاشمر",
        image: "/img/baner.jpg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
    },
    {
        name: "سعید یوسفی",
        role: "متخصص تجربه کاربری",
        location: "کاشمر",
        image: "/img/baner.jpg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
    },
    {
        name: "سحر رضوانی",
        role: "توسعه‌دهنده بک‌اند",
        location: "کاشمر",
        image: "/img/baner.jpg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
    },
    {
        name: "علی صفایی",
        role: "تحلیل‌گر داده",
        location: "کاشمر",
        image: "/img/baner.jpg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
    },
    {
        name: "زهرا قنبری",
        role: "مدیر پروژه",
        location: "کاشمر",
        image: "/img/baner.jpg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
    },
    {
        name: "حسین ترابی",
        role: "کارشناس سئو",
        location: "کاشمر",
        image: "/img/baner.jpg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
    },
    {
        name: "لیلا دهقانی",
        role: "کارشناس محتوا",
        location: "کاشمر",
        image: "/img/baner.jpg",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
    },
];


export default function TeamSection() {
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleCount(1);
            } else if (width < 768) {
                setVisibleCount(2);
            } else {
                setVisibleCount(3);
            }
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const visibleMembers = team.slice(startIndex, startIndex + visibleCount);
    const canGoBack = startIndex > 0;
    const canGoForward = startIndex + visibleCount < team.length;

    const handlePrev = () => {
        if (canGoBack) setStartIndex(startIndex - 1);
    };

    const handleNext = () => {
        if (canGoForward) setStartIndex(startIndex + 1);
    };

    return (
        <section className="text-white py-20 px-4 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="bg-[#00c4b4]/10 border border-[#00c4b4]/30 p-8 sm:p-10 rounded-xl w-full md:w-[50%] ml-auto text-right shadow-lg mb-12"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#00e0ca]">اعضای تیم آرک</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handlePrev}
                                disabled={!canGoBack}
                                className={`p-1.5 rounded-full border border-[#00e0ca] transition ${canGoBack
                                    ? "hover:bg-[#00e0ca]/10"
                                    : "opacity-30 cursor-not-allowed"
                                    }`}
                            >
                                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!canGoForward}
                                className={`p-1.5 rounded-full border border-[#00e0ca] transition ${canGoForward
                                    ? "hover:bg-[#00e0ca]/10"
                                    : "opacity-30 cursor-not-allowed"
                                    }`}
                            >
                                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base leading-7">
                        تیمی از افراد خلاق، باانگیزه و حرفه‌ای که باهم کارهای فوق‌العاده‌ای می‌سازن
                    </p>
                </motion.div>


                {/* کارت‌ها */}
                <div className="mt-[-70px] md:mr-16">
                    <motion.div
                        key={startIndex}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch"
                    >
                        {visibleMembers.map((member, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] bg-[#1f2937] rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300"
                            >
                                <p className="text-gray-300 mb-6 text-sm leading-7 italic">
                                    “{member.desc}”
                                </p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <User
                                        size={48}
                                        className="rounded-full border-2 border-[#00e0ca] bg-[#1f2937] p-2 text-[#00e0ca]"
                                    />
                                    <div>
                                        <h4 className="font-bold text-[#00e0ca]">{member.name}</h4>
                                        <p className="text-gray-400 text-sm">{member.role}</p>
                                        <p className="text-gray-500 text-xs">{member.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
