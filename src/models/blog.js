import mongoose from 'mongoose';

const BlogsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String }, // توضیح کوتاه برای پیش‌نمایش
    content: { type: String, required: true },
    image: { type: String }, // URL تصویر
    createdAt: { type: Date, default: Date.now },
});

export const Blogs = mongoose.models.Blogs || mongoose.model('Blogs', BlogsSchema);
