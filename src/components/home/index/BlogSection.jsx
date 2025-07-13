"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Loading from "@/app/loading"



// تعریف انیمیشن والد و فرزند برای اجرای منظم و سبک
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

export default function BlogSection() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
                const res = await fetch("/api/admin/blog", { cache: 'no-store' })

                const data = await res.json()

                if (data.success && Array.isArray(data.blogs)) {
                    setPosts(data.blogs)
                    setLoading(false)
                } 
        }

        fetchPosts()
    }, [])



    return (
        <section className=" text-white px-4 py-20">
            <div className="max-w-6xl mx-auto">
                {/* تیتر سکشن */}
                <h2 className="text-3xl md:text-4xl font-bold mb-12 border-r-4 border-green-400 pr-4">
                    آخرین مقالات
                </h2>

                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {/* باکس مقالات با گروه‌بندی انیمیشن */}
                        < motion.div
                            className="grid md:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            {posts.slice(0, 3).map((post) => (
                                <motion.div
                                    key={post._id}
                                    variants={cardVariants}
                                    className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition"
                                >
                                    <Image
                                        src={post.image || "/img/baner.jpg"}
                                        alt={post.title}
                                        width={600}
                                        height={400}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-5">
                                        <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                                        <p className="text-sm text-white/70 mb-4">{post.excerpt}</p>
                                        <Link href={`/blog/${post.slug}`} passHref key={post._id}>
                                            <div className="flex items-center text-green-400 font-medium gap-1 hover:underline cursor-pointer">
                                                مطالعه مقاله <ArrowLeft size={18} />
                                            </div>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                )}


                {/* دکمه مشاهده بیشتر */}
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/blog">
                        <button className="relative w-[160px] h-12 rounded-3xl overflow-hidden group flex items-center justify-center text-center font-bold text-white focus:outline-none">
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
        </section >
    )
}

