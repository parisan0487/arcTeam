import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true},
    content: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio',  PortfolioSchema);
