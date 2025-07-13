import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/blog`, { cache: 'no-store' })
        if (!res.ok) throw new Error('API not ready')
        const data = await res.json()

        const blogs = Array.isArray(data) ? data : data.blogs

        return blogs.map((post) => ({
            slug: post.slug,
        }))
    } catch (error) {
        console.warn('Failed to fetch blog slugs:', error)
        // وقتی API در دسترس نیست، اسلاگ خالی می‌ده تا بیلد متوقف نشه
        return []
    }
}

export default async function BlogPage({ params }) {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/admin/blog/${params.slug}`, {
            cache: 'no-store',
        })

        if (!res.ok) return notFound()

        const { blog } = await res.json()

        if (!blog) return notFound()

        const { title, content, image, createdAt } = blog

        const formattedDate = new Date(createdAt).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })

        return (
            <div className="max-w-3xl mx-auto px-4 py-10 bg-white text-black rounded-2xl">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h1>

                <p className="text-gray-500 text-sm mb-6">تاریخ انتشار: {formattedDate}</p>

                {image && (
                    <Image
                        src={image}
                        alt={title}
                        width={800}
                        height={400}
                        className="w-full max-h-[400px] object-cover rounded-xl mb-6"
                    />
                )}

                <div
                    className="prose prose-lg prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        )
    } catch (error) {
        console.warn('Failed to fetch blog data:', error)
        return notFound()
    }
}
