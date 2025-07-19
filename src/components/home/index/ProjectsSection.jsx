'use client';

import Loading from '@/app/loading';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const textReveal = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
        opacity: 1,
        scaleX: 1,
        transition: {
            duration: 0.8,
            ease: 'easeInOut',
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
            delay: i * 0.1,
        },
    }),
};


export default function ProjectsSection() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/admin/portfolio", { cache: 'no-store' })

            const data = await res.json()

            if (data.success && Array.isArray(data.portfolios)) {
                setProjects(data.portfolios)
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])



    return (
        <section className="py-16 px-4 text-white mb-24">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <div className="flex items-center justify-between">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={textReveal}
                        className="text-[27px] sm:text-4xl md:text-5xl font-bold"
                    >
                        پروژه های ما
                    </motion.h2>

                    <motion.div
                        variants={textReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Link href="/portfolio">
                            <button className="relative w-[160px] max-sm:w-[140px] h-12 rounded-3xl overflow-hidden group flex items-center justify-center text-center font-bold text-white focus:outline-none">
                                <span className="absolute inset-0 bg-gradient-to-r from-[#019297] via-[#73ED7C] to-[#019297] bg-[length:200%_auto] transition-all duration-400 ease-in-out group-hover:bg-right-bottom"></span>
                                <div className="relative z-10 flex items-center justify-center gap-2">
                                    مشاهده همه
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
                        </Link>
                    </motion.div>
                </div>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {projects.slice(0, 3).map((project) => (
                            <motion.div
                                key={project._id}
                                className="flex flex-col bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl p-3 hover:scale-105 transition"
                                variants={cardVariants}
                                transition={{ duration: 1.8 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className="w-full h-48 relative">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-2 mt-2.5 text-center">{project.title}</h3>

                                <p className="text-sm text-gray-200 mb-4 leading-relaxed text-justify break-words">
                                    {project.content}
                                </p>

                                <div className="mt-auto text-center">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block border border-gray-400 px-5 py-2 rounded-md hover:bg-white hover:text-black transition text-sm"
                                    >
                                        اطلاعات بیشتر
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}