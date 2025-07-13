"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const AboutUsSection = () => {
    return (
        <section className="py-20 px-4 sm:px-10">
            <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">

                {/* لوگوی شناور سمت چپ */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2 flex justify-center"
                >
                    <Image
                        src="/img/logo.svg"
                        alt="لوگوی شرکت آرک"
                        width={300}
                        height={300}
                        className="w-[220px] sm:w-[280px] md:w-[320px] object-contain animate-float"
                    />
                </motion.div>


                {/* متن سمت راست */}
                <motion.div
                    className="w-full md:w-1/2 text-right max-sm:mb-10"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-[45px] font-extrabold text-[#00e0ca] mb-4">
                        درباره شرکت آرک بیشتر بدانید
                    </h2>
                    <p className="text-white text-base sm:text-xl leading-relaxed mb-6">
                        ما در آرک به طراحی حرفه‌ای و توسعه نرم‌افزارهایی باور داریم که زندگی دیجیتال را ساده‌تر و لذت‌بخش‌تر می‌کنند. تمرکز ما بر نوآوری، کاربرمحوری و کیفیت بالاست.
                    </p>
                    <button className="relative w-[160px] h-12 rounded-3xl overflow-hidden group flex items-center justify-center text-center font-bold text-white focus:outline-none">
                        <span className="absolute inset-0 bg-gradient-to-r from-[#019297] via-[#73ED7C] to-[#019297] bg-[length:200%_auto] transition-all duration-400 ease-in-out group-hover:bg-right-bottom"></span>
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            مشاوره رایگان
                            <div className="rotate-[226deg]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 30 24"
                                    fill="white"
                                    className="w-6 h-6 transform transition-transform duration-400 ease-in-out group-hover:rotate-[-47deg]"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M22.72 13.28a.75.75 0 010 1.06l-10 10a.75.75 0 01-1.06-1.06l8.22-8.22H3.75a.75.75 0 010-1.5h16.13l-8.22-8.22a.75.75 0 011.06-1.06l10 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </button>
                </motion.div>

            </div>
        </section>
    )
}

export default AboutUsSection