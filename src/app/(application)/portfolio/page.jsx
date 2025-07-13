"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Loading from "@/app/loading"



export default function Portfolio() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const perPage = 3


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/admin/portfolio", { cache: 'no-store' })

                if (!res.ok) {
                    const text = await res.text()
                    throw new Error(text)
                }

                const data = await res.json()

                if (data.success && Array.isArray(data.portfolios)) {
                    setProjects(data.portfolios)
                } else {
                    console.warn("portfolio response format was unexpected:", data)
                    setProjects([])
                }
            } catch (error) {
                console.error("Error fetching posts:", error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const paginated = projects.slice(page * perPage, (page + 1) * perPage)

    const handleNext = () => {
        if ((page + 1) * perPage < projects.length) setPage(prev => prev + 1)
    }

    const handlePrev = () => {
        if (page > 0) setPage(prev => prev - 1)
    }

    return (
        <section className="min-h-screen px-4 py-16 text-white">
            <div className="max-w-6xl mx-auto">
                {/* تیتر */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#00e0ca]">نمونه‌کارها</h2>
                    <p className="text-white/70 max-w-2xl mx-auto text-lg">
                        پروژه‌هایی که با دقت، عشق و طراحی اختصاصی ساخته‌ایم
                    </p>
                </motion.div>

                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <motion.div
                            key={page}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                        >
                            {paginated.map((project, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg p-4 flex flex-col hover:scale-[1.02] transition"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className="w-full h-48 relative rounded-lg overflow-hidden mb-4">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 text-center">{project.title}</h3>

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
                        </motion.div>
                    </>
                )}


                {/* دکمه‌ها */}
                <div className="flex justify-center gap-6 mt-10">
                    <button
                        onClick={handlePrev}
                        disabled={page === 0}
                        className="px-4 py-2 bg-white/10 rounded-xl text-white disabled:opacity-30"
                    >
                        قبلی
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={(page + 1) * perPage >= projects.length}
                        className="px-4 py-2 bg-white/10 rounded-xl text-white disabled:opacity-30"
                    >
                        بعدی
                    </button>
                </div>
            </div>
        </section>
    )
}
